import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { getSessionUserId } from '@/lib/children'
import { summarizeProgress } from '@/lib/progressSummary'
import { canUseClass, ensureClassroom } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/**
 * The teacher's class: code + every student (child profile that joined with the
 * code) with progress. Only the profile's display name/avatar and progress are
 * shared — never the parent's name or email.
 */
export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const classroom = await db.classroom.findUnique({
    where: { teacherId: userId },
    include: {
      members: {
        orderBy: { joinedAt: 'asc' },
        select: { joinedAt: true, child: { select: { id: true, displayName: true, avatar: true } } },
      },
    },
  })
  const allowed = await canUseClass(userId)
  if (!classroom) return NextResponse.json({ classroom: null, allowed })

  const progress = allowed ? await summarizeProgress(classroom.members.map(m => m.child.id)) : new Map()
  return NextResponse.json({
    allowed,
    classroom: { name: classroom.name, code: classroom.code, createdAt: classroom.createdAt },
    students: allowed
      ? classroom.members.map(m => ({ ...m.child, joinedAt: m.joinedAt, ...progress.get(m.child.id) }))
      : [],
    studentCount: classroom.members.length,
  })
}

/** Create my class (free while the site is free; otherwise needs the teacher plan). */
export async function POST(req: Request) {
  if (!rateLimit(req, 'class-create', 5, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!(await canUseClass(userId))) return NextResponse.json({ error: 'teacher_plan' }, { status: 403 })
  const classroom = await ensureClassroom(userId)
  return NextResponse.json({ classroom: { name: classroom.name, code: classroom.code } }, { status: 201 })
}

/** Rename the class. */
export async function PATCH(req: Request) {
  if (!rateLimit(req, 'class-mutate', 20, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = z.object({ name: z.string().trim().min(1).max(40) }).safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const r = await db.classroom.updateMany({ where: { teacherId: userId }, data: { name: body.data.name } })
  return r.count ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'not_found' }, { status: 404 })
}
