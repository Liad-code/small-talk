'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  NOUN_SORT_ITEMS, NOUN_EX2, NOUN_EX3,
  type NounSortItem,
} from '@/data/step3/nouns'

type Tab = 'learn' | 'irregular' | 'ex1' | 'ex2' | 'ex3'

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({
  render,
}: {
  render: (onDone: () => void) => React.ReactNode
}) {
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל התרגולים!</p>
        <button
          onClick={() => { setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return <div key={key}>{render(() => setFinished(true))}</div>
}

// ── Learn Tab ─────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      {/* Intro */}
      <div className="bg-orange-50 border-4 border-orange-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-orange-700 text-center mb-2">
          Nouns 🏷️
        </h2>
        <p className="font-bold text-orange-800 text-sm text-center mb-4" dir="rtl">
          שם עצם הוא מילה שמייצגת אדם, מקום, דבר, בעל חיים או רעיון
        </p>

        {/* Rule 1: -s */}
        <div className="bg-orange-500 rounded-2xl p-3 mb-2">
          <p className="font-bold text-white text-sm text-center" dir="rtl">
            בדרך כלל, כדי להפוך שם עצם לרבים, מוסיפים את האות –s לצורת היחיד
          </p>
        </div>
        <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-orange-100">
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm border-r border-orange-200">יחיד</div>
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm">רבים</div>
          </div>
          {[['book', 'books'], ['cat', 'cats'], ['bag', 'bags'], ['pen', 'pens']].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-orange-100">
              <div className="text-center py-1.5 font-bold text-gray-700 text-base border-r border-orange-100">{sg}</div>
              <div className="text-center py-1.5 font-bold text-orange-600 text-base">{pl}</div>
            </div>
          ))}
        </div>

        {/* Rule 2: -es */}
        <div className="bg-amber-500 rounded-2xl p-3 mb-2">
          <p className="font-bold text-white text-sm text-center" dir="rtl">
            כאשר שם עצם ביחיד מסתיים ב- ss, sh, ch, x, o מוסיפים –es
          </p>
        </div>
        <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-amber-100">
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm border-r border-amber-200">יחיד</div>
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm">רבים</div>
          </div>
          {[['glass', 'glasses'], ['brush', 'brushes'], ['bench', 'benches'], ['box', 'boxes'], ['potato', 'potatoes']].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-amber-100">
              <div className="text-center py-1.5 font-bold text-gray-700 text-base border-r border-amber-100">{sg}</div>
              <div className="text-center py-1.5 font-bold text-amber-600 text-base">{pl}</div>
            </div>
          ))}
        </div>

        {/* Rule 3: -ies */}
        <div className="bg-orange-600 rounded-2xl p-3 mb-2">
          <p className="font-bold text-white text-sm text-center" dir="rtl">
            כאשר שם עצם ביחיד מסתיים באות y ולפניה יש אות רגילה (עיצור), מסירים את ה-y ומוסיפים –ies
          </p>
        </div>
        <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-orange-100">
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm border-r border-orange-200">יחיד</div>
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm">רבים</div>
          </div>
          {[['baby', 'babies'], ['party', 'parties']].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-orange-100">
              <div className="text-center py-1.5 font-bold text-gray-700 text-base border-r border-orange-100">{sg}</div>
              <div className="text-center py-1.5 font-bold text-orange-600 text-base">{pl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Irregular Tab ─────────────────────────────────────────────────────────────

function IrregularTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 text-center mb-2">
          Irregular Nouns
        </h2>
        <p className="font-bold text-amber-800 text-sm text-center mb-4" dir="rtl">
          שמות עצם אלה יוצאי דופן — ילמדו אותם בעל פה
        </p>

        <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-amber-100">
            <div className="font-display font-black text-amber-700 text-center py-2 text-sm border-r border-amber-200">יחיד</div>
            <div className="font-display font-black text-amber-700 text-center py-2 text-sm">רבים</div>
          </div>
          {[
            ['man', 'men'],
            ['woman', 'women'],
            ['child', 'children'],
            ['foot', 'feet'],
            ['mouse', 'mice'],
            ['fish', 'fish'],
            ['sheep', 'sheep'],
          ].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-amber-100">
              <div className="text-center py-2 font-bold text-gray-700 text-base border-r border-amber-100">{sg}</div>
              <div className="text-center py-2 font-black text-amber-600 text-base">{pl}</div>
            </div>
          ))}
        </div>

        <p className="font-bold text-amber-600 text-xs text-center mt-3" dir="rtl">
          * fish ו-sheep זהות ביחיד וברבים
        </p>
      </div>
    </div>
  )
}

