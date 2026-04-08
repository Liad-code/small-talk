'use client'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { LetterCard } from './LetterCard'

interface Props {
  soundMode?: boolean     // false = play letter name, true = play name + short sound
  size?: 'sm' | 'md' | 'lg'
  onLetterClick?: (letter: string) => void
  doneLetter?: (letter: string) => boolean
}

export function ABCGrid({ soundMode = false, size = 'md', onLetterClick, doneLetter }: Props) {
  return (
    <div className="space-y-6">
      {LETTER_GROUPS.map(group => (
        <div key={group.id}>
          {/* Group label */}
          <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-gradient-to-r ${group.color} text-white text-sm font-bold shadow-sm`}>
            <span>{group.emoji}</span>
            <span>{group.hebrewLabel}</span>
          </div>

          {/* Letter cards */}
          <div className="flex flex-wrap gap-3">
            {group.letters.map(letter => (
              <LetterCard
                key={letter}
                letter={letter}
                groupColor={group.color}
                bgColor={group.bgColor}
                textColor={group.textColor}
                borderColor={group.borderColor}
                size={size}
                soundMode={soundMode}
                done={doneLetter?.(letter) ?? false}
                onClick={() => onLetterClick?.(letter)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
