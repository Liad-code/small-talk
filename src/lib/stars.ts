import { db } from '@/lib/db'

const STARS_ROW = '__stars__'

/** Today's date in Israel as YYYY-MM-DD. */
export function israelDay(d = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}
/** YYYY-MM-DD → the Date Prisma stores in a @db.Date column. */
export const dayToDate = (day: string) => new Date(`${day}T00:00:00Z`)
export const dateToDay = (d: Date) => d.toISOString().slice(0, 10)

/** Sunday that starts the (Israeli) week containing `day`. */
export function weekStart(day: string): string {
  const d = dayToDate(day)
  d.setUTCDate(d.getUTCDate() - d.getUTCDay())
  return dateToDay(d)
}
export function addDays(day: string, n: number): string {
  const d = dayToDate(day)
  d.setUTCDate(d.getUTCDate() + n)
  return dateToDay(d)
}

/** Every star a child has, across subjects, Step 1 and steps 2–7. */
export async function childTotalStars(childId: string): Promise<number> {
  const [subj, s1, steps] = await Promise.all([
    db.progress.aggregate({ where: { childProfileId: childId }, _sum: { stars: true } }),
    db.step1Progress.findUnique({ where: { childProfileId_exerciseKey: { childProfileId: childId, exerciseKey: STARS_ROW } }, select: { stars: true } }),
    db.stepStars.aggregate({ where: { childProfileId: childId }, _sum: { stars: true } }),
  ])
  return (subj._sum.stars ?? 0) + (s1?.stars ?? 0) + (steps._sum.stars ?? 0)
}

/** Adds newly earned stars to today's row (sibling challenge, family goal, monthly report). */
export async function recordStars(childId: string, delta: number, day = israelDay()): Promise<void> {
  if (delta <= 0) return
  await db.$executeRaw`
    INSERT INTO "StarDay" ("id", "childProfileId", "day", "stars")
    VALUES (${`${childId}_${day}`}, ${childId}, ${dayToDate(day)}, ${delta})
    ON CONFLICT ("childProfileId", "day") DO UPDATE SET "stars" = "StarDay"."stars" + EXCLUDED."stars"
  `
}

/** Stars per child between two days (inclusive). */
export async function starsBetween(childIds: string[], from: string, to: string): Promise<Map<string, number>> {
  const out = new Map<string, number>(childIds.map(id => [id, 0]))
  if (!childIds.length) return out
  const rows = await db.starDay.groupBy({
    by: ['childProfileId'],
    where: { childProfileId: { in: childIds }, day: { gte: dayToDate(from), lte: dayToDate(to) } },
    _sum: { stars: true },
  })
  for (const r of rows) out.set(r.childProfileId, r._sum.stars ?? 0)
  return out
}
