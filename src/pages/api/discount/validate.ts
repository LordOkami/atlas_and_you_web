import type { APIRoute } from 'astro';
import { validateDiscount } from '../../../lib/api';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const subtotal = parseFloat(url.searchParams.get('subtotal') || '0');

  if (!code) {
    return new Response(
      JSON.stringify({ valid: false, error: 'Code required' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const result = await validateDiscount(code, subtotal);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ valid: false, error: 'Error validating' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
};
