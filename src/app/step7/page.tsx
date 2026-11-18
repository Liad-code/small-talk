'use client'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { useStepStars } from '@/hooks/useStepStars'
import { SCENE_BUNDLES } from '@/data/step7'

interface TopicCardProps {
  href?: string
  emoji: string
  title: string
  hebrewTitle: string
  description: string
  hebrewDesc: string
  color: string
  textColor: string
  available: boolean
}

function TopicCard({ href, emoji, title, hebrewTitle, description, hebrewDesc, color, textColor, available }: TopicCardProps) {
  const inner = (
    <div className={`
      bg-gradient-to-br ${color} rounded-3xl p-6
      shadow-lg border-4 border-white/50
      card-3d flex flex-col gap-3 h-full
      ${available ? 'group-hover:rotate-1' : 'opacity-60'}
    `}>
      <div className="flex items-start justify-between gap-2">
        <span className={`text-6xl leading-none inline-block ${available ? 'transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1' : ''}`}>
          {emoji}
        </span>
        {!available && (
          <span className="bg-black/20 text-white text-xs font-black px-2 py-1 rounded-full flex-shrink-0">
            Soon
          </span>
        )}
      </div>
      <div>
        <h2 className={`font-display font-bold text-xl leading-tight ${textColor}`}>{title}</h2>
        <p className={`font-bold text-sm opacity-80 ${textColor}`} dir="rtl">{hebrewTitle}</p>
      </div>
      <p className={`text-sm font-bold opacity-75 ${textColor}`}>{description}</p>
      <p className={`text-xs font-bold opacity-60 ${textColor}`} dir="rtl">{hebrewDesc}</p>
    </div>
  )

  if (!available || !href) return <div className="h-full">{inner}</div>
  return (
    <Link href={href} className="no-underline group block h-full">
      {inner}
    </Link>
  )
}

/** Planned scenes; each shows as "Soon" until a scene with that id exists. */
const SOON: { id: string; emoji: string; title: string; hebrewTitle: string }[] = [
  { id: 'new-friend', emoji: "🤝", title: "A New Friend", hebrewTitle: "חבר חדש" },
  { id: 'ice-cream', emoji: "🍦", title: "Ice-Cream Shop", hebrewTitle: "בגלידרייה" },
  { id: 'supermarket', emoji: "🛒", title: "Supermarket", hebrewTitle: "בסופרמרקט" },
  { id: 'pet-shop', emoji: "🐶", title: "Pet Shop", hebrewTitle: "בחנות החיות" },
  { id: 'clothes-shop', emoji: "👕", title: "Clothes Shop", hebrewTitle: "בחנות הבגדים" },
  { id: 'directions', emoji: "🗺️", title: "Asking for Directions", hebrewTitle: "שואלים את הדרך" },
  { id: 'doctor', emoji: "🩺", title: "At the Doctor", hebrewTitle: "אצל הרופא" },
  { id: 'birthday', emoji: "🎂", title: "Birthday Party", hebrewTitle: "מסיבת יום הולדת" },
  { id: 'airport', emoji: "✈️", title: "At the Airport", hebrewTitle: "בשדה התעופה" },
]

export default function Step7Page() {
  const { starsFor } = useStepStars()
  const step7Stars = starsFor("step7")

  return (
    <div className="min-h-screen">
      <Header />

      <section className="text-center py-8 px-4">
        <div className="text-6xl mb-3">🗣️</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-sky-700 mb-2">
          Step 7
        </h1>
        <p className="text-xl font-bold text-sky-600 mb-1">Let&apos;s Talk!</p>
        <p className="text-lg font-bold text-sky-400" dir="rtl">מדברים אנגלית בחיים האמיתיים</p>

        {step7Stars > 0 && (
          <div className="inline-flex items-center gap-2 mt-4 bg-sky-100 border-2 border-sky-300 rounded-2xl px-4 py-2">
            <span className="text-2xl">⭐</span>
            <span className="font-black text-sky-700 text-lg">{step7Stars} stars earned!</span>
          </div>
        )}
      </section>

      <div className="max-w-2xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SCENE_BUNDLES.map(({ scene }) => (
          <TopicCard
            key={scene.id}
            href={`/step7/${scene.id}`}
            emoji={scene.emoji}
            title={scene.title}
            hebrewTitle={scene.titleHe}
            description={scene.ui.cardEn}
            hebrewDesc={scene.ui.cardHe}
            color={scene.ui.gradient}
            textColor="text-white"
            available
          />
        ))}
        {SOON.filter(s => !SCENE_BUNDLES.some(b => b.scene.id === s.id)).map(s => (
          <TopicCard
            key={s.title}
            emoji={s.emoji}
            title={s.title}
            hebrewTitle={s.hebrewTitle}
            description="Coming soon"
            hebrewDesc="בקרוב"
            color="from-sky-400 to-cyan-500"
            textColor="text-white"
            available={false}
          />
        ))}
      </div>
    </div>
  )
}
