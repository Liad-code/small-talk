import { NextResponse } from 'next/server'
import { getSessionUserId } from '@/lib/children'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { startCheckout } from '@/lib/billing/service'
import { billingErrorResponse } from '@/lib/billing/http'

export const dynamic = 'force-dynamic'

/** Start signup: returns the Grow page URL where the parent saves a card (7-day trial). */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  try {
    const url = await startCheckout(userId, new URL(req.url).origin)
    return NextResponse.json({ url })
  } catch (e) {
    return billingErrorResponse(e)
  }
}
