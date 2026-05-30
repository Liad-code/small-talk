'use client'
import { useState } from 'react'
import { shuffle } from '@/utils/shuffle'

const PAIRS = [
  { id: 'big-small', left: { word: 'big',  emoji: '🐘' }, right: { word: 'small', emoji: '🐭' } },
  { id: 'hot-cold',  left: { word: 'hot',  emoji: '🔥' }, right: { word: 'cold',  emoji: '❄️' } },
  { id: 'up-down',   left: { word: 'up',   emoji: '⬆️' }, right: { word: 'down',  emoji: '⬇️' } },
  { id: 'slow-fast', left: { word: 'slow', emoji: '🐢' }, right: { word: 'fast',  emoji: '🐇' } },
]

export function OppositeMatch({ onComplete }: { onComplete: () => void }) {
  const [leftCol] = useState(() => shuffle(PAIRS.map(p => ({ id: p.id, ...p.left }))))
  const [rightCol] = useState(() => shuffle(PAIRS.map(p => ({ id: p.id, ...p.right }))))
  const [selId, setSelId] = useState<string | null>(null)
  const [selSide, setSelSide] = useState<'left' | 'right' | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function attemptMatch(leftId: string, rightId: string) {
    if (leftId === rightId) {
      const next = new Set(matched); next.add(leftId)
      setMatched(next)
      setSelId(null); setSelSide(null)
      if (next.size === PAIRS.length) { setDone(true); setTimeout(onComplete, 600) }
    } else {
      setWrongFlash(leftId + '|' + rightId)
      setTimeout(() => { setWrongFlash(null); setSelId(null); setSelSide(null) }, 600)
    }
  }

  function handleLeft(id: string) {
    if (matched.has(id)) return
    if (selSide === 'right' && selId) { attemptMatch(id, selId); return }
    if (selId === id && selSide === 'left') { setSelId(null); setSelSide(null); return }
    setSelId(id); setSelSide('left'); setWrongFlash(null)
  }

  function handleRight(id: string) {
    if (matched.has(id)) return
    if (selSide === 'left' && selId) { attemptMatch(selId, id); return }
    if (selId === id && selSide === 'right') { setSelId(null); setSelSide(null); return }
    setSelId(id); setSelSide('right'); setWrongFlash(null)
  }

  const isWrongItem = (id: string) => wrongFlash?.includes(id) ?? false

  return (
    <div className="max-w-sm mx-auto pb-16">
      <p className="text-center text-white font-bold text-sm mb-4" dir="rtl">
        לחץ על מילה משני עמודות והתאם הפכים
      </p>
      <div className="flex gap-3">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-2">
          {leftCol.map(item => {
            const isMatched = matched.has(item.id)
            const isSel = selId === item.id && selSide === 'left'
            const isWrong = isWrongItem(item.id)
            return (
              <button
                key={item.id}
                onClick={() => handleLeft(item.id)}
                disabled={isMatched}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border-4 font-display font-black text-base transition-all min-h-[56px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-800' : ''}
                  ${isSel ? 'bg-pink-300 border-pink-600 text-pink-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-400 shake' : ''}
                  ${!isMatched && !isSel && !isWrong ? 'bg-pink-100 border-pink-400 text-pink-800 hover:bg-pink-200 hover:scale-105 active:scale-95 cursor-pointer' : ''}
                `}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span>{item.word}</span>
              </button>
            )
          })}
        </div>
        {/* Right column */}
        <div className="flex-1 flex flex-col gap-2">
          {rightCol.map(item => {
            const isMatched = matched.has(item.id)
            const isSel = selId === item.id && selSide === 'right'
            const isWrong = isWrongItem(item.id)
            return (
              <button
                key={item.id}
                onClick={() => handleRight(item.id)}
                disabled={isMatched}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border-4 font-display font-black text-base transition-all min-h-[56px]
                  ${isMatched ? 'bg-green-200 border-green-500 text-green-800' : ''}
                  ${isSel ? 'bg-pink-300 border-pink-600 text-pink-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-200 border-red-400 shake' : ''}
                  ${!isMatched && !isSel && !isWrong ? 'bg-pink-100 border-pink-400 text-pink-800 hover:bg-pink-200 hover:scale-105 active:scale-95 cursor-pointer' : ''}
                `}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span>{item.word}</span>
              </button>
            )
          })}
        </div>
      </div>
      {done && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-white" dir="rtl">כל הכבוד!</p>
        </div>
      )}
    </div>
  )
}
