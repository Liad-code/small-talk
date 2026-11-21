import { timingSafeEqual } from 'node:crypto'

/**
 * Make (make.com) is the bridge to Grow — see docs/billing-make-setup.md.
 *
 *   our site ──► Make scenario 1 (webhook) ──► Grow "Create Payment Link" ──► { url } back to us
 *   Grow payment ──► Make scenario 2 (Grow "Notify URL Webhook" + Approve) ──► POST /api/billing/make/notify
 *   our site ──► Make scenario 3 (webhook) ──► email to the owner (a manual task in Grow)
 *
 * Env (server only — never NEXT_PUBLIC):
 *   MAKE_CHECKOUT_WEBHOOK_URL   scenario 1 webhook address
 *   MAKE_TASKS_WEBHOOK_URL      scenario 3 webhook address
 *   MAKE_SHARED_SECRET          long random string; we send it to Make as `x-make-apikey`,
 *                               Make sends it back to us as `Authorization: Bearer …`
 */

export function makeConfigured(): boolean {
  return !!(process.env.MAKE_CHECKOUT_WEBHOOK_URL && process.env.MAKE_SHARED_SECRET)
}

export interface PaymentLinkRequest {
  ref: string            // "ST<checkoutId>" — must come back in the payment notice
  plan: 'parent' | 'teacher'
  title: string          // shown on the Grow page
  productName: string
  monthlyAmount: number  // ₪ (not agorot) — the standing-order amount from month 2
  firstAmount: number    // ₪ — the first (discounted) month
  fullName: string
  phone: string          // 05XXXXXXXX (Grow requires an Israeli mobile)
  email: string
  successUrl: string
}

/** Asks Make to create a Grow recurring payment link. Returns the payment page URL. */
export async function createPaymentLink(req: PaymentLinkRequest): Promise<string> {
  const url = process.env.MAKE_CHECKOUT_WEBHOOK_URL
  const secret = process.env.MAKE_SHARED_SECRET
  if (!url || !secret) throw new Error('make_not_configured')

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-make-apikey': secret },
    body: JSON.stringify(req),
    signal: AbortSignal.timeout(25_000),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`make_checkout_${res.status}`)
  let link: unknown
  try { link = (JSON.parse(text) as { url?: unknown }).url } catch { link = text.trim() }
  if (typeof link !== 'string' || !/^https:\/\/[^\s"'<>]+$/.test(link)) throw new Error('make_checkout_no_url')
  return link
}

export interface OwnerTask { kind: string; title: string; details: string }

/** Emails the owner (through Make) about a manual step in Grow. Never throws. */
export async function notifyOwner(task: OwnerTask): Promise<void> {
  const url = process.env.MAKE_TASKS_WEBHOOK_URL
  const secret = process.env.MAKE_SHARED_SECRET
  if (!url || !secret) return
  const site = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? 'https://small-talk.online'
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-make-apikey': secret },
      body: JSON.stringify({ ...task, adminUrl: `${site.replace(/\/$/, '')}/admin#billing` }),
      signal: AbortSignal.timeout(10_000),
    })
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
