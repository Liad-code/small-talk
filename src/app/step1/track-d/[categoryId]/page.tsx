'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { TRACK_D_CATEGORIES, TrackDItem } from '@/data/step1/trackDCategories'
import { ConfettiOverlay } from '@/components/step1/ConfettiOverlay'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'
import { VocabBubblePop } from '@/components/step1/trackD/VocabBubblePop'
import { Pick3Exercise } from '@/components/step1/trackD/Pick3Exercise'
import { SeasonsSort } from '@/components/step1/trackD/SeasonsSort'
import { DaysOrder } from '@/components/step1/trackD/DaysOrder'
import { DaysNumberMatch } from '@/components/step1/trackD/DaysNumberMatch'
import { FruitsBasket } from '@/components/step1/trackD/FruitsBasket'
import { ClothesClothesline } from '@/components/step1/trackD/ClothesClothesline'
import { PrepCircleImage } from '@/components/step1/trackD/PrepCircleImage'

const HEBREW_ORDINALS: Record<number, string> = {
  1: 'יום ראשון', 2: 'יום שני', 3: 'יום שלישי', 4: 'יום רביעי', 5: 'יום חמישי', 6: 'יום שישי', 7: 'שבת',
}

function playHappySound() {
  try {
    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.frequency.value = freq; osc.type = 'sine'
      const t = ctx.currentTime + i * 0.12
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      osc.start(t); osc.stop(t + 0.3)
    })
  } catch { /* audio unavailable */ }
}

// Inline SVG for preposition learn illustrations (ball + box)
function PrepLearnSvg({ prep }: { prep: string }) {
  const ballPos: Record<string, { cx: number; cy: number }> = {
    'in':      { cx: 38, cy: 46 },
    'on':      { cx: 38, cy: 16 },
    'under':   { cx: 38, cy: 70 },
    'next to': { cx: 64, cy: 46 },
  }
  const pos = ballPos[prep] ?? { cx: 38, cy: 46 }
  return (
    <svg viewBox="0 0 80 80" width="6em" height="6em" xmlns="http://www.w3.org/2000/svg">
      {/* Box body */}
      <rect x="12" y="32" width="52" height="36" fill="#c8863a" rx="3" />
      {/* Box top face */}
      <polygon points="12,32 38,22 64,32" fill="#e0a050" />
      {/* Box right side */}
      <polygon points="64,32 64,68 38,68 38,22" fill="#b07030" opacity="0.5" />
      {/* Ball */}
      <circle cx={pos.cx} cy={pos.cy} r="9" fill="#4ade80" />
      <circle cx={pos.cx - 3} cy={pos.cy - 3} r="3" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}

function TableSvg({ size = '4.5em' }: { size?: string }) {
  return (
    <svg viewBox="0 0 80 70" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="10" width="76" height="12" rx="3" fill="#c8a265"/>
      <rect x="2" y="18" width="76" height="4" fill="#9c7a3c" opacity="0.8"/>
      <rect x="10" y="22" width="8" height="44" rx="2" fill="#b08040"/>
      <rect x="62" y="22" width="8" height="44" rx="2" fill="#b08040"/>
      <rect x="14" y="44" width="52" height="4" rx="2" fill="#9a7030"/>
    </svg>
  )
}

function FloorSvg({ size = '4.5em' }: { size?: string }) {
  const dark = '#2d2d2d'; const light = '#e8e8e8'
  const tiles: { x: number; y: number; fill: string }[] = []
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
    tiles.push({ x: c * 16, y: r * 16, fill: (r + c) % 2 === 0 ? dark : light })
  }
  return (
    <svg viewBox="0 0 64 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {tiles.map((t, i) => <rect key={i} x={t.x} y={t.y} width={16} height={16} fill={t.fill}/>)}
    </svg>
  )
}

