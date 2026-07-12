import { db } from '@/lib/db'

export interface Entitlement {
  hasAccess: boolean
  status: string | null
  seats: number
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: Date | null
  trialEnd: Date | null
}

const NO_ACCESS: Entitlement = {
  hasAccess: false,
  status: null,
  seats: 0,
  cancelAtPeriodEnd: false,
  currentPeriodEnd: null,
  trialEnd: null,
}

/** Global paywall switch — content stays free until this is 'true'. */
export function paywallEnabled(): boolean {
  return process.env.PAYWALL_ENABLED === 'true'
}

/** Single source of truth for "can this parent access paid content". */
export async function getEntitlement(userId: string | null | undefined): Promise<Entitlement> {
  if (!userId) return NO_ACCESS
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub) return NO_ACCESS
  const active = sub.status === 'active' || sub.status === 'trialing'
  // Grace: access persists until the paid-for period actually ends
  const withinPeriod = sub.currentPeriodEnd > new Date()
  return {
    hasAccess: active || (sub.cancelAtPeriodEnd && withinPeriod),
    status: sub.status,
    seats: sub.seats,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    currentPeriodEnd: sub.currentPeriodEnd,
    trialEnd: sub.trialEnd,
  }
}
