'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'

type Tab = 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5'

// ════════════════════════════════════════════════════════════════════════════
//  Shared helpers
// ════════════════════════════════════════════════════════════════════════════

function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ')
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 1 — time-expression SORT (DRAG, 4 tense categories)
// ════════════════════════════════════════════════════════════════════════════

type TenseCat = 'present-simple' | 'present-progressive' | 'past-simple' | 'future'

interface TimeExpr {
  text: string
  category: TenseCat
}

const EX1_EXPRESSIONS: TimeExpr[] = [
  // Present Simple (habits)
  { text: 'every day',       category: 'present-simple'      },
  { text: 'usually',         category: 'present-simple'      },
  { text: 'on Mondays',      category: 'present-simple'      },
  { text: 'every week',      category: 'present-simple'      },
  { text: 'always',          category: 'present-simple'      },
  // Present Progressive (now)
  { text: 'now',             category: 'present-progressive' },
  { text: 'right now',       category: 'present-progressive' },
  { text: 'at the moment',   category: 'present-progressive' },
  { text: 'today',           category: 'present-progressive' },
  { text: 'Listen!',         category: 'present-progressive' },
  // Past Simple (finished past)
  { text: 'yesterday',       category: 'past-simple'         },
  { text: 'last week',       category: 'past-simple'         },
  { text: 'last year',       category: 'past-simple'         },
  { text: 'two years ago',   category: 'past-simple'         },
  { text: 'last Friday',     category: 'past-simple'         },
  // Future
  { text: 'tomorrow',        category: 'future'              },
  { text: 'tonight',         category: 'future'              },
  { text: 'soon',            category: 'future'              },
  { text: 'next week',       category: 'future'              },
  { text: 'next year',       category: 'future'              },
]

const EX1_CATS: { id: TenseCat; label: string; hebrew: string; color: string }[] = [
  { id: 'present-simple',      label: 'Present Simple',      hebrew: 'הווה פשוט',  color: 'border-fuchsia-400 bg-fuchsia-50' },
  { id: 'present-progressive', label: 'Present Progressive', hebrew: 'הווה ממושך', color: 'border-purple-400 bg-purple-50'   },
  { id: 'past-simple',         label: 'Past Simple',         hebrew: 'עבר פשוט',   color: 'border-violet-400 bg-violet-50'   },
  { id: 'future',              label: 'Future',              hebrew: 'עתיד',       color: 'border-pink-400 bg-pink-50'       },
]

