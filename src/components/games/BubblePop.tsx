'use client'
import { useState, useEffect, useRef } from 'react'
import type { WordItem } from '@/types'

interface Props {
  words: WordItem[]
  onScore: (score: number) => void
}

interface Bubble {
  id: number
  word: WordItem
  x: number      // % from left
  y: number      // px from top
  size: number   // px
  floatIdx: number
  delay: number  // animation delay in seconds
  zIdx: number   // z-index 1–5
  isTarget: boolean
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randF(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const TOTAL_ROUNDS = 10
const LIVES_START  = 3
const ARENA_W      = 420
const ARENA_H      = 300
const MIN_DIST     = 90   // minimum px between bubble centers

function findSpot(placed: Bubble[], size: number): { x: number; y: number } {
  const margin = 4
  const maxX = Math.max(margin, ARENA_W - size - margin)
  const maxY = Math.max(margin, ARENA_H - size - margin)

  for (let attempt = 0; attempt < 80; attempt++) {
    const xPx = rand(margin, maxX)
    const yPx = rand(margin, maxY)
    const cx  = xPx + size / 2
    const cy  = yPx + size / 2
    let ok = true
    for (const b of placed) {
      const bxPx = (b.x / 100) * ARENA_W
      const bcx  = bxPx + b.size / 2
      const bcy  = b.y  + b.size / 2
      if (Math.sqrt((cx - bcx) ** 2 + (cy - bcy) ** 2) < MIN_DIST) {
        ok = false
        break
      }
    }
    if (ok) return { x: (xPx / ARENA_W) * 100, y: yPx }
  }
  // fallback — place without overlap check rather than off-screen
  return { x: (rand(margin, maxX) / ARENA_W) * 100, y: rand(margin, maxY) }
}

export function BubblePop({ words, onScore }: Props) {
  const [score, setScore]       = useState(0)
  const [lives, setLives]       = useState(LIVES_START)
  const [round, setRound]       = useState(0)
  const [done, setDone]         = useState(false)
  const [bubbles, setBubbles]   = useState<Bubble[]>([])
  const [target, setTarget]     = useState<WordItem | null>(null)
  const [popId, setPopId]       = useState<number | null>(null)
  const [wrongId, setWrongId]   = useState<number | null>(null)
  const nextId    = useRef(0)
  const zCounter  = useRef(0)

  // Word queue — each word appears as target exactly once per cycle
  const queueRef  = useRef<WordItem[]>(shuffle([...words]))
  const qIdxRef   = useRef(0)

  function nextTarget(lastWord: WordItem | null): WordItem {
    if (qIdxRef.current >= queueRef.current.length) {
      let next = shuffle([...words])
      // prevent same word appearing twice in a row across the boundary
      if (lastWord && next[0].english === lastWord.english && words.length > 1) {
        const swapIdx = rand(1, next.length - 1);
        [next[0], next[swapIdx]] = [next[swapIdx], next[0]]
      }
      queueRef.current = next
      qIdxRef.current  = 0
    }
    return queueRef.current[qIdxRef.current++]
  }

  function spawnRound(roundNum: number, lastWord: WordItem | null) {
    const targetWord = nextTarget(lastWord)
    setTarget(targetWord)

    // Cap at 6 so bubbles reliably fit in the arena without overlap
    const count       = Math.min(5 + Math.floor(roundNum / 4), 6)
    const distractors = shuffle(words.filter(w => w.english !== targetWord.english))
    const selected    = distractors.slice(0, count - 1)
    const all         = shuffle([...selected, targetWord])

    const placed: Bubble[] = []
    for (const w of all) {
      const size     = rand(72, 90)
      const floatIdx = rand(0, 5)
      const delay    = randF(0, 3)
      const zIdx     = ((zCounter.current++) % 5) + 1
      const { x, y } = findSpot(placed, size)
      const bubble: Bubble = {
        id: nextId.current++,
        word: w,
        x, y, size, floatIdx, delay, zIdx,
        isTarget: w.english === targetWord.english,
      }
      placed.push(bubble)
    }
    setBubbles(placed)
  }

  // Start first round
  useEffect(() => {
    if (words.length > 0) spawnRound(0, null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handlePop(bubble: Bubble) {
    if (done || popId !== null || wrongId !== null) return

    if (bubble.isTarget) {
      setPopId(bubble.id)
      setTimeout(() => {
        setPopId(null)
        const newScore  = score + 10
        setScore(newScore)
        const nextRound = round + 1
        if (nextRound >= TOTAL_ROUNDS) {
          setDone(true)
          onScore(newScore)
        } else {
          setRound(nextRound)
          spawnRound(nextRound, target)
        }
      }, 350)
    } else {
      setWrongId(bubble.id)
      setTimeout(() => {
        setWrongId(null)
        const newLives = lives - 1
        setLives(newLives)
        if (newLives <= 0) {
          setDone(true)
          onScore(score)
        }
      }, 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8 bounce-in">
        <div className="text-7xl mb-3">{score >= 80 ? '🏆' : score >= 50 ? '🎉' : '🫧'}</div>
        <h3 className="text-2xl font-black text-gray-800">
          {lives > 0 ? 'You won!' : 'Game Over!'}
        </h3>
        <p className="text-xl font-bold text-primary mt-2">Score: {score} points</p>
        <button onClick={() => window.location.reload()} className="btn-kid bg-blue-400 mt-4">
          Play Again 🔄
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* HUD */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          {Array.from({ length: LIVES_START }).map((_, i) => (
            <span key={i} className={`text-2xl transition-all duration-300 ${i < lives ? '' : 'grayscale opacity-25'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-2 min-w-[110px]">
          <div className="text-xs text-blue-400 font-bold uppercase tracking-wide">Find &amp; pop</div>
          {target && (
            <div className="text-xl font-black text-blue-700 leading-tight mt-0.5">
              {target.english}
            </div>
          )}
        </div>
        <div className="bg-blue-400 text-white font-black px-4 py-2 rounded-xl text-sm">
          ⭐ {score}
          <div className="text-xs opacity-80">{round + 1}/{TOTAL_ROUNDS}</div>
        </div>
      </div>

      {/* Bubble arena */}
      <div
        className="relative bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-4 border-blue-200 overflow-hidden"
        style={{ height: '300px' }}
      >
        {bubbles.map(bubble => {
          const isPopping = popId === bubble.id
          const isWrong   = wrongId === bubble.id
          const bubbleContent = bubble.word.emoji || bubble.word.hebrew || bubble.word.english
          const isEmoji = !!bubble.word.emoji
          const contentFontSize = isEmoji
            ? Math.max(28, bubble.size * 0.42)
            : Math.max(10, bubble.size / 8)
          return (
            <button
              key={bubble.id}
              onClick={() => handlePop(bubble)}
              className={`
                absolute rounded-full border-4 font-bold flex items-center justify-center
                transition-all duration-300 cursor-pointer select-none
                ${isPopping ? 'scale-150 opacity-0 pointer-events-none' : ''}
                ${isWrong   ? 'bg-red-200 border-red-400 text-red-700 scale-110' : ''}
                ${!isPopping && !isWrong
                  ? 'bg-blue-50 border-blue-300 text-blue-700 hover:scale-110 hover:border-primary hover:bg-purple-50 active:scale-95'
                  : ''}
              `}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}px`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                fontSize: `${contentFontSize}px`,
                zIndex: bubble.zIdx,
                animation: isPopping || isWrong
                  ? 'none'
                  : `bubble-float-${bubble.floatIdx} ${5 + bubble.floatIdx * 1.2}s ease-in-out ${bubble.delay}s infinite`,
              }}
            >
              <span
                className="px-1 text-center leading-tight break-words"
                style={{ maxWidth: `${bubble.size - 10}px` }}
                dir={isEmoji ? undefined : 'rtl'}
              >
                {bubbleContent}
              </span>
            </button>
          )
        })}
      </div>

      <style>{`
        @keyframes bubble-float-0 { 0%,100%{transform:translate(0,0)}       50%{transform:translate(22px,-28px)} }
        @keyframes bubble-float-1 { 0%,100%{transform:translate(-20px,-8px)} 50%{transform:translate(25px,24px)}  }
        @keyframes bubble-float-2 { 0%,100%{transform:translate(18px,12px)}  50%{transform:translate(-24px,-26px)}}
        @keyframes bubble-float-3 { 0%,100%{transform:translate(-22px,6px)}  50%{transform:translate(20px,-30px)} }
        @keyframes bubble-float-4 { 0%,33%{transform:translate(0,0)} 33%,66%{transform:translate(-26px,-20px)} 66%,100%{transform:translate(20px,22px)} }
        @keyframes bubble-float-5 { 0%,100%{transform:translate(24px,-10px)} 50%{transform:translate(-20px,28px)} }
      `}</style>
    </div>
  )
}
