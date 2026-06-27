'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

type Aux = 'am' | 'is' | 'are'

// ── Ex1 data: 4-part builder ──────────────────────────────────────────────────

interface BuilderSubject {
  text: string
  aux: Aux
}

const EX1_SUBJECTS: BuilderSubject[] = [
  { text: 'I',         aux: 'am'  },
  { text: 'We',        aux: 'are' },
  { text: 'They',      aux: 'are' },
  { text: 'He',        aux: 'is'  },
  { text: 'She',       aux: 'is'  },
  { text: 'My mother', aux: 'is'  },
]
const EX1_VERBS = ['eat', 'play', 'run', 'read', 'sleep', 'study']
const EX1_TIMES = ['tomorrow', 'tonight', 'next week']

// ── Ex2 data: reading-passage fill ────────────────────────────────────────────

interface PassageSeg {
  type: 'text' | 'blank'
  text?: string
  blankIndex?: number
}

interface PassageBlank {
  index: number
  answer: string
}

const EX2_SEGMENTS: PassageSeg[] = [
  { type: 'text', text: 'It is the weekend! Tomorrow I ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text', text: ' to the beach. My friend Dan ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text', text: ' a big sandcastle. My sisters ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text', text: ' in the sea. My mother ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text', text: ' a picnic for us. My brothers ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text', text: ' football on the sand. We ' },
  { type: 'blank', blankIndex: 5 },
  { type: 'text', text: ' a wonderful day!' },
]

const EX2_BLANKS: PassageBlank[] = [
  { index: 0, answer: 'am going to go' },
  { index: 1, answer: 'is going to build' },
  { index: 2, answer: 'are going to swim' },
  { index: 3, answer: 'is going to make' },
  { index: 4, answer: 'are going to play' },
  { index: 5, answer: 'are going to have' },
]

const EX2_WORD_BANK = [
  'am going to go',
  'is going to build',
  'are going to swim',
  'is going to make',
  'are going to play',
  'are going to have',
]

// ── Ex3 data: circle the correct "X going to" phrase ──────────────────────────

interface Ex3Q {
  before: string
  after: string
  correct: string
  wrong: string
}

const EX3_QS: Ex3Q[] = [
  { before: 'The girls',  after: 'sing a song.',               correct: 'are going to', wrong: 'is going to'  },
  { before: 'We',         after: 'do homework tonight.',       correct: 'are going to', wrong: 'is going to'  },
  { before: 'I',          after: 'read the book tomorrow.',     correct: 'am going to',  wrong: 'are going to' },
  { before: 'He',         after: 'read a new book.',           correct: 'is going to',  wrong: 'are going to' },
  { before: 'We',         after: 'run in the park.',           correct: 'are going to', wrong: 'is going to'  },
  { before: 'My parents', after: 'cook dinner tonight.',       correct: 'are going to', wrong: 'is going to'  },
  { before: 'She',        after: 'sleep early today.',         correct: 'is going to',  wrong: 'am going to'  },
  { before: 'I',          after: 'eat an apple.',              correct: 'am going to',  wrong: 'is going to'  },
  { before: 'They',       after: 'watch a movie tonight.',     correct: 'are going to', wrong: 'am going to'  },
  { before: 'The dog',    after: 'swim in the lake.',          correct: 'is going to',  wrong: 'are going to' },
]

