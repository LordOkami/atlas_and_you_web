// Admin API routes have been moved to Phoenix backend.
// The admin dashboard is now served by Phoenix LiveView at /admin.
import type { APIRoute } from 'astro';

const GONE = JSON.stringify({ error: 'Admin API moved to Phoenix backend. Use /admin in Phoenix.' });
const headers = { 'Content-Type': 'application/json' };

export const PATCH: APIRoute = async () => new Response(GONE, { status: 410, headers });
export const DELETE: APIRoute = async () => new Response(GONE, { status: 410, headers });
