import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAccess } from '@/lib/access'
import { ACCESS_COOKIE, ACCESS_TTL_SECONDS, SESSION_COOKIES, makeAccessToken } from '@/lib/accessToken'

export const dynamic = 'force-dynamic'

/**
 * The middleware sends visitors here when their access token is missing or expired.
 * Allowed → fresh token + back to the page they wanted. Not allowed → landing / pricing.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const raw = url.searchParams.get('next') ?? '/'
  const next = raw.startsWith('/') && !raw.startsWith('//') && !raw.startsWith('/api/') ? raw : '/'

  const access = await getAccess()
  if (!access.signedIn) return NextResponse.redirect(new URL('/?reason=signin', url.origin))
  if (!access.app) return NextResponse.redirect(new URL('/pricing?reason=locked', url.origin))

  const session = SESSION_COOKIES.map(n => cookies().get(n)?.value).find(Boolean)
  const secret = process.env.AUTH_SECRET
  const res = NextResponse.redirect(new URL(next, url.origin))
  if (session && secret) {
    res.cookies.set(ACCESS_COOKIE, await makeAccessToken(session, secret), {
      httpOnly: true,
      sameSite: 'lax',
      secure: url.protocol === 'https:',
      path: '/',
      maxAge: ACCESS_TTL_SECONDS,
    })
  }
  return res
}
