'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'

type Tab = 'learn' | 'plural' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({
  render,
}: {
  render: (onDone: () => void) => React.ReactNode
}) {
  const [finished, setFinished] = useState(false)
  const [key, setKey] = useState(0)

  if (finished) {
    return (
      <div className="text-center py-14 px-4 bounce-in">
        <div className="text-6xl mb-4">🌟</div>
        <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
        <p className="font-bold text-gray-500 mb-6" dir="rtl">סיימת את כל התרגולים!</p>
        <button
          onClick={() => { setFinished(false); setKey(k => k + 1) }}
          className="btn-kid bg-blue-500"
        >
          🔁 Start Over
        </button>
      </div>
    )
  }

  return <div key={key}>{render(() => setFinished(true))}</div>
}

// ── Learn Tab: count / non-count + some/any ───────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      {/* Intro */}
      <div className="bg-orange-50 border-4 border-orange-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-3xl text-orange-700 text-center mb-2">
          Count & Non-Count 🧮
        </h2>
        <p className="font-bold text-orange-800 text-sm text-center" dir="rtl">
          יש שמות עצם שאפשר לספור ויש שאי אפשר לספור
        </p>
      </div>

      {/* Count nouns */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-orange-700 text-lg mb-2 text-center">✅ Count nouns</h3>
        <p className="font-bold text-gray-600 text-sm mb-3 text-center" dir="rtl">
          שמות עצם שאפשר לספור: נשתמש ב-a או an לפני שם עצם יחיד, נשתמש בצורת הרבים לשמות עצם ברבים.
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { en: 'a boy – two boys', he: 'ילד → שני ילדים' },
            { en: 'a book', he: 'ספר' },
            { en: 'The book is open.', he: 'הספר פתוח.' },
          ].map(({ en, he }) => (
            <div key={en} className="flex items-center justify-between bg-orange-50 rounded-xl px-3 py-1.5 gap-3">
              <span className="font-black text-orange-700 text-base">{en}</span>
              <span className="font-bold text-gray-500 text-sm" dir="rtl">{he}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Non-count nouns */}
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-amber-700 text-lg mb-3 text-center">🚫 Non-count nouns</h3>
        <ul className="flex flex-col gap-2 mb-3" dir="rtl">
          <li className="font-bold text-gray-600 text-sm">שמות עצם שאי אפשר לספור.</li>
          <li className="font-bold text-gray-600 text-sm">
            משתמשים בדרך כלל בצורת היחיד:
            <span className="block font-black text-amber-700 mt-1" dir="ltr">There is water on the table.</span>
          </li>
          <li className="font-bold text-gray-600 text-sm">לא משתמשים ב- a או an לפני שמות עצם בלתי ספירים.</li>
          <li className="font-bold text-gray-600 text-sm">אפשר להשתמש ב- the לפני שמות עצם בלתי ספירים.</li>
        </ul>
        <div className="flex flex-wrap gap-2 justify-center">
          {['bread', 'meat', 'milk', 'money', 'oil', 'sugar', 'water', 'pasta', 'soup', 'rice', 'time'].map(w => (
            <span key={w} className="bg-amber-100 text-amber-700 font-black rounded-full px-3 py-1 text-sm">{w}</span>
          ))}
        </div>
      </div>

      {/* some / any */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl p-4">
        <h3 className="font-display font-black text-orange-700 text-lg mb-3 text-center">some / any</h3>

        <ul className="flex flex-col gap-2 mb-3" dir="rtl">
          <li className="font-bold text-gray-600 text-sm">נשתמש ב- some או any כאשר יש לנו כמות לא מוגדרת.</li>
          <li className="font-bold text-gray-600 text-sm">אפשר להשתמש ב- some או any לפני שמות עצם ספירים וגם לפני שמות עצם לא ספירים.</li>
        </ul>

        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3 mb-3">
          <div className="font-display font-black text-green-700 text-center text-base mb-1">some</div>
          <p className="font-bold text-gray-600 text-sm text-center mb-2" dir="rtl">
            במשפטי חיוב משתמשים ב- some
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              'There are some oranges on the plate.',
              'We have some milk in the fridge.',
            ].map(s => (
              <div key={s} className="bg-white rounded-xl px-3 py-1.5 font-bold text-green-700 text-sm text-center border border-green-100">
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3">
          <div className="font-display font-black text-rose-700 text-center text-base mb-1">any</div>
          <p className="font-bold text-gray-600 text-sm text-center mb-2" dir="rtl">
            במשפטי שלילה ובשאלות משתמשים ב- any
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              "We don't have any milk.",
              'Do you have any water?',
            ].map(s => (
              <div key={s} className="bg-white rounded-xl px-3 py-1.5 font-bold text-rose-700 text-sm text-center border border-rose-100">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Plural Tab: regular + irregular plural rules ──────────────────────────────

function PluralTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16 flex flex-col gap-5">
      <div className="bg-orange-50 border-4 border-orange-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-orange-700 text-center mb-2">
          Plurals 🏷️
        </h2>
        <p className="font-bold text-orange-800 text-sm text-center mb-4" dir="rtl">
          כללי צורת הרבים של שמות עצם
        </p>

        {/* Rule 1: -s */}
        <div className="bg-orange-500 rounded-2xl p-3 mb-2">
          <p className="font-bold text-white text-sm text-center" dir="rtl">
            בדרך כלל, כדי להפוך שם עצם לרבים, מוסיפים את האות –s לצורת היחיד
          </p>
        </div>
        <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-orange-100">
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm border-r border-orange-200">יחיד</div>
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm">רבים</div>
          </div>
          {[['book', 'books'], ['cat', 'cats'], ['bag', 'bags'], ['pen', 'pens']].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-orange-100">
              <div className="text-center py-1.5 font-bold text-gray-700 text-base border-r border-orange-100">{sg}</div>
              <div className="text-center py-1.5 font-bold text-orange-600 text-base">{pl}</div>
            </div>
          ))}
        </div>

        {/* Rule 2: -es */}
        <div className="bg-amber-500 rounded-2xl p-3 mb-2">
          <p className="font-bold text-white text-sm text-center" dir="rtl">
            כאשר שם עצם ביחיד מסתיים ב- ss, sh, ch, x, o מוסיפים –es
          </p>
        </div>
        <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-amber-100">
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm border-r border-amber-200">יחיד</div>
            <div className="font-display font-black text-amber-700 text-center py-1.5 text-sm">רבים</div>
          </div>
          {[['glass', 'glasses'], ['brush', 'brushes'], ['bench', 'benches'], ['box', 'boxes'], ['potato', 'potatoes']].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-amber-100">
              <div className="text-center py-1.5 font-bold text-gray-700 text-base border-r border-amber-100">{sg}</div>
              <div className="text-center py-1.5 font-bold text-amber-600 text-base">{pl}</div>
            </div>
          ))}
        </div>

        {/* Rule 3: -ies */}
        <div className="bg-orange-600 rounded-2xl p-3 mb-2">
          <p className="font-bold text-white text-sm text-center" dir="rtl">
            כאשר שם עצם ביחיד מסתיים באות y ולפניה יש אות רגילה (עיצור), מסירים את ה-y ומוסיפים –ies
          </p>
        </div>
        <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-orange-100">
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm border-r border-orange-200">יחיד</div>
            <div className="font-display font-black text-orange-700 text-center py-1.5 text-sm">רבים</div>
          </div>
          {[['baby', 'babies'], ['party', 'parties']].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-orange-100">
              <div className="text-center py-1.5 font-bold text-gray-700 text-base border-r border-orange-100">{sg}</div>
              <div className="text-center py-1.5 font-bold text-orange-600 text-base">{pl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Irregular */}
      <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-5">
        <h2 className="font-display font-black text-2xl text-amber-700 text-center mb-2">
          Irregular Plurals ⚠️
        </h2>
        <p className="font-bold text-amber-800 text-sm text-center mb-4" dir="rtl">
          שמות עצם אלה יוצאי דופן — ילמדו אותם בעל פה
        </p>

        <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-amber-100">
            <div className="font-display font-black text-amber-700 text-center py-2 text-sm border-r border-amber-200">יחיד</div>
            <div className="font-display font-black text-amber-700 text-center py-2 text-sm">רבים</div>
          </div>
          {[
            ['child', 'children'],
            ['foot', 'feet'],
            ['mouse', 'mice'],
            ['man', 'men'],
            ['woman', 'women'],
            ['fish', 'fish'],
            ['sheep', 'sheep'],
          ].map(([sg, pl]) => (
            <div key={sg} className="grid grid-cols-2 border-t border-amber-100">
              <div className="text-center py-2 font-bold text-gray-700 text-base border-r border-amber-100">{sg}</div>
              <div className="text-center py-2 font-black text-amber-600 text-base">{pl}</div>
            </div>
          ))}
        </div>

        <p className="font-bold text-amber-600 text-xs text-center mt-3" dir="rtl">
          * fish ו-sheep זהות ביחיד וברבים
        </p>
      </div>
    </div>
  )
}

