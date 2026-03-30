import type { APIRoute } from 'astro';
import { calculateShipping } from '../../../lib/api';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../../../lib/rate-limit';

export const GET: APIRoute = async ({ url, request }) => {
  // Rate limit: 20 requests per minute per IP
  const ip = getClientIp(request);
  const { allowed, resetIn } = checkRateLimit(`shipping:${ip}`, 20, 60_000);
  if (!allowed) return rateLimitResponse(resetIn);

  const country = url.searchParams.get('country') || 'ES';
  const weightRaw = url.searchParams.get('weight') || '0';
  const totalRaw = url.searchParams.get('total') || '0';

  // Validate country
  if (typeof country !== 'string' || country.length === 0 || country.length > 5) {
    return new Response(
      JSON.stringify({ error: 'Invalid country: must be a non-empty string of max 5 characters' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate weight
  const weight = parseInt(weightRaw);
  if (isNaN(weight) || weight <= 0 || weight > 50000) {
    return new Response(
      JSON.stringify({ error: 'Invalid weight: must be a positive number up to 50000 grams' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate total
  const total = parseFloat(totalRaw);
  if (isNaN(total) || total <= 0 || total > 100000) {
    return new Response(
      JSON.stringify({ error: 'Invalid total: must be a positive number up to 100000' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const rates = await calculateShipping(country, weight, total);
    return new Response(JSON.stringify({ rates }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ rates: [], error: 'Error calculating shipping' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