function GardenSvg({ size = '4.5em' }: { size?: string }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Sky */}
      <rect x="0" y="0" width="80" height="80" fill="#87ceeb"/>
      {/* Ground */}
      <rect x="0" y="58" width="80" height="22" fill="#4a7c40" rx="4"/>
      {/* Path */}
      <ellipse cx="40" cy="70" rx="12" ry="6" fill="#c8a265"/>
      {/* Flower 1 */}
      <rect x="18" y="36" width="3" height="22" fill="#2d5a20"/>
      <circle cx="19" cy="33" r="8" fill="#ff6b8a"/>
      <circle cx="19" cy="33" r="4" fill="#ffeb3b"/>
      {/* Flower 2 */}
      <rect x="37" y="30" width="3" height="28" fill="#2d5a20"/>
      <circle cx="38" cy="27" r="9" fill="#ab47bc"/>
      <circle cx="38" cy="27" r="4" fill="#ffeb3b"/>
      {/* Flower 3 */}
      <rect x="57" y="34" width="3" height="24" fill="#2d5a20"/>
      <circle cx="58" cy="31" r="8" fill="#ff8f00"/>
      <circle cx="58" cy="31" r="4" fill="#ffeb3b"/>
      {/* Leaves */}
      <ellipse cx="14" cy="44" rx="5" ry="3" fill="#388e3c" transform="rotate(-30 14 44)"/>
      <ellipse cx="44" cy="38" rx="5" ry="3" fill="#388e3c" transform="rotate(20 44 38)"/>
    </svg>
  )
}

// Categories that have extra tab 1 (bubblepop)
const HAS_BUBBLEPOP = new Set(['colors', 'farm-animals', 'jungle-animals'])
// Categories that have pick3 exercise
const HAS_PICK3 = new Set(['colors', 'transport', 'actions'])

type Tab = 'flashcards' | 'quiz' | 'bubblepop' | 'pick3' | 'seasons-sort' | 'days-order' | 'days-match' | 'fruits-shelf' | 'clothesline' | 'prep-circle'

