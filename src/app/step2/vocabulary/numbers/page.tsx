'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { shuffle } from '@/utils/shuffle'
import {
  NUMBERS_0_10, NUMBERS_11_19, NUMBERS_TENS, NUMBERS_21_29,
  NumberItem,
} from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz' | 'ex1' | 'ex2' | 'ex3'

const QUIZ_POOL = [...NUMBERS_11_19, ...NUMBERS_TENS, ...NUMBERS_21_29]

// ── Learn ────────────────────────────────────────────────────────────────────

function NumberGrid({ items }: { items: NumberItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(n => (
        <div key={n.digit} className="bg-white border-2 border-blue-200 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
          <span className="font-display font-black text-2xl text-indigo-600">{n.digit}</span>
          <span className="font-bold text-blue-900 text-sm text-right">{n.word}</span>
        </div>
      ))}
    </div>
  )
}

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <div className="bg-indigo-50 border-4 border-indigo-200 rounded-3xl p-4">
        <h2 className="font-display font-black text-xl text-indigo-700 mb-3 text-center">11 – 19</h2>
        <NumberGrid items={NUMBERS_11_19} />
      </div>

      <div className="bg-blue-50 border-4 border-blue-200 rounded-3xl p-4">
        <h2 className="font-display font-black text-xl text-blue-700 mb-1 text-center">עשרות — Round Tens</h2>
        <p className="text-center text-blue-500 font-bold text-sm mb-3">(10 – 100)</p>
        <NumberGrid items={NUMBERS_TENS} />
      </div>

      <div className="bg-sky-50 border-4 border-sky-200 rounded-3xl p-4">
        <h2 className="font-display font-black text-xl text-sky-700 mb-1 text-center">21 – 29</h2>
        <p className="text-center text-sky-500 font-bold text-sm mb-3" dir="rtl">twenty + מספר בודד</p>
        <NumberGrid items={NUMBERS_21_29} />
      </div>
    </div>
  )
}

// ── Quiz ─────────────────────────────────────────────────────────────────────

