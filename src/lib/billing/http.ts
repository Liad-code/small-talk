import { NextResponse } from 'next/server'
import { BillingError } from '@/lib/billing/service'

const STATUS: Record<BillingError['code'], number> = {
  not_configured: 503,      // Grow credentials not set yet — nothing can be charged
  already_subscribed: 409,
  no_subscription: 404,
  cannot_resume: 409,
}

/** Map billing errors to HTTP; anything else is a 500 without internals leaking. */
export function billingErrorResponse(e: unknown) {
  if (e instanceof BillingError) return NextResponse.json({ error: e.code }, { status: STATUS[e.code] })
  console.error('[billing]', e)
  return NextResponse.json({ error: 'billing_failed' }, { status: 500 })
}
