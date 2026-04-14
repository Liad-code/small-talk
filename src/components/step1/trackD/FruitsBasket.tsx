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

      {/* Market stall shelf — drop target */}
      <div
        data-drop-target="true"
        data-shelf="true"
        data-expected-ids={current ? JSON.stringify([current.word]) : '[]'}
        data-target-id={current?.word ?? ''}
        className="relative mb-4"
      >
        {/* Market stall SVG */}
        <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto block">
          {/* Awning stripes (red + white) */}
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <rect key={i} x={i * 32} y={0} width={32} height={30}
              fill={i % 2 === 0 ? '#e63946' : '#f1faee'} />
          ))}
          {/* Awning bottom scallop edge */}
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <ellipse key={`s${i}`} cx={i * 32 + 16} cy={30} rx={16} ry={8}
              fill={i % 2 === 0 ? '#e63946' : '#f1faee'} />
          ))}
          {/* Frame posts */}
          <rect x={10} y={0} width={8} height={160} fill="#888" rx={2}/>
          <rect x={302} y={0} width={8} height={160} fill="#888" rx={2}/>
          {/* Shelf board */}
          <rect x={10} y={80} width={300} height={12} fill="#c8a265" rx={2}/>
          <rect x={10} y={88} width={300} height={5} fill="#9c7a3c"/>
          {/* Shelf supports */}
          <rect x={40} y={92} width={6} height={40} fill="#9c7a3c" rx={2}/>
          <rect x={274} y={92} width={6} height={40} fill="#9c7a3c" rx={2}/>
          {/* Bottom shelf */}
          <rect x={10} y={132} width={300} height={10} fill="#c8a265" rx={2}/>
        </svg>
        {/* Items on shelf */}
        <div className="flex justify-center gap-3 items-end px-2"
             style={{ marginTop: '-32px', position: 'relative', zIndex: 10 }}>
          {shelfItems.map(item => (
            <span key={item.word} className="text-4xl">{item.emoji}</span>
          ))}
          {shelfItems.length === 0 && (
            <span className="text-white/50 text-sm font-bold" dir="rtl">מדף ריק...</span>
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
