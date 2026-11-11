import { db } from '@/lib/db'
import * as grow from '@/lib/billing/grow'
import {
  amountFor, seatsFor, startTrial, dueAction, onEnd, onChargeSucceeded,
  onChargeFailed, onCancel, onResume, type SubState, type SubStatus,
} from '@/lib/billing/policy'

/**
 * Billing service: the database side of subscriptions. Rules live in
 * policy.ts, provider calls in grow.ts; this file wires them together.
 */

export class BillingError extends Error {
  constructor(public code: 'not_configured' | 'already_subscribed' | 'no_subscription' | 'cannot_resume', message?: string) {
    super(message ?? code)
  }
}

function state(sub: {
  status: string; currentPeriodEnd: Date; nextChargeAt: Date | null; failedAttempts: number; cancelAtPeriodEnd: boolean
}): SubState {
  return {
    status: sub.status as SubStatus,
    currentPeriodEnd: sub.currentPeriodEnd,
    nextChargeAt: sub.nextChargeAt,
    failedAttempts: sub.failedAttempts,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
  }
}

async function childCount(userId: string): Promise<number> {
  return db.childProfile.count({ where: { userId } })
}

/** Step 1 of signup: create a Grow page where the parent saves a card. Returns its URL. */
export async function startCheckout(userId: string, origin: string): Promise<string> {
  const cfg = grow.growConfig()
  if (!cfg) throw new BillingError('not_configured')

  const existing = await db.subscription.findUnique({ where: { userId } })
  if (existing && existing.status !== 'canceled') throw new BillingError('already_subscribed')

  const user = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { name: true, email: true } })
  const seats = seatsFor(await childCount(userId))
  const amount = amountFor(seats)

  const page = await grow.createCardSetupPage(cfg, {
    ourUserId: userId,
    fullName: user.name ?? user.email,
    email: user.email,
    amountAgorot: amount,
    description: `Small Talk — ${seats} ${seats === 1 ? 'child' : 'children'}, monthly`,
    successUrl: `${origin}/pricing?success=1`,
    cancelUrl: `${origin}/pricing?canceled=1`,
    notifyUrl: `${origin}/api/billing/grow/notify`,
  })

  await db.billingTransaction.create({
    data: { userId, kind: 'setup', status: 'pending', amount, seats, processId: page.processId },
  })
  return page.url
}

/**
 * Grow's server notification after the card page. Idempotent: a repeated
 * notification for the same process is ignored once handled.
 */
export async function handleSetupNotify(raw: Record<string, unknown>): Promise<'ok' | 'ignored'> {
  const cfg = grow.growConfig()
  if (!cfg) throw new BillingError('not_configured')
  const n = grow.parseNotify(raw)
  if (!n.processId || !n.processToken) return 'ignored'

  // Only trust processes WE created, still pending, for the user Grow echoes back.
  const txn = await db.billingTransaction.findUnique({ where: { processId: n.processId } })
  if (!txn || txn.status !== 'pending' || txn.kind !== 'setup') return 'ignored'
  if (n.ourUserId && n.ourUserId !== txn.userId) return 'ignored'

  const confirmed = n.succeeded && n.cardToken && (await grow.confirmProcess(cfg, n.processId, n.processToken))
  if (!confirmed) {
    await db.billingTransaction.update({ where: { id: txn.id }, data: { status: 'failed', error: 'setup not confirmed' } })
    return 'ok'
  }

  const t = startTrial(new Date())
  const sub = await db.subscription.upsert({
    where: { userId: txn.userId },
    create: {
      userId: txn.userId, provider: 'grow', seats: txn.seats,
      cardToken: n.cardToken, cardSuffix: n.cardSuffix,
      status: t.status, trialEnd: t.trialEnd, currentPeriodEnd: t.currentPeriodEnd,
      nextChargeAt: t.nextChargeAt, failedAttempts: 0, cancelAtPeriodEnd: false,
    },
    // Re-subscribing after a canceled sub: fresh card, fresh trial-less cycle is a
    // product decision — for now a returning parent gets the same 7-day trial.
    update: {
      seats: txn.seats, cardToken: n.cardToken, cardSuffix: n.cardSuffix, recurringDebitId: null,
      status: t.status, trialEnd: t.trialEnd, currentPeriodEnd: t.currentPeriodEnd,
      nextChargeAt: t.nextChargeAt, failedAttempts: 0, cancelAtPeriodEnd: false, canceledAt: null,
    },
  })
  await db.billingTransaction.update({
    where: { id: txn.id },
    data: { status: 'succeeded', subscriptionId: sub.id, providerTxnId: n.transactionId },
  })
  return 'ok'
}

