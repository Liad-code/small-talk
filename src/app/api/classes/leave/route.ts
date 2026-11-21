import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { getSessionUserId } from '@/lib/children'
import { syncAmount } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/** A parent takes one of their children out of a class (the teacher stops seeing it). */
export async function POST(req: Request) {
  if (!rateLimit(req, 'class-leave', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = z.object({ childId: z.string().min(1).max(40) }).safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const r = await db.classMember.deleteMany({ where: { childProfileId: body.data.childId, child: { userId } } })
  if (!r.count) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  await syncAmount(userId)
  return NextResponse.json({ ok: true })
}
