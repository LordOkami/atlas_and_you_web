import type { APIRoute } from 'astro';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../../../lib/rate-limit';

const BACKEND_URL = process.env.BACKEND_API_URL || import.meta.env.BACKEND_API_URL || 'http://localhost:4000';

export const GET: APIRoute = async ({ url, request }) => {
  // Rate limit: 10 requests per minute per IP
  const ip = getClientIp(request);
  const { allowed, resetIn } = checkRateLimit(`discount:${ip}`, 10, 60_000);
  if (!allowed) return rateLimitResponse(resetIn);

  const code = url.searchParams.get('code') || '';
  const subtotalRaw = url.searchParams.get('subtotal') || '0';

  // Validate code: non-empty, max 50 chars, alphanumeric + hyphens only
  if (!code || code.length > 50 || !/^[a-zA-Z0-9-]+$/.test(code)) {
    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid code: must be non-empty, max 50 characters, alphanumeric and hyphens only' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate subtotal: must be a positive number
  const subtotal = parseFloat(subtotalRaw);
  if (isNaN(subtotal) || subtotal <= 0) {
    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid subtotal: must be a positive number' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
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
