/**
 * Checks every Step 7 scene + story for mistakes a typecheck can't catch:
 * broken story links, unreachable endings, missing places / voices, role-swap
 * slots that don't match the answers, Build-mode distractors that appear in the
 * sentence, overly long lines. Also prints the recording cost per scene.
 *
 *   node scripts/validate-step7.mjs            # all scenes
 *   node scripts/validate-step7.mjs ice-cream  # one scene
 */
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { PIZZERIA } from '../src/data/step7/pizzeria.ts'
import { PIZZERIA_STORY } from '../src/data/step7/pizzeriaStory.ts'
import { bundleLines } from '../src/data/step7/lines.ts'
import { SCENE_VOICES } from '../src/data/step7/voices.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIR = path.join(ROOT, 'src', 'data', 'step7', 'scenes')
const BUILT_IN_PLACES = ['street', 'counter', 'kitchen', 'oven', 'table', 'park']
const ONLY = process.argv[2]

const bundles = [{ scene: PIZZERIA, story: PIZZERIA_STORY, file: 'pizzeria.ts' }]
for (const f of (await readdir(DIR)).filter(f => f.endsWith('.ts')).sort()) {
  const mod = await import(pathToFileURL(path.join(DIR, f)).href)
  if (!mod.BUNDLE) { console.log(`✗ ${f}: no BUNDLE export`); process.exitCode = 1; continue }
  bundles.push({ ...mod.BUNDLE, file: f })
}

