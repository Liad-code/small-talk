/**
 * Pure billing rules — no database, no network, so they can be unit-tested:
 *   node --test src/lib/billing/policy.test.ts
 *
 * Model: Grow runs a monthly standing order (הוראת קבע). Each successful charge it
 * reports moves `currentPeriodEnd` one month forward. Access simply follows
 * `currentPeriodEnd` (+ a short grace for Grow's retries), so if the owner forgets
 * a manual step in Grow, access still ends on its own when payments stop.
 */

export const GRACE_DAYS = 5

export interface SubLike {
  status: string // active | past_due | canceled
  currentPeriodEnd: Date
}

export function hasAccess(sub: SubLike | null | undefined, now = new Date()): boolean {
  if (!sub) return false
  const end = sub.currentPeriodEnd.getTime()
  if (sub.status === 'canceled') return now.getTime() < end
  return now.getTime() < end + GRACE_DAYS * 86_400_000
}

/** Same day next month, clamped (Jan 31 → Feb 28/29). */
export function addMonth(d: Date): Date {
  const r = new Date(d.getTime())
  const day = r.getUTCDate()
  r.setUTCDate(1)
  r.setUTCMonth(r.getUTCMonth() + 1)
  const last = new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth() + 1, 0)).getUTCDate()
  r.setUTCDate(Math.min(day, last))
  return r
}

/** A monthly charge succeeded on `paidAt`: the new end of the paid period. */
export function extendPeriod(currentEnd: Date | null, paidAt: Date): Date {
  const base = currentEnd && currentEnd > paidAt ? currentEnd : paidAt
  return addMonth(base)
}

// ── Checkout reference ───────────────────────────────────────────────────────
// Our BillingCheckout id (a cuid) travels through Grow as "ST<id>" in the
// payment link's custom field and product catalog number.

export const refFor = (checkoutId: string) => `ST${checkoutId}`

/** Finds our checkout reference anywhere in a Grow payload. */
export function findRef(payload: unknown): string | null {
  const m = JSON.stringify(payload ?? null).match(/ST(c[a-z0-9]{20,30})/)
  return m ? m[1] : null
}

// ── Reading Grow payloads ────────────────────────────────────────────────────
// Grow's payloads differ per source (payment link / recurring / failed recurring)
// and Make may wrap or flatten them, so fields are searched by name at any depth.

export function field(obj: unknown, names: string[], depth = 0): unknown {
  if (!obj || typeof obj !== 'object' || depth > 5) return undefined
  const rec = obj as Record<string, unknown>
  for (const n of names) {
    if (rec[n] !== undefined && rec[n] !== null && rec[n] !== '') return rec[n]
  }
  for (const v of Object.values(rec)) {
    if (v && typeof v === 'object') {
      const found = field(v, names, depth + 1)
      if (found !== undefined) return found
    }
  }
  return undefined
}

export const str = (v: unknown): string | null =>
  v === undefined || v === null || v === '' ? null : String(v).trim()

/** "50", "50.00", 50 → 5000 agorot. */
export function toAgorot(v: unknown): number | null {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? Math.round(n * 100) : null
}

/** Israeli mobile → "05XXXXXXXX", or null if it isn't one. */
export function normalizePhone(v: unknown): string | null {
  let d = String(v ?? '').replace(/\D/g, '')
  if (d.startsWith('972')) d = '0' + d.slice(3)
  if (d.length === 9 && d.startsWith('5')) d = '0' + d
  return /^05\d{8}$/.test(d) ? d : null
}

/** Grow dates come as "dd/mm/yyyy[ hh:mm[:ss]]" or ISO. Falls back to now. */
export function parseGrowDate(v: unknown, now = new Date()): Date {
  const s = str(v)
  if (!s) return now
  const m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/)
  if (m) {
    const [, dd, mm, yyyy, hh = '12', mi = '0', ss = '0'] = m
    // Israel time ≈ UTC+2/3 — only the day matters here, noon-ish keeps it on the right day
    const d = new Date(Date.UTC(+yyyy, +mm - 1, +dd, +hh - 2, +mi, +ss))
    return Number.isNaN(d.getTime()) ? now : d
  }
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? now : d
}

export interface PaymentNotice {
  txnId: string | null
  amount: number | null
  paidAt: Date
  phone: string | null
  email: string | null
  name: string | null
  cardSuffix: string | null
  directDebitId: string | null
  failed: boolean
  error: string | null
  attempts: number | null
}

/** Normalises any Grow payment payload (first payment, recurring, failed recurring). */
export function readNotice(p: unknown, now = new Date()): PaymentNotice {
  const statusCode = str(field(p, ['statusCode', 'status_code']))
  const errorMsg = str(field(p, ['error_message', 'errorMessage']))
  return {
    txnId: str(field(p, ['transactionId', 'transactionCode', 'transaction_code', 'asmachta'])),
    amount: toAgorot(field(p, ['sum', 'paymentSum', 'amount'])),
    paidAt: parseGrowDate(field(p, ['paymentDate', 'payment_date']), now),
    phone: normalizePhone(field(p, ['payerPhone', 'phone', 'payer_phone'])),
    email: str(field(p, ['payerEmail', 'email', 'payer_email']))?.toLowerCase() ?? null,
    name: str(field(p, ['fullName', 'payer_name', 'payerName'])),
    cardSuffix: str(field(p, ['cardSuffix', 'card_suffix'])),
    directDebitId: str(field(p, ['directDebitId', 'regular_payment_id', 'regularPaymentId'])),
    // Grow statusCode 2 = paid. A failed-recurring payload has error_message / charges_attempts.
    failed: !!errorMsg || field(p, ['charges_attempts']) !== undefined || (statusCode !== null && statusCode !== '2'),
    error: errorMsg,
    attempts: (() => { const a = Number(field(p, ['charges_attempts'])); return Number.isFinite(a) ? a : null })(),
  }
}

/** True when a charged amount matches what we expected (±₪1 for rounding). */
export const amountMatches = (charged: number | null, expected: number) =>
  charged !== null && Math.abs(charged - expected) <= 100

// ── Class codes ──────────────────────────────────────────────────────────────

const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // no 0/O, 1/I/L

export function newClassCode(): string {
  const bytes = new Uint8Array(6)
  globalThis.crypto.getRandomValues(bytes)
  return Array.from(bytes, b => CODE_CHARS[b % CODE_CHARS.length]).join('')
}

export const normalizeCode = (v: unknown) => String(v ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12)
