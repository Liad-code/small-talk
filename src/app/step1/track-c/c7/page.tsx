'use client'
import { useState, useEffect } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { CVC_WORDS, VOWEL_COLORS } from '@/data/step1/cvcWords'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

// Circle Correct Image: show word, two image options, tap correct one
export default function C7Page() {
  const speak = useSpeak()
  const [queue] = useState(() => shuffle([...CVC_WORDS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<typeof CVC_WORDS>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [correct, setCorrect] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const current = queue[idx]


  useEffect(() => {
    if (!current) return
    const others = CVC_WORDS.filter(w => w.word !== current.word)
    const distractor = shuffle(others)[0]
    setOptions(shuffle([current, distractor]))
    setCorrect(null)
    setWrong(null)
    setTimeout(() => speak(current.word), 300)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  function handleTap(word: string, onComplete: () => void) {
    if (!current || correct) return
    if (word === current.word) {
      setCorrect(word)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        if (idx + 1 >= queue.length) onComplete()
        else setIdx(i => i + 1)
      }, 600)
    } else {
      setWrong(word)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (!current) return null
  const vc = VOWEL_COLORS[current.vowel]

  return (
    <ExerciseShell
      title="Circle the Image"
      hebrewInstruction="לחץ על התמונה הנכונה למילה"
      backHref="/step1/track-c"
      track="C"
      groupId="c"
      exerciseId="c7"
      groupColor="from-green-400 to-emerald-500"
    >
      {(onComplete) => (
        <div className="p-4 max-w-sm mx-auto text-center">
          <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
            <span>{idx + 1} / {queue.length}</span>
            <span>✅ {score}</span>
          </div>

          {/* Word */}
          <button
            onClick={() => speak(current.word)}
            className={`
              inline-flex items-center gap-3 px-8 py-4 rounded-3xl border-4 ${vc.border} ${vc.bg} mb-8
              font-display font-black text-4xl ${vc.text}
              hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none shadow-md
            `}
          >
            🔊 {current.word}
          </button>

          {/* Two image options */}
          <div className="flex gap-6 justify-center">
            {options.map(opt => {
              const isWrong = wrong === opt.word
              const isCorrect = correct === opt.word
              return (
                <button
                  key={opt.word}
                  onClick={() => handleTap(opt.word, onComplete)}
                  className={`
                    w-36 h-36 rounded-3xl border-4 text-7xl
                    flex items-center justify-center
                    transition-all duration-150 cursor-pointer select-none shadow-md
                    ${isCorrect ? 'border-green-400 bg-green-100 scale-110' : ''}
                    ${isWrong ? 'border-red-400 bg-red-100 shake' : ''}
                    ${!isCorrect && !isWrong ? 'border-gray-200 bg-white hover:scale-105 active:scale-95 hover:border-purple-400' : ''}
                  `}
                >
                  {opt.emoji}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </ExerciseShell>
  )
}
