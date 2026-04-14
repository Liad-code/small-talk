'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { TrackDItem } from '@/data/step1/trackDCategories'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface Bubble {
  item: TrackDItem
  x: number
  y: number
  size: number
  floatIdx: number
  delay: number
  popped: boolean
}

function playBubblePopSound() {
  if (typeof window === 'undefined') return
  try {
    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.start(); osc.stop(ctx.currentTime + 0.2)
    setTimeout(() => ctx.close().catch(() => {}), 300)
  } catch { /* audio unavailable */ }
}

interface Props {
  items: TrackDItem[]
  onComplete: () => void
}

export function VocabBubblePop({ items, onComplete }: Props) {
  const speak = useSpeak()
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [targetIdx, setTargetIdx] = useState(0)
  const [targetQueue, setTargetQueue] = useState<TrackDItem[]>([])
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [popping, setPopping] = useState<Set<string>>(new Set())
  const [gameStarted, setGameStarted] = useState(false)
  const popTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => { popTimers.current.forEach(clearTimeout) }, [])

  function initGame(itemsList: TrackDItem[]) {
    const shuffled = shuffle([...itemsList])
    setTargetQueue(shuffled)
    setTargetIdx(0)
    setBubbles(itemsList.map((item, i) => ({
      item,
      x: 8 + (i * (84 / Math.max(itemsList.length - 1, 1))),
      y: 15 + ((i % 3) * 25),
      size: 88 + (i % 3) * 10,
      floatIdx: i % 6,
      delay: i * 0.5,
      popped: false,
    })))
    setPopping(new Set())
    setWrongId(null)
  }

  useEffect(() => {
    initGame(items)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  function handleStart() {
    setGameStarted(true)
    const freshQueue = shuffle([...items])
    setTargetQueue(freshQueue)
    setTargetIdx(0)
    // announce first word
    setTimeout(() => speak(freshQueue[0].ttsText ?? freshQueue[0].word, 0.8), 400)
  }

  function handleAgain() {
    initGame(items)
    setGameStarted(false)
  }

  const remaining = bubbles.filter(b => !b.popped)
  const allPopped = remaining.length === 0 && bubbles.length > 0
  const currentTarget = targetQueue[targetIdx]

  const handleBubbleTap = useCallback((word: string) => {
    if (allPopped || !currentTarget || !gameStarted) return
    if (word === currentTarget.word) {
      playBubblePopSound()
      setPopping(prev => { const s = new Set(prev); s.add(word); return s })
      const t = setTimeout(() => {
        setBubbles(prev => prev.map(b => b.item.word === word ? { ...b, popped: true } : b))
        setPopping(prev => { const s = new Set(prev); s.delete(word); return s })
        setTargetIdx(prev => {
          const nextIdx = prev + 1
          if (nextIdx < targetQueue.length) {
            setTimeout(() => speak(targetQueue[nextIdx].ttsText ?? targetQueue[nextIdx].word, 0.8), 300)
          }
          return nextIdx
        })
      }, 300)
      popTimers.current.push(t)
    } else {
      setWrongId(word)
      setTimeout(() => setWrongId(null), 500)
    }
  }, [currentTarget, allPopped, targetQueue, speak, gameStarted])

  useEffect(() => {
    if (!allPopped) return
    const t = setTimeout(onComplete, 400)
    return () => clearTimeout(t)
  }, [allPopped, onComplete])

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div
        className="relative bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-4 border-blue-200 overflow-hidden mb-6"
        style={{ height: '300px' }}
      >
        {bubbles.map(bubble => {
          const isWrong = wrongId === bubble.item.word
          const isPopping = popping.has(bubble.item.word)
          return (
            <button
              key={bubble.item.word}
              onClick={() => handleBubbleTap(bubble.item.word)}
              disabled={bubble.popped || isPopping}
              className={`
                absolute rounded-full border-4 font-display font-black
                flex flex-col items-center justify-center
                cursor-pointer select-none
                ${bubble.popped ? 'opacity-0 pointer-events-none' : ''}
                ${isPopping ? 'bubble-popping' : ''}
                ${isWrong ? 'bg-red-200 border-red-400 scale-110' : ''}
                ${!bubble.popped && !isWrong && !isPopping ? 'bg-blue-50/90 border-blue-300 hover:scale-110 active:scale-90 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300' : ''}
              `}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animation: bubble.popped || isWrong || isPopping
                  ? undefined
                  : `bubble-float-${bubble.floatIdx} ${5 + bubble.floatIdx * 1.1}s ease-in-out ${bubble.delay}s infinite`,
                transform: 'translateX(-50%)',
              }}
            >
              <span className="text-5xl leading-none">{bubble.item.emoji}</span>
            </button>
          )
        })}
        {allPopped && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl bounce-in">🎉</span>
          </div>
        )}
      </div>

      {!gameStarted && !allPopped && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-bold text-black" dir="rtl">לחץ על הרמקול להתחלת המשחק!</p>
          <button
            onClick={handleStart}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-4xl
                       shadow-lg hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer select-none
                       flex items-center justify-center"
            aria-label="Start game"
          >
            🔊
          </button>
        </div>
      )}

      {gameStarted && !allPopped && currentTarget && (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => speak(currentTarget.ttsText ?? currentTarget.word, 0.8)}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-4xl
                       shadow-lg hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer select-none
                       flex items-center justify-center"
            aria-label="Hear word"
          >
            🔊
          </button>
          <p className="text-sm font-bold text-black" dir="rtl">לחץ כדי לשמוע — פוצץ את הבועה!</p>
          <p className="text-xs text-gray-600 font-bold">{remaining.length} bubbles left</p>
        </div>
      )}

      {allPopped && (
        <div className="flex flex-col items-center gap-3 mt-2">
          <button
            onClick={handleAgain}
            className="btn-kid bg-blue-500"
          >
            🔁 Again
          </button>
        </div>
      )}
    </div>
  )
}
