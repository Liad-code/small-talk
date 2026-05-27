'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { OPPOSITES, OppositePair } from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz1' | 'ex1' | 'ex2'

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  const speak = useSpeak()
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <p className="text-center font-bold text-gray-500 text-sm" dir="rtl">
        לחץ על כל זוג כדי לשמוע את המילים
      </p>
      <div className="flex flex-col gap-2">
        {OPPOSITES.map(p => (
          <div key={p.id} className="bg-white border-4 border-orange-200 rounded-2xl px-2 py-2 flex items-center gap-2">
            <button
              onClick={() => speak(p.word1, 0.8)}
              className="flex flex-col items-center w-16 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-4xl">{p.emoji1}</span>
              <span className="font-display font-black text-orange-800 text-base">{p.word1}</span>
              <span className="font-bold text-gray-500 text-sm" dir="rtl">{p.hebrew1}</span>
            </button>
            <div className="flex-1 text-center font-black text-gray-300 text-2xl">↔️</div>
            <button
              onClick={() => speak(p.word2, 0.8)}
              className="flex flex-col items-center w-16 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-4xl">{p.emoji2}</span>
              <span className="font-display font-black text-orange-800 text-base">{p.word2}</span>
              <span className="font-bold text-gray-500 text-sm" dir="rtl">{p.hebrew2}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Quiz 1: hear word → pick its opposite ────────────────────────────────────

type FlatWord = { pairId: string; word: string; isWord1: boolean; emoji: string }

function flattenWords(): FlatWord[] {
  return OPPOSITES.flatMap(p => [
    { pairId: p.id, word: p.word1, isWord1: true,  emoji: p.emoji1 },
    { pairId: p.id, word: p.word2, isWord1: false, emoji: p.emoji2 },
  ])
}

function getOpposite(item: FlatWord): FlatWord {
  const pair = OPPOSITES.find(p => p.id === item.pairId)!
  return item.isWord1
    ? { pairId: pair.id, word: pair.word2, isWord1: false, emoji: pair.emoji2 }
    : { pairId: pair.id, word: pair.word1, isWord1: true,  emoji: pair.emoji1 }
}

function Quiz1Inner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const all = flattenWords()
  const [queue] = useState<FlatWord[]>(() => shuffle(all))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<FlatWord[]>(() => {
    const cur = queue[0]
    const correct = getOpposite(cur)
    const wrong = shuffle(all.filter(w => w.pairId !== cur.pairId)).slice(0, 3)
    return shuffle([correct, ...wrong])
  })
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[idx]
  const correctOpposite = getOpposite(current)

  function handleAnswer(word: string) {
    if (selected) return
    setSelected(word)
    const isCorrect = word === correctOpposite.word
    if (isCorrect) setScore(s => s + 1)
    setTimeout(() => {
      setSelected(null)
      const next = idx + 1
      if (next >= queue.length) { setDone(true); return }
      const nextCur = queue[next]
      const nextCorrect = getOpposite(nextCur)
      const nextWrong = shuffle(all.filter(w => w.pairId !== nextCur.pairId)).slice(0, 3)
      setOptions(shuffle([nextCorrect, ...nextWrong]))
      setIdx(next)
      setTimeout(() => speak(queue[next].word, 0.8), 1000)
    }, 700)
  }

  if (done) return (
    <div className="text-center py-12 px-4 bounce-in">
      <div className="text-5xl mb-4">⭐</div>
      <p className="font-display font-bold text-2xl text-orange-700">{score}/{queue.length} correct!</p>
      <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
      <button onClick={onAgain} className="btn-kid bg-orange-500">🔁 Again</button>
    </div>
  )

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-orange-500">✅ {score}</span>
      </div>
      <div className="flex flex-col items-center gap-2 mb-6">
        <button
          onClick={() => current && speak(current.word, 0.8)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >🔊</button>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{current?.emoji}</span>
          <span className="font-display font-black text-orange-800 text-2xl">{current?.word}</span>
        </div>
        <p className="text-sm font-bold text-gray-500" dir="rtl">מה ההפך?</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isCorrect = selected !== null && opt.word === correctOpposite.word
          const isWrong = selected === opt.word && opt.word !== correctOpposite.word
          return (
            <button
              key={`${opt.pairId}-${opt.word}`}
              onClick={() => handleAnswer(opt.word)}
              className={`
                rounded-2xl border-4 py-4 flex flex-col items-center gap-1
                transition-all duration-150 cursor-pointer select-none
                ${isCorrect ? 'bg-green-200 border-green-400 scale-105' : ''}
                ${isWrong ? 'bg-red-100 border-red-400 shake' : ''}
                ${!isCorrect && !isWrong ? 'bg-orange-50 border-orange-200 hover:bg-orange-100 hover:scale-105 active:scale-95' : ''}
              `}
            >
              <span className="text-4xl">{opt.emoji}</span>
              <span className="font-display font-black text-sm text-gray-700">{opt.word}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Quiz1Tab() {
  const [k, setK] = useState(0)
  return <Quiz1Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex1: Match opposites (2 rounds of 5) ──────────────────────────────────────

const MATCH_OPP_ROUNDS = [OPPOSITES.slice(0, 5), OPPOSITES.slice(5, 10)]

function MatchOppRound({ pairs, roundIdx, totalRounds, onNext, onDone }: {
  pairs: OppositePair[]; roundIdx: number; totalRounds: number; onNext: () => void; onDone: () => void
}) {
  const [leftCol] = useState(() => shuffle(pairs.map(p => ({ id: p.id, word: p.word1, emoji: p.emoji1 }))))
  const [rightCol] = useState(() => shuffle(pairs.map(p => ({ id: p.id, word: p.word2, emoji: p.emoji2 }))))
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null)
  const allDone = matched.size === pairs.length

  function handleLeft(id: string) {
    if (matched.has(id)) return
    setSelLeft(id); setWrongPair(null)
  }

  function handleRight(id: string) {
    if (matched.has(id) || !selLeft) return
    if (selLeft === id) {
      setMatched(prev => { const s = new Set<string>(); prev.forEach(v => s.add(v)); s.add(id); return s })
      setSelLeft(null)
    } else {
      setWrongPair([selLeft, id])
      setTimeout(() => { setWrongPair(null); setSelLeft(null) }, 600)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">לחץ על מילה משמאל ואחר כך על ההפך שלה מימין</p>
        <span className="text-xs font-bold text-orange-500">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-2">
          {leftCol.map(item => {
            const isMatched = matched.has(item.id)
            const isSel = selLeft === item.id
            const isWrong = wrongPair?.[0] === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleLeft(item.id)}
                disabled={isMatched}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-4 font-display font-black text-sm text-left transition-all
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-700 opacity-60' : ''}
                  ${isSel ? 'bg-orange-200 border-orange-500 text-orange-900 scale-105' : ''}
                  ${isWrong ? 'bg-red-100 border-red-400 shake' : ''}
                  ${!isMatched && !isSel && !isWrong ? 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-100 hover:scale-105 active:scale-95 cursor-pointer' : ''}
                `}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.word}</span>
              </button>
            )
          })}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {rightCol.map(item => {
            const isMatched = matched.has(item.id)
            const isWrong = wrongPair?.[1] === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleRight(item.id)}
                disabled={isMatched || !selLeft}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-4 font-display font-black text-sm text-left transition-all
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-700 opacity-60' : ''}
                  ${isWrong ? 'bg-red-100 border-red-400 shake' : ''}
                  ${!isMatched && !isWrong && selLeft ? 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-200 hover:scale-105 active:scale-95 cursor-pointer' : ''}
                  ${!isMatched && !isWrong && !selLeft ? 'bg-gray-50 border-gray-200 text-gray-400' : ''}
                `}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.word}</span>
              </button>
            )
          })}
        </div>
      </div>
      {allDone && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-orange-600 mb-3">
            {roundIdx + 1 < totalRounds ? `סבב ${roundIdx + 1} הושלם!` : 'כל הכבוד!'}
          </p>
          <div className="flex gap-3 justify-center">
            {roundIdx + 1 < totalRounds
              ? <button onClick={onNext} className="btn-kid bg-orange-500">סבב הבא →</button>
              : <button onClick={onDone} className="btn-kid bg-orange-500">✅ Done</button>}
          </div>
        </div>
      )}
    </div>
  )
}

function Ex1Tab() {
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)
  return (
    <MatchOppRound
      key={`${round}-${k}`}
      pairs={MATCH_OPP_ROUNDS[round]}
      roundIdx={round}
      totalRounds={MATCH_OPP_ROUNDS.length}
      onNext={() => setRound(r => r + 1)}
      onDone={() => { setRound(0); setK(n => n + 1) }}
    />
  )
}

// ── Ex2: See emoji → pick opposite word ──────────────────────────────────────

function Ex2Inner({ onAgain }: { onAgain: () => void }) {
  const [queue] = useState(() =>
    shuffle(OPPOSITES).map(p => {
      const showFirst = Math.random() < 0.5
      const shown = showFirst
        ? { emoji: p.emoji1, word: p.word1, correct: p.word2, wrong: shuffle(OPPOSITES.filter(x => x.id !== p.id).map(x => x.word2))[0] }
        : { emoji: p.emoji2, word: p.word2, correct: p.word1, wrong: shuffle(OPPOSITES.filter(x => x.id !== p.id).map(x => x.word1))[0] }
      return { id: p.id, ...shown, choices: shuffle([shown.correct, shown.wrong]) as [string, string] }
    })
  )
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const score = queue.filter(q => answers[q.id] === q.correct).length
  const allDone = Object.keys(answers).length === OPPOSITES.length

  function handlePick(id: string, choice: string) {
    if (answers[id] !== undefined) return
    setAnswers(prev => ({ ...prev, [id]: choice }))
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <p className="font-bold text-gray-500 text-xs" dir="rtl">מה ההפך?</p>
        <span className="text-orange-500">✅ {score}/{OPPOSITES.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {queue.map(q => {
          const ans = answers[q.id]
          const isCorrect = ans === q.correct
          const isWrong = ans !== undefined && !isCorrect
          return (
            <div
              key={q.id}
              className={`rounded-2xl border-4 p-3 transition-all
                ${isCorrect ? 'bg-green-100 border-green-400' : isWrong ? 'bg-red-100 border-red-400' : 'bg-white border-orange-200'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{q.emoji}</span>
                <span className="font-display font-black text-orange-800 text-lg">{q.word}</span>
                <span className="text-gray-400 text-sm ml-auto" dir="rtl">ההפך הוא?</span>
              </div>
              <div className="flex gap-2">
                {q.choices.map(ch => (
                  <button
                    key={ch}
                    onClick={() => handlePick(q.id, ch)}
                    disabled={ans !== undefined}
                    className={`flex-1 py-2 rounded-xl border-2 font-display font-black text-base transition-all
                      ${ans === ch && ch === q.correct ? 'bg-green-200 border-green-400 text-green-800' : ''}
                      ${ans === ch && ch !== q.correct ? 'bg-red-200 border-red-400 text-red-800' : ''}
                      ${ans !== ch && ans !== undefined ? 'opacity-40 border-gray-200 bg-gray-50 text-gray-400' : ''}
                      ${ans === undefined ? 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-100 active:scale-95 cursor-pointer' : ''}
                    `}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {allDone && (
        <div className="text-center mt-6 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-orange-600 mb-3">{score}/{OPPOSITES.length} correct!</p>
          <button onClick={onAgain} className="btn-kid bg-orange-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex2Tab() {
  const [k, setK] = useState(0)
  return <Ex2Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn'    },
  { id: 'quiz1', label: '🔊 Quiz 1'  },
  { id: 'ex1',   label: '🔗 Match'   },
  { id: 'ex2',   label: '↔️ Opposite' },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function OppositesPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Opposites ↔️</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">הפכים — 10 זוגות</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>
      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'quiz1' && <Quiz1Tab />}
        {tab === 'ex1'   && <Ex1Tab />}
        {tab === 'ex2'   && <Ex2Tab />}
      </div>
    </div>
  )
}
