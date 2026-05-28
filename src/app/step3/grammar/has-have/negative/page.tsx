'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  HH_NEG_EX1, HH_NEG_EX2, HH_NEG_EX3,
  type HHNegSubject, type HHNegVerb,
} from '@/data/step3/has-have'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

const NEG_COLORS = {
  "don't have":   { bg: 'bg-teal-500',    border: 'border-teal-400',    light: 'bg-teal-50',    text: 'text-teal-700',    badge: 'bg-teal-200 text-teal-800'    },
  "doesn't have": { bg: 'bg-rose-500',    border: 'border-rose-400',    light: 'bg-rose-50',    text: 'text-rose-700',    badge: 'bg-rose-200 text-rose-800'    },
} as const

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-1">
          don't have · doesn't have
        </h2>
        <p className="font-bold text-rose-700 text-sm text-center mb-4" dir="rtl">
          צורת השלילה של have
        </p>

        <p className="font-bold text-rose-800 text-sm mb-3" dir="rtl">
          כדי לחבר משפט שלילה עם have, מוסיפים <span className="font-black">don't</span> או <span className="font-black">doesn't</span> לפני המילה have.
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <div className={`${NEG_COLORS["don't have"].bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">don't have</div>
            <div className="text-white/80 font-bold text-sm">I, you, we, they</div>
          </div>
          <div className={`${NEG_COLORS["doesn't have"].bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">doesn't have</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-3 border-2 border-rose-200">
            <div className="font-display font-black text-rose-700 text-center text-base mb-2">יחיד (Singular)</div>
            {[
              ['I',   "don't have"],
              ['You', "don't have"],
              ['He',  "doesn't have"],
              ['She', "doesn't have"],
              ['It',  "doesn't have"],
            ].map(([p, v]) => (
              <div key={p} className="flex justify-between items-center py-0.5 border-b border-rose-100">
                <span className="font-bold text-rose-700 text-sm">{p}</span>
                <span className={`font-black text-xs ${NEG_COLORS[v as HHNegVerb].text}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-rose-200">
            <div className="font-display font-black text-rose-700 text-center text-base mb-2">רבים (Plural)</div>
            {[
              ['We',   "don't have"],
              ['You',  "don't have"],
              ['They', "don't have"],
            ].map(([p, v]) => (
              <div key={p} className="flex justify-between items-center py-0.5 border-b border-rose-100">
                <span className="font-bold text-rose-700 text-sm">{p}</span>
                <span className={`font-black text-xs ${NEG_COLORS[v as HHNegVerb].text}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { before: 'The cat',  neg: "doesn't have" as HHNegVerb, after: 'a toy.' },
            { before: 'We',       neg: "don't have" as HHNegVerb,   after: 'a dog.' },
            { before: 'I',        neg: "don't have" as HHNegVerb,   after: 'a book.' },
          ].map(({ before, neg, after }) => (
            <div key={before} className="flex items-center gap-1.5 bg-rose-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-rose-700 text-base">{before}</span>
              <span className={`font-black text-base ${NEG_COLORS[neg].text}`}>{neg}</span>
              <span className="font-bold text-rose-700 text-base">{after}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Click don't have / doesn't have ────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = HH_NEG_EX1[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: HHNegVerb) => {
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
        <span>Cycle {cycleIdx + 1} / {HH_NEG_EX1.length}</span>
        <span className="text-rose-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחצו על הפועל הנכון</p>
      <p className="text-center font-bold text-rose-400 text-sm mb-4" dir="rtl">לתרגול זה 3 סבבים</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          const display = ans ? q.sentence.replace('___', ans) : q.sentence
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl px-2 py-1.5 flex items-center gap-2 flex-wrap ${isWrong ? 'border-red-300' : 'border-gray-200'}`}>
              <span className="text-base font-bold text-gray-700 flex-1">{display}</span>
              {!ans && !isWrong ? (
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {(["don't have", "doesn't have"] as const).map(v => {
                    const vc = NEG_COLORS[v]
                    return (
                      <button
                        key={v}
                        onClick={() => choose(idx, v)}
                        className={`px-2 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors ${vc.border} ${vc.light} ${vc.text} hover:opacity-80 active:scale-95`}
                      >
                        {v}
                      </button>
                    )
                  })}
                </div>
              ) : isWrong ? (
                <span className="font-bold text-sm text-red-500">✗</span>
              ) : (
                <span className="font-bold text-sm text-green-600">✓</span>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">{total}/{total} correct!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < HH_NEG_EX1.length ? (
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

// ── Ex 2: Sentence builder ────────────────────────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = HH_NEG_EX2[cycleIdx]
  const [selSubject, setSelSubject] = useState<HHNegSubject | null>(null)
  const [selVerb, setSelVerb] = useState<HHNegVerb | null>(null)
  const [selNoun, setSelNoun] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedNouns, setUsedNouns] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length
  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availableNouns = cycle.nouns.filter(n => !usedNouns.has(n))

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selNoun) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selSubject.text} ${selVerb} ${selNoun}.`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedNouns(prev => { const s = new Set(prev); s.add(selNoun); return s })
    setSelSubject(null)
    setSelVerb(null)
    setSelNoun(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {HH_NEG_EX2.length}</span>
        <span className="text-rose-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 text-sm font-bold text-rose-700" dir="rtl">
        <p>1. יש ליצור 5 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col gap-1.5">
            <div className="bg-rose-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-base font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-rose-500 text-white' : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="bg-gray-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Neg. verb</span>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(["don't have", "doesn't have"] as const).map(v => {
                const vc = NEG_COLORS[v]
                return (
                  <button
                    key={v}
                    onClick={() => setSelVerb(v)}
                    className={`text-xs font-display font-black rounded-lg px-2 py-1 text-center transition-colors border-2 ${selVerb === v ? `${vc.bg} text-white ${vc.border}` : `${vc.light} ${vc.text} ${vc.border} hover:opacity-80`}`}
                  >
                    {v}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Noun</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableNouns.map(n => (
                <button
                  key={n}
                  onClick={() => setSelNoun(n)}
                  className={`text-base font-bold rounded-lg px-2 py-1 text-center transition-colors ${selNoun === n ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selVerb && selNoun && !allDone && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-rose-700 text-base flex-1">
            {selSubject.text} {selVerb} {selNoun}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-rose-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-rose-100 border-2 border-rose-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-rose-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-rose-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < HH_NEG_EX2.length ? (
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

// ── Ex 3: Type the negative form ──────────────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = HH_NEG_EX3[current]
  const isLast = current === HH_NEG_EX3.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const submit = () => {
    if (!input.trim()) return
    const trimmed = input.trim().toLowerCase()
    if (trimmed === q.answer.toLowerCase()) {
      setStatus('correct')
      setTimeout(() => {
        if (isLast) {
          setFinished(true)
        } else {
          setCurrent(c => c + 1)
          setInput('')
          setStatus('idle')
        }
      }, 600)
    } else {
      setStatus('wrong')
      setTimeout(() => {
        setStatus('idle')
        setInput('')
      }, 800)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל 10 השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setInput(''); setStatus('idle'); setFinished(false) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {HH_NEG_EX3.length}</span>
        <span className="text-rose-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        שנה את המשפט לשלילה — הקלד בחלל הריק
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Change to negative — type in the blank
      </p>

      <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-teal-500 mb-1">✅ Positive:</p>
        <p className="font-bold text-teal-800 text-lg">{q.positive}</p>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        status === 'correct' ? 'bg-green-50 border-green-300' :
        'bg-white border-gray-200'
      }`}>
        <p className="text-xs font-bold text-gray-500 mb-3">🚫 Negative:</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-700 text-base">{q.before}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { if (status === 'idle') setInput(e.target.value) }}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder="type here..."
            className={`border-b-2 font-bold text-base text-center min-w-[140px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              status === 'correct' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {status === 'correct' && <span className="text-xl">✅</span>}
        </div>
      </div>

      {status === 'idle' && (
        <div className="flex justify-center">
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="btn-kid bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ✔ Check
          </button>
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HasHaveNegativePage() {
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

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/has-have" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Have / Has</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Negative 🚫</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">don't have · doesn't have — צורת השלילה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I don't have · She doesn't have</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
            cycles={HH_NEG_EX1.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={HH_NEG_EX2.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3' && <Ex3 />}
      </div>
    </div>
  )
}
