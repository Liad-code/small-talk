'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab =
  | 'learn' | 'comparative' | 'superlative'
  | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5' | 'ex6' | 'ex7'

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({ render }: { render: (onDone: () => void) => React.ReactNode }) {
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את התרגול!</p>
        <button
          onClick={() => { setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-pink-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return <div key={key}>{render(() => setFinished(true))}</div>
}

// ════════════════════════════════════════════════════════════════════════════
//  LEARN TABS
// ════════════════════════════════════════════════════════════════════════════

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-pink-50 border-4 border-pink-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-pink-700 text-center mb-1">
          Adjectives
        </h2>
        <p className="font-display font-black text-xl text-rose-600 text-center mb-2" dir="rtl">
          שמות תואר
        </p>
        <p className="font-bold text-pink-800 text-sm text-center mb-4" dir="rtl">
          שם תואר מתאר שם עצם, ובאנגלית הוא בא <span className="font-black">לפני</span> שם העצם
        </p>

        <div className="flex flex-col gap-1.5">
          <div className="bg-pink-100 rounded-xl px-3 py-1.5 font-bold text-pink-700 text-base">
            <span className="font-black text-rose-600">green</span> eyes
          </div>
          <div className="bg-rose-100 rounded-xl px-3 py-1.5 font-bold text-rose-700 text-base">
            a <span className="font-black text-pink-600">red</span> pen
          </div>
        </div>
      </div>

      {/* a / an / the */}
      <div className="bg-white border-2 border-pink-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-pink-700 text-lg mb-2 text-center">a / an / the + adjective</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">
          the / an / a יבואו לפני שם התואר
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { a: 'a house', b: 'a big house' },
            { a: 'a man', b: 'an old man' },
            { a: 'the man', b: 'the old man' },
          ].map(({ a, b }) => (
            <div key={a} className="flex items-center justify-between bg-pink-50 rounded-xl px-3 py-1.5">
              <span className="font-bold text-gray-500 text-sm">{a}</span>
              <span className="text-pink-400 font-black">→</span>
              <span className="font-black text-pink-700 text-base">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* After to be */}
      <div className="bg-white border-2 border-rose-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-rose-700 text-lg mb-2 text-center">After “to be” (am / is / are)</h3>
        <p className="font-bold text-gray-500 text-sm mb-3 text-center" dir="rtl">
          שם התואר יבוא אחרי to be
        </p>
        <div className="flex flex-col gap-1.5">
          {['I am happy.', 'She is hungry.', 'We are tall.'].map(s => (
            <div key={s} className="bg-rose-50 rounded-xl px-3 py-1.5 font-bold text-rose-700 text-base">{s}</div>
          ))}
        </div>
      </div>

      {/* as ... as */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
        <h3 className="font-display font-black text-amber-700 text-lg mb-2 text-center">as … as</h3>
        <p className="font-bold text-amber-800 text-sm mb-3 text-center" dir="rtl">
          להשוואת שני שמות עצם: as + adjective + as
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="bg-white border border-amber-200 rounded-xl px-3 py-1.5 font-bold text-gray-700 text-base">
            Dan is <span className="font-black text-amber-700">as old as</span> Dana.
          </div>
          <div className="bg-white border border-amber-200 rounded-xl px-3 py-1.5 font-bold text-gray-700 text-base">
            Dan is <span className="font-black text-red-600">not as old as</span> Dana.
          </div>
        </div>
      </div>
    </div>
  )
}

function ComparativeTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-pink-50 border-4 border-pink-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-pink-700 text-center mb-1">Comparative</h2>
        <p className="font-bold text-pink-800 text-sm text-center mb-4" dir="rtl">
          כאשר משווים שני שמות עצם שונים
        </p>

        <div className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-pink-100">
            <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm border-r border-pink-200">Short adjective</div>
            <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm">Long adjective</div>
          </div>
          <div className="grid grid-cols-2 border-t border-pink-100">
            <div className="text-center py-2 font-black text-pink-600 text-sm border-r border-pink-100">-er + than<br /><span className="text-xs font-bold text-gray-500">tall → taller than</span><br /><span className="text-xs font-bold text-gray-400" dir="rtl">גבוה מ...</span></div>
            <div className="text-center py-2 font-black text-rose-600 text-sm">more … than<br /><span className="text-xs font-bold text-gray-500">more dangerous than</span><br /><span className="text-xs font-bold text-gray-400" dir="rtl">יותר מסוכן מ...</span></div>
          </div>
        </div>
      </div>

      {/* Spelling */}
      <div className="bg-white border-2 border-pink-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-pink-700 text-lg mb-3 text-center">Spelling rules</h3>
        <div className="flex flex-col gap-3">
          {/* Box 1 — +er */}
          <div className="bg-pink-50 rounded-xl px-3 py-3">
            <div className="font-display font-black text-pink-700 text-lg mb-1.5">+er</div>
            <ul className="list-disc pr-5 flex flex-col gap-1 font-bold text-pink-800 text-sm" dir="rtl">
              <li>נוסיף לשם התואר er</li>
              <li>כאשר שם התואר מסתיים ב-e — נוסיף רק r</li>
              <li>כאשר שם התואר מסתיים ב-cvc (עיצור-תנועה-עיצור) נכפיל את האות האחרונה ונוסיף er. את האותיות w, x, y לא נכפיל</li>
            </ul>
            <div className="font-bold text-pink-700 text-base mt-2">bigger, later</div>
          </div>
          {/* Box 2 — y → ier */}
          <div className="bg-pink-50 rounded-xl px-3 py-3">
            <div className="font-display font-black text-pink-700 text-lg mb-1.5">y → ier</div>
            <ul className="list-disc pr-5 flex flex-col gap-1 font-bold text-pink-800 text-sm" dir="rtl">
              <li>כאשר שם התואר מסתיים ב-y ולפניה עיצור — נוריד את ה-y ונוסיף ier</li>
            </ul>
            <div className="font-bold text-pink-700 text-base mt-2">easier</div>
          </div>
          {/* Box 3 — more … than */}
          <div className="bg-pink-50 rounded-xl px-3 py-3">
            <div className="font-display font-black text-pink-700 text-lg mb-1.5">more … than</div>
            <ul className="list-disc pr-5 flex flex-col gap-1 font-bold text-pink-800 text-sm" dir="rtl">
              <li>כאשר שם התואר ארוך נשתמש במבנה: more + adjective + than</li>
            </ul>
            <div className="font-bold text-pink-700 text-base mt-2">more dangerous than</div>
          </div>
          {/* Box 4 — irregular */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-3">
            <div className="font-display font-black text-amber-700 text-lg mb-1">irregular ⚠️</div>
            <p className="font-bold text-amber-800 text-sm mb-2" dir="rtl">יוצאי דופן</p>
            <div className="flex flex-col gap-1.5">
              <div className="bg-white border border-amber-200 rounded-lg px-3 py-1.5 font-bold text-amber-700 text-base">good → better than</div>
              <div className="bg-white border border-amber-200 rounded-lg px-3 py-1.5 font-bold text-amber-700 text-base">bad → worse than</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex flex-col gap-1.5">
        <div className="bg-white border border-rose-200 rounded-xl px-3 py-1.5 font-bold text-gray-700 text-base">
          A lion is <span className="font-black text-rose-600">more dangerous than</span> a mouse.
        </div>
      </div>
    </div>
  )
}

function SuperlativeTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-pink-50 border-4 border-pink-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-pink-700 text-center mb-1">Superlative</h2>
        <p className="font-bold text-pink-800 text-sm text-center mb-4" dir="rtl">
          כאשר רוצים להגיד שמשהו או מישהו הוא הכי... מכולם: the + est או the most
        </p>

        <div className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-pink-100">
            <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm border-r border-pink-200">Short adjective</div>
            <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm">Long adjective</div>
          </div>
          <div className="grid grid-cols-2 border-t border-pink-100">
            <div className="text-center py-2 font-black text-pink-600 text-sm border-r border-pink-100">the + -est<br /><span className="text-xs font-bold text-gray-500">tall → the tallest</span></div>
            <div className="text-center py-2 font-black text-rose-600 text-sm">the most …<br /><span className="text-xs font-bold text-gray-500">the most beautiful</span></div>
          </div>
        </div>
      </div>

      {/* Spelling */}
      <div className="bg-white border-2 border-pink-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-pink-700 text-lg mb-3 text-center">Spelling rules</h3>
        <div className="flex flex-col gap-3">
          {/* Box 1 — the + est */}
          <div className="bg-pink-50 rounded-xl px-3 py-3">
            <div className="font-display font-black text-pink-700 text-lg mb-1.5">the + est</div>
            <ul className="list-disc pr-5 flex flex-col gap-1 font-bold text-pink-800 text-sm" dir="rtl">
              <li>נוסיף לשם התואר est</li>
              <li>כאשר שם התואר מסתיים ב-e — נוסיף רק st</li>
              <li>כאשר שם התואר מסתיים ב-cvc (עיצור-תנועה-עיצור) נכפיל את האות האחרונה ונוסיף est. את האותיות w, x, y לא נכפיל</li>
            </ul>
            <div className="font-bold text-pink-700 text-base mt-2">nice → the nicest, hot → the hottest</div>
          </div>
          {/* Box 2 — y → iest */}
          <div className="bg-pink-50 rounded-xl px-3 py-3">
            <div className="font-display font-black text-pink-700 text-lg mb-1.5">y → iest</div>
            <div className="font-bold text-pink-800 text-base">easy → the easiest</div>
          </div>
          {/* Box 3 — the most … */}
          <div className="bg-pink-50 rounded-xl px-3 py-3">
            <div className="font-display font-black text-pink-700 text-lg mb-1.5">the most …</div>
            <ul className="list-disc pr-5 flex flex-col gap-1 font-bold text-pink-800 text-sm" dir="rtl">
              <li>כאשר שם התואר ארוך נשתמש במבנה: the most + adjective</li>
            </ul>
            <div className="font-bold text-pink-700 text-base mt-2">the most beautiful</div>
          </div>
          {/* Box 4 — irregular */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-3">
            <div className="font-display font-black text-amber-700 text-lg mb-1">irregular ⚠️</div>
            <p className="font-bold text-amber-800 text-sm mb-2" dir="rtl">יוצאי דופן</p>
            <div className="flex flex-col gap-1.5">
              <div className="bg-white border border-amber-200 rounded-lg px-3 py-1.5 font-bold text-amber-700 text-base">good → the best</div>
              <div className="bg-white border border-amber-200 rounded-lg px-3 py-1.5 font-bold text-amber-700 text-base">bad → the worst</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex flex-col gap-1.5">
        <div className="bg-white border border-rose-200 rounded-xl px-3 py-1.5 font-bold text-gray-700 text-base">
          This is <span className="font-black text-rose-600">the most beautiful</span> painting in the world.
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

function s(raw: string, adj: string): SentencePart[] {
  const tokens = raw.split(/(\s+)/)
  const target = adj.toLowerCase()
  return tokens
    .filter(t => t.length > 0)
    .map(t => {
      if (/^\s+$/.test(t)) return { text: t, bold: false }
      const clean = t.replace(/[^a-zA-Z]/g, '').toLowerCase()
      return { text: t, bold: clean === target }
    })
}

const EX1_SENTENCES: Ex1Sentence[] = [
  { parts: s('I have a blue pen.', 'blue'),            emoji: '🖊️', hebrew: 'יש לי עט כחול.' },
  { parts: s('She is tall.', 'tall'),                  emoji: '📏', hebrew: 'היא גבוהה.' },
  { parts: s('We saw a big elephant.', 'big'),         emoji: '🐘', hebrew: 'ראינו פיל גדול.' },
  { parts: s('He has a fast car.', 'fast'),            emoji: '🏎️', hebrew: 'יש לו מכונית מהירה.' },
  { parts: s('The cake is sweet.', 'sweet'),           emoji: '🍰', hebrew: 'העוגה מתוקה.' },
  { parts: s('It is a cold day.', 'cold'),             emoji: '❄️', hebrew: 'זה יום קר.' },
  { parts: s('My dog is small.', 'small'),             emoji: '🐶', hebrew: 'הכלב שלי קטן.' },
  { parts: s('They are happy children.', 'happy'),     emoji: '😄', hebrew: 'הם ילדים שמחים.' },
  { parts: s('I read an interesting book.', 'interesting'), emoji: '📚', hebrew: 'קראתי ספר מעניין.' },
  { parts: s('The water is hot.', 'hot'),              emoji: '🔥', hebrew: 'המים חמים.' },
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
        <h2 className="font-display font-black text-xl text-pink-700 text-center mb-1">Read & Translate</h2>
        <p className="font-bold text-sm text-pink-600 text-center" dir="rtl">
          קראו את המשפט (שם התואר מודגש) ותרגמו. לחיצה על ? תציג את התרגום
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {EX1_SENTENCES.map((sentence, idx) => (
          <div key={idx} className="bg-white border-2 border-pink-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-base font-bold leading-relaxed text-gray-700">
                <span className="text-gray-400 font-black text-sm mr-2">{idx + 1}.</span>
                {sentence.parts.map((part, pIdx) => (
                  <span
                    key={pIdx}
                    className={part.bold ? 'font-black text-pink-600 bg-pink-100 rounded px-0.5' : 'text-gray-700'}
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
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-pink-50 text-pink-600 border-pink-300 hover:bg-pink-100'
                }`}
              >
                ?
              </button>
            </div>
            {revealed.has(idx) && (
              <p className="mt-2 pt-2 border-t border-pink-100 font-bold text-pink-700 text-base text-right" dir="rtl">
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
//  EX 2 — choose the adjective (2 options per sentence, no word bank)
// ════════════════════════════════════════════════════════════════════════════

interface Ex2Q { before: string; after: string; correct: string; wrong: string }

const EX2_QUESTIONS: Ex2Q[] = [
  { before: 'The baby is very',     after: '.',                 correct: 'small',       wrong: 'cold'        },
  { before: 'I am',                 after: ', I want to eat.',  correct: 'hungry',      wrong: 'new'         },
  { before: 'This book is',         after: '.',                 correct: 'interesting', wrong: 'sweet'       },
  { before: 'The ice is',           after: '.',                 correct: 'cold',        wrong: 'young'       },
  { before: 'My grandpa is',        after: '.',                 correct: 'old',         wrong: 'new'         },
  { before: 'She got a',            after: 'phone today.',      correct: 'new',         wrong: 'old'         },
  { before: 'The princess is so',   after: '.',                 correct: 'beautiful',   wrong: 'hungry'      },
  { before: 'An elephant is',       after: '.',                 correct: 'big',         wrong: 'small'      },
  { before: 'This cake is very',    after: '.',                 correct: 'sweet',       wrong: 'cold'        },
  { before: 'My little sister is',  after: '.',                 correct: 'young',       wrong: 'old'         },
  { before: 'The flower is',        after: '.',                 correct: 'pretty',      wrong: 'hungry'      },
  { before: 'My teacher is very',   after: '.',                 correct: 'nice',        wrong: 'cold'        },
  { before: 'A mouse is',           after: '.',                 correct: 'small',       wrong: 'big'         },
  { before: 'In winter the days are', after: '.',               correct: 'cold',        wrong: 'sweet'       },
  { before: 'The honey is',         after: '.',                 correct: 'sweet',       wrong: 'interesting' },
]

// 2 options per question (correct + wrong), order toggled by index
function ex2Options(q: Ex2Q, idx: number): string[] {
  return idx % 2 === 0 ? [q.correct, q.wrong] : [q.wrong, q.correct]
}

function Ex2({ onDone }: { onDone: () => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [options] = useState<string[][]>(() => EX2_QUESTIONS.map((q, i) => ex2Options(q, i)))

  const total = EX2_QUESTIONS.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: string) => {
    if (answered[idx]) return
    if (val === EX2_QUESTIONS[idx].correct) {
      setAnswered(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-pink-700 text-center mb-1">Choose the adjective</h2>
        <p className="font-bold text-sm text-pink-600 text-center" dir="rtl">
          בחרו את שם התואר המתאים ביותר להשלמת המשפט
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-pink-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX2_QUESTIONS.map((q, idx) => {
          const isAnswered = answered[idx]
          return (
            <div key={idx} className="bg-white border-2 border-pink-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before + ' '}
                {isAnswered ? (
                  <span className="font-black text-green-600 bg-green-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-pink-300 font-black">___</span>
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
                          : 'bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100'
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
          <button onClick={onDone} className="btn-kid bg-pink-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 3 — as good as / not as good as from a scores table
// ════════════════════════════════════════════════════════════════════════════

interface Score { name: string; math: number; english: number }
const SCORES: Score[] = [
  { name: 'Gil',   math: 80,  english: 90  },
  { name: 'Dana',  math: 100, english: 90  },
  { name: 'Maya',  math: 80,  english: 100 },
  { name: 'Dan',   math: 100, english: 80  },
  { name: 'Yuval', math: 90,  english: 100 },
]
const scoreMap = Object.fromEntries(SCORES.map(s => [s.name, s])) as Record<string, Score>

interface Ex3Q { a: string; b: string; subject: 'math' | 'english' }
// correct = "as good as" when a's score >= b's score
const EX3_QUESTIONS: Ex3Q[] = [
  { a: 'Gil',   b: 'Dana',  subject: 'math'    }, // 80 < 100 -> not
  { a: 'Dana',  b: 'Dan',   subject: 'math'    }, // 100 = 100 -> as
  { a: 'Maya',  b: 'Gil',   subject: 'math'    }, // 80 = 80  -> as
  { a: 'Yuval', b: 'Dana',  subject: 'math'    }, // 90 < 100 -> not
  { a: 'Gil',   b: 'Dana',  subject: 'english' }, // 90 = 90  -> as
  { a: 'Yuval', b: 'Maya',  subject: 'english' }, // 100 = 100 -> as
  { a: 'Dan',   b: 'Maya',  subject: 'math'    }, // 100 >= 80 -> as
  { a: 'Gil',   b: 'Yuval', subject: 'math'    }, // 80 < 90  -> not
]

function ex3IsAsGood(q: Ex3Q): boolean {
  return scoreMap[q.a][q.subject] >= scoreMap[q.b][q.subject]
}

function Ex3({ onDone }: { onDone: () => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})

  const total = EX3_QUESTIONS.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: 'as' | 'not') => {
    if (answered[idx]) return
    const correct = ex3IsAsGood(EX3_QUESTIONS[idx]) ? 'as' : 'not'
    if (val === correct) {
      setAnswered(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-pink-700 text-center mb-1">as good as …?</h2>
        <p className="font-bold text-sm text-pink-600 text-center" dir="rtl">
          לפי טבלת הציונים — בחרו “as good as” אם הציון של הראשון גבוה או שווה, אחרת “not as good as”
        </p>
      </div>

      {/* Scores table */}
      <div className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden mb-4">
        <div className="grid grid-cols-3 bg-pink-100">
          <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm border-r border-pink-200">Name</div>
          <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm border-r border-pink-200">Math</div>
          <div className="font-display font-black text-pink-700 text-center py-1.5 text-sm">English</div>
        </div>
        {SCORES.map((row, i) => (
          <div key={row.name} className={`grid grid-cols-3 border-t border-pink-100 ${i % 2 ? 'bg-pink-50' : 'bg-white'}`}>
            <div className="text-center py-1.5 font-bold text-gray-700 text-sm border-r border-pink-100">{row.name}</div>
            <div className="text-center py-1.5 font-black text-pink-600 text-sm border-r border-pink-100">{row.math}</div>
            <div className="text-center py-1.5 font-black text-rose-600 text-sm">{row.english}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end text-sm font-bold text-pink-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX3_QUESTIONS.map((q, idx) => {
          const isAnswered = answered[idx]
          const correctLabel = ex3IsAsGood(q) ? 'as good as' : 'not as good as'
          return (
            <div key={idx} className="bg-white border-2 border-pink-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.a + ' '}
                {isAnswered ? (
                  <span className="font-black text-pink-600 bg-pink-100 rounded px-1">{correctLabel}</span>
                ) : (
                  <span className="text-pink-300 font-black">___</span>
                )}
                {' ' + q.b + ' in ' + (q.subject.charAt(0).toUpperCase() + q.subject.slice(1)) + '.'}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                  {(['as', 'not'] as const).map(optKey => (
                    <button
                      key={optKey}
                      onClick={() => choose(idx, optKey)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
                        wrong[idx] === optKey
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100'
                      }`}
                    >
                      {optKey === 'as' ? 'as good as' : 'not as good as'}
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
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד!</p>
          <button onClick={onDone} className="btn-kid bg-pink-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 4 — as ADJ as / not as ADJ as (match bracket polarity)
// ════════════════════════════════════════════════════════════════════════════

interface Ex4Q { a: string; b: string; adj: string; negated: boolean }
const EX4_QUESTIONS: Ex4Q[] = [
  { a: 'Adam',         b: 'his brother', adj: 'strong',      negated: false },
  { a: 'The movie',    b: 'the book',    adj: 'interesting', negated: true  },
  { a: 'A turtle',     b: 'a cheetah',   adj: 'fast',        negated: true  },
  { a: 'Maya',         b: 'Dana',        adj: 'tall',        negated: false },
  { a: 'This bag',     b: 'that bag',    adj: 'heavy',       negated: true  },
  { a: 'Tea',          b: 'coffee',      adj: 'hot',         negated: false },
  { a: 'My room',      b: 'your room',   adj: 'clean',       negated: false },
  { a: 'A bus',        b: 'a train',     adj: 'fast',        negated: true  },
  { a: 'The blue car', b: 'the red car', adj: 'expensive',   negated: false },
  { a: 'A mouse',      b: 'an elephant', adj: 'big',         negated: true  },
]

function Ex4({ onDone }: { onDone: () => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
  const [order] = useState<boolean[]>(() => EX4_QUESTIONS.map(() => Math.random() < 0.5))

  const total = EX4_QUESTIONS.length
  const done = Object.keys(answered).length
  const allDone = done === total

  const choose = (idx: number, val: 'as' | 'not') => {
    if (answered[idx]) return
    const correct = EX4_QUESTIONS[idx].negated ? 'not' : 'as'
    if (val === correct) {
      setAnswered(prev => ({ ...prev, [idx]: true }))
    } else {
      setWrong(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrong(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="mb-4">
        <h2 className="font-display font-black text-xl text-pink-700 text-center mb-1">as … as / not as … as</h2>
        <p className="font-bold text-sm text-pink-600 text-center" dir="rtl">
          בחרו את הצירוף שמתאים לשם התואר שבסוגריים (שימו לב למילה not)
        </p>
      </div>

      <div className="flex justify-end text-sm font-bold text-pink-500 mb-3">
        <span>{done} / {total} ✓</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {EX4_QUESTIONS.map((q, idx) => {
          const isAnswered = answered[idx]
          const correctLabel = q.negated ? `not as ${q.adj} as` : `as ${q.adj} as`
          const asLabel = `as ${q.adj} as`
          const notLabel = `not as ${q.adj} as`
          const opts: ('as' | 'not')[] = order[idx] ? ['as', 'not'] : ['not', 'as']
          const bracket = q.negated ? `(not ${q.adj})` : `(${q.adj})`
          return (
            <div key={idx} className="bg-white border-2 border-pink-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.a + ' is '}
                {isAnswered ? (
                  <span className="font-black text-pink-600 bg-pink-100 rounded px-1">{correctLabel}</span>
                ) : (
                  <span className="text-pink-300 font-black">___</span>
                )}
                {' ' + q.b + '. '}
                <span className="text-rose-400 font-black text-sm">{bracket}</span>
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                  {opts.map(optKey => (
                    <button
                      key={optKey}
                      onClick={() => choose(idx, optKey)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-xs border-2 transition-colors active:scale-95 ${
                        wrong[idx] === optKey
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100'
                      }`}
                    >
                      {optKey === 'as' ? asLabel : notLabel}
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
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד!</p>
          <button onClick={onDone} className="btn-kid bg-pink-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EX 5 — comparative SORT (4 categories)
// ════════════════════════════════════════════════════════════════════════════

type CompCat = '+er' | 'ier' | 'double' | 'more'

interface SortAdj { base: string; comparative: string; category: CompCat }

const EX5_ROUND1: SortAdj[] = [
  { base: 'nice',      comparative: 'nicer',                category: '+er'    },
  { base: 'late',      comparative: 'later',                category: '+er'    },
  { base: 'tall',      comparative: 'taller',               category: '+er'    },
  { base: 'long',      comparative: 'longer',               category: '+er'    },
  { base: 'angry',     comparative: 'angrier',              category: 'ier'    },
  { base: 'pretty',    comparative: 'prettier',             category: 'ier'    },
  { base: 'happy',     comparative: 'happier',              category: 'ier'    },
  { base: 'big',       comparative: 'bigger',               category: 'double' },
  { base: 'hot',       comparative: 'hotter',               category: 'double' },
  { base: 'beautiful', comparative: 'more beautiful than',  category: 'more'   },
  { base: 'dangerous', comparative: 'more dangerous than',  category: 'more'   },
  { base: 'popular',   comparative: 'more popular than',    category: 'more'   },
]

const EX5_ROUND2: SortAdj[] = [
  { base: 'expensive', comparative: 'more expensive than',  category: 'more'   },
  { base: 'hungry',    comparative: 'hungrier',             category: 'ier'    },
  { base: 'strong',    comparative: 'stronger',             category: '+er'    },
  { base: 'funny',     comparative: 'funnier',              category: 'ier'    },
  { base: 'cute',      comparative: 'cuter',                category: '+er'    },
  { base: 'sad',       comparative: 'sadder',               category: 'double' },
  { base: 'young',     comparative: 'younger',              category: '+er'    },
  { base: 'large',     comparative: 'larger',               category: '+er'    },
  { base: 'dirty',     comparative: 'dirtier',              category: 'ier'    },
  { base: 'thin',      comparative: 'thinner',              category: 'double' },
  { base: 'old',       comparative: 'older',                category: '+er'    },
]

function Ex5Round({ items, onDone }: { items: SortAdj[]; onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<SortAdj | null>(null)
  const [placed, setPlaced] = useState<Record<CompCat, SortAdj[]>>({ '+er': [], 'ier': [], 'double': [], 'more': [] })
  const [flashWrong, setFlashWrong] = useState<CompCat | null>(null)
  const [usedBases, setUsedBases] = useState<Set<string>>(new Set())

  const remaining = items.filter(v => !usedBases.has(v.base))
  const allDone = usedBases.size === items.length

  const handleWordClick = (item: SortAdj) => {
    if (usedBases.has(item.base)) return
    setSelectedWord(prev => prev?.base === item.base ? null : item)
  }

  const handleCategoryClick = (cat: CompCat) => {
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

  const CATS: { id: CompCat; label: string; color: string }[] = [
    { id: '+er',    label: '+er',          color: 'border-pink-400 bg-pink-50'     },
    { id: 'ier',    label: 'y → ier',      color: 'border-rose-400 bg-rose-50'     },
    { id: 'double', label: 'double + er',  color: 'border-fuchsia-400 bg-fuchsia-50' },
    { id: 'more',   label: 'more … than',  color: 'border-purple-400 bg-purple-50' },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort the comparatives</span>
        <span className="text-pink-500">{usedBases.size} / {items.length} ✓</span>
      </div>

      <p className="text-center font-display font-black text-pink-700 text-base mb-1" dir="rtl">מיון שמות תואר לפי כלל ההשוואה</p>
      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחץ על מילה ואז על הקטגוריה הנכונה</p>
      {selectedWord ? (
        <p className="text-center font-bold text-pink-500 text-sm mb-3">
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
                ? 'bg-pink-500 text-white border-pink-500 scale-105'
                : 'bg-white text-pink-700 border-pink-300 hover:bg-pink-50 active:scale-95'
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
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-pink-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-base text-pink-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.base} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-pink-600 text-sm border border-pink-200">
                    {item.comparative}
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
          <button onClick={onDone} className="btn-kid bg-pink-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function Ex5() {
  const rounds = [EX5_ROUND1, EX5_ROUND2]
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
          className="btn-kid bg-pink-500"
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
          className="btn-kid bg-pink-500"
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
        <span className="inline-block bg-pink-100 text-pink-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <Ex5Round
        key={round}
        items={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared TYPE-IN exercise (Ex 6 comparative, Ex 7 superlative)
// ════════════════════════════════════════════════════════════════════════════

interface TypeQ { before: string; after: string; adj: string; answer: string; alts?: string[] }

const EX6_QS: TypeQ[] = [
  { before: 'David is',        after: 'Meital.',         adj: 'popular',   answer: 'more popular than' },
  { before: 'My sister is',    after: 'my brother.',     adj: 'old',       answer: 'older than' },
  { before: 'Hanna is',        after: 'her sister.',     adj: 'nice',      answer: 'nicer than' },
  { before: 'A car is',        after: 'a bicycle.',      adj: 'expensive', answer: 'more expensive than' },
  { before: 'A lion is',       after: 'a cat.',          adj: 'dangerous', answer: 'more dangerous than' },
  { before: 'Summer is',       after: 'winter.',         adj: 'hot',       answer: 'hotter than' },
  { before: 'This book is',    after: 'that one.',       adj: 'good',      answer: 'better than' },
  { before: 'A plane is',      after: 'a car.',          adj: 'fast',      answer: 'faster than' },
  { before: 'Maths is',        after: 'art for me.',     adj: 'easy',      answer: 'easier than' },
  { before: 'Today is',        after: 'yesterday.',      adj: 'bad',       answer: 'worse than' },
]

const EX7_QS: TypeQ[] = [
  { before: 'August is',     after: 'month of the year.', adj: 'hot',     answer: 'the hottest' },
  { before: 'Rob is',        after: 'child here.',        adj: 'young',   answer: 'the youngest' },
  { before: 'This is',       after: 'exercise in the book.', adj: 'easy', answer: 'the easiest' },
  { before: 'Liam is',       after: 'girl in our school.', adj: 'popular', answer: 'the most popular' },
  { before: 'Tom is',        after: 'boy in the team.',   adj: 'tall',    answer: 'the tallest' },
  { before: 'It was',        after: 'day of my life.',    adj: 'good',    answer: 'the best' },
  { before: 'This is',       after: 'painting in the museum.', adj: 'beautiful', answer: 'the most beautiful' },
  { before: 'He is',         after: 'student in the class.', adj: 'clever', answer: 'the cleverest', alts: ['the most clever'] },
  { before: 'That was',      after: 'film I ever saw.',   adj: 'bad',     answer: 'the worst' },
  { before: 'Mount Everest is', after: 'mountain in the world.', adj: 'high', answer: 'the highest' },
]

function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ')
}

function TypeInExercise({ questions, onDone, instruction }: { questions: TypeQ[]; onDone: () => void; instruction: string }) {
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
        <span className="text-pink-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        {instruction}
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the correct form of the adjective
      </p>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-pink-500 mb-1">Adjective:</p>
        <p className="font-black text-pink-800 text-lg">{q.adj}</p>
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
            className="btn-kid bg-pink-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  PAGE
// ════════════════════════════════════════════════════════════════════════════

export default function AdjectivesPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn',       label: '📚 Learn' },
    { id: 'comparative', label: 'Comparative' },
    { id: 'superlative', label: 'Superlative' },
    { id: 'ex1',         label: 'Ex 1' },
    { id: 'ex2',         label: 'Ex 2' },
    { id: 'ex3',         label: 'Ex 3' },
    { id: 'ex4',         label: 'Ex 4' },
    { id: 'ex5',         label: 'Ex 5' },
    { id: 'ex6',         label: 'Ex 6' },
    { id: 'ex7',         label: 'Ex 7' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link
            href="/step5/grammar/adjectives-and-adverbs"
            className="text-white/70 font-bold text-sm no-underline hover:text-white"
          >
            ← Adjectives &amp; Adverbs
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Adjectives 📐</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שמות תואר — תיאור, השוואה והפלגה</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">big · bigger · the biggest</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn'       && <LearnTab />}
        {tab === 'comparative' && <ComparativeTab />}
        {tab === 'superlative' && <SuperlativeTab />}
        {tab === 'ex1'         && <Ex1 />}
        {tab === 'ex2'         && <ExWrapper render={done => <Ex2 onDone={done} />} />}
        {tab === 'ex3'         && <ExWrapper render={done => <Ex3 onDone={done} />} />}
        {tab === 'ex4'         && <ExWrapper render={done => <Ex4 onDone={done} />} />}
        {tab === 'ex5'         && <Ex5 />}
        {tab === 'ex6'         && <ExWrapper render={done => <TypeInExercise questions={EX6_QS} onDone={done} instruction="הקלידו את הצורה הנכונה של שם התואר לפי חוקי ה-comparative" />} />}
        {tab === 'ex7'         && <ExWrapper render={done => <TypeInExercise questions={EX7_QS} onDone={done} instruction="הקלידו את הצורה הנכונה של שם התואר לפי חוקי ה-superlative" />} />}
      </div>
    </div>
  )
}
