'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import {
  WH_WORDS, WH_WORD_COLORS, WH_EX1, WH_EX2, WH_EX3,
} from '@/data/step2/wh-questions'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-amber-700 text-center mb-1">
          WH Questions
        </h2>
        <p className="font-bold text-amber-700 text-sm text-center mb-4" dir="rtl">
          שאלות Wh
        </p>

        <div className="flex flex-col gap-1 text-sm font-bold text-amber-800 mb-5" dir="rtl">
          <p>• שאלות wh נקראות כך כי הן מתחילות ב- wh.</p>
        </div>

        {/* WH word grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {WH_WORDS.map(({ word, hebrew, light, text }) => (
            <div key={word} className={`${light} border-2 border-opacity-40 rounded-2xl px-4 py-2 flex items-center justify-between`}>
              <span className={`font-display font-black text-xl ${text}`}>{word}</span>
              <span className={`font-bold text-sm ${text} opacity-80`} dir="rtl">{hebrew}</span>
            </div>
          ))}
        </div>

        {/* Example questions */}
        <div className="flex flex-col gap-1.5">
          {[
            { wh: 'Who',   rest: 'is in the room?',   color: WH_WORD_COLORS['Who']   },
            { wh: 'Where', rest: 'is my dog?',         color: WH_WORD_COLORS['Where'] },
            { wh: 'What',  rest: 'is your name?',      color: WH_WORD_COLORS['What']  },
            { wh: 'How',   rest: 'are you?',           color: WH_WORD_COLORS['How']   },
          ].map(({ wh, rest, color }) => (
            <div key={wh} className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-1.5 border-2 border-amber-100">
              <span className={`font-display font-black text-base ${color.text}`}>{wh}</span>
              <span className="font-bold text-gray-700 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Pick the correct WH word ───────────────────────────────────────────

function Ex1() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [key, setKey] = useState(0)
  const answered = Object.keys(answers).length
  const allDone = answered === WH_EX1.length

  const handleChoice = (qIdx: number, choice: string) => {
    if (answers[qIdx]) return
    if (choice !== WH_EX1[qIdx].answer) return
    setAnswers(prev => ({ ...prev, [qIdx]: choice }))
  }

  return (
    <div key={key} className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Choose the correct WH word</span>
        <span className="text-amber-500">{answered} / {WH_EX1.length} ✓</span>
      </div>
      <p className="text-center font-bold text-gray-400 text-xs mb-4" dir="rtl">
        בחר את מילת השאלה הנכונה לפי התשובה בסוגריים
      </p>

      <div className="flex flex-col gap-3 mb-5">
        {WH_EX1.map((q, idx) => {
          const chosen = answers[idx]
          const vc = chosen ? WH_WORD_COLORS[chosen] : null
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl px-3 py-3">
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
                {chosen && vc ? (
                  <span className={`font-display font-black text-base ${vc.text}`}>{chosen}</span>
                ) : (
                  <span className="text-gray-300 font-bold text-base">___</span>
                )}
                <span className="font-bold text-gray-700 text-base">{q.sentence}</span>
                <span className="font-bold text-gray-400 text-sm">({q.hint})</span>
              </div>

              {!chosen && (
                <div className="flex gap-2 flex-wrap">
                  {q.options.map(opt => {
                    const oc = WH_WORD_COLORS[opt]
                    return (
                      <button
                        key={opt}
                        onClick={() => handleChoice(idx, opt)}
                        className={`font-display font-black text-sm px-3 py-1 rounded-xl border-2 transition-colors ${oc.light} ${oc.text} border-opacity-40 hover:opacity-80 active:scale-95`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <button
            onClick={() => { setAnswers({}); setKey(k => k + 1) }}
            className="btn-kid bg-blue-500"
          >
            🔁 Start Over
          </button>
        </div>
      )}
    </div>
  )
}

// ── Ex 2: Dialogue matching (drag-and-drop) ───────────────────────────────────

function Ex2Cycle({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = WH_EX2[cycleIdx]
  const [placed, setPlaced] = useState<Record<number, number>>({}) // dialogueIdx → bankIdx
  const allDone = Object.keys(placed).length === cycle.dialogues.length

  const usedBankIdxs = new Set(Object.values(placed))

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const diStr = targetEl.getAttribute('data-target-id')
    if (diStr === null) return false
    const di = parseInt(diStr)
    if (placed[di] !== undefined) return false
    const qi = parseInt(tileId)
    if (cycle.bank[qi] !== cycle.dialogues[di].question) return false
    setPlaced(prev => ({ ...prev, [di]: qi }))
    return true
  }, [placed, cycle])

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
        <span>Cycle {cycleIdx + 1} / {WH_EX2.length}</span>
        <span className="text-amber-500">{Object.keys(placed).length} / {cycle.dialogues.length} ✓</span>
      </div>
      <p className="text-center font-bold text-amber-400 text-sm mb-3" dir="rtl">לתרגול זה 3 סבבים</p>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור את השאלה המתאימה לכל דיאלוג
      </p>

      {/* Question bank */}
      <div className="sticky top-2 z-10 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 mb-4">
        <p className="font-bold text-amber-600 text-xs mb-2 text-center">Question bank — גרור שאלה:</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {cycle.bank.map((q, qi) => {
            if (usedBankIdxs.has(qi)) return null
            const whWord = q.split(' ')[0]
            const wc = WH_WORD_COLORS[whWord] ?? { bg: 'bg-gray-400', light: 'bg-gray-100', text: 'text-gray-600' }
            return (
              <DraggableTile
                key={qi}
                id={String(qi)}
                label={q}
                color={wc.bg}
                borderColor="border-transparent"
                textColor="text-white"
                size="sm"
                className="!w-auto px-3 text-xs"
                onDropped={handleDrop}
              />
            )
          })}
        </div>
      </div>

      {/* Dialogue rows */}
      <div className="flex flex-col gap-2 mb-5">
        {cycle.dialogues.map((d, di) => {
          const placedBankIdx = placed[di]
          const placedQ = placedBankIdx !== undefined ? cycle.bank[placedBankIdx] : null
          const whWord = placedQ ? placedQ.split(' ')[0] : null
          const wc = whWord ? (WH_WORD_COLORS[whWord] ?? null) : null
          return (
            <div key={di} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-3 py-1.5 border-b border-gray-100 flex items-center gap-2">
                <span className="font-bold text-gray-500 text-sm w-16 flex-shrink-0">{d.asker}:</span>
                <div
                  data-drop-target="true"
                  data-target-id={String(di)}
                  className={`flex-1 min-h-[32px] text-left text-sm font-bold rounded-lg px-2 py-1 transition-all ${
                    placedQ
                      ? wc ? `${wc.light} ${wc.text}` : 'bg-green-100 text-green-700'
                      : 'bg-amber-50 border-2 border-dashed border-amber-300 text-amber-300'
                  }`}
                >
                  {placedQ ?? '_______________?'}
                </div>
              </div>
              <div className="px-3 py-1.5 flex items-center gap-2 bg-gray-50/50">
                <span className="font-bold text-gray-500 text-sm w-16 flex-shrink-0">{d.answerer}:</span>
                <span className="font-bold text-gray-700 text-sm italic">{d.answer}</span>
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great work!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < WH_EX2.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 3: Drag answer to matching question ────────────────────────────────────

function Ex3Cycle({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = WH_EX3[cycleIdx]
  const [placed, setPlaced] = useState<Record<number, string>>({}) // qIdx → answerId
  const allDone = Object.keys(placed).length === questions.length

  const placedIds = new Set(Object.values(placed))

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const qIdxStr = targetEl.getAttribute('data-target-id')
    if (qIdxStr === null) return false
    const qIdx = parseInt(qIdxStr)
    if (placed[qIdx] !== undefined) return false
    if (tileId !== questions[qIdx].id) return false
    setPlaced(prev => ({ ...prev, [qIdx]: tileId }))
    return true
  }, [placed, questions])

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
        <span>Cycle {cycleIdx + 1} / {WH_EX3.length}</span>
        <span className="text-amber-500">{Object.keys(placed).length} / {questions.length} ✓</span>
      </div>
      <p className="text-center font-bold text-amber-400 text-sm mb-3" dir="rtl">לתרגול זה 3 סבבים</p>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור את התשובה המתאימה לכל שאלה
      </p>

      {/* Answer bank */}
      <div className="sticky top-2 z-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {questions.map(q => {
            if (placedIds.has(q.id)) return null
            const whWord = q.question.split(' ')[0]
            const wc = WH_WORD_COLORS[whWord] ?? { bg: 'bg-gray-400', light: 'bg-gray-100', text: 'text-gray-600' }
            return (
              <DraggableTile
                key={q.id}
                id={q.id}
                label={q.answer}
                color={wc.bg}
                borderColor="border-transparent"
                textColor="text-white"
                size="sm"
                className="!w-auto px-3 text-xs"
                onDropped={handleDrop}
              />
            )
          })}
        </div>
      </div>

      {/* Question rows */}
      <div className="flex flex-col gap-2 mb-5">
        {questions.map((q, qIdx) => {
          const isPlaced = placed[qIdx] !== undefined
          const whWord = q.question.split(' ')[0]
          const wc = WH_WORD_COLORS[whWord] ?? { light: 'bg-gray-100', text: 'text-gray-600' }
          return (
            <div key={q.id} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base text-gray-900">{q.question}</span>
              <div
                data-drop-target="true"
                data-target-id={String(qIdx)}
                className={`flex-1 min-h-[32px] rounded-lg border-2 flex items-center px-2 ${
                  isPlaced
                    ? `${wc.light} border-transparent`
                    : 'border-dashed border-gray-300 bg-gray-50'
                }`}
              >
                {isPlaced ? (
                  <span className={`font-bold text-sm ${wc.text} bounce-in`}>{q.answer}</span>
                ) : (
                  <span className="text-gray-300 text-xs font-bold">___</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Excellent!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < WH_EX3.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

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

// ── Page ────────────────────────────────────────────────────────────────────

export default function WHQuestionsPage() {
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

      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">WH Questions 🔍</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שאלות wh</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Where is dad? · Who is she? · When is the party?</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1'   && <Ex1 />}
        {tab === 'ex2'   && (
          <ExWrapper
            cycles={WH_EX2.length}
            render={(c, again, done) => <Ex2Cycle key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3'   && (
          <ExWrapper
            cycles={WH_EX3.length}
            render={(c, again, done) => <Ex3Cycle key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
