import { audioKey } from '@/utils/audioKey'
import { playAudioSrc } from '@/utils/audioPlayer'
import type { Speaker } from '@/data/step7/types'

const MUTE_KEY = 'smalltalk_muted' // same key as hooks/useMute

/** URL of a scene line in its speaker's voice — same formula as scripts/generate-scene-audio.mjs. */
export function sceneAudioUrl(speaker: Speaker, text: string): string {
  return `/audio/scenes/${audioKey(text, `scene-${speaker}`)}.mp3`
}

function muted(): boolean {
  try { return localStorage.getItem(MUTE_KEY) === 'true' } catch { return false }
}

/** Say a scene line and resolve when it has finished (immediately when muted). */
export function sayLine(speaker: Speaker, text: string): Promise<void> {
  if (muted()) return Promise.resolve()
  return playAudioSrc(sceneAudioUrl(speaker, text), `${speaker}: ${text}`)
}
