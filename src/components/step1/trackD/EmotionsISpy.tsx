'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'

interface SpyItem { id: string; name: string; emoji: string; count: number }

const I_SPY_ROUNDS: SpyItem[][] = [
  [
    { id: 'happy',  name: 'happy',  emoji: '😊', count: 4 },
    { id: 'sad',    name: 'sad',    emoji: '😢', count: 3 },
    { id: 'angry',  name: 'angry',  emoji: '😠', count: 2 },
    { id: 'sleepy', name: 'sleepy', emoji: '😴', count: 5 },
  ],
  [
    { id: 'happy2',  name: 'happy',  emoji: '😊', count: 3 },
    { id: 'sad2',    name: 'sad',    emoji: '😢', count: 5 },
    { id: 'angry2',  name: 'angry',  emoji: '😠', count: 4 },
    { id: 'sleepy2', name: 'sleepy', emoji: '😴', count: 2 },
  ],
  [
    { id: 'happy3',  name: 'happy',  emoji: '😊', count: 5 },
    { id: 'sad3',    name: 'sad',    emoji: '😢', count: 2 },
    { id: 'angry3',  name: 'angry',  emoji: '😠', count: 3 },
    { id: 'sleepy3', name: 'sleepy', emoji: '😴', count: 4 },
  ],
]

function ISpyRound({ items, roundIdx, totalRounds, onNext, onRestart }: {
  items: SpyItem[]
  roundIdx: number
  totalRounds: number
  onNext: () => void
  onRestart: () => void
}) {
  const [layout] = useState(() => {
    const all: { uid: string; emoji: string }[] = []
    items.forEach(item => {
      for (let i = 0; i < item.count; i++) all.push({ uid: `${item.id}-${i}`, emoji: item.emoji })
    })
    return shuffle(all)
  })
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flash, setFlash] = useState<Record<string, 'correct' | 'wrong'>>({})
  const [done, setDone] = useState(false)

  function handlePick(id: string, count: number) {
    if (answers[id] !== undefined) return
    const item = items.find(x => x.id === id)!
    const correct = count === item.count
    setFlash(prev => ({ ...prev, [id]: correct ? 'correct' : 'wrong' }))
    setTimeout(() => {
      setFlash(prev => { const n = { ...prev }; delete n[id]; return n })
      if (correct) {
        setAnswers(prev => {
          const next = { ...prev, [id]: count }
          if (items.every(x => next[x.id] === x.count)) setDone(true)
          return next
        })
      }
      // wrong: don't save, allow retry
    }, 700)
  }

  if (done) {
    return (
      <div className="text-center py-10 bounce-in">
        <div className="text-5xl mb-4">🎉</div>
        {roundIdx + 1 < totalRounds ? (
          <>
            <p className="font-display font-bold text-xl text-white mb-4" dir="rtl">סבב {roundIdx + 1} הושלם!</p>
            <button onClick={onNext} className="btn-kid bg-yellow-500">סבב הבא →</button>
          </>
        ) : (
          <>
            <p className="font-display font-bold text-xl text-white mb-4" dir="rtl">כל הכבוד! מצאת הכל!</p>
            <button onClick={onRestart} className="btn-kid bg-yellow-500">🔁 Again</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto pb-16">
      <div className="flex justify-between items-center mb-1">
        <p className="font-display font-bold text-white text-lg">🔍 I Spy</p>
        <span className="text-xs font-bold text-white/70">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>
      <p className="font-bold text-white/70 text-xs mb-3" dir="rtl">
        ספור כמה פעמים כל רגש מופיע ולחץ על המספר הנכון
      </p>

      {/* Emoji scene */}
      <div className="bg-gradient-to-b from-sky-100 to-yellow-50 border-4 border-yellow-300 rounded-2xl p-4 mb-4">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {layout.map(cell => (
            <span key={cell.uid} className="text-3xl">{cell.emoji}</span>
          ))}
        </div>
      </div>

      {/* Answer rows */}
      <div className="flex flex-col gap-2">
        {items.map(item => {
          const answered = answers[item.id]
          const f = flash[item.id]
          const isCorrect = answered === item.count
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-4 transition-all
                ${f === 'correct' ? 'bg-green-100 border-green-400' : f === 'wrong' ? 'bg-red-100 border-red-400 shake' : isCorrect ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'}`}
            >
              <span className="font-display font-black text-gray-700 text-base flex-1">{item.name}</span>
              {isCorrect ? (
                <span className="font-display font-black text-green-600 text-lg">✅ {item.count}</span>
              ) : (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button
                      key={n}
                      onClick={() => !f && handlePick(item.id, n)}
                      disabled={!!f}
                      className="w-7 h-7 rounded-lg border-2 border-yellow-300 bg-yellow-50 font-display font-black text-sm
                                 hover:bg-yellow-200 active:scale-90 transition-all cursor-pointer disabled:opacity-50"
                    >{n}</button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function EmotionsISpy({ onComplete }: { onComplete: () => void }) {
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)

  function handleNext() {
    setRound(r => r + 1)
  }

  function handleRestart() {
    setRound(0)
    setK(n => n + 1)
    onComplete()
  }

  return (
    <ISpyRound
      key={`${round}-${k}`}
      items={I_SPY_ROUNDS[round]}
      roundIdx={round}
      totalRounds={I_SPY_ROUNDS.length}
      onNext={handleNext}
      onRestart={handleRestart}
    />
  )
}
