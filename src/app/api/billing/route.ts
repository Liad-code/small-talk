import { NextResponse } from 'next/server'
import { getSessionUserId } from '@/lib/children'
import { getEntitlement, paywallEnabled } from '@/lib/entitlements'
import { db } from '@/lib/db'
import { quoteFor } from '@/lib/billing/service'
import { makeConfigured } from '@/lib/billing/make'
import { CLASS_DISCOUNT_PERCENT, TEACHERS_ENABLED } from '@/lib/billing/plans'
import { getAccess } from '@/lib/access'

export const dynamic = 'force-dynamic'

/** Billing summary + price quotes for the signed-in user (drives /pricing and /account). */
export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const [ent, parent, teacher, openCancel, access] = await Promise.all([
    getEntitlement(userId),
    quoteFor(userId, 'parent'),
    quoteFor(userId, 'teacher'),
    db.billingTask.findFirst({ where: { userId, kind: 'cancel', status: 'open' }, select: { id: true } }),
    getAccess(),
  ])
  return NextResponse.json({
    subscribed: ent.hasAccess,
    plan: ent.plan,
    status: ent.status,
    seats: ent.seats,
    discountedSeats: ent.discountedSeats,
    monthlyAmount: ent.monthlyAmount,
    cancelAtPeriodEnd: ent.cancelAtPeriodEnd,
    currentPeriodEnd: ent.currentPeriodEnd,
    cardSuffix: ent.cardSuffix,
    canUndoCancel: ent.status === 'canceled' && ent.hasAccess && !!openCancel,
    quotes: { parent, teacher },
    prices: { classDiscountPercent: CLASS_DISCOUNT_PERCENT },
    teachersEnabled: TEACHERS_ENABLED,
    admin: access.admin,
    perkTier: access.tier, // family tier for the extras (null = none)
    tierChosen: parent.tierIndex,
    checkoutAvailable: makeConfigured(),
    paywallEnabled: paywallEnabled(),
  })
}
