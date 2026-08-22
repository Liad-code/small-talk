'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { StarOnComplete } from '@/components/shared/StarOnComplete'
import { BUILD_ROUNDS, type BuildSentence } from '@/data/step2/building-a-sentence'
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

function BuildExercise({
  sentences,
  onComplete,
}: {
  sentences: BuildSentence[]
  onComplete: () => void
}) {
  const [queue] = useState(() => shuffle([...sentences]))
  const [idx, setIdx] = useState(0)
  const [tiles, setTiles] = useState<string[]>([])   // scrambled word tiles for current sentence
  const [placed, setPlaced] = useState<number[]>([]) // tile indices, in the order tapped
  const [wrong, setWrong] = useState(false)          // transient shake on the 1st wrong order
  const [correct, setCorrect] = useState(false)
  const [revealed, setRevealed] = useState(false)    // 2nd wrong order → show the answer
  const [understood, setUnderstood] = useState(false)
  const [wrongCount, setWrongCount] = useState(0)
  const [score, setScore] = useState(0)

  const sentence = queue[idx]
  const words = sentence.text.split(' ')
  const accepted = [sentence.text, ...(sentence.accept ?? [])]

  useEffect(() => {
    setTiles(scrambleWords(sentence.text.split(' ')))
    setPlaced([])
    setWrong(false)
    setCorrect(false)
    setRevealed(false)
    setUnderstood(false)
    setWrongCount(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  const advance = () => {
    if (idx + 1 >= queue.length) onComplete()
    else setIdx(i => i + 1)
  }

  function handleTileTap(tileIdx: number) {
    if (correct || revealed || placed.includes(tileIdx)) return
    const next = [...placed, tileIdx]
    setPlaced(next)

    if (next.length === words.length) {
      const joined = next.map(i => tiles[i]).join(' ')
      if (accepted.includes(joined)) {
        setCorrect(true)
        setTimeout(() => {
          setScore(s => s + 1)
          advance()
        }, 900)
      } else {
        const nextWrong = wrongCount + 1
        setWrongCount(nextWrong)
        if (nextWrong >= 2) {
          // Second wrong full order: reveal the correct order and require the
          // student to tick "הבנתי" before moving on.
          setRevealed(true)
        } else {
          setWrong(true)
          setTimeout(() => {
            setPlaced([])
            setWrong(false)
          }, 700)
        }
      }
    }
  }

  // Tap the last filled slot to undo the most recently placed word.
  function handleSlotTap() {
    if (correct || revealed || placed.length === 0) return
    setPlaced(prev => prev.slice(0, -1))
    setWrong(false)
  }

  const acknowledge = () => {
    if (understood) return
    setUnderstood(true)
    setTimeout(advance, 450)
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
          // When revealed, show the correct word for this slot instead.
          const word = revealed ? words[i] : (filled ? tiles[tileIdx] : '')
          const isLastFilled = filled && i === placed.length - 1
          const showGreen = correct || revealed
          return (
            <button
              key={i}
              onClick={isLastFilled && !revealed ? handleSlotTap : undefined}
              disabled={!isLastFilled || revealed}
              className={`
                min-w-[64px] h-12 px-3 rounded-xl border-4 flex items-center justify-center
                font-display font-black text-xl transition-all duration-150 select-none
                ${showGreen ? 'bg-teal-500 border-teal-600 text-white' + (correct ? ' scale-105' : '') : ''}
                ${wrong ? 'bg-red-100 border-red-400 text-red-700 shake' : ''}
                ${!showGreen && !wrong ? (filled
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
              disabled={used || correct || revealed}
              className={`
                min-w-[64px] h-14 px-4 rounded-2xl border-4 font-display font-black text-xl
                transition-all duration-150 select-none
                ${used || revealed
                  ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400'
                  : 'bg-teal-100 border-teal-300 text-teal-800 cursor-pointer hover:scale-110 active:scale-90'}
              `}
            >
              {word}
            </button>
          )
        })}
      </div>

      {/* Reveal message + "הבנתי" checkbox after 2 wrong tries */}
      {revealed && (
        <div className="mt-6 bounce-in">
          <p className="font-bold text-teal-600 text-base mb-1">✔ {sentence.text}</p>
          <p className="font-bold text-gray-500 text-sm mb-4" dir="rtl">זה הסדר הנכון של המשפט</p>
          <div className="flex justify-center">
            <button
              onClick={acknowledge}
              dir="rtl"
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-3 font-display font-black text-lg transition-all active:scale-95 ${
                understood
                  ? 'bg-teal-500 border-teal-500 text-white'
                  : 'bg-white border-teal-400 text-teal-700 hover:bg-teal-50'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex items-center justify-center w-7 h-7 rounded-md border-2 text-base font-black bg-white ${
                  understood ? 'border-white text-teal-600' : 'border-teal-400 text-transparent'
                }`}
              >
                ✓
              </span>
              הבנתי
            </button>
          </div>
        </div>
      )}

      {!revealed && (
        <p className="text-center text-base text-gray-600 font-bold mt-6" dir="rtl">
          {INSTRUCTION}
        </p>
      )}
    </div>
  )
}

export default function BuildingASentencePage() {
  const [runKey, setRunKey] = useState(0)
  const [round, setRound] = useState(0)
  const [betweenRounds, setBetweenRounds] = useState(false)
  const [finished, setFinished] = useState(false)

  const isLastRound = round === BUILD_ROUNDS.length - 1

  const restart = () => {
    setFinished(false)
    setBetweenRounds(false)
    setRound(0)
    setRunKey(k => k + 1)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">building a sentence 🧩</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">סדרו את המילים למשפט נכון</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I can run fast · The sun is yellow</p>
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
                onClick={restart}
                className="btn-kid bg-cyan-500"
              >
                🔁 Again<br /><span className="text-xs">(שוב)</span>
              </button>
            </div>
          </div>
        ) : betweenRounds ? (
          <div className="text-center py-14 px-4 bounce-in">
            <div className="text-5xl mb-3">👏</div>
            <p className="font-display font-bold text-2xl text-teal-600 mb-1">Round {round + 1} done!</p>
            <p className="font-bold text-gray-500 mb-6" dir="rtl">סבב {round + 1} הושלם — ממשיכים לסבב הבא</p>
            <button
              onClick={() => { setRound(r => r + 1); setBetweenRounds(false) }}
              className="btn-kid bg-cyan-500"
            >
              סבב הבא →
            </button>
          </div>
        ) : (
          <>
            <div className="max-w-xl mx-auto px-4 -mb-2">
              <span className="inline-block bg-teal-100 text-teal-700 font-display font-black text-sm rounded-full px-3 py-1">
                Round {round + 1} / {BUILD_ROUNDS.length}
              </span>
            </div>
            <BuildExercise
              key={`${runKey}-${round}`}
              sentences={BUILD_ROUNDS[round]}
              onComplete={() => {
                if (isLastRound) setFinished(true)
                else setBetweenRounds(true)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
