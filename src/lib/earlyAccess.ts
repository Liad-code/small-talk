/**
 * Early access (₪69 perk): new content listed here is open only to the top family tier
 * (and admins) until its `until` date, then to everyone. Add an entry when a new scene or
 * game launches, e.g. { path: '/step7/zoo', until: '2027-01-15', labelHe: 'סצנת גן החיות' }.
 */
export interface EarlyItem { path: string; until: string; labelHe: string }
export const EARLY_ACCESS: EarlyItem[] = []

export function earlyItem(path: string, today: string): EarlyItem | null {
  return EARLY_ACCESS.find(e => (path === e.path || path.startsWith(e.path + '/')) && today < e.until) ?? null
}
