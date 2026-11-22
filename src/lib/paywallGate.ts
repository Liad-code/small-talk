import { redirect } from 'next/navigation'
import { getAccess } from '@/lib/access'
import { paywallEnabled } from '@/lib/entitlements'

/**
 * Server-side gate for app pages (defence in depth — the middleware is the main lock).
 * No-op while PAYWALL_ENABLED !== 'true'. Admins and subscribers pass.
 */
export async function requirePaidAccess() {
  if (!paywallEnabled()) return
  const access = await getAccess()
  if (!access.signedIn) redirect('/?reason=signin')
  if (!access.app) redirect('/pricing?reason=locked')
}
