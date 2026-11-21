import { db } from '@/lib/db'

const STARS_ROW = '__stars__'

export interface ChildSummaryInput { id: string }

export interface ChildProgress {
  stars: { step1: number; perStep: Record<string, number>; subjects: number; total: number }
  levelsDone: number
  lastActive: Date | null
}

/**
 * Aggregated progress per child (stars per step, subject levels, last activity).
 * Shared by the parent dashboard and the teacher's class view.
 */
export async function summarizeProgress(ids: string[]): Promise<Map<string, ChildProgress>> {
  const out = new Map<string, ChildProgress>()
  if (ids.length === 0) return out

  const [subjectAgg, levelsDoneAgg, subjectLast, step1Stars, step1Last, stepStarRows, stepStarLast] = await Promise.all([
    db.progress.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: ids } }, _sum: { stars: true } }),
    db.progress.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: ids }, stars: { gt: 0 } }, _count: { _all: true } }),
    db.progress.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: ids } }, _max: { updatedAt: true } }),
    db.step1Progress.findMany({ where: { childProfileId: { in: ids }, exerciseKey: STARS_ROW }, select: { childProfileId: true, stars: true } }),
    db.step1Progress.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: ids } }, _max: { updatedAt: true } }),
    db.stepStars.findMany({ where: { childProfileId: { in: ids } }, select: { childProfileId: true, step: true, stars: true } }),
    db.stepStars.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: ids } }, _max: { updatedAt: true } }),
  ])

  const subjectMap = new Map(subjectAgg.map(r => [r.childProfileId, r._sum.stars ?? 0]))
  const levelsMap = new Map(levelsDoneAgg.map(r => [r.childProfileId, r._count._all]))
  const step1Map = new Map(step1Stars.map(r => [r.childProfileId, r.stars]))
  const perStepMap = new Map<string, Record<string, number>>()
  for (const r of stepStarRows) {
    const m = perStepMap.get(r.childProfileId) ?? {}
    m[r.step] = r.stars
    perStepMap.set(r.childProfileId, m)
  }
  const lastDates = new Map<string, Date>()
  for (const rows of [subjectLast, step1Last, stepStarLast]) {
    for (const r of rows) {
      const d = r._max.updatedAt
      if (!d) continue
      const cur = lastDates.get(r.childProfileId)
      if (!cur || d > cur) lastDates.set(r.childProfileId, d)
    }
  }

  for (const id of ids) {
    const perStep = perStepMap.get(id) ?? {}
    const step1 = step1Map.get(id) ?? 0
    const subjects = subjectMap.get(id) ?? 0
    const stepsTotal = Object.values(perStep).reduce((s, n) => s + n, 0)
    out.set(id, {
      stars: { step1, perStep, subjects, total: step1 + subjects + stepsTotal },
      levelsDone: levelsMap.get(id) ?? 0,
      lastActive: lastDates.get(id) ?? null,
    })
  }
  return out
}
