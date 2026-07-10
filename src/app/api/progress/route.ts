import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSessionUserId, getActiveChild } from '@/lib/children'

export const dynamic = 'force-dynamic'

const STARS_ROW = '__stars__'

const levelSchema = z.object({
  lessonDone: z.boolean(),
  quizScore: z.number().int().min(0).max(100),
  stars: z.number().int().min(0).max(3),
  gameHighScore: z.number().int().min(0).max(1_000_000),
})

const payloadSchema = z.object({
  subjects: z.record(z.string().max(64), z.record(z.string().max(8), levelSchema)).optional(),
  step1: z
    .object({
      done: z.record(z.string().max(64), z.boolean()),
      stars: z.number().int().min(0).max(1_000_000),
    })
    .optional(),
  stepStars: z.record(z.enum(['step2', 'step3', 'step4', 'step5', 'step6']), z.number().int().min(0).max(1_000_000)).optional(),
})

/** GET: full progress snapshot for the active child (server is source of truth). */
export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const child = await getActiveChild(userId)
  if (!child) return NextResponse.json({ child: null })

  const [rows, step1Rows, starRows] = await Promise.all([
    db.progress.findMany({ where: { childProfileId: child.id } }),
    db.step1Progress.findMany({ where: { childProfileId: child.id } }),
    db.stepStars.findMany({ where: { childProfileId: child.id } }),
  ])

  const subjects: Record<string, Record<string, { lessonDone: boolean; quizScore: number; stars: number; gameHighScore: number }>> = {}
  for (const r of rows) {
    subjects[r.subjectId] ??= {}
    subjects[r.subjectId][String(r.level)] = {
      lessonDone: r.lessonDone,
      quizScore: r.quizScore,
      stars: r.stars,
      gameHighScore: r.gameHighScore,
    }
  }

  const step1Done: Record<string, boolean> = {}
  let step1Stars = 0
  for (const r of step1Rows) {
    if (r.exerciseKey === STARS_ROW) step1Stars = r.stars
    else if (r.done) step1Done[r.exerciseKey] = true
  }

  const stepStars: Record<string, number> = {}
  for (const r of starRows) stepStars[r.step] = r.stars

  return NextResponse.json({
    child: { id: child.id, displayName: child.displayName, avatar: child.avatar },
    subjects,
    step1: { done: step1Done, stars: step1Stars },
    stepStars,
  })
}

/**
 * POST: merge-write any subset of {subjects, step1, stepStars} for the active
 * child. Merge policy: counters take max(server, client), booleans OR — so a
 * stale device can never erase progress.
 */
export async function POST(req: Request) {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const child = await getActiveChild(userId)
  if (!child) return NextResponse.json({ error: 'no_active_child' }, { status: 409 })

  const parsed = payloadSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const { subjects, step1, stepStars } = parsed.data

  const ops = []

  if (subjects) {
    for (const [subjectId, levels] of Object.entries(subjects)) {
      for (const [levelStr, p] of Object.entries(levels)) {
        const level = parseInt(levelStr, 10)
        if (!Number.isFinite(level) || level < 1 || level > 99) continue
        ops.push(
          db.$executeRaw`
            INSERT INTO "Progress" ("id", "childProfileId", "subjectId", "level", "lessonDone", "quizScore", "stars", "gameHighScore", "updatedAt")
            VALUES (${`${child.id}_${subjectId}_${level}`}, ${child.id}, ${subjectId}, ${level}, ${p.lessonDone}, ${p.quizScore}, ${p.stars}, ${p.gameHighScore}, NOW())
            ON CONFLICT ("childProfileId", "subjectId", "level") DO UPDATE SET
              "lessonDone" = "Progress"."lessonDone" OR EXCLUDED."lessonDone",
              "quizScore" = GREATEST("Progress"."quizScore", EXCLUDED."quizScore"),
              "stars" = GREATEST("Progress"."stars", EXCLUDED."stars"),
              "gameHighScore" = GREATEST("Progress"."gameHighScore", EXCLUDED."gameHighScore"),
              "updatedAt" = NOW()
          `
        )
      }
    }
  }

  if (step1) {
    for (const [key, done] of Object.entries(step1.done)) {
      if (!done) continue
      ops.push(
        db.step1Progress.upsert({
          where: { childProfileId_exerciseKey: { childProfileId: child.id, exerciseKey: key } },
          create: { childProfileId: child.id, exerciseKey: key, done: true, stars: 0 },
          update: { done: true },
        })
      )
    }
    ops.push(
      db.$executeRaw`
        INSERT INTO "Step1Progress" ("id", "childProfileId", "exerciseKey", "done", "stars", "updatedAt")
        VALUES (${`${child.id}_${STARS_ROW}`}, ${child.id}, ${STARS_ROW}, false, ${step1.stars}, NOW())
        ON CONFLICT ("childProfileId", "exerciseKey") DO UPDATE SET
          "stars" = GREATEST("Step1Progress"."stars", EXCLUDED."stars"),
          "updatedAt" = NOW()
      `
    )
  }

  if (stepStars) {
    for (const [step, stars] of Object.entries(stepStars)) {
      ops.push(
        db.$executeRaw`
          INSERT INTO "StepStars" ("id", "childProfileId", "step", "stars", "updatedAt")
          VALUES (${`${child.id}_${step}`}, ${child.id}, ${step}, ${stars}, NOW())
          ON CONFLICT ("childProfileId", "step") DO UPDATE SET
            "stars" = GREATEST("StepStars"."stars", EXCLUDED."stars"),
            "updatedAt" = NOW()
        `
      )
    }
  }

  if (ops.length > 0) await db.$transaction(ops)
  return NextResponse.json({ ok: true })
}
