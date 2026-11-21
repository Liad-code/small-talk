'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { Header } from '@/components/layout/Header'

interface Student {
  id: string
  displayName: string
  avatar: string
  joinedAt: string
  stars: { step1: number; perStep: Record<string, number>; subjects: number; total: number }
  lastActive: string | null
}
interface ClassData {
  allowed: boolean
  classroom: { name: string; code: string } | null
  students?: Student[]
  studentCount?: number
}

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7']

function timeAgo(iso: string | null): string {
  if (!iso) return 'עוד לא התחיל'
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days <= 0) return 'היום'
  if (days === 1) return 'אתמול'
  if (days < 7) return `לפני ${days} ימים`
  if (days < 30) return `לפני ${Math.floor(days / 7)} שב׳`
  return `לפני ${Math.floor(days / 30)} ח׳`
}

export default function TeacherPage() {
  const { status } = useSession()
  const [data, setData] = useState<ClassData | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sort, setSort] = useState<'name' | 'stars' | 'active'>('stars')
  const [removing, setRemoving] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await fetch('/api/teacher/class', { cache: 'no-store' })
    setData(res.ok ? await res.json() : null)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (status === 'authenticated') load()
    if (status === 'unauthenticated') setLoading(false)
  }, [status, load])

  async function createClass() {
    if (busy) return
    setBusy(true)
    await fetch('/api/teacher/class', { method: 'POST' })
    setBusy(false)
    load()
  }

  async function remove(childId: string) {
    setBusy(true)
    await fetch(`/api/teacher/class/members/${encodeURIComponent(childId)}`, { method: 'DELETE' })
    setRemoving(null)
    setBusy(false)
    load()
  }

  function copyCode(code: string) {
    navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }).catch(() => {})
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center" dir="rtl">
          <div className="text-6xl mb-4">👩‍🏫</div>
          <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">אזור המורה</h1>
          <p className="font-bold text-gray-500 mb-6">כדי לפתוח כיתה ולעקוב אחרי התלמידים — יש להתחבר.</p>
          <button onClick={() => signIn('google')} className="btn-kid bg-primary">👤 התחברות עם Google</button>
        </div>
      </div>
    )
  }

  const students = [...(data?.students ?? [])].sort((a, b) =>
    sort === 'name' ? a.displayName.localeCompare(b.displayName, 'he')
      : sort === 'stars' ? b.stars.total - a.stars.total
        : new Date(b.lastActive ?? 0).getTime() - new Date(a.lastActive ?? 0).getTime())

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="font-display text-3xl font-bold text-gray-800 mb-1">👩‍🏫 הכיתה שלי</h1>
        <p className="font-bold text-gray-400 text-sm mb-6">ההתקדמות של כל התלמידים שהצטרפו עם קוד הכיתה שלכם</p>

        {loading ? (
          <div className="text-center text-gray-400 font-bold py-10">טוען...</div>
        ) : !data?.classroom ? (
          <div className="bg-white border-4 border-purple-100 rounded-3xl p-6 text-center">
            <div className="text-5xl mb-3">🏫</div>
            {data?.allowed ? (
              <>
                <p className="font-bold text-gray-600 mb-4">פתחו כיתה וקבלו קוד אישי לחלק לתלמידים.</p>
                <button onClick={createClass} disabled={busy} className="btn-kid bg-primary disabled:opacity-50">✨ פתיחת כיתה</button>
              </>
            ) : (
              <>
                <p className="font-bold text-gray-600 mb-4">כדי לפתוח כיתה צריך מנוי מורה.</p>
                <Link href="/pricing?plan=teacher" className="btn-kid bg-primary no-underline">👩‍🏫 למנוי מורה</Link>
              </>
            )}
          </div>
        ) : (
          <>
            {/* class code */}
            <div className="bg-gradient-to-l from-purple-500 to-indigo-500 text-white rounded-3xl p-5 mb-6 shadow-lg">
              <div className="font-bold text-sm opacity-90 mb-1">{data.classroom.name} · קוד הכיתה</div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-display font-black text-4xl tracking-[0.2em]" dir="ltr">{data.classroom.code}</span>
                <button onClick={() => copyCode(data.classroom!.code)} className="bg-white/20 hover:bg-white/30 rounded-xl px-3 py-1.5 font-bold text-sm cursor-pointer">
                  {copied ? '✓ הועתק' : '📋 העתקה'}
                </button>
              </div>
              <p className="text-sm font-bold opacity-90 mt-2">
                ההורים מזינים את הקוד בעמוד &quot;החשבון שלי&quot; ליד פרופיל הילד: הילד מצטרף לכיתה ומקבל הנחה במנוי.
              </p>
            </div>

            {!data.allowed && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl px-4 py-3 mb-6 font-bold text-amber-800 text-sm">
                🔒 מנוי המורה לא פעיל — {data.studentCount} תלמידים בכיתה, אבל ההתקדמות מוצגת רק עם מנוי פעיל.{' '}
                <Link href="/pricing?plan=teacher" className="text-primary">לחידוש ←</Link>
              </div>
            )}

            {data.allowed && (
              <>
                <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                  <h2 className="font-display font-bold text-xl text-gray-700">🧒 {students.length} תלמידים</h2>
                  <div className="flex gap-1 text-xs font-bold">
                    {([['stars', 'כוכבים'], ['active', 'פעילות'], ['name', 'שם']] as const).map(([k, l]) => (
                      <button key={k} onClick={() => setSort(k)} className={`rounded-full px-3 py-1 cursor-pointer ${sort === k ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>{l}</button>
                    ))}
                  </div>
                </div>

                {students.length === 0 ? (
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 text-center font-bold text-gray-500">
                    עדיין אין תלמידים. שלחו להורים את קוד הכיתה 👆
                  </div>
                ) : (
                  <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-x-auto">
                    <table className="w-full text-sm font-bold">
                      <thead className="bg-gray-50 text-gray-400 text-xs">
                        <tr>
                          <th className="text-right px-3 py-2">תלמיד</th>
                          <th className="px-2 py-2">⭐ סה״כ</th>
                          {STEPS.map((s, i) => <th key={s} className="px-1.5 py-2 whitespace-nowrap">שלב {i + 1}</th>)}
                          <th className="px-2 py-2 whitespace-nowrap">פעילות</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(s => (
                          <tr key={s.id} className="border-t border-gray-100">
                            <td className="px-3 py-2 whitespace-nowrap"><span className="text-xl ml-1">{s.avatar}</span>{s.displayName}</td>
                            <td className="px-2 py-2 text-center text-yellow-600">{s.stars.total}</td>
                            {STEPS.map(st => (
                              <td key={st} className="px-1.5 py-2 text-center text-purple-700">
                                {(st === 'step1' ? s.stars.step1 : s.stars.perStep[st] ?? 0) || <span className="text-gray-200">·</span>}
                              </td>
                            ))}
                            <td className="px-2 py-2 text-center text-gray-400 text-xs whitespace-nowrap">{timeAgo(s.lastActive)}</td>
                            <td className="px-2 py-2 text-left whitespace-nowrap">
                              {removing === s.id ? (
                                <span className="text-xs">
                                  <button onClick={() => remove(s.id)} disabled={busy} className="text-red-600 cursor-pointer">להסיר</button>
                                  {' · '}
                                  <button onClick={() => setRemoving(null)} className="text-gray-400 cursor-pointer">ביטול</button>
                                </span>
                              ) : (
                                <button onClick={() => setRemoving(s.id)} className="text-gray-300 hover:text-red-500 cursor-pointer" aria-label={`הסרת ${s.displayName} מהכיתה`}>✕</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
