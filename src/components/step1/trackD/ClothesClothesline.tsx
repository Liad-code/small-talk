'use client'
import { useState } from 'react'
import { TrackDItem } from '@/data/step1/trackDCategories'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface Props {
  items: TrackDItem[]
  onComplete: () => void
}

export function ClothesClothesline({ items, onComplete }: Props) {
  const speak = useSpeak()
  const [queue, setQueue] = useState<TrackDItem[]>(() => shuffle([...items]))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [hanged, setHanged] = useState<TrackDItem[]>([])
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const current = queue[currentIdx]

  function announce() {
    if (!current) return
    speak(current.ttsText ?? current.word, 0.85)
  }

  function handleItemClick(item: TrackDItem) {
    if (!current || done) return
    if (item.word === current.word) {
      const newHanged = [...hanged, item]
      setHanged(newHanged)
      const nextIdx = currentIdx + 1
      if (nextIdx >= queue.length) {
        setDone(true)
      } else {
        setCurrentIdx(nextIdx)
        setTimeout(() => speak(queue[nextIdx].ttsText ?? queue[nextIdx].word, 0.85), 400)
      }
    } else {
      setWrongId(item.word)
      setTimeout(() => setWrongId(null), 400)
    }
  }

  function handleAgain() {
    const newQueue = shuffle([...items])
    setQueue(newQueue)
    setCurrentIdx(0)
    setHanged([])
    setWrongId(null)
    setDone(false)
  }

  const hangedWords = new Set(hanged.map(i => i.word))

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <p className="text-black font-bold text-sm mb-2" dir="rtl">
        לחץ על הרמקול כדי לשמוע את המילה — לחץ על הבגד המתאים כדי לתלות אותו על חבל הכביסה
      </p>

      <div className="text-black font-bold text-sm mb-3">
        {hanged.length}/{queue.length}
      </div>

      {/* Clothesline */}
      <div className="relative bg-white/10 rounded-2xl border-2 border-white/30 p-4 mb-4 min-h-[100px]">
        {/* Clotheslines — split into two rows of 4 max */}
        {(() => {
          const MAX_PER_LINE = 4
          const line1 = hanged.slice(0, MAX_PER_LINE)
          const line2 = hanged.slice(MAX_PER_LINE)
          return (
            <div className="flex flex-col gap-3">
              {/* Line 1 */}
              <div className="relative min-h-[70px]">
                <div className="absolute top-4 left-0 right-0 h-1.5 bg-white rounded-full shadow" />
                <div className="flex justify-center gap-3 pt-2 mt-1">
                  {line1.map(item => (
                    <div key={item.word} className="flex flex-col items-center">
                      <div className="w-1.5 h-4 bg-amber-900 rounded-full mb-1" />
                      <span className="text-4xl">{item.emoji}</span>
                    </div>
                  ))}
                  {line1.length === 0 && (
                    <p className="text-white/30 text-sm font-bold pt-5" dir="rtl">חבל כביסה ריק...</p>
                  )}
                </div>
              </div>
              {/* Line 2 — only show when there are overflow items */}
              {line2.length > 0 && (
                <div className="relative min-h-[70px]">
                  <div className="absolute top-4 left-0 right-0 h-1.5 bg-white rounded-full shadow" />
                  <div className="flex justify-center gap-3 pt-2 mt-1">
                    {line2.map(item => (
                      <div key={item.word} className="flex flex-col items-center">
                        <div className="w-1.5 h-4 bg-amber-900 rounded-full mb-1" />
                        <span className="text-4xl">{item.emoji}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })()}
      </div>

      {/* Speaker */}
      {!done && current && (
        <div className="flex justify-center mb-4">
          <button
            onClick={announce}
            className="w-16 h-16 rounded-full bg-white/20 border-4 border-white/50 text-3xl
                       hover:bg-white/30 active:scale-90 transition-all cursor-pointer select-none
                       flex items-center justify-center"
          >
            🔊
          </button>
        </div>
      )}

      {/* Clothing items */}
      {!done && (
        <div className="flex flex-wrap justify-center gap-3">
          {items.map(item => {
            const isHanged = hangedWords.has(item.word)
            const isWrong = wrongId === item.word
            return (
              <button
                key={item.word}
                onClick={() => !isHanged && handleItemClick(item)}
                disabled={isHanged}
                className={`
                  w-24 h-24 rounded-2xl border-4 text-5xl
                  flex items-center justify-center
                  transition-all duration-150 cursor-pointer select-none
                  ${isHanged ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/20' : ''}
                  ${isWrong ? 'bg-red-200 border-red-400 shake scale-110' : ''}
                  ${!isHanged && !isWrong ? 'bg-white/20 border-white/50 hover:scale-110 active:scale-90 hover:bg-white/30' : ''}
                `}
              >
                {item.emoji}
              </button>
            )
          })}
        </div>
      )}

      {done && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <span className="text-5xl bounce-in">🎉</span>
          <button onClick={handleAgain} className="btn-kid bg-blue-500">
            🔁 Again
          </button>
        </div>
      )}
    </div>
  )
}