// ── Ex 1: Sort count vs non-count (2 rounds) ──────────────────────────────────

type CountCat = 'count' | 'noncount'

interface SortNoun {
  word: string
  category: CountCat
}

const EX1_R1: SortNoun[] = [
  { word: 'bread', category: 'noncount' },
  { word: 'milk',  category: 'noncount' },
  { word: 'money', category: 'noncount' },
  { word: 'water', category: 'noncount' },
  { word: 'rice',  category: 'noncount' },
  { word: 'sugar', category: 'noncount' },
  { word: 'dog',   category: 'count' },
  { word: 'pen',   category: 'count' },
  { word: 'book',  category: 'count' },
  { word: 'apple', category: 'count' },
  { word: 'car',   category: 'count' },
  { word: 'ball',  category: 'count' },
]

const EX1_R2: SortNoun[] = [
  { word: 'oil',    category: 'noncount' },
  { word: 'soup',   category: 'noncount' },
  { word: 'meat',   category: 'noncount' },
  { word: 'pasta',  category: 'noncount' },
  { word: 'tea',    category: 'noncount' },
  { word: 'salt',   category: 'noncount' },
  { word: 'cat',    category: 'count' },
  { word: 'bag',    category: 'count' },
  { word: 'chair',  category: 'count' },
  { word: 'banana', category: 'count' },
  { word: 'box',    category: 'count' },
  { word: 'cup',    category: 'count' },
]

