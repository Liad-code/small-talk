import { NextResponse } from 'next/server'
import { runDueCharges } from '@/lib/billing/service'
import { billingErrorResponse } from '@/lib/billing/http'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Daily charge run (Vercel Cron, see vercel.json). Vercel sends
 * `Authorization: Bearer $CRON_SECRET`; anything else is refused.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  try {
    return NextResponse.json(await runDueCharges())
  } catch (e) {
    return billingErrorResponse(e)
  }
}
