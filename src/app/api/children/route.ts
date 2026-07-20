import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { getSessionUserId, MAX_CHILDREN } from '@/lib/children'
import { getEntitlement, paywallEnabled } from '@/lib/entitlements'

export const dynamic = 'force-dynamic'

const createSchema = z.object({
  displayName: z.string().trim().min(1).max(30),
  avatar: z.string().trim().min(1).max(8).optional(),
  ageBand: z.enum(['5-6', '7-8', '9-11', '12+']).optional(),
})

export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const children = await db.childProfile.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    select: { id: true, displayName: true, avatar: true, ageBand: true, createdAt: true },
  })
  return NextResponse.json({ children })
}

export async function POST(req: Request) {
  if (!rateLimit(req, 'children-create', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = createSchema.safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const count = await db.childProfile.count({ where: { userId } })
  if (count >= MAX_CHILDREN) {
    return NextResponse.json({ error: 'limit' }, { status: 403 })
  }

  // Per-seat enforcement: with the paywall on and an active subscription,
  // #children may not exceed paid seats (upgrade via the Stripe portal).
  if (paywallEnabled()) {
    const ent = await getEntitlement(userId)
    if (ent.hasAccess && count >= ent.seats) {
      return NextResponse.json({ error: 'seats' }, { status: 403 })
    }
  }

  const child = await db.childProfile.create({
    data: { userId, displayName: body.data.displayName, avatar: body.data.avatar ?? '🦉', ageBand: body.data.ageBand },
    select: { id: true, displayName: true, avatar: true, ageBand: true, createdAt: true },
  })
  return NextResponse.json({ child }, { status: 201 })
}
