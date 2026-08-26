'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'
import { TrackDItem } from '@/data/step1/trackDCategories'

interface SpyItem { id: string; name: string; emoji: string; count: number }

function randCount() { return 2 + Math.floor(Math.random() * 4) } // 2..5

function buildRounds(items: TrackDItem[]): SpyItem[][] {
  const rounds: SpyItem[][] = []
  for (let r = 0; r < 2; r++) {
    const picked = shuffle([...items]).slice(0, Math.min(6, items.length))
    rounds.push(picked.map((it, i) => ({
      id: `${it.word}-r${r}-${i}`,
      name: it.word,
      emoji: it.emoji,
      count: randCount(),
    })))
  }
  return rounds
}

function ISpyRound({ items, roundIdx, totalRounds, onNext, onRestart, onDone, instruction }: {
  items: SpyItem[]
  roundIdx: number
  totalRounds: number
  onNext: () => void
  onRestart: () => void
  onDone: () => void
  instruction: string
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
            <div className="flex gap-3 justify-center">
              <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיימתי)</span></button>
              <button onClick={onNext} className="btn-kid bg-yellow-500">➡️ Next<br /><span className="text-xs">(סבב הבא)</span></button>
            </div>
          </>
        ) : (
          <>
            <p className="font-display font-bold text-xl text-white mb-4" dir="rtl">כל הכבוד! מצאת הכל!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={onRestart} className="btn-kid bg-yellow-500">🔁 Again<br /><span className="text-xs">(פעם נוספת)</span></button>
              <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיימתי)</span></button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between items-center mb-1">
        <p className="font-display font-bold text-white text-lg">🔍 I Spy</p>
        <span className="text-xs font-bold text-white/80">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>
      <p className="font-black text-white text-lg leading-snug mb-3" dir="rtl">
        {instruction}
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
              <span className="font-display font-black text-gray-700 text-sm shrink-0">{item.name}</span>
              {isCorrect ? (
                <span className="font-display font-black text-green-600 text-lg ml-auto">✅ {item.count}</span>
              ) : (
                <div className="grid grid-cols-6 gap-1 flex-1 min-w-0">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button
                      key={n}
                      onClick={() => !f && handlePick(item.id, n)}
                      disabled={!!f}
                      className="aspect-square w-full rounded-lg border-2 border-yellow-300 bg-yellow-50 font-display font-black text-sm sm:text-base
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

const DEFAULT_INSTRUCTION = 'ספור כמה פעמים כל פריט מופיע ולחץ על המספר הנכון'

export function GenericISpy({ items, onComplete, wordOnly = false, instruction = DEFAULT_INSTRUCTION }: { items: TrackDItem[]; onComplete: () => void; wordOnly?: boolean; instruction?: string }) {
  const [rounds] = useState<SpyItem[][]>(() => buildRounds(items))
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)

  function handleNext() {
    setRound(r => r + 1)
  }

  function handleRestart() {
    setRound(0)
    setK(n => n + 1)
  }

  return (
    <ISpyRound
      key={`${round}-${k}`}
      items={rounds[round]}
      roundIdx={round}
      totalRounds={rounds.length}
      onNext={handleNext}
      onRestart={handleRestart}
      onDone={onComplete}
      instruction={instruction}
    />
  )
}
