import { NextResponse } from 'next/server'
import { getSessionUserId } from '@/lib/children'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { cancelSubscription } from '@/lib/billing/service'
import { billingErrorResponse } from '@/lib/billing/http'

export const dynamic = 'force-dynamic'

/** Cancel online. No further charges; access continues until the paid/trial period ends. */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  try {
    const accessUntil = await cancelSubscription(userId)
    return NextResponse.json({ accessUntil })
  } catch (e) {
    return billingErrorResponse(e)
  }
}
