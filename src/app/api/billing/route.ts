import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUserId } from '@/lib/children'
import { getEntitlement } from '@/lib/entitlements'
import { amountFor, seatsFor } from '@/lib/billing/policy'

export const dynamic = 'force-dynamic'

/** Billing summary for the signed-in parent (drives the /pricing page). Never returns the card token. */
export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const [ent, sub, children] = await Promise.all([
    getEntitlement(userId),
    db.subscription.findUnique({ where: { userId }, select: { cardSuffix: true, nextChargeAt: true, pricePerSeat: true } }),
    db.childProfile.count({ where: { userId } }),
  ])
  const seats = seatsFor(children)
  return NextResponse.json({
    subscribed: ent.hasAccess,
    status: ent.status,
    seats: ent.seats,
    cancelAtPeriodEnd: ent.cancelAtPeriodEnd,
    currentPeriodEnd: ent.currentPeriodEnd,
    trialEnd: ent.trialEnd,
    cardSuffix: sub?.cardSuffix ?? null,
    nextChargeAt: ent.cancelAtPeriodEnd ? null : sub?.nextChargeAt ?? null,
    // What the next monthly charge will be, at today's number of children (agorot)
    nextChargeSeats: seats,
    nextChargeAmount: amountFor(seats, sub?.pricePerSeat),
  })
}
