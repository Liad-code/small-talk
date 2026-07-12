import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe, STRIPE_PRICE_ID } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

const TRIAL_DAYS = 7

/** Start a subscription checkout. Quantity = number of child profiles (min 1). */
export async function POST(req: Request) {
  const session = await auth()
  const userId = session?.user?.id
  const email = session?.user?.email
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const existing = await db.subscription.findUnique({ where: { userId } })
  if (existing && (existing.status === 'active' || existing.status === 'trialing')) {
    return NextResponse.json({ error: 'already_subscribed' }, { status: 409 })
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  // Reuse (or create once) the Stripe customer for this parent
  let customerId = user.stripeCustomerId
  if (!customerId) {
    const customer = await stripe().customers.create({
      email: email ?? undefined,
      metadata: { userId },
    })
    customerId = customer.id
    await db.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } })
  }

  const seats = Math.max(1, await db.childProfile.count({ where: { userId } }))
  const origin = new URL(req.url).origin

  const checkout = await stripe().checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: STRIPE_PRICE_ID(), quantity: seats }],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata: { userId },
    },
    metadata: { userId },
    allow_promotion_codes: true,
    success_url: `${origin}/pricing?success=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
  })

  return NextResponse.json({ url: checkout.url })
}
