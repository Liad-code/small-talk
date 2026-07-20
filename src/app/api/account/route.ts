import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { ACTIVE_CHILD_COOKIE } from '@/lib/children'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

/**
 * Delete the parent account and ALL its data (children, progress,
 * sessions, subscription) — the privacy-law "delete my data" right.
 * Cascades are defined in the Prisma schema.
 */
export async function DELETE(req: Request) {
  if (!rateLimit(req, 'account-delete', 5, 3_600_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  await db.user.delete({ where: { id: userId } })
  cookies().delete(ACTIVE_CHILD_COOKIE)
  return NextResponse.json({ ok: true })
}
