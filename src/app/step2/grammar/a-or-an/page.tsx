'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { AOA_EX1, AOA_EX2 } from '@/data/step2/a-or-an'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'ex1' | 'ex2'
type Article = 'a' | 'an'

const ARTICLE_COLORS: Record<Article, { bg: string; border: string; light: string; text: string; badge: string }> = {
  a:  { bg: 'bg-blue-500',   border: 'border-blue-400',   light: 'bg-blue-50',   text: 'text-blue-700',   badge: 'bg-blue-200 text-blue-800'   },
  an: { bg: 'bg-emerald-500', border: 'border-emerald-400', light: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800' },
}

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">

      {/* Main rule card */}
      <div className="bg-orange-50 border-4 border-orange-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-orange-700 text-center mb-1">
          a or an?
        </h2>
        <p className="font-bold text-orange-700 text-sm text-center mb-4" dir="rtl">
          לפני שם עצם ביחיד (boy, table, book) מוסיפים את המילה a או an
        </p>

        {/* "a" rule */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500 text-white font-display font-black text-2xl px-4 py-1 rounded-xl">a</span>
            <p className="font-bold text-blue-800 text-sm" dir="rtl">
              אם שם העצם מתחיל באות רגילה (עיצור), מוסיפים <span className="font-black">a</span> לפני שם העצם
            </p>
          </div>
          <div className="flex flex-col gap-1 pl-2">
            {['This is a table.', 'I have a book.', 'I see a cat.'].map(ex => (
              <p key={ex} className="font-bold text-blue-700 text-base italic">{ex}</p>
            ))}
          </div>
        </div>

        {/* "an" rule */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500 text-white font-display font-black text-2xl px-4 py-1 rounded-xl">an</span>
            <p className="font-bold text-emerald-800 text-sm" dir="rtl">
              אם שם העצם מתחיל באות ניקוד (a, e, i, o, u), מוסיפים <span className="font-black">an</span> לפני שם העצם
            </p>
          </div>
          <div className="flex flex-col gap-1 pl-2">
            {['This is an apple.', 'I have an umbrella.', 'I see an egg.'].map(ex => (
              <p key={ex} className="font-bold text-emerald-700 text-base italic">{ex}</p>
            ))}
          </div>
        </div>

        {/* Vowel reminder */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-center">
          <p className="font-bold text-amber-700 text-sm mb-1" dir="rtl">אותיות ניקוד (vowels):</p>
          <div className="flex gap-3 justify-center">
            {['a', 'e', 'i', 'o', 'u'].map(v => (
              <span key={v} className="bg-amber-400 text-white font-display font-black text-xl px-3 py-0.5 rounded-lg">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Drag noun to correct article card ───────────────────────────────────

function Ex1Round({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const words = AOA_EX1[cycleIdx]
  const [tiles] = useState(() => shuffle([...words]))
  const [placed, setPlaced] = useState<Record<string, Article>>({})
  const total = words.length
  const placedCount = Object.keys(placed).length
  const allDone = placedCount === total

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    if (placed[tileId]) return false
    const art = targetEl.getAttribute('data-target-id') as Article | null
    if (!art) return false
    const word = words.find(w => w.id === tileId)
    if (!word || word.article !== art) return false
    setPlaced(prev => ({ ...prev, [tileId]: art }))
    return true
  }, [placed, words])

  const unplaced = tiles.filter(t => !placed[t.id])
  const aPlaced  = tiles.filter(t => placed[t.id] === 'a')
  const anPlaced = tiles.filter(t => placed[t.id] === 'an')

  return (
    <div className="max-w-xl mx-auto px-3 pb-16">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-gray-400">Cycle {cycleIdx + 1} of {AOA_EX1.length}</span>
        <span className="text-sm font-bold text-orange-500">{placedCount} / {total} ✓</span>
      </div>
      <p className="text-center font-bold text-orange-400 text-sm mb-3" dir="rtl">לתרגול זה 3 סבבים</p>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור כל שם עצם לכרטיסייה הנכונה — a או an
      </p>

      {/* Drop columns */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {(['a', 'an'] as Article[]).map(art => {
          const ac = ARTICLE_COLORS[art]
          const placed_words = art === 'a' ? aPlaced : anPlaced
          return (
            <div key={art} className="flex flex-col">
              <div className={`bg-gradient-to-b ${art === 'a' ? 'from-blue-500 to-blue-600' : 'from-emerald-500 to-emerald-600'} rounded-t-xl py-3 text-center`}>
                <span className="font-display font-black text-white text-2xl">{art}</span>
              </div>
              <div
                data-drop-target="true"
                data-target-id={art}
                className={`flex-1 min-h-[180px] rounded-b-xl border-4 ${ac.border} ${ac.light} p-2 flex flex-wrap gap-1 content-start`}
              >
                {placed_words.map(w => (
                  <span key={w.id} className={`${ac.badge} font-display font-black text-base px-2 py-1 rounded-lg bounce-in`}>
                    {w.word}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tile bank */}
      {!allDone && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(w => (
              <DraggableTile
                key={w.id}
                id={w.id}
                label={w.word}
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

      {allDone && (
        <div className="text-center py-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-4">Well done!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < AOA_EX1.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 2: Click a or an to complete each sentence ─────────────────────────────

function Ex2Round({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const sentences = AOA_EX2[cycleIdx]
  const [answers, setAnswers] = useState<Record<string, Article>>({})
  const answeredCount = Object.keys(answers).length
  const allDone = answeredCount === sentences.length

  const handleClick = (id: string, choice: Article, correct: Article) => {
    if (answers[id]) return
    if (choice !== correct) return
    setAnswers(prev => ({ ...prev, [id]: choice }))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
        <span>Cycle {cycleIdx + 1} / {AOA_EX2.length}</span>
        <span className="text-orange-500">{answeredCount} / {sentences.length} ✓</span>
      </div>
      <p className="text-center font-bold text-orange-400 text-sm mb-4" dir="rtl">לתרגול זה 2 סבבים</p>

      <p className="text-center font-bold text-gray-500 text-sm mb-4">
        Complete the sentences with <span className="font-black text-blue-600">a</span> / <span className="font-black text-emerald-600">an</span>
      </p>

      <div className="flex flex-col gap-2 mb-5">
        {sentences.map((s, i) => {
          const chosen = answers[s.id]
          const ac = chosen ? ARTICLE_COLORS[chosen] : null
          return (
            <div key={s.id} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-400 text-sm w-6 flex-shrink-0">{i + 1}.</span>
              <span className="font-bold text-gray-700 text-base">{s.before}</span>

              {/* Blank / filled */}
              {chosen && ac ? (
                <span className={`${ac.badge} font-display font-black text-base px-2 py-0.5 rounded-lg bounce-in`}>{chosen}</span>
              ) : (
                <div className="flex gap-1">
                  {(['a', 'an'] as Article[]).map(art => {
                    const bc = ARTICLE_COLORS[art]
                    return (
                      <button
                        key={art}
                        onClick={() => handleClick(s.id, art, s.answer)}
                        className={`font-display font-black text-sm px-3 py-0.5 rounded-lg border-2 transition-colors ${bc.light} ${bc.text} ${bc.border} hover:opacity-80 active:scale-95`}
                      >
                        {art}
                      </button>
                    )
                  })}
                </div>
              )}

              <span className="font-bold text-gray-700 text-base">{s.noun}.</span>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Perfect!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < AOA_EX2.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Wrapper ───────────────────────────────────────────────────────────────────

function ExWrapper({
  cycles, render,
}: {
  cycles: number
  render: (cycleIdx: number, onAgain: () => void, onDone: () => void) => React.ReactNode
}) {
  const [cycleIdx, setCycleIdx] = useState(0)
  const [key, setKey] = useState(0)
  const [finished, setFinished] = useState(false)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל התרגולים!</p>
        <button
          onClick={() => { setCycleIdx(0); setKey(k => k + 1); setFinished(false) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div key={key}>
      {render(
        Math.min(cycleIdx, cycles - 1),
        () => { setCycleIdx(i => i + 1); setKey(k => k + 1) },
        () => setFinished(true),
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AOrAnPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">a / an 🔖</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">מתי להוסיף a ומתי an לפני שם עצם</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">a cat · an apple · a book · an egg</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && (
          <ExWrapper
            cycles={AOA_EX1.length}
            render={(c, again, done) => <Ex1Round key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={AOA_EX2.length}
            render={(c, again, done) => <Ex2Round key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
