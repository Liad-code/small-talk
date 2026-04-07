'use client'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { useProgress } from '@/hooks/useProgress'
import { getSubject } from '@/data/subjects'

const GameSpinner = () => <div className="flex items-center justify-center py-16 text-4xl animate-bounce">🎮</div>

const WordMatch   = dynamic(() => import('@/components/games/WordMatch').then(m => m.WordMatch),     { ssr: false, loading: GameSpinner })
const SpellingBee = dynamic(() => import('@/components/games/SpellingBee').then(m => m.SpellingBee), { ssr: false, loading: GameSpinner })
const BubblePop   = dynamic(() => import('@/components/games/BubblePop').then(m => m.BubblePop),     { ssr: false, loading: GameSpinner })

const GAME_INFO: Record<string, { title: string; emoji: string; description: string }> = {
  'word-match':   { title: 'Word Match',    emoji: '🃏', description: 'Match English words with their Hebrew translations!' },
  'spelling-bee': { title: 'Spelling Bee',  emoji: '🐝', description: 'Hear the Hebrew word and spell it in English!' },
  'bubble-pop':   { title: 'Bubble Pop',    emoji: '🫧', description: 'Pop the correct English word bubbles!' },
  // ── YOUR EXTERNAL GAMES ──────────────────────────────────────────────────────
  // Change the title, emoji, and description once you've added your real game.
  'phonics-fun':     { title: 'Phonics Fun',       emoji: '🔊', description: 'Listen and spell short-vowel words by tapping the letters in order!' },
  'whats-my-sound':  { title: "What's My Sound?",  emoji: '🔉', description: 'Hear a word and find the starting letter!' },
  'game1': { title: 'Game 1', emoji: '🌟', description: 'Your custom game — update the title and description here!' },
  'game2': { title: 'Game 2', emoji: '🌟', description: 'Your custom game — update the title and description here!' },
  'game3': { title: 'Game 3', emoji: '🚀', description: 'Your custom game — update the title and description here!' },
}

// Games served as iframes from /public/games/<id>/index.html
const IFRAME_GAMES = new Set(['phonics-fun', 'whats-my-sound', 'game1', 'game2', 'game3'])

