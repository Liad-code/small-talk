'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { StarOnComplete } from '@/components/shared/StarOnComplete'
import { BUILD_SENTENCES } from '@/data/step2/building-a-sentence'
import { shuffle } from '@/utils/shuffle'

const INSTRUCTION = 'סדרו את המילים לפי הסדר הנכון — לחצו על המילים לפי הסדר.'

// Shuffle a sentence's words but never return the correct order.
// Falls back gracefully if no different arrangement exists.
function scrambleWords(words: string[]): string[] {
  if (words.length <= 1) return [...words]
  const target = words.join(' ')
  let attempt = shuffle(words)
  let guard = 0
  while (attempt.join(' ') === target && guard < 50) {
    attempt = shuffle(words)
    guard++
  }
  return attempt
}

function BuildExercise({ onComplete }: { onComplete: () => void }) {
  const [queue] = useState(() => shuffle([...BUILD_SENTENCES]))
  const [idx, setIdx] = useState(0)
  const [tiles, setTiles] = useState<string[]>([])   // scrambled word tiles for current sentence
  const [placed, setPlaced] = useState<number[]>([]) // tile indices, in the order tapped
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)

  const sentence = queue[idx]
  const words = sentence.split(' ')

  useEffect(() => {
    setTiles(scrambleWords(sentence.split(' ')))
    setPlaced([])
    setWrong(false)
    setCorrect(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  function handleTileTap(tileIdx: number) {
    if (correct || placed.includes(tileIdx)) return
    const next = [...placed, tileIdx]
    setPlaced(next)

    if (next.length === words.length) {
      const joined = next.map(i => tiles[i]).join(' ')
      if (joined === sentence) {
        setCorrect(true)
        setTimeout(() => {
          setScore(s => s + 1)
          if (idx + 1 >= queue.length) onComplete()
          else setIdx(i => i + 1)
        }, 900)
      } else {
        setWrong(true)
        setTimeout(() => {
          setPlaced([])
          setWrong(false)
        }, 700)
      }
    }
  }

  // Tap a filled slot to undo the most recently placed word.
  function handleSlotTap() {
    if (correct || placed.length === 0) return
    setPlaced(prev => prev.slice(0, -1))
    setWrong(false)
  }

  return (
    <div className="p-4 max-w-xl mx-auto text-center pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span>✅ {score}</span>
      </div>

      {/* Answer slots (one per word) */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[56px]">
        {words.map((_, i) => {
          const tileIdx = placed[i]
          const filled = tileIdx !== undefined
          const word = filled ? tiles[tileIdx] : ''
          const isLastFilled = filled && i === placed.length - 1
          return (
            <button
              key={i}
              onClick={isLastFilled ? handleSlotTap : undefined}
              disabled={!isLastFilled}
              className={`
                min-w-[64px] h-12 px-3 rounded-xl border-4 flex items-center justify-center
                font-display font-black text-xl transition-all duration-150 select-none
                ${correct ? 'bg-teal-500 border-teal-600 text-white scale-105' : ''}
                ${wrong ? 'bg-red-100 border-red-400 text-red-700 shake' : ''}
                ${!correct && !wrong ? (filled
                  ? 'bg-cyan-500 border-cyan-600 text-white' + (isLastFilled ? ' cursor-pointer active:scale-90' : '')
                  : 'bg-white border-dashed border-gray-300 text-gray-200') : ''}
              `}
            >
              {word || '•'}
            </button>
          )
        })}
      </div>

      {/* Scrambled word tiles */}
      <div className="flex flex-wrap justify-center gap-3">
        {tiles.map((word, i) => {
          const used = placed.includes(i)
          return (
            <button
              key={i}
              onClick={() => handleTileTap(i)}
              disabled={used || correct}
              className={`
                min-w-[64px] h-14 px-4 rounded-2xl border-4 font-display font-black text-xl
                transition-all duration-150 select-none
                ${used
                  ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400'
                  : 'bg-teal-100 border-teal-300 text-teal-800 cursor-pointer hover:scale-110 active:scale-90'}
              `}
            >
              {word}
            </button>
          )
        })}
      </div>

      <p className="text-center text-base text-gray-600 font-bold mt-6" dir="rtl">
        {INSTRUCTION}
      </p>
    </div>
  )
}

export default function BuildingASentencePage() {
  const [runKey, setRunKey] = useState(0)
  const [finished, setFinished] = useState(false)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">building a sentence 🧩</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">סדרו את המילים למשפט נכון</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">i can run fast · the sun is yellow</p>
        </div>
      </div>

      <div className="pt-4">
        {finished ? (
          <div className="text-center py-14 px-4 bounce-in">
            <div className="text-6xl mb-4">🌟</div>
            <p className="font-display font-bold text-3xl text-teal-600 mb-1">Amazing!</p>
            <p className="font-bold text-gray-500 mb-3" dir="rtl">סיימת את כל המשפטים!</p>
            <StarOnComplete step="step2" />
            <div className="mt-6">
              <button
                onClick={() => { setFinished(false); setRunKey(k => k + 1) }}
                className="btn-kid bg-cyan-500"
              >
                🔁 Again<br /><span className="text-xs">(שוב)</span>
              </button>
            </div>
          </div>
        ) : (
          <BuildExercise key={runKey} onComplete={() => setFinished(true)} />
        )}
      </div>
    </div>
  )
}
