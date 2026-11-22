'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Header } from '@/components/layout/Header'
import { useActiveProfile } from '@/components/providers/ProfileProvider'
import { TEACHERS_ENABLED } from '@/lib/billing/plans'

interface ChildOverview {
  id: string
  displayName: string
  avatar: string
  ageBand?: string | null
  createdAt: string
  stars: {
    step1: number
    perStep: Record<string, number>
    subjects: number
    total: number
  }
  levelsDone: number
  lastActive: string | null
  classroom: { name: string; code: string } | null
}

interface Billing {
  subscribed: boolean
  plan: 'parent' | 'teacher' | null
  status: string | null
  monthlyAmount: number | null
  currentPeriodEnd: string | null
  paywallEnabled: boolean
  prices: { classDiscountPercent: number }
}

interface Overview {
  user: { name: string | null; email: string | null }
  children: ChildOverview[]
}

const STEP_LABELS: [string, string][] = [
  ['step1', 'שלב 1'],
  ['step2', 'שלב 2'],
  ['step3', 'שלב 3'],
  ['step4', 'שלב 4'],
  ['step5', 'שלב 5'],
  ['step6', 'שלב 6'],
  ['step7', 'שלב 7'],
]

function timeAgo(iso: string | null): string {
  if (!iso) return 'עוד לא התחיל'
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days <= 0) return 'היום'
  if (days === 1) return 'אתמול'
  if (days < 7) return `לפני ${days} ימים`
  if (days < 30) return `לפני ${Math.floor(days / 7)} שבועות`
  return `לפני ${Math.floor(days / 30)} חודשים`
}

