import type { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { paywallEnabled } from '@/lib/entitlements'
import { quoteParent, quoteTeacher, toShekels, type Plan, type Quote } from './plans'
import {
  hasAccess, extendPeriod, refFor, findRef, readNotice, amountMatches, newClassCode, field, str,
} from './policy'
import { createPaymentLink, notifyOwner } from './make'

const ils = (agorot: number) => `₪${toShekels(agorot)}`

// ── Quotes ───────────────────────────────────────────────────────────────────

/** Does this teacher's class currently give its students the discount? */
async function teacherIsPaying(teacherId: string): Promise<boolean> {
  const sub = await db.subscription.findUnique({ where: { userId: teacherId } })
  return sub?.plan === 'teacher' && hasAccess(sub)
}

/** Children of this parent that sit in the class of a paying teacher. */
async function discountedChildren(userId: string): Promise<number> {
  const members = await db.classMember.findMany({
    where: { child: { userId } },
    select: { classroom: { select: { teacherId: true } } },
  })
  let n = 0
  for (const m of members) if (await teacherIsPaying(m.classroom.teacherId)) n++
  return n
}

export async function quoteFor(userId: string, plan: Plan): Promise<Quote> {
  if (plan === 'teacher') return quoteTeacher()
  const seats = await db.childProfile.count({ where: { userId } })
  return quoteParent(seats, await discountedChildren(userId))
}

// ── Checkout ─────────────────────────────────────────────────────────────────

export class BillingError extends Error {}

export async function startCheckout(opts: { userId: string; plan: Plan; phone: string; origin: string }) {
  const user = await db.user.findUnique({ where: { id: opts.userId }, include: { subscription: true } })
  if (!user) throw new BillingError('no_user')
  if (user.subscription && user.subscription.status !== 'canceled' && hasAccess(user.subscription)) {
    throw new BillingError('already_subscribed')
  }

  const q = await quoteFor(user.id, opts.plan)
  const checkout = await db.billingCheckout.create({
    data: {
      userId: user.id, plan: q.plan, seats: q.seats, discountedSeats: q.discountedSeats,
      firstAmount: q.firstAmount, monthlyAmount: q.monthlyAmount, phone: opts.phone,
    },
  })

  const productName = q.plan === 'teacher'
    ? 'Small Talk — מנוי מורה'
    : `Small Talk — מנוי הורים (${q.seats} ${q.seats === 1 ? 'ילד' : 'ילדים'})`

  return createPaymentLink({
    ref: refFor(checkout.id),
    plan: q.plan,
    title: 'Small Talk — מנוי חודשי',
    productName,
    monthlyAmount: toShekels(q.monthlyAmount),
    firstAmount: toShekels(q.firstAmount),
    fullName: (user.name ?? '').trim() || 'הורה Small Talk',
    phone: opts.phone,
    email: user.email,
    successUrl: `${opts.origin}/pricing?success=1`,
  })
}

// ── Owner tasks (manual steps on the Grow website) ───────────────────────────

async function addTask(t: { userId?: string | null; subscriptionId?: string | null; kind: string; title: string; details: string }) {
  const task = await db.billingTask.create({ data: { ...t, userId: t.userId ?? null, subscriptionId: t.subscriptionId ?? null } })
  await notifyOwner({ kind: t.kind, title: t.title, details: t.details })
  return task
}

function whoLine(s: { payerName: string | null; payerPhone: string | null; payerEmail: string | null; cardSuffix: string | null }) {
  return [s.payerName, s.payerPhone && `טלפון ${s.payerPhone}`, s.payerEmail, s.cardSuffix && `כרטיס ****${s.cardSuffix}`]
    .filter(Boolean).join(' · ')
}

// ── Payment notices ──────────────────────────────────────────────────────────

type Json = Prisma.InputJsonValue

/** A transaction we've already recorded is ignored (Grow and Make both retry). */
async function seen(txnId: string | null) {
  return txnId ? !!(await db.billingEvent.findUnique({ where: { providerTxnId: txnId } })) : false
}

/**
 * First payment of a payment link (forwarded by Make scenario 2).
 * Returns what happened, for the HTTP response / logs.
 */
export async function handleFirstPayment(payload: unknown): Promise<string> {
  const n = readNotice(payload)
  if (await seen(n.txnId)) return 'duplicate'

  const ref = findRef(payload)
  const checkout = ref ? await db.billingCheckout.findUnique({ where: { id: ref } }) : null
  if (!checkout) {
    await db.billingEvent.create({ data: { kind: 'unmatched', amount: n.amount, providerTxnId: n.txnId, raw: payload as Json } })
    await addTask({
      kind: 'unmatched_payment',
      title: 'תשלום ב-Grow שלא זוהה באתר',
      details: `התקבל תשלום ${n.amount !== null ? ils(n.amount) : ''} מ-${[n.name, n.phone, n.email].filter(Boolean).join(' · ')} שלא שויך לחשבון. בדקו ב-Grow ובמסך הניהול.`,
    })
    return 'unmatched'
  }
  if (n.failed) {
    await db.billingEvent.create({ data: { userId: checkout.userId, kind: 'first_failed', amount: n.amount, providerTxnId: n.txnId, raw: payload as Json } })
    return 'failed'
  }

  const existing = await db.subscription.findUnique({ where: { userId: checkout.userId } })
  const currentPeriodEnd = extendPeriod(existing && hasAccess(existing) ? existing.currentPeriodEnd : null, n.paidAt)
  const data = {
    plan: checkout.plan,
    status: 'active',
    seats: checkout.seats,
    discountedSeats: checkout.discountedSeats,
    monthlyAmount: checkout.monthlyAmount,
    currentPeriodEnd,
    cancelAtPeriodEnd: false,
    canceledAt: null,
    failedAttempts: 0,
    payerName: n.name,
    payerPhone: n.phone ?? checkout.phone,
    payerEmail: n.email,
    cardSuffix: n.cardSuffix,
    growDirectDebitId: n.directDebitId,
  }
  const sub = await db.subscription.upsert({
    where: { userId: checkout.userId },
    create: { userId: checkout.userId, ...data },
    update: data,
  })
  await db.billingCheckout.update({ where: { id: checkout.id }, data: { status: 'paid', paidAt: new Date() } })
  await db.billingEvent.create({
    data: { userId: checkout.userId, subscriptionId: sub.id, kind: 'first_payment', amount: n.amount, providerTxnId: n.txnId, raw: payload as Json },
  })

  if (checkout.plan === 'teacher') await ensureClassroom(checkout.userId)

  if (!amountMatches(n.amount, checkout.firstAmount) && !amountMatches(n.amount, checkout.monthlyAmount)) {
    await addTask({
      userId: checkout.userId, subscriptionId: sub.id, kind: 'unmatched_payment',
      title: 'סכום תשלום ראשון שונה מהצפוי',
      details: `${whoLine(sub)}: חויב ${n.amount !== null ? ils(n.amount) : '?'} במקום ${ils(checkout.firstAmount)}. המנוי הופעל — בדקו ב-Grow.`,
    })
  }
  return 'activated'
}

/** Which subscription does a recurring notice belong to? directDebitId first, then phone, then email. */
async function findSubForRecurring(n: ReturnType<typeof readNotice>) {
  if (n.directDebitId) {
    const byId = await db.subscription.findUnique({ where: { growDirectDebitId: n.directDebitId } })
    if (byId) return byId
  }
  for (const where of [n.phone && { payerPhone: n.phone }, n.email && { payerEmail: n.email }]) {
    if (!where) continue
    const subs = await db.subscription.findMany({ where: { ...where, growDirectDebitId: null } })
    if (subs.length === 1) return subs[0]
    const all = subs.length ? subs : await db.subscription.findMany({ where })
    if (all.length === 1) return all[0]
  }
  return null
}

/** Grow's recurring webhooks: a monthly charge succeeded (2nd month on) or failed. */
export async function handleRecurring(payload: unknown): Promise<string> {
  const n = readNotice(payload)
  const eventKey = n.failed
    ? `fail:${n.directDebitId ?? n.phone}:${n.attempts ?? 0}:${n.paidAt.toISOString().slice(0, 10)}`
    : n.txnId
  if (await seen(eventKey)) return 'duplicate'

  const sub = await findSubForRecurring(n)
  if (!sub) {
    await db.billingEvent.create({ data: { kind: 'unmatched', amount: n.amount, providerTxnId: eventKey, raw: payload as Json } })
    await addTask({
      kind: 'unmatched_payment',
      title: n.failed ? 'חיוב חודשי שנכשל — לא זוהה באתר' : 'חיוב חודשי ב-Grow שלא זוהה באתר',
      details: `${[n.name, n.phone, n.email].filter(Boolean).join(' · ')} — ${n.amount !== null ? ils(n.amount) : ''}. בדקו ב-Grow ובמסך הניהול.`,
    })
    return 'unmatched'
  }
  const learnId = !sub.growDirectDebitId && n.directDebitId ? { growDirectDebitId: n.directDebitId } : {}

  if (n.failed) {
    await db.subscription.update({
      where: { id: sub.id },
      data: { ...learnId, status: sub.status === 'canceled' ? 'canceled' : 'past_due', failedAttempts: n.attempts ?? sub.failedAttempts + 1 },
    })
    await db.billingEvent.create({ data: { userId: sub.userId, subscriptionId: sub.id, kind: 'recurring_failed', amount: n.amount, providerTxnId: eventKey, raw: payload as Json } })
    return 'failed'
  }

  await db.billingEvent.create({ data: { userId: sub.userId, subscriptionId: sub.id, kind: 'recurring', amount: n.amount, providerTxnId: eventKey, raw: payload as Json } })

  if (sub.status === 'canceled') {
    // The owner hasn't cancelled the standing order in Grow yet — the parent was charged after cancelling.
    await db.subscription.update({ where: { id: sub.id }, data: learnId })
    await addTask({
      userId: sub.userId, subscriptionId: sub.id, kind: 'refund_check',
      title: 'חיוב אחרי ביטול — לבטל ולהחזיר',
      details: `${whoLine(sub)} ביקש/ה לבטל, אבל Grow חייב ${n.amount !== null ? ils(n.amount) : ''}. בטלו את הוראת הקבע ב-Grow ושקלו החזר.`,
    })
    return 'charged_after_cancel'
  }

  const update: Prisma.SubscriptionUpdateInput = {
    ...learnId,
    status: 'active',
    failedAttempts: 0,
    currentPeriodEnd: extendPeriod(sub.currentPeriodEnd, n.paidAt),
    ...(n.cardSuffix ? { cardSuffix: n.cardSuffix } : {}),
  }
  if (n.amount !== null) update.monthlyAmount = n.amount
  await db.subscription.update({ where: { id: sub.id }, data: update })

  // The owner changed the amount in Grow → close the matching task and record the new seats.
  if (sub.plan === 'parent' && n.amount !== null) {
    const q = await quoteFor(sub.userId, 'parent')
    if (amountMatches(n.amount, q.monthlyAmount)) {
      await db.subscription.update({ where: { id: sub.id }, data: { seats: q.seats, discountedSeats: q.discountedSeats } })
      await db.billingTask.updateMany({ where: { subscriptionId: sub.id, kind: 'change_amount', status: 'open' }, data: { status: 'done', doneAt: new Date() } })
    }
  }
  return 'renewed'
}

// ── Changes made by the parent / teacher on our site ─────────────────────────

/**
 * After children / class membership change: if the monthly amount Grow charges no
 * longer matches the price, ask the owner to change it (one open task per subscription).
 */
export async function syncAmount(userId: string): Promise<void> {
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub || sub.plan !== 'parent' || sub.status === 'canceled' || !hasAccess(sub)) return

  const q = await quoteFor(userId, 'parent')
  const open = await db.billingTask.findFirst({ where: { subscriptionId: sub.id, kind: 'change_amount', status: 'open' } })
  if (amountMatches(sub.monthlyAmount, q.monthlyAmount)) {
    if (open) await db.billingTask.update({ where: { id: open.id }, data: { status: 'done', doneAt: new Date() } })
    return
  }
  const details = `${whoLine(sub)}: שנו את סכום הוראת הקבע ב-Grow מ-${ils(sub.monthlyAmount)} ל-${ils(q.monthlyAmount)} לחודש ` +
    `(${q.seats} ${q.seats === 1 ? 'ילד' : 'ילדים'}${q.discountedSeats ? `, ${q.discountedSeats} בהנחת כיתה` : ''}).`
  if (open) {
    await db.billingTask.update({ where: { id: open.id }, data: { details } })
  } else {
    await addTask({ userId, subscriptionId: sub.id, kind: 'change_amount', title: 'לשנות סכום הוראת קבע', details })
  }
}

