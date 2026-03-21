import { s as stripe } from './stripe_C6wHou3d.mjs';
import { g as getDb } from './firebase-admin_CrVOOz53.mjs';
import { a as sendLowStockAlert, b as sendOrderConfirmation, c as sendAdminNewOrder } from './email_BbMByje5.mjs';
import { FieldValue } from 'firebase-admin/firestore';

const POST = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, "whsec_placeholder");
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  const db = getDb();
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;
    if (!orderId) return new Response("OK", { status: 200 });
    const orderRef = db.collection("orders").doc(orderId);
    await orderRef.update({
      status: "paid",
      payment_status: "paid",
      stripe_payment_intent: session.payment_intent,
      updated_at: FieldValue.serverTimestamp()
    });
    const orderDoc = await orderRef.get();
    const order = { id: orderDoc.id, ...orderDoc.data() };
    for (const item of order.order_items || []) {
      const prodRef = db.collection("products").doc(item.product_id);
      const prodDoc = await prodRef.get();
      if (prodDoc.exists) {
        const prod = prodDoc.data();
        const newStock = Math.max(0, prod.stock - item.quantity);
        await prodRef.update({ stock: newStock });
        await db.collection("stock_movements").add({
          product_id: item.product_id,
          quantity_change: -item.quantity,
          reason: "sale",
          order_id: orderId,
          created_at: FieldValue.serverTimestamp()
        });
        if (newStock <= 3) {
          await sendLowStockAlert({ name: prod.name, stock: newStock }).catch(console.error);
        }
      }
    }
    if (order.discount_code) {
      const discSnap = await db.collection("discount_codes").where("code", "==", order.discount_code).limit(1).get();
      if (!discSnap.empty) {
        await discSnap.docs[0].ref.update({ used_count: FieldValue.increment(1) });
      }
    }
    await Promise.allSettled([
      sendOrderConfirmation({ ...order, items: order.order_items }),
      sendAdminNewOrder({ ...order})
    ]);
  }
  if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;
    if (orderId) {
      await db.collection("orders").doc(orderId).update({
        status: "cancelled",
        payment_status: "failed",
        updated_at: FieldValue.serverTimestamp()
      });
    }
  }
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
