'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'
import { TrackDItem } from '@/data/step1/trackDCategories'

interface Row { word: string; correct: string; choices: string[] }

function buildRows(items: TrackDItem[]): Row[] {
  const pool = shuffle([...items]).slice(0, 6)
  return pool.map(item => {
    const others = items.filter(i => i.word !== item.word && i.emoji !== item.emoji)
    const distractors = shuffle(others).slice(0, 2).map(i => i.emoji)
    return {
      word: item.word,
      correct: item.emoji,
      choices: shuffle([item.emoji, ...distractors]),
    }
  })
}

export function GenericWordMatch({ items, onComplete }: { items: TrackDItem[]; onComplete: () => void }) {
  const [rows] = useState<Row[]>(() => buildRows(items))
  // answers: word -> correct emoji (only set when correct → locks row)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  // wrongFlash: word -> wrong emoji chosen (transient red flash, then cleared)
  const [wrongFlash, setWrongFlash] = useState<Record<string, string>>({})

  const allAnswered = Object.keys(answers).length === rows.length
  const score = rows.length // all locked rows are correct

  function handlePick(word: string, choice: string, correct: string) {
    if (answers[word]) return
    if (wrongFlash[word]) return
    if (choice === correct) {
      const next = { ...answers, [word]: choice }
      setAnswers(next)
      if (Object.keys(next).length === rows.length) setTimeout(onComplete, 400)
    } else {
      setWrongFlash(prev => ({ ...prev, [word]: choice }))
      setTimeout(() => {
        setWrongFlash(prev => { const n = { ...prev }; delete n[word]; return n })
      }, 600)
    }
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        מצא את התמונה הנכונה לכל מילה
      </p>

      {allAnswered && (
        <div className="text-center mb-4 bounce-in">
          <div className="text-3xl mb-1">🎉</div>
          <p className="font-display font-bold text-xl text-white">{score}/{rows.length} correct!</p>
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden border-4 border-amber-400 shadow-lg">
        {rows.map((row, i) => {
          const ans = answers[row.word]
          const isDone = !!ans
          const wrongChoice = wrongFlash[row.word]
          return (
            <div
              key={row.word}
              className={`flex items-center gap-2 px-3 py-3 border-b-2 border-amber-200 last:border-b-0
                ${isDone ? 'bg-green-50' : i % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}`}
            >
              {/* Word */}
              <div className="w-16 shrink-0">
                <span className="font-display font-black text-lg text-amber-800">{row.word}</span>
              </div>
              {/* Choices */}
              <div className="flex gap-2 flex-1 justify-end">
                {row.choices.map((c, ci) => {
                  const isChosenWrong = wrongChoice === c
                  const isCorrectChoice = c === row.correct
                  return (
                    <button
                      key={ci}
                      onClick={() => handlePick(row.word, c, row.correct)}
                      disabled={isDone}
                      className={`w-14 h-14 rounded-xl border-3 text-2xl transition-all cursor-pointer
                        ${isDone && isCorrectChoice ? 'bg-green-200 border-green-500 scale-110' : ''}
                        ${isDone && !isCorrectChoice ? 'opacity-30 border-gray-200 bg-gray-50' : ''}
                        ${!isDone && isChosenWrong ? 'bg-red-200 border-red-400 shake' : ''}
                        ${!isDone && !isChosenWrong ? 'bg-amber-50 border-amber-300 hover:bg-amber-100 hover:scale-110 active:scale-90' : ''}
                      `}
                      style={{ border: '3px solid' }}
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
