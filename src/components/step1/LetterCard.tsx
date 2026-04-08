'use client'
import { useMute } from '@/hooks/useMute'

interface Props {
  letter: string          // lowercase e.g. 't'
  groupColor: string      // Tailwind bg gradient e.g. 'from-red-400 to-orange-500'
  bgColor: string         // Tailwind bg e.g. 'bg-red-50'
  textColor: string       // Tailwind text e.g. 'text-red-600'
  borderColor: string     // Tailwind border e.g. 'border-red-300'
  size?: 'sm' | 'md' | 'lg'
  soundMode?: boolean     // if true, plays name + short sound phrase
  done?: boolean          // show checkmark overlay
  onClick?: () => void    // extra callback after speak
}

// Short sound TTS text per letter
const SHORT_SOUNDS: Record<string, string> = {
  a: 'a, as in apple', b: 'b, as in ball',   c: 'c, as in cat',
  d: 'd, as in dog',   e: 'e, as in egg',    f: 'f, as in fish',
  g: 'g, as in girl',  h: 'h, as in hat',    i: 'i, as in insect',
  j: 'j, as in jump',  k: 'k, as in kite',   l: 'l, as in lion',
  m: 'm, as in moon',  n: 'n, as in nest',   o: 'o, as in octopus',
  p: 'p, as in pen',   q: 'q, as in queen',  r: 'r, as in rabbit',
  s: 's, as in sun',   t: 't, as in top',    u: 'u, as in umbrella',
  v: 'v, as in van',   w: 'w, as in water',  x: 'x, as in xylophone',
  y: 'y, as in yellow',z: 'z, as in zero',
}

export function LetterCard({ letter, groupColor, bgColor, textColor, borderColor, size = 'md', soundMode = false, done = false, onClick }: Props) {
  const { isMuted } = useMute()

  function speak() {
    if (isMuted()) return
    window.speechSynthesis.cancel()
    const text = soundMode ? (SHORT_SOUNDS[letter] ?? letter) : letter
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.85
    u.pitch = 1.1
    u.lang = 'en-US'
    window.speechSynthesis.speak(u)
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
      {/* Gradient top strip */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-xl bg-gradient-to-r ${groupColor}`} />

      <span className={`font-display font-black ${s.upper} ${textColor} leading-none`}>
        {letter.toUpperCase()}
      </span>
      <span className={`font-display font-bold ${s.lower} ${textColor} leading-none opacity-70`}>
        {letter}
      </span>

      {/* Done checkmark */}
      {done && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-black shadow">
          ✓
        </div>
      )}
    </button>
  )
}
