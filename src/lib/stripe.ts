import Stripe from 'stripe'

// Lazy singleton so builds don't require the key; routes fail loudly if unset.
let _stripe: Stripe | null = null

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  if (!_stripe) _stripe = new Stripe(key)
  return _stripe
}

export const STRIPE_PRICE_ID = () => {
  const id = process.env.STRIPE_PRICE_ID
  if (!id) throw new Error('STRIPE_PRICE_ID is not set')
  return id
}