function Ex1Round({ items, onDone }: { items: SortNoun[]; onDone: () => void }) {
  const [selectedWord, setSelectedWord] = useState<SortNoun | null>(null)
  const [placed, setPlaced] = useState<Record<CountCat, SortNoun[]>>({ count: [], noncount: [] })
  const [flashWrong, setFlashWrong] = useState<CountCat | null>(null)
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())
  const [bank] = useState<SortNoun[]>(() => shuffle(items))

  const remaining = bank.filter(n => !usedWords.has(n.word))
  const allDone = usedWords.size === items.length

  const handleWordClick = (item: SortNoun) => {
    if (usedWords.has(item.word)) return
    setSelectedWord(prev => prev?.word === item.word ? null : item)
  }

  const handleCategoryClick = (cat: CountCat) => {
    if (!selectedWord) return
    if (selectedWord.category === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], selectedWord] }))
      setUsedWords(prev => { const s = new Set(prev); s.add(selectedWord.word); return s })
      setSelectedWord(null)
    } else {
      setFlashWrong(cat)
      setTimeout(() => { setFlashWrong(null); setSelectedWord(null) }, 800)
    }
  }

  const CATS: { id: CountCat; label: string; color: string }[] = [
    { id: 'count',    label: 'Count',     color: 'border-orange-400 bg-orange-50' },
    { id: 'noncount', label: 'Non-Count', color: 'border-amber-400 bg-amber-50'   },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>Sort the nouns</span>
        <span className="text-orange-500">{usedWords.size} / {items.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">לחץ על מילה ואז על הקטגוריה הנכונה</p>
      {selectedWord ? (
        <p className="text-center font-bold text-orange-500 text-sm mb-3">
          Selected: <span className="font-black">{selectedWord.word}</span> — now click a category
        </p>
      ) : <div className="mb-3" />}

      {/* Word bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(item => (
          <button
            key={item.word}
            onClick={() => handleWordClick(item)}
            className={`px-4 py-2 rounded-xl font-display font-black text-base border-2 transition-all ${
              selectedWord?.word === item.word
                ? 'bg-orange-500 text-white border-orange-500 scale-105'
                : 'bg-white text-orange-700 border-orange-300 hover:bg-orange-50 active:scale-95'
            }`}
          >
            {item.word}
          </button>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category boxes */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[150px] cursor-pointer transition-all ${
                isFlash ? 'border-red-400 bg-red-50' : cat.color
              } ${selectedWord ? 'ring-2 ring-offset-1 ring-orange-300 hover:scale-105' : ''}`}
            >
              <div className="font-display font-black text-center text-lg text-orange-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(item => (
                  <div key={item.word} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-orange-600 text-sm border border-orange-200">
                    {item.word}
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
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function Ex1() {
  const rounds = [EX1_R1, EX1_R2]
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
          className="btn-kid bg-orange-500"
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
          className="btn-kid bg-orange-500"
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
        <span className="inline-block bg-orange-100 text-orange-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <Ex1Round
        key={round}
        items={rounds[round]}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ── Ex 2: some / any (choose) ─────────────────────────────────────────────────

interface ChoiceQ {
  before: string
  after: string
  correct: string
  options: string[]
}

const EX2_QUESTIONS: ChoiceQ[] = [
  { before: 'I want',          after: 'water.',             correct: 'some', options: ['some', 'any'] },
  { before: 'Do you have',     after: 'sugar?',             correct: 'any',  options: ['some', 'any'] },
  { before: "I don't have",    after: 'time.',              correct: 'any',  options: ['some', 'any'] },
  { before: 'There are',       after: 'bananas on the table.', correct: 'some', options: ['some', 'any'] },
  { before: 'I have',          after: 'money in my bag.',   correct: 'some', options: ['some', 'any'] },
  { before: "There isn't",     after: 'milk in the cup.',   correct: 'any',  options: ['some', 'any'] },
  { before: 'Do you want',     after: 'bread?',             correct: 'any',  options: ['some', 'any'] },
  { before: 'We have',         after: 'apples at home.',    correct: 'some', options: ['some', 'any'] },
  { before: "She doesn't have", after: 'books.',            correct: 'any',  options: ['some', 'any'] },
  { before: 'There is',        after: 'oil in the bottle.', correct: 'some', options: ['some', 'any'] },
  { before: 'Are there',       after: 'cats in the garden?',correct: 'any',  options: ['some', 'any'] },
  { before: 'I can see',       after: 'birds in the sky.',  correct: 'some', options: ['some', 'any'] },
  { before: "He doesn't drink", after: 'coffee.',           correct: 'any',  options: ['some', 'any'] },
  { before: 'Please give me',  after: 'rice.',              correct: 'some', options: ['some', 'any'] },
  { before: 'Is there',        after: 'meat in the soup?',  correct: 'any',  options: ['some', 'any'] },
]

// ── Ex 3: a / an / the / some / any (choose, 2 rounds) ─────────────────────────

const EX3_R1: ChoiceQ[] = [
  { before: 'I have',          after: 'dog.',                correct: 'a',    options: ['a', 'an', 'the'] },
  { before: 'There is',        after: 'orange on the table.',correct: 'an',   options: ['a', 'an', 'the'] },
  { before: 'There is',        after: 'water in the cup.',   correct: 'some', options: ['some', 'any', 'a'] },
  { before: '',                after: 'sun is hot.',         correct: 'The',  options: ['The', 'A', 'An'] },
  { before: "I don't have",    after: 'money.',              correct: 'any',  options: ['some', 'any', 'a'] },
  { before: 'She has',         after: 'apple in her bag.',   correct: 'an',   options: ['a', 'an', 'the'] },
  { before: 'I see',           after: 'cat in the garden.',  correct: 'a',    options: ['a', 'an', 'the'] },
  { before: 'Do you have',     after: 'sugar?',              correct: 'any',  options: ['some', 'any', 'the'] },
  { before: '',                after: 'moon is in the sky.', correct: 'The',  options: ['The', 'A', 'An'] },
  { before: 'There is',        after: 'milk in the fridge.', correct: 'some', options: ['some', 'any', 'an'] },
  { before: 'He is',           after: 'good teacher.',       correct: 'a',    options: ['a', 'an', 'the'] },
  { before: 'I eat',           after: 'egg every morning.',  correct: 'an',   options: ['a', 'an', 'the'] },
  { before: "There isn't",     after: 'bread on the plate.', correct: 'any',  options: ['some', 'any', 'a'] },
  { before: 'Please pass',     after: 'salt.',               correct: 'the',  options: ['the', 'an', 'any'] },
  { before: 'We have',         after: 'rice for dinner.',    correct: 'some', options: ['some', 'any', 'an'] },
]

const EX3_R2: ChoiceQ[] = [
  { before: 'I want',          after: 'apple, please.',       correct: 'an',   options: ['a', 'an', 'the'] },
  { before: 'She has',         after: 'cat at home.',         correct: 'a',    options: ['a', 'an', 'the'] },
  { before: 'There is',        after: 'oil in the bottle.',   correct: 'some', options: ['some', 'any', 'a'] },
  { before: '',                after: 'sky is blue today.',   correct: 'The',  options: ['The', 'A', 'An'] },
  { before: "We don't have",   after: 'bread.',               correct: 'any',  options: ['some', 'any', 'a'] },
  { before: 'He is',           after: 'honest boy.',          correct: 'an',   options: ['a', 'an', 'the'] },
  { before: 'I have',          after: 'pen in my bag.',       correct: 'a',    options: ['a', 'an', 'the'] },
  { before: 'Is there',        after: 'milk in the fridge?',  correct: 'any',  options: ['some', 'any', 'the'] },
  { before: '',                after: 'door is open.',        correct: 'The',  options: ['The', 'A', 'An'] },
  { before: 'There is',        after: 'sugar in my tea.',     correct: 'some', options: ['some', 'any', 'an'] },
  { before: 'My dad is',       after: 'doctor.',              correct: 'a',    options: ['a', 'an', 'the'] },
  { before: 'I eat',           after: 'orange every day.',    correct: 'an',   options: ['a', 'an', 'the'] },
  { before: "There isn't",     after: 'water in the glass.',  correct: 'any',  options: ['some', 'any', 'a'] },
  { before: 'Please close',    after: 'window.',              correct: 'the',  options: ['the', 'an', 'any'] },
  { before: 'They have',       after: 'pasta for lunch.',     correct: 'some', options: ['some', 'any', 'an'] },
]

function ChoiceExercise({
  questions,
  instruction,
  onDone,
}: {
  questions: ChoiceQ[]
  instruction: string
  onDone: () => void
}) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [wrong, setWrong] = useState<Record<number, string>>({})
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
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Choose the word</span>
        <span className="text-orange-500">{done} / {total} ✓</span>
      </div>
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">{instruction}</p>

      <div className="flex flex-col gap-2.5 mb-6">
        {questions.map((q, idx) => {
          const isAnswered = answered[idx]
          return (
            <div
              key={idx}
              className="bg-white border-2 border-orange-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 flex-wrap"
            >
              <span className="text-gray-400 font-black text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before ? q.before + ' ' : ''}
                {isAnswered ? (
                  <span className="font-black text-orange-600 bg-orange-100 rounded px-1">{q.correct}</span>
                ) : (
                  <span className="text-orange-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!isAnswered && (
                <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrong[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100'
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
        <div className="text-center bounce-in">
          <div className="text-5xl mb-2">🎉</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-3">{total}/{total} correct!</p>
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>
        </div>
      )}
    </div>
  )
}

function ChoiceRounds({
  rounds,
  instruction,
  themeBtn,
}: {
  rounds: ChoiceQ[][]
  instruction: string
  themeBtn: string
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
          className={`btn-kid ${themeBtn}`}
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
          className={`btn-kid ${themeBtn}`}
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
        <span className="inline-block bg-orange-100 text-orange-700 font-display font-black text-sm rounded-full px-3 py-1">
          Round {round + 1} / {rounds.length}
        </span>
      </div>
      <ChoiceExercise
        key={round}
        questions={rounds[round]}
        instruction={instruction}
        onDone={() => { if (isLast) setFinished(true); else setBetweenRounds(true) }}
      />
    </div>
  )
}

// ── Ex 4: type-in plural ──────────────────────────────────────────────────────

interface PluralQ {
  before: string
  after: string
  base: string
  answer: string
}

const EX4_QUESTIONS: PluralQ[] = [
  { before: 'I see four',      after: 'in the room.',      base: 'baby',  answer: 'babies'   },
  { before: 'There are three', after: '.',                 base: 'box',   answer: 'boxes'    },
  { before: 'Two',             after: 'are playing.',      base: 'child', answer: 'children' },
  { before: 'I have two',      after: '.',                 base: 'watch', answer: 'watches'  },
  { before: 'We went to two',  after: '.',                 base: 'party', answer: 'parties'  },
  { before: 'My',              after: 'hurt after the run.',base: 'foot',  answer: 'feet'     },
  { before: 'Three',          after: 'are working here.',  base: 'man',   answer: 'men'      },
  { before: 'The farmer has ten', after: '.',              base: 'sheep', answer: 'sheep'    },
  { before: 'I have three',    after: 'at home.',          base: 'dog',   answer: 'dogs'     },
  { before: 'There are five',  after: 'on the shelf.',     base: 'book',  answer: 'books'    },
  { before: 'I drank two',     after: 'of water.',         base: 'glass', answer: 'glasses'  },
  { before: 'There are two',   after: 'in the house.',     base: 'mouse', answer: 'mice'     },
  { before: 'Two',             after: 'are talking.',      base: 'woman', answer: 'women'    },
  { before: 'I see many',      after: 'in the sea.',       base: 'fish',  answer: 'fish'     },
  { before: 'She bought four', after: '.',                 base: 'apple', answer: 'apples'   },
]

function Ex4({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct' | 'reveal'>('idle')
  const [wrongCount, setWrongCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = EX4_QUESTIONS[current]
  const isLast = current === EX4_QUESTIONS.length - 1

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
    if (!input.trim() || status !== 'idle') return
    const trimmed = input.trim().toLowerCase().replace(/\s+/g, ' ')
    if (trimmed === q.answer.toLowerCase()) {
      setStatus('correct')
      setTimeout(advance, 800)
    } else {
      const nextWrong = wrongCount + 1
      setWrongCount(nextWrong)
      if (nextWrong >= 2) {
        // second wrong → reveal the correct answer green, hold 3s, then auto-advance
        setStatus('reveal')
        setInput(q.answer)
        setTimeout(advance, 3000)
      } else {
        // first wrong → flash red, clear, retry the SAME question
        setStatus('wrong')
        setTimeout(() => { setStatus('idle'); setInput('') }, 800)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Question {current + 1} / {EX4_QUESTIONS.length}</span>
        <span className="text-orange-500">{current} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        הקלידו את צורת הרבים של המילה שבסוגריים
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">
        Type the correct plural form
      </p>

      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl px-4 py-3 mb-3">
        <p className="text-xs font-bold text-orange-500 mb-1">Singular:</p>
        <p className="font-black text-orange-800 text-lg">{q.base}</p>
      </div>

      <div className={`border-2 rounded-2xl px-4 py-4 mb-4 transition-colors ${
        status === 'wrong'                          ? 'bg-red-50 border-red-300' :
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
            className={`border-b-2 font-bold text-base text-center min-w-[120px] focus:outline-none bg-transparent transition-colors ${
              status === 'wrong'                          ? 'border-red-400 text-red-600' :
              status === 'correct' || status === 'reveal' ? 'border-green-400 text-green-600' :
              'border-gray-400 text-gray-700 placeholder:text-gray-300'
            }`}
          />
          <span className="font-bold text-gray-700 text-base">{q.after}</span>
          {status === 'wrong'                          && <span className="text-xl">❌</span>}
          {(status === 'correct' || status === 'reveal') && <span className="text-xl">✅</span>}
        </div>
        {(status === 'correct' || status === 'reveal') && (
          <p className="mt-2 font-bold text-green-600 text-sm">
            ✔ <span className="font-black">{q.answer}</span>
          </p>
        )}
      </div>

      {status === 'idle' && (
        <div className="flex justify-center">
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="btn-kid bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ Check
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CountNonCountNounsPage() {
  const [tab, setTab] = useState<Tab>('learn')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn',  label: '📚 Learn' },
    { id: 'plural', label: '🔢 Plural' },
    { id: 'ex1',    label: 'Ex 1' },
    { id: 'ex2',    label: 'Ex 2' },
    { id: 'ex3',    label: 'Ex 3' },
    { id: 'ex4',    label: 'Ex 4' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step5/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Nouns: Count & Non-Count 🧮</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">שמות עצם — ספירים ובלתי ספירים</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">a / an / the · some / any · plurals</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB} ${tab === t.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn'  && <LearnTab />}
        {tab === 'plural' && <PluralTab />}
        {tab === 'ex1' && <Ex1 />}
        {tab === 'ex2' && (
          <ExWrapper render={done => (
            <ChoiceExercise
              questions={EX2_QUESTIONS}
              instruction="בחר some או any לפי סוג המשפט (חיוב → some, שלילה/שאלה → any)"
              onDone={done}
            />
          )} />
        )}
        {tab === 'ex3' && (
          <ChoiceRounds
            rounds={[EX3_R1, EX3_R2]}
            instruction="בחר את המילה הנכונה: a / an / the / some / any"
            themeBtn="bg-orange-500"
          />
        )}
        {tab === 'ex4' && (
          <ExWrapper render={done => <Ex4 onDone={done} />} />
        )}
      </div>
    </div>
  )
}
