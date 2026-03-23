import type { APIRoute } from 'astro';

const BACKEND_URL = import.meta.env.BACKEND_API_URL || 'http://localhost:4000';

export const POST: APIRoute = async ({ request }) => {
  // Forward the raw request to Phoenix which handles webhook processing directly
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  const res = await fetch(`${BACKEND_URL}/webhooks/stripe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': sig,
    },
    body,
  });

  return new Response(await res.text(), { status: res.status });
};
