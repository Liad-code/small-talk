import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

/** Open the Stripe Customer Portal (manage/cancel/upgrade, invoices). */
export async function POST(req: Request) {
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
