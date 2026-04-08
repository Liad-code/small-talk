'use client'
import { useState, useCallback } from 'react'
import { TrackDItem } from '@/data/step1/trackDCategories'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface Props {
  items: TrackDItem[]
  onComplete: () => void
}

export function FruitsBasket({ items, onComplete }: Props) {
  const speak = useSpeak()
  const [queue, setQueue] = useState<TrackDItem[]>(() => shuffle([...items]))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [basketItems, setBasketItems] = useState<TrackDItem[]>([])
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
      const newBasket = [...basketItems, item]
      setBasketItems(newBasket)
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

  const basketedWords = new Set(basketItems.map(i => i.word))

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <div className="text-white/60 text-sm font-bold mb-3">
        {basketItems.length}/{queue.length}
      </div>

      {/* Basket */}
      <div className="relative inline-block mb-4">
        <div className="text-8xl">🧺</div>
        <div className="absolute bottom-1 left-0 right-0 flex justify-center flex-wrap gap-1">
          {basketItems.slice(-4).map(item => (
            <span key={item.word} className="text-lg">{item.emoji}</span>
          ))}
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

      {/* Fruit options */}
      {!done && (
        <div className="flex flex-wrap justify-center gap-3">
          {items.map(item => {
            const isBasketed = basketedWords.has(item.word)
            const isWrong = wrongId === item.word
            return (
              <button
                key={item.word}
                onClick={() => !isBasketed && handleItemClick(item)}
                disabled={isBasketed}
                className={`
                  w-16 h-16 rounded-2xl border-4 text-3xl
                  flex items-center justify-center
                  transition-all duration-150 cursor-pointer select-none
                  ${isBasketed ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/20' : ''}
                  ${isWrong ? 'bg-red-200 border-red-400 shake scale-110' : ''}
                  ${!isBasketed && !isWrong ? 'bg-white/20 border-white/50 hover:scale-110 active:scale-90 hover:bg-white/30' : ''}
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
