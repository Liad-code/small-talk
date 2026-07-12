import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getEntitlement, paywallEnabled } from '@/lib/entitlements'

/**
 * Server-side gate for paid content (Steps 2-6).
 * No-op while PAYWALL_ENABLED !== 'true', so the site stays free until the
 * flag is flipped. Runs in step layouts (Node runtime — full Prisma access).
 */
export async function requirePaidAccess() {
  if (!paywallEnabled()) return

  const session = await auth()
  if (!session?.user?.id) redirect('/pricing?reason=signin')

  const ent = await getEntitlement(session.user.id)
  if (!ent.hasAccess) redirect('/pricing?reason=locked')
}
