'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'
import { TRACK_D_CATEGORIES, TrackDItem } from '@/data/step1/trackDCategories'
import { ConfettiOverlay } from '@/components/step1/ConfettiOverlay'
import { shuffle } from '@/utils/shuffle'
import { useSpeak } from '@/hooks/useSpeak'

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

type Tab = 'flashcards' | 'quiz'

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params
  const cat = TRACK_D_CATEGORIES.find(c => c.id === categoryId)
  const { markExerciseDone, isExerciseDone } = useStep1Progress()
  const speak = useSpeak()
  const [tab, setTab] = useState<Tab>('flashcards')

  // ── Flashcard state ──────────────────────────────────────────
  const [fcIdx, setFcIdx] = useState(0)
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

  const allItems = cat?.items ?? []
  const learnDone = isExerciseDone('D', categoryId, 'learn')
  const quizCompleted = isExerciseDone('D', categoryId, 'quiz')

  // Flashcard: mark done when all items tapped
  function handleFlashTap(word: string) {
    speak(allItems.find(i => i.word === word)?.ttsText ?? word, 0.8)
    setTapped(prev => {
      const n = new Set(prev); n.add(word)
      if (n.size === allItems.length && !learnDone) {
        markExerciseDone('D', categoryId, 'learn')
      }
      return n
    })
  }

  // Quiz: build options when quiz question changes
  useEffect(() => {
    if (!cat || quizQueue.length === 0) return
    const current = quizQueue[quizIdx]
    if (!current) return
    const others = allItems.filter(i => i.word !== current.word)
    const pick = shuffle(others).slice(0, Math.min(3, others.length))
    setQuizOptions(shuffle([current, ...pick]) as typeof quizOptions)
    setTimeout(() => speak(current.ttsText ?? current.word, 0.8), 300)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizIdx, tab])

  function handleQuizTap(word: string) {
    if (!cat || correct || quizDone) return
    const current = quizQueue[quizIdx]
    if (!current) return

    if (word === current.word) {
      setCorrect(word)
      speak(current.ttsText ?? current.word, 0.8)
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
        }
      }, 600)
    } else {
      setWrong(word)
      setTimeout(() => setWrong(null), 500)
    }
  }

  if (!cat) return <div className="p-8 text-center text-gray-500">Category not found</div>

  const currentQuiz = quizQueue[quizIdx]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <div className={`bg-gradient-to-r ${cat.color} py-4 px-4`}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/step1/track-d" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 text-white font-black text-lg no-underline flex-shrink-0"><span aria-hidden="true">←</span></Link>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-4xl">{cat.emoji}</span>
            <div>
              <div className="font-display font-bold text-xl text-white">{cat.title}</div>
              <div className="text-white/70 font-bold text-sm" dir="rtl">{cat.hebrewTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTab('flashcards')}
            className={`flex-1 py-3 rounded-2xl font-bold text-base border-2 transition-all cursor-pointer select-none
              ${tab === 'flashcards' ? `${cat.bgColor} ${cat.borderColor} ${cat.textColor}` : 'bg-white border-gray-200 text-gray-500'}`}
          >
            📚 Learn {learnDone ? '⭐' : ''}
          </button>
          <button
            onClick={() => setTab('quiz')}
            className={`flex-1 py-3 rounded-2xl font-bold text-base border-2 transition-all cursor-pointer select-none
              ${tab === 'quiz' ? `${cat.bgColor} ${cat.borderColor} ${cat.textColor}` : 'bg-white border-gray-200 text-gray-500'}`}
          >
            🎯 Quiz {quizCompleted ? '⭐' : ''}
          </button>
        </div>

        {/* ── Flashcards ──────────────────────────────────────── */}
        {tab === 'flashcards' && (
          <div>
            <p className="text-center text-gray-400 text-sm font-bold mb-4" dir="rtl">
              לחץ על כל תמונה כדי לשמוע! ({tapped.size}/{allItems.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allItems.map(item => {
                const done = tapped.has(item.word)
                return (
                  <button
                    key={item.word}
                    onClick={() => handleFlashTap(item.word)}
                    className={`
                      rounded-3xl border-4 p-5 flex flex-col items-center gap-2
                      transition-all duration-150 cursor-pointer select-none
                      ${done ? `${cat.bgColor} ${cat.borderColor}` : 'bg-white border-gray-200 hover:scale-105 active:scale-95 hover:border-purple-300'}
                      shadow-md
                    `}
                  >
                    <span className="text-6xl">{item.emoji}</span>
                    {done && <span className="text-green-500 font-black text-lg">🔊</span>}
                  </button>
                )
              })}
            </div>
            {learnDone && (
              <div className="text-center mt-6 pb-6">
                <div className="text-4xl mb-2">⭐</div>
                <p className="font-display text-lg font-bold text-purple-600" dir="rtl">כל הכבוד!</p>
                <button onClick={() => setTab('quiz')} className="btn-kid bg-purple-500 mt-3">
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
                <p className="font-display text-2xl font-bold text-purple-700">
                  {quizScore}/{quizQueue.length} correct!
                </p>
                <p className="font-bold text-gray-500 mt-1" dir="rtl">כל הכבוד!</p>
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
                <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
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
                  <p className="text-xs text-gray-400 font-bold mt-2" dir="rtl">לחץ לשמוע — בחר התמונה הנכונה</p>
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
                          aspect-square rounded-3xl border-4 text-6xl
                          flex items-center justify-center
                          transition-all duration-150 cursor-pointer select-none shadow-md
                          ${isCorrect ? `${cat.bgColor} ${cat.borderColor} scale-110` : ''}
                          ${isWrong ? 'bg-red-100 border-red-400 shake' : ''}
                          ${!isCorrect && !isWrong ? 'bg-white border-gray-200 hover:scale-105 active:scale-95 hover:border-purple-400' : ''}
                        `}
                      >
                        {opt.emoji}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      <ConfettiOverlay active={showConfetti} onDone={() => setShowConfetti(false)} />
    </div>
  )
}
