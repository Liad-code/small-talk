import { NextResponse } from 'next/server'
import { hasGrowWebhookKey, isFromMake, payloadHasGrowKey } from '@/lib/billing/make'
import { handleRecurring, payloadWebhookKey } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/**
 * Grow's own webhooks (enabled by Grow support): recurring charge from the 2nd month,
 * and failed recurring charge. Authenticated by the account's webhook key
 * (GROW_WEBHOOK_KEY), or by our Make secret if forwarded through Make.
 * Grow may post JSON or a form; both are accepted.
 */
export async function POST(req: Request) {
  const type = req.headers.get('content-type') ?? ''
  let payload: Record<string, unknown> | null = null
  if (type.includes('application/json')) {
    payload = await req.json().catch(() => null)
  } else {
    const form = await req.formData().catch(() => null)
    if (form) payload = Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]))
  }
  if (!payload || typeof payload !== 'object') return NextResponse.json({ error: 'invalid' }, { status: 400 })
  if (!isFromMake(req) && !hasGrowWebhookKey(payloadWebhookKey(payload)) && !payloadHasGrowKey(payload)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }
  const result = await handleRecurring(payload)
  return NextResponse.json({ ok: true, result })
}
