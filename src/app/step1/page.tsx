'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStep1Progress } from '@/hooks/useStep1Progress'

interface TrackCardProps {
  href: string
  emoji: string
  title: string
  hebrewTitle: string
  description: string
  hebrewDesc: string
  color: string        // Tailwind gradient
  textColor: string
  badgeColor: string
  totalExercises: number
  doneCount: number
}

function TrackCard({ href, emoji, title, hebrewTitle, description, hebrewDesc, color, textColor, badgeColor, totalExercises, doneCount }: TrackCardProps) {
  const pct = totalExercises > 0 ? Math.round((doneCount / totalExercises) * 100) : 0
  return (
    <Link
      href={href}
      className="no-underline group block"
    >
      <div className={`
        bg-gradient-to-br ${color} rounded-3xl p-6
        shadow-lg border-4 border-white/50
        card-3d group-hover:rotate-1
        flex flex-col gap-3
      `}>
        <div className="flex items-start justify-between gap-2">
          <span className="text-6xl leading-none transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 inline-block">
            {emoji}
          </span>
          {doneCount > 0 && (
            <span className={`${badgeColor} text-white text-xs font-black px-2 py-1 rounded-full flex-shrink-0`}>
              {doneCount}/{totalExercises} ⭐
            </span>
          )}
        </div>

        <div>
          <h2 className={`font-display font-bold text-xl leading-tight ${textColor}`}>{title}</h2>
          <p className={`font-bold text-sm opacity-80 ${textColor}`} dir="rtl">{hebrewTitle}</p>
        </div>

        <p className={`text-sm font-bold opacity-75 ${textColor}`}>{description}</p>
        <p className={`text-xs font-bold opacity-60 ${textColor}`} dir="rtl">{hebrewDesc}</p>

        {/* Progress bar */}
        <div className="w-full bg-white/40 rounded-full h-2.5">
          <div
            className="h-full rounded-full bg-white/80 progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </Link>
  )
}

// Count how many exercises are done per track
function useTrackProgress(track: string, exerciseKeys: string[]) {
  const { isExerciseDone } = useStep1Progress()
  return exerciseKeys.filter(k => {
    const [g, e] = k.split('/')
    return isExerciseDone(track, g, e)
  }).length
}

// Exercise keys per track
const TRACK_A_KEYS = [
  // A1 (1 exercise)
  'a1/learn',
  // 5 groups × 5 exercises
  'group1/ex1','group1/ex2','group1/ex3a','group1/ex3b','group1/ex3c',
  'group2/ex1','group2/ex2','group2/ex3a','group2/ex3b','group2/ex3c',
  'group3/ex1','group3/ex2','group3/ex3a','group3/ex3b','group3/ex3c',
  'group4/ex1','group4/ex2','group4/ex3a','group4/ex3b','group4/ex3c',
  'group5/ex1','group5/ex2','group5/ex3a','group5/ex3b','group5/ex3c',
  // A3 (4 exercises)
  'a3/ex1','a3/ex2','a3/ex3','a3/ex4',
]

const TRACK_B_KEYS = [
  'b1/learn',
  'group1/ex1','group2/ex1','group3/ex1','group4/ex1','group5/ex1',
]

const TRACK_C_KEYS = ['c/c1','c/c2','c/c3','c/c4','c/c5','c/c6','c/c7','c/c8','c/c9']

const TRACK_D_KEYS = [
  'numbers','colors','weather','seasons','emotions','days',
  'face','body','senses','farm-animals','jungle-animals','prepositions',
  'fruits','clothes','transport','actions','opposites','shapes',
  'meals','food','house','family','nature','school',
].map(k => `${k}/learn`)

export default function Step1HubPage() {
  const { step1Stars } = useStep1Progress()

  const aDone = useTrackProgress('A', TRACK_A_KEYS)
  const bDone = useTrackProgress('B', TRACK_B_KEYS)
  const cDone = useTrackProgress('C', TRACK_C_KEYS)
  const dDone = useTrackProgress('D', TRACK_D_KEYS)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="text-center py-8 px-4 relative overflow-hidden">
        <div className="text-6xl mb-3">🐣</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-amber-700 mb-2">
          One Step
        </h1>
        <p className="text-xl font-bold text-amber-600 mb-1">For complete beginners!</p>
        <p className="text-lg font-bold text-amber-500" dir="rtl">לתלמידים מתחילים</p>

        {step1Stars > 0 && (
          <div className="inline-flex items-center gap-2 mt-4 bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-4 py-2">
            <span className="text-2xl">⭐</span>
            <span className="font-black text-yellow-700 text-lg">{step1Stars} stars earned!</span>
          </div>
        )}
      </section>

      {/* 4 Track cards */}
      <div className="max-w-2xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TrackCard
          href="/step1/track-a"
          emoji="🔤"
          title="Track A — Letters"
          hebrewTitle="הכרת האותיות"
          description="Learn all 26 ABC letters — name, shape, uppercase and lowercase."
          hebrewDesc="זיהוי שם האות, התאמה בין אות גדולה לקטנה, רצף ABC"
          color="from-red-400 to-orange-400"
          textColor="text-white"
          badgeColor="bg-red-600"
          totalExercises={TRACK_A_KEYS.length}
          doneCount={aDone}
        />

        <TrackCard
          href="/step1/track-b"
          emoji="🔊"
          title="Track B — Sounds"
          hebrewTitle="צלילים קצרים"
          description="Hear and identify the short sound of every letter."
          hebrewDesc="זיהוי הצליל הקצר של האות — short sound"
          color="from-blue-400 to-cyan-400"
          textColor="text-white"
          badgeColor="bg-blue-600"
          totalExercises={TRACK_B_KEYS.length}
          doneCount={bDone}
        />

        <TrackCard
          href="/step1/track-c"
          emoji="📖"
          title="Track C — CVC Words"
          hebrewTitle="מילים — מבנה CVC"
          description="Build and read short 3-letter words like cat, dog, sun."
          hebrewDesc="זיהוי תנועות, הרכבת מילה, תמונה ← מילה"
          color="from-green-400 to-emerald-400"
          textColor="text-white"
          badgeColor="bg-green-600"
          totalExercises={TRACK_C_KEYS.length}
          doneCount={cDone}
        />

        <TrackCard
          href="/step1/track-d"
          emoji="🎨"
          title="Track D — Vocabulary"
          hebrewTitle="אוצר מילים"
          description="Learn words in 24 picture categories — voice only, no reading needed!"
          hebrewDesc="24 קטגוריות — מספרים, צבעים, חיות ועוד"
          color="from-purple-400 to-pink-400"
          textColor="text-white"
          badgeColor="bg-purple-600"
          totalExercises={TRACK_D_KEYS.length}
          doneCount={dDone}
        />
      </div>

      {/* Footer note */}
      <div className="text-center pb-10 px-4">
        <p className="text-sm text-gray-400 font-bold" dir="rtl">
          כל 4 המסלולים פעילים בו-זמנית — התחל מאיפה שרוצה!
        </p>
        <Link href="/" className="text-sm text-purple-400 font-bold hover:text-purple-600 no-underline mt-1 inline-block">
          ← Back to all subjects
        </Link>
      </div>
    </div>
  )
}
