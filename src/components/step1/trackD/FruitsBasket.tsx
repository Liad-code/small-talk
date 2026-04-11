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
  const [queue, setQueue] = useState<TrackDItem[]>(() => shuffle([...items]))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [shelfItems, setShelfItems] = useState<TrackDItem[]>([])
  const [done, setDone] = useState(false)

  const current = queue[currentIdx]

  function announce() {
    if (!current) return
    speak(current.ttsText ?? current.word, 0.85)
  }

  function handleAgain() {
    const newQueue = shuffle([...items])
    setQueue(newQueue)
    setCurrentIdx(0)
    setShelfItems([])
    setDone(false)
  }

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const isShelf = targetEl.getAttribute('data-shelf') === 'true'
    if (!isShelf) return false
    if (!current || done) return false
    if (tileId !== current.word) return false

    const newShelf = [...shelfItems, current]
    setShelfItems(newShelf)
    const nextIdx = currentIdx + 1
    if (nextIdx >= queue.length) {
      setDone(true)
      setTimeout(onComplete, 800)
    } else {
      setCurrentIdx(nextIdx)
      setTimeout(() => speak(queue[nextIdx].ttsText ?? queue[nextIdx].word, 0.85), 400)
    }
    return true
  }, [current, currentIdx, queue, shelfItems, done, onComplete, speak])

  const shelfWords = new Set(shelfItems.map(i => i.word))

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <p className="text-black font-bold text-sm mb-3" dir="rtl">
        לחץ על הרמקול לשמיעת הפרי — גרור את הפרי הנכון למדף
      </p>

      <div className="text-black font-bold text-sm mb-3">
        {shelfItems.length}/{queue.length}
      </div>

      {/* Shelf — drop target */}
      <div
        data-drop-target="true"
        data-shelf="true"
        data-expected-ids={current ? JSON.stringify([current.word]) : '[]'}
        data-target-id={current?.word ?? ''}
        className="relative mb-4"
        style={{ minHeight: 90 }}
      >
        {/* Shelf board */}
        <div className="bg-amber-700 rounded-lg h-4 w-full mb-1 shadow-md" />
        {/* Items on shelf */}
        <div className="flex justify-center gap-2 min-h-[60px] items-end px-2">
          {shelfItems.map(item => (
            <span key={item.word} className="text-4xl">{item.emoji}</span>
          ))}
          {shelfItems.length === 0 && (
            <span className="text-white/30 text-sm font-bold self-center" dir="rtl">
              מדף ריק...
            </span>
          )}
        </div>
        {/* Shelf supports */}
        <div className="absolute bottom-0 left-3 w-2 h-8 bg-amber-800 rounded" />
        <div className="absolute bottom-0 right-3 w-2 h-8 bg-amber-800 rounded" />
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
            const isPlaced = shelfWords.has(item.word)
            return (
              <DraggableTile
                key={item.word}
                id={item.word}
                label={item.emoji}
                color={isPlaced ? 'bg-white/5' : 'bg-white/20'}
                borderColor={isPlaced ? 'border-white/20' : 'border-white/50'}
                textColor="text-white"
                size="md"
                disabled={isPlaced}
                onDropped={handleDrop}
              />
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
