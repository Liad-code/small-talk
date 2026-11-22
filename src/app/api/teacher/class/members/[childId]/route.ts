import { NextResponse } from 'next/server'
import { TEACHERS_ENABLED } from '@/lib/billing/plans'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { getSessionUserId } from '@/lib/children'
import { syncAmount } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/** The teacher removes a student from their class. */
export async function DELETE(req: Request, { params }: { params: { childId: string } }) {
  if (!rateLimit(req, 'class-mutate', 20, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  if (!TEACHERS_ENABLED) return NextResponse.json({ error: 'teachers_off' }, { status: 404 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const member = await db.classMember.findFirst({
    where: { childProfileId: params.childId, classroom: { teacherId: userId } },
    select: { id: true, child: { select: { userId: true } } },
  })
  if (!member) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  await db.classMember.delete({ where: { id: member.id } })
  await syncAmount(member.child.userId) // the parent loses the class discount
  return NextResponse.json({ ok: true })
}
