'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'

const SENSES_ROWS = [
  { word: 'see',   correct: '👁️', distractors: ['👃', '👂'] },
  { word: 'smell', correct: '👃', distractors: ['👁️', '👅'] },
  { word: 'hear',  correct: '👂', distractors: ['👁️', '🤚'] },
  { word: 'taste', correct: '👅', distractors: ['👃', '👂'] },
  { word: 'touch', correct: '🤚', distractors: ['👅', '👁️'] },
]

export function SensesWordMatch({ onComplete }: { onComplete: () => void }) {
  const [rows] = useState(() =>
    SENSES_ROWS.map(r => ({ ...r, choices: shuffle([r.correct, ...r.distractors]) }))
  )
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const allAnswered = Object.keys(answers).length === rows.length
  const score = rows.filter(r => answers[r.word] === r.correct).length

  function handlePick(word: string, choice: string) {
    if (answers[word]) return
    const next = { ...answers, [word]: choice }
    setAnswers(next)
    if (Object.keys(next).length === rows.length) setTimeout(onComplete, 400)
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        מצא את התמונה הנכונה לכל חוש
      </p>

      {allAnswered && (
        <div className="text-center mb-4 bounce-in">
          <div className="text-3xl mb-1">🎉</div>
          <p className="font-display font-bold text-xl text-white">{score}/{rows.length} correct!</p>
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden border-4 border-teal-400 shadow-lg">
        {rows.map((row, i) => {
          const ans = answers[row.word]
          const isDone = !!ans
          return (
            <div
              key={row.word}
              className={`flex items-center gap-2 px-3 py-3 border-b-2 border-teal-200 last:border-b-0
                ${isDone && ans === row.correct ? 'bg-green-50' : isDone ? 'bg-red-50' : i % 2 === 0 ? 'bg-white' : 'bg-teal-50/30'}`}
            >
              <div className="w-16 shrink-0">
                <span className="font-display font-black text-lg text-teal-800">{row.word}</span>
              </div>
              <div className="flex gap-2 flex-1 justify-end">
                {row.choices.map((c, ci) => {
                  const isChosen = ans === c
                  const isCorrectChoice = c === row.correct
                  return (
                    <button
                      key={ci}
                      onClick={() => handlePick(row.word, c)}
                      disabled={isDone}
                      className={`w-14 h-14 rounded-xl text-2xl transition-all cursor-pointer
                        ${isDone && isChosen && isCorrectChoice ? 'bg-green-200 border-4 border-green-500 scale-110' : ''}
                        ${isDone && isChosen && !isCorrectChoice ? 'bg-red-200 border-4 border-red-400 shake' : ''}
                        ${isDone && !isChosen && isCorrectChoice && ans !== row.correct ? 'bg-green-100 border-4 border-green-400 opacity-60' : ''}
                        ${isDone && !isChosen && (!isCorrectChoice || ans === row.correct) ? 'opacity-30 border-4 border-gray-200 bg-gray-50' : ''}
                        ${!isDone ? 'bg-teal-50 border-4 border-teal-300 hover:bg-teal-100 hover:scale-110 active:scale-90' : ''}
                      `}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
