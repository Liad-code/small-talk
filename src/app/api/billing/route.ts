import { NextResponse } from 'next/server'
import { getSessionUserId } from '@/lib/children'
import { getEntitlement } from '@/lib/entitlements'

export const dynamic = 'force-dynamic'

/** Billing summary for the signed-in parent (drives the /pricing page). */
export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const ent = await getEntitlement(userId)
  return NextResponse.json({
    subscribed: ent.hasAccess,
    status: ent.status,
    seats: ent.seats,
    cancelAtPeriodEnd: ent.cancelAtPeriodEnd,
    currentPeriodEnd: ent.currentPeriodEnd,
    trialEnd: ent.trialEnd,
  })
}
