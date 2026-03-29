import type { APIRoute } from 'astro';

const BACKEND_URL = process.env.BACKEND_API_URL || import.meta.env.BACKEND_API_URL || 'http://localhost:4000';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code') || '';
  const subtotal = url.searchParams.get('subtotal') || '0';

  if (!code) {
    return new Response(
      JSON.stringify({ valid: false }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v1/discounts/validate?code=${encodeURIComponent(code)}&subtotal=${subtotal}`
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ valid: false }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
};
