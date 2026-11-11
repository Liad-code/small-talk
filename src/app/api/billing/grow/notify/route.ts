import { NextResponse } from 'next/server'
import { handleSetupNotify } from '@/lib/billing/service'
import { billingErrorResponse } from '@/lib/billing/http'

export const dynamic = 'force-dynamic'

/**
 * Grow's server-to-server update after the card page. Not trusted on its own:
 * the service only accepts processes we created, and re-confirms with Grow.
 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>
  const type = req.headers.get('content-type') ?? ''
  try {
    if (type.includes('application/json')) raw = await req.json()
    else raw = Object.fromEntries((await req.formData()).entries())
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  try {
    const result = await handleSetupNotify(raw)
    return NextResponse.json({ result })
  } catch (e) {
    return billingErrorResponse(e)
  }
}
