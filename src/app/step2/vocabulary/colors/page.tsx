'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { shuffle } from '@/utils/shuffle'
import { COLORS, ColorItem } from '@/data/step2/vocabulary'
import { useSpeak } from '@/hooks/useSpeak'

type Tab = 'learn' | 'quiz1' | 'quiz2' | 'bubble' | 'memory' | 'match'

// ── Learn ────────────────────────────────────────────────────────────────────

function LearnTab() {
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-4" dir="rtl">
        לחץ על כל צבע כדי לשמוע אותו
      </p>
      <LearnGrid />
    </div>
  )
}

function LearnGrid() {
  const speak = useSpeak()
  return (
    <div className="grid grid-cols-3 gap-3">
      {COLORS.map(c => (
        <button
          key={c.name}
          onClick={() => speak(c.name, 0.8)}
          className={`
            rounded-2xl border-4 ${c.bg} ${c.border}
            flex flex-col items-center justify-center gap-2
            py-6 cursor-pointer select-none
            hover:scale-105 active:scale-95 transition-all duration-150
            shadow-md
          `}
        >
          <span className={`font-display font-black text-xl ${c.textDark ? 'text-gray-800' : 'text-white'}`}>
            {c.name}
          </span>
          <span className={`text-xl font-bold ${c.textDark ? 'text-gray-600' : 'text-white/70'}`}>🔊</span>
        </button>
      ))}
    </div>
  )
}

// ── Quiz 1: hear name → pick swatch ──────────────────────────────────────────

