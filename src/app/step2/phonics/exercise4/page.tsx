'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { useSpeak } from '@/hooks/useSpeak'
import { shuffle } from '@/utils/shuffle'

const CATEGORIES = [
  { id: 'magic-e-a', label: 'MAGIC E', subtitle: 'A+E=Ā', bg: 'bg-rose-50',    border: 'border-rose-400',    header: 'bg-gradient-to-b from-rose-500 to-pink-600' },
  { id: 'magic-e-i', label: 'MAGIC E', subtitle: 'I+E=Ī', bg: 'bg-fuchsia-50', border: 'border-fuchsia-400', header: 'bg-gradient-to-b from-fuchsia-500 to-pink-600' },
  { id: 'magic-e-o', label: 'MAGIC E', subtitle: 'O+E=Ō', bg: 'bg-amber-50',   border: 'border-amber-400',   header: 'bg-gradient-to-b from-amber-500 to-orange-500' },
  { id: 'magic-e-u', label: 'MAGIC E', subtitle: 'U+E=Ū', bg: 'bg-cyan-50',    border: 'border-cyan-400',    header: 'bg-gradient-to-b from-cyan-500 to-teal-500' },
]

const ALL_TILES = [
  // MAGIC E : A
  { id: 'mea-lake',   word: 'lake',    emoji: '🏞️', cat: 'magic-e-a' },
  { id: 'mea-game',   word: 'game',    emoji: '🧩', cat: 'magic-e-a' },
  { id: 'mea-snake',  word: 'snake',   emoji: '🐍', cat: 'magic-e-a' },
  { id: 'mea-cake',   word: 'cake',    emoji: '🎂', cat: 'magic-e-a' },
  { id: 'mea-plate',  word: 'plate',   emoji: '🍽️', cat: 'magic-e-a' },
  // MAGIC E : I
  { id: 'mei-bike',   word: 'bike',    emoji: '🚲', cat: 'magic-e-i' },
  { id: 'mei-nine',   word: 'nine',    emoji: '9️⃣', cat: 'magic-e-i' },
  { id: 'mei-five',   word: 'five',    emoji: '5️⃣', cat: 'magic-e-i' },
  { id: 'mei-smile',  word: 'smile',   emoji: '😊', cat: 'magic-e-i' },
  { id: 'mei-white',  word: 'white',   emoji: '⬜', cat: 'magic-e-i' },
  // MAGIC E : O
  { id: 'meo-bone',   word: 'bone',    emoji: '🦴', cat: 'magic-e-o' },
  { id: 'meo-home',   word: 'home',    emoji: '🏠', cat: 'magic-e-o' },
  { id: 'meo-rose',   word: 'rose',    emoji: '🌹', cat: 'magic-e-o' },
  { id: 'meo-nose',   word: 'nose',    emoji: '👃', cat: 'magic-e-o' },
  { id: 'meo-phone',  word: 'phone',   emoji: '📱', cat: 'magic-e-o' },
  // MAGIC E : U
  { id: 'meu-cube',   word: 'cube',    emoji: '🧊', cat: 'magic-e-u' },
  { id: 'meu-tube',   word: 'tube',    emoji: '🧪', cat: 'magic-e-u' },
  { id: 'meu-dune',   word: 'dune',    emoji: '🏜️', cat: 'magic-e-u' },
  { id: 'meu-perf',   word: 'perfume', emoji: '🧴', cat: 'magic-e-u' },
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
    <div className="px-3 pb-10 max-w-xl mx-auto">
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">
        לחץ על התמונה לשמוע את המילה — גרור למקום הנכון בטבלה
      </p>
      <p className="text-center text-rose-500 font-bold text-sm mb-3">{placed.size} / {ALL_TILES.length} ✓</p>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {CATEGORIES.map(cat => {
          const catPlaced = ALL_TILES.filter(t => t.cat === cat.id && placed.has(t.id))
          return (
            <div key={cat.id} className="flex flex-col">
              <div className={`${cat.header} rounded-t-xl py-1.5 px-1 text-center`}>
                <div className="font-display font-black text-white text-sm leading-none">{cat.label}</div>
                <div className="text-white/80 font-bold text-xs leading-none mt-0.5">{cat.subtitle}</div>
              </div>
              <div
                data-drop-target="true"
                data-target-id={cat.id}
                className={`flex-1 min-h-[180px] rounded-b-xl border-4 ${cat.border} ${cat.bg} flex flex-col flex-wrap items-center justify-start gap-1 p-1 pt-2`}
              >
                {catPlaced.map(t => (
                  <span key={t.id} className="text-4xl bounce-in leading-none">{t.emoji}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {unplaced.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {unplaced.map(tile => (
              <DraggableTile
                key={tile.id}
                id={tile.id}
                label={tile.emoji}
                color="bg-white"
                borderColor="border-gray-300"
                textColor="text-gray-700"
                size="lg"
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

export default function Exercise4Page() {
  const [done, setDone] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-rose-500 to-cyan-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/phonics" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Phonics</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Sound Sort 4 🎲</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">מיון צלילים — MAGIC E: A · I · O · U</p>
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
