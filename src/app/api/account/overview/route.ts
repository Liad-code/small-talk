import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { summarizeProgress } from '@/lib/progressSummary'

export const dynamic = 'force-dynamic'

/** Parent-dashboard overview: every child with aggregated progress and their class (if any). */
export async function GET() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const children = await db.childProfile.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true, displayName: true, avatar: true, ageBand: true, createdAt: true,
      classMember: { select: { classroom: { select: { name: true, code: true } } } },
    },
  })
  const progress = await summarizeProgress(children.map(c => c.id))

  return NextResponse.json({
    user: { name: session.user.name, email: session.user.email },
    children: children.map(({ classMember, ...c }) => ({
      ...c,
      ...progress.get(c.id)!,
      classroom: classMember ? { name: classMember.classroom.name, code: classMember.classroom.code } : null,
    })),
  })
}
