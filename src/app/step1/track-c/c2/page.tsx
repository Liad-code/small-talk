'use client'
import { useState, useEffect } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, VOWELS, VOWEL_COLORS, ttsFor } from '@/data/step1/cvcWords'
import { WordEmoji } from '@/components/step1/WordEmoji'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

function C2Exercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [queue] = useState(() => shuffle([...CVC_WORDS]))
  const [idx, setIdx] = useState(0)
  const [wrong, setWrong] = useState<string | null>(null)
  const [correct, setCorrect] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const current = queue[idx]

  useEffect(() => {
    if (current) setTimeout(() => speak(ttsFor(current.word)), 400)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  function handleVowelTap(vowel: string) {
    if (!current || correct) return
    if (vowel === current.vowel) {
      setCorrect(vowel)
      speak(ttsFor(current.word))
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        if (idx + 1 >= queue.length) onComplete()
        else setIdx(i => i + 1)
      }, 700)
    } else {
      setWrong(vowel)
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
        <button
          onClick={() => speak(ttsFor(current.word))}
          className="text-8xl mb-4 hover:scale-110 active:scale-90 transition-transform cursor-pointer select-none block w-full"
          aria-label={`Hear: ${current.word}`}
        >
          <WordEmoji word={current} className="text-8xl" />
        </button>
        <div className="flex items-center justify-center gap-1 text-4xl font-display font-black text-gray-700">
          <span>{current.consonantStart}</span>
          <span className={`
            w-12 h-12 rounded-xl border-4 flex items-center justify-center text-2xl
            ${correct ? `${VOWEL_COLORS[current.vowel].bg} ${VOWEL_COLORS[current.vowel].border} ${VOWEL_COLORS[current.vowel].text}` : 'border-dashed border-gray-300 text-gray-300'}
          `}>
            {correct ? current.vowel : '_'}
          </span>
          <span>{current.consonantEnd}</span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {VOWELS.map(v => {
          const vc = VOWEL_COLORS[v]
          const isWrong = wrong === v
          const isCorrect = correct === v
          return (
            <button
              key={v}
              onClick={() => handleVowelTap(v)}
              className={`
                w-14 h-14 rounded-2xl border-4 font-display font-black text-2xl
                transition-all duration-150 active:scale-90 cursor-pointer select-none
                ${isCorrect ? `${vc.bg} ${vc.border} ${vc.text} scale-110` : ''}
                ${isWrong ? 'bg-red-100 border-red-400 text-red-600 shake' : ''}
                ${!isCorrect && !isWrong ? `bg-white ${vc.border} ${vc.text} hover:${vc.bg}` : ''}
              `}
            >
              {v}
            </button>
          )
        })}
      </div>
      <p className="text-center text-base text-gray-600 font-bold mt-3" dir="rtl">
        לחץ על התמונה כדי לשמוע את המילה – לחץ על התנועה המתאימה להשלמת המילה
      </p>
    </div>
  )
}

export default function C2Page() {
  return (
    <ExerciseShell
      title="Vowel Fill"
      hebrewInstruction="לחץ על התמונה כדי לשמוע את המילה – לחץ על התנועה המתאימה להשלמת המילה"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c2"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete, resetKey) => (
        <C2Exercise key={resetKey} onComplete={onComplete} />
      )}
    </ExerciseShell>
  )
}
