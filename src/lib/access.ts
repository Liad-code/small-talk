import { auth } from '@/auth'
import { db } from '@/lib/db'
import { paywallEnabled } from '@/lib/entitlements'
import { hasAccess } from '@/lib/billing/policy'
import { effectiveTierIndex } from '@/lib/billing/plans'
import { perkMinTier, type PerkId } from '@/lib/billing/perks'
import { isAdminEmail } from '@/lib/adminEmails'

/**
 * Who may use the app, and which family perks they have.
 *
 * - The lock is the PAYWALL_ENABLED switch: while it's off, everyone may use the app (no perks
 *   without a subscription, except admins).
 * - Admins — role ADMIN, or an email listed in ADMIN_EMAILS (server env, comma-separated; never in
 *   the code: the repository is public) — always get in, free, with every perk.
 * - Subscribers get in while their paid period lasts; perks follow their family tier.
 */
export { adminEmails, isAdminEmail } from '@/lib/adminEmails'
export const isAdminUser = (u: { email?: string | null; role?: string | null } | null | undefined) =>
  !!u && (u.role === 'ADMIN' || isAdminEmail(u.email))

export interface Access {
  signedIn: boolean
  admin: boolean
  subscribed: boolean
  app: boolean          // may use the app
  tier: number | null   // family tier for perks (admins: top tier; no subscription: null)
}

export async function accessFor(user: { id: string; email?: string | null; role?: string | null } | null): Promise<Access> {
  if (!user) return { signedIn: false, admin: false, subscribed: false, app: !paywallEnabled(), tier: null }
  const admin = isAdminUser(user)
  const sub = await db.subscription.findUnique({ where: { userId: user.id } })
  const subscribed = !!sub && hasAccess(sub)
  let tier: number | null = null
  if (admin) tier = 2
  else if (subscribed && sub!.plan === 'parent') {
    tier = effectiveTierIndex(await db.childProfile.count({ where: { userId: user.id } }), sub!.tierChosen)
  }
  return { signedIn: true, admin, subscribed, app: admin || subscribed || !paywallEnabled(), tier }
}

/** Access of the signed-in user (server components / route handlers). */
export async function getAccess(): Promise<Access & { userId: string | null }> {
  const session = await auth()
  const u = session?.user
  const a = await accessFor(u?.id ? { id: u.id, email: u.email, role: u.role } : null)
  return { ...a, userId: u?.id ?? null }
}

export const hasPerk = (a: Pick<Access, 'tier'>, perk: PerkId) => a.tier !== null && a.tier >= perkMinTier(perk)
