'use client'
import Link from 'next/link'
import { PERKS, type PerkId } from '@/lib/billing/perks'
import { PARENT_TIERS } from '@/lib/billing/plans'

const SUPPORT_EMAIL = 'smalltalk.english1@gmail.com'

/** The account page's "your extras" section: every perk, open or locked, with its link. */
export function FamilyPerks({ tier, children }: { tier: number | null; children: { id: string; displayName: string; avatar: string }[] }) {
  const open = (minTier: number) => tier !== null && tier >= minTier
  const link = (id: PerkId): { href: string; label: string } | null => {
    switch (id) {
      case 'sibling_challenge': return { href: '/account/family', label: 'ללוח המשפחתי' }
      case 'family_goal': return { href: '/account/family', label: 'להגדרת היעד' }
      case 'certificates': return { href: '/account/certificates', label: 'לתעודות' }
      case 'personal_support': return { href: `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('תמיכה אישית — מנוי ללא הגבלה')}`, label: SUPPORT_EMAIL }
      default: return null
    }
  }
  const extras = PERKS.filter(p => p.minTier > 0)

  return (
    <section className="mb-8">
      <h2 className="font-display font-bold text-xl text-gray-700 mb-3">🎁 ההטבות שלכם</h2>
      <div className="flex flex-col gap-2">
        {extras.map(p => {
          const ok = open(p.minTier)
          const l = link(p.id)
          return (
            <div key={p.id} className={`rounded-2xl border-2 p-4 ${ok ? 'bg-white border-purple-100' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-start gap-3">
                <span className={`text-2xl ${ok ? '' : 'grayscale opacity-60'}`}>{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold ${ok ? 'text-gray-800' : 'text-gray-400'}`}>{p.titleHe}</div>
                  <div className="text-xs font-bold text-gray-400">{p.descHe}</div>
                  {ok && p.id === 'monthly_report' && children.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {children.map(c => (
                        <Link key={c.id} href={`/account/report/${c.id}`} className="text-xs font-bold text-primary bg-purple-50 rounded-full px-3 py-1 no-underline">
                          {c.avatar} הדוח של {c.displayName} ←
                        </Link>
                      ))}
                    </div>
                  )}
                  {ok && p.id === 'early_access' && <div className="text-xs font-bold text-green-600 mt-1">✓ פעיל — תוכן חדש ייפתח לכם לפני כולם</div>}
                  {ok && l && <a href={l.href} className="inline-block text-xs font-bold text-primary mt-1 no-underline" dir={l.href.startsWith('mailto') ? 'ltr' : undefined}>{l.label} ←</a>}
                  {!ok && (
                    <Link href="/pricing" className="inline-block text-xs font-bold text-gray-400 mt-1 no-underline hover:text-primary">
                      🔒 במנוי ״{PARENT_TIERS[p.minTier].labelHe}״ (₪{PARENT_TIERS[p.minTier].price / 100}) ←
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