// 2 options per question (correct + wrong), order toggled by index
function ex3Options(q: Ex3Q, idx: number): string[] {
  return idx % 2 === 0 ? [q.correct, q.wrong] : [q.wrong, q.correct]
}

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-cyan-50 border-4 border-cyan-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-cyan-700 text-center mb-2">
          Be Going To
        </h2>
        <p className="font-bold text-cyan-800 text-sm mb-2 text-center" dir="rtl">
          משתמשים ב- be going to כדי לדבר על תוכניות לעתיד.
        </p>
        <p className="font-display font-black text-blue-600 text-lg mb-4 text-center">
          am / is / are + going to + verb
        </p>

        {/* aux table */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-cyan-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">am</div>
            <div className="text-white/80 font-bold text-sm">I</div>
          </div>
          <div className="bg-sky-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">is</div>
            <div className="text-white/80 font-bold text-sm">he, she, it</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-3 text-center">
            <div className="font-display font-black text-white text-2xl mb-1">are</div>
            <div className="text-white/80 font-bold text-sm">you, we, they</div>
          </div>
        </div>

        {/* example sentences */}
        <div className="flex flex-col gap-1.5">
          {[
            { sub: 'I',    aux: 'am' as Aux,  rest: 'going to study.' },
            { sub: 'He',   aux: 'is' as Aux,  rest: 'going to study.' },
            { sub: 'She',  aux: 'is' as Aux,  rest: 'going to study.' },
            { sub: 'We',   aux: 'are' as Aux, rest: 'going to study.' },
            { sub: 'They', aux: 'are' as Aux, rest: 'going to study.' },
          ].map(({ sub, aux, rest }) => (
            <div key={sub} className="flex items-center gap-1.5 bg-cyan-100 rounded-xl px-3 py-1.5">
              <span className="font-bold text-cyan-700 text-base">{sub}</span>
              <span className="font-black text-base text-blue-600">{aux}</span>
              <span className="font-bold text-cyan-700 text-base">{rest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* going to + verb examples */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-blue-700 text-lg mb-2 text-center">🎯 going to + verb</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">going to + פועל בצורת הבסיס</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['going to eat', 'going to play', 'going to run', 'going to read', 'going to sleep', 'going to study'].map(p => (
            <span key={p} className="bg-blue-100 text-blue-700 font-black rounded-full px-3 py-1 text-sm">{p}</span>
          ))}
        </div>
      </div>

      {/* Time expressions */}
      <div className="bg-white border-2 border-cyan-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-cyan-700 text-lg mb-2 text-center">⏰ Time words</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">מילים שמראות שהפעולה תקרה בעתיד</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['tomorrow', 'tonight', 'next week', 'next year', 'soon'].map(t => (
            <span key={t} className="bg-cyan-100 text-cyan-700 font-black rounded-full px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Short forms */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-blue-700 text-lg mb-2 text-center">💬 Short forms</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">צורות מקוצרות</p>
        <div className="flex flex-col gap-1.5">
          {[
            { full: 'I am going to eat', short: "I'm going to eat" },
            { full: 'He is going to eat', short: "He's going to eat" },
            { full: 'She is going to eat', short: "She's going to eat" },
            { full: 'We are going to play', short: "We're going to play" },
            { full: 'They are going to play', short: "They're going to play" },
          ].map(({ full, short }) => (
            <div key={full} className="flex items-center justify-between bg-blue-50 rounded-xl px-3 py-1.5 gap-2">
              <span className="font-bold text-gray-500 text-sm">{full}</span>
              <span className="font-black text-blue-700 text-base text-right">{short}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: 4-part builder ───────────────────────────────────────────────────────

function Ex1() {
  const TARGET = 6
  const [selSubject, setSelSubject] = useState<BuilderSubject | null>(null)
  const [selAux, setSelAux] = useState<Aux | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState('')

  const allDone = sentences.length === TARGET

  const handleAdd = () => {
    if (!selSubject || !selAux || !selVerb || !selTime) return
    if (selSubject.aux !== selAux) {
      setError('❌ Try a different aux (am/is/are)!')
      return
    }
    const sentence = `${selSubject.text} ${selAux} going to ${selVerb} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null); setSelAux(null); setSelVerb(null); setSelTime(null)
    setError('')
  }

  const restart = () => {
    setSentences([]); setSelSubject(null); setSelAux(null); setSelVerb(null); setSelTime(null); setError('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-cyan-500">{sentences.length} / {TARGET} ✓</span>
      </div>

      <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-3 mb-3 text-sm font-bold text-cyan-700" dir="rtl">
        <p>1. יש ליצור {TARGET} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט.</p>
        <p>3. המשפט יופיע למטה (going to יתווסף אוטומטית), לחץ Add על מנת להוסיף אותו.</p>
        <p>4. במידה ופועל העזר לא מתאים לנושא, יופיע X אדום.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-cyan-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX1_SUBJECTS.map(s => (
                <button
                  key={s.text}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject?.text === s.text ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-100'}`}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Aux */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">am/is/are</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1 flex flex-col gap-1">
              {(['is', 'am', 'are'] as Aux[]).map(a => (
                <button
                  key={a}
                  onClick={() => setSelAux(a)}
                  className={`text-sm font-display font-black rounded-lg px-1 py-1 text-center transition-colors border-2 ${selAux === a ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-sky-700 border-sky-300 hover:bg-sky-100'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Verb */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX1_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-blue-500 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-amber-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Time</span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX1_TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelTime(t)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selTime === t ? 'bg-amber-500 text-white' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selSubject && selAux && selVerb && selTime && !allDone && (
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-cyan-700 text-base flex-1">
            {selSubject.text} {selAux} going to {selVerb} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-cyan-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-cyan-100 border-2 border-cyan-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-cyan-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-cyan-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <button onClick={restart} className="btn-kid bg-cyan-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: reading-passage fill ─────────────────────────────────────────────────

function Ex2() {
  const [filled, setFilled] = useState<Record<number, string>>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [dragOverBlank, setDragOverBlank] = useState<number | null>(null)
  const [flashWrong, setFlashWrong] = useState<number | null>(null)
  const allFilled = EX2_BLANKS.every(b => filled[b.index] !== undefined)

  const tryPlace = (blankIdx: number, word: string) => {
    if (filled[blankIdx]) return
    const blank = EX2_BLANKS.find(b => b.index === blankIdx)
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

  const restart = () => { setFilled({}); setDraggedWord(null); setDragOverBlank(null); setFlashWrong(null) }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Reading Passage</span>
        <span className="text-cyan-500">{Object.keys(filled).length} / {EX2_BLANKS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור צירוף מהבנק אל המקום הריק המתאים
      </p>

      <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {EX2_WORD_BANK.map(word => (
            <div
              key={word}
              draggable
              onDragStart={e => { setDraggedWord(word); e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move' }}
              onDragEnd={() => { setDraggedWord(null); setDragOverBlank(null) }}
              className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                draggedWord === word
                  ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105'
                  : 'bg-white text-cyan-700 border-cyan-300 hover:bg-cyan-100'
              }`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-cyan-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-loose">
        {EX2_SEGMENTS.map((seg, i) => {
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
              className={`inline-block min-w-[6rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 text-center transition-all ${
                val
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : isFlash
                  ? 'bg-red-200 border-red-400 text-red-700 scale-95'
                  : isOver
                  ? 'bg-cyan-100 border-cyan-500 text-cyan-500 scale-105'
                  : 'bg-cyan-50 border-cyan-300 text-cyan-400'
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
          <button onClick={restart} className="btn-kid bg-cyan-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex3: circle the correct words ─────────────────────────────────────────────

function Ex3() {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [options] = useState<string[][]>(() => EX3_QS.map((q, i) => ex3Options(q, i)))
  const [key, setKey] = useState(0)

  const total = EX3_QS.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: string) => {
    if (answered[idx]) return
    if (val === EX3_QS[idx].correct) {
      setAnswered(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  const restart = () => { setAnswered({}); setWrong({}); setKey(k => k + 1) }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={key}>
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-cyan-700 text-center mb-1">Circle the correct words</h2>
        <p className="font-bold text-sm text-cyan-600 text-center" dir="rtl">
          בחרו את הצירוף הנכון (am / is / are going to) לפי הנושא
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-cyan-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX3_QS.map((q, idx) => {
          const isAnswered = answered[idx]
          return (
            <div key={idx} className="bg-white border-2 border-cyan-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-green-600 bg-green-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-cyan-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                  {options[idx].map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-cyan-50 text-cyan-700 border-cyan-300 hover:bg-cyan-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {isAnswered && <span className="ml-auto text-green-500 font-bold text-lg">✓</span>}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in mt-6">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד! סיימת את כל המשפטים!</p>
          <button onClick={restart} className="btn-kid bg-cyan-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BeGoingToPositivePage() {
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

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/be-going-to" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Be Going To</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Be Going To — Positive ✅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">עתיד — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">am / is / are + going to + verb</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && <Ex2 />}
        {tab === 'ex3' && <Ex3 />}
      </div>
    </div>
  )
}
