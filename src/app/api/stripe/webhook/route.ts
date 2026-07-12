import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

/**
 * Stripe webhook — the ONLY writer of Subscription state.
 * Signature-verified; upserts are idempotent (keyed by stripeSubscriptionId).
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'not_configured' }, { status: 500 })

  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'no_signature' }, { status: 400 })

  const payload = await req.text()
  let event: Stripe.Event
  try {
    event = stripe().webhooks.constructEvent(payload, signature, secret)
  } catch {
    return NextResponse.json({ error: 'bad_signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await syncSubscription(sub)
        break
      }
      case 'checkout.session.completed': {
        const cs = event.data.object as Stripe.Checkout.Session
        if (cs.mode === 'subscription' && cs.subscription) {
          const sub = await stripe().subscriptions.retrieve(cs.subscription as string)
          await syncSubscription(sub)
        }
        break
      }
      case 'invoice.paid':
      case 'invoice.payment_failed': {
        // Subscription status changes arrive via customer.subscription.updated.
        // TODO (Israeli invoicing): on invoice.paid, trigger the invoicing
        // service (Sumit / Green Invoice) to issue a חשבונית מס/קבלה.
        break
      }
    }
  } catch (err) {
    console.error('webhook handler error', event.type, err)
    return NextResponse.json({ error: 'handler_failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function syncSubscription(sub: Stripe.Subscription) {
  // Resolve the parent: prefer metadata, fall back to customer lookup
  let userId: string | undefined = sub.metadata?.userId
  if (!userId) {
    const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
    const user = await db.user.findFirst({ where: { stripeCustomerId: customerId } })
    userId = user?.id
  }
  if (!userId) {
    console.error('webhook: no user for subscription', sub.id)
    return
  }

  const item = sub.items.data[0]
  const seats = item?.quantity ?? 1
  const priceId = item?.price?.id ?? ''
  const periodEnd = item?.current_period_end ?? Math.floor(Date.now() / 1000)

  await db.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      userId,
      stripeSubscriptionId: sub.id,
      status: sub.status,
      priceId,
      seats,
      currentPeriodEnd: new Date(periodEnd * 1000),
      trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      status: sub.status,
      priceId,
      seats,
      currentPeriodEnd: new Date(periodEnd * 1000),
      trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  })
}
