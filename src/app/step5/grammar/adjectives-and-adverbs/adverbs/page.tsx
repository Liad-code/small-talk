'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'learn' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

// ════════════════════════════════════════════════════════════════════════════
//  LEARN
// ════════════════════════════════════════════════════════════════════════════

const IRREGULAR: { adjective: string; adverb: string }[] = [
  { adjective: 'good',  adverb: 'well'  },
  { adjective: 'hard',  adverb: 'hard'  },
  { adjective: 'fast',  adverb: 'fast'  },
  { adjective: 'early', adverb: 'early' },
  { adjective: 'late',  adverb: 'late'  },
]

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      {/* Section 1: What is an adverb */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-rose-700 text-center mb-1">
          Adverbs
        </h2>
        <p className="font-display font-black text-xl text-rose-600 text-center mb-2" dir="rtl">
          תארי הפועל
        </p>
        <p className="font-bold text-rose-800 text-sm text-center mb-2" dir="rtl">
          תואר הפועל מתאר את הפועל — הוא עונה על השאלה "איך?"
        </p>
        <p className="font-bold text-rose-800 text-sm text-center mb-4" dir="rtl">
          תואר הפועל יבוא אחרי הפועל אותו הוא מתאר
        </p>

        <div className="flex flex-col gap-2">
          <div className="bg-rose-100 rounded-xl px-3 py-2">
            <div className="font-bold text-rose-700 text-base">The children are working quietly.</div>
            <p className="font-bold text-gray-500 text-sm mt-0.5" dir="rtl">איך הילדים עובדים? בשקט.</p>
          </div>
          <div className="bg-rose-100 rounded-xl px-3 py-2">
            <div className="font-bold text-rose-700 text-base">He speaks slowly.</div>
            <p className="font-bold text-gray-500 text-sm mt-0.5" dir="rtl">איך הוא מדבר? לאט.</p>
          </div>
        </div>
      </div>

      {/* Section 2: Adding -ly */}
      <div className="bg-red-50 border-4 border-red-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-red-700 text-center mb-2">
          Adjective + ly ✨
        </h3>
        <p className="font-bold text-red-800 text-sm text-center mb-2" dir="rtl">
          לרוב מוסיפים ly- לשם התואר כדי לקבל את תואר הפועל
        </p>
        <p className="font-bold text-red-800 text-sm text-center mb-4" dir="rtl">
          שימו לב — נוסיף לתואר הפועל ly גם אם הוא מסתיים ב-e או ב-l
        </p>

        <div className="flex flex-col gap-1.5">
          <div className="bg-white border-2 border-red-200 rounded-xl px-3 py-1.5 font-bold text-red-700 text-base">bad → badly</div>
          <div className="bg-white border-2 border-red-200 rounded-xl px-3 py-1.5 font-bold text-red-700 text-base">beautiful → beautifully</div>
          <div className="bg-white border-2 border-red-200 rounded-xl px-3 py-1.5 font-bold text-red-700 text-base">slow → slowly</div>
        </div>
      </div>

      {/* Section 3: Spelling rules */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-rose-700 text-center mb-2">
          Spelling Rules ✍️
        </h3>
        <div className="flex flex-col gap-3">
          <div className="bg-white border-2 border-rose-200 rounded-2xl p-3">
            <div className="font-display font-black text-rose-700 text-base mb-1">-le → -ly</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">שם תואר שמסתיים ב- le נהפוך ל- ly</p>
            <p className="font-bold text-rose-600 text-base mt-1">terrible → terribly</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-2xl p-3">
            <div className="font-display font-black text-red-700 text-base mb-1">consonant + y → -ily</div>
            <p className="font-bold text-gray-600 text-sm" dir="rtl">שם תואר שמסתיים ב- y ולפניה עיצור — נוריד את ה- y ונוסיף ily</p>
            <p className="font-bold text-red-600 text-base mt-1">happy → happily</p>
          </div>
        </div>
      </div>

      {/* Section 4: Irregular adverbs table */}
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-amber-700 text-center mb-2">
          Irregular Adverbs ⚠️
        </h3>
        <p className="font-bold text-amber-800 text-sm text-center mb-4" dir="rtl">
          תארי פועל יוצאי דופן — לא מוסיפים להם ly-
        </p>

        <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-amber-100">
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm border-r border-amber-200">Adjective</div>
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm">Adverb</div>
          </div>
          {IRREGULAR.map((row, i) => (
            <div key={row.adjective} className={`grid grid-cols-2 border-t border-amber-100 ${i % 2 === 1 ? 'bg-amber-50' : ''}`}>
              <div className="text-center py-2 font-bold text-gray-700 text-base border-r border-amber-100">{row.adjective}</div>
              <div className="text-center py-2 font-black text-amber-600 text-base">{row.adverb}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Adjective vs Adverb contrast */}
      <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-5">
        <h3 className="font-display font-black text-2xl text-rose-700 text-center mb-2">
          Adjective vs Adverb 🆚
        </h3>
        <p className="font-bold text-rose-800 text-sm text-center mb-4" dir="rtl">
          שם תואר מתאר שם עצם, תואר הפועל מתאר את הפועל
        </p>

        <div className="flex flex-col gap-2">
          <div className="bg-white border-2 border-rose-200 rounded-2xl p-3">
            <div className="font-bold text-rose-700 text-base">He is a fast runner.</div>
            <p className="font-bold text-gray-500 text-sm mt-1" dir="rtl">שם תואר (fast) — מתאר את ה- runner</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-2xl p-3">
            <div className="font-bold text-red-700 text-base">He runs fast.</div>
            <p className="font-bold text-gray-500 text-sm mt-1" dir="rtl">תואר הפועל (fast) — מתאר איך הוא רץ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 1 — read & translate (? reveals Hebrew)
// ════════════════════════════════════════════════════════════════════════════

interface SentencePart { text: string; bold: boolean }
interface Ex1Sentence { parts: SentencePart[]; emoji: string; hebrew: string }

function s(raw: string, adv: string): SentencePart[] {
  const tokens = raw.split(/(\s+)/)
  const target = adv.toLowerCase()
  return tokens
    .filter(t => t.length > 0)
    .map(t => {
      if (/^\s+$/.test(t)) return { text: t, bold: false }
      const clean = t.replace(/[^a-zA-Z]/g, '').toLowerCase()
      return { text: t, bold: clean === target }
    })
}

const EX1_SENTENCES: Ex1Sentence[] = [
  { parts: s('She sings beautifully.', 'beautifully'),  emoji: '🎤', hebrew: 'היא שרה יפה.' },
  { parts: s('He runs fast.', 'fast'),                  emoji: '🏃', hebrew: 'הוא רץ מהר.' },
  { parts: s('They work quietly.', 'quietly'),          emoji: '🤫', hebrew: 'הם עובדים בשקט.' },
  { parts: s('The baby sleeps happily.', 'happily'),    emoji: '👶', hebrew: 'התינוק ישן בשמחה.' },
  { parts: s('I speak English slowly.', 'slowly'),      emoji: '🗣️', hebrew: 'אני מדבר אנגלית לאט.' },
  { parts: s('He did the test easily.', 'easily'),      emoji: '📝', hebrew: 'הוא עשה את המבחן בקלות.' },
  { parts: s('She smiled gently.', 'gently'),           emoji: '😊', hebrew: 'היא חייכה בעדינות.' },
  { parts: s('The dog barks loudly.', 'loudly'),        emoji: '🐶', hebrew: 'הכלב נובח בקול רם.' },
  { parts: s('He plays well.', 'well'),                 emoji: '⚽', hebrew: 'הוא משחק טוב.' },
  { parts: s('We walked slowly.', 'slowly'),            emoji: '🚶', hebrew: 'הלכנו לאט.' },
]

function Ex1() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const toggle = (idx: number) => setRevealed(prev => {
    const set = new Set(prev)
    set.has(idx) ? set.delete(idx) : set.add(idx)
    return set
  })

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-rose-700 text-center mb-1">Read & Translate</h2>
        <p className="font-bold text-sm text-rose-600 text-center" dir="rtl">
          קראו את המשפט (תואר הפועל מודגש) ותרגמו. לחיצה על ? תציג את התרגום
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {EX1_SENTENCES.map((sentence, idx) => (
          <div key={idx} className="bg-white border-2 border-rose-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-base font-bold leading-relaxed text-gray-700">
                <span className="text-gray-400 font-black text-sm mr-2">{idx + 1}.</span>
                {sentence.parts.map((part, pIdx) => (
                  <span
                    key={pIdx}
                    className={part.bold ? 'font-black text-rose-600 bg-rose-100 rounded px-0.5' : 'text-gray-700'}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
              <span className="text-2xl flex-shrink-0">{sentence.emoji}</span>
              <button
                onClick={() => toggle(idx)}
                aria-label="Show translation"
                className={`flex-shrink-0 w-8 h-8 rounded-full font-display font-black text-base border-2 transition-colors active:scale-95 ${
                  revealed.has(idx)
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-rose-50 text-rose-600 border-rose-300 hover:bg-rose-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-rose-100 font-bold text-rose-700 text-base text-right" dir="rtl">
                {sentence.hebrew}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 2 — adverb SORT (4 categories)
// ════════════════════════════════════════════════════════════════════════════

type AdvCat = '+ly' | 'le' | 'ily' | 'irregular'

interface SortAdv { base: string; adverb: string; category: AdvCat }

const EX2_ROUND1: SortAdv[] = [
  { base: 'quick',     adverb: 'quickly',  category: '+ly'       },
  { base: 'slow',      adverb: 'slowly',   category: '+ly'       },
  { base: 'soft',      adverb: 'softly',   category: '+ly'       },
  { base: 'terrible',  adverb: 'terribly', category: 'le'        },
  { base: 'gentle',    adverb: 'gently',   category: 'le'        },
  { base: 'simple',    adverb: 'simply',   category: 'le'        },
  { base: 'happy',     adverb: 'happily',  category: 'ily'       },
  { base: 'easy',      adverb: 'easily',   category: 'ily'       },
  { base: 'angry',     adverb: 'angrily',  category: 'ily'       },
  { base: 'fast',      adverb: 'fast',     category: 'irregular' },
  { base: 'hard',      adverb: 'hard',     category: 'irregular' },
  { base: 'good',      adverb: 'well',     category: 'irregular' },
]

const EX2_ROUND2: SortAdv[] = [
  { base: 'clear',     adverb: 'clearly',  category: '+ly'       },
  { base: 'real',      adverb: 'really',   category: '+ly'       },
  { base: 'loud',      adverb: 'loudly',   category: '+ly'       },
  { base: 'terrible',  adverb: 'terribly', category: 'le'        },
  { base: 'gentle',    adverb: 'gently',   category: 'le'        },
  { base: 'simple',    adverb: 'simply',   category: 'le'        },
  { base: 'lucky',     adverb: 'luckily',  category: 'ily'       },
  { base: 'angry',     adverb: 'angrily',  category: 'ily'       },
  { base: 'noisy',     adverb: 'noisily',  category: 'ily'       },
  { base: 'fast',      adverb: 'fast',     category: 'irregular' },
  { base: 'hard',      adverb: 'hard',     category: 'irregular' },
]

function Ex2Round({ items, onDone }: { items: SortAdv[]; onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<SortAdv | null>(null)
  const [placed, setPlaced] = useState<Record<AdvCat, SortAdv[]>>({ '+ly': [], 'le': [], 'ily': [], 'irregular': [] })
  const [flashWrong, setFlashWrong] = useState<AdvCat | null>(null)
  const [usedBases, setUsedBases] = useState<Set<string>>(new Set())

  const remaining = items.filter(v => !usedBases.has(v.base))
  const allDone = usedBases.size === items.length

  const handleWordClick = (item: SortAdv) => {
    if (usedBases.has(item.base)) return
    setSelectedWord(prev => prev?.base === item.base ? null : item)
  }

  const handleCategoryClick = (cat: AdvCat) => {
    if (!selectedWord) return
    if (selectedWord.category === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], selectedWord] }))
      setUsedBases(prev => { const set = new Set(prev); set.add(selectedWord.base); return set })
      setSelectedWord(null)
    } else {
      setFlashWrong(cat)
      setTimeout(() => { setFlashWrong(null); setSelectedWord(null) }, 800)
    }
  }

  const CATS: { id: AdvCat; label: string; color: string }[] = [
    { id: '+ly',       label: '+ly',          color: 'border-rose-400 bg-rose-50'       },
    { id: 'le',        label: '-le → -ly',    color: 'border-red-400 bg-red-50'         },
    { id: 'ily',       label: 'y → -ily',     color: 'border-fuchsia-400 bg-fuchsia-50' },
    { id: 'irregular', label: 'irregular',    color: 'border-amber-400 bg-amber-50'     },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort the adverbs</span>
        <span className="text-rose-500">{usedBases.size} / {items.length} ✓</span>
      </div>

      <p className="text-center font-display font-black text-rose-700 text-base mb-1" dir="rtl">מיון תארי הפועל לפי כלל האיות</p>
      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחץ על מילה ואז על הקטגוריה הנכונה</p>
      {selectedWord ? (
        <p className="text-center font-bold text-rose-500 text-sm mb-3">
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
                ? 'bg-rose-500 text-white border-rose-500 scale-105'
                : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50 active:scale-95'
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
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-rose-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-base text-rose-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.base} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-rose-600 text-sm border border-rose-200">
                    {item.adverb}
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
          <button onClick={onDone} className="btn-kid bg-rose-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function Ex2() {
  const rounds = [EX2_ROUND1, EX2_ROUND2]
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
          className="btn-kid bg-rose-500"
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
          className="btn-kid bg-rose-500"
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
        <span className="inline-block bg-rose-100 text-rose-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <Ex2Round
        key={round}
        items={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 3 — choose the adverb (2 options per sentence, no word bank)
// ════════════════════════════════════════════════════════════════════════════

interface Ex3Q { before: string; after: string; correct: string; wrong: string }

const EX3_ROUND1: Ex3Q[] = [
  { before: 'The turtle walks',       after: '.',              correct: 'slowly',      wrong: 'fast'        },
  { before: 'She sings',              after: '.',              correct: 'beautifully', wrong: 'late'        },
  { before: 'The cheetah runs',       after: '.',              correct: 'fast',        wrong: 'slowly'      },
  { before: 'Please speak',           after: ', the baby is sleeping.', correct: 'quietly', wrong: 'loudly' },
  { before: 'He passed the test very', after: '.',             correct: 'easily',      wrong: 'hard'        },
  { before: 'The lion roars',         after: '.',              correct: 'loudly',      wrong: 'quietly'     },
  { before: 'She plays the piano',    after: '.',              correct: 'well',        wrong: 'fast'        },
  { before: 'The children are working', after: '.',            correct: 'hard',        wrong: 'happily'     },
  { before: 'He smiled at the baby',  after: '.',              correct: 'gently',      wrong: 'angrily'     },
  { before: 'We got up',              after: 'to catch the bus.', correct: 'early',    wrong: 'late'        },
]

const EX3_ROUND2: Ex3Q[] = [
  { before: 'The old man walks',      after: '.',              correct: 'slowly',      wrong: 'quickly'     },
  { before: 'She answered the question', after: '.',           correct: 'correctly',   wrong: 'badly'       },
  { before: 'The dog waited',         after: 'for its owner.', correct: 'patiently',   wrong: 'angrily'     },
  { before: 'He shouted',             after: 'at the game.',   correct: 'loudly',      wrong: 'softly'      },
  { before: 'The plane landed',       after: '.',              correct: 'safely',      wrong: 'terribly'    },
  { before: 'She closed the door',    after: '.',              correct: 'quietly',     wrong: 'noisily'     },
  { before: 'The runner finished',    after: 'the race.',      correct: 'quickly',     wrong: 'slowly'      },
  { before: 'He drives his car',      after: '.',              correct: 'carefully',   wrong: 'badly'       },
  { before: 'The students listened',  after: '.',              correct: 'carefully',   wrong: 'angrily'     },
  { before: 'We arrived',             after: 'for the show.',  correct: 'early',       wrong: 'late'        },
]

// 2 options per question (correct + wrong), order toggled by index
function ex3Options(q: Ex3Q, idx: number): string[] {
  return idx % 2 === 0 ? [q.correct, q.wrong] : [q.wrong, q.correct]
}

function Ex3Round({ questions, onDone }: { questions: Ex3Q[]; onDone: () => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [options] = useState<string[][]>(() => questions.map((q, i) => ex3Options(q, i)))

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
        <h2 className="font-display font-black text-xl text-rose-700 text-center mb-1">Choose the adverb</h2>
        <p className="font-bold text-sm text-rose-600 text-center" dir="rtl">
          בחרו את תואר הפועל המתאים ביותר להשלמת המשפט
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-rose-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswered = answered[idx]
          return (
            <div key={idx} className="bg-white border-2 border-rose-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-green-600 bg-green-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-rose-300 font-black">___</span>
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
                          : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
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
          <button onClick={onDone} className="btn-kid bg-rose-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function Ex3() {
  const rounds = [EX3_ROUND1, EX3_ROUND2]
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
          className="btn-kid bg-rose-500"
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
          className="btn-kid bg-rose-500"
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
        <span className="inline-block bg-rose-100 text-rose-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <Ex3Round
        key={round}
        questions={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 4 — type the adverb (clean input)
// ════════════════════════════════════════════════════════════════════════════

interface TypeQ { before: string; after: string; adj: string; answer: string; alts?: string[] }

const EX4_ROUND1: TypeQ[] = [
  { before: 'The runner moved',        after: 'down the track.',   adj: 'quick',     answer: 'quickly' },
  { before: 'The baby smiled',         after: 'at her mom.',       adj: 'happy',     answer: 'happily' },
  { before: 'He played the violin',    after: '.',                 adj: 'terrible',  answer: 'terribly' },
  { before: 'She speaks French',       after: '.',                 adj: 'good',      answer: 'well' },
  { before: 'The cheetah runs',        after: '.',                 adj: 'fast',      answer: 'fast' },
  { before: 'Please close the door',   after: '.',                 adj: 'soft',      answer: 'softly' },
  { before: 'He solved the puzzle',    after: '.',                 adj: 'easy',      answer: 'easily' },
  { before: 'She held the kitten',     after: '.',                 adj: 'gentle',    answer: 'gently' },
  { before: 'The team worked',         after: 'all day.',          adj: 'hard',      answer: 'hard' },
  { before: 'We walked',               after: 'in the park.',      adj: 'slow',      answer: 'slowly' },
]

const EX4_ROUND2: TypeQ[] = [
  { before: 'She explained the rules', after: '.',                 adj: 'clear',     answer: 'clearly' },
  { before: 'We won the game',         after: '.',                 adj: 'lucky',     answer: 'luckily' },
  { before: 'He touched the baby',     after: '.',                 adj: 'gentle',    answer: 'gently' },
  { before: 'I',                       after: 'enjoyed the movie.', adj: 'real',     answer: 'really' },
  { before: 'She solved it',           after: '.',                 adj: 'simple',    answer: 'simply' },
  { before: 'The team trained',        after: 'all week.',         adj: 'hard',      answer: 'hard' },
  { before: 'He looked at me',         after: '.',                 adj: 'angry',     answer: 'angrily' },
  { before: 'The kids played',         after: 'in the yard.',      adj: 'noisy',     answer: 'noisily' },
  { before: 'He sang',                 after: 'on the stage.',     adj: 'terrible',  answer: 'terribly' },
  { before: 'The car drove',          after: 'on the highway.',   adj: 'fast',      answer: 'fast' },
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
        <span className="text-rose-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו את הצורה הנכונה של תואר הפועל לפי כללי האיות
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the correct adverb form
      </p>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-rose-500 mb-1">Adjective:</p>
        <p className="font-black text-rose-800 text-lg">{q.adj}</p>
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
            className={`border-b-2 font-bold text-base text-center min-w-[160px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'   ? 'border-red-400 text-red-600' :
              status === 'correct' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          {status === 'wrong'   && <span className="text-xl">❌</span>}
          {status === 'correct' && <span className="text-xl">✅</span>}
        </div>
        {status === 'correct' && (
          <p className="mt-2 font-bold text-green-600 text-sm">✔ {q.answer}</p>
        )}
        {status === 'wrong' && (
          <p className="mt-2 font-bold text-red-500 text-sm" dir="rtl">נסו שוב — שימו לב לכלל האיות</p>
        )}
      </div>

      {status === 'idle' && (
        <div className="flex justify-center">
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="btn-kid bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

function Ex4() {
  const rounds = [EX4_ROUND1, EX4_ROUND2]
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
          className="btn-kid bg-rose-500"
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
          className="btn-kid bg-rose-500"
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
        <span className="inline-block bg-rose-100 text-rose-700 font-display font-black text-sm rounded-full px-3 py-1">
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
//  PAGE
// ════════════════════════════════════════════════════════════════════════════

export default function AdverbsPage() {
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

      <div className="bg-gradient-to-r from-rose-500 to-red-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar/adjectives-and-adverbs" className="text-white/70 font-bold text-sm no-underline hover:text-white">
            ← Adjectives &amp; Adverbs
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Adverbs 🏃</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">תארי הפועל — איך עושים פעולה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">quietly · happily · fast</p>
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
        {tab === 'ex1'   && <Ex1 />}
        {tab === 'ex2'   && <Ex2 />}
        {tab === 'ex3'   && <Ex3 />}
        {tab === 'ex4'   && <Ex4 />}
      </div>
    </div>
  )
}
