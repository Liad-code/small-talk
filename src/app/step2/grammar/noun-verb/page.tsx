'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { NV_CYCLES } from '@/data/step2/grammar'
import { shuffle } from '@/utils/shuffle'

// ── Learn tab ────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      {/* NOUN card */}
      <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🏷️</span>
          <h2 className="font-display font-black text-3xl text-emerald-700">NOUN — שם עצם</h2>
        </div>
        <p className="font-bold text-emerald-800 mb-2 text-base">
          A noun is a word that names a <span className="underline">person</span>, <span className="underline">place</span>, <span className="underline">thing</span>, <span className="underline">animal</span> or an <span className="underline">idea</span>.
        </p>
        <p className="font-bold text-emerald-700 text-base mb-4" dir="rtl">
          שם עצם מציין אנשים, מקומות, חפצים, חיות או רעיונות.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { cat: '👥 People', examples: 'sister, father, boy, doctor' },
            { cat: '🏙️ Places', examples: 'school, shop, park, London' },
            { cat: '🪑 Things', examples: 'car, table, chair, window' },
            { cat: '🐈 Animals', examples: 'cat, pig, sheep, dog' },
            { cat: '💡 Ideas',   examples: 'love, fear' },
          ].map(({ cat, examples }) => (
            <div key={cat} className="bg-emerald-100 rounded-xl p-2">
              <div className="font-bold text-emerald-700 text-sm">{cat}</div>
              <div className="text-emerald-600 text-sm">{examples}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VERB card */}
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">⚡</span>
          <h2 className="font-display font-black text-3xl text-blue-700">VERB — פועל</h2>
        </div>
        <p className="font-bold text-blue-800 mb-2 text-base">
          A verb is a word that describes an <span className="underline">action</span>.
        </p>
        <p className="font-bold text-blue-700 text-base mb-4" dir="rtl">
          פועל הוא מילה המתארת פעולה — ללכת, לקפוץ, לקרוא.
        </p>
        <div className="bg-blue-100 rounded-xl p-3">
          <div className="font-bold text-blue-700 text-sm mb-1">Examples:</div>
          <div className="flex flex-wrap gap-2">
            {['walk', 'go', 'read', 'jump', 'run', 'eat', 'sing', 'swim'].map(w => (
              <span key={w} className="bg-blue-500 text-white font-display font-black text-base px-3 py-0.5 rounded-lg">{w}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="font-bold text-gray-500 text-base mb-3" dir="rtl">מוכן לתרגל? לחץ על "Practice" למעלה</p>
      </div>
    </div>
  )
}

// ── Practice tab ─────────────────────────────────────────────────────────────

function PracticeRound({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const words = NV_CYCLES[cycleIdx]
  const [tiles] = useState(() => shuffle([...words]))
  const [placed, setPlaced] = useState<Record<string, 'noun' | 'verb'>>({})
  const total = words.length
  const placedCount = Object.keys(placed).length
  const allDone = placedCount === total

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    if (placed[tileId]) return false
    const cat = targetEl.getAttribute('data-target-id') as 'noun' | 'verb' | null
    if (!cat) return false
    const word = words.find(w => w.id === tileId)
    if (!word || word.cat !== cat) return false
    setPlaced(prev => ({ ...prev, [tileId]: cat }))
    return true
  }, [placed, words])

  const unplaced = tiles.filter(t => !placed[t.id])
  const nounPlaced = tiles.filter(t => placed[t.id] === 'noun')
  const verbPlaced = tiles.filter(t => placed[t.id] === 'verb')

  return (
    <div className="max-w-xl mx-auto px-3 pb-16">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-400">Cycle {cycleIdx + 1} of {NV_CYCLES.length}</span>
        <span className="text-sm font-bold text-emerald-500">{placedCount} / {total} ✓</span>
      </div>

      {/* Sort table */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* NOUN column */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-b from-emerald-500 to-teal-600 rounded-t-xl py-3 text-center">
            <span className="font-display font-black text-white text-xl">NOUN 🏷️</span>
          </div>
          <div
            data-drop-target="true"
            data-target-id="noun"
            className="flex-1 min-h-[160px] rounded-b-xl border-4 border-emerald-400 bg-emerald-50 p-2 flex flex-wrap gap-1 content-start"
          >
            {nounPlaced.map(w => (
              <span key={w.id} className="bg-emerald-200 text-emerald-800 font-display font-black text-sm px-2 py-1 rounded-lg bounce-in">{w.word.toLowerCase()}</span>
            ))}
          </div>
        </div>

        {/* VERB column */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-b from-blue-500 to-indigo-600 rounded-t-xl py-3 text-center">
            <span className="font-display font-black text-white text-xl">VERB ⚡</span>
          </div>
          <div
            data-drop-target="true"
            data-target-id="verb"
            className="flex-1 min-h-[160px] rounded-b-xl border-4 border-blue-400 bg-blue-50 p-2 flex flex-wrap gap-1 content-start"
          >
            {verbPlaced.map(w => (
              <span key={w.id} className="bg-blue-200 text-blue-800 font-display font-black text-sm px-2 py-1 rounded-lg bounce-in">{w.word.toLowerCase()}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tile bank */}
      {!allDone && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(w => (
              <DraggableTile
                key={w.id}
                id={w.id}
                label={w.word.toLowerCase()}
                color="bg-white"
                borderColor="border-gray-300"
                textColor="text-gray-700"
                size="sm"
                className="!w-auto min-w-[48px] px-3 text-sm"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completion */}
      {allDone && (
        <div className="text-center py-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-4">Well done!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < NV_CYCLES.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}

      {/* Reference table */}
      <div className="mt-6 border-t-2 border-dashed border-gray-200 pt-4">
        <p className="font-bold text-gray-500 text-sm mb-2 text-center" dir="rtl">📖 עזרה — משמעות המילים</p>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {words.map(w => (
              <tr key={w.id} className="border-b border-gray-200">
                <td className="py-1.5 pr-4 font-bold text-gray-900">{w.word.toLowerCase()}</td>
                <td className="py-1.5 font-bold text-gray-900 text-right" dir="rtl">{w.hebrew}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function NounVerbPage() {
  const [tab, setTab] = useState<'learn' | 'practice'>('learn')
  const [cycleIdx, setCycleIdx] = useState(0)
  const [practiceKey, setPracticeKey] = useState(0)
  const [finished, setFinished] = useState(false)

  const handleAgain = () => {
    setCycleIdx(i => i + 1)
    setPracticeKey(k => k + 1)
  }

  const handleDone = () => setFinished(true)

  const TAB_BTN = 'px-4 py-2 rounded-full font-display font-bold text-sm transition-colors'

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Noun / Verb 🏷️⚡</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">שמות עצם ופעלים</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex gap-2 justify-center">
        <button
          onClick={() => setTab('learn')}
          className={`${TAB_BTN} ${tab === 'learn' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          📚 Learn
        </button>
        <button
          onClick={() => { setTab('practice'); setFinished(false) }}
          className={`${TAB_BTN} ${tab === 'practice' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          🎯 Practice
        </button>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}

        {tab === 'practice' && !finished && (
          <PracticeRound
            key={practiceKey}
            cycleIdx={Math.min(cycleIdx, NV_CYCLES.length - 1)}
            onAgain={handleAgain}
            onDone={handleDone}
          />
        )}

        {tab === 'practice' && finished && (
          <div className="text-center py-14 px-4 bounce-in">
            <div className="text-6xl mb-4">🌟</div>
            <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
            <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל התרגולים!</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setCycleIdx(0); setPracticeKey(k => k + 1); setFinished(false) }}
                className="btn-kid bg-blue-500"
              >
                🔁 Start Over
              </button>
              <Link href="/step2/grammar" className="btn-kid bg-purple-500 no-underline">← Grammar</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
