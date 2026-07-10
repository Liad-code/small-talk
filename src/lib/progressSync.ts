'use client'

// Client sync layer: localStorage stays the fast cache the hooks read/write;
// when a parent is signed in with an active child, we pull the server
// snapshot into localStorage on boot and push local writes in the background.

const KEYS = {
  subjects: 'smalltalk_progress',
  step1: 'smalltalk_step1',
  stepStars: 'smalltalk_stepstars',
} as const

export const PROGRESS_REFRESH_EVENT = 'smalltalk-progress-refresh'

let syncEnabled = false
export function setSyncEnabled(on: boolean) {
  syncEnabled = on
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** Local blobs in API payload shape (used for pushes and one-time import). */
export function collectLocalProgress() {
  return {
    subjects: readJson<Record<string, Record<string, { lessonDone: boolean; quizScore: number; stars: number; gameHighScore: number }>>>(KEYS.subjects, {}),
    step1: readJson<{ done: Record<string, boolean>; stars: number }>(KEYS.step1, { done: {}, stars: 0 }),
    stepStars: readJson<Record<string, number>>(KEYS.stepStars, {}),
  }
}

export function hasLocalProgress(): boolean {
  const p = collectLocalProgress()
  return Object.keys(p.subjects).length > 0 || p.step1.stars > 0 || Object.values(p.stepStars).some(n => n > 0)
}

// Debounced background push (fire-and-forget; server merges safely)
let pushTimer: ReturnType<typeof setTimeout> | null = null
let pending: Record<string, unknown> = {}

export function pushProgress(partial: { subjects?: unknown; step1?: unknown; stepStars?: unknown }) {
  if (!syncEnabled) return
  pending = { ...pending, ...partial }
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    const body = JSON.stringify(pending)
    pending = {}
    pushTimer = null
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {/* offline — local cache still has it; next push retries implicitly */})
  }, 800)
}

/** Push everything local right now (used for the one-time import). */
export async function importLocalProgress(): Promise<boolean> {
  const res = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(collectLocalProgress()),
  })
  return res.ok
}

export interface ActiveChildInfo {
  id: string
  displayName: string
  avatar: string
}

/**
 * Pull the active child's server snapshot and overwrite the local cache.
 * Returns the child (or null if signed out / no active child).
 */
export async function pullProgress(): Promise<ActiveChildInfo | null> {
  const res = await fetch('/api/progress', { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  if (!data.child) return null

  try {
    localStorage.setItem(KEYS.subjects, JSON.stringify(data.subjects ?? {}))
    localStorage.setItem(KEYS.step1, JSON.stringify(data.step1 ?? { done: {}, stars: 0 }))
    localStorage.setItem(KEYS.stepStars, JSON.stringify(data.stepStars ?? {}))
  } catch {/* storage full/unavailable — hooks keep whatever they have */}

  window.dispatchEvent(new Event(PROGRESS_REFRESH_EVENT))
  window.dispatchEvent(new Event('smalltalk-stepstars-change'))
  return data.child as ActiveChildInfo
}
