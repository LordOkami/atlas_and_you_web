import { defineMiddleware } from 'astro:middleware';

const BACKEND_URL = process.env.BACKEND_API_URL || import.meta.env.BACKEND_API_URL || 'http://localhost:4000';
const BYPASS_COOKIE = 'atlas_preview';

if (import.meta.env.PROD && BACKEND_URL.includes('localhost')) {
  console.error('WARNING: BACKEND_API_URL not configured for production');
}

// Cache maintenance status for 10 seconds to avoid hammering the backend
let maintenanceCache: { enabled: boolean; message: string } | null = null;
let maintenanceCacheTime = 0;
const CACHE_TTL = 10_000;

async function getMaintenanceStatus(): Promise<{ enabled: boolean; message: string }> {
  const now = Date.now();
  if (maintenanceCache && now - maintenanceCacheTime < CACHE_TTL) {
    return maintenanceCache;
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/maintenance/status`);
    maintenanceCache = await res.json();
    maintenanceCacheTime = now;
    return maintenanceCache!;
  } catch {
    return { enabled: false, message: '' };
  }
}

function renderMaintenancePage(message: string, isPreview: boolean): Response {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atlas&You — Volvemos pronto</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Nunito', sans-serif;
      background: #faf9f7;
      color: #44403c;
      overflow: hidden;
    }
    .bg-pattern {
      position: fixed;
      inset: 0;
      background-image: radial-gradient(circle at 1px 1px, #e7e5e4 1px, transparent 0);
      background-size: 40px 40px;
      opacity: 0.5;
      z-index: 0;
    }
    .content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
      max-width: 540px;
    }
    .logo {
      margin-bottom: 0.5rem;
    }
    .logo img {
      height: 64px;
      width: auto;
    }
    .divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #c2410c, transparent);
      margin: 1.5rem auto;
    }
    .message {
      font-size: 1.15rem;
      line-height: 1.7;
      color: #57534e;
      font-weight: 300;
      margin-bottom: 2rem;
    }
    .sparkle {
      display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    .dots {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-top: 2rem;
    }
    .dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #c2410c;
      animation: bounce 1.4s ease-in-out infinite;
    }
    .dots span:nth-child(2) { animation-delay: 0.2s; }
    .dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1.2); }
    }
    .footer {
      position: fixed;
      bottom: 2rem;
      font-size: 0.75rem;
      color: #a8a29e;
      z-index: 1;
    }
    .preview-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #c2410c;
      color: white;
      text-align: center;
      padding: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 50;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="content">
    <div class="logo"><img src="/images/logo.png" alt="Atlas&You" /></div>
    <div class="divider"></div>
    <p class="message">${escapeHtml(message)}</p>
    <div class="dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="footer">
    <span class="sparkle">&#10022;</span> Joyeria artesanal hecha a mano
  </div>
</body>
</html>`;
  return new Response(html, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': '3600',
    },
  });
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://api.stripe.com https://*.firebaseio.com https://*.googleapis.com wss:; frame-src https://js.stripe.com; font-src 'self'; frame-ancestors 'none'",
};

function addSecurityHeaders(response: Response): Response {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, searchParams } = context.url;

  // Redirect /admin* to the Phoenix backend
  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/admin_users/')) {
    return addSecurityHeaders(context.redirect(`${BACKEND_URL}${pathname}`, 302));
  }

  // Proxy /uploads/* to the Phoenix backend (product images)
  if (pathname.startsWith('/uploads/')) {
    // Prevent path traversal
    const normalized = new URL(pathname, 'http://localhost').pathname;
    if (!normalized.startsWith('/uploads/')) {
      return addSecurityHeaders(new Response('Forbidden', { status: 403 }));
    }
    const res = await fetch(`${BACKEND_URL}${normalized}`);
    return addSecurityHeaders(new Response(res.body, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }));
  }

  // Skip maintenance check for API routes and static assets
  if (pathname.startsWith('/api/') || pathname.startsWith('/_') || pathname.match(/\.\w+$/)) {
    const response = await next();
    return addSecurityHeaders(response);
  }

  // Check maintenance mode
  const maintenance = await getMaintenanceStatus();

  if (maintenance.enabled) {
    // Check for ?preview=TOKEN → validate, set cookie, redirect clean
    const previewToken = searchParams.get('preview');
    if (previewToken) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/maintenance/status?token=${encodeURIComponent(previewToken)}`);
        const data = await res.json();
        if (data.token_valid) {
          const response = context.redirect(pathname, 302);
          response.headers.set('Set-Cookie', `${BYPASS_COOKIE}=${previewToken}; Path=/; Max-Age=86400; SameSite=Strict; Secure; HttpOnly`);
          return addSecurityHeaders(response);
        }
      } catch {}
      // Invalid token — fall through to maintenance page
    }

    // Check bypass cookie
    const cookies = context.request.headers.get('cookie') || '';
    const cookieMatch = cookies.match(new RegExp(`${BYPASS_COOKIE}=([^;]+)`));
    const bypassToken = cookieMatch?.[1];

    if (bypassToken) {
      // Validate token is still valid (admin might have regenerated it)
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/maintenance/status?token=${encodeURIComponent(bypassToken)}`);
        const data = await res.json();
        if (data.token_valid) {
          const response = await next();
          return addSecurityHeaders(response);
        }
      } catch {
        const response = await next(); // If backend unreachable, let them through
        return addSecurityHeaders(response);
      }
    }

    // No bypass → show maintenance page
    return addSecurityHeaders(renderMaintenancePage(maintenance.message, false));
  }

  const response = await next();
  return addSecurityHeaders(response);
});
