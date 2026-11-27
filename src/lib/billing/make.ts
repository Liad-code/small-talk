import { timingSafeEqual } from 'node:crypto'

/**
 * Make (make.com) is the bridge to Grow — see docs/billing-make-setup.md.
 *
 * Scenario A "Small Talk → Grow" (one webhook, a router on `action`):
 *   checkout             → Grow "Create Payment Link" (recurring)  → responds { url }
 *   update_direct_debit  → Grow "Make an API Call" POST /updateDirectDebit (new amount / cancel / resume)
 *                          → responds Grow's answer ({ status: 1, … } = success)
 *   task                 → email to the owner (a manual step in Grow)
 * Scenario B "Grow → Small Talk": Grow "Notify URL Webhook" → Approve Transaction → POST /api/billing/make/notify
 *
 * Env (server only — never NEXT_PUBLIC):
 *   MAKE_WEBHOOK_URL     scenario A webhook address
 *   MAKE_SHARED_SECRET   long random string; we send it in the body (`secret`, checked by the route
 *                        filters) and as `x-make-apikey`; Make sends it back as `Authorization: Bearer …`
 */

export function makeConfigured(): boolean {
  return !!(process.env.MAKE_WEBHOOK_URL && process.env.MAKE_SHARED_SECRET)
}

async function callMake(action: string, payload: Record<string, unknown>, timeoutMs: number): Promise<{ status: number; text: string }> {
  const url = process.env.MAKE_WEBHOOK_URL
  const secret = process.env.MAKE_SHARED_SECRET
  if (!url || !secret) throw new Error('make_not_configured')
  const res = await fetch(url, {
    method: 'POST',
    // `secret` in the body: every route of scenario A has a filter requiring it (Make's own
    // webhook API-key setting can be added in the Make editor as an extra layer — same value).
    headers: { 'content-type': 'application/json', 'x-make-apikey': secret },
    body: JSON.stringify({ action, secret, ...payload }),
    signal: AbortSignal.timeout(timeoutMs),
  })
  return { status: res.status, text: await res.text() }
}

export interface PaymentLinkRequest {
  ref: string            // "ST<checkoutId>" — must come back in the payment notice
  plan: 'parent' | 'teacher'
  title: string          // shown on the Grow page
  productName: string
  price: number          // ₪ (not agorot) — the FIRST charge; the site raises it to monthlyAmount right after
  monthlyAmount: number  // ₪ — for reference / the owner
  fullName: string
  phone: string          // 05XXXXXXXX (Grow requires an Israeli mobile)
  email: string
  successUrl: string
}

/** Asks Make to create a Grow recurring payment link. Returns the payment page URL. */
export async function createPaymentLink(req: PaymentLinkRequest): Promise<string> {
  const { status, text } = await callMake('checkout', { ...req }, 25_000)
  if (status < 200 || status >= 300) throw new Error(`make_checkout_${status}`)
  let link: unknown
  try { link = (JSON.parse(text) as { url?: unknown }).url } catch { link = text.trim() }
  if (typeof link !== 'string' || !/^https:\/\/[^\s"'<>]+$/.test(link)) throw new Error('make_checkout_no_url')
  return link
}

export interface DirectDebitRef { transactionId: string; transactionToken: string; asmachta: string }
export type DirectDebitChange = { sum: number } | { changeStatus: 1 | 2 } // sum in ₪ · 1 = active, 2 = canceled

/**
 * Changes a Grow standing order (via Make → Grow updateDirectDebit). Returns true only when
 * Grow confirms (status 1). Never throws — the caller falls back to a manual task.
 */
export async function updateDirectDebit(ref: DirectDebitRef, change: DirectDebitChange): Promise<boolean> {
  // Grow's updateDirectDebit needs their paid API plan (Grow's Make "Make an API Call" module fails
  // without it). Off by default → the caller creates a manual task for the owner right away.
  if (process.env.GROW_DIRECT_DEBIT_API !== 'true') return false
  try {
    // `growBody` = exactly the JSON body for Grow's updateDirectDebit, as text — Grow's Make
    // "Make an API Call" module needs a string body; the scenario passes it through untouched.
    const { status, text } = await callMake('update_direct_debit', { ...ref, ...change, growBody: JSON.stringify({ ...ref, ...change }) }, 20_000)
    if (status < 200 || status >= 300) return false
    const body = JSON.parse(text) as { status?: unknown; err?: unknown }
    return String(body.status) === '1' && !body.err
  } catch (e) {
    console.error('updateDirectDebit failed', e)
    return false
  }
}

export interface OwnerTask { kind: string; title: string; details: string }

/** Emails the owner (through Make) about a manual step in Grow. Never throws. */
export async function notifyOwner(task: OwnerTask): Promise<void> {
  if (!makeConfigured()) return
  const site = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? 'https://small-talk.online'
  try {
    await callMake('task', { ...task, adminUrl: `${site.replace(/\/$/, '')}/admin#billing` }, 10_000)
  } catch (e) {
    console.error('notifyOwner failed', e)
  }
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

/** True if the request carries our shared secret (calls from Make). */
export function isFromMake(req: Request): boolean {
  const secret = process.env.MAKE_SHARED_SECRET
  if (!secret || secret.length < 24) return false
  const auth = req.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  return !!token && safeEqual(token, secret)
}

/**
 * Grow's own recurring webhooks (2nd month onward / failed charge — enabled by Grow
 * support) carry the account's webhook key. GROW_WEBHOOK_KEY must match it.
 */
export function hasGrowWebhookKey(payloadKey: string | null): boolean {
  const key = process.env.GROW_WEBHOOK_KEY
  return !!key && !!payloadKey && safeEqual(payloadKey, key)
}

/**
 * Grow's webhook form has a "פרמטר מזהה" (identifier) field that is echoed in every notice.
 * The owner sets it to the same long random secret as GROW_WEBHOOK_KEY; the field name Grow
 * uses for it isn't documented, so any string value in the payload (a few levels deep) may
 * carry it. Covers the account `webhookKey` too. Requires a key of at least 24 characters.
 */
export function payloadHasGrowKey(payload: unknown): boolean {
  const key = process.env.GROW_WEBHOOK_KEY
  if (!key || key.length < 24) return false
  const values: string[] = []
  const walk = (v: unknown, depth: number) => {
    if (values.length > 500) return
    if (typeof v === 'string') values.push(v.trim())
    else if (v && typeof v === 'object' && depth < 4) for (const x of Object.values(v as Record<string, unknown>)) walk(x, depth + 1)
  }
  walk(payload, 0)
  return values.some(v => v.length === key.length && safeEqual(v, key))
}
