'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { TrackDItem } from '@/data/step1/trackDCategories'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const TOTAL_ROUNDS = 10

interface Props {
  items: TrackDItem[]
  onComplete: () => void
}

export function Pick3Exercise({ items, onComplete }: Props) {
  const speak = useSpeak()
  // roundNum: 0 = not started, 1-TOTAL_ROUNDS = active, TOTAL_ROUNDS+1 = all done
  const [roundNum, setRoundNum] = useState(0)
  const [announced, setAnnounced] = useState<TrackDItem[]>([])
  const [placed, setPlaced] = useState<(TrackDItem | null)[]>([null, null, null])
  const [allDone, setAllDone] = useState(false)
  const speakTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => { speakTimers.current.forEach(clearTimeout) }, [])

  // Fire a new round whenever roundNum changes (and is > 0)
  useEffect(() => {
    if (roundNum === 0 || allDone) return
    const picked = shuffle([...items]).slice(0, 3)
    setAnnounced(picked)
    setPlaced([null, null, null])
    speakTimers.current.forEach(clearTimeout)
    speakTimers.current = picked.map((item, i) =>
      setTimeout(() => speak(item.ttsText ?? item.word, 0.75), 500 + i * 1200)
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundNum])

  function handleStart() {
    setRoundNum(1)
    setAllDone(false)
  }

  function handleAgain() {
    setAllDone(false)
    setRoundNum(0)
    setAnnounced([])
    setPlaced([null, null, null])
    // Restart after a tick to ensure roundNum goes 0→1
    setTimeout(() => setRoundNum(1), 50)
  }

  function replay() {
    if (announced.length === 0) return
    announced.forEach((item, i) => {
      setTimeout(() => speak(item.ttsText ?? item.word, 0.75), 300 + i * 1200)
    })
  }

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const slotIdx = parseInt(targetEl.getAttribute('data-slot-idx') ?? '-1', 10)
    if (slotIdx < 0 || slotIdx > 2) return false
    const item = items.find(i => i.word === tileId)
    if (!item) return false
    if (!announced.some(a => a.word === tileId)) return false
    if (placed.some(p => p?.word === tileId)) return false

    const newPlaced = [...placed]
    newPlaced[slotIdx] = item
    setPlaced(newPlaced)

    if (newPlaced.filter(Boolean).length === 3 && newPlaced.every(p => p && announced.some(a => a.word === p.word))) {
      setTimeout(() => {
        setRoundNum(prev => {
          const nextRound = prev + 1
          if (nextRound > TOTAL_ROUNDS) {
            setAllDone(true)
            setTimeout(onComplete, 400)
          }
          return nextRound
        })
      }, 800)
    }
    return true
  }, [announced, placed, items, onComplete])

  const placedWords = new Set(placed.filter(Boolean).map(p => p!.word))
  const freeTiles = items.filter(item => !placedWords.has(item.word))

  // Not started yet
  if (roundNum === 0) {
    return (
      <div className="p-4 max-w-sm mx-auto text-center">
        <p className="text-black font-bold text-base mb-6" dir="rtl">
          לחץ על הרמקול כדי לשמוע 3 פריטים — גרור אותם לריבועים!
        </p>
        <button
          onClick={handleStart}
          className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/50 text-5xl
                     hover:bg-white/30 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center mx-auto"
        >
          🔊
        </button>
      </div>
    )
  }

  // All done — show Again button
  if (allDone) {
    return (
      <div className="p-4 max-w-sm mx-auto text-center">
        <div className="text-5xl mb-3 bounce-in">🎉</div>
        <p className="font-bold text-black text-lg mb-6" dir="rtl">כל הכבוד! סיימת את כל הסיבובים!</p>
        <button onClick={handleAgain} className="btn-kid bg-blue-500">
          🔁 Again
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="text-center text-black font-bold text-sm mb-3">
        Round {Math.min(roundNum, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
      </div>

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

      {/* All tiles */}
      <div className="border-t-2 border-white/20 pt-3">
        <div className="flex flex-wrap justify-center gap-2">
          {freeTiles.map(item => {
            return (
              <DraggableTile
                key={item.word}
                id={item.word}
                label={item.emoji}
                color="bg-white/20"
                borderColor="border-white/40"
                textColor="text-white"
                size="md"
                onDropped={handleDrop}
              />
            )
          })}
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
    </div>
  )
}
