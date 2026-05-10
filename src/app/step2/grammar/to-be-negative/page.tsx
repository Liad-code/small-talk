'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { TBN_EX1, TBN_EX2, type TBNSubject } from '@/data/step2/to-be-negative'

type Tab = 'learn' | 'ex1' | 'ex2'
type NegVerb = 'am not' | "isn't" | "aren't"

const NEG_COLORS: Record<NegVerb, { bg: string; border: string; light: string; text: string; badge: string }> = {
  'am not': { bg: 'bg-indigo-500',  border: 'border-indigo-400',  light: 'bg-indigo-50',  text: 'text-indigo-700',  badge: 'bg-indigo-200 text-indigo-800'  },
  "isn't":  { bg: 'bg-emerald-500', border: 'border-emerald-400', light: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800' },
  "aren't": { bg: 'bg-orange-500',  border: 'border-orange-400',  light: 'bg-orange-50',  text: 'text-orange-700',  badge: 'bg-orange-200 text-orange-800'  },
}

const NEG_VERBS: NegVerb[] = ['am not', "isn't", "aren't"]

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">

      {/* Negative conjugation card */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-1">
          am not · isn't · aren't
        </h2>
        <p className="font-bold text-rose-700 text-sm text-center mb-4" dir="rtl">
          צורת השלילה של to be
        </p>

        <p className="font-bold text-rose-800 text-sm mb-3" dir="rtl">
          כדי לחבר משפט שלילה עם to be, מוסיפים את המילה <span className="font-black">not</span> אחרי המילים am, is, are.
        </p>

        {/* Conjugation table */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl p-3 border-2 border-rose-200">
            <div className="font-display font-black text-rose-700 text-center text-base mb-2">יחיד (Singular)</div>
            {[
              ['I',   'am not'],
              ['You', 'are not'],
              ['He',  'is not'],
              ['She', 'is not'],
              ['It',  'is not'],
            ].map(([pronoun, neg]) => (
              <div key={pronoun} className="flex justify-between items-center text-base py-0.5 border-b border-rose-100">
                <span className="font-bold text-rose-700">{pronoun}</span>
                <span className="font-black text-rose-500 text-sm">{neg}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-rose-200">
            <div className="font-display font-black text-rose-700 text-center text-base mb-2">רבים (Plural)</div>
            {[
              ['We',   'are not'],
              ['You',  'are not'],
              ['They', 'are not'],
            ].map(([pronoun, neg]) => (
              <div key={pronoun} className="flex justify-between items-center text-base py-0.5 border-b border-rose-100">
                <span className="font-bold text-rose-700">{pronoun}</span>
                <span className="font-black text-rose-500 text-sm">{neg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example rows */}
        <div className="flex flex-col gap-1.5">
          {[
            { before: 'The cat',  neg: "isn't" as NegVerb,  after: 'white.' },
            { before: 'We',       neg: "aren't" as NegVerb, after: 'at school.' },
            { before: 'I',        neg: 'am not' as NegVerb, after: 'sad.' },
          ].map(({ before, neg, after }) => (
            <div key={before} className="flex items-center gap-1.5 bg-rose-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-rose-700 text-base">{before}</span>
              <span className={`font-black text-base ${NEG_COLORS[neg].text}`}>{neg}</span>
              <span className="font-bold text-rose-700 text-base">{after}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Short forms card */}
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 mb-1">צורות קצרות</h2>
        <p className="font-bold text-amber-700 text-sm mb-3" dir="rtl">
          בדרך כלל משתמשים בצורות קצרות של to be במשפטי שלילה.
        </p>

        <div className="flex flex-col gap-2">
          {[
            { long: 'I am not',   arrows: ["I'm not"] },
            { long: 'She is not', arrows: ["She isn't", "She's not"] },
            { long: 'We are not', arrows: ["We aren't", "We're not"] },
          ].map(({ long, arrows }) => (
            <div key={long} className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-amber-800 text-base italic">{long}</span>
              <span className="text-amber-500 font-black text-lg">→</span>
              <div className="flex gap-2 flex-wrap">
                {arrows.map(a => (
                  <span key={a} className="bg-amber-200 text-amber-800 font-display font-black text-base px-3 py-0.5 rounded-xl">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex 1: Drag neg verb to fill blank ────────────────────────────────────────

function Ex1({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = TBN_EX1[cycleIdx]
  const [allTiles] = useState(() =>
    NEG_VERBS.flatMap(v =>
      Array.from({ length: 10 }, (_, i) => ({ id: `${v}-${i}`, verb: v as NegVerb }))
    )
  )
  const [placed, setPlaced] = useState<Record<number, string>>({})
  const allDone = Object.keys(placed).length === questions.length

  const usedIds = new Set(Object.values(placed))

  const bankTiles = NEG_VERBS.map(v =>
    allTiles.find(t => t.verb === v && !usedIds.has(t.id))
  ).filter((t): t is { id: string; verb: NegVerb } => t !== undefined)

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const idxStr = targetEl.getAttribute('data-target-id')
    if (idxStr === null) return false
    const qIdx = parseInt(idxStr)
    if (placed[qIdx] !== undefined) return false
    const tile = allTiles.find(t => t.id === tileId)
    if (!tile) return false
    if (tile.verb !== questions[qIdx].answer) return false
    setPlaced(prev => ({ ...prev, [qIdx]: tileId }))
    return true
  }, [placed, allTiles, questions])

  const correctCount = Object.entries(placed).filter(([i]) => {
    const tile = allTiles.find(t => t.id === placed[+i])
    return tile && tile.verb === questions[+i].answer
  }).length

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
        <span>Cycle {cycleIdx + 1} / {TBN_EX1.length}</span>
        <span className="text-rose-500">{Object.keys(placed).length} / {questions.length} ✓</span>
      </div>
      <p className="text-center font-bold text-rose-400 text-sm mb-3" dir="rtl">לתרגול זה 3 סבבים</p>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        גרור am not / isn't / aren't למקום הנכון במשפט
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Complete the sentences with <span className="font-black text-gray-500">am not / isn't / aren't</span>
      </p>

      {/* Tile bank */}
      <div className="flex gap-3 justify-center mb-5 p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        {bankTiles.map(t => {
          const vc = NEG_COLORS[t.verb]
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

      {/* Sentence rows */}
      <div className="flex flex-col gap-2 mb-5">
        {questions.map((q, idx) => {
          const placedTileId = placed[idx]
          const placedTile = placedTileId ? allTiles.find(t => t.id === placedTileId) : undefined
          const vc = placedTile ? NEG_COLORS[placedTile.verb] : null
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-gray-700">{q.before}</span>
              <div
                data-drop-target="true"
                data-target-id={String(idx)}
                className={`min-w-[68px] min-h-[32px] rounded-lg border-2 flex items-center justify-center ${placedTile ? 'border-transparent' : 'border-dashed border-gray-300'}`}
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
          <p className="font-display font-bold text-xl text-green-600 mb-3">{correctCount}/{questions.length} correct!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < TBN_EX1.length ? (
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

// ── Ex 2: Click sentence builder ─────────────────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = TBN_EX2[cycleIdx]
  const [selSubject, setSelSubject] = useState<TBNSubject | null>(null)
  const [selVerb, setSelVerb] = useState<NegVerb | null>(null)
  const [selComp, setSelComp] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedComps, setUsedComps] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length

  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availableComps = cycle.complements.filter(c => !usedComps.has(c))

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selComp) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selSubject.text} ${selVerb} ${selComp}.`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedComps(prev => { const s = new Set(prev); s.add(selComp); return s })
    setSelSubject(null)
    setSelVerb(null)
    setSelComp(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
        <span>Cycle {cycleIdx + 1} / {TBN_EX2.length}</span>
        <span className="text-rose-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>
      <p className="text-center font-bold text-rose-400 text-sm mb-3" dir="rtl">לתרגול זה 3 סבבים</p>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 text-sm font-bold text-rose-700" dir="rtl">
        <p>1. יש ליצור 5 משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה והמשפט לא נכון, יופיע X אדום. יש לתקן ולחוץ שוב Add.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Subjects column */}
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

          {/* Neg verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-gray-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Neg. verb</span>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {NEG_VERBS.map(v => {
                const vc = NEG_COLORS[v]
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

          {/* Complement column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-sm">Word / phrase</span>
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
      {selSubject && selVerb && selComp && !allDone && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-rose-700 text-base flex-1">
            {selSubject.text} {selVerb} {selComp}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-rose-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>
      )}

      {/* Built sentences */}
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
            {cycleIdx + 1 < TBN_EX2.length ? (
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

export default function ToBeNegativePage() {
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
      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">To Be — Negative 🚫</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">
            am not · isn't · aren't — צורת השלילה של to be
          </p>
          <p className="text-white/70 font-bold text-xs mt-0.5">i am not, she is not, you are not</p>
        </div>
      </div>

      {/* Tabs */}
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
            cycles={TBN_EX1.length}
            render={(c, again, done) => <Ex1 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={TBN_EX2.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