function Quiz1Inner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<ColorItem[]>(() => shuffle([...COLORS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<ColorItem[]>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[idx]

  useEffect(() => {
    if (!current) return
    const others = COLORS.filter(c => c.name !== current.name)
    setOptions(shuffle([current, ...shuffle(others).slice(0, 3)]))
  }, [current])

  function handleAnswer(name: string) {
    if (wrong) return
    if (name === current.name) {
      setScore(s => s + 1)
      const next = idx + 1
      if (next >= queue.length) setDone(true)
      else setIdx(next)
    } else {
      setWrong(name)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-pink-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-pink-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-pink-500">✅ {score}</span>
      </div>

      <div className="flex flex-col items-center gap-3 mb-8">
        <button
          onClick={() => current && speak(current.name, 0.75)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >
          🔊
        </button>
        <p className="text-sm font-bold text-gray-500" dir="rtl">האזן ובחר את הצבע</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map(opt => {
          const isWrong = wrong === opt.name
          return (
            <button
              key={opt.name}
              onClick={() => handleAnswer(opt.name)}
              className={`
                aspect-square rounded-3xl border-4 ${opt.bg} ${opt.border}
                transition-all duration-150 cursor-pointer select-none
                ${isWrong ? 'shake opacity-60' : ''}
                ${!isWrong ? 'hover:scale-105 active:scale-95 shadow-md' : ''}
              `}
            />
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

// ── Quiz 2: see swatch → pick word ───────────────────────────────────────────

function Quiz2Inner({ onAgain }: { onAgain: () => void }) {
  const [queue] = useState<ColorItem[]>(() => shuffle([...COLORS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<ColorItem[]>([])
  const [correct, setCorrect] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const cur = queue[idx]
    if (!cur) return
    const others = COLORS.filter(c => c.name !== cur.name)
    setOptions(shuffle([cur, ...shuffle(others).slice(0, 3)]))
  }, [idx, queue])

  function handleAnswer(name: string) {
    if (correct || done) return
    const cur = queue[idx]
    if (name === cur.name) {
      setCorrect(name)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        const next = idx + 1
        if (next >= queue.length) setDone(true)
        else setIdx(next)
      }, 600)
    } else {
      setWrong(name)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-pink-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-pink-500">🔁 Again</button>
      </div>
    )
  }

  const cur = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-pink-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">
        בחר את הצבע הנכון
      </p>

      <div className={`mx-auto mb-8 w-32 h-32 rounded-3xl border-4 ${cur?.bg} ${cur?.border} shadow-lg`} />

      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isCorrect = correct === opt.name
          const isWrong = wrong === opt.name
          return (
            <button
              key={opt.name}
              onClick={() => handleAnswer(opt.name)}
              className={`
                rounded-2xl border-4 py-4 font-display font-black text-xl
                transition-all duration-150 cursor-pointer select-none
                ${isCorrect ? 'bg-green-200 border-green-400 text-green-800 scale-105' : ''}
                ${isWrong ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
                ${!isCorrect && !isWrong ? 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100 hover:scale-105 active:scale-95' : ''}
              `}
            >
              {opt.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Quiz2Tab() {
  const [k, setK] = useState(0)
  return <Quiz2Inner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Bubble Pop ───────────────────────────────────────────────────────────────

function playPopSound() {
  if (typeof window === 'undefined') return
  try {
    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.start(); osc.stop(ctx.currentTime + 0.2)
    setTimeout(() => ctx.close().catch(() => {}), 300)
  } catch { /* audio unavailable */ }
}

interface ColorBubble extends ColorItem {
  x: number; y: number; size: number; floatIdx: number; delay: number; popped: boolean
}

function BubbleInner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<ColorItem[]>(() => shuffle([...COLORS]))
  const [targetIdx, setTargetIdx] = useState(0)
  const [bubbles, setBubbles] = useState<ColorBubble[]>(() =>
    COLORS.map((c, i) => ({
      ...c,
      x: 8 + i * (84 / (COLORS.length - 1)),
      y: 15 + (i % 3) * 22,
      size: 86 + (i % 3) * 10,
      floatIdx: i % 6,
      delay: i * 0.4,
      popped: false,
    }))
  )
  const [popping, setPopping] = useState<Set<string>>(new Set())
  const [wrongName, setWrongName] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  const remaining = bubbles.filter(b => !b.popped)
  const allPopped = remaining.length === 0 && bubbles.length > 0
  const target = queue[targetIdx]

  function handleStart() {
    setStarted(true)
    setTimeout(() => speak(queue[0].name, 0.8), 400)
  }

  const handleTap = useCallback((name: string) => {
    if (!started || allPopped || !target) return
    if (name === target.name) {
      playPopSound()
      setPopping(prev => { const s = new Set(prev); s.add(name); return s })
      const t = setTimeout(() => {
        setBubbles(prev => prev.map(b => b.name === name ? { ...b, popped: true } : b))
        setPopping(prev => { const s = new Set(prev); s.delete(name); return s })
        setTargetIdx(prev => {
          const next = prev + 1
          if (next < queue.length) setTimeout(() => speak(queue[next].name, 0.8), 300)
          return next
        })
      }, 300)
      timers.current.push(t)
    } else {
      setWrongName(name)
      setTimeout(() => setWrongName(null), 500)
    }
  }, [started, allPopped, target, queue, speak])

  return (
    <div className="p-4 max-w-lg mx-auto pb-16">
      <div
        className="relative bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-4 border-blue-200 overflow-hidden mb-5"
        style={{ height: '300px' }}
      >
        {bubbles.map(b => {
          const isWrong = wrongName === b.name
          const isPop = popping.has(b.name)
          return (
            <button
              key={b.name}
              onClick={() => handleTap(b.name)}
              disabled={b.popped || isPop}
              className={`
                absolute rounded-full border-4 font-display font-black
                flex items-center justify-center cursor-pointer select-none
                ${b.popped ? 'opacity-0 pointer-events-none' : ''}
                ${isPop ? 'bubble-popping' : ''}
                ${isWrong ? 'scale-110' : ''}
                ${!b.popped && !isWrong && !isPop ? 'hover:scale-110 active:scale-90 transition-all duration-300' : ''}
              `}
              style={{
                left: `${b.x}%`, top: `${b.y}%`,
                width: `${b.size}px`, height: `${b.size}px`,
                transform: 'translateX(-50%)',
                animation: b.popped || isWrong || isPop ? undefined
                  : `bubble-float-${b.floatIdx} ${5 + b.floatIdx * 1.1}s ease-in-out ${b.delay}s infinite`,
              }}
            >
              <div className={`w-full h-full rounded-full border-4 ${b.bg} ${b.border} ${isWrong ? 'bg-red-300 border-red-500' : ''}`} />
            </button>
          )
        })}
        {allPopped && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl bounce-in">🎉</span>
          </div>
        )}
      </div>

      {!started && !allPopped && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-bold text-gray-600" dir="rtl">לחץ להתחלת המשחק!</p>
          <button
            onClick={handleStart}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-4xl
                       shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                       flex items-center justify-center"
          >
            🔊
          </button>
        </div>
      )}

      {started && !allPopped && target && (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => speak(target.name, 0.8)}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-4xl
                       shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                       flex items-center justify-center"
          >
            🔊
          </button>
          <p className="font-display font-black text-2xl text-gray-700">{target.name}</p>
          <p className="text-xs text-gray-500 font-bold">{remaining.length} bubbles left</p>
        </div>
      )}

      {allPopped && (
        <div className="flex flex-col items-center gap-3 mt-2">
          <button onClick={onAgain} className="btn-kid bg-pink-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function BubbleTab() {
  const [k, setK] = useState(0)
  return <BubbleInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Memory Game ───────────────────────────────────────────────────────────────

interface ColorMemCard {
  id: string
  name: string
  type: 'swatch' | 'word'
  color: ColorItem
}

function buildColorMemCards(): ColorMemCard[] {
  const cards: ColorMemCard[] = []
  COLORS.forEach(c => {
    cards.push({ id: `s-${c.name}`, name: c.name, type: 'swatch', color: c })
    cards.push({ id: `w-${c.name}`, name: c.name, type: 'word',   color: c })
  })
  return shuffle(cards)
}

function ColorMemoryInner({ onAgain }: { onAgain: () => void }) {
  const [cards] = useState<ColorMemCard[]>(buildColorMemCards)
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [checking, setChecking] = useState(false)

  const allMatched = matched.size === cards.length

  function handleFlip(id: string) {
    if (checking || matched.has(id) || flipped.includes(id)) return
    const next = [...flipped, id]
    setFlipped(next)
    if (next.length === 2) {
      setChecking(true)
      const [a, b] = next.map(fid => cards.find(c => c.id === fid)!)
      if (a.name === b.name) {
        setTimeout(() => {
          setMatched(prev => { const s = new Set(prev); s.add(a.id); s.add(b.id); return s })
          setFlipped([])
          setChecking(false)
        }, 600)
      } else {
        setTimeout(() => { setFlipped([]); setChecking(false) }, 900)
      }
    }
  }

  if (allMatched) {
    return (
      <div className="text-center py-12 bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-display font-bold text-2xl text-green-600 mb-4">Amazing!</p>
        <button onClick={onAgain} className="btn-kid bg-pink-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-2" dir="rtl">
        לחץ על 2 כרטיסים בכל תור על מנת למצוא זוגות : צבע ושם הצבע
      </p>
      <div className="flex justify-end text-sm font-bold text-pink-500 mb-3">
        <span>{matched.size / 2} / {COLORS.length} ✓</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id)
          const isMatched = matched.has(card.id)
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`
                h-16 rounded-2xl border-4
                flex items-center justify-center text-center p-1
                transition-all duration-200 cursor-pointer select-none
                ${isMatched ? 'opacity-70 border-green-400' : ''}
                ${!isFlipped ? 'bg-pink-400 border-pink-500 hover:bg-pink-300 hover:scale-105 active:scale-95' : ''}
                ${isFlipped && !isMatched ? 'scale-105' : ''}
              `}
            >
              {isFlipped ? (
                card.type === 'swatch'
                  ? <div className={`w-full h-full rounded-xl border-2 ${card.color.bg} ${card.color.border}`} />
                  : <span className="font-display font-black text-base leading-tight text-gray-800">{card.name}</span>
              ) : (
                <span className="font-display font-black text-2xl text-white">?</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MemoryTab() {
  const [k, setK] = useState(0)
  return <ColorMemoryInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Match ─────────────────────────────────────────────────────────────────────

function MatchInner({ onAgain }: { onAgain: () => void }) {
  const [shuffled] = useState<ColorItem[]>(() => shuffle([...COLORS]))
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPair, setWrongPair] = useState<string | null>(null)

  const allDone = matched.size === COLORS.length

  function handleNameClick(name: string) {
    if (matched.has(name)) return
    setSelected(name)
    setWrongPair(null)
  }

  function handleSwatchClick(name: string) {
    if (!selected || matched.has(name)) return
    if (selected === name) {
      const next = new Set(matched); next.add(name)
      setMatched(next)
      setSelected(null)
    } else {
      setWrongPair(selected)
      setTimeout(() => { setWrongPair(null); setSelected(null) }, 500)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-8">
      <p className="text-center font-bold text-gray-500 text-sm mb-2" dir="rtl">
        לחץ על שם הצבע ועל הצבע המתאים
      </p>

      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          {shuffled.map(c => {
            const isMatched = matched.has(c.name)
            const isSel = selected === c.name
            const isWrong = wrongPair === c.name
            return (
              <button
                key={c.name}
                onClick={() => !isMatched && handleNameClick(c.name)}
                disabled={isMatched}
                className={`
                  py-1 px-3 rounded-xl border-4 font-bold text-sm text-left
                  transition-all duration-150 cursor-pointer select-none min-h-[38px]
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-800 opacity-60' : ''}
                  ${isSel ? 'bg-pink-200 border-pink-500 text-pink-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
                  ${!isMatched && !isSel && !isWrong ? 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100 hover:scale-105' : ''}
                `}
              >
                {c.name}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-1 w-12">
          {COLORS.map(c => {
            const isMatched = matched.has(c.name)
            return (
              <button
                key={c.name}
                onClick={() => !isMatched && handleSwatchClick(c.name)}
                disabled={isMatched}
                className={`
                  h-[38px] w-full rounded-xl border-4 ${c.bg} ${c.border}
                  transition-all duration-150 cursor-pointer select-none
                  ${isMatched ? 'opacity-50' : 'hover:scale-105 active:scale-95'}
                `}
              />
            )
          })}
        </div>
      </div>

      <div className="text-center mt-3 text-sm font-bold text-gray-400">
        {matched.size} / {COLORS.length} ✓
      </div>

      {allDone && (
        <div className="text-center mt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">Well done!</p>
          <button onClick={onAgain} className="btn-kid bg-pink-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function MatchTab() {
  const [k, setK] = useState(0)
  return <MatchInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn',  label: '📚 Learn'   },
  { id: 'quiz1',  label: '🔊 Quiz 1'  },
  { id: 'quiz2',  label: '🎯 Quiz 2'  },
  { id: 'bubble', label: '🫧 Bubbles' },
  { id: 'memory', label: '🃏 Memory'  },
  { id: 'match',  label: '🔗 Match'   },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function ColorsPage() {
  const [tab, setTab] = useState<Tab>('learn')

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Colors 🎨</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">צבעים — 11 צבעים</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {tab === 'learn'  && <LearnTab />}
        {tab === 'quiz1'  && <Quiz1Tab />}
        {tab === 'quiz2'  && <Quiz2Tab />}
        {tab === 'bubble' && <BubbleTab />}
        {tab === 'memory' && <MemoryTab />}
        {tab === 'match'  && <MatchTab />}
      </div>
    </div>
  )
}
