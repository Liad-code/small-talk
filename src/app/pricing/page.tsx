'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Header } from '@/components/layout/Header'

interface BillingInfo {
  subscribed: boolean
  status: string | null
  seats: number
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: string | null
  trialEnd: string | null
}

function PricingContent() {
  const { status } = useSession()
  const params = useSearchParams()
  const reason = params.get('reason')
  const success = params.get('success')

  const [billing, setBilling] = useState<BillingInfo | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/billing', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(setBilling)
      .catch(() => setBilling(null))
  }, [status, success])

  async function startCheckout() {
    if (busy) return
    setBusy(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    if (res.ok) {
      const { url } = await res.json()
      if (url) { window.location.href = url; return }
    }
    setBusy(false)
  }

  async function openPortal() {
    if (busy) return
    setBusy(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    if (res.ok) {
      const { url } = await res.json()
      if (url) { window.location.href = url; return }
    }
    setBusy(false)
  }

  const subscribed = billing?.subscribed

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-xl mx-auto px-4 py-10" dir="rtl">
        {/* Contextual banners */}
        {reason === 'locked' && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl px-4 py-3 mb-6 text-center font-bold text-amber-800">
            🔒 התוכן הזה זמין למנויים — הצטרפו כדי להמשיך ללמוד!
          </div>
        )}
        {reason === 'signin' && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl px-4 py-3 mb-6 text-center font-bold text-blue-800">
            👤 כדי להמשיך יש להתחבר עם חשבון Google
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-2 border-green-300 rounded-2xl px-4 py-3 mb-6 text-center font-bold text-green-800 bounce-in">
            🎉 המנוי הופעל! אפשר להתחיל ללמוד
          </div>
        )}

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🚀</div>
          <h1 className="font-display text-4xl font-bold text-gray-800 mb-2">Small Talk Premium</h1>
          <p className="font-bold text-gray-500">כל תוכנית הלימוד המלאה — שלבים 1 עד 6</p>
        </div>

        {/* Price card */}
        <div className="bg-white border-4 border-primary rounded-3xl p-6 shadow-lg text-center mb-6">
          <div className="font-display font-black text-5xl text-primary mb-1">
            ₪50<span className="text-xl text-gray-400 font-bold"> / חודש לילד</span>
          </div>
          <p className="font-bold text-gray-500 text-sm mb-5">7 ימי ניסיון חינם · ביטול בכל עת</p>

          <ul className="text-right font-bold text-gray-600 text-sm flex flex-col gap-2 mb-6 max-w-xs mx-auto">
            <li>✅ גישה מלאה לכל 6 השלבים</li>
            <li>✅ פרופיל נפרד לכל ילד — ההתקדמות נשמרת בענן</li>
            <li>✅ מאות תרגולים, משחקים ומדריכי הורים</li>
            <li>✅ המחיר לפי מספר הילדים — מוסיפים או מסירים בכל עת</li>
          </ul>

          {status === 'unauthenticated' && (
            <button onClick={() => signIn('google')} className="btn-kid bg-primary w-full">
              👤 התחברות עם Google כדי להתחיל
            </button>
          )}

          {status === 'authenticated' && !subscribed && (
            <button onClick={startCheckout} disabled={busy} className="btn-kid bg-green-500 w-full disabled:opacity-50">
              {busy ? 'רגע...' : '🎁 להתחיל 7 ימי ניסיון חינם'}
            </button>
          )}

          {status === 'authenticated' && subscribed && billing && (
            <div>
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-4 py-3 mb-4 font-bold text-green-700 text-sm">
                ✅ מנוי פעיל · {billing.seats} {billing.seats === 1 ? 'ילד' : 'ילדים'}
                {billing.status === 'trialing' && billing.trialEnd && (
                  <span> · תקופת ניסיון עד {new Date(billing.trialEnd).toLocaleDateString('he-IL')}</span>
                )}
                {billing.cancelAtPeriodEnd && billing.currentPeriodEnd && (
                  <span className="text-amber-600"> · יסתיים ב-{new Date(billing.currentPeriodEnd).toLocaleDateString('he-IL')}</span>
                )}
              </div>
              <button onClick={openPortal} disabled={busy} className="btn-kid bg-primary w-full disabled:opacity-50">
                ⚙️ ניהול המנוי (שינוי/ביטול/קבלות)
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs font-bold text-gray-400">
          שלב 1 נשאר חינמי לכולם · המחירים כוללים מע״מ · ניתן לבטל אונליין בכל עת
        </p>
        <p className="text-center text-xs font-bold text-gray-300 mt-2">
          <a href="/legal/terms" className="hover:text-primary no-underline">תנאי שימוש</a>
          {' · '}
          <a href="/legal/privacy" className="hover:text-primary no-underline">מדיניות פרטיות</a>
          {' · '}
          <a href="/legal/refunds" className="hover:text-primary no-underline">ביטולים והחזרים</a>
        </p>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  )
}
