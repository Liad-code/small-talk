import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSessionUserId, ACTIVE_CHILD_COOKIE } from '@/lib/children'

export const dynamic = 'force-dynamic'

const patchSchema = z.object({
  displayName: z.string().trim().min(1).max(30).optional(),
  avatar: z.string().trim().min(1).max(8).optional(),
  ageBand: z.enum(['5-6', '7-8', '9-11', '12+']).nullable().optional(),
})

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = patchSchema.safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  // Tenant scoping: update only if the child belongs to this user
  const result = await db.childProfile.updateMany({
    where: { id: params.id, userId },
    data: body.data,
  })
  if (result.count === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const result = await db.childProfile.deleteMany({ where: { id: params.id, userId } })
  if (result.count === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  // If the deleted child was active, clear the cookie
  if (cookies().get(ACTIVE_CHILD_COOKIE)?.value === params.id) {
    cookies().delete(ACTIVE_CHILD_COOKIE)
  }
  return NextResponse.json({ ok: true })
}
