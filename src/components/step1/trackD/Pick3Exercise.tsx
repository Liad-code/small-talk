'use client'
import { useState, useCallback } from 'react'
import { TrackDItem } from '@/data/step1/trackDCategories'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

interface Props {
  items: TrackDItem[]   // must be exactly 6
  onComplete: () => void
}

export function Pick3Exercise({ items, onComplete }: Props) {
  const speak = useSpeak()
  const [announced, setAnnounced] = useState<TrackDItem[]>([])
  const [placed, setPlaced] = useState<(TrackDItem | null)[]>([null, null, null])
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  function start() {
    const picked = shuffle([...items]).slice(0, 3)
    setAnnounced(picked)
    setPlaced([null, null, null])
    setDone(false)
    setStarted(true)
    // announce all 3 with delays
    picked.forEach((item, i) => {
      setTimeout(() => speak(item.ttsText ?? item.word, 0.85), 500 + i * 900)
    })
  }

  function replay() {
    if (announced.length === 0) return
    announced.forEach((item, i) => {
      setTimeout(() => speak(item.ttsText ?? item.word, 0.85), 300 + i * 900)
    })
  }

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const slotIdx = parseInt(targetEl.getAttribute('data-slot-idx') ?? '-1', 10)
    if (slotIdx < 0 || slotIdx > 2) return false
    const item = items.find(i => i.word === tileId)
    if (!item) return false
    // only accept announced items
    if (!announced.some(a => a.word === tileId)) return false
    // don't allow duplicate in slots
    if (placed.some(p => p?.word === tileId)) return false

    const newPlaced = [...placed]
    newPlaced[slotIdx] = item
    setPlaced(newPlaced)

    const filledCount = newPlaced.filter(Boolean).length
    if (filledCount === 3 && newPlaced.every(p => p && announced.some(a => a.word === p.word))) {
      setDone(true)
      setTimeout(onComplete, 800)
    }
    return true
  }, [announced, placed, items, onComplete])

  const placedWords = new Set(placed.filter(Boolean).map(p => p!.word))
  const freeTiles = items.filter(item => !placedWords.has(item.word))

  if (!started) {
    return (
      <div className="p-4 max-w-sm mx-auto text-center">
        <p className="text-white/80 font-bold text-sm mb-6" dir="rtl">
          לחץ על הרמקול כדי לשמוע 3 פריטים — גרור אותם לריבועים!
        </p>
        <button
          onClick={start}
          className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/50 text-5xl
                     hover:bg-white/30 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center mx-auto"
        >
          🔊
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      {/* 3 target slots */}
      <div className="flex gap-3 justify-center mb-4">
        {[0, 1, 2].map(i => {
          const item = placed[i]
          return (
            <div
              key={i}
              data-drop-target="true"
              data-slot-idx={String(i)}
              data-expected-ids={announced[i] ? JSON.stringify([announced[i].word]) : '[]'}
              data-target-id={announced[i]?.word ?? ''}
              className={`
                w-20 h-20 rounded-2xl border-4 border-black
                flex items-center justify-center
                transition-all duration-200
                ${item ? 'bg-white/30' : 'bg-white/10 drop-hover-ready'}
              `}
            >
              {item ? (
                <span className="text-4xl">{item.emoji}</span>
              ) : (
                <span className="text-white/30 text-2xl font-bold">{i + 1}</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Replay button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={replay}
          className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 text-2xl
                     hover:bg-white/30 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >
          🔊
        </button>
      </div>

      {/* All 6 tiles */}
      <div className="border-t-2 border-white/20 pt-3">
        <div className="flex flex-wrap justify-center gap-2">
          {freeTiles.map(item => {
            const isAnnounced = announced.some(a => a.word === item.word)
            return (
              <DraggableTile
                key={item.word}
                id={item.word}
                label={item.emoji}
                color={isAnnounced ? 'bg-white/30' : 'bg-white/10'}
                borderColor={isAnnounced ? 'border-white' : 'border-white/30'}
                textColor="text-white"
                size="md"
                onDropped={handleDrop}
              />
            )
          })}
          {/* Show placed-but-announced in faded state */}
          {placed.filter(Boolean).map(item => (
            <div
              key={`placed-${item!.word}`}
              className="w-14 h-14 rounded-2xl border-4 border-white/20 bg-white/5 flex items-center justify-center opacity-30"
            >
              <span className="text-2xl">{item!.emoji}</span>
            </div>
          ))}
        </div>
      </div>

      {done && (
        <div className="text-center mt-4">
          <span className="text-4xl bounce-in">🎉</span>
        </div>
      )}
    </div>
  )
}
