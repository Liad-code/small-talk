import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

/** Admin: manual Grow tasks + the latest payment events. */
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const [open, done, events] = await Promise.all([
    db.billingTask.findMany({ where: { status: 'open' }, orderBy: { createdAt: 'asc' }, take: 100 }),
    db.billingTask.findMany({ where: { status: 'done' }, orderBy: { doneAt: 'desc' }, take: 15 }),
    db.billingEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30,
      select: { id: true, kind: true, amount: true, userId: true, createdAt: true },
    }),
  ])
  return NextResponse.json({ open, done, events })
}

/** Admin: mark a task done (or reopen it). */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const body = z.object({ id: z.string().min(1), done: z.boolean() }).safeParse(await req.json().catch(() => null))
  if (!body.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await db.billingTask.update({
    where: { id: body.data.id },
    data: body.data.done ? { status: 'done', doneAt: new Date() } : { status: 'open', doneAt: null },
  })
  return NextResponse.json({ ok: true })
}
