'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

type Prep = 'in' | 'on' | 'under' | 'next to'

interface PrepScene {
  object: string   // small/moving object emoji
  reference: string // reference/container emoji
  prep: Prep
  options: Prep[]  // always 3
}

const ALL_SCENES: PrepScene[] = [
  { object: '🐱', reference: '⚽',  prep: 'on',      options: ['on', 'in', 'next to'] },
  { object: '🎒', reference: '🛏️', prep: 'under',   options: ['under', 'on', 'next to'] },
  { object: '🍎', reference: '📦',  prep: 'in',      options: ['in', 'on', 'under'] },
  { object: '🐶', reference: '🌳',  prep: 'next to', options: ['next to', 'on', 'under'] },
  { object: '⚽', reference: '🪑',  prep: 'on',      options: ['on', 'under', 'in'] },
  { object: '🐱', reference: '🪑',  prep: 'under',   options: ['under', 'on', 'in'] },
  { object: '🐠', reference: '🪣',  prep: 'in',      options: ['in', 'on', 'next to'] },
  { object: '🎩', reference: '👦',  prep: 'on',      options: ['on', 'under', 'next to'] },
  { object: '🐦', reference: '🌿',  prep: 'on',      options: ['on', 'in', 'next to'] },
  { object: '⚽', reference: '🛏️', prep: 'under',   options: ['under', 'in', 'on'] },
  { object: '🎒', reference: '🚪',  prep: 'next to', options: ['next to', 'in', 'on'] },
  { object: '🐱', reference: '📦',  prep: 'in',      options: ['in', 'under', 'next to'] },
  { object: '🐶', reference: '🐱',  prep: 'next to', options: ['next to', 'on', 'under'] },
  { object: '🌸', reference: '🫙',  prep: 'in',      options: ['in', 'on', 'next to'] },
  { object: '⚽', reference: '📚',  prep: 'on',      options: ['on', 'under', 'in'] },
  { object: '👟', reference: '🛏️', prep: 'under',   options: ['under', 'next to', 'on'] },
  { object: '☕', reference: '🪑',  prep: 'on',      options: ['on', 'in', 'under'] },
  { object: '📚', reference: '✏️',  prep: 'next to', options: ['next to', 'on', 'under'] },
  { object: '☂️', reference: '🫙',  prep: 'in',      options: ['in', 'on', 'next to'] },
  { object: '🍌', reference: '🪣',  prep: 'in',      options: ['in', 'under', 'next to'] },
]

// Positions of the object relative to the reference inside a 100×100 box
const OBJECT_POS: Record<Prep, { top: string; left: string }> = {
  'in':      { top: '35%', left: '50%' },
  'on':      { top: '-5%', left: '50%' },
  'under':   { top: '85%', left: '50%' },
  'next to': { top: '35%', left: '95%' },
}

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
        <p className="font-bold text-black text-lg mb-2" dir="rtl">כל הכבוד!</p>
        <p className="text-black font-bold text-base mb-6">{score}/{ALL_SCENES.length} correct!</p>
        <button onClick={handleAgain} className="btn-kid bg-blue-500">
          🔁 Again
        </button>
      </div>
    )
  }

  if (!current) return null
  const objPos = OBJECT_POS[current.prep]

  return (
    <div key={resetKey} className="p-4 max-w-sm mx-auto">
      <div className="flex justify-between text-sm font-bold text-black mb-4">
        <span>{idx + 1}/{ALL_SCENES.length}</span>
        <span>✅ {score}</span>
      </div>

      {/* Scene illustration */}
      <div className="flex justify-center mb-6">
        <div className="relative" style={{ width: 120, height: 100 }}>
          {/* Reference object */}
          <div
            className="absolute text-8xl"
            style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {current.reference}
          </div>
          {/* Moving object */}
          <div
            className="absolute text-6xl transition-all duration-300"
            style={{
              top: objPos.top,
              left: objPos.left,
              transform: 'translate(-50%, -50%)',
              zIndex: current.prep === 'in' ? 0 : 10,
            }}
          >
            {current.object}
          </div>
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
