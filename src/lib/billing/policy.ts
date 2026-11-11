/**
 * Billing rules — pure functions, no database or provider calls, so they can be
 * unit-tested in isolation (src/lib/billing/policy.test.ts).
 *
 * Model (owner decision 2026-11-11): the provider stores the card as a token;
 * WE charge ₪50 × children every month from a daily cron job. That keeps
 * per-seat changes, the free trial and cancellation entirely in our hands.
 *
 * Money is always integer agorot (₪1 = 100).
 */

export const PRICE_PER_SEAT_AGOROT = 5000 // ₪50 per child per month
export const TRIAL_DAYS = 7
/** Days after a failed charge to retry: day 1, 3, 7. After the last retry fails, access stops. */
export const RETRY_AFTER_DAYS = [1, 3, 7] as const

export type SubStatus = 'trialing' | 'active' | 'past_due' | 'canceled'

/** The subset of a subscription row the rules work on. */
export interface SubState {
  status: SubStatus
  currentPeriodEnd: Date
  nextChargeAt: Date | null
  failedAttempts: number
  cancelAtPeriodEnd: boolean
}

const DAY_MS = 24 * 60 * 60 * 1000

export function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * DAY_MS)
}

/** Calendar month later, clamped to the month's last day (Jan 31 → Feb 28/29). */
export function addMonths(d: Date, months: number): Date {
  const r = new Date(d.getTime())
  const day = r.getUTCDate()
  r.setUTCDate(1)
  r.setUTCMonth(r.getUTCMonth() + months)
  const lastDay = new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth() + 1, 0)).getUTCDate()
  r.setUTCDate(Math.min(day, lastDay))
  return r
}

/** Seats billed = current number of child profiles, never below 1. */
export function seatsFor(childCount: number): number {
  return Math.max(1, Math.floor(childCount))
}

export function amountFor(seats: number, pricePerSeat = PRICE_PER_SEAT_AGOROT): number {
  return seatsFor(seats) * pricePerSeat
}

/** New subscription right after the card is saved: free trial, first charge when it ends. */
export function startTrial(now: Date): SubState & { trialEnd: Date } {
  const trialEnd = addDays(now, TRIAL_DAYS)
  return {
    status: 'trialing',
    trialEnd,
    currentPeriodEnd: trialEnd,
    nextChargeAt: trialEnd,
    failedAttempts: 0,
    cancelAtPeriodEnd: false,
  }
}

/** Is a charge due now? (A canceled-at-period-end sub is never charged — it ends instead.) */
export function isDue(sub: SubState, now: Date): boolean {
  return sub.status !== 'canceled' && sub.nextChargeAt !== null && sub.nextChargeAt <= now
}

/**
 * What the cron job does with a due subscription before charging:
 * ends it if the parent canceled, otherwise charges.
 */
export function dueAction(sub: SubState): 'end' | 'charge' {
  return sub.cancelAtPeriodEnd ? 'end' : 'charge'
}

/** Ending a subscription the parent canceled (no charge). */
export function onEnd(sub: SubState, now: Date): SubState & { canceledAt: Date } {
  return { ...sub, status: 'canceled', nextChargeAt: null, canceledAt: now }
}

/**
 * Successful monthly charge. The new month starts where the paid period ended
 * (not "now"), so a retried charge doesn't shift the billing date; if the
 * period already lapsed long ago, it starts now.
 */
export function onChargeSucceeded(sub: SubState, now: Date): SubState {
  // Within the retry window the child kept access, so the month continues from
  // the old period end. Anything older (e.g. a manual reactivation) starts now.
  const graceStart = addDays(now, -(RETRY_AFTER_DAYS[RETRY_AFTER_DAYS.length - 1] + 1))
  const base = sub.currentPeriodEnd >= graceStart ? sub.currentPeriodEnd : now
  const periodEnd = addMonths(base, 1)
  return {
    ...sub,
    status: 'active',
    currentPeriodEnd: periodEnd,
    nextChargeAt: periodEnd,
    failedAttempts: 0,
  }
}

/** Failed charge: past_due and retry later; after the last retry, access stops. */
export function onChargeFailed(sub: SubState, now: Date): SubState {
  const attempts = sub.failedAttempts + 1
  if (attempts > RETRY_AFTER_DAYS.length) {
    return { ...sub, status: 'canceled', nextChargeAt: null, failedAttempts: attempts }
  }
  return {
    ...sub,
    status: 'past_due',
    nextChargeAt: addDays(now, RETRY_AFTER_DAYS[attempts - 1]),
    failedAttempts: attempts,
  }
}

/** Parent cancels: nothing more is charged; access lasts until the paid/trial period ends. */
export function onCancel(sub: SubState): SubState {
  return { ...sub, cancelAtPeriodEnd: true }
}

/** Parent undoes a cancel before the period ended. */
export function onResume(sub: SubState, now: Date): SubState | null {
  if (sub.status === 'canceled' || sub.currentPeriodEnd <= now) return null
  return { ...sub, cancelAtPeriodEnd: false }
}

/**
 * Access rule. trialing / active → yes. past_due → yes while we retry (grace).
 * canceled → no. A sub the parent canceled stays trialing/active (with
 * cancelAtPeriodEnd) until the cron job ends it at the period end, so it keeps
 * access exactly until then.
 */
export function hasAccess(sub: Pick<SubState, 'status'>): boolean {
  return sub.status === 'trialing' || sub.status === 'active' || sub.status === 'past_due'
}
