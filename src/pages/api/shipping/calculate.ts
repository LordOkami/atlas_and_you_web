import type { APIRoute } from 'astro';
import { calculateShipping } from '../../../lib/api';

export const GET: APIRoute = async ({ url }) => {
  const country = url.searchParams.get('country') || 'ES';
  const weight = parseInt(url.searchParams.get('weight') || '0');
  const total = parseFloat(url.searchParams.get('total') || '0');

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
