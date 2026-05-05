'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const CATEGORIES = [
  { id: 'oo',       label: 'OO', subtitle: '',       bg: 'bg-violet-50',  border: 'border-violet-400', header: 'bg-gradient-to-b from-violet-500 to-purple-600' },
  { id: 'ee',       label: 'EE', subtitle: '',       bg: 'bg-yellow-50',  border: 'border-yellow-400', header: 'bg-gradient-to-b from-yellow-500 to-amber-500' },
  { id: 'ea-long',  label: 'EA', subtitle: '(eat)',  bg: 'bg-blue-50',    border: 'border-blue-400',   header: 'bg-gradient-to-b from-blue-500 to-indigo-600' },
  { id: 'ea-short', label: 'EA', subtitle: '(bread)',bg: 'bg-slate-50',   border: 'border-slate-400',  header: 'bg-gradient-to-b from-slate-500 to-gray-600' },
  { id: 'ai',       label: 'AI', subtitle: '',       bg: 'bg-purple-50',  border: 'border-purple-400', header: 'bg-gradient-to-b from-purple-500 to-indigo-500' },
  { id: 'ay',       label: 'AY', subtitle: '',       bg: 'bg-emerald-50', border: 'border-emerald-400',header: 'bg-gradient-to-b from-emerald-500 to-teal-500' },
]

const ALL_TILES = [
  // OO
  { id: 'oo-moon',   word: 'moon',  emoji: '🌕', cat: 'oo' },
  { id: 'oo-pool',   word: 'pool',  emoji: '🏊', cat: 'oo' },
  { id: 'oo-book',   word: 'books', emoji: '📚', cat: 'oo' },
  { id: 'oo-room',   word: 'room',  emoji: '🛏️', cat: 'oo' },
  { id: 'oo-roof',   word: 'roof',  emoji: '🏠', cat: 'oo' },
  // EE
  { id: 'ee-tree',   word: 'tree',  emoji: '🌳', cat: 'ee' },
  { id: 'ee-bee',    word: 'bee',   emoji: '🐝', cat: 'ee' },
  { id: 'ee-jeep',   word: 'jeep',  emoji: '🚙', cat: 'ee' },
  { id: 'ee-sleep',  word: 'sleep', emoji: '😴', cat: 'ee' },
  // EA (eat)
  { id: 'eal-leaf',  word: 'leaf',  emoji: '🍃', cat: 'ea-long' },
  { id: 'eal-tea',   word: 'tea',   emoji: '☕', cat: 'ea-long' },
  { id: 'eal-beach', word: 'beach', emoji: '🏖️', cat: 'ea-long' },
  { id: 'eal-ear',   word: 'ear',   emoji: '👂', cat: 'ea-long' },
  // EA (bread)
  { id: 'eas-bread', word: 'bread', emoji: '🍞', cat: 'ea-short' },
  { id: 'eas-pear',  word: 'pear',  emoji: '🍐', cat: 'ea-short' },
  { id: 'eas-bear',  word: 'bear',  emoji: '🐻', cat: 'ea-short' },
  { id: 'eas-head',  word: 'head',  emoji: '👤', cat: 'ea-short' },
  // AI
  { id: 'ai-train',  word: 'train', emoji: '🚂', cat: 'ai' },
  { id: 'ai-snail',  word: 'snail', emoji: '🐌', cat: 'ai' },
  { id: 'ai-rain',   word: 'rain',  emoji: '🌧️', cat: 'ai' },
  { id: 'ai-paint',  word: 'paint', emoji: '🎨', cat: 'ai' },
  // AY
  { id: 'ay-play',   word: 'play',  emoji: '🎮', cat: 'ay' },
  { id: 'ay-day',    word: 'day',   emoji: '☀️', cat: 'ay' },
  { id: 'ay-pray',   word: 'pray',  emoji: '🙏', cat: 'ay' },
  { id: 'ay-tray',   word: 'tray',  emoji: '🍱', cat: 'ay' },
]

function SortExercise({ onComplete }: { onComplete: () => void }) {
  const speak = useSpeak()
  const [tiles] = useState(() => shuffle([...ALL_TILES]))
  const [placed, setPlaced] = useState<Set<string>>(new Set())
  const allDone = placed.size === ALL_TILES.length

  useEffect(() => {
    if (!allDone) return
    const t = setTimeout(onComplete, 600)
    return () => clearTimeout(t)
  }, [allDone, onComplete])

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const catId = targetEl.getAttribute('data-target-id')
    if (!catId || placed.has(tileId)) return false
    const tile = ALL_TILES.find(t => t.id === tileId)
    if (!tile || tile.cat !== catId) return false
    setPlaced(prev => { const n = new Set(prev); n.add(tileId); return n })
    return true
  }, [placed])

  const unplaced = tiles.filter(t => !placed.has(t.id))

  return (
    <div className="px-3 pb-10 max-w-2xl mx-auto">
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">
        לחץ על התמונה לשמוע את המילה — גרור למקום הנכון בטבלה
      </p>
      <p className="text-center text-violet-500 font-bold text-sm mb-3">{placed.size} / {ALL_TILES.length} ✓</p>

      {/* 6-column sort table */}
      <div className="grid grid-cols-6 gap-1 mb-6">
        {CATEGORIES.map(cat => {
          const catPlaced = ALL_TILES.filter(t => t.cat === cat.id && placed.has(t.id))
          return (
            <div key={cat.id} className="flex flex-col">
              <div className={`${cat.header} rounded-t-lg py-1 px-0.5 text-center`}>
                <div className="font-display font-black text-white text-sm leading-none">{cat.label}</div>
                {cat.subtitle && (
                  <div className="text-white/80 font-bold leading-none mt-0.5 text-xs">{cat.subtitle}</div>
                )}
              </div>
              <div
                data-drop-target="true"
                data-target-id={cat.id}
                className={`flex-1 min-h-[160px] rounded-b-lg border-2 ${cat.border} ${cat.bg} flex flex-col flex-wrap items-center justify-start gap-0.5 p-0.5 pt-1`}
              >
                {catPlaced.map(t => (
                  <span key={t.id} className="text-3xl bounce-in leading-none">{t.emoji}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {unplaced.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(tile => (
              <DraggableTile
                key={tile.id}
                id={tile.id}
                label={tile.emoji}
                color="bg-white"
                borderColor="border-gray-300"
                textColor="text-gray-700"
                size="md"
                onClick={() => speak(tile.word, 0.8)}
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Exercise3Page() {
  const [done, setDone] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-violet-500 to-teal-600 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/step2/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Phonics</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Sound Sort 3 🎲</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">מיון צלילים — OO · EE · EA · AI · AY</p>
        </div>
      </div>
      <div className="pt-5">
        {done ? (
          <div className="text-center py-10 px-4 bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-display font-bold text-3xl text-green-600 mb-1">Well done!</p>
            <p className="font-bold text-gray-500 mb-6" dir="rtl">כל הכבוד! מיינת את כל התמונות!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setDone(false); setKey(k => k + 1) }} className="btn-kid bg-blue-500">🔁 Again</button>
              <Link href="/step2/phonics" className="btn-kid bg-purple-500 no-underline">← Back</Link>
            </div>
          </div>
        ) : (
          <SortExercise key={key} onComplete={() => setDone(true)} />
        )}
      </div>
    </div>
  )
}
