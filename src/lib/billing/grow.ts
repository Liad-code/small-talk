/**
 * Grow (formerly Meshulam) adapter — the ONLY file that talks to Grow.
 *
 * Confirmed from the official docs (developers.grow.business, 2026-11-11):
 *   - every call is server-side (browser calls are blocked)
 *   - sandbox base: https://sandbox.meshulam.co.il/api/light/server/1.0/
 *   - each environment has its own pageCode / userId / apiKey
 *   - createPaymentProcess → processId, processToken, hosted page url
 *   - token billing we manage: first charge createTransactionWithToken with
 *     isRecurringDebitId=1, later charges with recurringDebitId
 *
 * Lines marked `VERIFY` follow Grow's usual Light-API conventions but were not
 * visible in the public docs — check each one against the sandbox before
 * going live (see the plan's "Questions for Grow").
 */

const SANDBOX_BASE = 'https://sandbox.meshulam.co.il/api/light/server/1.0/'
// VERIFY: production base URL (Grow issues live access after approving the integration)
const PRODUCTION_BASE = 'https://secure.meshulam.co.il/api/light/server/1.0/'

interface GrowConfig {
  base: string
  pageCode: string
  userId: string
  apiKey: string
}

/** Null when Grow isn't configured — billing endpoints then answer 503 and nothing is charged. */
export function growConfig(): GrowConfig | null {
  const { GROW_PAGE_CODE, GROW_USER_ID, GROW_API_KEY, GROW_ENV } = process.env
  if (!GROW_PAGE_CODE || !GROW_USER_ID || !GROW_API_KEY) return null
  return {
    base: GROW_ENV === 'production' ? PRODUCTION_BASE : SANDBOX_BASE,
    pageCode: GROW_PAGE_CODE,
    userId: GROW_USER_ID,
    apiKey: GROW_API_KEY,
  }
}

const shekels = (agorot: number) => (agorot / 100).toFixed(2)

interface GrowResponse {
  status?: number | string
  err?: string | { message?: string }
  data?: Record<string, unknown>
}

async function call(cfg: GrowConfig, endpoint: string, fields: Record<string, string>): Promise<GrowResponse> {
  const body = new FormData() // Grow's Light API takes form-data
  body.set('pageCode', cfg.pageCode)
  body.set('userId', cfg.userId)
  body.set('apiKey', cfg.apiKey)
  for (const [k, v] of Object.entries(fields)) body.set(k, v)
  const res = await fetch(cfg.base + endpoint, { method: 'POST', body, cache: 'no-store' })
  if (!res.ok) throw new Error(`grow ${endpoint}: HTTP ${res.status}`)
  return (await res.json()) as GrowResponse
}

const ok = (r: GrowResponse) => String(r.status) === '1' // VERIFY: success flag
const errText = (r: GrowResponse) =>
  typeof r.err === 'string' ? r.err : r.err?.message ?? 'unknown error'
const str = (v: unknown) => (v == null ? null : String(v))

/**
 * Hosted page where the parent enters a card; Grow saves it as a token.
 * Our user id travels in cField1 and comes back in the server notification.
 */
export async function createCardSetupPage(cfg: GrowConfig, p: {
  ourUserId: string
  fullName: string
  email: string
  amountAgorot: number // shown on the page; trial = no charge today (VERIFY with Grow how to save-without-charge)
  description: string
  successUrl: string
  cancelUrl: string
  notifyUrl: string
}): Promise<{ url: string; processId: string; processToken: string }> {
  const r = await call(cfg, 'createPaymentProcess', {
    sum: shekels(p.amountAgorot),
    paymentNum: '1',
    description: p.description,
    successUrl: p.successUrl,
    cancelUrl: p.cancelUrl,
    notifyUrl: p.notifyUrl, // VERIFY: field name for the server-to-server update
    'pageField[fullName]': p.fullName,
    'pageField[email]': p.email,
    cField1: p.ourUserId,
    saveCardToken: '1', // VERIFY: flag that returns a reusable card token
  })
  if (!ok(r)) throw new Error(`grow createPaymentProcess: ${errText(r)}`)
  const url = str(r.data?.url), processId = str(r.data?.processId), processToken = str(r.data?.processToken)
  if (!url || !processId || !processToken) throw new Error('grow createPaymentProcess: incomplete response')
  return { url, processId, processToken }
}

export interface GrowNotify {
  processId: string | null
  processToken: string | null
  transactionId: string | null
  ourUserId: string | null   // our cField1
  cardToken: string | null
  cardSuffix: string | null
  succeeded: boolean
}

/** Parse Grow's server notification (form-data or JSON). VERIFY every field name against a real sandbox call. */
export function parseNotify(raw: Record<string, unknown>): GrowNotify {
  const data = (raw.data && typeof raw.data === 'object' ? raw.data : raw) as Record<string, unknown>
  const pick = (...keys: string[]) => {
    for (const k of keys) { const v = data[k] ?? raw[k]; if (v != null && v !== '') return String(v) }
    return null
  }
  return {
    processId: pick('processId'),
    processToken: pick('processToken'),
    transactionId: pick('transactionId'),
    ourUserId: pick('cField1', 'customFields[cField1]'),
    cardToken: pick('cardToken', 'token'),
    cardSuffix: pick('cardSuffix'),
    succeeded: String(pick('status') ?? raw.status ?? '') === '1',
  }
}

/** Ask Grow to confirm a notified process is real and paid/saved before we trust it. */
export async function confirmProcess(cfg: GrowConfig, processId: string, processToken: string): Promise<boolean> {
  // VERIFY: whether this must be approveTransaction (completes the deal) or a read-only process lookup.
  const r = await call(cfg, 'approveTransaction', { processId, processToken })
  return ok(r)
}

/**
 * Charge the saved card. First charge creates the recurring debit
 * (isRecurringDebitId=1) and returns its id; later charges pass it back.
 */
export async function chargeToken(cfg: GrowConfig, p: {
  cardToken: string
  recurringDebitId: string | null
  amountAgorot: number
  description: string
}): Promise<{ ok: true; transactionId: string | null; recurringDebitId: string | null } | { ok: false; error: string }> {
  const fields: Record<string, string> = {
    cardToken: p.cardToken, // VERIFY: token field name
    sum: shekels(p.amountAgorot),
    paymentNum: '1',
    description: p.description,
  }
  if (p.recurringDebitId) fields.recurringDebitId = p.recurringDebitId
  else fields.isRecurringDebitId = '1'
  const r = await call(cfg, 'createTransactionWithToken', fields)
  if (!ok(r)) return { ok: false, error: errText(r) }
  return {
    ok: true,
    transactionId: str(r.data?.transactionId),
    recurringDebitId: str(r.data?.recurringDebitId) ?? p.recurringDebitId,
  }
}
