'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ExerciseShell } from '@/components/step1/ExerciseShell'
import { LETTER_GROUPS } from '@/data/step1/letterGroups'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface Bubble {
  letter: string
  x: number   // %
  y: number   // %
  size: number
  floatIdx: number
  delay: number
  popped: boolean
}

export default function Ex2Page({ params }: { params: { groupId: string } }) {
  const { groupId } = params
  const group = LETTER_GROUPS.find(g => g.id === groupId)
  const speak = useSpeak()

  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [targetIdx, setTargetIdx] = useState(0)
  const [targetQueue, setTargetQueue] = useState<string[]>([])
  const [wrongId, setWrongId] = useState<string | null>(null)
  const autoPlayed = useRef(false)

  useEffect(() => {
    if (!group) return
    const shuffled = shuffle([...group.letters])
    setTargetQueue(shuffled)
    setTargetIdx(0)
    setBubbles(group.letters.map((letter, i) => ({
      letter,
      x: 8 + (i * (84 / Math.max(group.letters.length - 1, 1))),
      y: 15 + ((i % 3) * 25),
      size: 80 + (i % 3) * 12,
      floatIdx: i % 6,
      delay: i * 0.4,
      popped: false,
    })))
    autoPlayed.current = false
  }, [group])

  // Auto-play first letter
  useEffect(() => {
    if (targetQueue.length > 0 && !autoPlayed.current) {
      autoPlayed.current = true
      setTimeout(() => speak(targetQueue[0], 0.8, 1.2), 600)
    }
  }, [targetQueue, speak])

  const currentTarget = targetQueue[targetIdx] ?? ''
  const remaining = bubbles.filter(b => !b.popped)
  const allPopped = remaining.length === 0 && bubbles.length > 0

  const handleBubbleTap = useCallback((letter: string) => {
    if (allPopped || !currentTarget) return
    if (letter === currentTarget) {
      setBubbles(prev => prev.map(b => b.letter === letter ? { ...b, popped: true } : b))
      const nextIdx = targetIdx + 1
      if (nextIdx < targetQueue.length) {
        setTargetIdx(nextIdx)
        setTimeout(() => speak(targetQueue[nextIdx], 0.8, 1.2), 300)
      }
    } else {
      setWrongId(letter)
      setTimeout(() => setWrongId(null), 500)
    }
  }, [currentTarget, targetIdx, targetQueue, allPopped, speak])

  if (!group) return <div className="p-8 text-center">Group not found</div>

  return (
    <ExerciseShell
      title="Bubble Pop"
      hebrewInstruction="לחץ על 🔊 כדי לשמוע — פוצץ את הבועה הנכונה!"
      backHref={`/step1/track-a/${groupId}`}
      track="A"
      groupId={groupId}
      exerciseId="ex2"
      groupColor={group.color}
    >
      {(onComplete) => {
        if (allPopped && bubbles.length > 0) {
          setTimeout(onComplete, 400)
        }
        return (
          <div className="p-4 max-w-lg mx-auto">
            {/* Bubble arena */}
            <div
              className="relative bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-4 border-blue-200 overflow-hidden mb-6"
              style={{ height: '280px' }}
            >
              {bubbles.map(bubble => {
                const isWrong = wrongId === bubble.letter
                return (
                  <button
                    key={bubble.letter}
                    onClick={() => handleBubbleTap(bubble.letter)}
                    disabled={bubble.popped}
                    className={`
                      absolute rounded-full border-4 font-display font-black
                      flex flex-col items-center justify-center
                      transition-all duration-300 cursor-pointer select-none
                      ${bubble.popped ? 'opacity-0 scale-150 pointer-events-none' : ''}
                      ${isWrong ? 'bg-red-200 border-red-400 scale-110' : ''}
                      ${!bubble.popped && !isWrong ? 'bg-blue-50/90 border-blue-300 hover:scale-110 active:scale-90 hover:border-purple-400 hover:bg-purple-50' : ''}
                    `}
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      animation: bubble.popped || isWrong
                        ? 'none'
                        : `bubble-float-${bubble.floatIdx} ${5 + bubble.floatIdx * 1.1}s ease-in-out ${bubble.delay}s infinite`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <span className="text-2xl font-black leading-none">{bubble.letter.toUpperCase()}</span>
                    <span className="text-base font-bold leading-none opacity-70">{bubble.letter}</span>
                  </button>
                )
              })}

              {allPopped && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl bounce-in">🎉</span>
                </div>
              )}
            </div>

            {/* Voice button */}
            {!allPopped && (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => speak(currentTarget, 0.8, 1.2)}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-4xl
                             shadow-lg hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer select-none
                             flex items-center justify-center"
                  aria-label="Hear letter name"
                >
                  🔊
                </button>
                <p className="text-sm font-bold text-gray-400" dir="rtl">לחץ כדי לשמוע — פוצץ את הבועה!</p>
                <p className="text-xs text-gray-300 font-bold">
                  {remaining.length} bubbles left
                </p>
              </div>
            )}
          </div>
        )
      }}
    </ExerciseShell>
  )
}
