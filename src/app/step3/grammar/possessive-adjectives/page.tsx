'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  PA_EX1, PA_EX2, PA_EX2_R2, PA_EX3_SEGMENTS, PA_EX3_BLANKS, PA_EX3_WORD_BANK, PA_WORD_BANK,
  type PossAdj,
} from '@/data/step3/possessive-adjectives'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({
  cycles,
  render,
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

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-violet-50 border-4 border-violet-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-violet-700 text-center mb-2">
          Possessive Adjectives
        </h2>
        <p className="font-bold text-violet-800 text-sm mb-4 text-center" dir="rtl">
          משתמשים בהם לפני שמות עצם כדי לציין למי שייך משהו
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-3 border-2 border-violet-200">
            <div className="font-display font-black text-violet-700 text-center text-base mb-2">יחיד (Singular)</div>
            {[
              ['my',   'שלי',         'I'],
              ['your', 'שלך',          'you'],
              ['his',  'שלו',         'he'],
              ['her',  'שלה',         'she'],
              ['its',  'שלה / שלו',   'it'],
            ].map(([word, heb, pronoun]) => (
              <div key={word} className="flex justify-between items-center text-sm py-0.5 border-b border-violet-100">
                <span className="font-black text-violet-700">{word}</span>
                <span className="text-gray-400 text-xs">({pronoun})</span>
                <span className="text-gray-500 text-xs" dir="rtl">{heb}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-violet-200">
            <div className="font-display font-black text-violet-700 text-center text-base mb-2">רבים (Plural)</div>
            {[
              ['our',   'שלנו',           'we'],
              ['your',  'שלכם / שלכן',   'you'],
              ['their', 'שלהם / שלהן',   'they'],
            ].map(([word, heb, pronoun]) => (
              <div key={word + heb} className="flex justify-between items-center text-sm py-0.5 border-b border-violet-100">
                <span className="font-black text-violet-700">{word}</span>
                <span className="text-gray-400 text-xs">({pronoun})</span>
                <span className="text-gray-500 text-xs" dir="rtl">{heb}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { before: 'I have a dog.', sentence: 'My dog is brown.' },
            { before: 'She has a bag.', sentence: 'Her bag is red.' },
            { before: 'They have a house.', sentence: 'Their house is big.' },
            { before: 'We have a car.', sentence: 'Our car is blue.' },
          ].map(({ before, sentence }) => (
            <div key={before} className="bg-violet-100 rounded-xl px-3 py-1.5">
              <div className="text-xs text-violet-400 font-bold">{before}</div>
              <div className="font-bold text-violet-700 text-base">{sentence}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1 ───────────────────────────────────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = PA_EX1[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx] || wrongs.has(idx)) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => { const s = new Set(prev); s.add(idx); return s })
      setTimeout(() => setWrongs(prev => { const s = new Set(prev); s.delete(idx); return s }), 800)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Round {cycleIdx + 1} / {PA_EX1.length}</span>
        <span className="text-violet-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">לחצו על המילה הנכונה</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          const blankDisplay = ans ? q.blank.replace('___', ans) : q.blank
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl px-3 py-2 ${isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <div className="text-xs text-black font-bold mb-0.5">{q.sentence}</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-gray-700 flex-1 min-w-0">{blankDisplay}</span>
                {!ans && !isWrong ? (
                  <div className="flex gap-1.5">
                    {q.options.map(v => (
                      <button
                        key={v}
                        onClick={() => choose(idx, v)}
                        className="px-3 py-1 rounded-lg font-display font-bold text-sm border-2 border-violet-300 bg-violet-50 text-violet-700 hover:opacity-80 active:scale-95 transition-colors"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                ) : isWrong ? (
                  <span className="font-bold text-sm text-red-500">✗</span>
                ) : (
                  <span className="font-bold text-sm text-green-600">✓</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">{total}/{total} correct!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < PA_EX1.length ? (
              <>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
                <button onClick={onAgain} className="btn-kid bg-blue-500">➕ More<br /><span className="text-xs">(עוד)</span></button>
              </>
            ) : (
              <>
                <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again<br /><span className="text-xs">(שוב)</span></button>
                <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex2 ───────────────────────────────────────────────────────────────────────

const EX2_ROUNDS = [PA_EX2, PA_EX2_R2]

function Ex2Round({
  roundIdx,
  onNextRound,
  onRestart,
}: {
  roundIdx: number
  onNextRound: () => void
  onRestart: () => void
}) {
  const questions = EX2_ROUNDS[roundIdx]
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const question = questions[currentIdx]
  const isLastRound = roundIdx === EX2_ROUNDS.length - 1

  const choose = (word: PossAdj) => {
    if (word === question.answer) {
      setCompleted(prev => [...prev, `${question.blank.replace('___', word)}`])
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(i => i + 1)
      } else {
        setFinished(true)
      }
    } else {
      setFlashWrong(word)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6 pb-16">
        <div className="text-center bounce-in mb-6">
          <div className="text-6xl mb-4">🌟</div>
          <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">סיימת את סבב {roundIdx + 1}!</p>
          <div className="flex gap-3 justify-center">
            {!isLastRound ? (
              <button onClick={onNextRound} className="btn-kid bg-blue-500">סבב הבא →</button>
            ) : (
              <button onClick={onRestart} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {questions.map((q, i) => (
            <div key={i} className="bg-violet-100 border-2 border-violet-200 rounded-xl px-3 py-1.5">
              <div className="text-xs text-violet-400 font-bold">{q.context}</div>
              <div className="font-bold text-violet-800 text-base">{q.blank.replace('___', q.answer)}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>סבב {roundIdx + 1} / {EX2_ROUNDS.length}</span>
        <span className="text-violet-500">{currentIdx} / {questions.length} ✓</span>
      </div>

      {/* Instruction */}
      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        לחץ על התשובה הנכונה. המעבר לשאלה הבאה הוא אוטומטי.
      </p>

      {/* Word bank */}
      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-3 mb-5">
        <div className="flex flex-wrap gap-2 justify-center">
          {PA_WORD_BANK.map(word => (
            <button
              key={word}
              onClick={() => choose(word)}
              className={`px-4 py-2 rounded-xl font-display font-black text-base border-2 transition-all ${
                flashWrong === word
                  ? 'bg-red-500 text-white border-red-500 scale-95'
                  : 'bg-white text-violet-700 border-violet-300 hover:bg-violet-100 active:scale-95'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Current question */}
      <div className="bg-white border-2 border-violet-200 rounded-2xl px-4 py-4 mb-4">
        <p className="text-sm font-bold text-black mb-1">{question.context}</p>
        <p className="text-xl font-bold text-gray-700">{question.blank}</p>
      </div>

      {/* Completed sentences */}
      {completed.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {completed.map((s, i) => (
            <div key={i} className="bg-violet-100 border-2 border-violet-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-violet-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-violet-800 text-base">{s}</span>
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Ex2() {
  const [roundIdx, setRoundIdx] = useState(0)
  const [key, setKey] = useState(0)

  return (
    <div key={key}>
      <Ex2Round
        roundIdx={roundIdx}
        onNextRound={() => { setRoundIdx(1); setKey(k => k + 1) }}
        onRestart={() => { setRoundIdx(0); setKey(k => k + 1) }}
      />
    </div>
  )
}

// ── Ex3 ───────────────────────────────────────────────────────────────────────

function Ex3() {
  const [filled, setFilled] = useState<Record<number, string>>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [dragOverBlank, setDragOverBlank] = useState<number | null>(null)
  const [flashWrong, setFlashWrong] = useState<number | null>(null)
  const allFilled = PA_EX3_BLANKS.every(b => filled[b.index] !== undefined)

  const tryPlace = (blankIdx: number, word: string) => {
    if (filled[blankIdx]) return
    const blank = PA_EX3_BLANKS.find(b => b.index === blankIdx)
    if (!blank) return
    if (word.toLowerCase() === blank.answer.toLowerCase()) {
      setFilled(prev => ({ ...prev, [blankIdx]: blank.answer }))
    } else {
      setFlashWrong(blankIdx)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  const handleDrop = (e: React.DragEvent, blankIdx: number) => {
    e.preventDefault()
    setDragOverBlank(null)
    const word = e.dataTransfer.getData('text/plain') || draggedWord
    if (word) tryPlace(blankIdx, word)
    setDraggedWord(null)
  }

  const restart = () => {
    setFilled({})
    setDraggedWord(null)
    setDragOverBlank(null)
    setFlashWrong(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Reading Passage</span>
        <span className="text-violet-500">{Object.keys(filled).length} / {PA_EX3_BLANKS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור מילה מהבנק אל המקום הריק המתאים
      </p>

      {/* Word bank — words always stay visible */}
      <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {PA_EX3_WORD_BANK.map(word => (
            <div
              key={word}
              draggable
              onDragStart={e => { setDraggedWord(word); e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move' }}
              onDragEnd={() => { setDraggedWord(null); setDragOverBlank(null) }}
              className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                draggedWord === word
                  ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105'
                  : 'bg-white text-violet-700 border-violet-300 hover:bg-violet-100'
              }`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Passage */}
      <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-relaxed">
        {PA_EX3_SEGMENTS.map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{seg.text}</span>
          }
          const blankIdx = seg.blankIndex!
          const val = filled[blankIdx]
          const isFlash = flashWrong === blankIdx
          const isOver = dragOverBlank === blankIdx
          return (
            <span
              key={i}
              data-drop-target="true"
              onDragOver={e => { if (!val) { e.preventDefault(); setDragOverBlank(blankIdx) } }}
              onDragLeave={() => setDragOverBlank(prev => prev === blankIdx ? null : prev)}
              onDrop={e => handleDrop(e, blankIdx)}
              className={`inline-block min-w-[3.5rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 text-center transition-all ${
                val
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : isFlash
                  ? 'bg-red-200 border-red-400 text-red-700 scale-95'
                  : isOver
                  ? 'bg-violet-100 border-violet-500 text-violet-500 scale-105'
                  : 'bg-violet-50 border-violet-300 text-violet-400'
              }`}
            >
              {val || `(${blankIdx + 1})`}
            </span>
          )
        })}
      </div>

      {allFilled && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Excellent work!</p>
          <button onClick={restart} className="btn-kid bg-blue-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PossessiveAdjectivesPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Possessive Adjectives 🏠</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">my, your, his, her, its, our, their</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
            cycles={PA_EX1.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && <Ex2 />}
        {tab === 'ex3' && <Ex3 />}
      </div>
    </div>
  )
}
