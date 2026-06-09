import { SOUNDS, type SoundWord } from './phonics'

export interface SoundSortCategory {
  id: string
  label: string
  words: SoundWord[]
}

export interface SoundSortSet {
  id: number
  sounds: SoundSortCategory[]
}

// Pull the first 3 words (that have an emoji) of a sound from the SOUNDS data.
function categoryFromSound(soundId: string): SoundSortCategory {
  const sound = SOUNDS.find(s => s.id === soundId)
  if (!sound) throw new Error(`Unknown sound id: ${soundId}`)
  const words = sound.words.filter(w => !!w.emoji).slice(0, 3)
  return { id: sound.id, label: sound.label, words }
}

function buildSet(id: number, soundIds: string[]): SoundSortSet {
  return { id, sounds: soundIds.map(categoryFromSound) }
}

export const SOUND_SORT_SETS: SoundSortSet[] = [
  buildSet(1, ['kn', 'qu', 'wr']),
  buildSet(2, ['ng', 'ow-oa', 'ow-ou']),
  buildSet(3, ['oi-oy', 'ey', 'igh']),
  buildSet(4, ['r-controlled', 'ew-ue', 'wa']),
  buildSet(5, ['soft-g', 'soft-c']),
]

export function getSoundSortSet(id: number): SoundSortSet | undefined {
  return SOUND_SORT_SETS.find(s => s.id === id)
}
