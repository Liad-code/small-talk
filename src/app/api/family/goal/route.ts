import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { getAccess, hasPerk } from '@/lib/access'

export const dynamic = 'force-dynamic'

/** The parent sets the family's weekly star goal. */
export async function PATCH(req: Request) {
  if (!rateLimit(req, 'family-goal', 20, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const access = await getAccess()
  if (!access.userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!hasPerk(access, 'family_goal')) return NextResponse.json({ error: 'tier' }, { status: 403 })
  const body = z.object({ goal: z.number().int().min(5).max(2000) }).safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await db.user.update({ where: { id: access.userId }, data: { familyWeeklyGoal: body.data.goal } })
  return NextResponse.json({ ok: true })
}
