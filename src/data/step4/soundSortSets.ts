import { SOUNDS } from './phonics'
import type { SoundSortCategory, SoundSortSet } from '@/data/step3/soundSortSets'

// Pull the first 3 words (that have an emoji) of a step-4 sound.
function categoryFromSound(soundId: string): SoundSortCategory {
  const sound = SOUNDS.find(s => s.id === soundId)
  if (!sound) throw new Error(`Unknown step4 sound id: ${soundId}`)
  const words = sound.words.filter(w => !!w.emoji).slice(0, 3)
  return { id: sound.id, label: sound.label, words }
}

// Sound Sort 1: ie, y, tch, dge   |   Sound Sort 2: tion, sion, ture
const SET_SOUND_IDS: string[][] = [
  ['ie', 'y-as-i', 'tch', 'dge'],
  ['tion', 'sion', 'ture'],
]

export const STEP4_SOUND_SORT_SETS: SoundSortSet[] = SET_SOUND_IDS.map((ids, i) => ({
  id: i + 1,
  sounds: ids.map(categoryFromSound),
}))

export function getStep4SoundSortSet(id: number): SoundSortSet | undefined {
  return STEP4_SOUND_SORT_SETS.find(s => s.id === id)
}
