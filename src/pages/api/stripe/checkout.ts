import type { APIRoute } from 'astro';
import { createCheckout } from '../../../lib/api';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Phoenix expects snake_case keys; map from the frontend's camelCase format
    const result = await createCheckout({
      cart: body.cart,
      customer: body.customer,
      shipping_address: body.shippingAddress,
      shipping_rate_id: body.shippingRateId,
      shipping_cost: body.shippingCost,
      discount_code: body.discountCode,
      notes: body.notes,
    });

    return new Response(JSON.stringify({ url: result.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e.message || 'Checkout error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
