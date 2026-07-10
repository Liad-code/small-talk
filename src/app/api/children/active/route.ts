import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSessionUserId, getActiveChild, ACTIVE_CHILD_COOKIE } from '@/lib/children'

export const dynamic = 'force-dynamic'

export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const child = await getActiveChild(userId)
  return NextResponse.json({
    child: child ? { id: child.id, displayName: child.displayName, avatar: child.avatar } : null,
  })
}

export async function POST(req: Request) {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = z.object({ id: z.string().min(1) }).safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  // Verify ownership before trusting the id
  const child = await db.childProfile.findFirst({ where: { id: body.data.id, userId } })
  if (!child) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  cookies().set(ACTIVE_CHILD_COOKIE, child.id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return NextResponse.json({ child: { id: child.id, displayName: child.displayName, avatar: child.avatar } })
}
