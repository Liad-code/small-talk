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
  const [queue] = useState<TrackDItem[]>(() => shuffle([...items]))
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
        setTimeout(onComplete, 800)
      } else {
        setCurrentIdx(nextIdx)
        setTimeout(() => speak(queue[nextIdx].ttsText ?? queue[nextIdx].word, 0.85), 400)
      }
    } else {
      setWrongId(item.word)
      setTimeout(() => setWrongId(null), 400)
    }
  }

  const hangedWords = new Set(hanged.map(i => i.word))

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <div className="text-white/60 text-sm font-bold mb-3">
        {hanged.length}/{queue.length}
      </div>

      {/* Clothesline */}
      <div className="relative bg-white/10 rounded-2xl border-2 border-white/30 p-4 mb-4 min-h-[90px]">
        {/* The line */}
        <div className="absolute top-6 left-4 right-4 h-1 bg-white/50 rounded-full" />
        {/* Hanged items */}
        <div className="flex justify-center gap-3 pt-2">
          {hanged.map((item, i) => (
            <div key={item.word} className="flex flex-col items-center">
              {/* Pin */}
              <div className="w-1.5 h-4 bg-white/60 rounded-full mb-1" />
              <span className="text-3xl">{item.emoji}</span>
            </div>
          ))}
          {hanged.length === 0 && (
            <p className="text-white/30 text-sm font-bold pt-4" dir="rtl">חבל כביסה ריק...</p>
          )}
        </div>
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
                  w-16 h-16 rounded-2xl border-4 text-3xl
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
        <div className="mt-4">
          <span className="text-5xl bounce-in">🎉</span>
        </div>
      )}
    </div>
  )
}