let failed = 0
for (const b of bundles) {
  const { scene, story } = b
  if (ONLY && scene.id !== ONLY) continue
  const errs = []
  const err = m => errs.push(m)
  const places = new Set([...BUILT_IN_PLACES, ...Object.keys(scene.places ?? {})])
  const char = scene.character?.speaker

  // ── scene ──
  if (b.file !== 'pizzeria.ts' && b.file !== `${scene.id}.ts`) err(`file name should be ${scene.id}.ts`)
  if (!SCENE_VOICES[char]) err(`character speaker "${char}" has no voice in voices.ts`)
  for (const [k, v] of Object.entries(scene.ui ?? {})) {
    if (typeof v === 'string' && !v.trim()) err(`ui.${k} is empty`)
  }
  if (!places.has(scene.ui.stagePlace)) err(`ui.stagePlace "${scene.ui.stagePlace}" is not a place`)
  if (scene.steps.length < 5) err(`only ${scene.steps.length} steps (want 6–8)`)
  const stepIds = new Set()
  for (const s of scene.steps) {
    if (stepIds.has(s.id)) err(`duplicate step id ${s.id}`)
    stepIds.add(s.id)
    const good = s.options.filter(o => o.correct)
    const silly = s.options.filter(o => !o.correct)
    if (!good.length) err(`step ${s.id}: no correct option`)
    if (!silly.length) err(`step ${s.id}: no silly option`)
    for (const o of silly) if (!o.reaction) err(`step ${s.id}: silly option "${o.say}" has no reaction`)
    if (good.length > 1) for (const o of good) if (!o.icon || !o.label) err(`step ${s.id}: choice "${o.say}" needs icon + label (Build mode picker)`)
    const words = good.flatMap(o => o.say.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/))
    if (words.includes(s.distractorWord.toLowerCase())) err(`step ${s.id}: distractor "${s.distractorWord}" appears in an answer`)
    if (!s.swapSilly?.say || !s.swapSilly?.reaction) err(`step ${s.id}: swapSilly incomplete`)
  }
  if (!stepIds.has(scene.makeAfterStep)) err(`makeAfterStep "${scene.makeAfterStep}" is not a step`)
  const afterIdx = scene.steps.findIndex(s => s.id === scene.makeAfterStep)
  for (const slot of scene.makeSlots) {
    const steps = scene.steps.filter((s, i) => i <= afterIdx && s.options.some(o => o.pick?.slot === slot.slot))
    if (!steps.length) err(`make slot "${slot.slot}": no step up to "${scene.makeAfterStep}" picks it`)
    for (const s of steps) for (const o of s.options.filter(o => o.correct)) {
      if (!o.pick) err(`step ${s.id}: correct option "${o.say}" has no pick (the customer's order would miss "${slot.slot}")`)
      else if (o.pick.slot === slot.slot && !slot.choices.some(c => c.value === o.pick.value)) err(`make slot "${slot.slot}" has no choice "${o.pick.value}"`)
    }
  }
  if (scene.phrases.length < 8) err(`only ${scene.phrases.length} Learn phrases (want 10–16)`)
  for (const p of scene.phrases) if (p.speaker !== 'kid' && p.speaker !== char) err(`phrase speaker "${p.speaker}" must be "kid" or "${char}"`)

  // ── story ──
  const byId = new Map(story.nodes.map(n => [n.id, n]))
  if (byId.size !== story.nodes.length) err('duplicate story node ids')
  if (!byId.has(story.start)) err(`story.start "${story.start}" missing`)
  if (!places.has(story.coverPlace)) err(`coverPlace "${story.coverPlace}" is not a place`)
  const endingIds = new Set(story.endings.map(e => e.id))
  for (const e of story.endings) if (!places.has(e.place)) err(`ending ${e.id}: place "${e.place}" is not a place`)
  const maxCh = Math.max(...story.nodes.map(n => n.chapter))
  if (story.chapters.length !== maxCh + 1) err(`chapters has ${story.chapters.length} icons but chapters go up to ${maxCh}`)
  for (const n of story.nodes) {
    if (!places.has(n.place)) err(`node ${n.id}: place "${n.place}" is not a place`)
    if (n.ending && !endingIds.has(n.ending)) err(`node ${n.id}: ending "${n.ending}" not in endings`)
    if (n.event) {
      if (!n.next || !byId.has(n.next)) err(`node ${n.id}: event needs a valid next`)
      if (n.event === 'oven' && !story.oven) err(`node ${n.id}: oven event but story.oven missing`)
      if (n.event !== 'oven' && (n.event.count < 1 || n.event.decoys.length < 4)) err(`node ${n.id}: find event needs count ≥1 and ≥4 decoys`)
    } else if (!n.choices?.length) err(`node ${n.id}: no choices and no event`)
    for (const c of n.choices ?? []) {
      if (c.silly) continue
      const targets = [c.next, ...(c.nextIf ?? []).map(r => r.next)].filter(Boolean)
      for (const t of targets) if (!byId.has(t)) err(`node ${n.id}: choice "${c.say}" → missing node "${t}"`)
      if (!targets.length && !n.ending) err(`node ${n.id}: choice "${c.say}" goes nowhere (not an ending node)`)
      if (c.canSellOut && !story.soldOut) err(`node ${n.id}: canSellOut but story.soldOut missing`)
    }
  }
  // reachability
  const seen = new Set()
  const queue = [story.start]
  while (queue.length) {
    const id = queue.shift()
    if (seen.has(id) || !byId.has(id)) continue
    seen.add(id)
    const n = byId.get(id)
    if (n.next) queue.push(n.next)
    for (const c of n.choices ?? []) {
      if (c.next) queue.push(c.next)
      for (const r of c.nextIf ?? []) queue.push(r.next)
    }
  }
  for (const n of story.nodes) if (!seen.has(n.id)) err(`node ${n.id} can't be reached from the start`)
  for (const e of story.endings) {
    if (!story.nodes.some(n => n.ending === e.id && seen.has(n.id))) err(`ending ${e.id} can't be reached`)
  }
  if (story.endings.length < 3) err(`only ${story.endings.length} endings (want 3–4)`)

  // ── lines ──
  const all = bundleLines({ scene, story })
  for (const l of all) {
    if (l.text.length > 75) err(`line too long (${l.text.length}): "${l.text}"`)
    if (/[“”‘’]/.test(l.text)) err(`curly quotes in "${l.text}" — use straight quotes`)
    if (/[֐-׿]/.test(l.text)) err(`Hebrew inside an English line: "${l.text}"`)
  }
  const chars = all.reduce((n, l) => n + l.text.length, 0)

  if (errs.length) {
    failed++
    console.log(`✗ ${scene.id} (${b.file}) — ${errs.length} problem(s):`)
    for (const e of errs) console.log(`   - ${e}`)
  } else {
    console.log(`✓ ${scene.id}: ${scene.steps.length} steps, ${story.nodes.length} story moments, ${story.endings.length} endings, ${all.length} lines / ${chars} chars to record`)
  }
}
if (failed) process.exitCode = 1
