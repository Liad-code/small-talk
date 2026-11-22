import { db } from '@/lib/db'
import { addDays, israelDay, starsBetween, weekStart, dayToDate, dateToDay } from '@/lib/stars'

const STARS_ROW = '__stars__'
export const DEFAULT_WEEKLY_GOAL = 50

export const STEPS = [
  { id: 'step1', title: 'Step 1', he: 'שלב ראשון', emoji: '🐣' },
  { id: 'step2', title: 'Step 2', he: 'שלב שני', emoji: '🐥' },
  { id: 'step3', title: 'Step 3', he: 'שלב שלישי', emoji: '🐦' },
  { id: 'step4', title: 'Step 4', he: 'שלב רביעי', emoji: '🦅' },
  { id: 'step5', title: 'Step 5', he: 'שלב חמישי', emoji: '🚀' },
  { id: 'step6', title: 'Step 6', he: 'שלב שישי', emoji: '🏆' },
  { id: 'step7', title: 'Step 7', he: 'שלב שביעי', emoji: '🗣️' },
] as const
export type StepId = (typeof STEPS)[number]['id']

/** Achievement certificates per step, by stars collected in that step. */
export const CERT_LEVELS = [
  { level: 1, stars: 10, he: 'ארד', emoji: '🥉', color: '#b45309' },
  { level: 2, stars: 30, he: 'כסף', emoji: '🥈', color: '#64748b' },
  { level: 3, stars: 60, he: 'זהב', emoji: '🥇', color: '#ca8a04' },
] as const

// ── Weekly sibling challenge + family goal ───────────────────────────────────

export async function familyWeek(userId: string) {
  const [children, user] = await Promise.all([
    db.childProfile.findMany({ where: { userId }, orderBy: { createdAt: 'asc' }, select: { id: true, displayName: true, avatar: true } }),
    db.user.findUnique({ where: { id: userId }, select: { familyWeeklyGoal: true } }),
  ])
  const today = israelDay()
  const from = weekStart(today)
  const ids = children.map(c => c.id)
  const [thisWeek, lastWeek] = await Promise.all([
    starsBetween(ids, from, addDays(from, 6)),
    starsBetween(ids, addDays(from, -7), addDays(from, -1)),
  ])
  const board = children
    .map(c => ({ ...c, stars: thisWeek.get(c.id) ?? 0 }))
    .sort((a, b) => b.stars - a.stars)
  const lastBest = children
    .map(c => ({ ...c, stars: lastWeek.get(c.id) ?? 0 }))
    .sort((a, b) => b.stars - a.stars)[0]
  const goal = user?.familyWeeklyGoal ?? DEFAULT_WEEKLY_GOAL
  const total = board.reduce((n, c) => n + c.stars, 0)
  return {
    weekStart: from,
    daysLeft: 6 - dayToDate(today).getUTCDay(),
    board,
    leader: board[0] && board[0].stars > 0 && (board.length < 2 || board[0].stars > board[1].stars) ? board[0] : null,
    lastWeekWinner: lastBest && lastBest.stars > 0 ? lastBest : null,
    goal,
    total,
    goalReached: total >= goal,
  }
}

// ── Per-step stars (report + certificates) ───────────────────────────────────

export async function stepStarsByChild(childIds: string[]): Promise<Map<string, Record<StepId, number>>> {
  const out = new Map<string, Record<StepId, number>>()
  for (const id of childIds) out.set(id, Object.fromEntries(STEPS.map(s => [s.id, 0])) as Record<StepId, number>)
  if (!childIds.length) return out
  const [s1, rest] = await Promise.all([
    db.step1Progress.findMany({ where: { childProfileId: { in: childIds }, exerciseKey: STARS_ROW }, select: { childProfileId: true, stars: true } }),
    db.stepStars.findMany({ where: { childProfileId: { in: childIds } }, select: { childProfileId: true, step: true, stars: true } }),
  ])
  for (const r of s1) out.get(r.childProfileId)!.step1 = r.stars
  for (const r of rest) if (r.step in out.get(r.childProfileId)!) out.get(r.childProfileId)![r.step as StepId] = r.stars
  return out
}

export interface Certificate { childId: string; childName: string; avatar: string; step: (typeof STEPS)[number]; level: (typeof CERT_LEVELS)[number]; stars: number }

