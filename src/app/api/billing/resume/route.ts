import { NextResponse } from 'next/server'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { getSessionUserId } from '@/lib/children'
import { undoCancel } from '@/lib/billing/service'

export const dynamic = 'force-dynamic'

/** Undo a cancel — only possible while the standing order hasn't been cancelled in Grow yet. */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing-resume', 5, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const ok = await undoCancel(userId)
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'too_late' }, { status: 409 })
}
