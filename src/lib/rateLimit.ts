// Lightweight per-instance rate limiter (fixed window, in-memory).
// Good burst protection on Vercel serverless; upgrade path: Upstash Redis
// for a shared cross-instance limit when traffic grows.

const buckets = new Map<string, { count: number; reset: number }>()
const MAX_BUCKETS = 10_000

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

/**
 * Returns true if the request is allowed, false if rate-limited.
 * Key = route bucket + client IP. Window is fixed (resets windowMs after
 * the first hit in the window).
 */
export function rateLimit(req: Request, bucket: string, limit: number, windowMs: number): boolean {
  const key = `${bucket}:${clientIp(req)}`
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now >= entry.reset) {
    if (buckets.size >= MAX_BUCKETS) {
      // Drop expired entries; if still full, allow rather than break the site
      buckets.forEach((v, k) => { if (now >= v.reset) buckets.delete(k) })
      if (buckets.size >= MAX_BUCKETS) return true
    }
    buckets.set(key, { count: 1, reset: now + windowMs })
    return true
  }

  entry.count += 1
  return entry.count <= limit
}

export const TOO_MANY = { error: 'too_many_requests' }
