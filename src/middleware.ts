import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_COOKIE, SESSION_COOKIES, verifyAccessToken } from '@/lib/accessToken'

/**
 * The app lock. While PAYWALL_ENABLED=true, every app page needs a valid access token
 * (see lib/accessToken.ts). Without one the visitor goes through /api/access/check,
 * which asks the database (admin? active subscription?) and either sets a fresh token
 * or sends them to the pricing page. "/" decides by itself (landing page or app home).
 */
const OPEN: RegExp[] = [
  /^\/$/, /^\/welcome/, /^\/pricing/, /^\/legal/, /^\/account/, /^\/profiles/, /^\/admin/, /^\/teacher/,
  /^\/landing-preview/,
]

export async function middleware(req: NextRequest) {
  if (process.env.PAYWALL_ENABLED !== 'true') return NextResponse.next()
  const { pathname, search } = req.nextUrl
  if (OPEN.some(r => r.test(pathname))) return NextResponse.next()

  const session = SESSION_COOKIES.map(n => req.cookies.get(n)?.value).find(Boolean)
  const token = req.cookies.get(ACCESS_COOKIE)?.value
  if (session && token && (await verifyAccessToken(token, session, process.env.AUTH_SECRET))) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/api/access/check'
  url.search = `?next=${encodeURIComponent(pathname + search)}`
  return NextResponse.redirect(url)
}

export const config = {
  // pages only: not the API, Next internals or files (audio, images, icons…)
  matcher: ['/((?!api/|_next/|favicon|.*\\..*).*)'],
}
