import type { APIRoute } from 'astro';
import { createCheckout } from '../../../lib/api';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../../../lib/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCheckoutBody(body: any): string | null {
  // --- Cart validation ---
  if (!Array.isArray(body.cart) || body.cart.length === 0) {
    return 'cart must be a non-empty array';
  }
  if (body.cart.length > 50) {
    return 'cart must have at most 50 items';
  }
  for (let i = 0; i < body.cart.length; i++) {
    const item = body.cart[i];
    if (!item || typeof item.id !== 'string' || item.id.length === 0) {
      return `cart[${i}].id must be a non-empty string`;
    }
    if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      return `cart[${i}].quantity must be a positive integer up to 99`;
    }
    if (typeof item.price !== 'number' || item.price <= 0 || !isFinite(item.price)) {
      return `cart[${i}].price must be a positive number`;
    }
  }

  // --- Customer validation ---
  const customer = body.customer;
  if (!customer || typeof customer !== 'object') {
    return 'customer is required';
  }
  if (typeof customer.email !== 'string' || !EMAIL_RE.test(customer.email)) {
    return 'customer.email must be a valid email address';
  }
  if (typeof customer.firstName !== 'string' || customer.firstName.trim().length === 0 || customer.firstName.length > 100) {
    return 'customer.firstName must be a non-empty string of max 100 characters';
  }
  if (typeof customer.lastName !== 'string' || customer.lastName.trim().length === 0 || customer.lastName.length > 100) {
    return 'customer.lastName must be a non-empty string of max 100 characters';
  }
  if (customer.phone != null && (typeof customer.phone !== 'string' || customer.phone.length > 20)) {
    return 'customer.phone must be a string of max 20 characters';
  }

  // --- Shipping address validation ---
  const addr = body.shippingAddress;
  if (!addr || typeof addr !== 'object') {
    return 'shippingAddress is required';
  }
  const addrFields = ['line1', 'line2', 'city', 'state', 'postalCode', 'country'] as const;
  for (const field of addrFields) {
    if (addr[field] != null && (typeof addr[field] !== 'string' || addr[field].length > 200)) {
      return `shippingAddress.${field} must be a string of max 200 characters`;
    }
  }

  return null;
}

export const POST: APIRoute = async ({ request }) => {
  // Rate limit: 5 requests per minute per IP
  const ip = getClientIp(request);
  const { allowed, resetIn } = checkRateLimit(`checkout:${ip}`, 5, 60_000);
  if (!allowed) return rateLimitResponse(resetIn);

  try {
    const body = await request.json();

    // Validate input
    const validationError = validateCheckoutBody(body);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
