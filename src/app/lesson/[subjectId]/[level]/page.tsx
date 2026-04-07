'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/hooks/useProgress'
import { getSubject } from '@/data/subjects'
import type { WordItem } from '@/types'

function WordCard({ word, showHebrew }: { word: WordItem; showHebrew: boolean }) {
  const [flipped, setFlipped] = useState(false)

  // Grammar subjects: front=English, back=Hebrew translation
  // Vocab subjects (have emoji): front=emoji+English, back=example sentence
  return (
    <button
      onClick={() => setFlipped(f => !f)}
      className={`word-card border-4 w-full cursor-pointer
                  ${flipped ? 'border-primary bg-purple-50' : 'border-gray-100'}`}
    >
      {showHebrew ? (
        // Grammar mode: show Hebrew on flip
        <>
          <div className="text-6xl">{word.emoji}</div>
          {flipped ? (
            <div className="bounce-in">
              <div className="text-2xl font-black text-primary" dir="rtl">{word.hebrew}</div>
              <div className="text-sm text-gray-400 font-bold mt-1">Tap to flip back</div>
            </div>
          ) : (
            <>
              <div className="text-2xl font-black text-gray-800">{word.english}</div>
              {word.example && (
                <div className="text-sm text-gray-400 font-bold italic">"{word.example}"</div>
              )}
              <div className="text-xs text-purple-400 font-bold mt-1">Tap for Hebrew 🇮🇱</div>
            </>
          )}
        </>
      ) : (
        // Visual mode: emoji + English front, example sentence back
        <>
          <div className="text-6xl">{word.emoji}</div>
          {flipped ? (
            <div className="bounce-in">
              {word.example ? (
                <div className="text-sm font-bold text-gray-600 italic">"{word.example}"</div>
              ) : (
                <div className="text-2xl font-black text-gray-800">{word.english}</div>
              )}
              <div className="text-xs text-gray-400 font-bold mt-1">Tap to flip back</div>
            </div>
          ) : (
            <div className="text-2xl font-black text-gray-800">{word.english}</div>
          )}
        </>
      )}
    </button>
  )
}

export default function LessonPage() {
  const { subjectId, level: levelParam } = useParams<{ subjectId: string; level: string }>()
  const router = useRouter()
  const subject = getSubject(subjectId)
  const level = parseInt(levelParam)
  const { markLessonDone } = useProgress()

  const [seen, setSeen] = useState<Set<number>>(new Set())
  const [finished, setFinished] = useState(false)

  if (!subject) return null
  const subjectLevel = subject.levels[level - 1]
  if (!subjectLevel) return null

  const words = subjectLevel.words
  const showHebrew = subject.category.includes('grammar')
  const progress = Math.round((seen.size / words.length) * 100)

  function handleSeen(index: number) {
    setSeen(prev => new Set(prev).add(index))
  }

  function handleFinish() {
    markLessonDone(subjectId, level)
    setFinished(true)
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bounce-in bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-3xl font-black text-gray-800 mb-2">Lesson Complete!</h2>
          <p className="text-gray-500 font-bold mb-6">Great job! Now test your knowledge.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push(`/quiz/${subjectId}/${level}`)}
              className="btn-kid bg-primary text-xl"
            >
              🧠 Take the Quiz!
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

      {/* Top bar */}
      <div className={`${subject.color} border-b-4 ${subject.borderColor} py-6 px-4`}>
        <div className="max-w-3xl mx-auto">
          <Link href={`/subject/${subjectId}`} className="text-gray-500 font-bold text-sm hover:text-gray-700">
            ← {subject.title}
          </Link>
          <h1 className={`text-2xl font-black ${subject.textColor} mt-1`}>
            {subject.emoji} {subjectLevel.title}
          </h1>
          <p className="text-gray-500 font-bold text-sm mt-1">{subjectLevel.description}</p>
          <div className="mt-3">
            <ProgressBar value={progress} label={`${seen.size} / ${words.length} words seen`} />
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 text-center">
          {showHebrew ? (
            <>
              <p className="font-bold text-yellow-700">💡 Tap each card to see the Hebrew translation!</p>
              <p className="text-sm text-yellow-600" dir="rtl">לחצו על כל כרטיס כדי לראות את התרגום לעברית!</p>
            </>
          ) : (
            <p className="font-bold text-yellow-700">💡 Tap each card to see it in a sentence!</p>
          )}
        </div>
      </div>

      {/* Word cards */}
      <div className="max-w-3xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {words.map((word, i) => (
          <div key={i} onClick={() => handleSeen(i)}>
            <WordCard word={word} showHebrew={showHebrew} />
          </div>
        ))}
      </div>

      {/* Finish button */}
      <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
        <button
          onClick={handleFinish}
          className="btn-kid bg-primary text-lg sm:text-xl px-6 sm:px-10 py-4 w-full sm:w-auto"
        >
          I learned all the words! ✅
        </button>
        <p className="text-gray-400 text-sm mt-2 font-bold">
          (Make sure to tap all cards first!)
        </p>
      </div>
    </div>
  )
}