export async function cancelSubscription(userId: string): Promise<void> {
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub || sub.status === 'canceled') return
  await db.subscription.update({ where: { id: sub.id }, data: { status: 'canceled', cancelAtPeriodEnd: true, canceledAt: new Date() } })
  await db.billingTask.updateMany({ where: { subscriptionId: sub.id, kind: 'change_amount', status: 'open' }, data: { status: 'done', doneAt: new Date() } })
  await addTask({
    userId, subscriptionId: sub.id, kind: 'cancel',
    title: 'לבטל הוראת קבע ב-Grow',
    details: `${whoLine(sub)} (${sub.plan === 'teacher' ? 'מורה' : 'הורה'}, ${ils(sub.monthlyAmount)} לחודש) ביקש/ה לבטל. ` +
      `בטלו את הוראת הקבע ב-Grow לפני ${sub.currentPeriodEnd.toLocaleDateString('he-IL')}. הגישה נשארת עד התאריך הזה.`,
  })
}

/** Undo a cancel — only while the owner hasn't cancelled it in Grow yet (task still open). */
export async function undoCancel(userId: string): Promise<boolean> {
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub || sub.status !== 'canceled' || !hasAccess(sub)) return false
  const open = await db.billingTask.findFirst({ where: { subscriptionId: sub.id, kind: 'cancel', status: 'open' } })
  if (!open) return false
  await db.billingTask.update({ where: { id: open.id }, data: { status: 'done', doneAt: new Date(), details: open.details + ' — בוטל על ידי המשתמש, אין צורך לבטל ב-Grow.' } })
  await db.subscription.update({ where: { id: sub.id }, data: { status: 'active', cancelAtPeriodEnd: false, canceledAt: null } })
  return true
}

