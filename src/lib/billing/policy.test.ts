import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  hasAccess, addMonth, extendPeriod, findRef, refFor, readNotice, normalizePhone,
  toAgorot, parseGrowDate, amountMatches, newClassCode, normalizeCode, GRACE_DAYS,
} from './policy.ts'
import { quoteParent, quoteTeacher, PARENT_TIERS, TEACHER_MONTHLY, CLASS_DISCOUNT_PERCENT, FIRST_MONTH_PERCENT_OFF } from './plans.ts'

const day = 86_400_000
const now = new Date('2026-12-10T10:00:00Z')

test('access follows the paid period, with grace while active / past_due', () => {
  const end = new Date(now.getTime() - day)
  assert.equal(hasAccess({ status: 'active', currentPeriodEnd: end }, now), true)
  assert.equal(hasAccess({ status: 'past_due', currentPeriodEnd: end }, now), true)
  assert.equal(hasAccess({ status: 'active', currentPeriodEnd: new Date(now.getTime() - (GRACE_DAYS + 1) * day) }, now), false)
  assert.equal(hasAccess({ status: 'canceled', currentPeriodEnd: end }, now), false)
  assert.equal(hasAccess({ status: 'canceled', currentPeriodEnd: new Date(now.getTime() + day) }, now), true)
  assert.equal(hasAccess(null, now), false)
})

test('months add calendar-correctly', () => {
  assert.equal(addMonth(new Date('2026-01-31T10:00:00Z')).toISOString().slice(0, 10), '2026-02-28')
  assert.equal(addMonth(new Date('2026-12-15T10:00:00Z')).toISOString().slice(0, 10), '2027-01-15')
  // paying early extends from the current end, paying late from the payment day
  const end = new Date('2027-01-10T10:00:00Z')
  assert.equal(extendPeriod(end, new Date('2027-01-08T10:00:00Z')).toISOString().slice(0, 10), '2027-02-10')
  assert.equal(extendPeriod(end, new Date('2027-01-20T10:00:00Z')).toISOString().slice(0, 10), '2027-02-20')
})

test('prices: family tiers, class discount on the family price, teacher fixed', () => {
  assert.equal(quoteParent(1, 0).monthlyAmount, 3900)
  assert.equal(quoteParent(2, 0).monthlyAmount, 4900)
  assert.equal(quoteParent(3, 0).monthlyAmount, 4900)
  assert.equal(quoteParent(4, 0).monthlyAmount, 6900)
  assert.equal(quoteParent(15, 0).monthlyAmount, PARENT_TIERS[2].price)
  assert.equal(quoteParent(0, 0).seats, 1)
  const disc = quoteParent(2, 1)
  assert.equal(disc.monthlyAmount, Math.round(PARENT_TIERS[1].price * (100 - CLASS_DISCOUNT_PERCENT) / 100 / 100) * 100)
  assert.equal(quoteParent(2, 2).monthlyAmount, disc.monthlyAmount) // discount is per family, not per child
  assert.equal(quoteParent(0, 5).discountedSeats, 1)
  assert.equal(quoteTeacher().monthlyAmount, TEACHER_MONTHLY)
  if (FIRST_MONTH_PERCENT_OFF === 0) assert.equal(quoteParent(2, 0).firstAmount, quoteParent(2, 0).monthlyAmount)
})

test('our checkout reference is found anywhere in a Grow payload', () => {
  const id = 'cm3x9k2a10000abcd1234efgh'
  const payload = { err: '', status: '1', data: { productData: [{ catalogNumber: refFor(id) }], customFields: { cField1: refFor(id) } } }
  assert.equal(findRef(payload), id)
  assert.equal(findRef({ data: { nothing: 'here' } }), null)
})

test('a payment-link notice is read correctly', () => {
  const n = readNotice({ err: '', status: '1', data: {
    transactionId: '9876', sum: '25.00', statusCode: '2', paymentDate: '10/12/2026',
    fullName: 'Dana Levi', payerPhone: '050-123-4567', payerEmail: 'Dana@Example.com', cardSuffix: '4580',
  } }, now)
  assert.equal(n.txnId, '9876')
  assert.equal(n.amount, 2500)
  assert.equal(n.failed, false)
  assert.equal(n.phone, '0501234567')
  assert.equal(n.email, 'dana@example.com')
  assert.equal(n.paidAt.toISOString().slice(0, 10), '2026-12-10')
})

test('a recurring and a failed-recurring notice are read correctly', () => {
  const ok = readNotice({ webhookKey: 'k', transactionCode: '555', paymentSum: 50, directDebitId: '777', payerPhone: '972501234567' }, now)
  assert.deepEqual([ok.txnId, ok.amount, ok.directDebitId, ok.phone, ok.failed], ['555', 5000, '777', '0501234567', false])
  const bad = readNotice({ webhook_key: 'k', regular_payment_id: '777', sum: '50', error_message: 'card expired', charges_attempts: 2, phone: '0501234567' }, now)
  assert.deepEqual([bad.directDebitId, bad.failed, bad.error, bad.attempts], ['777', true, 'card expired', 2])
})

test('small helpers', () => {
  assert.equal(normalizePhone('+972 52-555-1234'), '0525551234')
  assert.equal(normalizePhone('03-5551234'), null)
  assert.equal(toAgorot('₪ 99.90'), 9990)
  assert.equal(parseGrowDate('', now), now)
  assert.equal(amountMatches(5000, 5050), true)
  assert.equal(amountMatches(5000, 5200), false)
  assert.match(newClassCode(), /^[A-HJKMNP-Z2-9]{6}$/)
  assert.equal(normalizeCode(' ab-c 12x '), 'ABC12X')
})
