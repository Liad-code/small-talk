'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Header } from '@/components/layout/Header'
import { CLASS_DISCOUNT_PERCENT, PARENT_TIERS, TEACHER_MONTHLY, TEACHERS_ENABLED } from '@/lib/billing/plans'
import { perksForTier, type TierIndex } from '@/lib/billing/perks'

type Plan = 'parent' | 'teacher'
interface Quote { plan: Plan; seats: number; discountedSeats: number; tier: string | null; tierIndex: number; minTierIndex: number; monthlyAmount: number; firstAmount: number }
interface BillingInfo {
  subscribed: boolean
  plan: Plan | null
  status: string | null
  seats: number
  discountedSeats: number
  monthlyAmount: number | null
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: string | null
  cardSuffix: string | null
  canUndoCancel: boolean
  quotes: { parent: Quote; teacher: Quote }
  prices: { classDiscountPercent: number }
  admin: boolean
  tierChosen: number
  checkoutAvailable: boolean
}

const ils = (agorot: number) => `₪${Math.round(agorot / 100)}`
const date = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('he-IL') : '')

const ERRORS: Record<string, string> = {
  phone: 'צריך מספר נייד ישראלי (05X-XXXXXXX) — Grow שולחת אליו את הקבלה.',
  already_subscribed: 'כבר יש לכם מנוי פעיל.',
  unavailable: 'לא הצלחנו לפתוח את עמוד התשלום. נסו שוב בעוד רגע.',
}