// ── Ex 1: Sort nouns into categories ─────────────────────────────────────────

function Ex1({ onDone }: { onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<NounSortItem | null>(null)
  const [placed, setPlaced] = useState<Record<string, NounSortItem[]>>({
    '-s': [], '-es': [], '-ies': [],
  })
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [usedSingulars, setUsedSingulars] = useState<Set<string>>(new Set())

  const remaining = NOUN_SORT_ITEMS.filter(n => !usedSingulars.has(n.singular))
  const allDone = usedSingulars.size === NOUN_SORT_ITEMS.length

  const handleWordClick = (item: NounSortItem) => {
    if (usedSingulars.has(item.singular)) return
    setSelectedWord(prev => prev?.singular === item.singular ? null : item)
  }

  const handleCategoryClick = (cat: '-s' | '-es' | '-ies') => {
    if (!selectedWord) return
    if (selectedWord.category === cat) {
      setPlaced(prev => ({
        ...prev,
        [cat]: [...prev[cat], selectedWord],
      }))
      setUsedSingulars(prev => { const s = new Set(prev); s.add(selectedWord.singular); return s })
      setSelectedWord(null)
    } else {
      setFlashWrong(cat)
      setTimeout(() => {
        setFlashWrong(null)
        setSelectedWord(null)
      }, 800)
    }
  }

  const CATS: { id: '-s' | '-es' | '-ies'; label: string; color: string; flash: string }[] = [
    { id: '-s',   label: '–s',   color: 'border-orange-400 bg-orange-50',  flash: 'border-red-400 bg-red-50' },
    { id: '-es',  label: '–es',  color: 'border-amber-400 bg-amber-50',    flash: 'border-red-400 bg-red-50' },
    { id: '-ies', label: '–ies', color: 'border-yellow-400 bg-yellow-50',  flash: 'border-red-400 bg-red-50' },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort the nouns</span>
        <span className="text-orange-500">{usedSingulars.size} / {NOUN_SORT_ITEMS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחצו על מילה ואז על הקטגוריה המתאימה</p>
      {selectedWord && (
        <p className="text-center font-bold text-orange-500 text-sm mb-3">
          Selected: <span className="font-black">{selectedWord.singular}</span> — now click a category
        </p>
      )}
      {!selectedWord && <div className="mb-3" />}

      {/* Word bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(item => (
          <button
            key={item.singular}
            onClick={() => handleWordClick(item)}
            className={`px-4 py-2 rounded-xl font-display font-black text-base border-2 transition-all ${
              selectedWord?.singular === item.singular
                ? 'bg-orange-500 text-white border-orange-500 scale-105'
                : 'bg-white text-orange-700 border-orange-300 hover:bg-orange-50 active:scale-95'
            }`}
          >
            {item.singular}
          </button>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category boxes */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[120px] cursor-pointer transition-all ${
                isFlash ? cat.flash : cat.color
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-orange-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-lg text-orange-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.singular} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-orange-600 text-sm border border-orange-200">
                    {item.plural}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">All sorted correctly!</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 2: 3-choice plural ─────────────────────────────────────────────────────

function Ex2({ onDone }: { onDone: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)

  // Shuffle options per question using a stable memo
  const shuffledOptions = useMemo(() => {
    return NOUN_EX2.map(q => {
      const opts = [q.singular, q.wrong, q.correct]
      // simple deterministic shuffle based on word length parity
      return opts.sort(() => (q.noun.length % 3) - 1)
    })
  }, [])

  const question = NOUN_EX2[currentIdx]
  const options = shuffledOptions[currentIdx]

  const choose = (val: string) => {
    if (val === question.correct) {
      if (currentIdx + 1 < NOUN_EX2.length) {
        setCurrentIdx(i => i + 1)
      } else {
        setFinished(true)
        onDone()
      }
    } else {
      setFlashWrong(val)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-4xl mb-2">🎉</div>
        <p className="font-display font-bold text-xl text-green-600 mb-3">All done!</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Choose the correct plural</span>
        <span className="text-orange-500">{currentIdx} / {NOUN_EX2.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על צורת הרבים הנכונה</p>

      {/* Question card */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl px-5 py-5 mb-5 text-center">
        <p className="text-base font-bold text-gray-500 mb-1">
          ({question.noun})
        </p>
        <p className="text-xl font-bold text-gray-800">{question.sentence}</p>
      </div>

      {/* Options */}
      <div className="flex gap-3 justify-center flex-wrap">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => choose(opt)}
            className={`px-5 py-3 rounded-2xl font-display font-black text-lg border-2 transition-all active:scale-95 ${
              flashWrong === opt
                ? 'bg-red-500 text-white border-red-500 scale-95'
                : 'bg-white text-orange-700 border-orange-300 hover:bg-orange-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Ex 3: 2-choice singular/plural ───────────────────────────────────────────

function Ex3({ onDone }: { onDone: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [answered, setAnswered] = useState<{ correct: string }[]>([])
  const [finished, setFinished] = useState(false)

  const question = NOUN_EX3[currentIdx]

  const choose = (form: 'singular' | 'plural') => {
    const val = form === 'singular' ? question.singular : question.plural
    if (form === question.correct) {
      setAnswered(prev => [...prev, { correct: val }])
      if (currentIdx + 1 < NOUN_EX3.length) {
        setCurrentIdx(i => i + 1)
      } else {
        setFinished(true)
        onDone()
      }
    } else {
      setFlashWrong(val)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-4xl mb-2">🎉</div>
        <p className="font-display font-bold text-xl text-green-600 mb-3">All done!</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Singular or plural?</span>
        <span className="text-orange-500">{currentIdx} / {NOUN_EX3.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על הצורה הנכונה</p>

      {/* Question sentence */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl px-5 py-5 mb-5 text-center">
        <p className="text-xl font-bold text-gray-800">
          {question.before}{' '}
          <span className="inline-block min-w-[5rem] border-b-4 border-orange-400 mx-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {' '}{question.after}
        </p>
      </div>

      {/* Options */}
      <div className="flex gap-4 justify-center">
        {(['singular', 'plural'] as const).map(form => {
          const val = form === 'singular' ? question.singular : question.plural
          return (
            <button
              key={form}
              onClick={() => choose(form)}
              className={`px-6 py-3 rounded-2xl font-display font-black text-lg border-2 transition-all active:scale-95 min-w-[110px] ${
                flashWrong === val
                  ? 'bg-red-500 text-white border-red-500 scale-95'
                  : 'bg-white text-orange-700 border-orange-300 hover:bg-orange-50'
              }`}
            >
              <div className="text-xs font-bold text-gray-400 mb-0.5">{form}</div>
              {val}
            </button>
          )
        })}
      </div>

      {/* Progress */}
      {answered.length > 0 && (
        <div className="mt-5 flex flex-col gap-1.5">
          {answered.map((a, i) => (
            <div key={i} className="bg-green-50 border-2 border-green-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-green-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-green-700 text-sm">
                {NOUN_EX3[i].before} <span className="text-green-600 font-black">{a.correct}</span> {NOUN_EX3[i].after}
              </span>
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NounsPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn',     label: '📚 Learn' },
    { id: 'irregular', label: '⚠️ Irregular' },
    { id: 'ex1',       label: 'Ex 1' },
    { id: 'ex2',       label: 'Ex 2' },
    { id: 'ex3',       label: 'Ex 3' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Nouns 🏷️</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שמות עצם — יחיד ורבים</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">cats · boxes · babies</p>
        </div>
      </div>

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
        {tab === 'learn'     && <LearnTab />}
        {tab === 'irregular' && <IrregularTab />}
        {tab === 'ex1' && (
          <ExWrapper render={done => <Ex1 onDone={done} />} />
        )}
        {tab === 'ex2' && (
          <ExWrapper render={done => <Ex2 onDone={done} />} />
        )}
        {tab === 'ex3' && (
          <ExWrapper render={done => <Ex3 onDone={done} />} />
        )}
      </div>
    </div>
  )
}
