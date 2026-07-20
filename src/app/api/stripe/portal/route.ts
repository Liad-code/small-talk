import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { rateLimit, TOO_MANY } from '@/lib/rateLimit'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

/** Open the Stripe Customer Portal (manage/cancel/upgrade, invoices). */
export async function POST(req: Request) {
  if (!rateLimit(req, 'billing', 10, 60_000)) return NextResponse.json(TOO_MANY, { status: 429 })
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user?.stripeCustomerId) return NextResponse.json({ error: 'no_customer' }, { status: 404 })

  const origin = new URL(req.url).origin
  const portal = await stripe().billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${origin}/pricing`,
  })
  return NextResponse.json({ url: portal.url })
}
