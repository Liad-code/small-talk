import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { step7PasswordOk, step7UnlockToken, STEP7_COOKIE, STEP7_COOKIE_MAX_AGE } from '@/lib/step7Gate'

export const dynamic = 'force-dynamic'

const schema = z.object({ password: z.string().max(100) })

/** Checks the Step 7 review password and, if right, sets the unlock cookie. */
export async function POST(req: Request) {
  if (!rateLimit(req, 'step7-unlock', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const body = schema.safeParse(await req.json().catch(() => null))
  if (!body.success || !step7PasswordOk(body.data.password)) {
    return NextResponse.json({ error: 'wrong_password' }, { status: 401 })
  }
  cookies().set(STEP7_COOKIE, step7UnlockToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: STEP7_COOKIE_MAX_AGE,
  })
  return NextResponse.json({ ok: true })
}
