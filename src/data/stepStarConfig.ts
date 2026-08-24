// Per-step star + trophy configuration.
//
// TARGETS (Task 3): chosen from each step's amount of content AND the fact that
// every step needs several rounds to actually master — so the target is well
// above the raw number of exercises. Rough basis:
//   step1 ~foundational, huge amount of small tasks (repeatable) → 60
//   step2 broad (vocabulary + grammar + phonics)                 → 60
//   step3 smaller grammar set                                    → 40
//   step4 present tenses                                         → 40
//   step5 largest grammar step (past/will/going-to/adjectives…)  → 70
//   step6 short review/mixed step                                → 20
// All targets are multiples of TROPHY_INTERVAL so a trophy lands on every step.
export const TROPHY_INTERVAL = 10

export interface StepStarMeta {
  he: string       // Hebrew step label
  en: string       // English step label
  emoji: string
  star: string     // text-color class for the colored ★ glyph
  chipBg: string   // gradient (from-… to-…) for button / progress bar
  ring: string     // border color
  soft: string     // soft background
  target: number   // stars needed to "complete" the step's collection
}

export const STEP_STAR_META: Record<string, StepStarMeta> = {
  step1: { he: 'שלב 1', en: 'Step 1', emoji: '🐣', star: 'text-amber-500',   chipBg: 'from-amber-400 to-orange-400',   ring: 'border-amber-300',   soft: 'bg-amber-50',   target: 60 },
  step2: { he: 'שלב 2', en: 'Step 2', emoji: '🐥', star: 'text-purple-500',  chipBg: 'from-purple-400 to-indigo-500',  ring: 'border-purple-300',  soft: 'bg-purple-50',  target: 60 },
  step3: { he: 'שלב 3', en: 'Step 3', emoji: '🐦', star: 'text-green-500',   chipBg: 'from-green-400 to-teal-500',     ring: 'border-green-300',   soft: 'bg-green-50',   target: 40 },
  step4: { he: 'שלב 4', en: 'Step 4', emoji: '🦅', star: 'text-rose-500',    chipBg: 'from-rose-400 to-red-500',       ring: 'border-rose-300',    soft: 'bg-rose-50',    target: 40 },
  step5: { he: 'שלב 5', en: 'Step 5', emoji: '🚀', star: 'text-indigo-500',  chipBg: 'from-indigo-400 to-blue-500',    ring: 'border-indigo-300',  soft: 'bg-indigo-50',  target: 70 },
  step6: { he: 'שלב 6', en: 'Step 6', emoji: '🏆', star: 'text-fuchsia-500', chipBg: 'from-fuchsia-400 to-purple-500', ring: 'border-fuchsia-300', soft: 'bg-fuchsia-50', target: 20 },
}

export const STEP_ORDER = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'] as const

/** Trophy milestones for a step: one bigger trophy every TROPHY_INTERVAL stars, up to the target. */
export function trophyTiers(step: string): number[] {
  const target = STEP_STAR_META[step]?.target ?? 50
  const tiers: number[] = []
  for (let t = TROPHY_INTERVAL; t <= target; t += TROPHY_INTERVAL) tiers.push(t)
  return tiers
}
