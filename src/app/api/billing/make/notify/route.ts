import { NextResponse } from 'next/server'
import { isFromMake } from '@/lib/billing/make'
import { handleFirstPayment, handleRecurring } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/**
 * Make scenario 2 forwards Grow's payment notice here (after "Approve Transaction"),
 * with `Authorization: Bearer <MAKE_SHARED_SECRET>`. Body: the Grow payload as JSON.
 * `?type=recurring` = a recurring-charge webhook forwarded through Make instead.
 */
export async function POST(req: Request) {
  if (!isFromMake(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const payload = await req.json().catch(() => null)
  if (!payload || typeof payload !== 'object') return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const recurring = new URL(req.url).searchParams.get('type') === 'recurring'
  const result = recurring ? await handleRecurring(payload) : await handleFirstPayment(payload)
  return NextResponse.json({ ok: true, result })
}
