/**
 * Prices — the only place to change them. All amounts are in agorot (₪1 = 100).
 *
 * ⚠️ TEACHER_MONTHLY and CLASS_DISCOUNT_PERCENT are placeholders until the owner
 * confirms the real numbers.
 */
export const PARENT_PER_CHILD = 5000          // ₪50 per child per month
export const TEACHER_MONTHLY = 9900           // ₪99 per teacher per month — PLACEHOLDER
export const CLASS_DISCOUNT_PERCENT = 20      // a child in a subscribed teacher's class pays 20% less — PLACEHOLDER
export const FIRST_MONTH_PERCENT_OFF = 50     // first month is half price (both plans)

export type Plan = 'parent' | 'teacher'

export interface Quote {
  plan: Plan
  seats: number
  discountedSeats: number
  monthlyAmount: number // agorot
  firstAmount: number   // agorot
}

/** Round to whole shekels so the Grow page shows clean prices. */
const shekels = (agorot: number) => Math.round(agorot / 100) * 100

export function quoteParent(seats: number, discountedSeats: number): Quote {
  const s = Math.max(1, seats)
  const d = Math.min(Math.max(0, discountedSeats), s)
  const perDiscounted = PARENT_PER_CHILD * (100 - CLASS_DISCOUNT_PERCENT) / 100
  const monthlyAmount = shekels((s - d) * PARENT_PER_CHILD + d * perDiscounted)
  return { plan: 'parent', seats: s, discountedSeats: d, monthlyAmount, firstAmount: firstMonth(monthlyAmount) }
}

export function quoteTeacher(): Quote {
  return { plan: 'teacher', seats: 1, discountedSeats: 0, monthlyAmount: TEACHER_MONTHLY, firstAmount: firstMonth(TEACHER_MONTHLY) }
}

export function firstMonth(monthlyAmount: number): number {
  return shekels(monthlyAmount * (100 - FIRST_MONTH_PERCENT_OFF) / 100)
}

export const toShekels = (agorot: number) => agorot / 100
