'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

type Tab = 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5' | 'ex6' | 'ex7'

type Tense = 'simple' | 'progressive'

// ── ExWrapper ─────────────────────────────────────────────────────────────────

function ExWrapper({ render }: { render: (onDone: () => void) => React.ReactNode }) {
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

// ── Choose-tense data ─────────────────────────────────────────────────────────

interface ChooseQ {
  before: string   // text before the blank (incl. subject)
  after: string    // text after the blank (incl. time signal); '.' attaches directly
  simple: string   // present simple verb form
  progressive: string // present progressive verb form (aux + ing)
  answer: Tense
}

const EX1_QUESTIONS: ChooseQ[] = [
  { before: 'We',        after: 'to school every day.',  simple: 'walk',  progressive: 'are walking', answer: 'simple' },
  { before: 'Look! The baby', after: 'now.',             simple: 'sleeps', progressive: 'is sleeping', answer: 'progressive' },
  { before: 'He',        after: 'his homework every evening.', simple: 'does', progressive: 'is doing', answer: 'simple' },
  { before: 'I',         after: 'a book at the moment.',  simple: 'read',  progressive: 'am reading', answer: 'progressive' },
  { before: 'She',       after: 'tea every morning.',     simple: 'drinks', progressive: 'is drinking', answer: 'simple' },
  { before: 'They',      after: 'football right now.',    simple: 'play',  progressive: 'are playing', answer: 'progressive' },
  { before: 'My mom',    after: 'dinner every day.',      simple: 'cooks', progressive: 'is cooking', answer: 'simple' },
  { before: 'We',        after: 'TV now.',                simple: 'watch', progressive: 'are watching', answer: 'progressive' },
  { before: 'He',        after: 'to the park on Sunday.', simple: 'goes',  progressive: 'is going', answer: 'simple' },
  { before: 'Look! It',  after: 'now.',                   simple: 'rains', progressive: 'is raining', answer: 'progressive' },
  { before: 'I',         after: 'my teeth every morning.', simple: 'brush', progressive: 'am brushing', answer: 'simple' },
  { before: 'She',       after: 'a song at the moment.',  simple: 'sings', progressive: 'is singing', answer: 'progressive' },
]

const EX2_QUESTIONS: ChooseQ[] = [
  { before: 'They',      after: 'breakfast every morning.', simple: 'eat',  progressive: 'are eating', answer: 'simple' },
  { before: 'Look! He',  after: 'now.',                   simple: 'runs',  progressive: 'is running', answer: 'progressive' },
  { before: 'We',        after: 'the room right now.',     simple: 'clean', progressive: 'are cleaning', answer: 'progressive' },
  { before: 'My dad',    after: 'to work every day.',      simple: 'drives', progressive: 'is driving', answer: 'simple' },
  { before: 'I',         after: 'water at the moment.',    simple: 'drink', progressive: 'am drinking', answer: 'progressive' },
  { before: 'She',       after: 'the piano on Sunday.',    simple: 'plays', progressive: 'is playing', answer: 'simple' },
  { before: 'Look! The dog', after: 'now.',               simple: 'barks', progressive: 'is barking', answer: 'progressive' },
  { before: 'We',        after: 'English every week.',     simple: 'study', progressive: 'are studying', answer: 'simple' },
  { before: 'He',        after: 'a letter now.',           simple: 'writes', progressive: 'is writing', answer: 'progressive' },
  { before: 'They',      after: 'home every evening.',     simple: 'come',  progressive: 'are coming', answer: 'simple' },
]

function ChooseTenseEx({
  questions,
  accent,
  onDone,
}: {
  questions: ChooseQ[]
  accent: 'orange' | 'amber'
  onDone: () => void
}) {
  const [answers, setAnswers] = useState<Record<number, Tense>>({})
  const [wrongs, setWrongs] = useState<Record<number, Tense>>({})
  const [order] = useState<boolean[]>(() => questions.map(() => Math.random() < 0.5))
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: Tense) => {
    if (answers[idx]) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrongs(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  const accentText = accent === 'orange' ? 'text-orange-500' : 'text-amber-500'

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{total} sentences</span>
        <span className={accentText}>{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        בחרו את הצורה הנכונה לפי מילת הזמן
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4" dir="rtl">
        every day / on Sunday ← Present Simple · now / at the moment / Look! ← Present Progressive
      </p>

      <div className="flex flex-col gap-2.5 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const correctVal = q.answer === 'simple' ? q.simple : q.progressive
          const opts: Tense[] = order[idx] ? ['simple', 'progressive'] : ['progressive', 'simple']
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl px-3 py-3 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before}{' '}
                {ans ? (
                  <span className="font-black text-green-600 bg-green-100 rounded px-1">{correctVal}</span>
                ) : (
                  <span className="text-gray-300 font-black">___</span>
                )}
                {q.after === '.' ? q.after : ' ' + q.after}
              </span>
              {!ans ? (
                <div className="flex gap-1.5 ml-auto">
                  {opts.map(t => {
                    const label = t === 'simple' ? q.simple : q.progressive
                    return (
                      <button
                        key={t}
                        onClick={() => choose(idx, t)}
                        className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                          wrongs[idx] === t
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <span className="ml-auto text-green-500 font-bold text-lg">✓</span>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-5xl mb-2">👏</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד!</p>
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
        </div>
      )}
    </div>
  )
}

// ── Ex 3: builder (Subject | Time-signal → pick verb form) ────────────────────

interface BuildSubject { text: string; aux: string; thirdSing: boolean }

interface BuildRound {
  subject: BuildSubject
  signal: string
  signalTense: Tense
  base: string       // base verb, e.g. "play"
  simple: string     // present simple form (with s if 3rd sing), e.g. "plays" / "play"
  ing: string        // -ing form, e.g. "playing"
}

const EX3_ROUNDS: BuildRound[] = [
  { subject: { text: 'She', aux: 'is',  thirdSing: true  }, signal: 'now',           signalTense: 'progressive', base: 'eat',   simple: 'eats',  ing: 'eating'   },
  { subject: { text: 'We',  aux: 'are', thirdSing: false }, signal: 'every day',     signalTense: 'simple',      base: 'walk',  simple: 'walk',  ing: 'walking'  },
  { subject: { text: 'He',  aux: 'is',  thirdSing: true  }, signal: 'every evening', signalTense: 'simple',      base: 'do',    simple: 'does',  ing: 'doing'    },
  { subject: { text: 'They', aux: 'are', thirdSing: false }, signal: 'right now',    signalTense: 'progressive', base: 'play',  simple: 'play',  ing: 'playing'  },
  { subject: { text: 'I',   aux: 'am',  thirdSing: false }, signal: 'at the moment', signalTense: 'progressive', base: 'read',  simple: 'read',  ing: 'reading'  },
  { subject: { text: 'My mom', aux: 'is', thirdSing: true }, signal: 'every morning', signalTense: 'simple',     base: 'cook',  simple: 'cooks', ing: 'cooking'  },
]

function Ex3({ onDone }: { onDone: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flashWrong, setFlashWrong] = useState<string | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const round = EX3_ROUNDS[currentIdx]
  const total = EX3_ROUNDS.length

  // Build options: simple form + progressive (aux + ing). Correct depends on signal.
  const simpleForm = round.simple
  const progForm = `${round.subject.aux} ${round.ing}`
  const correct = round.signalTense === 'simple' ? simpleForm : progForm

  const choose = (val: string) => {
    if (flashWrong) return
    if (val === correct) {
      const sentence = round.signalTense === 'simple'
        ? `${round.subject.text} ${simpleForm} ${round.signal}.`
        : `${round.subject.text} ${progForm} ${round.signal}.`
      const newCompleted = [...completed, sentence]
      setCompleted(newCompleted)
      if (currentIdx + 1 < total) {
        setTimeout(() => setCurrentIdx(i => i + 1), 600)
      } else {
        setTimeout(() => setFinished(true), 600)
      }
    } else {
      setFlashWrong(val)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6 pb-16">
        <div className="text-center bounce-in mb-6">
          <div className="text-6xl mb-4">🌟</div>
          <p className="font-display font-bold text-3xl text-green-600 mb-1">Amazing!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">סיימת את כל המשפטים!</p>
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
        </div>
        <div className="flex flex-col gap-1.5">
          {completed.map((s, i) => (
            <div key={i} className="bg-orange-100 border-2 border-orange-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-orange-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-orange-800 text-base">{s}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Options: both verb forms, shuffled stably by index parity
  const options = currentIdx % 2 === 0 ? [simpleForm, progForm] : [progForm, simpleForm]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>Sentence {currentIdx + 1} / {total}</span>
        <span className="text-orange-500">{completed.length} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        בחרו את צורת הפועל הנכונה לפי הנושא ומילת הזמן. המעבר אוטומטי.
      </p>

      {/* Subject + Time signal */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3 text-center">
          <div className="font-bold text-purple-400 text-xs mb-1">Subject</div>
          <div className="font-display font-black text-purple-700 text-xl">{round.subject.text}</div>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-center">
          <div className="font-bold text-amber-400 text-xs mb-1">Time signal</div>
          <div className="font-display font-black text-amber-700 text-xl">{round.signal}</div>
        </div>
      </div>

      {/* Current sentence preview */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl px-4 py-4 mb-4 text-center">
        <p className="text-xl font-bold text-gray-700">
          {round.subject.text}{' '}
          <span className="bg-orange-100 rounded-lg px-2 py-0.5 text-orange-400">___</span>
          {' '}{round.signal}.
        </p>
      </div>

      {/* Verb form options */}
      <div className="flex gap-3 justify-center flex-wrap">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => choose(opt)}
            className={`px-5 py-3 rounded-2xl font-display font-black text-lg border-2 transition-all active:scale-95 ${
              flashWrong === opt
                ? 'bg-red-500 text-white border-red-500 scale-95'
                : 'bg-white text-orange-700 border-orange-300 hover:bg-orange-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div className="mt-6 flex flex-col gap-1.5">
          {completed.map((s, i) => (
            <div key={i} className="bg-orange-100 border-2 border-orange-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="font-bold text-orange-500 text-sm">{i + 1}.</span>
              <span className="font-bold text-orange-800 text-base">{s}</span>
              <span className="ml-auto text-green-500 font-bold">✓</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Ex 4: Sort time signals into 2 tense categories ──────────────────────────

interface SortChip { text: string; tense: Tense }

const EX4_CHIPS: SortChip[] = [
  { text: 'every day',     tense: 'simple'      },
  { text: 'now',           tense: 'progressive' },
  { text: 'every week',    tense: 'simple'      },
  { text: 'at the moment', tense: 'progressive' },
  { text: 'on Sunday',     tense: 'simple'      },
  { text: 'right now',     tense: 'progressive' },
  { text: 'every morning', tense: 'simple'      },
  { text: 'today',         tense: 'progressive' },
  { text: 'usually',       tense: 'simple'      },
  { text: 'always',        tense: 'simple'      },
  { text: 'often',         tense: 'simple'      },
  { text: 'never',         tense: 'simple'      },
  { text: 'sometimes',     tense: 'simple'      },
]

function Ex4({ onDone }: { onDone: () => void }) {
  const [placed, setPlaced] = useState<Record<Tense, SortChip[]>>({ simple: [], progressive: [] })
  const [flashWrong, setFlashWrong] = useState<Tense | null>(null)
  const [used, setUsed] = useState<Set<string>>(new Set())
  const [draggedChip, setDraggedChip] = useState<SortChip | null>(null)
  const [dragOverCat, setDragOverCat] = useState<Tense | null>(null)

  const remaining = EX4_CHIPS.filter(c => !used.has(c.text))
  const allDone = used.size === EX4_CHIPS.length

  const tryPlace = (cat: Tense, chip: SortChip) => {
    if (used.has(chip.text)) return
    if (chip.tense === cat) {
      setPlaced(prev => ({ ...prev, [cat]: [...prev[cat], chip] }))
      setUsed(prev => { const s = new Set(prev); s.add(chip.text); return s })
    } else {
      setFlashWrong(cat)
      setTimeout(() => setFlashWrong(null), 800)
    }
  }

  const handleDrop = (e: React.DragEvent, cat: Tense) => {
    e.preventDefault()
    setDragOverCat(null)
    const text = e.dataTransfer.getData('text/plain')
    const chip = draggedChip ?? EX4_CHIPS.find(c => c.text === text) ?? null
    if (chip) tryPlace(cat, chip)
    setDraggedChip(null)
  }

  const CATS: { id: Tense; label: string; color: string }[] = [
    { id: 'simple',      label: 'Present Simple',      color: 'border-orange-400 bg-orange-50' },
    { id: 'progressive', label: 'Present Progressive', color: 'border-sky-400 bg-sky-50' },
  ]

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
        <span>{EX4_CHIPS.length} signals</span>
        <span className="text-orange-500">{used.size} / {EX4_CHIPS.length} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גררו כל מילת זמן אל הזמן המתאים
      </p>

      {/* Chip bank */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 mb-5 min-h-[60px] flex flex-wrap gap-2 justify-center">
        {remaining.map(chip => (
          <div
            key={chip.text}
            draggable
            onDragStart={e => { setDraggedChip(chip); e.dataTransfer.setData('text/plain', chip.text); e.dataTransfer.effectAllowed = 'move' }}
            onDragEnd={() => { setDraggedChip(null); setDragOverCat(null) }}
            className={`px-4 py-2 rounded-xl font-display font-black text-sm border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
              draggedChip?.text === chip.text
                ? 'bg-orange-500 text-white border-orange-500 scale-105'
                : 'bg-white text-orange-700 border-orange-300 hover:bg-orange-50'
            }`}
          >
            {chip.text}
          </div>
        ))}
        {remaining.length === 0 && !allDone && (
          <span className="text-gray-400 font-bold text-sm self-center">All placed!</span>
        )}
      </div>

      {/* Category boxes */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {CATS.map(cat => {
          const isFlash = flashWrong === cat.id
          const isOver = dragOverCat === cat.id
          return (
            <div
              key={cat.id}
              onDragOver={e => { e.preventDefault(); setDragOverCat(cat.id) }}
              onDragLeave={() => setDragOverCat(prev => prev === cat.id ? null : prev)}
              onDrop={e => handleDrop(e, cat.id)}
              className={`rounded-2xl border-2 p-2 min-h-[140px] transition-all ${
                isFlash ? 'border-red-400 bg-red-50' : isOver ? 'border-orange-500 bg-orange-100 scale-105' : cat.color
              }`}
            >
              <div className="font-display font-black text-center text-sm text-gray-700 mb-2">{cat.label}</div>
              <div className="flex flex-col gap-1">
                {placed[cat.id].map(chip => (
                  <div key={chip.text} className="bg-white rounded-lg px-2 py-1 text-center font-bold text-gray-700 text-sm border border-gray-200">
                    {chip.text}
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
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
        </div>
      )}
    </div>
  )
}

// ── Ex 5 / 6 / 7: pick correct option by signal (two choices) ─────────────────

interface PickQ {
  before: string   // text before the blank (incl. subject / wh-word)
  after: string    // text after the blank ('.' / '?' attaches directly)
  optA: string     // first option
  optB: string     // second option
  answer: string   // the correct one (must equal optA or optB)
}

const EX5_QUESTIONS: PickQ[] = [
  { before: 'We',          after: 'to school every day.',   optA: "don't walk",   optB: "aren't walking",  answer: "don't walk" },
  { before: 'Look! The baby', after: 'now.',                optA: "doesn't sleep", optB: "isn't sleeping", answer: "isn't sleeping" },
  { before: 'She',         after: 'her homework every evening.', optA: "doesn't do", optB: "isn't doing",  answer: "doesn't do" },
  { before: 'I',           after: 'a book at the moment.',  optA: "don't read",   optB: "am not reading",  answer: "am not reading" },
  { before: 'They',        after: 'football every week.',   optA: "don't play",   optB: "aren't playing",  answer: "don't play" },
  { before: 'Look! He',    after: 'right now.',             optA: "doesn't run",  optB: "isn't running",   answer: "isn't running" },
  { before: 'My mom',      after: 'dinner every day.',      optA: "doesn't cook", optB: "isn't cooking",   answer: "doesn't cook" },
  { before: 'We',          after: 'TV now.',                optA: "don't watch",  optB: "aren't watching", answer: "aren't watching" },
  { before: 'He',          after: 'to the park on Sunday.', optA: "doesn't go",   optB: "isn't going",     answer: "doesn't go" },
  { before: 'I',           after: 'tea every morning.',     optA: "don't drink",  optB: "am not drinking", answer: "don't drink" },
]

const EX6_QUESTIONS: PickQ[] = [
  { before: '',  after: 'you walk to school every day?', optA: 'Do',   optB: 'Are', answer: 'Do' },
  { before: '',  after: 'she eating now?',               optA: 'Does', optB: 'Is',  answer: 'Is' },
  { before: '',  after: 'they play football every week?', optA: 'Do',  optB: 'Are', answer: 'Do' },
  { before: '',  after: 'he reading at the moment?',      optA: 'Does', optB: 'Is',  answer: 'Is' },
  { before: '',  after: 'you watching TV right now?',     optA: 'Do',   optB: 'Are', answer: 'Are' },
  { before: '',  after: 'your mom cook dinner every day?', optA: 'Does', optB: 'Is', answer: 'Does' },
  { before: '',  after: 'the baby sleeping now?',         optA: 'Does', optB: 'Is',  answer: 'Is' },
  { before: '',  after: 'they go to the park on Sunday?', optA: 'Do',   optB: 'Are', answer: 'Do' },
  { before: '',  after: 'she drink tea every morning?',   optA: 'Does', optB: 'Is',  answer: 'Does' },
  { before: '',  after: 'you running right now?',         optA: 'Do',   optB: 'Are', answer: 'Are' },
]

const EX7_QUESTIONS: PickQ[] = [
  { before: 'Where', after: 'you live?',           optA: 'do',   optB: 'are', answer: 'do' },
  { before: 'What',  after: 'she doing now?',       optA: 'does', optB: 'is',  answer: 'is' },
  { before: 'When',  after: 'they go to school?',   optA: 'do',   optB: 'are', answer: 'do' },
  { before: 'Why',   after: 'he crying right now?',  optA: 'does', optB: 'is',  answer: 'is' },
  { before: 'What',  after: 'you eat every day?',    optA: 'do',   optB: 'are', answer: 'do' },
  { before: 'Where', after: 'they playing at the moment?', optA: 'do', optB: 'are', answer: 'are' },
  { before: 'How',   after: 'she go to work every morning?', optA: 'does', optB: 'is', answer: 'does' },
  { before: 'Why',   after: 'you laughing now?',     optA: 'do',   optB: 'are', answer: 'are' },
  { before: 'When',  after: 'he watch TV every evening?', optA: 'does', optB: 'is', answer: 'does' },
  { before: 'What',  after: 'the baby doing right now?', optA: 'does', optB: 'is', answer: 'is' },
]

function PickBySignalEx({
  questions,
  hint,
  onDone,
}: {
  questions: PickQ[]
  hint: string
  onDone: () => void
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [wrongs, setWrongs] = useState<Record<number, string>>({})
  const [order] = useState<boolean[]>(() => questions.map(() => Math.random() < 0.5))
  const total = questions.length
  const answered = Object.keys(answers).length
  const allDone = answered === total

  const choose = (idx: number, val: string) => {
    if (answers[idx]) return
    if (val === questions[idx].answer) {
      setAnswers(prev => ({ ...prev, [idx]: val }))
    } else {
      setWrongs(prev => ({ ...prev, [idx]: val }))
      setTimeout(() => setWrongs(prev => { const n = { ...prev }; delete n[idx]; return n }), 700)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{total} sentences</span>
        <span className="text-orange-500">{answered} / {total} ✓</span>
      </div>

      <p className="text-center font-bold text-gray-500 text-sm mb-1" dir="rtl">
        בחרו את הצורה הנכונה לפי מילת הזמן
      </p>
      <p className="text-center font-bold text-gray-400 text-xs mb-4">{hint}</p>

      <div className="flex flex-col gap-2.5 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx]
          const opts = order[idx] ? [q.optA, q.optB] : [q.optB, q.optA]
          return (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl px-3 py-3 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
              <span className="text-base font-bold text-gray-700">
                {q.before ? q.before + ' ' : ''}
                {ans ? (
                  <span className="font-black text-green-600 bg-green-100 rounded px-1">{ans}</span>
                ) : (
                  <span className="text-gray-300 font-black">___</span>
                )}
                {' ' + q.after}
              </span>
              {!ans ? (
                <div className="flex gap-1.5 ml-auto">
                  {opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => choose(idx, opt)}
                      className={`px-3 py-1 rounded-lg font-display font-bold text-sm border-2 transition-colors active:scale-95 ${
                        wrongs[idx] === opt
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="ml-auto text-green-500 font-bold text-lg">✓</span>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div className="text-center bounce-in">
          <div className="text-5xl mb-2">👏</div>
          <p className="font-display font-bold text-2xl text-green-600 mb-1">{total}/{total} correct!</p>
          <p className="font-bold text-gray-500 mb-4" dir="rtl">כל הכבוד!</p>
          <button onClick={onDone} className="btn-kid bg-green-500">✅ Done<br /><span className="text-xs">(סיום)</span></button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MixedPracticePage() {
  const [tab, setTab] = useState<Tab>('ex1')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'ex1', label: 'Ex 1' },
    { id: 'ex2', label: 'Ex 2' },
    { id: 'ex3', label: 'Ex 3' },
    { id: 'ex4', label: 'Ex 4' },
    { id: 'ex5', label: 'Ex 5' },
    { id: 'ex6', label: 'Ex 6' },
    { id: 'ex7', label: 'Ex 7' },
  ]

  const TAB = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step4/grammar" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Grammar</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Mixed Practice 🔀</h1>
          <p className="text-white/70 font-bold text-xs" dir="rtl">תרגול מעורב — הווה פשוט מול הווה מתמשך</p>
          <p className="text-white/70 font-bold text-xs mt-0.5">every day → Simple · now → Progressive</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto">
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
        {tab === 'ex1' && (
          <ExWrapper render={done => <ChooseTenseEx questions={EX1_QUESTIONS} accent="orange" onDone={done} />} />
        )}
        {tab === 'ex2' && (
          <ExWrapper render={done => <ChooseTenseEx questions={EX2_QUESTIONS} accent="amber" onDone={done} />} />
        )}
        {tab === 'ex3' && (
          <ExWrapper render={done => <Ex3 onDone={done} />} />
        )}
        {tab === 'ex4' && (
          <ExWrapper render={done => <Ex4 onDone={done} />} />
        )}
        {tab === 'ex5' && (
          <ExWrapper render={done => <PickBySignalEx questions={EX5_QUESTIONS} hint="every day → don't / doesn't · now / Look! → am not / isn't / aren't" onDone={done} />} />
        )}
        {tab === 'ex6' && (
          <ExWrapper render={done => <PickBySignalEx questions={EX6_QUESTIONS} hint="every day → Do / Does · now / at the moment → Am / Is / Are" onDone={done} />} />
        )}
        {tab === 'ex7' && (
          <ExWrapper render={done => <PickBySignalEx questions={EX7_QUESTIONS} hint="every day → do / does · now / right now → am / is / are" onDone={done} />} />
        )}
      </div>
    </div>
  )
}
