import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const ACTIVE_CHILD_COOKIE = 'smalltalk_active_child'
export const MAX_CHILDREN = 8 // hard cap pre-billing; Phase 2 enforces seats

/** Session user id, or null. */
export async function getSessionUserId(): Promise<string | null> {
  const session = await auth()
  return session?.user?.id ?? null
}

/**
 * The active child profile for this request — ALWAYS verified to belong to
 * the session user (never trust the cookie alone). Null if signed out,
 * no cookie, or the cookie's child isn't theirs.
 */
export async function getActiveChild(userId?: string | null) {
  const uid = userId ?? (await getSessionUserId())
  if (!uid) return null
  const childId = cookies().get(ACTIVE_CHILD_COOKIE)?.value
  if (!childId) return null
  const child = await db.childProfile.findFirst({
    where: { id: childId, userId: uid },
  })
  return child
}