/**
 * Daily cron: end canceled subs whose period is over, charge the rest that are
 * due. Each row is first "leased": a conditional update moves nextChargeAt an
 * hour ahead, so two overlapping runs can never charge the same parent twice,
 * and a run that dies mid-way only delays that charge to the next run.
 */
const LEASE_MS = 60 * 60 * 1000
/** Charges per run — keeps one run inside the serverless time limit. */
export const CHARGES_PER_RUN = 40

export async function runDueCharges(now = new Date()): Promise<{ charged: number; failed: number; ended: number; skipped: number }> {
  const cfg = grow.growConfig()
  if (!cfg) throw new BillingError('not_configured')
  const due = await db.subscription.findMany({
    where: { status: { in: ['trialing', 'active', 'past_due'] }, nextChargeAt: { lte: now } },
    orderBy: { nextChargeAt: 'asc' },
    take: CHARGES_PER_RUN,
  })
  const out = { charged: 0, failed: 0, ended: 0, skipped: 0 }

  for (const sub of due) {
    const claim = await db.subscription.updateMany({
      where: { id: sub.id, nextChargeAt: sub.nextChargeAt },
      data: { nextChargeAt: new Date(now.getTime() + LEASE_MS) },
    })
    if (claim.count !== 1) { out.skipped++; continue }
    const s = state(sub)

    if (dueAction(s) === 'end' || !sub.cardToken) {
      const e = onEnd(s, now)
      await db.subscription.update({ where: { id: sub.id }, data: { status: e.status, nextChargeAt: null, canceledAt: e.canceledAt } })
      out.ended++
      continue
    }

    const seats = seatsFor(await childCount(sub.userId))
    const amount = amountFor(seats, sub.pricePerSeat)
    const txn = await db.billingTransaction.create({
      data: { userId: sub.userId, subscriptionId: sub.id, kind: 'renewal', status: 'pending', amount, seats },
    })

    let result: Awaited<ReturnType<typeof grow.chargeToken>>
    try {
      result = await grow.chargeToken(cfg, {
        cardToken: sub.cardToken, recurringDebitId: sub.recurringDebitId, amountAgorot: amount,
        description: `Small Talk — ${seats} ${seats === 1 ? 'child' : 'children'}, monthly`,
      })
    } catch (e) {
      result = { ok: false, error: e instanceof Error ? e.message : 'charge error' }
    }

    if (result.ok) {
      const next = onChargeSucceeded(s, now)
      await db.$transaction([
        db.subscription.update({ where: { id: sub.id }, data: {
          status: next.status, currentPeriodEnd: next.currentPeriodEnd, nextChargeAt: next.nextChargeAt,
          failedAttempts: 0, seats, recurringDebitId: result.recurringDebitId,
        } }),
        db.billingTransaction.update({ where: { id: txn.id }, data: { status: 'succeeded', providerTxnId: result.transactionId } }),
      ])
      out.charged++
    } else {
      const next = onChargeFailed(s, now)
      await db.$transaction([
        db.subscription.update({ where: { id: sub.id }, data: {
          status: next.status, nextChargeAt: next.nextChargeAt, failedAttempts: next.failedAttempts,
          ...(next.status === 'canceled' ? { canceledAt: now } : {}),
        } }),
        db.billingTransaction.update({ where: { id: txn.id }, data: { status: 'failed', error: result.error.slice(0, 500) } }),
      ])
      out.failed++
    }
  }
  return out
}

/** Parent cancels online (Israeli consumer law: same channel as signup). Access lasts to the period end. */
export async function cancelSubscription(userId: string): Promise<Date> {
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub || sub.status === 'canceled') throw new BillingError('no_subscription')
  const next = onCancel(state(sub))
  await db.subscription.update({ where: { userId }, data: { cancelAtPeriodEnd: next.cancelAtPeriodEnd } })
  return sub.currentPeriodEnd
}

/** Undo a cancel before the period ends. */
export async function resumeSubscription(userId: string): Promise<void> {
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub) throw new BillingError('no_subscription')
  const next = onResume(state(sub), new Date())
  if (!next) throw new BillingError('cannot_resume')
  await db.subscription.update({ where: { userId }, data: { cancelAtPeriodEnd: false } })
}
