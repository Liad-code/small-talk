'use client'
import { useMute } from '@/hooks/useMute'

interface Props {
  letter: string
  groupColor: string
  bgColor: string
  textColor: string
  borderColor: string
  size?: 'sm' | 'md' | 'lg'
  soundMode?: boolean
  done?: boolean
  onClick?: () => void
}

// Just the short phoneme sounds — no "as in X"
const SHORT_PHONEMES: Record<string, string> = {
  a: 'a',   b: 'buh', c: 'kuh', d: 'duh', e: 'eh',
  f: 'fuh', g: 'guh', h: 'huh', i: 'ih',  j: 'juh',
  k: 'kuh', l: 'luh', m: 'muh', n: 'nuh', o: 'oh',
  p: 'puh', q: 'kwuh',r: 'ruh', s: 'suh', t: 'tuh',
  u: 'uh',  v: 'vuh', w: 'wuh', x: 'ks',  y: 'yuh', z: 'zuh',
}

export function LetterCard({ letter, groupColor, bgColor, textColor, borderColor, size = 'md', soundMode = false, done = false, onClick }: Props) {
  const { isMuted } = useMute()

  function speak() {
    if (isMuted()) return
    window.speechSynthesis.cancel()

    // Always say the letter name first
    const u1 = new SpeechSynthesisUtterance(letter)
    u1.lang = 'en-US'; u1.rate = 0.85; u1.pitch = 1.1
    window.speechSynthesis.speak(u1)

    // In sound mode, queue the short phoneme after the name
    if (soundMode) {
      const u2 = new SpeechSynthesisUtterance(SHORT_PHONEMES[letter] ?? letter)
      u2.lang = 'en-US'; u2.rate = 0.8; u2.pitch = 1.0
      window.speechSynthesis.speak(u2)
    }

    onClick?.()
  }

  const sizeMap = {
    sm: { card: 'w-16 h-16 rounded-2xl border-3', upper: 'text-xl', lower: 'text-base' },
    md: { card: 'w-22 h-22 rounded-2xl border-4', upper: 'text-3xl', lower: 'text-xl' },
    lg: { card: 'w-28 h-28 rounded-3xl border-4', upper: 'text-4xl', lower: 'text-2xl' },
  }
  const s = sizeMap[size]

  return (
    <button
      onClick={speak}
      className={`
        relative ${bgColor} border-4 ${borderColor}
        ${s.card} flex flex-col items-center justify-center gap-0.5
        shadow-md active:scale-90 hover:scale-105
        transition-all duration-150 cursor-pointer select-none
      `}
      style={{ width: size === 'sm' ? '4rem' : size === 'md' ? '5.5rem' : '7rem',
               height: size === 'sm' ? '4rem' : size === 'md' ? '5.5rem' : '7rem' }}
      aria-label={`Letter ${letter.toUpperCase()}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-xl bg-gradient-to-r ${groupColor}`} />
      <span className={`font-display font-black ${s.upper} ${textColor} leading-none`}>
        {letter.toUpperCase()}
      </span>
      <span className={`font-display font-bold ${s.lower} ${textColor} leading-none opacity-70`}>
        {letter}
      </span>
      {done && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-black shadow">
          ✓
        </div>
      )}
    </button>
  )
}
