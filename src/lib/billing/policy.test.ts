// Run: node --test src/lib/billing/policy.test.ts   (Node 23.6+ strips the types)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  addMonths, amountFor, seatsFor, startTrial, isDue, dueAction, onEnd,
  onChargeSucceeded, onChargeFailed, onCancel, onResume, hasAccess,
  PRICE_PER_SEAT_AGOROT, TRIAL_DAYS, RETRY_AFTER_DAYS,
} from './policy.ts'

const d = (s: string) => new Date(s)

test('price is ₪50 per child, at least one seat', () => {
  assert.equal(PRICE_PER_SEAT_AGOROT, 5000)
  assert.equal(amountFor(1), 5000)
  assert.equal(amountFor(3), 15000)
  assert.equal(seatsFor(0), 1)
  assert.equal(amountFor(0), 5000)
})

test('addMonths clamps to the last day of shorter months', () => {
  assert.equal(addMonths(d('2026-01-31T10:00:00Z'), 1).toISOString(), '2026-02-28T10:00:00.000Z')
  assert.equal(addMonths(d('2028-01-31T10:00:00Z'), 1).toISOString(), '2028-02-29T10:00:00.000Z')
  assert.equal(addMonths(d('2026-12-15T10:00:00Z'), 1).toISOString(), '2027-01-15T10:00:00.000Z')
})

test('trial: 7 days free, first charge when it ends, access meanwhile', () => {
  const now = d('2026-11-11T09:00:00Z')
  const t = startTrial(now)
  assert.equal(TRIAL_DAYS, 7)
  assert.equal(t.status, 'trialing')
  assert.equal(t.nextChargeAt!.toISOString(), '2026-11-18T09:00:00.000Z')
  assert.equal(t.currentPeriodEnd.toISOString(), t.trialEnd.toISOString())
  assert.equal(hasAccess(t), true)
  assert.equal(isDue(t, d('2026-11-17T09:00:00Z')), false)
  assert.equal(isDue(t, d('2026-11-18T09:00:00Z')), true)
})

test('first charge after trial starts a monthly cycle on the trial-end date', () => {
  const t = startTrial(d('2026-11-11T09:00:00Z'))
  const s = onChargeSucceeded(t, d('2026-11-18T09:05:00Z'))
  assert.equal(s.status, 'active')
  assert.equal(s.currentPeriodEnd.toISOString(), '2026-12-18T09:00:00.000Z')
  assert.equal(s.nextChargeAt!.toISOString(), '2026-12-18T09:00:00.000Z')
})

test('failed charges retry on days 1, 3, 7 with access, then stop', () => {
  assert.deepEqual([...RETRY_AFTER_DAYS], [1, 3, 7])
  let s = onChargeSucceeded(startTrial(d('2026-11-11T09:00:00Z')), d('2026-11-18T09:00:00Z'))
  const due = s.nextChargeAt!
  s = onChargeFailed(s, due)
  assert.equal(s.status, 'past_due'); assert.equal(hasAccess(s), true)
  assert.equal(s.nextChargeAt!.toISOString(), '2026-12-19T09:00:00.000Z')
  s = onChargeFailed(s, s.nextChargeAt!)
  assert.equal(s.nextChargeAt!.toISOString(), '2026-12-22T09:00:00.000Z')
  s = onChargeFailed(s, s.nextChargeAt!)
  assert.equal(s.nextChargeAt!.toISOString(), '2026-12-29T09:00:00.000Z')
  s = onChargeFailed(s, s.nextChargeAt!)
  assert.equal(s.status, 'canceled'); assert.equal(s.nextChargeAt, null); assert.equal(hasAccess(s), false)
})

test('a retry that succeeds keeps the original billing date', () => {
  let s = onChargeSucceeded(startTrial(d('2026-11-11T09:00:00Z')), d('2026-11-18T09:00:00Z'))
  s = onChargeFailed(s, d('2026-12-18T09:00:00Z'))
  s = onChargeSucceeded(s, d('2026-12-19T09:00:00Z'))
  assert.equal(s.status, 'active'); assert.equal(s.failedAttempts, 0)
  assert.equal(s.currentPeriodEnd.toISOString(), '2027-01-18T09:00:00.000Z')
})

test('cancel: no further charge, access until the period ends, then ends', () => {
  let s = onChargeSucceeded(startTrial(d('2026-11-11T09:00:00Z')), d('2026-11-18T09:00:00Z'))
  s = onCancel(s)
  assert.equal(hasAccess(s), true)
  assert.equal(dueAction(s), 'end')
  const ended = onEnd(s, s.nextChargeAt!)
  assert.equal(ended.status, 'canceled'); assert.equal(hasAccess(ended), false)
  assert.equal(isDue(ended, d('2027-06-01T00:00:00Z')), false)
})

test('canceling during the trial means never being charged', () => {
  const s = onCancel(startTrial(d('2026-11-11T09:00:00Z')))
  assert.equal(dueAction(s), 'end')
})

test('resume undoes a cancel only before the period ended', () => {
  const s = onCancel(onChargeSucceeded(startTrial(d('2026-11-11T09:00:00Z')), d('2026-11-18T09:00:00Z')))
  assert.equal(onResume(s, d('2026-12-01T00:00:00Z'))!.cancelAtPeriodEnd, false)
  assert.equal(onResume(s, d('2026-12-19T00:00:00Z')), null)
  assert.equal(onResume(onEnd(s, d('2026-12-18T09:00:00Z')), d('2026-12-10T00:00:00Z')), null)
})
