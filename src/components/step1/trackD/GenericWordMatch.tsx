'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'
import { TrackDItem } from '@/data/step1/trackDCategories'

interface Row { word: string; choices: string[] } // choices = item words (correct = row.word)

function buildRows(items: TrackDItem[], limit: number): Row[] {
  const pool = shuffle([...items]).slice(0, limit)
  return pool.map(item => {
    const others = items.filter(i => i.word !== item.word)
    const distractors = shuffle(others).slice(0, 2).map(i => i.word)
    return {
      word: item.word,
      choices: shuffle([item.word, ...distractors]),
    }
  })
}

interface Props {
  items: TrackDItem[]
  onComplete: () => void
  limit?: number
  /** Custom visual for choice tiles (e.g. prepositions cat-box art) — defaults to the item emoji */
  renderVisual?: (item: TrackDItem) => React.ReactNode
}

function WordMatchRound({ items, limit, renderVisual, roundIdx, totalRounds, onNext, onRestart, onDone }: {
  items: TrackDItem[]
  limit: number
  renderVisual?: (item: TrackDItem) => React.ReactNode
  roundIdx: number
  totalRounds: number
  onNext: () => void
  onRestart: () => void
  onDone: () => void
}) {
  const [rows] = useState<Row[]>(() => buildRows(items, limit))
  const itemByWord = new Map(items.map(i => [i.word, i]))
  // answers: word -> chosen word (only set when correct → locks row)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  // wrongFlash: word -> wrong word chosen (transient red flash, then cleared)
  const [wrongFlash, setWrongFlash] = useState<Record<string, string>>({})

  const allAnswered = Object.keys(answers).length === rows.length
  const score = rows.length // all locked rows are correct

  function handlePick(word: string, choice: string) {
    if (answers[word]) return
    if (wrongFlash[word]) return
    if (choice === word) {
      setAnswers(prev => ({ ...prev, [word]: choice }))
    } else {
      setWrongFlash(prev => ({ ...prev, [word]: choice }))
      setTimeout(() => {
        setWrongFlash(prev => { const n = { ...prev }; delete n[word]; return n })
      }, 600)
    }
  }

  const tileSize = renderVisual ? 'w-20 h-20' : 'w-14 h-14'
  const isFinal = roundIdx + 1 >= totalRounds

  return (
    <div className="max-w-sm mx-auto pb-16">
      <div className="flex justify-between items-center mb-1" dir="rtl">
        <p className="text-white font-bold text-sm">מצא את התמונה הנכונה לכל מילה</p>
        <span className="text-xs font-bold text-white/80">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>

      {allAnswered && (
        <div className="text-center my-4 bounce-in">
          <div className="text-3xl mb-1">🎉</div>
          <p className="font-display font-bold text-xl text-white mb-3">{score}/{rows.length} correct!</p>
          {!isFinal ? (
            <div className="flex gap-3 justify-center">
              <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיימתי)</span></button>
              <button onClick={onNext} className="btn-kid bg-amber-500">➡️ Next<br /><span className="text-xs">(סבב הבא)</span></button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              <button onClick={onRestart} className="btn-kid bg-amber-500">🔁 Again<br /><span className="text-xs">(פעם נוספת)</span></button>
              <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיימתי)</span></button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden border-4 border-amber-400 shadow-lg mt-3">
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
                {row.choices.map((choiceWord, ci) => {
                  const choiceItem = itemByWord.get(choiceWord)
                  const isChosenWrong = wrongChoice === choiceWord
                  const isCorrectChoice = choiceWord === row.word
                  return (
                    <button
                      key={ci}
                      onClick={() => handlePick(row.word, choiceWord)}
                      disabled={isDone}
                      className={`${tileSize} rounded-xl border-3 text-2xl transition-all cursor-pointer flex items-center justify-center
                        ${isDone && isCorrectChoice ? 'bg-green-200 border-green-500 scale-110' : ''}
                        ${isDone && !isCorrectChoice ? 'opacity-30 border-gray-200 bg-gray-50' : ''}
                        ${!isDone && isChosenWrong ? 'bg-red-200 border-red-400 shake' : ''}
                        ${!isDone && !isChosenWrong ? 'bg-amber-50 border-amber-300 hover:bg-amber-100 hover:scale-110 active:scale-90' : ''}
                      `}
                      style={{ border: '3px solid' }}
                    >
                      {choiceItem ? (renderVisual ? renderVisual(choiceItem) : choiceItem.emoji) : choiceWord}
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

export function GenericWordMatch({ items, onComplete, limit = 6, renderVisual }: Props) {
  const totalRounds = 3
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)

  return (
    <WordMatchRound
      key={`${round}-${k}`}
      items={items}
      limit={limit}
      renderVisual={renderVisual}
      roundIdx={round}
      totalRounds={totalRounds}
      onNext={() => setRound(r => r + 1)}
      onRestart={() => { setRound(0); setK(n => n + 1) }}
      onDone={onComplete}
    />
  )
}