function QuizInner({ onAgain }: { onAgain: () => void }) {
  const [queue] = useState<NumberItem[]>(() => shuffle([...QUIZ_POOL]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<NumberItem[]>([])
  const [correct, setCorrect] = useState<number | null>(null)
  const [wrong, setWrong] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const current = queue[idx]
    if (!current) return
    const others = QUIZ_POOL.filter(n => n.digit !== current.digit)
    setOptions(shuffle([current, ...shuffle(others).slice(0, 3)]))
  }, [idx, queue])

  function handleAnswer(digit: number) {
    if (correct !== null || done) return
    const current = queue[idx]
    if (digit === current.digit) {
      setCorrect(digit)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        const next = idx + 1
        if (next >= queue.length) setDone(true)
        else setIdx(next)
      }, 600)
    } else {
      setWrong(digit)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-blue-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
      </div>
    )
  }

  const current = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-blue-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את הכתיב הנכון</p>

      <div className="text-center mb-8">
        <span className="font-display font-black text-7xl text-indigo-700">{current?.digit}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isCorrect = correct === opt.digit
          const isWrong = wrong === opt.digit
          return (
            <button
              key={opt.digit}
              onClick={() => handleAnswer(opt.digit)}
              className={`
                rounded-2xl border-4 py-4 font-display font-black text-xl
                transition-all duration-150 cursor-pointer select-none
                ${isCorrect ? 'bg-green-200 border-green-400 scale-105' : ''}
                ${isWrong ? 'bg-red-100 border-red-400 shake' : ''}
                ${!isCorrect && !isWrong ? 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100 hover:scale-105 active:scale-95' : ''}
              `}
            >
              {opt.word}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function QuizTab() {
  const [k, setK] = useState(0)
  return <QuizInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex1: Memory Game (0–10) ───────────────────────────────────────────────────

interface MemCard {
  id: string
  value: number
  type: 'digit' | 'word'
  word: string
}

function buildMemCards(): MemCard[] {
  const cards: MemCard[] = []
  NUMBERS_0_10.forEach(n => {
    cards.push({ id: `d-${n.digit}`, value: n.digit, type: 'digit', word: n.word })
    cards.push({ id: `w-${n.digit}`, value: n.digit, type: 'word',  word: n.word })
  })
  return shuffle(cards)
}

function MemoryInner({ onAgain }: { onAgain: () => void }) {
  const [cards] = useState<MemCard[]>(buildMemCards)
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [checking, setChecking] = useState(false)

  const allMatched = matched.size === cards.length

  function handleFlip(id: string) {
    if (checking || matched.has(id) || flipped.includes(id)) return
    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)
    if (newFlipped.length === 2) {
      setChecking(true)
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid)!)
      if (a.value === b.value) {
        setTimeout(() => {
          setMatched(prev => { const s = new Set(prev); s.add(a.id); s.add(b.id); return s })
          setFlipped([])
          setChecking(false)
        }, 600)
      } else {
        setTimeout(() => { setFlipped([]); setChecking(false) }, 900)
      }
    }
  }

  if (allMatched) {
    return (
      <div className="text-center py-12 bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-display font-bold text-2xl text-green-600 mb-4">Amazing!</p>
        <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-3 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span dir="rtl">מצא זוגות — מספר + מילה</span>
        <span className="text-blue-500">{matched.size / 2} / {NUMBERS_0_10.length} ✓</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id)
          const isMatched = matched.has(card.id)
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`
                aspect-square rounded-2xl border-4 font-display font-black
                flex items-center justify-center text-center p-1
                transition-all duration-200 cursor-pointer select-none
                ${isMatched ? 'bg-green-100 border-green-400 text-green-800 opacity-70' : ''}
                ${isFlipped && !isMatched ? 'bg-indigo-100 border-indigo-400 text-indigo-800 scale-105' : ''}
                ${!isFlipped ? 'bg-blue-500 border-blue-600 text-white hover:bg-blue-400 hover:scale-105 active:scale-95' : ''}
              `}
            >
              {isFlipped ? (
                card.type === 'digit'
                  ? <span className="text-3xl">{card.value}</span>
                  : <span className="text-xs leading-tight">{card.word}</span>
              ) : (
                <span className="text-2xl">?</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Ex1Tab() {
  const [k, setK] = useState(0)
  return <MemoryInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex2: Match 11–19 (no voice) ───────────────────────────────────────────────

function Ex2Inner({ onAgain }: { onAgain: () => void }) {
  const [shuffledWords] = useState<NumberItem[]>(() => shuffle([...NUMBERS_11_19]))
  const [selected, setSelected] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [wrongPair, setWrongPair] = useState<number | null>(null)

  const allDone = matched.size === NUMBERS_11_19.length

  function handleWordClick(digit: number) {
    if (matched.has(digit)) return
    setSelected(digit)
    setWrongPair(null)
  }

  function handleDigitClick(digit: number) {
    if (!selected || matched.has(digit)) return
    if (selected === digit) {
      const next = new Set(matched)
      next.add(digit)
      setMatched(next)
      setSelected(null)
    } else {
      setWrongPair(selected)
      setTimeout(() => { setWrongPair(null); setSelected(null) }, 500)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        לחץ על המילה ועל המספר שלה
      </p>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-2">
          {shuffledWords.map(n => {
            const isMatched = matched.has(n.digit)
            const isSel = selected === n.digit
            const isWrong = wrongPair === n.digit
            return (
              <button
                key={n.digit}
                onClick={() => !isMatched && handleWordClick(n.digit)}
                disabled={isMatched}
                className={`
                  py-2 px-3 rounded-xl border-4 font-bold text-base text-left
                  transition-all duration-150 cursor-pointer select-none min-h-[48px]
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-800 opacity-60' : ''}
                  ${isSel ? 'bg-blue-200 border-blue-500 text-blue-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
                  ${!isMatched && !isSel && !isWrong ? 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100 hover:scale-105' : ''}
                `}
              >
                {n.word}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2 w-16">
          {NUMBERS_11_19.map(n => {
            const isMatched = matched.has(n.digit)
            return (
              <button
                key={n.digit}
                onClick={() => !isMatched && handleDigitClick(n.digit)}
                disabled={isMatched}
                className={`
                  h-[48px] w-full rounded-xl border-4 font-black text-lg
                  transition-all duration-150 cursor-pointer select-none
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-800 opacity-60' : ''}
                  ${!isMatched ? 'bg-indigo-50 border-indigo-300 text-indigo-800 hover:bg-indigo-100 hover:scale-105' : ''}
                `}
              >
                {n.digit}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-sm font-bold text-gray-400">
        {matched.size} / {NUMBERS_11_19.length} ✓
      </div>

      {allDone && (
        <div className="text-center mt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex2Tab() {
  const [k, setK] = useState(0)
  return <Ex2Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex3: Order round tens (smallest → largest) ────────────────────────────────

function Ex3Inner({ onAgain }: { onAgain: () => void }) {
  const [shuffled] = useState<NumberItem[]>(() => shuffle([...NUMBERS_TENS]))
  const [slots, setSlots] = useState<(string | null)[]>(Array(NUMBERS_TENS.length).fill(null))
  const [done, setDone] = useState(false)

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const slotIdx = parseInt(targetEl.getAttribute('data-target-id') ?? '-1', 10)
    if (slotIdx < 0 || slotIdx >= NUMBERS_TENS.length) return false
    if (tileId !== NUMBERS_TENS[slotIdx].word) return false
    if (slots[slotIdx] !== null) return false
    const next = [...slots]
    next[slotIdx] = tileId
    setSlots(next)
    if (next.every(s => s !== null)) setDone(true)
    return true
  }, [slots])

  const placedSet = new Set(slots.filter(Boolean) as string[])
  const free = shuffled.filter(n => !placedSet.has(n.word))

  if (done) {
    return (
      <div className="p-3 max-w-sm mx-auto text-center bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-bold text-gray-700 text-lg mb-5" dir="rtl">כל הכבוד! סידרת את העשרות!</p>
        <div className="flex flex-col gap-1 mb-5">
          {NUMBERS_TENS.map(n => (
            <div key={n.digit} className="flex items-center gap-3 bg-blue-100 border-2 border-blue-400 rounded-xl px-3 py-2">
              <span className="font-black text-blue-500 text-sm w-10 text-right">{n.digit}</span>
              <span className="font-bold text-blue-900 text-base">{n.word}</span>
            </div>
          ))}
        </div>
        <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור את העשרות מהקטן לגדול
      </p>
      <div className="flex flex-col gap-2 mb-4">
        {NUMBERS_TENS.map((n, i) => {
          const filled = slots[i]
          return (
            <div
              key={n.digit}
              data-drop-target="true"
              data-target-id={String(i)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl border-4 min-h-[48px]
                ${filled ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-dashed border-blue-300'}
                transition-all duration-200
              `}
            >
              <span className="font-black text-blue-400 text-sm w-10 flex-shrink-0 text-right">{n.digit}</span>
              {filled
                ? <span className="font-bold text-blue-900 text-base">{filled}</span>
                : <span className="font-bold text-gray-300 text-sm">___</span>
              }
            </div>
          )
        })}
      </div>

      {free.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {free.map(n => (
              <DraggableTile
                key={n.word}
                id={n.word}
                label={n.word}
                color="bg-blue-100"
                borderColor="border-blue-400"
                textColor="text-blue-900"
                size="sm"
                className="!w-auto min-w-[72px] px-2 text-sm"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Ex3Tab() {
  const [k, setK] = useState(0)
  return <Ex3Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn'  },
  { id: 'quiz',  label: '🎯 Quiz'   },
  { id: 'ex1',   label: '🃏 Memory' },
  { id: 'ex2',   label: '🔗 Match'  },
  { id: 'ex3',   label: '🔢 Order'  },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function NumbersPage() {
  const [tab, setTab] = useState<Tab>('learn')

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Numbers 🔢</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">מספרים — 11 עד 100</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'quiz'  && <QuizTab />}
        {tab === 'ex1'   && <Ex1Tab />}
        {tab === 'ex2'   && <Ex2Tab />}
        {tab === 'ex3'   && <Ex3Tab />}
      </div>
    </div>
  )
}
