import { defineMiddleware } from 'astro:middleware';

const BACKEND_URL = 'http://localhost:4000';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Redirect /admin* to the Phoenix backend
  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/admin_users/')) {
    return context.redirect(`${BACKEND_URL}${pathname}`, 302);
  }

  // Proxy /uploads/* to the Phoenix backend (product images)
  if (pathname.startsWith('/uploads/')) {
    const res = await fetch(`${BACKEND_URL}${pathname}`);
    return new Response(res.body, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  return next();
});
