'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { StarRating } from '@/components/ui/StarRating'
import { useProgress } from '@/hooks/useProgress'
import { getSubject } from '@/data/subjects'
import type { QuizQuestion } from '@/types'

/* ── helpers ── */
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function scoreToStars(score: number) {
  if (score >= 80) return 3
  if (score >= 60) return 2
  if (score >= 40) return 1
  return 0
}

function playSound(type: 'correct' | 'wrong' | 'finish') {
  if (typeof window === 'undefined') return
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  if (type === 'correct') {
    osc.frequency.setValueAtTime(523, ctx.currentTime)
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1)
    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
    osc.start(); osc.stop(ctx.currentTime + 0.5)
  } else if (type === 'wrong') {
    osc.frequency.setValueAtTime(200, ctx.currentTime)
    osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.start(); osc.stop(ctx.currentTime + 0.4)
  } else {
    // fanfare
    [523, 659, 784, 1047].forEach((freq, i) => {
      const o = ctx.createOscillator()
      o.connect(gain)
      o.frequency.value = freq
      o.start(ctx.currentTime + i * 0.12)
      o.stop(ctx.currentTime + i * 0.12 + 0.15)
    })
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
  }
}

/* ── MultipleChoice component ── */
function MultipleChoiceQ({
  question,
  onAnswer,
}: {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [shuffledOptions] = useState(() => shuffle(question.options ?? []))

  function handleSelect(opt: string) {
    if (selected) return
    setSelected(opt)
    const correct = opt.toLowerCase() === question.answer.toLowerCase()
    onAnswer(correct)
  }

  return (
    <div className="space-y-3">
      {shuffledOptions.map(opt => {
        let cls = 'quiz-option'
        if (selected) {
          if (opt.toLowerCase() === question.answer.toLowerCase()) cls += ' correct'
          else if (opt === selected) cls += ' wrong'
        }
        return (
          <button key={opt} className={cls} onClick={() => handleSelect(opt)}>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ── FillBlank component ── */
function FillBlankQ({
  question,
  onAnswer,
}: {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const correct = value.trim().toLowerCase() === question.answer.toLowerCase()

  function handleSubmit() {
    if (!value.trim() || submitted) return
    setSubmitted(true)
    onAnswer(correct)
  }

  return (
    <div className="space-y-4">
      {question.questionHebrew && (
        <p className="text-base font-semibold text-gray-600" dir="rtl">{question.questionHebrew}</p>
      )}
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          disabled={submitted}
          placeholder="Type your answer..."
          className={`flex-1 border-4 rounded-2xl px-4 py-3 text-lg font-bold outline-none transition-all
                       ${submitted
                         ? correct
                           ? 'border-green-400 bg-green-50 text-green-700'
                           : 'border-red-400 bg-red-50 text-red-600'
                         : 'border-gray-200 focus:border-primary'}`}
        />
        <button
          onClick={handleSubmit}
          disabled={submitted || !value.trim()}
          className="btn-kid bg-primary disabled:opacity-50 flex-shrink-0 px-4 sm:px-6"
        >
          Check ✓
        </button>
      </div>
      {submitted && !correct && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
          <p className="font-bold text-red-600">
            The answer is: <span className="text-red-800">{question.answer}</span>
          </p>
        </div>
      )}
    </div>
  )
}

/* ── Main quiz page ── */
export default function QuizPage() {
  const { subjectId, level: levelParam } = useParams<{ subjectId: string; level: string }>()
  const router = useRouter()
  const subject = getSubject(subjectId)
  const level = parseInt(levelParam)
  const { saveQuizScore, getLevelProgress } = useProgress()

  const [currentIdx, setCurrentIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [done, setDone] = useState(false)
  const [shake, setShake] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([])
  const [questionsLoaded, setQuestionsLoaded] = useState(false)

  useEffect(() => {
    if (subject) {
      setShuffledQuestions(shuffle(subject.levels[level - 1]?.quiz ?? []))
    }
    setQuestionsLoaded(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!subject) return null
  const subjectLevel = subject.levels[level - 1]
  if (!subjectLevel) return null

  // Still shuffling on client — show spinner to avoid hydration mismatch
  if (!questionsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-spin mb-4">⏳</div>
          <p className="text-gray-500 font-bold">Loading quiz…</p>
        </div>
      </div>
    )
  }

  if (!shuffledQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-black text-gray-600">Quiz coming soon!</h2>
          <Link href={`/subject/${subjectId}`} className="btn-kid bg-primary mt-6 inline-block">
            ← Back
          </Link>
        </div>
      </div>
    )
  }

  const q = shuffledQuestions[currentIdx]
  const progress = Math.round((currentIdx / shuffledQuestions.length) * 100)
  const score = Math.round((correct / shuffledQuestions.length) * 100)

  function handleAnswer(isCorrect: boolean) {
    if (isCorrect) {
      setCorrect(c => c + 1)
      playSound('correct')
    } else {
      playSound('wrong')
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
    setAnswered(true)
  }

  function handleNext() {
    const next = currentIdx + 1
    if (next >= shuffledQuestions.length) {
      const finalScore = Math.round(((correct + 0) / shuffledQuestions.length) * 100)
      // wait for state: recalculate directly
      const s = Math.round((correct / shuffledQuestions.length) * 100)
      saveQuizScore(subjectId, level, s)
      playSound('finish')
      setDone(true)
    } else {
      setCurrentIdx(next)
      setAnswered(false)
    }
  }

  if (done) {
    const finalScore = Math.round((correct / shuffledQuestions.length) * 100)
    const stars = scoreToStars(finalScore)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full text-center bounce-in">
          <div className="text-8xl mb-4">{stars >= 3 ? '🏆' : stars >= 2 ? '🎉' : stars >= 1 ? '😊' : '😅'}</div>
          <h2 className="text-3xl font-black text-gray-800 mb-2">Quiz Done!</h2>
          <p className="text-gray-500 font-bold mb-4">
            {correct} / {shuffledQuestions.length} correct
          </p>
          <div className="text-5xl font-black mb-4"
            style={{ color: finalScore >= 80 ? '#48BB78' : finalScore >= 60 ? '#F6AD55' : '#FC8181' }}>
            {finalScore}%
          </div>
          <StarRating stars={stars} size="lg" animate />
          <p className="text-gray-400 font-bold mt-3 mb-6">
            {stars === 3 ? 'AMAZING! Perfect score! 🌟' :
             stars === 2 ? 'Great job! Keep practicing!' :
             stars === 1 ? 'Good effort! Try again to earn more stars!' :
             'Keep practicing! You can do it! 💪'}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCurrentIdx(0); setCorrect(0); setAnswered(false); setDone(false) }}
              className="btn-kid bg-primary"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => router.push(`/games/word-match?subject=${subjectId}&level=${level}`)}
              className="btn-kid bg-secondary"
            >
              🎮 Play Game
            </button>
            <button
              onClick={() => router.push(`/subject/${subjectId}`)}
              className="btn-kid bg-gray-200 text-gray-600"
            >
              ← Back to Levels
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Progress header */}
      <div className={`${subject.color} border-b-4 ${subject.borderColor} py-6 px-4`}>
        <div className="max-w-2xl mx-auto">
          <Link href={`/subject/${subjectId}`} className="text-gray-500 font-bold text-sm hover:text-gray-700">
            ← {subject.title}
          </Link>
          <div className="flex items-center justify-between mt-2 mb-3">
            <h1 className={`text-xl font-black ${subject.textColor} min-w-0 truncate mr-2`}>
              🧠 Quiz: {subjectLevel.title}
            </h1>
            <div className="bg-white rounded-xl px-3 py-1 font-black text-gray-600 shadow flex-shrink-0">
              {currentIdx + 1} / {shuffledQuestions.length}
            </div>
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>

      {/* Question card */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className={`bg-white rounded-3xl shadow-xl p-5 sm:p-8 ${shake ? 'shake' : ''}`}>
          {/* Question */}
          <div className="text-center mb-6">
            {q.emoji && <div className="text-6xl mb-3">{q.emoji}</div>}
            <h2 className="text-2xl font-black text-gray-800">{q.question}</h2>
            {q.questionHebrew && q.type !== 'fill-blank' && (
              <p className="text-lg font-semibold text-gray-600 mt-2" dir="rtl">{q.questionHebrew}</p>
            )}
          </div>

          {/* Answer input — key={q.id} forces remount on every new question, clearing state */}
          {q.type === 'multiple-choice' && (
            <MultipleChoiceQ key={q.id} question={q} onAnswer={handleAnswer} />
          )}
          {q.type === 'fill-blank' && (
            <FillBlankQ key={q.id} question={q} onAnswer={handleAnswer} />
          )}

          {/* Next button */}
          {answered && (
            <div className="mt-6 text-center bounce-in">
              <button onClick={handleNext} className="btn-kid bg-primary text-lg px-10">
                {currentIdx + 1 >= shuffledQuestions.length ? '🏁 See Results!' : 'Next Question →'}
              </button>
            </div>
          )}
        </div>

        {/* Score tracker */}
        <div className="mt-4 text-center text-gray-500 font-bold">
          ✅ {correct} correct so far
        </div>
      </div>
    </div>
  )
}
