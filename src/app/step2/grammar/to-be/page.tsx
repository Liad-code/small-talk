'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { TB_EX1, TB_EX2, TB_EX3, TB_EX4, type TBSubject } from '@/data/step2/to-be'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

const VERB_COLORS = {
  am:  { bg: 'bg-indigo-500',  border: 'border-indigo-400',  light: 'bg-indigo-50',  text: 'text-indigo-700',  badge: 'bg-indigo-200 text-indigo-800'  },
  is:  { bg: 'bg-emerald-500', border: 'border-emerald-400', light: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800' },
  are: { bg: 'bg-orange-500',  border: 'border-orange-400',  light: 'bg-orange-50',  text: 'text-orange-700',  badge: 'bg-orange-200 text-orange-800'  },
} as const

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-purple-50 border-4 border-purple-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-purple-700 text-center mb-3">
          am · is · are
        </h2>
        <p className="font-bold text-purple-800 text-base mb-1" dir="rtl">
          פועל to be = להיות — יש לו 3 צורות
        </p>
        <p className="font-bold text-purple-700 text-base mb-4">
          Use am / is / are to say what someone or something IS.
        </p>

        {/* 3 colored mini-cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className={`${VERB_COLORS.am.bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">am</div>
            <div className="text-white/80 font-bold text-sm">I</div>
          </div>
          <div className={`${VERB_COLORS.is.bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">is</div>
            <div className="text-white/80 font-bold text-sm">he / she / it</div>
          </div>
          <div className={`${VERB_COLORS.are.bg} rounded-2xl p-3 text-center`}>
            <div className="font-display font-black text-white text-xl mb-1">are</div>
            <div className="text-white/80 font-bold text-sm">you / we / they</div>
          </div>
        </div>

        {/* Conjugation grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-3 border-2 border-purple-200">
            <div className="font-display font-black text-purple-700 text-center text-base mb-2">יחיד (Singular)</div>
            {[
              ['I', 'am', 'אני'],
              ['You', 'are', 'אתה, את'],
              ['He', 'is', 'הוא'],
              ['She', 'is', 'היא'],
              ['It', 'is', 'זה / זו'],
            ].map(([pronoun, verb, heb]) => (
              <div key={pronoun + heb} className="flex justify-between items-center text-base py-0.5 border-b border-purple-100">
                <span className="font-bold text-purple-700">{pronoun}</span>
                <span className={`font-black text-sm ${VERB_COLORS[verb as keyof typeof VERB_COLORS].text}`}>{verb}</span>
                <span className="text-gray-500 text-sm" dir="rtl">{heb}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-purple-200">
            <div className="font-display font-black text-purple-700 text-center text-base mb-2">רבים (Plural)</div>
            {[
              ['We', 'are', 'אנחנו'],
              ['You', 'are', 'אתם, אתן'],
              ['They', 'are', 'הם, הן'],
            ].map(([pronoun, verb, heb]) => (
              <div key={pronoun + heb} className="flex justify-between items-center text-base py-0.5 border-b border-purple-100">
                <span className="font-bold text-purple-700">{pronoun}</span>
                <span className={`font-black text-sm ${VERB_COLORS[verb as keyof typeof VERB_COLORS].text}`}>{verb}</span>
                <span className="text-gray-500 text-sm" dir="rtl">{heb}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example rows */}
        <div className="flex flex-col gap-1 mb-3">
          {[
            { sentence: 'The cat', verb: 'is' as const, rest: 'black.' },
            { sentence: 'We',      verb: 'are' as const, rest: 'happy.' },
            { sentence: 'I',       verb: 'am' as const,  rest: 'hungry.' },
          ].map(({ sentence, verb, rest }) => (
            <div key={sentence} className="flex items-center gap-1 bg-purple-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-purple-700 text-base">{sentence}</span>
              <span className={`font-black text-base ${VERB_COLORS[verb].text}`}>{verb}</span>
              <span className="font-bold text-purple-700 text-base">{rest}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm font-bold text-purple-500 mt-1" dir="rtl">
          כל אחד מהם משמש עם ״כינויי גוף״ שונים
        </p>
      </div>
    </div>
  )
}

// ── Ex 1: Drag subjects to am/is/are buckets ──────────────────────────────────

function Ex1({ onDone }: { onDone: () => void }) {
  const allSubjects = TB_EX1.flatMap(b =>
    b.subjects.map(s => ({ id: `${b.verb}-${s.replace(/\s+/g, '-')}`, text: s, verb: b.verb }))
  )
  const [shuffled] = useState(() => shuffle([...allSubjects]))
  const [placed, setPlaced] = useState<Record<string, string>>({})
  const total = allSubjects.length
  const allDone = Object.keys(placed).length === total

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    const verb = targetEl.getAttribute('data-target-id')
    if (!verb || placed[tileId]) return false
    const item = allSubjects.find(s => s.id === tileId)
    if (!item || item.verb !== verb) return false
    setPlaced(prev => ({ ...prev, [tileId]: verb }))
    return true
  }, [placed, allSubjects])

  const unplaced = shuffled.filter(s => !placed[s.id])

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Drag to the right verb</span>
        <span className="text-purple-500">{Object.keys(placed).length} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור כל מילה לפועל המתאים
      </p>

      {/* Bucket grid */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {TB_EX1.map(b => {
          const here = allSubjects.filter(s => placed[s.id] === b.verb).map(s => s.text)
          const vc = VERB_COLORS[b.verb]
          return (
            <div key={b.verb} className="flex flex-col">
              <div className={`${vc.bg} rounded-t-xl py-1.5 text-center`}>
                <span className="font-display font-black text-white text-sm">{b.verb}</span>
              </div>
              <div
                data-drop-target="true"
                data-target-id={b.verb}
                className={`flex-1 min-h-[120px] rounded-b-xl border-2 ${vc.border} ${vc.light} p-1.5 flex flex-col gap-1`}
              >
                {here.map(t => (
                  <span key={t} className={`${vc.badge} rounded-lg text-xs font-bold px-1.5 py-0.5 text-center bounce-in`}>{t}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Word bank */}
      {!allDone && (
        <div className="border-t-2 border-dashed border-gray-200 pt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {unplaced.map(s => (
              <DraggableTile
                key={s.id}
                id={s.id}
                label={s.text}
                color="bg-white"
                borderColor="border-gray-300"
                textColor="text-gray-700"
                size="sm"
                className="!w-auto min-w-[48px] px-3"
                onDropped={handleDrop}
              />
            ))}
          </div>
        </div>
      )}

      {allDone && (
        <div className="text-center pt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function Ex1Wrapper() {
  const [done, setDone] = useState(false)
  const [key, setKey] = useState(0)
  if (done) return (
    <div className="text-center py-14 px-4 bounce-in">
      <div className="text-6xl mb-4">🌟</div>
      <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
      <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת!</p>
      <button onClick={() => { setDone(false); setKey(k => k + 1) }} className="btn-kid bg-blue-500">🔁 Start Over</button>
    </div>
  )
  return <Ex1 key={key} onDone={() => setDone(true)} />
}

// ── Ex 2: Click am/is/are for sentence ───────────────────────────────────────

function Ex2({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = TB_EX2[cycleIdx]
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx]) return
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {TB_EX2.length}</span>
        <span className="text-purple-500">{answered} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const display = ans ? q.sentence.replace('___', ans) : q.sentence
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-2 py-1.5 flex items-center gap-2">
              <span className="text-base font-bold text-gray-700 flex-1">{display}</span>
              {!ans ? (
                <div className="flex gap-1.5">
                  {(['am', 'is', 'are'] as const).map(v => {
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
              ) : (
                <span className={`font-bold text-sm ${ans === q.answer ? 'text-green-600' : 'text-red-500'}`}>
                  {ans === q.answer ? '✓' : '✗'}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">
            {Object.entries(answers).filter(([i, v]) => questions[+i].answer === v).length}/{total} correct!
          </p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < TB_EX2.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 3: Drag am/is/are to fill blank ───────────────────────────────────────

function Ex3({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const questions = TB_EX3[cycleIdx]
  const [allTiles] = useState(() =>
    (['am', 'is', 'are'] as const).flatMap(v =>
      Array.from({ length: 10 }, (_, i) => ({ id: `${v}-${i}`, verb: v }))
    )
  )
  const [placed, setPlaced] = useState<Record<number, string>>({})
  const allDone = Object.keys(placed).length === questions.length

  const usedIds = new Set(Object.values(placed))

  const bankTiles = (['am', 'is', 'are'] as const).map(v =>
    allTiles.find(t => t.verb === v && !usedIds.has(t.id))
  ).filter((t): t is { id: string; verb: 'am' | 'is' | 'are' } => t !== undefined)

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
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {TB_EX3.length}</span>
        <span className="text-purple-500">{Object.keys(placed).length} / {questions.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        גרור am / is / are למקום הנכון במשפט
      </p>

      {/* Tile bank */}
      <div className="flex gap-3 justify-center mb-5 p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
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
          const vc = placedTile ? VERB_COLORS[placedTile.verb] : null
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-gray-700">{q.before}</span>
              <div
                data-drop-target="true"
                data-target-id={String(idx)}
                className={`min-w-[52px] min-h-[32px] rounded-lg border-2 flex items-center justify-center ${placedTile ? 'border-transparent' : 'border-dashed border-gray-300'}`}
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
            {cycleIdx + 1 < TB_EX3.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ex 4: Click-based sentence builder ───────────────────────────────────────

function Ex4({ cycleIdx, onAgain, onDone }: { cycleIdx: number; onAgain: () => void; onDone: () => void }) {
  const cycle = TB_EX4[cycleIdx]
  const [selSubject, setSelSubject] = useState<TBSubject | null>(null)
  const [selVerb, setSelVerb] = useState<'is' | 'are' | null>(null)
  const [selAdj, setSelAdj] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')
  const [usedSubjects, setUsedSubjects] = useState<Set<string>>(new Set())
  const [usedAdjs, setUsedAdjs] = useState<Set<string>>(new Set())

  const allDone = sentences.length === cycle.subjects.length

  const availableSubjects = cycle.subjects.filter(s => !usedSubjects.has(s.text))
  const availableAdjs = cycle.adjectives.filter(a => !usedAdjs.has(a))

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selAdj) return
    if (selSubject.verb !== selVerb) {
      setError('❌ Try a different verb!')
      return
    }
    const sentence = `${selSubject.text} ${selVerb} ${selAdj}.`
    setSentences(prev => [...prev, sentence])
    setUsedSubjects(prev => { const s = new Set(prev); s.add(selSubject.text); return s })
    setUsedAdjs(prev => { const s = new Set(prev); s.add(selAdj); return s })
    setSelSubject(null)
    setSelVerb(null)
    setSelAdj(null)
    setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Cycle {cycleIdx + 1} / {TB_EX4.length}</span>
        <span className="text-purple-500">{sentences.length} / {cycle.subjects.length} ✓</span>
      </div>

      {!allDone && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Subjects column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-emerald-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableSubjects.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Verb column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-purple-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">to be</span>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {(['is', 'are'] as const).map(v => {
                const vc = VERB_COLORS[v]
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

          {/* Adjectives column */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Adjective</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1.5 flex flex-col gap-1">
              {availableAdjs.map(a => (
                <button
                  key={a}
                  onClick={() => setSelAdj(a)}
                  className={`text-xs font-bold rounded-lg px-2 py-1 text-center transition-colors ${selAdj === a ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview + Add */}
      {selSubject && selVerb && selAdj && !allDone && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-purple-700 text-base flex-1">
            {selSubject.text} {selVerb} {selAdj}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-purple-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>
      )}

      {/* Built sentences */}
      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-purple-100 border-2 border-purple-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-purple-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-purple-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <div className="flex gap-3 justify-center">
            {cycleIdx + 1 < TB_EX4.length && (
              <button onClick={onAgain} className="btn-kid bg-blue-500">🔁 Again</button>
            )}
            <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
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

export default function ToBePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'ex1',   label: 'Ex 1' },
    { id: 'ex2',   label: 'Ex 2' },
    { id: 'ex3',   label: 'Ex 3' },
    { id: 'ex4',   label: 'Ex 4' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">To Be 🌟</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">am · is · are — להיות</p>
        </div>
      </div>

      {/* Tabs */}
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
        {tab === 'ex1' && <Ex1Wrapper />}
        {tab === 'ex2' && (
          <ExWrapper
            cycles={TB_EX2.length}
            render={(c, again, done) => <Ex2 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex3' && (
          <ExWrapper
            cycles={TB_EX3.length}
            render={(c, again, done) => <Ex3 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
        {tab === 'ex4' && (
          <ExWrapper
            cycles={TB_EX4.length}
            render={(c, again, done) => <Ex4 key={c} cycleIdx={c} onAgain={again} onDone={done} />}
          />
        )}
      </div>
    </div>
  )
}
