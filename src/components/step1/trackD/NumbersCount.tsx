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

export function NumbersCount({ onComplete }: { onComplete: () => void }) {
  const [rows] = useState(() =>
    shuffle(COUNT_ROWS.map(r => ({ ...r, choices: makeChoices(r.count) })))
  )
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const allDone = Object.keys(answers).length === rows.length
  const score = rows.filter(r => answers[r.count] === r.count).length

  function handlePick(count: number, choice: number) {
    if (answers[count] !== undefined) return
    const next = { ...answers, [count]: choice }
    setAnswers(next)
    if (Object.keys(next).length === rows.length) onComplete()
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-black font-bold text-sm mb-4" dir="rtl">
        ספור את החפצים ולחץ על המספר הנכון
      </p>
      {allDone && (
        <div className="text-center mb-4 bounce-in">
          <div className="text-4xl mb-1">🎉</div>
          <p className="font-display font-bold text-xl text-black">{score}/{rows.length} correct!</p>
        </div>
      )}
      <div className="border-4 border-blue-500 rounded-2xl overflow-hidden bg-white shadow-lg">
        {rows.map((row, i) => {
          const ans = answers[row.count]
          const isCorrect = ans === row.count
          const isWrong = ans !== undefined && !isCorrect
          return (
            <div
              key={row.count}
              className={`flex items-center border-b-2 border-blue-200 last:border-b-0
                ${isCorrect ? 'bg-green-50' : isWrong ? 'bg-red-50' : i % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'}`}
            >
              {/* Objects column */}
              <div className="flex-1 p-2 flex flex-wrap gap-0.5 items-center border-r-2 border-blue-200 min-h-[60px] min-w-0">
                {Array.from({ length: row.count }, (_, j) => (
                  <span key={j} className="text-xl leading-none">{row.emoji}</span>
                ))}
              </div>
              {/* Number choices column */}
              <div className="flex items-center gap-2 px-3 shrink-0">
                {row.choices.map(n => (
                  <button
                    key={n}
                    onClick={() => handlePick(row.count, n)}
                    disabled={ans !== undefined}
                    className={`w-10 h-10 rounded-xl font-display font-black text-lg border-2 transition-all
                      ${ans !== undefined && n === row.count ? 'bg-green-300 border-green-600 text-green-900' : ''}
                      ${ans === n && n !== row.count ? 'bg-red-200 border-red-500 text-red-900 shake' : ''}
                      ${ans !== undefined && ans !== n ? 'opacity-30 border-gray-200 bg-gray-50 text-gray-400' : ''}
                      ${ans === undefined ? 'bg-blue-100 border-blue-400 text-blue-900 hover:bg-blue-200 hover:scale-110 active:scale-90 cursor-pointer' : ''}
                    `}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
