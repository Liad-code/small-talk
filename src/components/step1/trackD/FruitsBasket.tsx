'use client'
import { useState, useCallback } from 'react'
import { TrackDItem } from '@/data/step1/trackDCategories'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface Props {
  items: TrackDItem[]
  onComplete: () => void
}

export function FruitsBasket({ items, onComplete }: Props) {
  const speak = useSpeak()
  const [queue] = useState<TrackDItem[]>(() => shuffle([...items]))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [basketItems, setBasketItems] = useState<TrackDItem[]>([])
  const [done, setDone] = useState(false)

  const current = queue[currentIdx]

  function announce() {
    if (!current) return
    speak(current.ttsText ?? current.word, 0.85)
  }

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const isBasket = targetEl.getAttribute('data-basket') === 'true'
    if (!isBasket) return false
    if (!current || done) return false
    if (tileId !== current.word) return false

    const newBasket = [...basketItems, current]
    setBasketItems(newBasket)
    const nextIdx = currentIdx + 1
    if (nextIdx >= queue.length) {
      setDone(true)
      setTimeout(onComplete, 800)
    } else {
      setCurrentIdx(nextIdx)
      setTimeout(() => speak(queue[nextIdx].ttsText ?? queue[nextIdx].word, 0.85), 400)
    }
    return true
  }, [current, currentIdx, queue, basketItems, done, onComplete, speak])

  const basketedWords = new Set(basketItems.map(i => i.word))

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <p className="text-black font-bold text-sm mb-3" dir="rtl">
        לחץ על הרמקול לשמיעת הפרי — גרור את הפרי הנכון לסל
      </p>

      <div className="text-black font-bold text-sm mb-3">
        {basketItems.length}/{queue.length}
      </div>

      {/* Basket — drop target */}
      <div
        data-drop-target="true"
        data-basket="true"
        data-expected-ids={current ? JSON.stringify([current.word]) : '[]'}
        data-target-id={current?.word ?? ''}
        className="relative inline-flex items-center justify-center mb-4 cursor-pointer"
        style={{ minWidth: 120, minHeight: 120 }}
      >
        <span className="text-9xl select-none">🧺</span>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center flex-wrap gap-1">
          {basketItems.slice(-4).map(item => (
            <span key={item.word} className="text-xl">{item.emoji}</span>
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

      {/* Fruit options as draggable tiles */}
      {!done && (
        <div className="flex flex-wrap justify-center gap-3">
          {items.map(item => {
            const isBasketed = basketedWords.has(item.word)
            return (
              <DraggableTile
                key={item.word}
                id={item.word}
                label={item.emoji}
                color={isBasketed ? 'bg-white/5' : 'bg-white/20'}
                borderColor={isBasketed ? 'border-white/20' : 'border-white/50'}
                textColor="text-white"
                size="md"
                disabled={isBasketed}
                onDropped={handleDrop}
              />
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