export default function AccountPage() {
  const { status } = useSession()
  const { child: activeChild } = useActiveProfile()
  const [data, setData] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [billing, setBilling] = useState<Billing | null>(null)
  const [hasClass, setHasClass] = useState(false)

  const loadOverview = useCallback(() => {
    fetch('/api/account/overview', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (status !== 'authenticated') {
      if (status === 'unauthenticated') setLoading(false)
      return
    }
    loadOverview()
    fetch('/api/billing', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then(setBilling).catch(() => {})
    if (TEACHERS_ENABLED) fetch('/api/teacher/class', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then(d => setHasClass(!!d?.classroom)).catch(() => {})
  }, [status, loadOverview])

  async function deleteAccount() {
    if (busy) return
    setBusy(true)
    const res = await fetch('/api/account', { method: 'DELETE' })
    if (res.ok) {
      try { localStorage.clear() } catch {/* ignore */}
      await signOut({ callbackUrl: '/' })
      return
    }
    setBusy(false)
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center" dir="rtl">
          <div className="text-6xl mb-4">⚙️</div>
          <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">החשבון שלי</h1>
          <p className="font-bold text-gray-500 mb-6">כדי לצפות בחשבון ובהתקדמות הילדים — יש להתחבר.</p>
          <button onClick={() => signIn('google')} className="btn-kid bg-primary">👤 התחברות עם Google</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="font-display text-3xl font-bold text-gray-800 mb-1">החשבון שלי</h1>
        {data?.user && (
          <p className="font-bold text-gray-400 text-sm mb-6">{data.user.name} · {data.user.email}</p>
        )}

        {loading ? (
          <div className="text-center text-gray-400 font-bold py-10">טוען...</div>
        ) : (
          <>
            {/* ── Children & progress ─────────────────────────── */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-bold text-xl text-gray-700">👨‍👩‍👧‍👦 הילדים וההתקדמות</h2>
                <Link href="/profiles" className="text-sm font-bold text-primary no-underline hover:underline">
                  ניהול פרופילים ←
                </Link>
              </div>

              {data?.children.length === 0 && (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 text-center font-bold text-gray-500">
                  עדיין אין פרופילים.{' '}
                  <Link href="/profiles" className="text-primary">צרו פרופיל ראשון ←</Link>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {data?.children.map(c => (
                  <div key={c.id} className={`bg-white border-4 rounded-3xl p-5 ${activeChild?.id === c.id ? 'border-green-300' : 'border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{c.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-lg text-gray-800">
                          {c.displayName}
                          {activeChild?.id === c.id && <span className="text-xs font-bold text-green-500 mr-2">· פעיל עכשיו</span>}
                        </div>
                        <div className="text-xs font-bold text-gray-400">
                          פעילות אחרונה: {timeAgo(c.lastActive)}
                          {c.levelsDone > 0 && <span> · {c.levelsDone} שלבי נושא הושלמו</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 border-2 border-yellow-200 rounded-2xl px-3 py-1.5">
                        <span className="text-lg">⭐</span>
                        <span className="font-black text-yellow-600">{c.stars.total}</span>
                      </div>
                    </div>

                    {/* Per-step stars */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {STEP_LABELS.map(([key, label]) => {
                        const stars = key === 'step1' ? c.stars.step1 : c.stars.perStep[key] ?? 0
                        return (
                          <div key={key} className="bg-purple-50 border border-purple-100 rounded-xl py-1.5 text-center">
                            <div className="text-[11px] font-bold text-gray-400">{label}</div>
                            <div className="font-black text-sm text-purple-700">⭐ {stars}</div>
                          </div>
                        )
                      })}
                    </div>
                    {c.stars.subjects > 0 && (
                      <div className="text-xs font-bold text-gray-400 mt-2">+ {c.stars.subjects} כוכבים מנושאי הלימוד הכלליים</div>
                    )}
                    {TEACHERS_ENABLED && <ClassCode child={c} discount={billing?.prices.classDiscountPercent ?? null} onChange={loadOverview} />}
                  </div>
                ))}
              </div>
            </section>

            {/* ── Subscription ───────────────────────────────── */}
            <section className="mb-8">
              <h2 className="font-display font-bold text-xl text-gray-700 mb-3">💳 מנוי</h2>
              {billing?.subscribed ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 font-bold text-green-800 text-sm flex items-center justify-between gap-3 flex-wrap">
                  <span>
                    ✅ {billing.plan === 'teacher' ? 'מנוי מורה' : 'מנוי הורים'}
                    {billing.monthlyAmount !== null && ` · ₪${Math.round(billing.monthlyAmount / 100)} לחודש`}
                    {billing.currentPeriodEnd && (billing.status === 'canceled'
                      ? ` · מסתיים ב-${new Date(billing.currentPeriodEnd).toLocaleDateString('he-IL')}`
                      : ` · חיוב הבא ${new Date(billing.currentPeriodEnd).toLocaleDateString('he-IL')}`)}
                  </span>
                  <Link href="/pricing" className="text-primary no-underline hover:underline">ניהול המנוי ←</Link>
                </div>
              ) : billing && !billing.paywallEnabled ? (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 font-bold text-blue-800 text-sm">
                  🎉 בתקופת ההרצה האתר פתוח בחינם לכולם.
                  <br />
                  <Link href="/pricing" className="text-blue-500">למחירים ולמנויים ←</Link>
                </div>
              ) : (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 font-bold text-gray-600 text-sm">
                  אין מנוי פעיל. <Link href="/pricing" className="text-primary">להצטרפות ←</Link>
                </div>
              )}
              {TEACHERS_ENABLED && <div className="mt-3 text-sm font-bold">
                <Link href="/teacher" className="text-primary no-underline hover:underline">
                  👩‍🏫 {hasClass ? 'לכיתה שלי' : 'אתם מורים? לאזור המורה'} ←
                </Link>
              </div>}
            </section>

            {/* ── Account ──────────────────────────────────────── */}
            <section>
              <h2 className="font-display font-bold text-xl text-gray-700 mb-3">⚙️ חשבון</h2>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 flex flex-col gap-3">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-right font-bold text-sm text-gray-600 hover:text-primary cursor-pointer"
                >
                  🚪 התנתקות
                </button>
                <hr className="border-gray-100" />
                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="text-right font-bold text-sm text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    🗑️ מחיקת החשבון וכל הנתונים
                  </button>
                ) : (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="font-bold text-red-700 text-sm mb-3">
                      פעולה זו תמחק לצמיתות את החשבון, את כל פרופילי הילדים ואת כל ההתקדמות. אין דרך לשחזר.
                    </p>
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 rounded-xl font-bold text-sm text-gray-500 hover:bg-white cursor-pointer">ביטול</button>
                      <button onClick={deleteAccount} disabled={busy} className="px-4 py-2 rounded-xl font-bold text-sm bg-red-500 text-white hover:bg-red-600 cursor-pointer disabled:opacity-50">
                        {busy ? 'מוחק...' : 'כן, למחוק הכול'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

/** A child's class: join with the teacher's code (discount + the teacher sees progress), or leave. */
function ClassCode({ child, discount, onChange }: { child: ChildOverview; discount: number | null; onChange: () => void }) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function join() {
    if (busy) return
    setBusy(true)
    setError(null)
    const res = await fetch('/api/classes/join', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ childId: child.id, code }),
    })
    setBusy(false)
    if (res.ok) { setOpen(false); setCode(''); onChange(); return }
    setError(res.status === 404 ? 'הקוד לא נמצא — בדקו אותו מול המורה.' : res.status === 429 ? 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.' : 'משהו השתבש, נסו שוב.')
  }

  async function leave() {
    if (busy) return
    setBusy(true)
    await fetch('/api/classes/leave', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ childId: child.id }) })
    setBusy(false)
    onChange()
  }

  if (child.classroom) {
    return (
      <div className="mt-3 flex items-center justify-between gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 text-xs font-bold">
        <span className="text-indigo-700">🏫 {child.classroom.name}</span>
        <button onClick={leave} disabled={busy} className="text-gray-400 hover:text-red-500 cursor-pointer">יציאה מהכיתה</button>
      </div>
    )
  }
  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-3 text-xs font-bold text-indigo-500 hover:text-indigo-700 cursor-pointer">
        🏫 יש לכם קוד כיתה מהמורה?
      </button>
    )
  }
  return (
    <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="קוד כיתה"
          maxLength={12}
          dir="ltr"
          className="flex-1 min-w-0 border-2 border-indigo-200 rounded-lg px-2 py-1.5 font-black tracking-widest text-center text-gray-700 focus:outline-none focus:border-indigo-400"
        />
        <button onClick={join} disabled={busy || code.trim().length < 4} className="px-3 rounded-lg bg-indigo-500 text-white font-bold text-sm disabled:opacity-50 cursor-pointer">הצטרפות</button>
      </div>
      <p className="text-[11px] font-bold text-gray-500 mt-2">
        המורה יראה/תראה את שם הפרופיל ({child.displayName}) ואת ההתקדמות בלבד — לא את פרטי החשבון שלכם.
        {discount ? ` אם למורה יש מנוי פעיל, תקבלו ${discount}% הנחה על המנוי המשפחתי.` : ''}
      </p>
      {error && <p className="text-xs font-bold text-red-600 mt-1">{error}</p>}
    </div>
  )
}
