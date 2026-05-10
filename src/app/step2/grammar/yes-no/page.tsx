'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import {
  YN_EX1, YN_EX2, YN_EX3, YN_ANSWER_BANK, PRONOUN_GROUPS,
  type YNSubject, type PronounGroup, type YNVerb,
} from '@/data/step2/yes-no'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

const VERB_COLORS = {
  Am:  { bg: 'bg-indigo-500',  border: 'border-indigo-400',  light: 'bg-indigo-50',  text: 'text-indigo-700',  badge: 'bg-indigo-200 text-indigo-800'  },
  Is:  { bg: 'bg-emerald-500', border: 'border-emerald-400', light: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800' },
  Are: { bg: 'bg-orange-500',  border: 'border-orange-400',  light: 'bg-orange-50',  text: 'text-orange-700',  badge: 'bg-orange-200 text-orange-800'  },
} as const

const VERBS: YNVerb[] = ['Am', 'Is', 'Are']

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">

      {/* Forming questions card */}
      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-sky-700 text-center mb-1">
          שאלות כן / לא
        </h2>
        <p className="font-bold text-sky-700 text-sm text-center mb-4">
          Yes / No Questions
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-sky-800 mb-4" dir="rtl">
          <p>• שאלות כן / לא (yes, no) נקראות כך כי התשובות עליהן – ״כן״ או ״לא״</p>
          <p>• שאלות כן / לא – תמיד מתחילות ב- are, am, is</p>
        </div>

        {/* Statement → Question examples */}
        <div className="flex flex-col gap-3">
          {[
            { stmt: 'I', verb: 'am' as const, rest: 'in my room.', qVerb: 'Am' as const, qSub: 'I', qRest: 'in my room?' },
            { stmt: 'He', verb: 'is' as const, rest: 'happy.', qVerb: 'Is' as const, qSub: 'he', qRest: 'happy?' },
            { stmt: 'You', verb: 'are' as const, rest: 'late.', qVerb: 'Are' as const, qSub: 'you', qRest: 'late?' },
          ].map(({ stmt, verb, rest, qVerb, qSub, qRest }) => (
            <div key={stmt + verb} className="bg-white rounded-2xl border-2 border-sky-200 p-3">
              <div className="flex items-center gap-1 mb-1.5">
                <span className="font-bold text-gray-700 text-base">{stmt}</span>
                <span className="font-black text-sm text-gray-500">{verb}</span>
                <span className="font-bold text-gray-700 text-base">{rest}</span>
              </div>
              <div className="flex items-center gap-1 text-sky-600">
                <span className="text-sky-400 font-black mr-1">→</span>
                <span className={`font-display font-black text-base ${VERB_COLORS[qVerb].text}`}>{qVerb}</span>
                <span className="font-bold text-sky-700 text-base">{qSub}</span>
                <span className="font-bold text-sky-700 text-base">{qRest}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Short answers card */}
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 mb-1">תשובות קצרות</h2>
        <p className="font-bold text-amber-700 text-sm mb-3" dir="rtl">
          בדרך כלל עונים על שאלות כן / לא בתשובות קצרות.
        </p>

        <div className="flex flex-col gap-3">
          {[
            {
              q: 'Am I in my room?',
              yes: 'Yes, I am.',
              no: "No, I'm not.",
            },
            {
              q: 'Is he happy?',
              yes: 'Yes, he is.',
              no: "No, he isn't.",
            },
            {
              q: 'Are you at home?',
              yes: 'Yes, we are.',
              no: "No, we aren't.",
            },
          ].map(({ q, yes, no }) => (
            <div key={q} className="bg-white rounded-2xl border-2 border-amber-200 p-3">
              <p className="font-bold text-amber-800 text-base mb-1.5 italic">{q}</p>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-xl">{yes}</span>
                <span className="bg-rose-100 text-rose-700 font-bold text-sm px-3 py-1 rounded-xl">{no}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Drag Am/Is/Are to start of question ─────────────────────────────────

function Ex1({ onReset }: { onReset: () => void }) {
  const [allTiles] = useState(() =>
    VERBS.flatMap(v =>
      Array.from({ length: 12 }, (_, i) => ({ id: `${v}-${i}`, verb: v }))
    )
  )
  const [placed, setPlaced] = useState<Record<number, string>>({})
  const allDone = Object.keys(placed).length === YN_EX1.length

  const usedIds = new Set(Object.values(placed))

  const bankTiles = VERBS.map(v =>
    allTiles.find(t => t.verb === v && !usedIds.has(t.id))
  ).filter((t): t is { id: string; verb: YNVerb } => t !== undefined)

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const idxStr = targetEl.getAttribute('data-target-id')
    if (idxStr === null) return false
    const qIdx = parseInt(idxStr)
    if (placed[qIdx] !== undefined) return false
    const tile = allTiles.find(t => t.id === tileId)
    if (!tile) return false
    if (tile.verb !== YN_EX1[qIdx].answer) return false
    setPlaced(prev => ({ ...prev, [qIdx]: tileId }))
    return true
  }, [placed, allTiles])

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Complete the questions</span>
        <span className="text-sky-500">{Object.keys(placed).length} / {YN_EX1.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Drag <span className="font-black text-gray-500">Am / Is / Are</span> to start each question
      </p>

      {/* Tile bank */}
      <div className="sticky top-2 z-10 flex gap-3 justify-center mb-5 p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        {bankTiles.map(t => {
          const vc = VERB_COLORS[t.verb]
          return (
            <DraggableTile
              key={t.id}
              id={t.id}
              label={t.verb}
              color={vc.bg}
              borderColor="border-transparent"
              textColor="text-white"
              size="sm"
              className="!w-auto px-3"
              onDropped={handleDrop}
            />
          )
        })}
      </div>

      {/* Question rows */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {YN_EX1.map((q, idx) => {
          const placedTileId = placed[idx]
          const placedTile = placedTileId ? allTiles.find(t => t.id === placedTileId) : undefined
          const vc = placedTile ? VERB_COLORS[placedTile.verb] : null
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <div
                data-drop-target="true"
                data-target-id={String(idx)}
                className={`min-w-[44px] min-h-[32px] rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${placedTile ? 'border-transparent' : 'border-dashed border-gray-300'}`}
              >
                {placedTile && vc ? (
                  <span className={`${vc.badge} font-display font-black text-sm px-2 py-0.5 rounded-lg bounce-in`}>{placedTile.verb}</span>
                ) : (
                  <span className="text-gray-300 text-xs font-bold">___</span>
                )}
              </div>
              <span className="text-base font-bold text-gray-700">{q.after}</span>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <button onClick={onReset} className="btn-kid bg-blue-500">🔁 Start Over</button>
        </div>
      )}
    </div>
  )
}

function Ex1Wrapper() {
  const [key, setKey] = useState(0)
  return <Ex1 key={key} onReset={() => setKey(k => k + 1)} />
}

// ── Ex 2: Question sentence builder ──────────────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = YN_EX2[cycleIdx]
  const [selVerb, setSelVerb] = useState<YNVerb | null>(null)
  const [selSubject, setSelSubject] = useState<YNSubject | null>(null)
  const [selComp, setSelComp] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedComps, setUsedComps] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length

  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availableComps = cycle.complements.filter(c => !usedComps.has(c))

  const handleAdd = () => {
    if (!selVerb || !selSubject || !selComp) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selVerb} ${selSubject.text} ${selComp}`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedComps(prev => { const s = new Set(prev); s.add(selComp); return s })
    setSelVerb(null)
    setSelSubject(null)
    setSelComp(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
        <span>Cycle {cycleIdx + 1} / {YN_EX2.length}</span>
        <span className="text-sky-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>
      <p className="text-center font-bold text-sky-400 text-sm mb-3" dir="rtl">לתרגול זה 3 סבבים</p>

      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 mb-3 text-sm font-bold text-sky-700" dir="rtl">
        <p>1. יש ליצור 6 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Verb</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {VERBS.map(v => {
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

          {/* Subject column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Subject</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-base font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Complement column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Phrase</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableComps.map(c => (
                <button
                  key={c}
                  onClick={() => setSelComp(c)}
                  className={`text-base font-bold rounded-lg px-2 py-1 text-center transition-colors ${selComp === c ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview + Add */}
      {selVerb && selSubject && selComp && !allDone && (
        <div className="bg-sky-50 border-2 border-sky-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-sky-700 text-base flex-1">
            {selVerb} {selSubject.text} {selComp}
          </span>
          <button onClick={handleAdd} className="btn-kid bg-sky-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>
      )}

      {/* Built sentences */}
      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-sky-100 border-2 border-sky-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-sky-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-sky-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Great questions!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < YN_EX2.length ? (
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

// ── Ex 3: Click yes/no answer for question ────────────────────────────────────

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [flash, setFlash] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  const q = YN_EX3[current]
  const isLast = current === YN_EX3.length - 1

  const handleClick = (group: PronounGroup, side: 'yes' | 'no') => {
    if (flash) return
    if (group !== q.group) return
    const tileKey = `${group}-${side}`
    setFlash(tileKey)
    setTimeout(() => {
      setFlash(null)
      if (isLast) setFinished(true)
      else setCurrent(c => c + 1)
    }, 350)
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל 15 השאלות!</p>
        <button
          onClick={() => { setCurrent(0); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return (
    <div key={key} className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {YN_EX3.length}</span>
        <span className="text-sky-500">{current} ✓</span>
      </div>

      {/* Question card */}
      <div className="bg-sky-50 border-4 border-sky-300 rounded-3xl p-6 text-center mb-5">
        <p className="font-bold text-gray-400 text-xs mb-1" dir="rtl">גרור / לחץ על התשובה הנכונה</p>
        <p className="font-display font-black text-2xl text-sky-700">{q.question}</p>
      </div>

      {/* Answer bank: yes | no columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* YES column */}
        <div className="flex flex-col gap-1.5">
          <div className="bg-green-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">YES ✓</span>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {PRONOUN_GROUPS.map(g => {
              const tileKey = `${g}-yes`
              const isFlashing = flash === tileKey
              return (
                <button
                  key={g}
                  onClick={() => handleClick(g, 'yes')}
                  className={`text-base font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                    isFlashing
                      ? 'bg-green-500 text-white border-green-500 scale-105'
                      : 'bg-white text-green-700 border-green-200 hover:bg-green-100 active:scale-95'
                  }`}
                >
                  {YN_ANSWER_BANK[g].yes}
                </button>
              )
            })}
          </div>
        </div>

        {/* NO column */}
        <div className="flex flex-col gap-1.5">
          <div className="bg-rose-500 rounded-t-xl py-1.5 text-center">
            <span className="font-display font-black text-white text-sm">NO ✗</span>
          </div>
          <div className="bg-rose-50 border-2 border-rose-200 rounded-b-xl p-1.5 flex flex-col gap-1">
            {PRONOUN_GROUPS.map(g => {
              const tileKey = `${g}-no`
              const isFlashing = flash === tileKey
              return (
                <button
                  key={g}
                  onClick={() => handleClick(g, 'no')}
                  className={`text-base font-bold rounded-lg px-2 py-1.5 text-center transition-all border-2 ${
                    isFlashing
                      ? 'bg-rose-500 text-white border-rose-500 scale-105'
                      : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-100 active:scale-95'
                  }`}
                >
                  {YN_ANSWER_BANK[g].no}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Wrapper with cycle management ─────────────────────────────────────────────

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

export default function YesNoPage() {
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
      <div className="bg-gradient-to-r from-sky-500 to-cyan-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">To Be — Yes/No Questions ❓</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">
            שאלות שהתשובה עליהן כן או לא
          </p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Am I? · Is she? · Are you?</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1'   && <Ex1Wrapper />}
        {tab === 'ex2'   && (
          <ExWrapper
            cycles={YN_EX2.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
