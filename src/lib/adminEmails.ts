/**
 * Admin accounts by email: ADMIN_EMAILS (server env, comma-separated). Never list emails in
 * the code — the repository is public. Kept separate from lib/access.ts so auth.ts can use it
 * without an import cycle.
 */
export function adminEmails(): Set<string> {
  return new Set((process.env.ADMIN_EMAILS ?? '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean))
}
export const isAdminEmail = (email?: string | null) => !!email && adminEmails().has(email.trim().toLowerCase())
