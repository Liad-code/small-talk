'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'irregular' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

// ════════════════════════════════════════════════════════════════════════════
//  LEARN TAB
// ════════════════════════════════════════════════════════════════════════════

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-blue-700 text-center mb-2">
          Past Simple
        </h2>
        <p className="font-display font-black text-xl text-indigo-600 text-center mb-2" dir="rtl">
          עבר פשוט
        </p>
        <p className="font-bold text-blue-800 text-sm mb-3 text-center" dir="rtl">
          בעבר פשוט מתארים פעולות שכבר קרו ונגמרו. לפועל מוסיפים -ed (או צורת עבר מיוחדת).
        </p>

        <div className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-3 mb-4 text-center">
          <span className="font-bold text-gray-500 text-base">I walk</span>
          <span className="text-blue-400 font-black mx-2">→</span>
          <span className="font-black text-blue-700 text-lg">I walked</span>
        </div>

        <p className="font-bold text-blue-800 text-sm mb-2 text-center" dir="rtl">
          הצורה זהה לכל הנושאים (I / you / he / she / it / we / they)
        </p>
        <div className="flex flex-col gap-1.5">
          {['I walked home.', 'You walked home.', 'He walked home.', 'She walked home.', 'It walked home.', 'We walked home.', 'They walked home.'].map(s => (
            <div key={s} className="bg-blue-100 rounded-xl px-3 py-1.5 font-bold text-blue-700 text-base">{s}</div>
          ))}
        </div>
      </div>

      {/* Spelling rules */}
      <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-indigo-700 text-lg mb-3 text-center">✏️ Spelling rules (+ed)</h3>
        <div className="flex flex-col gap-2">
          {[
            { rule: 'לרוב הפעלים מוסיפים ed', ex: 'talk → talked, walk → walked, play → played' },
            { rule: 'לפועל שמסתיים ב- e: מוסיפים רק d', ex: 'bake → baked, like → liked, live → lived' },
            { rule: 'לפועל שמסתיים בעיצור + y: מורידים את ה-y ומוסיפים ied', ex: 'cry → cried, study → studied, try → tried' },
            { rule: 'לפועל שמסתיים ב- cvc (עיצור-תנועה-עיצור): מכפילים את האות האחרונה ומוסיפים ed. את האותיות w, x, y לא נכפיל', ex: 'plan → planned, stop → stopped, shop → shopped' },
          ].map(({ rule, ex }) => (
            <div key={ex} className="bg-indigo-50 rounded-xl px-3 py-2">
              <div className="font-bold text-indigo-600 text-sm" dir="rtl">{rule}</div>
              <div className="font-black text-indigo-800 text-base">{ex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time expressions */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-blue-700 text-lg mb-2 text-center">⏰ Time words</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">מילים שמראות שהפעולה כבר קרתה</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['yesterday', 'three hours ago', 'a month ago', 'two years ago', 'last week', 'last year', 'last Sunday', 'in 1988'].map(t => (
            <span key={t} className="bg-blue-100 text-blue-700 font-black rounded-full px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* Irregular note */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center">
        <p className="font-bold text-amber-800 text-sm" dir="rtl">
          ⚠️ חלק מהפעלים הם פעלים חריגים (irregular) ולא מקבלים -ed — יש להם צורת עבר מיוחדת. תמצאו אותם בלשונית הבאה: Irregular.
        </p>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  IRREGULAR TAB
// ════════════════════════════════════════════════════════════════════════════

interface IrregGroup { label: string; pairs: [string, string][] }

const IRREGULAR_GROUPS: IrregGroup[] = [
  { label: 'i → a', pairs: [['begin', 'began'], ['drink', 'drank'], ['sing', 'sang'], ['sit', 'sat'], ['swim', 'swam'], ['give', 'gave']] },
  { label: '-ew', pairs: [['fly', 'flew'], ['grow', 'grew'], ['know', 'knew'], ['throw', 'threw']] },
  { label: 'long a (o-e)', pairs: [['break', 'broke'], ['choose', 'chose'], ['drive', 'drove'], ['ride', 'rode'], ['speak', 'spoke'], ['steal', 'stole'], ['wake', 'woke'], ['write', 'wrote']] },
  { label: '-ought', pairs: [['bring', 'brought'], ['buy', 'bought'], ['fight', 'fought'], ['think', 'thought']] },
  { label: '-aught', pairs: [['catch', 'caught'], ['teach', 'taught']] },
  { label: '-t', pairs: [['feel', 'felt'], ['leave', 'left'], ['sleep', 'slept'], ['build', 'built'], ['send', 'sent'], ['spend', 'spent']] },
  { label: 'short forms', pairs: [['forget', 'forgot'], ['get', 'got'], ['come', 'came'], ['stand', 'stood'], ['understand', 'understood']] },
  { label: '-old', pairs: [['sell', 'sold'], ['tell', 'told']] },
  { label: '-aid', pairs: [['pay', 'paid'], ['say', 'said']] },
  { label: 'short e', pairs: [['fall', 'fell'], ['feed', 'fed'], ['hold', 'held'], ['meet', 'met']] },
  { label: '-ore', pairs: [['wear', 'wore']] },
  { label: 'stay the same', pairs: [['cut', 'cut'], ['hit', 'hit'], ['hurt', 'hurt'], ['put', 'put'], ['read', 'read']] },
  { label: 'others', pairs: [['do', 'did'], ['eat', 'ate'], ['find', 'found'], ['go', 'went'], ['have', 'had'], ['hear', 'heard'], ['lose', 'lost'], ['take', 'took'], ['make', 'made'], ['run', 'ran'], ['see', 'saw'], ['win', 'won']] },
]

function IrregularTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-blue-50 border-4 border-blue-300 rounded-3xl p-5 text-center">
        <h2 className="font-display font-black text-2xl text-blue-700 mb-1">Irregular Verbs</h2>
        <p className="font-bold text-blue-800 text-sm" dir="rtl">
          פעלים חריגים — אין -ed, יש צורת עבר מיוחדת. למדו אותם בעל פה לפי הקבוצות.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {IRREGULAR_GROUPS.map(group => (
          <div key={group.label} className="bg-white border-2 border-indigo-200 rounded-2xl p-3">
            <div className="font-display font-black text-indigo-700 text-base text-center mb-2 bg-indigo-50 rounded-lg py-1">
              {group.label}
            </div>
            <div className="flex flex-col gap-1">
              {group.pairs.map(([base, past]) => (
                <div key={base} className="flex items-center justify-between bg-blue-50 rounded-lg px-2.5 py-1">
                  <span className="font-bold text-gray-500 text-sm">{base}</span>
                  <span className="text-blue-400 font-black text-xs">→</span>
                  <span className="font-black text-blue-700 text-sm">{past}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 1 — SORT regular verbs by spelling rule (4 categories, 3 rounds)
// ════════════════════════════════════════════════════════════════════════════

type EdCat = '+ed' | 'e' | 'ied' | 'double'

interface SortVerb {
  base: string
  past: string
  category: EdCat
}

const SORT_R1: SortVerb[] = [
  { base: 'talk',  past: 'talked',  category: '+ed'    },
  { base: 'play',  past: 'played',  category: '+ed'    },
  { base: 'clean', past: 'cleaned', category: '+ed'    },
  { base: 'bake',  past: 'baked',   category: 'e'      },
  { base: 'like',  past: 'liked',   category: 'e'      },
  { base: 'cry',   past: 'cried',   category: 'ied'    },
  { base: 'study', past: 'studied', category: 'ied'    },
  { base: 'plan',  past: 'planned', category: 'double' },
  { base: 'stop',  past: 'stopped', category: 'double' },
  { base: 'shop',  past: 'shopped', category: 'double' },
]

const SORT_R2: SortVerb[] = [
  { base: 'walk',  past: 'walked',  category: '+ed'    },
  { base: 'watch', past: 'watched', category: '+ed'    },
  { base: 'open',  past: 'opened',  category: '+ed'    },
  { base: 'live',  past: 'lived',   category: 'e'      },
  { base: 'smile', past: 'smiled',  category: 'e'      },
  { base: 'dance', past: 'danced',  category: 'e'      },
  { base: 'carry', past: 'carried', category: 'ied'    },
  { base: 'try',   past: 'tried',   category: 'ied'    },
  { base: 'clap',  past: 'clapped', category: 'double' },
  { base: 'grab',  past: 'grabbed', category: 'double' },
]

const SORT_R3: SortVerb[] = [
  { base: 'look',  past: 'looked',  category: '+ed'    },
  { base: 'help',  past: 'helped',  category: '+ed'    },
  { base: 'want',  past: 'wanted',  category: '+ed'    },
  { base: 'rain',  past: 'rained',  category: '+ed'    },
  { base: 'close', past: 'closed',  category: 'e'      },
  { base: 'move',  past: 'moved',   category: 'e'      },
  { base: 'save',  past: 'saved',   category: 'e'      },
  { base: 'copy',  past: 'copied',  category: 'ied'    },
  { base: 'drop',  past: 'dropped', category: 'double' },
  { base: 'hug',   past: 'hugged',  category: 'double' },
]

function SortExercise({ items, onDone }: { items: SortVerb[]; onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<SortVerb | null>(null)
  const [placed, setPlaced] = useState<Record<EdCat, SortVerb[]>>({ '+ed': [], 'e': [], 'ied': [], 'double': [] })
  const [flashWrong, setFlashWrong] = useState<EdCat | null>(null)
  const [usedBases, setUsedBases] = useState<Set<string>>(new Set())
  const [shuffledItems] = useState<SortVerb[]>(() => shuffle(items))

  const remaining = shuffledItems.filter(v => !usedBases.has(v.base))
  const allDone = usedBases.size === items.length

  const handleWordClick = (item: SortVerb) => {
    if (usedBases.has(item.base)) return
    setSelectedWord(prev => prev?.base === item.base ? null : item)
  }

  const handleCategoryClick = (cat: EdCat) => {
    if (!selectedWord) return
    if (selectedWord.category === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], selectedWord] }))
      setUsedBases(prev => { const s = new Set(prev); s.add(selectedWord.base); return s })
      setSelectedWord(null)
    } else {
      setFlashWrong(cat)
      setTimeout(() => { setFlashWrong(null); setSelectedWord(null) }, 800)
    }
  }

  const CATS: { id: EdCat; label: string; color: string }[] = [
    { id: '+ed',    label: '+ed',         color: 'border-blue-400 bg-blue-50'       },
    { id: 'e',      label: '-e → +d',     color: 'border-indigo-400 bg-indigo-50'   },
    { id: 'ied',    label: 'y → ied',     color: 'border-sky-400 bg-sky-50'         },
    { id: 'double', label: 'double + ed', color: 'border-cyan-400 bg-cyan-50'       },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort by spelling</span>
        <span className="text-blue-500">{usedBases.size} / {items.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחץ על פועל ואז על כלל ה-ed הנכון</p>
      {selectedWord ? (
        <p className="text-center font-bold text-blue-500 text-sm mb-3">
          Selected: <span className="font-black">{selectedWord.base}</span> — now click a category
        </p>
      ) : <div className="mb-3" />}

      {/* Word bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(item => (
          <button
            key={item.base}
            onClick={() => handleWordClick(item)}
            className={`px-4 py-2 rounded-xl font-display font-black text-base border-2 transition-all ${
              selectedWord?.base === item.base
                ? 'bg-blue-500 text-white border-blue-500 scale-105'
                : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50 active:scale-95'
            }`}
          >
            {item.base}
          </button>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category boxes (2x2) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[120px] cursor-pointer transition-all ${
                isFlash ? 'border-red-400 bg-red-50' : cat.color
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-blue-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-base text-blue-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.base} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-blue-600 text-sm border border-blue-200">
                    {item.past}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">All sorted correctly!</p>
          <button onClick={onDone} className="btn-kid bg-blue-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function Ex1() {
  const rounds = [SORT_R1, SORT_R2, SORT_R3]
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
          className="btn-kid bg-blue-500"
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
          className="btn-kid bg-blue-500"
        >
          סבב הבא →
        </button>
      </div>
    )
  }

  const isLast = round === rounds.length - 1

  return (
    <div key={key}>
      <div className="max-w-xl mx-auto px-4 pt-4 -mb-2">
        <span className="inline-block bg-blue-100 text-blue-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <SortExercise
        key={round}
        items={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 2 — type the past form (3 rounds, 10 sentences each)
// ════════════════════════════════════════════════════════════════════════════

interface TypeQ { before: string; after: string; base: string; answer: string; alts?: string[] }

const EX2_R1: TypeQ[] = [
  { before: 'Dan',          after: 'on the beach yesterday.',  base: 'run',   answer: 'ran'      },
  { before: 'We',           after: 'chicken last night.',      base: 'eat',   answer: 'ate'      },
  { before: 'Guy',          after: 'the dog yesterday.',       base: 'feed',  answer: 'fed'      },
  { before: 'She',          after: 'all day.',                 base: 'study', answer: 'studied'  },
  { before: 'They',         after: 'the car.',                 base: 'stop',  answer: 'stopped'  },
  { before: 'I',            after: 'home an hour ago.',        base: 'walk',  answer: 'walked'   },
  { before: 'My mom',       after: 'a cake yesterday.',        base: 'bake',  answer: 'baked'    },
  { before: 'The baby',     after: 'all night.',               base: 'cry',   answer: 'cried'    },
  { before: 'We',           after: 'football last week.',      base: 'play',  answer: 'played'   },
  { before: 'He',           after: 'to school yesterday.',     base: 'go',    answer: 'went'     },
]

const EX2_R2: TypeQ[] = [
  { before: 'I',            after: 'a new book last week.',    base: 'buy',   answer: 'bought'   },
  { before: 'She',          after: 'a beautiful song.',        base: 'sing',  answer: 'sang'     },
  { before: 'We',           after: 'in the lake yesterday.',   base: 'swim',  answer: 'swam'     },
  { before: 'The boy',      after: 'his bike to the park.',    base: 'ride',  answer: 'rode'     },
  { before: 'My dad',       after: 'the car this morning.',    base: 'drive', answer: 'drove'    },
  { before: 'They',         after: 'the room yesterday.',      base: 'clean', answer: 'cleaned'  },
  { before: 'I',            after: 'a letter to my friend.',   base: 'write', answer: 'wrote'    },
  { before: 'She',          after: 'a movie last night.',      base: 'watch', answer: 'watched'  },
  { before: 'We',           after: 'the door quietly.',        base: 'close', answer: 'closed'   },
  { before: 'He',           after: 'his keys yesterday.',      base: 'lose',  answer: 'lost'     },
]

const EX2_R3: TypeQ[] = [
  { before: 'I',            after: 'my homework an hour ago.', base: 'do',    answer: 'did'      },
  { before: 'We',           after: 'a great movie.',           base: 'see',   answer: 'saw'      },
  { before: 'She',          after: 'lunch for us.',            base: 'make',  answer: 'made'     },
  { before: 'They',         after: 'the box upstairs.',        base: 'carry', answer: 'carried'  },
  { before: 'The girl',     after: 'her hands.',               base: 'clap',  answer: 'clapped'  },
  { before: 'I',            after: 'a new phone.',             base: 'have',  answer: 'had'      },
  { before: 'He',           after: 'a funny story.',           base: 'tell',  answer: 'told'     },
  { before: 'We',           after: 'a strange noise.',         base: 'hear',  answer: 'heard'    },
  { before: 'She',          after: 'at me happily.',           base: 'smile', answer: 'smiled'   },
  { before: 'The team',     after: 'the game yesterday.',      base: 'win',   answer: 'won'      },
]

function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ')
}

function TypeInExercise({ questions, onDone }: { questions: TypeQ[]; onDone: () => void }) {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[current]
  const isLast = current === questions.length - 1

  useEffect(() => {
    if (status === 'idle') inputRef.current?.focus()
  }, [status, current])

  const submit = () => {
    if (!input.trim()) return
    const trimmed = normalize(input)
    const accepted = [q.answer, ...(q.alts ?? [])].map(normalize)
    if (accepted.includes(trimmed)) {
      setStatus('correct')
      setTimeout(() => {
        if (isLast) {
          onDone()
        } else {
          setCurrent(c => c + 1)
          setInput('')
          setStatus('idle')
        }
      }, 700)
    } else {
      setStatus('wrong')
      setTimeout(() => { setStatus('idle'); setInput('') }, 900)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {questions.length}</span>
        <span className="text-blue-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו את הפועל בעבר לפי כללי האיות
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the verb in the past simple
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-blue-500 mb-1">Base verb:</p>
        <p className="font-black text-blue-800 text-lg">{q.base}</p>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'   ? 'bg-red-50 border-red-300' :
        status === 'correct' ? 'bg-green-50 border-green-300' :
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
              status === 'correct' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          <span className="text-blue-400 font-black text-sm">({q.base})</span>
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {status === 'correct' && <span className="text-xl">✅</span>}
        </div>
        {status === 'correct' && (
          <p className="mt-2 font-bold text-green-600 text-sm">✔ {q.answer}</p>
        )}
        {status === 'wrong' && (
          <p className="mt-2 font-bold text-red-500 text-sm" dir="rtl">נסו שוב — שימו לב לכללי האיות</p>
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

function Ex2() {
  const rounds = [EX2_R1, EX2_R2, EX2_R3]
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
          className="btn-kid bg-blue-500"
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
          className="btn-kid bg-blue-500"
        >
          סבב הבא →
        </button>
      </div>
    )
  }

  const isLast = round === rounds.length - 1

  return (
    <div key={key}>
      <div className="max-w-xl mx-auto px-4 pt-4 -mb-2">
        <span className="inline-block bg-blue-100 text-blue-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <TypeInExercise
        key={round}
        questions={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 3 — 4-part builder (Subject | Verb (past) | Object | Time)
// ════════════════════════════════════════════════════════════════════════════

const EX3_SUBJECTS = ['I', 'We', 'She', 'The boys', 'Dan', 'My mom']
const EX3_VERBS = ['played', 'ate', 'watched', 'made', 'read', 'cleaned']
const EX3_OBJECTS = ['football', 'an apple', 'a movie', 'a cake', 'a book', 'the room']
const EX3_TIMES = ['yesterday', 'last week', 'last night']

function Ex3() {
  const TARGET = 6
  const [selSubject, setSelSubject] = useState<string | null>(null)
  const [selVerb, setSelVerb] = useState<string | null>(null)
  const [selObject, setSelObject] = useState<string | null>(null)
  const [selTime, setSelTime] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])

  const allDone = sentences.length === TARGET

  const handleAdd = () => {
    if (!selSubject || !selVerb || !selObject || !selTime) return
    const sentence = `${selSubject} ${selVerb} ${selObject} ${selTime}.`
    setSentences(prev => [...prev, sentence])
    setSelSubject(null); setSelVerb(null); setSelObject(null); setSelTime(null)
  }

  const restart = () => {
    setSentences([]); setSelSubject(null); setSelVerb(null); setSelObject(null); setSelTime(null)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Builder</span>
        <span className="text-blue-500">{sentences.length} / {TARGET} ✓</span>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-3 text-sm font-bold text-blue-700" dir="rtl">
        <p>1. יש ליצור {TARGET} משפטים על מנת לסיים את המשימה.</p>
        <p>2. לחץ על מילה אחת מכל עמודה על מנת ליצור משפט בעבר.</p>
        <p>3. המשפט יופיע למטה, לחץ Add על מנת להוסיף אותו.</p>
      </div>

      {!allDone && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-blue-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Subject</span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX3_SUBJECTS.map(s => (
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

          {/* Verb */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-indigo-600 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Verb</span>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX3_VERBS.map(v => (
                <button
                  key={v}
                  onClick={() => setSelVerb(v)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selVerb === v ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Object */}
          <div className="flex flex-col gap-1.5">
            <div className="bg-sky-500 rounded-t-xl py-1 text-center">
              <span className="font-display font-black text-white text-xs">Object</span>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-b-xl p-1 flex flex-col gap-1">
              {EX3_OBJECTS.map(o => (
                <button
                  key={o}
                  onClick={() => setSelObject(o)}
                  className={`text-xs font-bold rounded-lg px-1 py-1 text-center transition-colors ${selObject === o ? 'bg-sky-500 text-white' : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'}`}
                >
                  {o}
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
              {EX3_TIMES.map(t => (
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

      {selSubject && selVerb && selObject && selTime && !allDone && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
          <span className="font-bold text-blue-700 text-base flex-1">
            {selSubject} {selVerb} {selObject} {selTime}.
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

// ════════════════════════════════════════════════════════════════════════════
//  EX 4 — reading-passage drag-fill
// ════════════════════════════════════════════════════════════════════════════

interface PassageSeg {
  type: 'text' | 'blank'
  text?: string
  blankIndex?: number
}

interface PassageBlank {
  index: number
  answer: string
}

const EX4_SEGMENTS: PassageSeg[] = [
  { type: 'text', text: 'Last summer we ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text', text: ' (go) to the beach. I ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text', text: ' (swim) in the sea. My brother ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text', text: ' (build) a sandcastle. We ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text', text: ' (eat) ice cream. Mom ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text', text: ' (take) photos. We ' },
  { type: 'blank', blankIndex: 5 },
  { type: 'text', text: ' (have) a great day!' },
]

const EX4_BLANKS: PassageBlank[] = [
  { index: 0, answer: 'went'  },
  { index: 1, answer: 'swam'  },
  { index: 2, answer: 'built' },
  { index: 3, answer: 'ate'   },
  { index: 4, answer: 'took'  },
  { index: 5, answer: 'had'   },
]

const EX4_WORD_BANK = ['went', 'swam', 'built', 'ate', 'took', 'had']

function Ex4() {
  const [filled, setFilled] = useState<Record<number, string>>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [dragOverBlank, setDragOverBlank] = useState<number | null>(null)
  const [flashWrong, setFlashWrong] = useState<number | null>(null)
  const [bank] = useState<string[]>(() => shuffle(EX4_WORD_BANK))
  const allFilled = EX4_BLANKS.every(b => filled[b.index] !== undefined)

  const tryPlace = (blankIdx: number, word: string) => {
    if (filled[blankIdx]) return
    const blank = EX4_BLANKS.find(b => b.index === blankIdx)
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

  const usedWords = new Set(Object.values(filled))

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Reading Passage</span>
        <span className="text-blue-500">{Object.keys(filled).length} / {EX4_BLANKS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור את צורת העבר מהבנק אל המקום הריק המתאים (לפי הפועל שבסוגריים)
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {bank.map(word => {
            const used = usedWords.has(word)
            return (
              <div
                key={word}
                draggable={!used}
                onDragStart={e => { if (used) return; setDraggedWord(word); e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move' }}
                onDragEnd={() => { setDraggedWord(null); setDragOverBlank(null) }}
                className={`px-3 py-1.5 rounded-xl font-display font-black text-sm border-2 transition-all select-none ${
                  used
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-default'
                    : draggedWord === word
                    ? 'bg-yellow-400 text-yellow-900 border-yellow-400 scale-105 cursor-grabbing'
                    : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100 cursor-grab'
                }`}
              >
                {word}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 text-base font-bold text-gray-700 leading-loose">
        {EX4_SEGMENTS.map((seg, i) => {
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
              className={`inline-block min-w-[4rem] px-2 py-0.5 mx-0.5 rounded-lg font-black text-base border-2 text-center transition-all ${
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

// ════════════════════════════════════════════════════════════════════════════
//  PAGE
// ════════════════════════════════════════════════════════════════════════════

export default function PastSimplePositivePage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn',     label: '📚 Learn' },
    { id: 'irregular', label: 'Irregular' },
    { id: 'ex1',       label: 'Ex 1' },
    { id: 'ex2',       label: 'Ex 2' },
    { id: 'ex3',       label: 'Ex 3' },
    { id: 'ex4',       label: 'Ex 4' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Past Simple 📅</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">עבר פשוט — צורת החיוב</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">walk → walked · go → went</p>
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
        {tab === 'learn'     && <LearnTab />}
        {tab === 'irregular' && <IrregularTab />}
        {tab === 'ex1'       && <Ex1 />}
        {tab === 'ex2'       && <Ex2 />}
        {tab === 'ex3'       && <Ex3 />}
        {tab === 'ex4'       && <Ex4 />}
      </div>
    </div>
  )
}
