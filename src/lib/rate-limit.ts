/**
 * Simple in-memory rate limiter.
 *
 * Tracks request counts per IP within a sliding window.
 * Expired entries are cleaned up every 60 seconds.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now >= entry.resetTime) {
      store.delete(key);
    }
  }
}, 60_000);

/**
 * Check whether a request from the given IP is allowed.
 *
 * @param ip        Client IP address (used as key, prefixed per-route by caller)
 * @param limit     Maximum requests allowed within the window
 * @param windowMs  Window duration in milliseconds
 * @returns         `allowed` — whether the request should proceed,
 *                  `remaining` — how many requests are left in the window,
 *                  `resetIn` — seconds until the window resets
 */
export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = store.get(ip);

  // First request or window expired — start a new window
  if (!entry || now >= entry.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: Math.ceil(windowMs / 1000) };
  }

  // Within the current window
  entry.count += 1;
  const resetIn = Math.ceil((entry.resetTime - now) / 1000);

  if (entry.count > limit) {
    return { allowed: false, remaining: 0, resetIn };
  }

  return { allowed: true, remaining: limit - entry.count, resetIn };
}

/**
 * Extract the client IP from request headers, falling back to "unknown".
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for may contain a comma-separated list; take the first
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Build a 429 Too Many Requests response with a Retry-After header.
 */
export function rateLimitResponse(resetIn: number): Response {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(resetIn),
      },
    },
  );
}