function PricingContent() {
  const { status } = useSession()
  const params = useSearchParams()
  const reason = params.get('reason')
  const success = params.get('success')

  const [billing, setBilling] = useState<BillingInfo | null>(null)
  const [plan, setPlan] = useState<Plan>(TEACHERS_ENABLED && params.get('plan') === 'teacher' ? 'teacher' : 'parent')
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [tierPick, setTierPick] = useState<number | null>(null)

  const load = useCallback(() => {
    fetch('/api/billing', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(setBilling)
      .catch(() => setBilling(null))
  }, [])

  useEffect(() => {
    if (status === 'authenticated') load()
  }, [status, success, load])

  async function startCheckout() {
    if (busy) return
    setBusy(true)
    setError(null)
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ plan, phone, tier: chosenTier }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.url) { window.location.href = data.url; return }
    setError(ERRORS[data.error] ?? ERRORS.unavailable)
    setBusy(false)
  }

  async function post(path: string) {
    if (busy) return
    setBusy(true)
    await fetch(path, { method: 'POST' })
    setConfirmCancel(false)
    setBusy(false)
    load()
  }

  const active = billing?.subscribed && billing.status !== 'canceled'
  const ending = billing?.subscribed && billing.status === 'canceled'
  const q = billing?.quotes[plan]
  const discount = billing?.prices.classDiscountPercent ?? CLASS_DISCOUNT_PERCENT
  // Family tier: what the parent picks, never below what their number of children needs.
  const minTier = billing?.quotes.parent.minTierIndex ?? 0
  const chosenTier = Math.max(minTier, tierPick ?? minTier)
  const tierPrice = PARENT_TIERS[chosenTier].price
  const discounted = (billing?.quotes.parent.discountedSeats ?? 0) > 0
  const chosenMonthly = Math.round((discounted ? tierPrice * (100 - discount) / 100 : tierPrice) / 100) * 100

  async function changeTier(tier: number) {
    if (busy) return
    setBusy(true)
    await fetch('/api/billing/tier', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ tier }) })
    setBusy(false)
    load()
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-xl mx-auto px-4 py-10" dir="rtl">
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
        {success && !active && (
          <div className="bg-green-50 border-2 border-green-300 rounded-2xl px-4 py-3 mb-6 text-center font-bold text-green-800 bounce-in">
            🎉 התשלום התקבל! המנוי יופעל תוך רגע — רעננו את הדף אם הוא עוד לא מופיע.
          </div>
        )}

        {billing?.admin && (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-4 py-3 mb-6 text-center font-bold text-indigo-800">
            🛡️ חשבון מנהל — כל האפליקציה וכל ההטבות פתוחות לכם בחינם.
          </div>
        )}

        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🚀</div>
          <h1 className="font-display text-4xl font-bold text-gray-800 mb-2">Small Talk Premium</h1>
          <p className="font-bold text-gray-500">כל תוכנית הלימוד המלאה — כל השלבים</p>
        </div>

        {/* ── Current subscription ─────────────────────────── */}
        {status === 'authenticated' && billing && (active || ending) && (
          <div className="bg-white border-4 border-green-300 rounded-3xl p-6 shadow-lg mb-6">
            <h2 className="font-display font-bold text-xl text-gray-800 mb-3">
              {billing.plan === 'teacher' ? '👩‍🏫 מנוי מורה' : '👨‍👩‍👧 מנוי הורים'}
            </h2>
            <ul className="font-bold text-gray-600 text-sm flex flex-col gap-1.5 mb-4">
              {billing.plan === 'parent' && (
                <li>🧒 {billing.seats} {billing.seats === 1 ? 'ילד' : 'ילדים'}{billing.discountedSeats > 0 && ` · ${billing.discountedSeats} בהנחת כיתה`}</li>
              )}
              {billing.monthlyAmount !== null && <li>💳 {ils(billing.monthlyAmount)} לחודש{billing.cardSuffix && ` · כרטיס ****${billing.cardSuffix}`}</li>}
              {active && <li>📅 החיוב הבא: {date(billing.currentPeriodEnd)}</li>}
              {billing.status === 'past_due' && (
                <li className="text-red-600">⚠️ החיוב האחרון לא עבר. Grow תנסה שוב — כדאי לבדוק את הכרטיס.</li>
              )}
              {ending && <li className="text-amber-600">⏳ המנוי בוטל ויסתיים ב-{date(billing.currentPeriodEnd)}</li>}
            </ul>

            {active && billing.plan === 'parent' && (
              <div className="mb-4">
                <div className="text-xs font-black text-gray-400 mb-1.5">החבילה שלכם</div>
                <div className="grid grid-cols-3 gap-2">
                  {PARENT_TIERS.map((t, i) => {
                    const current = billing.tierChosen === i
                    const allowed = i >= billing.quotes.parent.minTierIndex
                    return (
                      <button key={t.labelHe} onClick={() => !current && allowed && changeTier(i)} disabled={busy || !allowed || current}
                        className={`rounded-2xl border-2 py-2 text-center cursor-pointer disabled:cursor-default ${current ? 'border-primary bg-purple-50' : allowed ? 'border-gray-200 hover:border-primary' : 'border-gray-100 opacity-40'}`}>
                        <div className="font-display font-black text-xl text-primary">{ils(t.price)}</div>
                        <div className="text-[11px] font-bold text-gray-500">{t.labelHe}</div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[11px] font-bold text-gray-400 mt-1.5">שינוי חבילה נכנס לתוקף מהחיוב הבא. ההטבות נפתחות מיד.</p>
              </div>
            )}

            {billing.plan === 'teacher' && (
              <Link href="/teacher" className="btn-kid bg-primary w-full block text-center no-underline mb-3">👩‍🏫 לכיתה שלי</Link>
            )}

            {active && !confirmCancel && (
              <button onClick={() => setConfirmCancel(true)} className="w-full font-bold text-sm text-gray-400 hover:text-red-500 cursor-pointer py-1">
                ביטול המנוי
              </button>
            )}
            {active && confirmCancel && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                <p className="font-bold text-red-700 text-sm mb-3">
                  לבטל? לא יהיו חיובים נוספים, והגישה תישאר עד {date(billing.currentPeriodEnd)}.
                </p>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setConfirmCancel(false)} className="px-4 py-2 rounded-xl font-bold text-sm text-gray-500 hover:bg-white cursor-pointer">השארת המנוי</button>
                  <button onClick={() => post('/api/billing/cancel')} disabled={busy} className="px-4 py-2 rounded-xl font-bold text-sm bg-red-500 text-white hover:bg-red-600 cursor-pointer disabled:opacity-50">
                    כן, לבטל
                  </button>
                </div>
              </div>
            )}
            {ending && billing.canUndoCancel && (
              <button onClick={() => post('/api/billing/resume')} disabled={busy} className="btn-kid bg-green-500 w-full disabled:opacity-50">
                ↩️ התחרטתי — להמשיך את המנוי
              </button>
            )}
          </div>
        )}

        {/* ── Plans ─────────────────────────────────────────── */}
        {!active && (
          <>
            {TEACHERS_ENABLED && <div className="grid grid-cols-2 gap-2 bg-gray-100 rounded-2xl p-1.5 mb-4">
              {(['parent', 'teacher'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => { setPlan(p); setError(null) }}
                  className={`rounded-xl py-2.5 font-display font-bold text-lg transition-all cursor-pointer ${plan === p ? 'bg-white shadow text-primary' : 'text-gray-500'}`}
                >
                  {p === 'parent' ? '👨‍👩‍👧 הורים' : '👩‍🏫 מורים'}
                </button>
              ))}
            </div>}

            <div className="bg-white border-4 border-primary rounded-3xl p-6 shadow-lg text-center mb-6">
              {plan === 'parent' ? (
                <>
                  {/* family tiers — tap to choose */}
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {PARENT_TIERS.map((t, i) => {
                      const allowed = !billing || i >= minTier
                      return (
                        <button key={t.labelHe} onClick={() => allowed && setTierPick(i)} disabled={!allowed}
                          className={`relative rounded-2xl border-2 py-3 transition-all cursor-pointer disabled:cursor-not-allowed ${chosenTier === i ? 'border-primary bg-purple-50 shadow' : allowed ? 'border-gray-100 hover:border-purple-200' : 'border-gray-100 opacity-40'}`}>
                          {i === 1 && <span className="absolute -top-2.5 inset-x-0 mx-auto w-fit rounded-full bg-secondary text-white text-[10px] font-black px-2">הכי משתלם</span>}
                          <div className="font-display font-black text-3xl text-primary">{ils(t.price)}</div>
                          <div className="text-xs font-bold text-gray-500 mt-0.5">{t.labelHe}</div>
                        </button>
                      )
                    })}
                  </div>
                  <p className="font-bold text-gray-500 text-sm mb-4">לחודש, לכל המשפחה · ביטול בכל עת</p>
                  {billing && minTier > 0 && (
                    <p className="text-xs font-bold text-gray-400 -mt-2 mb-4">יש לכם {q?.seats} ילדים בחשבון — החבילה המינימלית: ״{PARENT_TIERS[minTier].labelHe}״</p>
                  )}
                  <ul className="text-right font-bold text-gray-600 text-sm flex flex-col gap-2 mb-5 max-w-sm mx-auto">
                    {perksForTier(chosenTier as TierIndex).map(p => (
                      <li key={p.id} className={p.minTier > 0 ? 'text-primary' : ''}>
                        {p.icon} <span className="font-black">{p.titleHe}</span> — <span className="font-bold text-gray-500">{p.descHe}</span>
                      </li>
                    ))}
                    {TEACHERS_ENABLED && <li>🏫 יש לכם קוד מהמורה? הזינו אותו בפרופיל הילד וקבלו {discount}% הנחה על המנוי</li>}
                  </ul>
                </>
              ) : (
                <>
                  <div className="font-display font-black text-5xl text-primary mb-1">
                    {ils(q?.monthlyAmount ?? TEACHER_MONTHLY)}<span className="text-xl text-gray-400 font-bold"> / חודש</span>
                  </div>
                  <p className="font-bold text-gray-500 text-sm mb-5">ביטול בכל עת</p>
                  <ul className="text-right font-bold text-gray-600 text-sm flex flex-col gap-2 mb-5 max-w-xs mx-auto">
                    <li>✅ גישה מלאה לכל השלבים — לתרגול בכיתה</li>
                    <li>📊 תצוגת התקדמות לכל הכיתה במקום אחד</li>
                    <li>🔑 קוד כיתה אישי: משפחות שמצטרפות איתו מקבלות {discount}% הנחה במנוי, והתלמידים נכנסים לכיתה שלכם אוטומטית</li>
                    <li>♾️ ללא הגבלת מספר תלמידים</li>
                  </ul>
                </>
              )}

              {status === 'unauthenticated' && (
                <button onClick={() => signIn('google')} className="btn-kid bg-primary w-full">
                  👤 התחברות עם Google כדי להתחיל
                </button>
              )}

              {status === 'authenticated' && billing && q && (
                <div className="text-right">
                  {/* the price breakdown for this account */}
                  <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4 mb-4 text-sm font-bold text-gray-600 flex flex-col gap-1">
                    {plan === 'parent' && (
                      <div className="flex justify-between">
                        <span>חבילה: {PARENT_TIERS[chosenTier].labelHe}</span>
                        <span>{ils(tierPrice)}</span>
                      </div>
                    )}
                    {plan === 'parent' && discounted && (
                      <div className="flex justify-between text-green-700">
                        <span>🏫 הנחת כיתה ({discount}%)</span>
                        <span>−{ils(tierPrice - chosenMonthly)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-800">
                      <span>חיוב חודשי</span><span>{ils(plan === 'parent' ? chosenMonthly : q.monthlyAmount)}</span>
                    </div>
                  </div>
                  {plan === 'parent' && (
                    <p className="text-xs font-bold text-gray-400 mb-3">
                      המחיר לפי מספר פרופילי הילדים בחשבון ({q.seats}).{' '}
                      <Link href="/profiles" className="text-primary">ניהול פרופילים ←</Link>
                    </p>
                  )}

                  <label className="block font-bold text-sm text-gray-600 mb-1" htmlFor="phone">טלפון נייד (לקבלה מ-Grow)</label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="050-1234567"
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 font-bold text-gray-700 focus:outline-none focus:border-primary mb-3 text-right"
                  />
                  <label className="flex items-start gap-2 text-xs font-bold text-gray-500 mb-4 cursor-pointer">
                    <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 accent-purple-600" />
                    <span>
                      קראתי ואני מסכים/ה ל<a href="/legal/terms" className="text-primary">תנאי השימוש</a> ול
                      <a href="/legal/refunds" className="text-primary">מדיניות הביטולים</a>, ולחיוב חודשי מתחדש עד לביטול.
                    </span>
                  </label>

                  {error && <p className="bg-red-50 border-2 border-red-200 rounded-xl px-3 py-2 text-sm font-bold text-red-700 mb-3">{error}</p>}

                  {billing.checkoutAvailable ? (
                    <button onClick={startCheckout} disabled={busy || !agree || !phone.trim()} className="btn-kid bg-green-500 w-full disabled:opacity-50">
                      {busy ? 'פותחים את עמוד התשלום…' : `🔒 לתשלום מאובטח ב-Grow — ${ils(plan === 'parent' ? chosenMonthly : q.firstAmount)}`}
                    </button>
                  ) : (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center font-bold text-blue-800 text-sm">
                      🎉 בתקופת ההרצה האתר פתוח בחינם לכולם — התשלום ייפתח בקרוב.
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <p className="text-center text-xs font-bold text-gray-400">
          שלב 1 נשאר חינמי לכולם · המחירים כוללים מע״מ · התשלום מאובטח על ידי Grow
        </p>
        <p className="text-center text-xs font-bold text-gray-300 mt-2">
          <a href="/legal/terms" className="hover:text-primary no-underline">תנאי שימוש</a>
          {' · '}
          <a href="/legal/privacy" className="hover:text-primary no-underline">מדיניות פרטיות</a>
          {' · '}
          <a href="/legal/refunds" className="hover:text-primary no-underline">ביטולים והחזרים</a>
          {' · '}
          <a href="/legal/accessibility" className="hover:text-primary no-underline">הצהרת נגישות</a>
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
