import { s as stripe } from './stripe_C6wHou3d.mjs';
import { I as IS_MOCK, g as getDb } from './firebase-admin_CrVOOz53.mjs';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';

const CheckoutSchema = z.object({
  cart: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string().optional()
  })),
  shippingRateId: z.string(),
  shippingCost: z.number(),
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional()
  }),
  shippingAddress: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    province: z.string().optional(),
    country: z.string()
  }),
  notes: z.string().optional(),
  discountCode: z.string().nullable().optional()
});
const POST = async ({ request }) => {
  try {
    if (IS_MOCK) {
      return new Response(JSON.stringify({ error: "Configura Stripe en .env para procesar pagos reales" }), { status: 400 });
    }
    const body = await request.json();
    const data = CheckoutSchema.parse(body);
    const siteUrl = "http://localhost:4321";
    const db = getDb();
    let discountAmount = 0;
    let discountData = null;
    if (data.discountCode) {
      const discSnap = await db.collection("discount_codes").where("code", "==", data.discountCode.toUpperCase()).where("active", "==", true).limit(1).get();
      if (!discSnap.empty) {
        const discount = { id: discSnap.docs[0].id, ...discSnap.docs[0].data() };
        const subtotal2 = data.cart.reduce((s, i) => s + i.price * i.quantity, 0);
        if (!discount.min_order_amount || subtotal2 >= discount.min_order_amount) {
          if (!discount.max_uses || discount.used_count < discount.max_uses) {
            discountData = discount;
            if (discount.type === "percentage") discountAmount = subtotal2 * (discount.value / 100);
            else if (discount.type === "fixed") discountAmount = Math.min(discount.value, subtotal2);
            else if (discount.type === "free_shipping") discountAmount = data.shippingCost;
          }
        }
      }
    }
    const subtotal = data.cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingCostFinal = discountData?.type === "free_shipping" ? 0 : data.shippingCost;
    const total = subtotal - discountAmount + shippingCostFinal;
    const taxAmount = total * 0.21 / 1.21;
    const orderNumber = `AY-${Date.now()}`;
    const orderRef = await db.collection("orders").add({
      order_number: orderNumber,
      status: "pending",
      payment_status: "pending",
      customer_name: `${data.customer.firstName} ${data.customer.lastName}`,
      customer_email: data.customer.email,
      customer_phone: data.customer.phone || null,
      subtotal,
      discount_amount: discountAmount,
      discount_code: data.discountCode || null,
      shipping_cost: shippingCostFinal,
      tax_amount: taxAmount,
      total,
      shipping_address: data.shippingAddress,
      notes: data.notes || null,
      order_items: data.cart.map((item) => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total: item.price * item.quantity
      })),
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp()
    });
    const lineItems = data.cart.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name, images: item.image ? [item.image] : [] },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));
    if (shippingCostFinal > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Gastos de envío", images: [] },
          unit_amount: Math.round(shippingCostFinal * 100)
        },
        quantity: 1
      });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: data.customer.email,
      metadata: { order_id: orderRef.id, order_number: orderNumber },
      success_url: `${siteUrl}/checkout/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/carrito`,
      locale: "es"
    });
    await orderRef.update({ stripe_session_id: session.id });
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(JSON.stringify({ error: err.message || "Error interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
