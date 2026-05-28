'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  HH_POS_EX1, HH_POS_EX2,
  type HHSubject, type HHVerb,
} from '@/data/step3/has-have'

type Tab = 'learn' | 'ex1' | 'ex2'

const VERB_COLORS = {
  have: { bg: 'bg-teal-500',    border: 'border-teal-400',    light: 'bg-teal-50',    text: 'text-teal-700',    badge: 'bg-teal-200 text-teal-800'    },
  has:  { bg: 'bg-emerald-500', border: 'border-emerald-400', light: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800' },
} as const

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-teal-50 border-4 border-teal-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-teal-700 text-center mb-3">
          have · has
        </h2>
        <p className="font-bold text-teal-800 text-base mb-1" dir="rtl">
          הפועל have = יש — יש לו 2 צורות
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <div className={`${VERB_COLORS.have.bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">have</div>
            <div className="text-white/80 font-bold text-sm">I, you, we, they</div>
          </div>
          <div className={`${VERB_COLORS.has.bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">has</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-3 border-2 border-teal-200">
            <div className="font-display font-black text-teal-700 text-center text-base mb-2">יחיד (Singular)</div>
            {[
              ['I',   'have', 'אני'],
              ['You', 'have', 'אתה, את'],
              ['He',  'has',  'הוא'],
              ['She', 'has',  'היא'],
              ['It',  'has',  'זה / זו'],
            ].map(([pronoun, verb, heb]) => (
              <div key={pronoun + heb} className="flex justify-between items-center text-base py-0.5 border-b border-teal-100">
                <span className="font-bold text-teal-700">{pronoun}</span>
                <span className={`font-black text-sm ${VERB_COLORS[verb as HHVerb].text}`}>{verb}</span>
                <span className="text-gray-500 text-sm" dir="rtl">{heb}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-teal-200">
            <div className="font-display font-black text-teal-700 text-center text-base mb-2">רבים (Plural)</div>
            {[
              ['We',   'have', 'אנחנו'],
              ['You',  'have', 'אתם, אתן'],
              ['They', 'have', 'הם, הן'],
            ].map(([pronoun, verb, heb]) => (
              <div key={pronoun + heb} className="flex justify-between items-center text-base py-0.5 border-b border-teal-100">
                <span className="font-bold text-teal-700">{pronoun}</span>
                <span className={`font-black text-sm ${VERB_COLORS[verb as HHVerb].text}`}>{verb}</span>
                <span className="text-gray-500 text-sm" dir="rtl">{heb}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {[
            { before: 'The cat', verb: 'has' as HHVerb,  after: 'a toy.' },
            { before: 'We',      verb: 'have' as HHVerb, after: 'a big house.' },
            { before: 'I',       verb: 'have' as HHVerb, after: 'a book.' },
          ].map(({ before, verb, after }) => (
            <div key={before} className="flex items-center gap-1 bg-teal-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-teal-700 text-base">{before}</span>
              <span className={`font-black text-base ${VERB_COLORS[verb].text}`}>{verb}</span>
              <span className="font-bold text-teal-700 text-base">{after}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Click have / has ────────────────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = HH_POS_EX1[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Set<number>>(new Set())
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: HHVerb) => {
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
        <span>Cycle {cycleIdx + 1} / {HH_POS_EX1.length}</span>
        <span className="text-teal-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחצו על הפועל הנכון</p>
      <p className="text-center font-bold text-teal-400 text-sm mb-4" dir="rtl">לתרגול זה 3 סבבים</p>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const isWrong = wrongs.has(idx)
          const display = ans ? q.sentence.replace('___', ans) : q.sentence
          return (
            <div key={idx} className={`bg-white border-2 rounded-xl px-2 py-1.5 flex items-center gap-2 ${isWrong ? 'border-red-300' : 'border-gray-200'}`}>
              <span className="text-base font-bold text-gray-700 flex-1">{display}</span>
              {!ans && !isWrong ? (
                <div className="flex gap-1.5">
                  {(['have', 'has'] as const).map(v => {
                    const vc = VERB_COLORS[v]
                    return (
                      <button
                        key={v}
                        onClick={() => choose(idx, v)}
                        className={`px-2 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors ${vc.border} ${vc.light} ${vc.text} hover:opacity-80 active:scale-95`}
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
            {cycleIdx + 1 < HH_POS_EX1.length ? (
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
  const cycle = HH_POS_EX2[cycleIdx]
  const [selSubject, setSelSubject] = useState<HHSubject | null>(null)
  const [selVerb, setSelVerb] = useState<HHVerb | null>(null)
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
        <span>Cycle {cycleIdx + 1} / {HH_POS_EX2.length}</span>
        <span className="text-teal-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 mb-3 text-sm font-bold text-teal-700" dir="rtl">
        <p>1. יש ליצור 6 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col gap-1.5">
            <div className="bg-teal-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-teal-50 border-2 border-teal-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-base font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-teal-500 text-white' : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">have / has</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(['have', 'has'] as const).map(v => {
                const vc = VERB_COLORS[v]
                return (
                  <button
                    key={v}
                    onClick={() => setSelVerb(v)}
                    className={`text-base font-display font-black rounded-lg px-2 py-1 text-center transition-colors border-2 ${selVerb === v ? `${vc.bg} text-white ${vc.border}` : `${vc.light} ${vc.text} ${vc.border} hover:opacity-80`}`}
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
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-teal-700 text-base flex-1">
            {selSubject.text} {selVerb} {selNoun}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-teal-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-teal-100 border-2 border-teal-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-teal-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-teal-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < HH_POS_EX2.length ? (
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

export default function HasHavePositivePage() {
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

      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step3/grammar/has-have" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Have / Has</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Positive ✅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">have · has — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">I have · She has · They have</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
            cycles={HH_POS_EX1.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={HH_POS_EX2.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
