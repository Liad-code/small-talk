import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { getSessionUserId } from '@/lib/children'
import { normalizeCode } from '@/lib/billing/policy'
import { syncAmount } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

const schema = z.object({ childId: z.string().min(1).max(40), code: z.string().min(4).max(20) })

/**
 * A parent enters the teacher's code for one of their children: the child joins
 * the class (the teacher sees the profile name + progress) and gets the class discount.
 */
export async function POST(req: Request) {
  // Strict limit: codes are short, so guessing must be slow.
  if (!rateLimit(req, 'class-join', 8, 10 * 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = schema.safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const child = await db.childProfile.findFirst({ where: { id: body.data.childId, userId }, select: { id: true } })
  if (!child) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const classroom = await db.classroom.findUnique({ where: { code: normalizeCode(body.data.code) } })
  if (!classroom) return NextResponse.json({ error: 'bad_code' }, { status: 404 })

  await db.classMember.upsert({
    where: { childProfileId: child.id },
    create: { childProfileId: child.id, classroomId: classroom.id },
    update: { classroomId: classroom.id, joinedAt: new Date() },
  })
  await syncAmount(userId)
  return NextResponse.json({ classroom: { name: classroom.name, code: classroom.code } })
}
