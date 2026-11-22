'use client'
import Link from 'next/link'
import { PARENT_TIERS } from '@/lib/billing/plans'

export function PrintButton({ label = '🖨️ הדפסה / שמירה כ-PDF' }: { label?: string }) {
  return (
    <button onClick={() => window.print()} className="no-print btn-kid bg-primary">
      {label}
    </button>
  )
}

/** Shown instead of a perk page when the family's tier doesn't include it. */
export function PerkLocked({ icon, title, minTier }: { icon: string; title: string; minTier: number }) {
  const tier = PARENT_TIERS[minTier]
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center" dir="rtl">
      <div className="text-6xl mb-3">{icon}</div>
      <h1 className="font-display text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="font-bold text-gray-500 mb-6">
        🔒 כלול במנוי ״{tier.labelHe}״ (₪{tier.price / 100} לחודש) ומעלה.
      </p>
      <Link href="/pricing" className="btn-kid bg-primary no-underline">לשדרוג המנוי ←</Link>
    </div>
  )
}
