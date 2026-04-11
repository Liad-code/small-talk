'use client'
import { useMute } from '@/hooks/useMute'
import { speakLetter } from '@/utils/speakLetterSound'

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

export function LetterCard({ letter, groupColor, bgColor, textColor, borderColor, size = 'md', soundMode = false, done = false, onClick }: Props) {
  const { isMuted } = useMute()

  function handleClick() {
    speakLetter(letter, isMuted, soundMode)
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
      onClick={handleClick}
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
