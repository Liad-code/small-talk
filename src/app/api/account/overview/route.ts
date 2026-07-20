import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const STARS_ROW = '__stars__'

/** Parent-dashboard overview: every child with aggregated progress. */
export async function GET() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const children = await db.childProfile.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    select: { id: true, displayName: true, avatar: true, ageBand: true, createdAt: true },
  })
  const ids = children.map(c => c.id)

  const [subjectAgg, levelsDoneAgg, subjectLast, step1Stars, step1Last, stepStarRows, stepStarLast] =
    ids.length === 0
      ? [[], [], [], [], [], [], []]
      : await Promise.all([
          db.progress.groupBy({
            by: ['childProfileId'],
            where: { childProfileId: { in: ids } },
            _sum: { stars: true },
          }),
          db.progress.groupBy({
            by: ['childProfileId'],
            where: { childProfileId: { in: ids }, stars: { gt: 0 } },
            _count: { _all: true },
          }),
          db.progress.groupBy({
            by: ['childProfileId'],
            where: { childProfileId: { in: ids } },
            _max: { updatedAt: true },
          }),
          db.step1Progress.findMany({
            where: { childProfileId: { in: ids }, exerciseKey: STARS_ROW },
            select: { childProfileId: true, stars: true },
          }),
          db.step1Progress.groupBy({
            by: ['childProfileId'],
            where: { childProfileId: { in: ids } },
            _max: { updatedAt: true },
          }),
          db.stepStars.findMany({
            where: { childProfileId: { in: ids } },
            select: { childProfileId: true, step: true, stars: true },
          }),
          db.stepStars.groupBy({
            by: ['childProfileId'],
            where: { childProfileId: { in: ids } },
            _max: { updatedAt: true },
          }),
        ])

  const byId = <T extends { childProfileId: string }>(rows: T[]) => {
    const m = new Map<string, T[]>()
    for (const r of rows) {
      const arr = m.get(r.childProfileId) ?? []
      arr.push(r)
      m.set(r.childProfileId, arr)
    }
    return m
  }

  const subjectMap = new Map(subjectAgg.map(r => [r.childProfileId, r._sum.stars ?? 0]))
  const levelsMap = new Map(levelsDoneAgg.map(r => [r.childProfileId, r._count._all]))
  const step1Map = new Map(step1Stars.map(r => [r.childProfileId, r.stars]))
  const stepStarsMap = byId(stepStarRows)
  const lastDates = new Map<string, Date>()
  for (const rows of [subjectLast, step1Last, stepStarLast]) {
    for (const r of rows) {
      const d = r._max.updatedAt
      if (!d) continue
      const cur = lastDates.get(r.childProfileId)
      if (!cur || d > cur) lastDates.set(r.childProfileId, d)
    }
  }

  const result = children.map(c => {
    const perStep: Record<string, number> = {}
    for (const row of stepStarsMap.get(c.id) ?? []) perStep[row.step] = row.stars
    const step1 = step1Map.get(c.id) ?? 0
    const subjects = subjectMap.get(c.id) ?? 0
    const stepsTotal = Object.values(perStep).reduce((s, n) => s + n, 0)
    return {
      ...c,
      stars: {
        step1,
        perStep,
        subjects,
        total: step1 + subjects + stepsTotal,
      },
      levelsDone: levelsMap.get(c.id) ?? 0,
      lastActive: lastDates.get(c.id) ?? null,
    }
  })

  return NextResponse.json({
    user: { name: session.user.name, email: session.user.email },
    children: result,
  })
}
