'use client'
import { useState } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, VOWELS, VOWEL_COLORS, ttsFor } from '@/data/step1/cvcWords'
import { WordEmoji } from '@/components/step1/WordEmoji'
import { useSpeak } from '@/hooks/useSpeak'

function C8Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [activeVowel, setActiveVowel] = useState<string>('a')
  const [tapped, setTapped] = useState<Set<string>>(new Set())

  const vowelWords = CVC_WORDS.filter(w => w.vowel === activeVowel)
  const vc = VOWEL_COLORS[activeVowel as keyof typeof VOWEL_COLORS]

  const allTapped = VOWELS.every(v =>
    CVC_WORDS.filter(w => w.vowel === v).every(w => tapped.has(w.word))
  )

  // Use effect would cause immediate fire; call onComplete via button instead
  // (all-tapped state triggers naturally after last card tap)
  if (allTapped) {
    // Will be caught in render — use a small guard
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Vowel tabs */}
      <div className="flex gap-2 justify-center mb-6">
        {VOWELS.map(v => {
          const c = VOWEL_COLORS[v]
          const allDone = CVC_WORDS.filter(w => w.vowel === v).every(w => tapped.has(w.word))
          return (
            <button
              key={v}
              onClick={() => setActiveVowel(v)}
              className={`
                w-12 h-12 rounded-xl border-4 font-display font-black text-2xl
                transition-all duration-150 cursor-pointer select-none
                ${activeVowel === v ? `${c.bg} ${c.border} ${c.text} scale-110` : 'bg-white border-gray-200 text-gray-500'}
                ${allDone ? 'ring-4 ring-green-400' : ''}
              `}
            >
              {v}
            </button>
          )
        })}
      </div>

      {/* Reading cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {vowelWords.map(w => {
          const done = tapped.has(w.word)
          return (
            <button
              key={w.word}
              onClick={() => {
                speak(ttsFor(w.word), 0.7, 1.1)
                setTapped(prev => {
                  const n = new Set(prev)
                  n.add(w.word)
                  // Check if all are done after this tap
                  const newTapped = n
                  const allDoneNow = VOWELS.every(v =>
                    CVC_WORDS.filter(cw => cw.vowel === v).every(cw => newTapped.has(cw.word))
                  )
                  if (allDoneNow) setTimeout(onComplete, 500)
                  return n
                })
              }}
              className={`
                rounded-3xl border-4 p-4 flex flex-col items-center gap-2
                transition-all duration-150 cursor-pointer select-none
                ${done ? `${vc.bg} ${vc.border} scale-105` : 'bg-white border-gray-200 hover:scale-105 active:scale-95 hover:border-purple-300'}
                shadow-md
              `}
            >
              <WordEmoji word={w} className="text-5xl" />
              <span className={`font-display font-black text-2xl ${done ? vc.text : 'text-gray-700'}`}>
                {w.word}
              </span>
              <div className="flex gap-1">
                {w.word.split('').map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${done ? vc.border.replace('border-', 'bg-') : 'bg-gray-300'}`} />
                ))}
              </div>
              {done && <span className="text-sm font-black text-green-600">🔊 heard!</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function C8Page() {
  return (
    <ExerciseShell
      title="Let's Read Cards"
      hebrewInstruction="לחץ על כל כרטיס כדי לשמוע ולקרוא"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c8"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C8Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
