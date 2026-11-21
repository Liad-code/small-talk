import { NextResponse } from 'next/server'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { getSessionUserId } from '@/lib/children'
import { cancelSubscription } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/** Cancel at the end of the paid period. The owner then cancels the standing order in Grow (task + email). */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing-cancel', 5, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await cancelSubscription(userId)
  return NextResponse.json({ ok: true })
}
