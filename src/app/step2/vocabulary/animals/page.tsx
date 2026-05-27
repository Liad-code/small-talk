'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DraggableTile } from '@/components/step1/DraggableTile'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { ANIMALS, AnimalItem } from '@/data/step2/vocabulary'

type Tab = 'learn' | 'quiz1' | 'quiz2' | 'ex1' | 'ex2' | 'ex3' | 'ex4'

// ── Learn ─────────────────────────────────────────────────────────────────────

function LearnTab() {
  const speak = useSpeak()
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-16 flex flex-col gap-5">
      <p className="text-center font-bold text-gray-500 text-sm" dir="rtl">
        לחץ על כל חיה כדי לשמוע את שמה באנגלית
      </p>
      <div className="grid grid-cols-3 gap-2">
        {ANIMALS.map(a => (
          <button
            key={a.id}
            onClick={() => speak(a.name, 0.8)}
            className="bg-white border-4 border-green-200 rounded-2xl px-2 py-3 flex flex-col items-center gap-1
                       hover:bg-green-50 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-5xl">{a.emoji}</span>
            <span className="font-display font-black text-green-800 text-base leading-tight text-center">{a.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-green-50 border-4 border-green-200 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-6 divide-x divide-green-200 bg-green-100 border-b-4 border-green-200">
          <div className="py-2 text-center font-bold text-green-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-green-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-green-700 text-xs">Pic</div>
          <div className="py-2 text-center font-bold text-green-700 text-xs">English</div>
          <div className="py-2 text-center font-bold text-green-700 text-xs" dir="rtl">עברית</div>
          <div className="py-2 text-center font-bold text-green-700 text-xs">Pic</div>
        </div>
        {Array.from({ length: Math.ceil(ANIMALS.length / 2) }, (_, i) => {
          const a1 = ANIMALS[i * 2]; const a2 = ANIMALS[i * 2 + 1]
          return (
            <div key={i} className={`grid grid-cols-6 divide-x divide-green-200 ${i % 2 === 0 ? 'bg-white' : 'bg-green-50/50'}`}>
              <div className="py-1.5 px-1 font-bold text-gray-800 text-xs">{a1.name}</div>
              <div className="py-1.5 px-1 font-bold text-gray-700 text-xs text-center" dir="rtl">{a1.hebrew}</div>
              <div className="py-1.5 text-center text-lg">{a1.emoji}</div>
              {a2 ? (
                <>
                  <div className="py-1.5 px-1 font-bold text-gray-800 text-xs">{a2.name}</div>
                  <div className="py-1.5 px-1 font-bold text-gray-700 text-xs text-center" dir="rtl">{a2.hebrew}</div>
                  <div className="py-1.5 text-center text-lg">{a2.emoji}</div>
                </>
              ) : <><div /><div /><div /></>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Quiz 1: hear word → pick emoji ───────────────────────────────────────────

function Quiz1Inner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<AnimalItem[]>(() => shuffle([...ANIMALS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<AnimalItem[]>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[idx]

  useEffect(() => {
    if (!current) return
    const others = ANIMALS.filter(a => a.id !== current.id)
    setOptions(shuffle([current, ...shuffle(others).slice(0, 3)]))
  }, [current])

  function handleAnswer(id: string) {
    if (wrong) return
    if (id === current.id) {
      setScore(s => s + 1)
      const next = idx + 1
      if (next >= queue.length) setDone(true)
      else {
        setIdx(next)
        setTimeout(() => speak(queue[next].name, 0.8), 1000)
      }
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-green-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-green-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-green-500">✅ {score}</span>
      </div>
      <div className="flex flex-col items-center gap-3 mb-8">
        <button
          onClick={() => current && speak(current.name, 0.8)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500
                     text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none
                     flex items-center justify-center"
        >🔊</button>
        <p className="text-sm font-bold text-gray-500" dir="rtl">האזן ובחר את החיה הנכונה</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isWrong = wrong === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              className={`
                rounded-2xl border-4 py-4 flex flex-col items-center gap-1
                transition-all duration-150 cursor-pointer select-none
                ${isWrong ? 'bg-red-100 border-red-400 shake' : 'bg-green-50 border-green-200 hover:bg-green-100 hover:scale-105 active:scale-95'}
              `}
            >
              <span className="text-5xl">{opt.emoji}</span>
              <span className="font-bold text-sm text-gray-500">{opt.name}</span>
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

// ── Quiz 2: see emoji → pick word ─────────────────────────────────────────────

function Quiz2Inner({ onAgain }: { onAgain: () => void }) {
  const [queue] = useState<AnimalItem[]>(() => shuffle([...ANIMALS]))
  const [idx, setIdx] = useState(0)
  const [options, setOptions] = useState<AnimalItem[]>([])
  const [correct, setCorrect] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const cur = queue[idx]
    if (!cur) return
    const others = ANIMALS.filter(a => a.id !== cur.id)
    setOptions(shuffle([cur, ...shuffle(others).slice(0, 3)]))
  }, [idx, queue])

  function handleAnswer(id: string) {
    if (correct || done) return
    const cur = queue[idx]
    if (id === cur.id) {
      setCorrect(id)
      setTimeout(() => {
        setScore(s => s + 1)
        setCorrect(null)
        const next = idx + 1
        if (next >= queue.length) setDone(true)
        else setIdx(next)
      }, 600)
    } else {
      setWrong(id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-4 bounce-in">
        <div className="text-5xl mb-4">⭐</div>
        <p className="font-display font-bold text-2xl text-green-700">{score}/{queue.length} correct!</p>
        <p className="font-bold text-gray-500 mt-1 mb-6" dir="rtl">כל הכבוד!</p>
        <button onClick={onAgain} className="btn-kid bg-green-500">🔁 Again</button>
      </div>
    )
  }

  const cur = queue[idx]
  return (
    <div className="max-w-sm mx-auto px-4 pb-16">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
        <span>{idx + 1} / {queue.length}</span>
        <span className="text-green-500">✅ {score}</span>
      </div>
      <p className="text-center text-gray-500 font-bold text-sm mb-4" dir="rtl">בחר את שם החיה המופיעה בתמונה</p>
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center gap-1">
          <div className="text-8xl">{cur?.emoji}</div>
          <div className="font-bold text-gray-500 text-base" dir="rtl">{cur?.hebrew}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isCorrect = correct === opt.id
          const isWrong = wrong === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              className={`
                rounded-2xl border-4 py-4 font-display font-black text-xl
                transition-all duration-150 cursor-pointer select-none
                ${isCorrect ? 'bg-green-200 border-green-400 text-green-800 scale-105' : ''}
                ${isWrong ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
                ${!isCorrect && !isWrong ? 'bg-green-50 border-green-300 text-green-900 hover:bg-green-100 hover:scale-105 active:scale-95' : ''}
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

// ── Ex1: Bubble Pop ───────────────────────────────────────────────────────────

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

interface AnimalBubble extends AnimalItem {
  x: number; y: number; size: number; floatIdx: number; delay: number; popped: boolean
}

const BUBBLE_COLORS = [
  'bg-red-300 border-red-500', 'bg-blue-300 border-blue-500', 'bg-green-300 border-green-500',
  'bg-yellow-300 border-yellow-500', 'bg-purple-300 border-purple-500', 'bg-pink-300 border-pink-500',
  'bg-orange-300 border-orange-500', 'bg-teal-300 border-teal-500', 'bg-indigo-300 border-indigo-500',
  'bg-rose-300 border-rose-500', 'bg-lime-300 border-lime-500', 'bg-cyan-300 border-cyan-500',
]

function BubbleInner({ onAgain }: { onAgain: () => void }) {
  const speak = useSpeak()
  const [queue] = useState<AnimalItem[]>(() => shuffle([...ANIMALS]))
  const [targetIdx, setTargetIdx] = useState(0)
  const [bubbles, setBubbles] = useState<AnimalBubble[]>(() =>
    ANIMALS.map((a, i) => ({
      ...a,
      x: 5 + i * (90 / (ANIMALS.length - 1)),
      y: 10 + (i % 4) * 20,
      size: 80 + (i % 3) * 10,
      floatIdx: i % 6,
      delay: i * 0.4,
      popped: false,
    }))
  )
  const [popping, setPopping] = useState<Set<string>>(new Set())
  const [wrongId, setWrongId] = useState<string | null>(null)
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

  const handleTap = useCallback((id: string) => {
    if (!started || allPopped || !target) return
    if (id === target.id) {
      playPopSound()
      setPopping(prev => { const s = new Set(prev); s.add(id); return s })
      const t = setTimeout(() => {
        setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b))
        setPopping(prev => { const s = new Set(prev); s.delete(id); return s })
        setTargetIdx(prev => {
          const next = prev + 1
          if (next < queue.length) setTimeout(() => speak(queue[next].name, 0.8), 300)
          return next
        })
      }, 300)
      timers.current.push(t)
    } else {
      setWrongId(id)
      setTimeout(() => setWrongId(null), 500)
    }
  }, [started, allPopped, target, queue, speak])

  return (
    <div className="p-4 max-w-lg mx-auto pb-16">
      <div
        className="relative bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-4 border-blue-200 overflow-hidden mb-5"
        style={{ height: '300px' }}
      >
        {bubbles.map((b, i) => {
          const isWrong = wrongId === b.id
          const isPop = popping.has(b.id)
          const colorClass = BUBBLE_COLORS[i % BUBBLE_COLORS.length]
          return (
            <button
              key={b.id}
              onClick={() => handleTap(b.id)}
              disabled={b.popped || isPop}
              className={`
                absolute rounded-full border-4 font-display font-black
                flex items-center justify-center cursor-pointer select-none
                ${b.popped ? 'opacity-0 pointer-events-none' : ''}
                ${isPop ? 'bubble-popping' : ''}
                ${isWrong ? 'scale-110' : ''}
                ${!b.popped && !isWrong && !isPop ? 'hover:scale-110 active:scale-90 transition-all duration-300' : ''}
                ${colorClass}
              `}
              style={{
                left: `${b.x}%`, top: `${b.y}%`,
                width: `${b.size}px`, height: `${b.size}px`,
                transform: 'translateX(-50%)',
                animation: b.popped || isWrong || isPop ? undefined
                  : `bubble-float-${b.floatIdx} ${5 + b.floatIdx * 1.1}s ease-in-out ${b.delay}s infinite`,
              }}
            >
              <span className="text-4xl">{b.emoji}</span>
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
          <button onClick={handleStart} className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none flex items-center justify-center">🔊</button>
        </div>
      )}
      {started && !allPopped && target && (
        <div className="flex flex-col items-center gap-2">
          <button onClick={() => speak(target.name, 0.8)} className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-4xl shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer select-none flex items-center justify-center">🔊</button>
          <p className="font-display font-black text-2xl text-gray-700">{target.name}</p>
          <p className="text-xs text-gray-500 font-bold">{remaining.length} bubbles left</p>
        </div>
      )}
      {allPopped && (
        <div className="flex flex-col items-center gap-3 mt-2">
          <button onClick={onAgain} className="btn-kid bg-green-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex1Tab() {
  const [k, setK] = useState(0)
  return <BubbleInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex2: Memory Game ──────────────────────────────────────────────────────────

interface AnimalMemCard {
  id: string
  animalId: string
  type: 'emoji' | 'word'
  animal: AnimalItem
}

function buildMemCards(): AnimalMemCard[] {
  const cards: AnimalMemCard[] = []
  ANIMALS.forEach(a => {
    cards.push({ id: `e-${a.id}`, animalId: a.id, type: 'emoji', animal: a })
    cards.push({ id: `w-${a.id}`, animalId: a.id, type: 'word',  animal: a })
  })
  return shuffle(cards)
}

function MemoryInner({ onAgain }: { onAgain: () => void }) {
  const [cards] = useState<AnimalMemCard[]>(buildMemCards)
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
      if (a.animalId === b.animalId) {
        setTimeout(() => {
          setMatched(prev => { const s = new Set(prev); s.add(a.id); s.add(b.id); return s })
          setFlipped([]); setChecking(false)
        }, 1600)
      } else {
        setTimeout(() => { setFlipped([]); setChecking(false) }, 1900)
      }
    }
  }

  if (allMatched) {
    return (
      <div className="text-center py-12 bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-display font-bold text-2xl text-green-600 mb-4">Amazing!</p>
        <button onClick={onAgain} className="btn-kid bg-green-500">🔁 Again</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-2" dir="rtl">
        לחץ על 2 כרטיסים בכל תור על מנת למצוא זוגות: חיה ושם החיה
      </p>
      <div className="flex justify-end text-sm font-bold text-green-500 mb-3">
        <span>{matched.size / 2} / {ANIMALS.length} ✓</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id)
          const isMatched = matched.has(card.id)
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`
                h-14 rounded-xl border-4 flex items-center justify-center text-center p-1
                transition-all duration-200 cursor-pointer select-none
                ${isMatched ? 'opacity-70 border-green-400 bg-green-100' : ''}
                ${!isFlipped ? 'bg-green-500 border-green-600 hover:bg-green-400 hover:scale-105 active:scale-95' : ''}
                ${isFlipped && !isMatched ? 'scale-105 bg-white border-green-300' : ''}
              `}
            >
              {isFlipped ? (
                card.type === 'emoji'
                  ? <span className="text-2xl">{card.animal.emoji}</span>
                  : <span className="font-display font-black text-sm leading-tight text-gray-800">{card.animal.name}</span>
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

function Ex2Tab() {
  const [k, setK] = useState(0)
  return <MemoryInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex3: Sort – Sea vs Land ───────────────────────────────────────────────────

function SortInner({ onAgain }: { onAgain: () => void }) {
  const [seaSlots, setSeaSlots] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)
  const [k, setK] = useState(0)

  const seaAnimals = ANIMALS.filter(a => a.isSea)
  const allSorted = seaAnimals.every(a => seaSlots.has(a.id))
  const placed = new Set(seaSlots)
  const bank = shuffle(ANIMALS.map(a => a.id)).filter(id => !placed.has(id))

  const handleDrop = useCallback((tileId: string, targetEl: Element): boolean => {
    if (!targetEl.hasAttribute('data-sea-zone')) return false
    const animal = ANIMALS.find(a => a.id === tileId)!
    if (!animal.isSea) {
      setWrong(tileId)
      setTimeout(() => setWrong(null), 600)
      return false
    }
    setSeaSlots(prev => { const s = new Set(prev); s.add(tileId); return s })
    return true
  }, [])

  const [shuffledBank] = useState(() => shuffle(ANIMALS.map(a => a.id)))
  const visibleBank = shuffledBank.filter(id => !seaSlots.has(id))

  return (
    <div className="max-w-sm mx-auto px-3 pb-16">
      <p className="text-center font-bold text-gray-500 text-sm mb-3" dir="rtl">
        גרור רק את חיות הים לתוך הריבוע
      </p>

      {/* Sea zone */}
      <div
        data-sea-zone="true"
        data-drop-target="true"
        className="bg-blue-50 border-4 border-dashed border-blue-400 rounded-3xl p-3 mb-4 min-h-[120px]"
      >
        <p className="text-center font-display font-bold text-blue-700 mb-2 text-sm">🌊 Sea Animals</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from(seaSlots).map(id => {
            const a = ANIMALS.find(x => x.id === id)!
            return (
              <div key={id} className="flex flex-col items-center gap-0.5 bg-blue-100 border-2 border-blue-300 rounded-xl px-2 py-1">
                <span className="text-xl">{a.emoji}</span>
                <span className="text-xs font-bold text-blue-800">{a.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bank */}
      {visibleBank.length > 0 && (
        <div className="border-t-2 border-dashed border-gray-200 pt-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {visibleBank.map(id => {
              const a = ANIMALS.find(x => x.id === id)!
              return (
                <DraggableTile
                  key={`${id}-${k}`}
                  id={id}
                  label={a.name}
                  color={wrong === id ? 'bg-red-100' : 'bg-green-100'}
                  borderColor={wrong === id ? 'border-red-400' : 'border-green-400'}
                  textColor={wrong === id ? 'text-red-800' : 'text-green-900'}
                  size="sm"
                  className={`!w-auto min-w-[70px] px-2 text-base font-bold ${wrong === id ? 'shake' : ''}`}
                  onDropped={handleDrop}
                />
              )
            })}
          </div>
        </div>
      )}

      {allSorted && (
        <div className="text-center mt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">
            כל חיות הים נמצאו!
          </p>
          <button onClick={onAgain} className="btn-kid bg-green-500">🔁 Again</button>
        </div>
      )}
    </div>
  )
}

function Ex3Tab() {
  const [k, setK] = useState(0)
  return <SortInner key={k} onAgain={() => setK(n => n + 1)} />
}

// ── Ex4: Match word → emoji (2 rounds of 6) ──────────────────────────────────

type AnimalSel = { type: 'word' | 'emoji'; value: string }
const MATCH_ROUNDS_ANIMALS = [ANIMALS.slice(0, 6), ANIMALS.slice(6, 12)]

function MatchRound({ items, roundIdx, totalRounds, onNext, onDone }: {
  items: AnimalItem[]; roundIdx: number; totalRounds: number; onNext: () => void; onDone: () => void
}) {
  const [shuffledWords] = useState<AnimalItem[]>(() => shuffle([...items]))
  const [selected, setSelected] = useState<AnimalSel | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongSel, setWrongSel] = useState<AnimalSel | null>(null)
  const allDone = matched.size === items.length

  function handleWordClick(id: string) {
    if (matched.has(id)) return
    setWrongSel(null)
    if (!selected || selected.type === 'word') { setSelected({ type: 'word', value: id }) }
    else {
      if (selected.value === id) { setMatched(prev => { const s = new Set(prev); s.add(id); return s }); setSelected(null) }
      else { setWrongSel(selected); setTimeout(() => { setWrongSel(null); setSelected(null) }, 500) }
    }
  }

  function handleEmojiClick(id: string) {
    if (matched.has(id)) return
    setWrongSel(null)
    if (!selected || selected.type === 'emoji') { setSelected({ type: 'emoji', value: id }) }
    else {
      if (selected.value === id) { setMatched(prev => { const s = new Set(prev); s.add(id); return s }); setSelected(null) }
      else { setWrongSel(selected); setTimeout(() => { setWrongSel(null); setSelected(null) }, 500) }
    }
  }

  return (
    <div className="max-w-sm mx-auto px-3 pb-8">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-gray-500 text-sm" dir="rtl">לחץ על שם החיה ועל הציור המתאים</p>
        <span className="text-xs font-bold text-green-500">סבב {roundIdx + 1}/{totalRounds}</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          {shuffledWords.map(a => {
            const isMatched = matched.has(a.id)
            const isSel = selected?.type === 'word' && selected.value === a.id
            const isWrong = wrongSel?.type === 'word' && wrongSel.value === a.id
            return (
              <button
                key={a.id}
                onClick={() => !isMatched && handleWordClick(a.id)}
                disabled={isMatched}
                className={`
                  py-1 px-3 rounded-xl border-4 font-bold text-base text-left
                  transition-all duration-150 cursor-pointer select-none min-h-[42px]
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-800 opacity-60' : ''}
                  ${isSel ? 'bg-green-200 border-green-500 text-green-900 scale-105 shadow-lg' : ''}
                  ${isWrong ? 'bg-red-100 border-red-400 text-red-800 shake' : ''}
                  ${!isMatched && !isSel && !isWrong ? 'bg-green-50 border-green-300 text-green-800 hover:bg-green-100 hover:scale-105' : ''}
                `}
              >{a.name}</button>
            )
          })}
        </div>
        <div className="flex flex-col gap-1 w-16">
          {items.map(a => {
            const isMatched = matched.has(a.id)
            const isEmojiSel = selected?.type === 'emoji' && selected.value === a.id
            const isEmojiWrong = wrongSel?.type === 'emoji' && wrongSel.value === a.id
            return (
              <button
                key={a.id}
                onClick={() => !isMatched && handleEmojiClick(a.id)}
                disabled={isMatched}
                className={`
                  h-[52px] w-full rounded-xl border-4 flex items-center justify-center text-3xl
                  transition-all duration-150 cursor-pointer select-none
                  ${isMatched ? 'bg-green-100 border-green-400 opacity-50' : ''}
                  ${isEmojiSel ? 'bg-green-200 border-green-500 scale-110 shadow-lg' : ''}
                  ${isEmojiWrong ? 'bg-red-100 border-red-400 shake' : ''}
                  ${!isMatched && !isEmojiSel && !isEmojiWrong ? 'bg-white border-green-200 hover:bg-green-50 hover:scale-105 active:scale-95' : ''}
                `}
              >{a.emoji}</button>
            )
          })}
        </div>
      </div>
      <div className="text-center mt-3 text-sm font-bold text-gray-400">{matched.size} / {items.length} ✓</div>
      {allDone && (
        <div className="text-center mt-4 bounce-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-display font-bold text-xl text-green-600 mb-3">
            {roundIdx + 1 < totalRounds ? `סבב ${roundIdx + 1} הושלם!` : 'Well done!'}
          </p>
          <div className="flex gap-3 justify-center">
            {roundIdx + 1 < totalRounds
              ? <button onClick={onNext} className="btn-kid bg-green-500">סבב הבא →</button>
              : <button onClick={onDone} className="btn-kid bg-green-500">✅ Done</button>}
          </div>
        </div>
      )}
    </div>
  )
}

function Ex4Tab() {
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0)
  return (
    <MatchRound
      key={`${round}-${k}`}
      items={MATCH_ROUNDS_ANIMALS[round]}
      roundIdx={round}
      totalRounds={MATCH_ROUNDS_ANIMALS.length}
      onNext={() => setRound(r => r + 1)}
      onDone={() => { setRound(0); setK(n => n + 1) }}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: '📚 Learn'   },
  { id: 'quiz1', label: '🔊 Quiz 1'  },
  { id: 'quiz2', label: '🎯 Quiz 2'  },
  { id: 'ex1',   label: '🫧 Bubbles' },
  { id: 'ex2',   label: '🃏 Memory'  },
  { id: 'ex3',   label: '🌊 Sort'    },
  { id: 'ex4',   label: '🔗 Match'   },
]

const TAB_BASE = 'px-3 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap'

export default function AnimalsPage() {
  const [tab, setTab] = useState<Tab>('learn')
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-r from-green-500 to-teal-600 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <Link href="/step2/vocabulary" className="text-white/70 font-bold text-sm no-underline hover:text-white">← Vocabulary</Link>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">Animals 🐒</h1>
          <p className="text-white/70 font-bold text-sm" dir="rtl">בעלי חיים — 12 מילים</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-3 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max mx-auto justify-center">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`${TAB_BASE} ${tab === t.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>
      <div className="pt-4">
        {tab === 'learn' && <LearnTab />}
        {tab === 'quiz1' && <Quiz1Tab />}
        {tab === 'quiz2' && <Quiz2Tab />}
        {tab === 'ex1'   && <Ex1Tab />}
        {tab === 'ex2'   && <Ex2Tab />}
        {tab === 'ex3'   && <Ex3Tab />}
        {tab === 'ex4'   && <Ex4Tab />}
      </div>
    </div>
  )
}
