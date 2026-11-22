/**
 * Prices — the only place to change them. All amounts are in agorot (₪1 = 100).
 *
 * Without Grow's paid API the site can't change a standing order by itself, so prices are
 * designed to change rarely: family TIERS (not per child), full price from the first month.
 *
 * ⚠️ PLACEHOLDERS until the owner confirms: the 2- and 3+-children tiers, TEACHER_MONTHLY,
 * CLASS_DISCOUNT_PERCENT.
 */
export interface Tier { upTo: number; price: number; labelHe: string }
export const PARENT_TIERS: Tier[] = [
  { upTo: 1, price: 5000, labelHe: 'ילד אחד' },          // ₪50
  { upTo: 2, price: 9000, labelHe: '2 ילדים' },          // ₪90  — PLACEHOLDER
  { upTo: Infinity, price: 12000, labelHe: '3 ילדים ומעלה' }, // ₪120 — PLACEHOLDER
]
export const TEACHER_MONTHLY = 9900       // ₪99 per teacher per month — PLACEHOLDER
export const CLASS_DISCOUNT_PERCENT = 20  // family price −20% when a child is in a subscribed teacher's class — PLACEHOLDER
export const FIRST_MONTH_PERCENT_OFF = 0  // 0 = first month at full price (a discount would need a manual change in Grow per subscriber)

export type Plan = 'parent' | 'teacher'

export interface Quote {
  plan: Plan
  seats: number
  discountedSeats: number // children in a paying teacher's class (any > 0 → class discount)
  tier: string | null     // Hebrew tier label (parent plan)
  monthlyAmount: number   // agorot
  firstAmount: number     // agorot
}

/** Round to whole shekels so the Grow page shows clean prices. */
const shekels = (agorot: number) => Math.round(agorot / 100) * 100

export const tierFor = (children: number): Tier => PARENT_TIERS.find(t => children <= t.upTo) ?? PARENT_TIERS[PARENT_TIERS.length - 1]

export function quoteParent(seats: number, discountedSeats: number): Quote {
  const s = Math.max(1, seats)
  const d = Math.min(Math.max(0, discountedSeats), s)
  const tier = tierFor(s)
  const monthlyAmount = shekels(d > 0 ? tier.price * (100 - CLASS_DISCOUNT_PERCENT) / 100 : tier.price)
  return { plan: 'parent', seats: s, discountedSeats: d, tier: tier.labelHe, monthlyAmount, firstAmount: firstMonth(monthlyAmount) }
}

export function quoteTeacher(): Quote {
  return { plan: 'teacher', seats: 1, discountedSeats: 0, tier: null, monthlyAmount: TEACHER_MONTHLY, firstAmount: firstMonth(TEACHER_MONTHLY) }
}

export function firstMonth(monthlyAmount: number): number {
  return shekels(monthlyAmount * (100 - FIRST_MONTH_PERCENT_OFF) / 100)
}

export const toShekels = (agorot: number) => agorot / 100
