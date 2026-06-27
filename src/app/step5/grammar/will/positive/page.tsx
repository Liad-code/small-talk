'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3'

// ── Ex1 data: 4-part builder (Subject + will + Verb + Time) ────────────────────

const EX1_SUBJECTS = ['I', 'He', 'She', 'We', 'They', 'The dog']
const EX1_VERBS = ['help you', 'go to school', 'play with a ball', 'eat lunch', 'come home', 'read a book']
const EX1_TIMES = ['tomorrow', 'tonight', 'soon', 'later', 'next week']

// ── Ex2 data: reading-passage drag-fill ───────────────────────────────────────

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
  { type: 'text', text: 'Tomorrow will be a busy day. In the morning I ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text', text: ' my mom in the kitchen. Then we ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text', text: ' to the park together. My friends ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text', text: ' football with me there. After that we ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text', text: ' a big lunch. In the evening my cousins ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text', text: ' to my house. I hope it will be fun.' },
]

const EX2_BLANKS: PassageBlank[] = [
  { index: 0, answer: 'will help' },
  { index: 1, answer: 'will go' },
  { index: 2, answer: 'will play' },
  { index: 3, answer: 'will eat' },
  { index: 4, answer: 'will come' },
]

const EX2_WORD_BANK = ['will help', 'will go', 'will play', 'will eat', 'will come']

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-blue-700 text-center mb-1">
          will + verb
        </h2>
        <p className="font-display font-black text-xl text-indigo-600 text-center mb-4" dir="rtl">
          עתיד — צורת החיוב
        </p>

        <div className="flex flex-col gap-1.5 text-sm font-bold text-blue-800 mb-4" dir="rtl">
          <p>• נשתמש בצורת העתיד על מנת לתאר פעולות שיתרחשו בעתיד.</p>
          <p>• מבנה המשפט — will + פועל בצורת הבסיס</p>
          <p>• המבנה זהה לכל הגופים</p>
          <p>• הפועל תמיד בצורת הבסיס</p>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          {['I will read.', 'You will read.', 'He will read.', 'She will read.', 'It will read.', 'We will read.', 'They will read.'].map(s => (
            <div key={s} className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">{s}</div>
          ))}
        </div>

        {/* short forms */}
        <h3 className="font-display font-black text-indigo-700 text-lg mb-2 text-center">💬 Short forms</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">צורות מקוצרות</p>
        <div className="flex flex-col gap-1.5">
          {[
            { full: 'I will', short: "I'll" },
            { full: 'He will', short: "He'll" },
            { full: 'She will', short: "She'll" },
            { full: 'We will', short: "We'll" },
            { full: 'They will', short: "They'll" },
          ].map(({ full, short }) => (
            <div key={full} className="flex items-center justify-between bg-indigo-50 rounded-xl px-3 py-1.5">
              <span className="font-bold text-gray-500 text-sm">{full}</span>
              <span className="text-indigo-400 font-black mx-2">→</span>
              <span className="font-black text-indigo-700 text-base">{short}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time words */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-blue-700 text-lg mb-2 text-center">⏰ Time words</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">מילים שמראות שהפעולה תקרה בעתיד</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['tomorrow', 'tonight', 'soon', 'later', 'next week', 'in 2030'].map(t => (
            <span key={t} className="bg-blue-100 text-blue-700 font-black rounded-full px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Ex1: 4-part builder ───────────────────────────────────────────────────────

function Ex1() {
  const TARGET = 6
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])

  const allDone = sentences.length === TARGET

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selTime) return
    const sentence = `${selSubject} will ${selVerb} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null); setSelVerb(null); setSelTime(null)
  }

  const restart = () => {
    setSentences([]); setSelSubject(null); setSelVerb(null); setSelTime(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-blue-500">{sentences.length} / {TARGET} ✓</span>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-3 text-sm font-bold text-blue-700" dir="rtl">
        <p>1. יש ליצור {TARGET} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט עתיד.</p>
        <p>3. שימו לב: will זהה לכל הגופים, והפועל בצורת הבסיס.</p>
        <p>4. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX1_SUBJECTS.map(s => (
                <button
                  key={s}
                  onClick={() => setSelSubject(s)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selSubject === s ? 'bg-blue-500 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* will (fixed) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">will</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1 flex flex-col gap-1">
              <div className="text-sm font-display font-black rounded-lg px-1 py-1 text-center bg-indigo-600 text-white border-2 border-indigo-600">
                will
              </div>
              <p className="text-[10px] font-bold text-indigo-500 text-center mt-1" dir="rtl">לכל הנושאים</p>
            </div>
          </div>

          {/* Verb (base) */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX1_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-sky-500 text-white' : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'}`}
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

      {selSubject && selVerb && selTime && !allDone && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-blue-700 text-base flex-1">
            {selSubject} will {selVerb} {selTime}.
          </span>
          <button onClick={handleAdd} className="btn-kid bg-blue-500 !py-1 !px-3 text-sm">➕ Add</button>
        </div>
      )}

      {sentences.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {sentences.map((s, i) => (
            <div key={i} className="bg-blue-100 border-2 border-blue-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-blue-400 text-sm">{i + 1}.</span>
              <span className="font-bold text-blue-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      )}

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Amazing sentences!</p>
          <button onClick={restart} className="btn-kid bg-blue-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ── Ex2: reading-passage drag-fill ────────────────────────────────────────────

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
        <span className="text-blue-500">{Object.keys(filled).length} / {EX2_BLANKS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור צירוף מהבנק אל המקום הריק המתאים
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-4">
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
                  : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
              }`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-loose">
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
              className={`inline-block min-w-[5rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 text-center transition-all ${
                val
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : isFlash
                  ? 'bg-red-200 border-red-400 text-red-700 scale-95'
                  : isOver
                  ? 'bg-blue-100 border-blue-500 text-blue-500 scale-105'
                  : 'bg-blue-50 border-blue-300 text-blue-400'
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

// ── Ex3: type-in writing (will + base verb) ───────────────────────────────────

interface Ex3Q { before: string; after: string; base: string; answer: string }

const EX3_QUESTIONS: Ex3Q[] = [
  { before: 'Dan',       after: 'to school tomorrow.',   base: 'go',    answer: 'will go'    },
  { before: 'I',         after: 'my homework tonight.',  base: 'do',    answer: 'will do'    },
  { before: 'She',       after: 'a book later.',         base: 'read',  answer: 'will read'  },
  { before: 'We',        after: 'football next week.',   base: 'play',  answer: 'will play'  },
  { before: 'They',      after: 'lunch soon.',           base: 'eat',   answer: 'will eat'   },
  { before: 'He',        after: 'home tomorrow.',        base: 'come',  answer: 'will come'  },
  { before: 'My mom',    after: 'a cake tonight.',       base: 'make',  answer: 'will make'  },
  { before: 'You',       after: 'a movie later.',        base: 'watch', answer: 'will watch' },
  { before: 'The team',  after: 'fast tomorrow.',        base: 'run',   answer: 'will run'   },
  { before: 'I',         after: 'you with the bags.',    base: 'help',  answer: 'will help'  },
]

// normalize whitespace and case for matching
function normalizeEx3(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ')
}

function Ex3() {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct' | 'reveal'>('idle')
  const [wrongCount, setWrongCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX3_QUESTIONS[current]
  const isLast = current === EX3_QUESTIONS.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const advance = () => {
    if (isLast) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setInput('')
      setStatus('idle')
      setWrongCount(0)
    }
  }

  const submit = () => {
    if (status !== 'idle') return
    if (!input.trim()) return
    if (normalizeEx3(input) === normalizeEx3(q.answer)) {
      setStatus('correct')
      setTimeout(advance, 700)
    } else {
      const nextWrong = wrongCount + 1
      setWrongCount(nextWrong)
      if (nextWrong >= 2) {
        setStatus('reveal')
        setInput(q.answer)
        setTimeout(advance, 3000)
      } else {
        setStatus('wrong')
        setTimeout(() => { setStatus('idle'); setInput('') }, 900)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  const again = () => {
    setCurrent(0)
    setInput('')
    setStatus('idle')
    setWrongCount(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">ענית על כל {EX3_QUESTIONS.length} השאלות!</p>
        <button onClick={again} className="btn-kid bg-blue-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX3_QUESTIONS.length}</span>
        <span className="text-blue-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו will + הפועל בצורת הבסיס.
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type will + base verb
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-blue-500 mb-1">Base verb:</p>
        <p className="font-black text-blue-800 text-lg">{q.base}</p>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        status === 'correct' || status === 'reveal' ? 'bg-green-50 border-green-300' :
        'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-700 text-base">{q.before}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { if (status === 'idle') setInput(e.target.value) }}
            onKeyDown={handleKeyDown}
            disabled={status !== 'idle'}
            placeholder=""
            className={`border-b-2 font-bold text-base text-center min-w-[140px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              status === 'correct' || status === 'reveal' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          <span className="text-blue-400 font-black text-sm">({q.base})</span>
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {(status === 'correct' || status === 'reveal') && <span className="text-xl">✅</span>}
        </div>
        {(status === 'correct' || status === 'reveal') && (
          <p className="mt-2 font-bold text-green-600 text-sm">✔ {q.answer}</p>
        )}
        {status === 'wrong' && (
          <p className="mt-2 font-bold text-red-500 text-sm" dir="rtl">נסו שוב — will + הפועל בצורת הבסיס</p>
        )}
      </div>

      {status === 'idle' && (
        <div className="flex justify-center">
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="btn-kid bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WillPositivePage() {
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

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/will" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Future: Will</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Future: Will — Positive ✅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">עתיד — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">will + verb · I will help · She&apos;ll go</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'ex1'   && <Ex1 />}
        {tab === 'ex2'   && <Ex2 />}
        {tab === 'ex3'   && <Ex3 />}
      </div>
    </div>
  )
}
