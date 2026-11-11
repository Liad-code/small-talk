import { NextResponse } from 'next/server'
import { getSessionUserId } from '@/lib/children'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { resumeSubscription } from '@/lib/billing/service'
import { billingErrorResponse } from '@/lib/billing/http'

export const dynamic = 'force-dynamic'

/** Undo a cancel before the period ends. */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  try {
    await resumeSubscription(userId)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return billingErrorResponse(e)
  }
}
