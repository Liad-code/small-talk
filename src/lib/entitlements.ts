import { db } from '@/lib/db'
import { hasAccess } from '@/lib/billing/policy'

export interface Entitlement {
  hasAccess: boolean
  plan: string | null
  status: string | null
  seats: number
  discountedSeats: number
  monthlyAmount: number | null // agorot
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: Date | null
  cardSuffix: string | null
}

const NO_ACCESS: Entitlement = {
  hasAccess: false,
  plan: null,
  status: null,
  seats: 0,
  discountedSeats: 0,
  monthlyAmount: null,
  cancelAtPeriodEnd: false,
  currentPeriodEnd: null,
  cardSuffix: null,
}

/** Global paywall switch — content stays free until this is 'true'. */
export function paywallEnabled(): boolean {
  return process.env.PAYWALL_ENABLED === 'true'
}

/** Single source of truth for "can this account access paid content". */
export async function getEntitlement(userId: string | null | undefined): Promise<Entitlement> {
  if (!userId) return NO_ACCESS
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub) return NO_ACCESS
  return {
    // Rules in billing/policy.ts: access until the paid period ends (+ grace unless cancelled).
    hasAccess: hasAccess(sub),
    plan: sub.plan,
    status: sub.status,
    seats: sub.seats,
    discountedSeats: sub.discountedSeats,
    monthlyAmount: sub.monthlyAmount,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    currentPeriodEnd: sub.currentPeriodEnd,
    cardSuffix: sub.cardSuffix,
  }
}
