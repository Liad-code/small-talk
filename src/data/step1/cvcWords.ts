export interface CVCWord {
  word: string
  vowel: 'a' | 'e' | 'i' | 'o' | 'u'
  emoji: string
  consonantStart: string
  consonantEnd: string
  ttsText?: string   // override for TTS when default pronunciation is wrong
}

export const CVC_WORDS: CVCWord[] = [
  // ── short a ──────────────────────────────────────────────────
  { word: 'cat', vowel: 'a', emoji: '🐱', consonantStart: 'c', consonantEnd: 't' },
  { word: 'bat', vowel: 'a', emoji: '🦇', consonantStart: 'b', consonantEnd: 't' },
  { word: 'hat', vowel: 'a', emoji: '🎩', consonantStart: 'h', consonantEnd: 't' },
  { word: 'map', vowel: 'a', emoji: '🗺️', consonantStart: 'm', consonantEnd: 'p' },
  { word: 'van', vowel: 'a', emoji: '🚐', consonantStart: 'v', consonantEnd: 'n' },
  { word: 'bag', vowel: 'a', emoji: '👜', consonantStart: 'b', consonantEnd: 'g' },
  // ── short e ──────────────────────────────────────────────────
  { word: 'bed', vowel: 'e', emoji: '🛏️', consonantStart: 'b', consonantEnd: 'd' },
  { word: 'red', vowel: 'e', emoji: '🔴', consonantStart: 'r', consonantEnd: 'd' },
  { word: 'hen', vowel: 'e', emoji: '🐔', consonantStart: 'h', consonantEnd: 'n' },
  { word: 'pen', vowel: 'e', emoji: '🖊️', consonantStart: 'p', consonantEnd: 'n' },
  { word: 'ten', vowel: 'e', emoji: '🔟', consonantStart: 't', consonantEnd: 'n' },
  { word: 'leg', vowel: 'e', emoji: '🦵', consonantStart: 'l', consonantEnd: 'g' },
  // ── short i ──────────────────────────────────────────────────
  { word: 'pig', vowel: 'i', emoji: '🐷', consonantStart: 'p', consonantEnd: 'g' },
  { word: 'big', vowel: 'i', emoji: '🐘', consonantStart: 'b', consonantEnd: 'g' },
  { word: 'sit', vowel: 'i', emoji: '🪑', consonantStart: 's', consonantEnd: 't' },
  { word: 'hit', vowel: 'i', emoji: '🎯', consonantStart: 'h', consonantEnd: 't' },
  { word: 'bin', vowel: 'i', emoji: '🗑️', consonantStart: 'b', consonantEnd: 'n' },
  { word: 'six', vowel: 'i', emoji: '6️⃣', consonantStart: 's', consonantEnd: 'x' },
  // ── short o ──────────────────────────────────────────────────
  { word: 'dog', vowel: 'o', emoji: '🐶', consonantStart: 'd', consonantEnd: 'g' },
  { word: 'box', vowel: 'o', emoji: '📦', consonantStart: 'b', consonantEnd: 'x' },
  { word: 'log', vowel: 'o', emoji: '🪵', consonantStart: 'l', consonantEnd: 'g' },
  { word: 'hop', vowel: 'o', emoji: '🤸', consonantStart: 'h', consonantEnd: 'p' },
  { word: 'cop', vowel: 'o', emoji: '👮', consonantStart: 'c', consonantEnd: 'p' },
  { word: 'mop', vowel: 'o', emoji: '🧹', consonantStart: 'm', consonantEnd: 'p' },
  // ── short u ──────────────────────────────────────────────────
  { word: 'sun', vowel: 'u', emoji: '☀️', consonantStart: 's', consonantEnd: 'n' },
  { word: 'bus', vowel: 'u', emoji: '🚌', consonantStart: 'b', consonantEnd: 's' },
  { word: 'cup', vowel: 'u', emoji: '☕', consonantStart: 'c', consonantEnd: 'p' },
  { word: 'hug', vowel: 'u', emoji: '🤗', consonantStart: 'h', consonantEnd: 'g' },
  { word: 'rug', vowel: 'u', emoji: '🟫', consonantStart: 'r', consonantEnd: 'g' },
  { word: 'bug', vowel: 'u', emoji: '🐛', consonantStart: 'b', consonantEnd: 'g' },
]

export const VOWELS = ['a', 'e', 'i', 'o', 'u'] as const
export type Vowel = typeof VOWELS[number]

/** Returns the TTS-safe pronunciation text for a word (uses ttsText override when defined) */
export function ttsFor(word: string): string {
  return CVC_WORDS.find(w => w.word === word)?.ttsText ?? word
}

export const VOWEL_COLORS: Record<Vowel, { bg: string; border: string; text: string; gradient: string }> = {
  a: { bg: 'bg-red-100',    border: 'border-red-400',    text: 'text-red-700',    gradient: 'from-red-400 to-rose-400'       },
  e: { bg: 'bg-blue-100',   border: 'border-blue-400',   text: 'text-blue-700',   gradient: 'from-blue-400 to-cyan-400'      },
  i: { bg: 'bg-green-100',  border: 'border-green-400',  text: 'text-green-700',  gradient: 'from-green-400 to-emerald-400'  },
  o: { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700', gradient: 'from-purple-400 to-violet-400'  },
  u: { bg: 'bg-pink-100',   border: 'border-pink-400',   text: 'text-pink-700',   gradient: 'from-pink-400 to-rose-400'      },
}