function getExtraTabs(categoryId: string): { id: Tab; label: string; emoji: string }[] {
  const tabs: { id: Tab; label: string; emoji: string }[] = []
  if (HAS_BUBBLEPOP.has(categoryId)) tabs.push({ id: 'bubblepop', label: 'Bubble Pop', emoji: '🫧' })
  if (HAS_PICK3.has(categoryId)) tabs.push({ id: 'pick3', label: 'Pick 3', emoji: '🎯' })
  if (categoryId === 'seasons') tabs.push({ id: 'seasons-sort', label: 'Sort', emoji: '🗂️' })
  if (categoryId === 'days') {
    tabs.push({ id: 'days-order', label: 'Order', emoji: '🔢' })
    tabs.push({ id: 'days-match', label: 'Match', emoji: '🔗' })
  }
  if (categoryId === 'fruits') tabs.push({ id: 'fruits-shelf', label: 'On the Shelf', emoji: '🛒' })
  if (categoryId === 'clothes') {
    tabs.push({ id: 'clothesline', label: 'Clothesline', emoji: '🧺' })
  }
  if (categoryId === 'prepositions') tabs.push({ id: 'prep-circle', label: 'Prepositions', emoji: '🔵' })
  return tabs
}

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params
  const cat = TRACK_D_CATEGORIES.find(c => c.id === categoryId)
  const { markExerciseDone, isExerciseDone } = useStep1Progress()
  const speak = useSpeak()
  const [tab, setTab] = useState<Tab>('flashcards')

  // ── Flashcard state ──────────────────────────────────────────
  const [tapped, setTapped] = useState<Set<string>>(new Set())

  // ── Quiz state ───────────────────────────────────────────────
  const [quizQueue, setQuizQueue] = useState(() => cat ? shuffle([...cat.items]) : [])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizOptions, setQuizOptions] = useState<TrackDItem[]>([])
  const [wrong, setWrong] = useState<string | null>(null)
  const [correct, setCorrect] = useState<string | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // ── Extra exercise reset keys ────────────────────────────────
  const [extraKey, setExtraKey] = useState(0)

  const allItems = cat?.items ?? []
  const learnDone = isExerciseDone('D', categoryId, 'learn')
  const quizCompleted = isExerciseDone('D', categoryId, 'quiz')
  const extraDone = isExerciseDone('D', categoryId, 'extra')
  const extraTabs = cat ? getExtraTabs(categoryId) : []

  // Flashcard: tap to hear
  function handleFlashTap(word: string) {
    const item = allItems.find(i => i.word === word)
    speak(item?.ttsText ?? word, 0.8)
    setTapped(prev => {
      const n = new Set(prev); n.add(word)
      if (n.size === allItems.length && !learnDone) {
        markExerciseDone('D', categoryId, 'learn')
      }
      return n
    })
  }

  // Quiz: build options when question changes — NO auto-speak
  useEffect(() => {
    if (!cat || quizQueue.length === 0) return
    const current = quizQueue[quizIdx]
    if (!current) return
    const others = allItems.filter(i => i.word !== current.word)
    const pick = shuffle(others).slice(0, Math.min(3, others.length))
    setQuizOptions(shuffle([current, ...pick]) as typeof quizOptions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizIdx, tab])

  function handleQuizTap(word: string) {
    if (!cat || correct || quizDone) return
    const current = quizQueue[quizIdx]
    if (!current) return

    if (word === current.word) {
      setCorrect(word)
      setTimeout(() => {
        const newScore = quizScore + 1
        setQuizScore(newScore)
        setCorrect(null)
        const nextIdx = quizIdx + 1
        if (nextIdx >= quizQueue.length) {
          setQuizDone(true)
          if (!quizCompleted) markExerciseDone('D', categoryId, 'quiz')
          setShowConfetti(true)
          playHappySound()
        } else {
          setQuizIdx(nextIdx)
          const nextItem = quizQueue[nextIdx]
          setTimeout(() => speak(nextItem.ttsText ?? nextItem.word, 0.8), 200)
        }
      }, 600)
    } else {
      setWrong(word)
      setTimeout(() => setWrong(null), 500)
    }
  }

  function handleExtraComplete() {
    if (!extraDone) markExerciseDone('D', categoryId, 'extra')
    setShowConfetti(true)
    playHappySound()
  }

  if (!cat) return <div className="p-8 text-center text-gray-500">Category not found</div>

  const currentQuiz = quizQueue[quizIdx]
  const isDaysCategory = categoryId === 'days'
  const isOpposites = categoryId === 'opposites'
  const isPrepositions = categoryId === 'prepositions'

  // Learn card styling (supports always-on color for body)
  const learnBg = cat.learnCardBg
  const learnBorder = cat.learnCardBorder

  // Quiz border
  const quizBorder = cat.quizBorderColor ?? 'border-black'

  return (
    <div className="min-h-screen bg-purple-700">
      <Header />

      {/* Banner */}
      <div className={`bg-gradient-to-r ${cat.color} py-4 px-4`}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/step1/track-d" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-5xl">{cat.emoji}</span>
            <div>
              <div className="font-display font-bold text-2xl text-black drop-shadow-sm">{cat.title}</div>
              <div className="text-black/70 font-bold text-base" dir="rtl">{cat.hebrewTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setTab('flashcards')}
            className={`flex-shrink-0 py-2 px-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer select-none
              ${tab === 'flashcards' ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white'}`}
          >
            📚 Learn {learnDone ? '⭐' : ''}
          </button>
          <button
            onClick={() => setTab('quiz')}
            className={`flex-shrink-0 py-2 px-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer select-none
              ${tab === 'quiz' ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white'}`}
          >
            🎯 Quiz {quizCompleted ? '⭐' : ''}
          </button>
          {extraTabs.map(et => (
            <button
              key={et.id}
              onClick={() => { setTab(et.id); setExtraKey(k => k + 1) }}
              className={`flex-shrink-0 py-2 px-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer select-none
                ${tab === et.id ? 'bg-white text-purple-700 border-white' : 'bg-white/20 border-white/40 text-white'}`}
            >
              {et.emoji} {et.label} {extraDone ? '⭐' : ''}
            </button>
          ))}
        </div>

        {/* ── Flashcards ──────────────────────────────────────── */}
        {tab === 'flashcards' && (
          <div>
            <p className="text-center text-black font-bold text-base mb-4" dir="rtl">
              לחץ על כל תמונה כדי לשמוע! ({tapped.size}/{allItems.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allItems.map(item => {
                const done = tapped.has(item.word)
                const cardBg = learnBg ?? (done ? cat.bgColor : 'bg-white')
                const cardBorder = learnBorder ?? (done ? 'border-black' : 'border-gray-300')
                return (
                  <button
                    key={item.word}
                    onClick={() => handleFlashTap(item.word)}
                    className={`
                      rounded-3xl border-4 p-4 flex flex-col items-center gap-2
                      transition-all duration-150 cursor-pointer select-none
                      ${cardBg} ${cardBorder}
                      ${done ? 'scale-105' : 'hover:scale-105 active:scale-95'}
                      shadow-md
                    `}
                  >
                    {isDaysCategory ? (
                      <>
                        <span className="font-display font-black text-xl text-black leading-tight">{item.word}</span>
                        {item.dayNum && (
                          <span className="text-gray-700 font-bold text-base" dir="rtl">
                            {HEBREW_ORDINALS[item.dayNum]}
                          </span>
                        )}
                      </>
                    ) : isPrepositions ? (
                      <PrepLearnSvg prep={item.word} />
                    ) : isOpposites && item.emoji === '🐘🐭' ? (
                      <span className="flex items-end gap-1 leading-none">
                        <span className="text-7xl">🐘</span>
                        <span className="text-3xl">🐭</span>
                      </span>
                    ) : item.word === 'table' ? (
                      <TableSvg size="4.5em" />
                    ) : item.word === 'floor' ? (
                      <FloorSvg size="4.5em" />
                    ) : item.word === 'garden' ? (
                      <GardenSvg size="4.5em" />
                    ) : (
                      <span className="text-7xl">{item.emoji}</span>
                    )}
                    {!isDaysCategory && <span className="font-bold text-sm text-gray-700 text-center">{item.word}</span>}
                    {done && <span className="text-green-600 font-black text-base">🔊</span>}
                  </button>
                )
              })}
            </div>
            {learnDone && (
              <div className="text-center mt-6 pb-6">
                <div className="text-4xl mb-2">⭐</div>
                <p className="font-display text-lg font-bold text-black" dir="rtl">כל הכבוד!</p>
                <button
                  onClick={() => setTab('quiz')}
                  className="mt-3 px-6 py-3 rounded-2xl font-bold text-base border-4 border-black text-black bg-white shadow-md cursor-pointer select-none hover:scale-105 active:scale-95 transition-all"
                >
                  Try the quiz! →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Quiz ───────────────────────────────────────────── */}
        {tab === 'quiz' && (
          <div className="max-w-sm mx-auto">
            {quizDone ? (
              <div className="text-center py-8 bounce-in">
                <div className="text-6xl mb-3">⭐</div>
                <p className="font-display text-2xl font-bold text-black">
                  {quizScore}/{quizQueue.length} correct!
                </p>
                <p className="font-bold text-black mt-1" dir="rtl">כל הכבוד!</p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={() => {
                      setQuizQueue(shuffle([...allItems]))
                      setQuizIdx(0)
                      setQuizScore(0)
                      setQuizDone(false)
                      setCorrect(null); setWrong(null)
                    }}
                    className="btn-kid bg-blue-500"
                  >
                    🔁 Again
                  </button>
                  <Link href="/step1/track-d" className="btn-kid bg-green-500 no-underline">
                    ← Back
                  </Link>
                </div>
              </div>
            ) : currentQuiz ? (
              <>
                <div className="flex justify-between text-sm font-bold text-black mb-4">
                  <span>{quizIdx + 1} / {quizQueue.length}</span>
                  <span>✅ {quizScore}</span>
                </div>

                {/* Hear button */}
                <div className="text-center mb-6">
                  <button
                    onClick={() => speak(currentQuiz.ttsText ?? currentQuiz.word, 0.8)}
                    className={`
                      w-24 h-24 rounded-full bg-gradient-to-br ${cat.color}
                      text-5xl text-white shadow-lg
                      hover:scale-110 active:scale-90 transition-all duration-150
                      cursor-pointer select-none flex items-center justify-center mx-auto
                    `}
                  >
                    🔊
                  </button>
                  <p className="text-sm text-black font-bold mt-2" dir="rtl">לחץ לשמוע — בחר התמונה הנכונה</p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {quizOptions.map(opt => {
                    const isWrong = wrong === opt.word
                    const isCorrect = correct === opt.word
                    return (
                      <button
                        key={opt.word}
                        onClick={() => handleQuizTap(opt.word)}
                        className={`
                          aspect-square rounded-3xl border-4
                          flex items-center justify-center
                          transition-all duration-150 cursor-pointer select-none shadow-md
                          ${isCorrect ? 'bg-green-200 border-green-400 scale-110' : ''}
                          ${isWrong ? 'bg-red-100 border-red-400 shake' : ''}
                          ${!isCorrect && !isWrong ? `${cat.bgColor} ${quizBorder} hover:scale-105 active:scale-95` : ''}
                        `}
                      >
                        {isDaysCategory ? (
                          <div className="flex flex-col items-center gap-1 p-2">
                            <span className="font-display font-black text-2xl text-black leading-tight">{opt.word}</span>
                            {opt.dayNum && (
                              <span className="font-bold text-gray-700 text-sm" dir="rtl">
                                {HEBREW_ORDINALS[opt.dayNum]}
                              </span>
                            )}
                          </div>
                        ) : isPrepositions ? (
                          <PrepLearnSvg prep={opt.word} />
                        ) : opt.word === 'table' ? (
                          <TableSvg size="4.5em" />
                        ) : opt.word === 'floor' ? (
                          <FloorSvg size="4.5em" />
                        ) : opt.word === 'garden' ? (
                          <GardenSvg size="4.5em" />
                        ) : (
                          <span className="text-7xl">{opt.emoji}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* ── Extra exercises ─────────────────────────────────── */}
        {tab === 'bubblepop' && cat && (
          <VocabBubblePop key={extraKey} items={cat.items} onComplete={handleExtraComplete} />
        )}
        {tab === 'pick3' && cat && (
          <Pick3Exercise key={extraKey} items={cat.items} onComplete={handleExtraComplete} />
        )}
        {tab === 'seasons-sort' && (
          <SeasonsSort key={extraKey} onComplete={handleExtraComplete} />
        )}
        {tab === 'days-order' && (
          <DaysOrder key={extraKey} onComplete={handleExtraComplete} />
        )}
        {tab === 'days-match' && (
          <DaysNumberMatch key={extraKey} onComplete={handleExtraComplete} />
        )}
        {tab === 'fruits-shelf' && cat && (
          <FruitsBasket key={extraKey} items={cat.items} onComplete={handleExtraComplete} />
        )}
        {tab === 'clothesline' && cat && (
          <ClothesClothesline key={extraKey} items={cat.items} onComplete={handleExtraComplete} />
        )}
        {tab === 'prep-circle' && (
          <PrepCircleImage key={extraKey} onComplete={handleExtraComplete} />
        )}
      </div>

      <ConfettiOverlay active={showConfetti} onDone={() => setShowConfetti(false)} />
    </div>
  )
}
