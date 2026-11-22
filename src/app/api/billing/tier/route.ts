import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { getSessionUserId } from '@/lib/children'
import { changeTier } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/** A subscribed parent picks another family tier (never below what their children need). */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing-tier', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = z.object({ tier: z.number().int().min(0).max(2) }).safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const exact = await changeTier(userId, body.data.tier)
  return NextResponse.json({ ok: true, exact })
}
