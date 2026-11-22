/**
 * The free taste for signed-in families without a subscription (owner, 2026-11-22):
 * a small part of every Step 1 track. Pure + edge-safe — used by the middleware (lock)
 * and by the Step 1 menus (lock badges on everything else).
 */
const FREE_EXACT = new Set([
  '/step1', '/step1/track-a', '/step1/track-b', '/step1/track-c', '/step1/track-d',
])
const FREE_PREFIXES = [
  '/step1/track-a/a1',      // A: letter learning page
  '/step1/track-a/group1',  // A: first letter group (all its exercises)
  '/step1/track-b/b1',      // B: sound learning page
  '/step1/track-b/group1',  // B: first sound box
  '/step1/track-c/c1',      // C: first two CVC exercises
  '/step1/track-c/c2',
  '/step1/track-d/numbers', // D: first two vocabulary categories
  '/step1/track-d/colors',
]

export function isFreePath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '') || '/'
  return FREE_EXACT.has(p) || FREE_PREFIXES.some(f => p === f || p.startsWith(f + '/'))
}
