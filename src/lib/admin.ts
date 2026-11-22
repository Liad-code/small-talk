import { auth } from '@/auth'
import { isAdminUser } from '@/lib/access'

/**
 * Admin guard for API routes: returns the admin's userId, or null if the
 * caller is not a signed-in ADMIN. Callers must 403 on null.
 */
export async function requireAdmin(): Promise<string | null> {
  const session = await auth()
  if (!session?.user?.id) return null
  if (!isAdminUser(session.user)) return null
  return session.user.id
}
