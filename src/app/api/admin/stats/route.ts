import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'
import { paywallEnabled } from '@/lib/entitlements'

export const dynamic = 'force-dynamic'

const STARS_ROW = '__stars__'

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const now = Date.now()
  const d7 = new Date(now - 7 * 86_400_000)
  const d30 = new Date(now - 30 * 86_400_000)

  const [
    totalParents,
    signups7,
    signups30,
    totalChildren,
    subsByStatus,
    subjectStars,
    step1StarRows,
    stepStarsAgg,
    activeSubj,
    activeStep1,
    activeSteps,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { createdAt: { gte: d7 } } }),
    db.user.count({ where: { createdAt: { gte: d30 } } }),
    db.childProfile.count(),
    db.subscription.groupBy({ by: ['status'], _count: { _all: true } }),
    db.progress.aggregate({ _sum: { stars: true } }),
    db.step1Progress.aggregate({ where: { exerciseKey: STARS_ROW }, _sum: { stars: true } }),
    db.stepStars.aggregate({ _sum: { stars: true } }),
    db.progress.findMany({ where: { updatedAt: { gte: d7 } }, select: { childProfileId: true }, distinct: ['childProfileId'] }),
    db.step1Progress.findMany({ where: { updatedAt: { gte: d7 } }, select: { childProfileId: true }, distinct: ['childProfileId'] }),
    db.stepStars.findMany({ where: { updatedAt: { gte: d7 } }, select: { childProfileId: true }, distinct: ['childProfileId'] }),
  ])

  const activeChildIds = new Set<string>()
  for (const rows of [activeSubj, activeStep1, activeSteps]) {
    for (const r of rows) activeChildIds.add(r.childProfileId)
  }

  const subscriptions: Record<string, number> = {}
  for (const s of subsByStatus) subscriptions[s.status] = s._count._all

  return NextResponse.json({
    totalParents,
    signups7,
    signups30,
    totalChildren,
    activeChildren7: activeChildIds.size,
    totalStars:
      (subjectStars._sum.stars ?? 0) + (step1StarRows._sum.stars ?? 0) + (stepStarsAgg._sum.stars ?? 0),
    subscriptions,
    paywallEnabled: paywallEnabled(),
    pricePerChild: 50,
  })
}
