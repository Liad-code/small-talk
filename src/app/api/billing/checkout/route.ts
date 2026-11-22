import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { getSessionUserId } from '@/lib/children'
import { startCheckout, BillingError } from '@/lib/billing/service'
import { normalizePhone } from '@/lib/billing/policy'

export const dynamic = 'force-dynamic'

const schema = z.object({ plan: z.enum(['parent', 'teacher']), phone: z.string().max(20), tier: z.number().int().min(0).max(2).optional() })

/** Creates a Grow recurring payment link (through Make) and returns its URL. */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing-checkout', 5, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = schema.safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const phone = normalizePhone(body.data.phone)
  if (!phone) return NextResponse.json({ error: 'phone' }, { status: 400 })

  try {
    const url = await startCheckout({ userId, plan: body.data.plan, phone, origin: new URL(req.url).origin, tier: body.data.tier })
    return NextResponse.json({ url })
  } catch (e) {
    if (e instanceof BillingError) return NextResponse.json({ error: e.message }, { status: 409 })
    console.error('checkout failed', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