function Ex1() {
  const [placed, setPlaced] = useState<Record<TenseCat, TimeExpr[]>>({
    'present-simple': [], 'present-progressive': [], 'past-simple': [], 'future': [],
  })
  const [used, setUsed] = useState<Set<string>>(new Set())
  const [draggedExpr, setDraggedExpr] = useState<string | null>(null)
  const [dragOverCat, setDragOverCat] = useState<TenseCat | null>(null)
  const [flashWrong, setFlashWrong] = useState<TenseCat | null>(null)
  const [bank] = useState<TimeExpr[]>(() => shuffle(EX1_EXPRESSIONS))
  const [key, setKey] = useState(0)

  const remaining = bank.filter(e => !used.has(e.text))
  const allDone = used.size === EX1_EXPRESSIONS.length

  const tryPlace = (cat: TenseCat, text: string) => {
    if (used.has(text)) return
    const expr = EX1_EXPRESSIONS.find(e => e.text === text)
    if (!expr) return
    if (expr.category === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], expr] }))
      setUsed(prev => { const s = new Set(prev); s.add(text); return s })
    } else {
      setFlashWrong(cat)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  const handleDrop = (e: React.DragEvent, cat: TenseCat) => {
    e.preventDefault()
    setDragOverCat(null)
    const text = e.dataTransfer.getData('text/plain') || draggedExpr
    if (text) tryPlace(cat, text)
    setDraggedExpr(null)
  }

  const restart = () => {
    setPlaced({ 'present-simple': [], 'present-progressive': [], 'past-simple': [], 'future': [] })
    setUsed(new Set()); setDraggedExpr(null); setDragOverCat(null); setFlashWrong(null); setKey(k => k + 1)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16" key={key}>
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort the time expressions</span>
        <span className="text-fuchsia-500">{used.size} / {EX1_EXPRESSIONS.length} ✓</span>
      </div>

      <p className="text-center font-display font-black text-fuchsia-700 text-base mb-1" dir="rtl">מיון ביטויי זמן לפי הזמן הדקדוקי</p>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">גרור כל ביטוי זמן לזמן המתאים לו</p>

      {/* Word bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(expr => (
          <div
            key={expr.text}
            draggable
            onDragStart={e => { setDraggedExpr(expr.text); e.dataTransfer.setData('text/plain', expr.text); e.dataTransfer.effectAllowed = 'move' }}
            onDragEnd={() => { setDraggedExpr(null); setDragOverCat(null) }}
            className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
              draggedExpr === expr.text
                ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105'
                : 'bg-white text-fuchsia-700 border-fuchsia-300 hover:bg-fuchsia-50'
            }`}
          >
            {expr.text}
          </div>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category drop-zones (2x2) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {EX1_CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          const isOver = dragOverCat === cat.id
          return (
            <div
              key={cat.id}
              data-drop-target="true"
              onDragOver={e => { e.preventDefault(); setDragOverCat(cat.id) }}
              onDragLeave={() => setDragOverCat(prev => prev === cat.id ? null : prev)}
              onDrop={e => handleDrop(e, cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[130px] transition-all ${
                isFlash ? 'border-red-400 bg-red-50' : cat.color
              } ${isOver ? 'ring-2 ring-offset-1 ring-fuchsia-400 scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-sm text-fuchsia-700 leading-tight">{cat.label}</div>
              <div className="font-bold text-center text-xs text-gray-500 mb-2" dir="rtl">{cat.hebrew}</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {placed[cat.id].map(item => (
                  <div key={item.text} className="bg-white rounded-lg px-2 py-0.5 text-center font-bold text-fuchsia-600 text-xs border border-fuchsia-200">
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-3">All sorted correctly!</p>
          <button onClick={restart} className="btn-kid bg-fuchsia-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 2 — choose the correct time expression (2 options)
// ════════════════════════════════════════════════════════════════════════════

interface Ex2Q { before: string; after: string; correct: string; wrong: string }

const EX2_R1: Ex2Q[] = [
  { before: 'I am walking to school',          after: '.',  correct: 'now',          wrong: 'yesterday'    },
  { before: 'She visited her aunt',            after: '.',  correct: 'last week',     wrong: 'tomorrow'     },
  { before: 'They will travel',                after: '.',  correct: 'next year',     wrong: 'yesterday'    },
  { before: 'He brushes his teeth',            after: '.',  correct: 'every day',     wrong: 'right now'    },
  { before: 'We are watching a film',          after: '.',  correct: 'at the moment', wrong: 'last Friday'  },
  { before: 'My dad cooked dinner',            after: '.',  correct: 'an hour ago',   wrong: 'tomorrow'     },
  { before: 'The bus will leave',              after: '.',  correct: 'soon',          wrong: 'last year'    },
  { before: 'My mom usually reads',            after: '.',  correct: 'on Sundays',    wrong: 'right now'    },
  { before: 'Look! The baby is sleeping',      after: '.',  correct: 'right now',     wrong: 'last week'    },
  { before: 'We bought a new car',             after: '.',  correct: 'two years ago', wrong: 'tonight'      },
]

const EX2_R2: Ex2Q[] = [
  { before: 'My sister is reading a book',     after: '.',  correct: 'right now',     wrong: 'last week'    },
  { before: 'We played in the park',           after: '.',  correct: 'yesterday',     wrong: 'tomorrow'     },
  { before: 'I will call you',                 after: '.',  correct: 'tonight',       wrong: 'last year'    },
  { before: 'She drinks milk',                 after: '.',  correct: 'every morning', wrong: 'an hour ago'  },
  { before: 'Listen! The dog is barking',      after: '.',  correct: 'now',           wrong: 'next week'    },
  { before: 'They finished the test',          after: '.',  correct: 'two hours ago', wrong: 'soon'         },
  { before: 'The train will arrive',           after: '.',  correct: 'soon',          wrong: 'yesterday'    },
  { before: 'My brother walks the dog',        after: '.',  correct: 'on Fridays',    wrong: 'right now'    },
  { before: 'The kids are swimming',           after: '.',  correct: 'at the moment', wrong: 'last month'   },
  { before: 'We moved to a new house',         after: '.',  correct: 'last month',    wrong: 'tomorrow'     },
]

const EX2_R3: Ex2Q[] = [
  { before: 'I am doing my homework',          after: '.',  correct: 'at the moment', wrong: 'last week'    },
  { before: 'He cleaned his room',             after: '.',  correct: 'yesterday',     wrong: 'soon'         },
  { before: 'We will visit Grandma',           after: '.',  correct: 'next week',     wrong: 'an hour ago'  },
  { before: 'She helps her mom',               after: '.',  correct: 'every day',     wrong: 'right now'    },
  { before: 'Look! The cat is jumping',        after: '.',  correct: 'now',           wrong: 'last year'    },
  { before: 'My dad fixed the car',            after: '.',  correct: 'last Sunday',   wrong: 'tomorrow'     },
  { before: 'The movie will start',            after: '.',  correct: 'soon',          wrong: 'yesterday'    },
  { before: 'They usually eat breakfast',      after: '.',  correct: 'at seven',      wrong: 'right now'    },
  { before: 'The students are writing',        after: '.',  correct: 'right now',     wrong: 'last week'    },
  { before: 'I saw a great film',              after: '.',  correct: 'two days ago',  wrong: 'tonight'      },
]

const EX2_ROUNDS: Ex2Q[][] = [EX2_R1, EX2_R2, EX2_R3]

function ex2Options(q: Ex2Q, idx: number): string[] {
  return idx % 2 === 0 ? [q.correct, q.wrong] : [q.wrong, q.correct]
}

function Ex2({ questions, onDone }: { questions: Ex2Q[]; onDone: () => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [options] = useState<string[][]>(() => questions.map((q, i) => ex2Options(q, i)))

  const total = questions.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: string) => {
    if (answered[idx]) return
    if (val === questions[idx].correct) {
      setAnswered(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-fuchsia-700 text-center mb-1">Choose the time expression</h2>
        <p className="font-bold text-sm text-fuchsia-600 text-center" dir="rtl">
          בחרו את ביטוי הזמן המתאים לזמן של המשפט
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-fuchsia-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answered[idx]
          return (
            <div key={idx} className="bg-white border-2 border-fuchsia-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-green-600 bg-green-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-fuchsia-300 font-black">___</span>
                )}
                {q.after === '.' ? q.after : ' ' + q.after}
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
                          : 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-300 hover:bg-fuchsia-100'
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
          <button onClick={onDone} className="btn-kid bg-fuchsia-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared TYPE-IN exercise (Ex 3 positive, Ex 4 negative, Ex 5 questions)
// ════════════════════════════════════════════════════════════════════════════

interface TypeQ { before: string; after: string; base?: string; answer: string; alts?: string[]; hint?: string }

function TypeInExercise({
  questions, onDone, instruction, showBase = false,
}: {
  questions: TypeQ[]; onDone: () => void; instruction: string; showBase?: boolean
}) {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct' | 'revealed'>('idle')
  const [wrongCount, setWrongCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[current]
  const isLast = current === questions.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const advance = () => {
    if (isLast) {
      onDone()
    } else {
      setCurrent(c => c + 1)
      setInput('')
      setStatus('idle')
      setWrongCount(0)
    }
  }

  const submit = () => {
    if (!input.trim()) return
    const trimmed = normalize(input)
    const accepted = [q.answer, ...(q.alts ?? [])].map(normalize)
    if (accepted.includes(trimmed)) {
      setStatus('correct')
      setTimeout(advance, 700)
    } else {
      const nextWrong = wrongCount + 1
      setWrongCount(nextWrong)
      if (nextWrong >= 2) {
        // Reveal the correct answer, hold for 3s, then auto-advance + reset.
        setInput(q.answer)
        setStatus('revealed')
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

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {questions.length}</span>
        <span className="text-fuchsia-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        {instruction}
      </p>

      {showBase && q.base && (
        <div className="bg-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl px-4 py-3 mb-3">
          <p className="text-xs font-bold text-fuchsia-500 mb-1">Base verb:</p>
          <p className="font-black text-fuchsia-800 text-lg">{q.base}</p>
        </div>
      )}

      <div className={`border-2 rounded-2xl px-4 py-4 mb-3 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        (status === 'correct' || status === 'revealed') ? 'bg-green-50 border-green-300' :
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
            className={`border-b-2 font-bold text-base text-center min-w-[160px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              (status === 'correct' || status === 'revealed') ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          {q.base && <span className="text-fuchsia-400 font-black text-sm">({q.base})</span>}
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {(status === 'correct' || status === 'revealed') && <span className="text-xl">✅</span>}
        </div>
        {(status === 'correct' || status === 'revealed') && (
          <p className="mt-2 font-bold text-green-600 text-sm">✔ {q.answer}</p>
        )}
        {status === 'wrong' && (
          <p className="mt-2 font-bold text-red-500 text-sm" dir="rtl">נסו שוב — שימו לב לזמן</p>
        )}
      </div>

      {q.hint && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl px-4 py-2 mb-4">
          <p className="text-xs font-bold text-purple-500 mb-0.5">Answer:</p>
          <p className="font-bold text-purple-800 text-base">— {q.hint}</p>
        </div>
      )}

      {status === 'idle' && (
        <div className="flex justify-center">
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="btn-kid bg-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

// ── Ex3 data: POSITIVE verb forms ─────────────────────────────────────────────

const EX3_R1: TypeQ[] = [
  { before: 'The bell',  after: 'soon.',                base: 'ring',  answer: 'will ring',  alts: ['is going to ring'] },
  { before: 'Ido',       after: 'to his friend at the moment.', base: 'talk', answer: 'is talking' },
  { before: 'I',         after: 'at home tomorrow.',    base: 'stay',  answer: 'will stay',  alts: ['am going to stay'] },
  { before: 'You',       after: 'the movie tonight.',   base: 'enjoy', answer: 'will enjoy', alts: ['are going to enjoy'] },
  { before: 'We',        after: 'our vacation yesterday.', base: 'plan', answer: 'planned' },
  { before: 'She',       after: 'TV every day.',        base: 'watch', answer: 'watches' },
  { before: 'They',      after: 'football last Friday.', base: 'play', answer: 'played' },
  { before: 'He',        after: 'a book now.',          base: 'read',  answer: 'is reading' },
]

const EX3_R2: TypeQ[] = [
  { before: 'My friends', after: 'to the beach tomorrow.', base: 'drive', answer: 'will drive', alts: ['are going to drive'] },
  { before: 'Maya',      after: 'a cake at the moment.', base: 'bake',  answer: 'is baking' },
  { before: 'I',         after: 'a new bike soon.',      base: 'buy',   answer: 'will buy',   alts: ['am going to buy'] },
  { before: 'We',        after: 'the train next week.',  base: 'take',  answer: 'will take',  alts: ['are going to take'] },
  { before: 'She',       after: 'her keys yesterday.',   base: 'lose',  answer: 'lost' },
  { before: 'He',        after: 'to school every day.',  base: 'walk',  answer: 'walks' },
  { before: 'They',      after: 'a sandcastle last summer.', base: 'build', answer: 'built' },
  { before: 'The boys',  after: 'in the pool right now.', base: 'swim', answer: 'are swimming' },
]

const EX3_R3: TypeQ[] = [
  { before: 'It',        after: 'tomorrow.',             base: 'rain',  answer: 'will rain',  alts: ['is going to rain'] },
  { before: 'The girls', after: 'in the garden now.',    base: 'play',  answer: 'are playing' },
  { before: 'We',        after: 'a film next Saturday.', base: 'watch', answer: 'will watch', alts: ['are going to watch'] },
  { before: 'I',         after: 'you after lunch.',      base: 'call',  answer: 'will call',  alts: ['am going to call'] },
  { before: 'My dad',    after: 'the car last week.',    base: 'wash',  answer: 'washed' },
  { before: 'She',       after: 'the piano every evening.', base: 'practise', answer: 'practises' },
  { before: 'They',      after: 'pizza two days ago.',   base: 'make',  answer: 'made' },
  { before: 'He',        after: 'a letter at the moment.', base: 'write', answer: 'is writing' },
]

const EX3_ROUNDS: TypeQ[][] = [EX3_R1, EX3_R2, EX3_R3]

// ── Ex4 data: NEGATIVE verb forms ─────────────────────────────────────────────

const EX4_R1: TypeQ[] = [
  { before: 'My mom',  after: 'every day.',     base: 'not work',  answer: "doesn't work",     alts: ['does not work'] },
  { before: 'Yaniv',   after: 'to Rome last year.', base: 'not go', answer: "didn't go",       alts: ['did not go'] },
  { before: 'They',    after: 'TV right now.',   base: 'not watch', answer: "aren't watching", alts: ['are not watching'] },
  { before: 'I',       after: 'at home tomorrow.', base: 'not stay', answer: "won't stay",     alts: ['will not stay', 'am not going to stay'] },
  { before: 'We',      after: 'our vacation yesterday.', base: 'not plan', answer: "didn't plan", alts: ['did not plan'] },
  { before: 'She',     after: 'breakfast now.',  base: 'not eat',   answer: "isn't eating",    alts: ['is not eating'] },
  { before: 'He',      after: 'every day.',      base: 'not play',  answer: "doesn't play",    alts: ['does not play'] },
  { before: 'You',     after: 'the movie tonight.', base: 'not enjoy', answer: "won't enjoy",  alts: ['will not enjoy', "aren't going to enjoy", 'are not going to enjoy'] },
]

const EX4_R2: TypeQ[] = [
  { before: 'My dad',  after: 'coffee every morning.', base: 'not drink', answer: "doesn't drink", alts: ['does not drink'] },
  { before: 'We',      after: 'to the party last night.', base: 'not come', answer: "didn't come", alts: ['did not come'] },
  { before: 'The baby', after: 'right now.',     base: 'not sleep', answer: "isn't sleeping",   alts: ['is not sleeping'] },
  { before: 'They',    after: 'us next week.',   base: 'not visit', answer: "won't visit",      alts: ['will not visit', "aren't going to visit", 'are not going to visit'] },
  { before: 'I',       after: 'the homework yesterday.', base: 'not finish', answer: "didn't finish", alts: ['did not finish'] },
  { before: 'You',     after: 'lunch at the moment.', base: 'not have', answer: "aren't having", alts: ['are not having'] },
  { before: 'She',     after: 'the bus on Sundays.', base: 'not take', answer: "doesn't take",  alts: ['does not take'] },
  { before: 'He',      after: 'the game tomorrow.', base: 'not win',  answer: "won't win",       alts: ['will not win', "isn't going to win", 'is not going to win'] },
]

const EX4_R3: TypeQ[] = [
  { before: 'My sister', after: 'meat.',         base: 'not eat',   answer: "doesn't eat",     alts: ['does not eat'] },
  { before: 'We',      after: 'the test last week.', base: 'not pass', answer: "didn't pass",  alts: ['did not pass'] },
  { before: 'The dogs', after: 'in the garden now.', base: 'not run', answer: "aren't running", alts: ['are not running'] },
  { before: 'I',       after: 'late tomorrow.',  base: 'not be',    answer: "won't be",        alts: ['will not be', 'am not going to be'] },
  { before: 'They',    after: 'the door yesterday.', base: 'not lock', answer: "didn't lock", alts: ['did not lock'] },
  { before: 'He',      after: 'a shower right now.', base: 'not take', answer: "isn't taking", alts: ['is not taking'] },
  { before: 'You',     after: 'your room every day.', base: 'not clean', answer: "don't clean", alts: ['do not clean'] },
  { before: 'She',     after: 'the cake tonight.', base: 'not make', answer: "won't make",     alts: ['will not make', "isn't going to make", 'is not going to make'] },
]

const EX4_ROUNDS: TypeQ[][] = [EX4_R1, EX4_R2, EX4_R3]

// ── Ex5 data: complete the QUESTION by the answer's tense ──────────────────────

const EX5_R1: TypeQ[] = [
  { before: 'When',  after: '?', answer: 'did Nava call',            hint: 'Nava called an hour ago.' },
  { before: 'What',  after: '?', answer: 'is Mom cooking',           alts: ['is mom cooking'], hint: 'Mom is cooking rice and meat.' },
  { before: 'Who',   after: '?', answer: 'will win the game',        hint: 'Our team will win the game.' },
  { before: 'Where', after: '?', answer: 'does David live',          hint: 'David lives in Bat Yam.' },
  { before: 'How',   after: '?', answer: 'did Gil get home',         hint: 'Gil got home by bus.' },
  { before: 'Why',   after: '?', answer: 'is Shira going to move to Haifa', hint: 'Shira is going to move to Haifa because she got a job there.' },
]

const EX5_R2: TypeQ[] = [
  { before: 'When',  after: '?', answer: 'did Tom arrive',           hint: 'Tom arrived yesterday.' },
  { before: 'What',  after: '?', answer: 'is Dana reading',          alts: ['is dana reading'], hint: 'Dana is reading a comic book.' },
  { before: 'Who',   after: '?', answer: 'will bring the cake',      hint: 'My aunt will bring the cake.' },
  { before: 'Where', after: '?', answer: 'does Noa work',            hint: 'Noa works in Tel Aviv.' },
  { before: 'How',   after: '?', answer: 'did Ron break the window', hint: 'Ron broke the window with a ball.' },
  { before: 'Why',   after: '?', answer: 'is Dad going to sell the car', hint: 'Dad is going to sell the car because it is too old.' },
]

const EX5_R3: TypeQ[] = [
  { before: 'When',  after: '?', answer: 'did the film start',       hint: 'The film started two hours ago.' },
  { before: 'What',  after: '?', answer: 'is Omer drawing',          alts: ['is omer drawing'], hint: 'Omer is drawing a dragon.' },
  { before: 'Who',   after: '?', answer: 'will help the teacher',    hint: 'The new boy will help the teacher.' },
  { before: 'Where', after: '?', answer: 'does Lior study',          hint: 'Lior studies at the library.' },
  { before: 'How',   after: '?', answer: 'did Maya make the soup',   hint: 'Maya made the soup with fresh vegetables.' },
  { before: 'Why',   after: '?', answer: 'is the team going to travel to Eilat', hint: 'The team is going to travel to Eilat because of the big match.' },
]

const EX5_ROUNDS: TypeQ[][] = [EX5_R1, EX5_R2, EX5_R3]

// ════════════════════════════════════════════════════════════════════════════
//  RoundFlow — 3-round flow with round badge, between-rounds + finished screens
// ════════════════════════════════════════════════════════════════════════════

function RoundFlow({
  rounds,
  render,
}: {
  rounds: number
  render: (roundIdx: number, onDone: () => void) => React.ReactNode
}) {
  const [round, setRound] = useState(0)
  const [betweenRounds, setBetweenRounds] = useState(false)
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל הסבבים!</p>
        <button
          onClick={() => { setRound(0); setBetweenRounds(false); setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-fuchsia-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  if (betweenRounds) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-5xl mb-3">👏</div>
        <p className="font-display font-bold text-2xl text-green-600 mb-1">Round {round + 1} done!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סבב {round + 1} הושלם — ממשיכים לסבב הבא</p>
        <button
          onClick={() => { setRound(r => r + 1); setBetweenRounds(false) }}
          className="btn-kid bg-fuchsia-500"
        >
          סבב הבא →
        </button>
      </div>
    )
  }

  const isLast = round === rounds - 1

  return (
    <div key={key}>
      <div className="max-w-xl mx-auto px-4 pt-4 -mb-2">
        <span className="inline-block bg-fuchsia-100 text-fuchsia-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds}
        </span>
      </div>
      <div key={round}>
        {render(round, () => { if (isLast) setFinished(true); else setBetweenRounds(true) })}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  PAGE
// ════════════════════════════════════════════════════════════════════════════

export default function MixedPracticePage() {
  const [tab, setTab] = useState<Tab>('ex1')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'ex1', label: 'Ex 1' },
    { id: 'ex2', label: 'Ex 2' },
    { id: 'ex3', label: 'Ex 3' },
    { id: 'ex4', label: 'Ex 4' },
    { id: 'ex5', label: 'Ex 5' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step6" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Step 6</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Tenses: Mixed Practice 🔀</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">תרגול מעורב בזמנים</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">Present Simple · Present Progressive · Past Simple · Future</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && <RoundFlow rounds={EX2_ROUNDS.length} render={(r, done) => <Ex2 questions={EX2_ROUNDS[r]} onDone={done} />} />}
        {tab === 'ex3' && <RoundFlow rounds={EX3_ROUNDS.length} render={(r, done) => <TypeInExercise questions={EX3_ROUNDS[r]} onDone={done} showBase instruction="השלימו את המשפטים בצורת הפועל הנכונה לפי הזמן." />} />}
        {tab === 'ex4' && <RoundFlow rounds={EX4_ROUNDS.length} render={(r, done) => <TypeInExercise questions={EX4_ROUNDS[r]} onDone={done} showBase instruction="השלימו את המשפטים בצורת השלילה הנכונה לפי הזמן." />} />}
        {tab === 'ex5' && <RoundFlow rounds={EX5_ROUNDS.length} render={(r, done) => <TypeInExercise questions={EX5_ROUNDS[r]} onDone={done} instruction="השלימו את השאלה לפי הזמן של התשובה." />} />}
      </div>
    </div>
  )
}
