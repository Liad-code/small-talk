/**
 * Records every Step 7 scene line in its character's ElevenLabs voice.
 *
 * Output: public/audio/scenes/<key>.mp3, where key = audioKey(text, 'scene-<speaker>')
 * — the same formula the browser uses in src/utils/sceneAudio.ts, so a line
 * always finds its file. Kept out of the 714-file word manifest on purpose:
 * that manifest (and validate-audio) only looks at the top level of public/audio.
 *
 * Existing files are never re-recorded (delete a file to regenerate that line).
 *
 *   node scripts/generate-scene-audio.mjs --dry   # list lines + character cost, no API calls
 *   node scripts/generate-scene-audio.mjs         # record the missing lines
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import path from 'node:path'
import { audioKey } from '../src/utils/audioKey.ts'
import { PIZZERIA, sceneLines } from '../src/data/step7/pizzeria.ts'
import { PIZZERIA_STORY, storyLines } from '../src/data/step7/pizzeriaStory.ts'
import { SCENE_VOICES, SCENE_TTS } from '../src/data/step7/voices.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'audio', 'scenes')
const SCENES = [PIZZERIA]
const STORIES = [PIZZERIA_STORY]
const DRY = process.argv.includes('--dry')

const exists = p => access(p).then(() => true, () => false)

async function apiKey() {
  const raw = await readFile(path.join(ROOT, '.env'), 'utf8')
  const line = raw.split(/\r?\n/).find(l => l.startsWith('ELEVENLABS_API_KEY='))
  if (!line) throw new Error('ELEVENLABS_API_KEY missing from .env')
  return line.slice('ELEVENLABS_API_KEY='.length).trim()
}

async function synthesize(key, voiceId, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: SCENE_TTS.model, voice_settings: SCENE_TTS.settings }),
    })
    if (res.ok) return Buffer.from(await res.arrayBuffer())
    const body = await res.text()
    if (res.status === 429 || res.status >= 500) { await new Promise(r => setTimeout(r, 2000 * attempt)); continue }
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`)
  }
  throw new Error('gave up after 3 attempts')
}

async function main() {
  const all = [
    ...SCENES.flatMap(scene => sceneLines(scene)),
    ...STORIES.flatMap(story => storyLines(story)),
  ]
  // de-duplicate across scene + story (same speaker + text = one recording)
  const seen = new Set()
  const lines = all.filter(l => { const k = l.speaker + '|' + l.text.trim().toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true })
  const todo = []
  for (const l of lines) {
    const key = audioKey(l.text, `scene-${l.speaker}`)
    const file = path.join(OUT_DIR, `${key}.mp3`)
    if (!(await exists(file))) todo.push({ ...l, key, file })
  }
  const chars = todo.reduce((n, l) => n + l.text.length, 0)
  console.log(`lines ${lines.length} · already recorded ${lines.length - todo.length} · to record ${todo.length} (${chars} characters)`)
  for (const s of Object.keys(SCENE_VOICES)) {
    const mine = todo.filter(l => l.speaker === s)
    console.log(`  ${s} (${SCENE_VOICES[s].name}): ${mine.length} lines, ${mine.reduce((n, l) => n + l.text.length, 0)} chars`)
  }
  if (DRY || todo.length === 0) return

  const key = await apiKey()
  const sub = await (await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': key } })).json()
  const left = sub.character_limit - sub.character_count
  console.log(`ElevenLabs quota: ${left} characters left this period`)
  if (chars > left) throw new Error(`not enough quota (${chars} needed, ${left} left) — nothing recorded`)

  await mkdir(OUT_DIR, { recursive: true })
  let done = 0
  for (const l of todo) {
    const mp3 = await synthesize(key, SCENE_VOICES[l.speaker].voiceId, l.text)
    await writeFile(l.file, mp3)
    done++
    console.log(`  ✓ [${l.speaker}] ${l.text}`)
  }
  console.log(`recorded ${done} files → public/audio/scenes/`)
}

main().catch(e => { console.error(e.message); process.exit(1) })
