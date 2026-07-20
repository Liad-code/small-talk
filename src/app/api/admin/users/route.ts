import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

const STARS_ROW = '__stars__'

/** Admin: list parents (search by name/email) with their children + stars. */
export async function GET(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const q = z.string().max(100).catch('').parse(new URL(req.url).searchParams.get('q') ?? '')

  const users = await db.user.findMany({
    where: q
      ? {
          OR: [
            { email: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      children: { select: { id: true, displayName: true, avatar: true, createdAt: true } },
      subscription: { select: { status: true, seats: true, currentPeriodEnd: true } },
    },
  })

  // Per-child star totals (single grouped pass over all listed children)
  const childIds = users.flatMap(u => u.children.map(c => c.id))
  const [subjectAgg, step1Rows, stepAgg] =
    childIds.length === 0
      ? [[], [], []]
      : await Promise.all([
          db.progress.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: childIds } }, _sum: { stars: true } }),
          db.step1Progress.findMany({ where: { childProfileId: { in: childIds }, exerciseKey: STARS_ROW }, select: { childProfileId: true, stars: true } }),
          db.stepStars.groupBy({ by: ['childProfileId'], where: { childProfileId: { in: childIds } }, _sum: { stars: true } }),
        ])

  const starsByChild = new Map<string, number>()
  for (const r of subjectAgg) starsByChild.set(r.childProfileId, (starsByChild.get(r.childProfileId) ?? 0) + (r._sum.stars ?? 0))
  for (const r of step1Rows) starsByChild.set(r.childProfileId, (starsByChild.get(r.childProfileId) ?? 0) + r.stars)
  for (const r of stepAgg) starsByChild.set(r.childProfileId, (starsByChild.get(r.childProfileId) ?? 0) + (r._sum.stars ?? 0))

  return NextResponse.json({
    users: users.map(u => ({
      ...u,
      children: u.children.map(c => ({ ...c, stars: starsByChild.get(c.id) ?? 0 })),
    })),
  })
}