function GameContent() {
  const { gameId } = useParams<{ gameId: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const subjectId = searchParams.get('subject') ?? 'animals'
  const level     = parseInt(searchParams.get('level') ?? '1')
  const { saveGameScore } = useProgress()

  const subject = getSubject(subjectId)
  const words = subject?.levels[level - 1]?.words ?? []
  const gameInfo = GAME_INFO[gameId]

  // Which games make sense for this subject
  const category  = subject?.category ?? 'beginner'
  const isGrammar = category.includes('grammar')
  const isBeginner = category === 'beginner' || category === 'beginner-grammar'
  const availableGameIds: string[] = subjectId === 'phonics'
    ? ['word-match', 'bubble-pop', 'phonics-fun', 'whats-my-sound']
    : isGrammar || isBeginner
      ? ['word-match', 'bubble-pop']
      : ['word-match', 'spelling-bee', 'bubble-pop']

  const [finalScore, setFinalScore] = useState<number | null>(null)

  function handleScore(score: number) {
    setFinalScore(score)
    saveGameScore(subjectId, level, score)
  }

  // Listen for postMessage from iframe games
  useEffect(() => {
    if (!IFRAME_GAMES.has(gameId)) return
    function onMessage(event: MessageEvent) {
      if (event.data?.type === 'GAME_COMPLETE' && typeof event.data.score === 'number') {
        handleScore(event.data.score)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, subjectId, level])

  if (!gameInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-black text-gray-600">Game not found</h2>
          <Link href="/" className="btn-kid bg-primary mt-4 inline-block">Go Home</Link>
        </div>
      </div>
    )
  }

  // ── EXTERNAL IFRAME GAMES ───────────────────────────────────────────────
  if (IFRAME_GAMES.has(gameId)) {
    return (
      <div className="min-h-screen">
        <Header />

        {/* Game header */}
        <div className="bg-gradient-to-r from-indigo-400 to-purple-500 py-8 px-4 text-white text-center">
          <Link href={`/subject/${subjectId}`} className="text-white/70 font-bold text-sm hover:text-white">
            ← Back
          </Link>
          <div className="text-6xl mt-2 mb-2">{gameInfo.emoji}</div>
          <h1 className="text-3xl font-black">{gameInfo.title}</h1>
          <p className="font-bold text-white/80 mt-1">{gameInfo.description}</p>
          <div className="mt-2 text-white/60 text-sm font-bold">
            Subject: {subject?.title} · Level {level}
          </div>
        </div>

        {/* Game selector pills */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {Object.entries(GAME_INFO).filter(([id]) => availableGameIds.includes(id)).map(([id, info]) => (
              <button
                key={id}
                onClick={() => router.push(`/games/${id}?subject=${subjectId}&level=${level}`)}
                className={`px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all
                             ${id === gameId
                               ? 'bg-primary text-white border-primary'
                               : 'bg-white text-gray-600 border-gray-200 hover:border-primary'}`}
              >
                {info.emoji} {info.title}
              </button>
            ))}
          </div>
        </div>

        {/* iframe game */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <iframe
              src={`/games/${gameId}/index.html?subject=${subjectId}&level=${level}`}
              className="w-full"
              style={{ height: '600px', border: 'none', display: 'block' }}
              title={gameInfo.title}
            />
          </div>

          {finalScore !== null && (
            <div className="mt-6 text-center">
              <div className="bg-primary/10 border-2 border-primary rounded-2xl p-4">
                <p className="font-black text-primary text-xl">🏆 Score saved: {finalScore} pts</p>
                <p className="text-gray-500 text-sm font-bold mt-1">
                  {finalScore >= 80 ? '⭐⭐⭐ 3 stars!' : finalScore >= 60 ? '⭐⭐ 2 stars!' : '⭐ Keep practising!'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Game header */}
      <div className="bg-gradient-to-r from-indigo-400 to-purple-500 py-8 px-4 text-white text-center">
        <Link href={`/subject/${subjectId}`} className="text-white/70 font-bold text-sm hover:text-white">
          ← Back
        </Link>
        <div className="text-6xl mt-2 mb-2">{gameInfo.emoji}</div>
        <h1 className="text-3xl font-black">{gameInfo.title}</h1>
        <p className="font-bold text-white/80 mt-1">{gameInfo.description}</p>
        <div className="mt-2 text-white/60 text-sm font-bold">
          Subject: {subject?.title} · Level {level}
        </div>
      </div>

      {/* Game selector pills */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex gap-2 flex-wrap justify-center">
          {Object.entries(GAME_INFO).filter(([id]) => availableGameIds.includes(id)).map(([id, info]) => (
            <button
              key={id}
              onClick={() => router.push(`/games/${id}?subject=${subjectId}&level=${level}`)}
              className={`px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all
                           ${id === gameId
                             ? 'bg-primary text-white border-primary'
                             : 'bg-white text-gray-600 border-gray-200 hover:border-primary'}`}
            >
              {info.emoji} {info.title}
            </button>
          ))}
        </div>
      </div>

      {/* Game area */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          {words.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🚧</div>
              <p className="font-black text-gray-600">No words for this subject yet!</p>
            </div>
          ) : (
            <>
              {gameId === 'word-match'   && <WordMatch   words={words} onScore={handleScore} />}
              {gameId === 'spelling-bee' && <SpellingBee words={words} onScore={handleScore} />}
              {gameId === 'bubble-pop'   && <BubblePop   words={words} onScore={handleScore} />}
            </>
          )}
        </div>

        {finalScore !== null && (
          <div className="mt-6 text-center">
            <div className="bg-primary/10 border-2 border-primary rounded-2xl p-4">
              <p className="font-black text-primary text-xl">🏆 High Score: {finalScore} pts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-5xl animate-bounce">🎮</div></div>}>
      <GameContent />
    </Suspense>
  )
}
