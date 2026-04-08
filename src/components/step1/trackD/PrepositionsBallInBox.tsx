'use client'
import { useState } from 'react'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

type Prep = 'in' | 'on' | 'under' | 'next to'

interface PrepRound { prep: Prep; label: string }

const ROUNDS: PrepRound[] = [
  { prep: 'in', label: 'in' },
  { prep: 'on', label: 'on' },
  { prep: 'under', label: 'under' },
  { prep: 'next to', label: 'next to' },
]

// Position config for ball relative to box
const POSITIONS: Record<Prep, { top: string; left: string; label: string }> = {
  in:       { top: '38%',  left: '45%',  label: 'inside the box' },
  on:       { top: '-12%', left: '45%',  label: 'on top of the box' },
  under:    { top: '88%',  left: '45%',  label: 'under the box' },
  'next to':{ top: '35%',  left: '95%',  label: 'next to the box' },
}

interface Props { onComplete: () => void }

export function PrepositionsBallInBox({ onComplete }: Props) {
  const speak = useSpeak()
  const [rounds] = useState<PrepRound[]>(() => shuffle([...ROUNDS]))
  const [idx, setIdx] = useState(0)
  const [ballPos, setBallPos] = useState<Prep | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [wrong, setWrong] = useState(false)

  const current = rounds[idx]

  function announce() {
    if (!current) return
    speak(current.label, 0.85)
  }

  function handlePlaceBall(pos: Prep) {
    if (!current || done) return
    setBallPos(pos)
    if (pos === current.prep) {
      setTimeout(() => {
        const newScore = score + 1
        setScore(newScore)
        setBallPos(null)
        const nextIdx = idx + 1
        if (nextIdx >= rounds.length) {
          setDone(true)
          setTimeout(onComplete, 800)
        } else {
          setIdx(nextIdx)
          setTimeout(() => speak(rounds[nextIdx].label, 0.85), 400)
        }
      }, 600)
    } else {
      setWrong(true)
      setTimeout(() => {
        setWrong(false)
        setBallPos(null)
      }, 600)
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <div className="text-white/60 text-sm font-bold mb-3">
        {score}/{rounds.length} ✓
      </div>

      {/* Box scene */}
      <div className="relative flex items-center justify-center mb-6" style={{ height: '160px' }}>
        {/* Box */}
        <div className="text-7xl relative z-0">📦</div>

        {/* Ball (positioned relative to box) */}
        {ballPos && (
          <div
            className={`absolute text-3xl transition-all duration-300 z-10 ${wrong ? 'shake' : ''}`}
            style={{
              top: POSITIONS[ballPos].top,
              left: POSITIONS[ballPos].left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            ⚽
          </div>
        )}
      </div>

      {/* Speaker */}
      {!done && current && (
        <div className="flex justify-center mb-4">
          <button
            onClick={announce}
            className="w-16 h-16 rounded-full bg-white/20 border-4 border-white/50 text-3xl
                       hover:bg-white/30 active:scale-90 transition-all cursor-pointer select-none
                       flex items-center justify-center"
          >
            🔊
          </button>
        </div>
      )}

      {/* Position buttons */}
      {!done && (
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(POSITIONS) as Prep[]).map(pos => (
            <button
              key={pos}
              onClick={() => handlePlaceBall(pos)}
              className={`
                py-3 rounded-xl border-4 font-bold text-sm
                transition-all duration-150 cursor-pointer select-none
                ${ballPos === pos && wrong ? 'bg-red-200 border-red-400 text-red-900' : ''}
                ${ballPos === pos && !wrong ? 'bg-green-200 border-green-400 text-green-900' : ''}
                ${ballPos !== pos ? 'bg-white/20 border-white/50 text-white hover:bg-white/30' : ''}
              `}
            >
              {pos}
            </button>
          ))}
        </div>
      )}

      {done && (
        <div className="mt-4">
          <span className="text-5xl bounce-in">🎉</span>
        </div>
      )}
    </div>
  )
}
