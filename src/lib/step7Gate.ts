import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

/**
 * Temporary password gate for Step 7 while it is being reviewed (owner request
 * 2026-11-18). A soft gate for selected testers — not a security boundary.
 * Only the SHA-256 of the password lives in the code; the unlock cookie is an
 * HMAC with AUTH_SECRET, so it can't be forged without the server secret.
 * To lift the gate: delete this file's use in src/app/step7/layout.tsx.
 */
const PASSWORD_SHA256 = '5927f11c07e9d9e51ca92823f50209c3127d969374f76b03250df0d78828317c'
export const STEP7_COOKIE = 'smalltalk_step7'
export const STEP7_COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days

function token(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET missing')
  return createHmac('sha256', secret).update('step7-unlocked').digest('hex')
}

function same(a: string, b: string): boolean {
  const x = Buffer.from(a), y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function step7PasswordOk(password: string): boolean {
  const h = createHash('sha256').update(password.trim().toLowerCase()).digest('hex')
  return same(h, PASSWORD_SHA256)
}

export function step7UnlockToken(): string {
  return token()
}

export async function hasStep7Access(): Promise<boolean> {
  const v = cookies().get(STEP7_COOKIE)?.value
  return !!v && same(v, token())
}
