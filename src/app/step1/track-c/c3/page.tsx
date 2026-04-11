'use client'
import { useState, useEffect } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, ttsFor } from '@/data/step1/cvcWords'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

function getGroup(letter: string) {
  return LETTER_GROUPS.find(g => g.letters.includes(letter))
}

function getDistractors(correct: string): string[] {
  const pool = 'bcdfghjklmnprstvwxyz'.split('').filter(c => c !== correct)
  return shuffle(pool).slice(0, 3)
}

const INSTRUCTION = 'לחץ על התמונה כדי לשמוע את המילה – לחץ על האות המתאימה להשלמת המילה'

function C3Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [queue] = useState(() => shuffle([...CVC_WORDS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [correct, setCorrect] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const current = queue[idx]

  useEffect(() => {
    if (!current) return
    setOptions(shuffle([current.consonantStart, ...getDistractors(current.consonantStart)]))
    const t = setTimeout(() => speak(ttsFor(current.word)), 400)
    return () => clearTimeout(t)  // prevent stale speech on fast navigation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  function handleTap(letter: string) {
    if (!current || correct) return
    if (letter === current.consonantStart) {
      setCorrect(letter)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        if (idx + 1 >= queue.length) onComplete()
        else setIdx(i => i + 1)
      }, 700)
    } else {
      setWrong(letter)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (!current) return null

  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>{idx + 1} / {queue.length}</span>
        <span>✅ {score}</span>
      </div>

      <div className="bg-white rounded-3xl border-4 border-gray-200 p-6 text-center mb-6 shadow-md">
        <button onClick={() => speak(ttsFor(current.word))} className="text-8xl mb-4 hover:scale-110 active:scale-90 transition-transform cursor-pointer select-none block w-full">
          {current.emoji}
        </button>
        <div className="flex items-center justify-center gap-1 text-4xl font-display font-black text-gray-700">
          <span className={`
            w-12 h-12 rounded-xl border-4 flex items-center justify-center text-2xl
            ${correct ? 'bg-green-100 border-green-400 text-green-700' : 'border-dashed border-gray-300 text-gray-300'}
          `}>
            {correct ? current.consonantStart : '_'}
          </span>
          <span>{current.vowel}{current.consonantEnd}</span>
        </div>
      </div>

      {/* Letter options */}
      <div className="grid grid-cols-4 gap-3">
        {options.map(letter => {
          const group = getGroup(letter)
          const isWrong = wrong === letter
          const isCorrect = correct === letter
          return (
            <button
              key={letter}
              onClick={() => handleTap(letter)}
              className={`
                h-14 rounded-2xl border-4 font-display font-black text-2xl
                transition-all duration-150 active:scale-90 cursor-pointer select-none
                ${isCorrect ? 'bg-green-100 border-green-400 text-green-700 scale-110' : ''}
                ${isWrong ? 'bg-red-100 border-red-400 text-red-600 shake' : ''}
                ${!isCorrect && !isWrong
                  ? `${group?.bgColor ?? 'bg-gray-100'} ${group?.borderColor ?? 'border-gray-300'} ${group?.textColor ?? 'text-gray-700'} hover:scale-105 active:scale-95`
                  : ''}
              `}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* Item 7: inline instruction below exercise */}
      <p className="text-center text-base text-gray-600 font-bold mt-4" dir="rtl">
        {INSTRUCTION}
      </p>
    </div>
  )
}

export default function C3Page() {
  return (
    <ExerciseShell
      title="Beginning Sound"
      hebrewInstruction={INSTRUCTION}
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c3"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C3Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
