'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'
import { CatBoxIllustration } from '@/components/shared/CatBoxIllustration'

type Prep = 'in' | 'on' | 'under' | 'next to'

interface PrepScene {
  prep: Prep       // scene drawn with CatBoxIllustration — same cat + box art as Learn
  options: Prep[]  // always 3
}

const ALL_SCENES: PrepScene[] = [
  { prep: 'in',      options: ['in', 'on', 'under'] },
  { prep: 'on',      options: ['on', 'in', 'next to'] },
  { prep: 'under',   options: ['under', 'on', 'next to'] },
  { prep: 'next to', options: ['next to', 'on', 'under'] },
  { prep: 'in',      options: ['in', 'under', 'next to'] },
  { prep: 'on',      options: ['on', 'under', 'in'] },
  { prep: 'under',   options: ['under', 'in', 'on'] },
  { prep: 'next to', options: ['next to', 'in', 'on'] },
]

interface Props { onComplete: () => void }

export function PrepCircleImage({ onComplete }: Props) {
  const speak = useSpeak()
  const [queue, setQueue] = useState<PrepScene[]>(() => shuffle([...ALL_SCENES]))
  const [idx, setIdx] = useState(0)
  const [wrong, setWrong] = useState<Prep | null>(null)
  const [correct, setCorrect] = useState<Prep | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const current = queue[idx]

  function handleTap(option: Prep) {
    if (!current || correct || done) return
    if (option === current.prep) {
      setCorrect(option)
      speak(current.prep, 0.85)
      setTimeout(() => {
        const newScore = score + 1
        setScore(newScore)
        setCorrect(null)
        const nextIdx = idx + 1
        if (nextIdx >= queue.length) {
          setDone(true)
          setTimeout(onComplete, 400)
        } else {
          setIdx(nextIdx)
        }
      }, 700)
    } else {
      setWrong(option)
      setTimeout(() => setWrong(null), 500)
    }
  }

  function handleAgain() {
    setIdx(0)
    setScore(0)
    setCorrect(null)
    setWrong(null)
    setDone(false)
    setQueue(shuffle([...ALL_SCENES]))
    setResetKey(k => k + 1)
  }

  if (done) {
    return (
      <div className="p-4 max-w-sm mx-auto text-center">
        <div className="text-5xl mb-3 bounce-in">🎉</div>
        <p className="font-bold text-white text-lg mb-2" dir="rtl">כל הכבוד!</p>
        <p className="text-white font-bold text-base mb-6">{score}/{ALL_SCENES.length} correct!</p>
        <button onClick={handleAgain} className="btn-kid bg-blue-500">
          🔁 Again
        </button>
      </div>
    )
  }

  if (!current) return null

  return (
    <div key={resetKey} className="p-4 max-w-sm mx-auto">
      <div className="flex justify-between text-sm font-bold text-white mb-4">
        <span>{idx + 1}/{ALL_SCENES.length}</span>
        <span>✅ {score}</span>
      </div>

      {/* Scene illustration — identical art to the Learn flashcards (cat + box) */}
      <div className="flex justify-center items-center mb-6" style={{ minHeight: 100 }}>
        <div className="bg-white rounded-3xl border-4 border-gray-300 p-4 shadow-md">
          <CatBoxIllustration id={current.prep === 'next to' ? 'next-to' : current.prep} large />
        </div>
      </div>

      {/* Speaker */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => speak(current.prep, 0.85)}
          className="w-14 h-14 rounded-full bg-white/20 border-4 border-white/50 text-2xl
                     hover:bg-white/30 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >
          🔊
        </button>
      </div>

      {/* 3 option buttons */}
      <div className="grid grid-cols-3 gap-2">
        {current.options.map(opt => {
          const isWrong = wrong === opt
          const isCorrect = correct === opt
          return (
            <button
              key={opt}
              onClick={() => handleTap(opt)}
              className={`
                py-3 rounded-xl border-4 font-bold text-sm
                transition-all duration-150 cursor-pointer select-none
                ${isCorrect ? 'bg-green-200 border-green-400 text-green-900 scale-110' : ''}
                ${isWrong ? 'bg-red-200 border-red-400 text-red-900 shake' : ''}
                ${!isCorrect && !isWrong ? 'bg-white/20 border-white/50 text-white hover:bg-white/30 active:scale-95' : ''}
              `}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