/** Before an account is deleted: a running standing order must be cancelled in Grow. */
export async function beforeAccountDelete(userId: string): Promise<void> {
  const sub = await db.subscription.findUnique({ where: { userId } })
  if (!sub || sub.status === 'canceled' || !hasAccess(sub)) return
  await addTask({
    userId: null, subscriptionId: null, kind: 'cancel',
    title: 'חשבון נמחק — לבטל הוראת קבע ב-Grow',
    details: `${whoLine(sub)} מחק/ה את החשבון באתר. בטלו את הוראת הקבע (${ils(sub.monthlyAmount)} לחודש) ב-Grow מיד.`,
  })
}

// ── Classes ──────────────────────────────────────────────────────────────────

export async function ensureClassroom(teacherId: string) {
  const existing = await db.classroom.findUnique({ where: { teacherId } })
  if (existing) return existing
  const user = await db.user.findUnique({ where: { id: teacherId }, select: { name: true } })
  for (let i = 0; i < 5; i++) {
    try {
      return await db.classroom.create({ data: { teacherId, code: newClassCode(), name: user?.name ? `הכיתה של ${user.name}` : 'הכיתה שלי' } })
    } catch (e) {
      if (i === 4) throw e // code collision — try another code
    }
  }
  throw new Error('unreachable')
}

/** Teachers see the class view when they pay for the teacher plan (or while the site is free). */
export async function canUseClass(userId: string): Promise<boolean> {
  if (!paywallEnabled()) return true
  return teacherIsPaying(userId)
}

/** For the recurring webhook route: Grow's webhook key, wherever it sits in the payload. */
export const payloadWebhookKey = (p: unknown) => str(field(p, ['webhookKey', 'webhook_key']))
