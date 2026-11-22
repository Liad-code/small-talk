import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { PerkLocked } from '@/components/perks/PerkBits'
import { getAccess, hasPerk } from '@/lib/access'
import { familyCertificates, CERT_LEVELS } from '@/lib/family'

export const dynamic = 'force-dynamic'

/** ₪69 perk: achievement certificates (by stars per step), printable. */
export default async function CertificatesPage() {
  const access = await getAccess()
  if (!access.userId) redirect('/account')
  if (!hasPerk(access, 'certificates')) return <div className="min-h-screen"><Header /><PerkLocked icon="🎓" title="תעודות הישג" minTier={2} /></div>

  const { earned, next } = await familyCertificates(access.userId)
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8" dir="rtl">
        <Link href="/account" className="text-sm font-bold text-primary no-underline">→ החשבון שלי</Link>
        <h1 className="font-display text-3xl font-bold text-gray-800 mt-2 mb-1">🎓 תעודות הישג</h1>
        <p className="font-bold text-gray-400 text-sm mb-6">
          בכל שלב: {CERT_LEVELS.map(l => `${l.emoji} ${l.he} ב-${l.stars} כוכבים`).join(' · ')}. לחיצה על תעודה פותחת אותה להדפסה.
        </p>

        {earned.length === 0 ? (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 text-center font-bold text-gray-500 mb-6">
            עוד אין תעודות — התעודה הראשונה מחכה ב-{CERT_LEVELS[0].stars} כוכבים בשלב כלשהו!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {earned.map(c => (
              <Link key={`${c.childId}-${c.step.id}-${c.level.level}`} href={`/account/certificate/${c.childId}/${c.step.id}/${c.level.level}`}
                className="bg-white border-4 rounded-2xl p-3 text-center no-underline hover:scale-[1.02] transition-transform" style={{ borderColor: c.level.color + '55' }}>
                <div className="text-4xl">{c.level.emoji}</div>
                <div className="font-display font-bold text-gray-800">{c.avatar} {c.childName}</div>
                <div className="text-xs font-bold text-gray-500">{c.step.emoji} {c.step.he} · {c.level.he}</div>
              </Link>
            ))}
          </div>
        )}

        {next.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-lg text-gray-700 mb-2">🔜 התעודות הבאות</h2>
            <ul className="flex flex-col gap-1.5 text-sm font-bold text-gray-600">
              {next.map(n => <li key={`${n.childName}-${n.step}`}>{n.childName}: עוד {n.missing} כוכבים ל{n.level} ב{n.step}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