export async function familyCertificates(userId: string): Promise<{ earned: Certificate[]; next: { childName: string; step: string; level: string; missing: number }[] }> {
  const children = await db.childProfile.findMany({ where: { userId }, orderBy: { createdAt: 'asc' }, select: { id: true, displayName: true, avatar: true } })
  const stars = await stepStarsByChild(children.map(c => c.id))
  const earned: Certificate[] = []
  const next: { childName: string; step: string; level: string; missing: number }[] = []
  for (const c of children) {
    for (const step of STEPS) {
      const n = stars.get(c.id)![step.id]
      for (const level of CERT_LEVELS) if (n >= level.stars) earned.push({ childId: c.id, childName: c.displayName, avatar: c.avatar, step, level, stars: n })
      const upcoming = CERT_LEVELS.find(l => n < l.stars)
      if (upcoming && n > 0) next.push({ childName: c.displayName, step: step.he, level: upcoming.he, missing: upcoming.stars - n })
    }
  }
  return { earned: earned.reverse(), next: next.sort((a, b) => a.missing - b.missing).slice(0, 6) }
}

// ── Monthly report ───────────────────────────────────────────────────────────

const STEP_TIPS: Record<StepId, string> = {
  step1: 'שירו יחד את שיר ה-ABC וחפשו אותיות באנגלית על שלטים, אריזות ומקלדות — כל אות שמזהים בעולם האמיתי מחזקת את הלמידה.',
  step2: 'קראו יחד מילים קצרות (cat, dog, sun) ובקשו מהילד/ה לשמוע את הצליל הראשון והאחרון בכל מילה.',
  step3: 'בחרו כל ערב 3 מילים חדשות מהתרגולים והשתמשו בהן במשפט קצר בבית ("Pass the cup, please").',
  step4: 'עודדו קריאה בקול של המשפטים בתרגולים ותרגום שלהם — זה משפר הגייה ואוצר מילים.',
  step5: 'תרגלו את חוקי הדקדוק בעל-פה: שאלו "What did you do today?" ובקשו תשובה במשפט מלא.',
  step6: 'בקשו מהילד/ה לכתוב פסקה קצרה (paragraph) על היום שלו/ה, תוך שימוש במילים ובחוקים שנלמדו.',
  step7: 'שחקו יחד את סצנות הדיבור: אתם הלקוח/ה והילד/ה המוכר/ת — ואז מתחלפים.',
}

export async function monthReport(childId: string, month: string) {
  const [y, m] = month.split('-').map(Number)
  const from = `${month}-01`
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const to = `${month}-${String(lastDay).padStart(2, '0')}`
  const [days, stepStars, levelsDone] = await Promise.all([
    db.starDay.findMany({ where: { childProfileId: childId, day: { gte: dayToDate(from), lte: dayToDate(to) } }, orderBy: { day: 'asc' } }),
    stepStarsByChild([childId]),
    db.progress.count({ where: { childProfileId: childId, stars: { gt: 0 } } }),
  ])
  const perStep = stepStars.get(childId)!
  const monthStars = days.reduce((n, d) => n + d.stars, 0)
  const activeDays = days.filter(d => d.stars > 0).map(d => Number(dateToDay(d.day).slice(8)))
  const best = days.reduce<{ day: string; stars: number } | null>((b, d) => (!b || d.stars > b.stars ? { day: dateToDay(d.day), stars: d.stars } : b), null)
  const current = [...STEPS].reverse().find(s => perStep[s.id] > 0) ?? STEPS[0]

  const tips: string[] = []
  if (activeDays.length < 8) tips.push('נסו לקבוע 10 דקות תרגול קבועות ביום — מעט כל יום עדיף על הרבה פעם בשבוע.')
  else tips.push(`כל הכבוד על ההתמדה — ${activeDays.length} ימי תרגול החודש! שמרו על הקצב.`)
  tips.push(STEP_TIPS[current.id])
  if (perStep.step7 === 0 && perStep.step2 > 0) tips.push('נסו את סצנות הדיבור בשלב 7 — תרגול שיחה אמיתית עם דמויות מדברות.')

  return { from, to, lastDay, monthStars, activeDays, best, perStep, levelsDone, current, tips }
}
