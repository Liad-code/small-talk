'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'

const COUNT_ROWS = [
  { count: 1,  emoji: '⭐' },
  { count: 2,  emoji: '🍎' },
  { count: 3,  emoji: '🚲' },
  { count: 4,  emoji: '🌺' },
  { count: 5,  emoji: '🐟' },
  { count: 6,  emoji: '🌽' },
  { count: 7,  emoji: '🦋' },
  { count: 8,  emoji: '🎈' },
  { count: 9,  emoji: '🐸' },
  { count: 10, emoji: '❤️' },
]

function makeChoices(correct: number): number[] {
  const pool = [1,2,3,4,5,6,7,8,9,10].filter(n => n !== correct)
  return shuffle([correct, ...shuffle(pool).slice(0, 2)])
}

interface RowData { count: number; emoji: string; choices: number[] }

function CountRound({ onRoundComplete }: { onRoundComplete: () => void }) {
  const [rows] = useState<RowData[]>(() =>
    shuffle(COUNT_ROWS.map(r => ({ ...r, choices: makeChoices(r.count) })))
  )
  const [correct, setCorrect] = useState<Record<number, true>>({})
  const [wrongFlash, setWrongFlash] = useState<{ rowCount: number; wrongBtn: number } | null>(null)

  function handlePick(count: number, choice: number) {
    if (correct[count]) return
    if (wrongFlash?.rowCount === count) return
    if (choice === count) {
      const next = { ...correct, [count]: true as const }
      setCorrect(next)
      if (Object.keys(next).length === rows.length) onRoundComplete()
    } else {
      setWrongFlash({ rowCount: count, wrongBtn: choice })
      setTimeout(() => setWrongFlash(null), 600)
    }
  }

  return (
    <div className="border-4 border-blue-500 rounded-2xl overflow-hidden bg-white shadow-lg">
      {rows.map((row, i) => {
        const isDone = !!correct[row.count]
        const isRowFlashing = wrongFlash?.rowCount === row.count
        return (
          <div
            key={row.count}
            className={`flex items-center border-b-2 border-blue-200 last:border-b-0
              ${isDone ? 'bg-green-50' : isRowFlashing ? 'bg-red-50' : i % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'}`}
          >
            {/* Objects column */}
            <div className="flex-1 p-2 flex flex-wrap gap-0.5 items-center border-r-2 border-blue-200 min-h-[60px] min-w-0">
              {Array.from({ length: row.count }, (_, j) => (
                <span key={j} className="text-xl leading-none">{row.emoji}</span>
              ))}
            </div>
            {/* Number choices */}
            <div className="flex items-center gap-2 px-3 shrink-0">
              {row.choices.map(n => {
                const isWrongBtn = isRowFlashing && wrongFlash?.wrongBtn === n
                return (
                  <button
                    key={n}
                    onClick={() => handlePick(row.count, n)}
                    disabled={isDone || isRowFlashing}
                    className={`w-10 h-10 rounded-xl font-display font-black text-lg border-2 transition-all
                      ${isDone && n === row.count ? 'bg-green-300 border-green-600 text-green-900' : ''}
                      ${isDone && n !== row.count ? 'opacity-30 border-gray-200 bg-gray-50 text-gray-400' : ''}
                      ${isWrongBtn ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                      ${isRowFlashing && !isWrongBtn && !isDone ? 'opacity-50 border-gray-300 bg-gray-100 text-gray-400' : ''}
                      ${!isDone && !isRowFlashing ? 'bg-blue-100 border-blue-400 text-blue-900 hover:bg-blue-200 hover:scale-110 active:scale-90 cursor-pointer' : ''}
                    `}
                  >
                    {n}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function NumbersCount({ onComplete }: { onComplete: () => void }) {
  const [round, setRound] = useState<1 | 2>(1)
  const [round1Done, setRound1Done] = useState(false)
  const [roundKey, setRoundKey] = useState(0)

  function startRound2() {
    setRound(2)
    setRound1Done(false)
    setRoundKey(k => k + 1)
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-1" dir="rtl">
        ספור את החפצים באנגלית ובחר את המספר הנכון
      </p>
      <p className="text-center text-white/70 font-bold text-xs mb-4">
        Round {round} / 2
      </p>

      {round1Done ? (
        <div className="text-center bounce-in mb-4">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-white mb-4">Round 1 complete!</p>
          <button
            onClick={startRound2}
            className="px-6 py-3 rounded-2xl font-bold text-base border-4 border-white text-white bg-white/20 shadow-md cursor-pointer hover:bg-white/30 active:scale-95 transition-all"
          >
            Start Round 2 →
          </button>
        </div>
      ) : (
        <CountRound
          key={roundKey}
          onRoundComplete={round === 1 ? () => setRound1Done(true) : onComplete}
        />
      )}
    </div>
  )
}
