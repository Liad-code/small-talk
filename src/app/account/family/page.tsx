'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { Header } from '@/components/layout/Header'
import { PerkLocked } from '@/components/perks/PerkBits'

interface Kid { id: string; displayName: string; avatar: string; stars: number }
interface Week {
  allowed: boolean
  goalAllowed?: boolean
  board?: Kid[]
  leader?: Kid | null
  lastWeekWinner?: Kid | null
  goal?: number
  total?: number
  goalReached?: boolean
  daysLeft?: number
}

const MEDALS = ['🥇', '🥈', '🥉']

/** ₪49+ perk: weekly sibling challenge + shared family goal. */
export default function FamilyPage() {
  const { status } = useSession()
  const [data, setData] = useState<Week | null>(null)
  const [editing, setEditing] = useState(false)
  const [goal, setGoal] = useState(50)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/family/week', { cache: 'no-store' })
    const d = res.ok ? await res.json() : { allowed: false }
    setData(d)
    if (d.goal) setGoal(d.goal)
  }, [])
  useEffect(() => { if (status === 'authenticated') load() }, [status, load])

  async function saveGoal() {
    setBusy(true)
    await fetch('/api/family/goal', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ goal }) })
    setBusy(false)
    setEditing(false)
    load()
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen"><Header />
        <div className="text-center py-20" dir="rtl"><button onClick={() => signIn('google')} className="btn-kid bg-primary">👤 התחברות</button></div>
      </div>
    )
  }
  if (!data) return <div className="min-h-screen"><Header /><div className="text-center text-gray-400 font-bold py-20">טוען...</div></div>
  if (!data.allowed) return <div className="min-h-screen"><Header /><PerkLocked icon="🏆" title="אתגר האחים השבועי" minTier={1} /></div>

  const board = data.board ?? []
  const max = Math.max(1, ...board.map(k => k.stars))
  const pct = Math.min(100, Math.round(((data.total ?? 0) / Math.max(1, data.goal ?? 1)) * 100))

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-xl mx-auto px-4 py-8" dir="rtl">
        <Link href="/account" className="text-sm font-bold text-primary no-underline">→ החשבון שלי</Link>
        <h1 className="font-display text-3xl font-bold text-gray-800 mt-2 mb-1">🏆 אתגר האחים השבועי</h1>
        <p className="font-bold text-gray-400 text-sm mb-6">
          כוכבים שנאספו השבוע (ראשון–שבת) · {data.daysLeft === 0 ? 'היום האחרון!' : `עוד ${data.daysLeft} ימים`}
        </p>

        {data.lastWeekWinner && (
          <div className="bounce-in bg-gradient-to-l from-amber-300 to-yellow-200 rounded-3xl p-4 mb-5 flex items-center gap-3 shadow">
            <span className="text-4xl">{data.lastWeekWinner.avatar}</span>
            <div className="font-bold text-amber-900">
              <div className="text-xs">🎉 המנצח/ת של שבוע שעבר</div>
              <div className="font-display text-xl">{data.lastWeekWinner.displayName} · {data.lastWeekWinner.stars} ⭐</div>
            </div>
            <span className="text-4xl mr-auto">👑</span>
          </div>
        )}

        {board.length < 2 && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 mb-5 font-bold text-gray-600 text-sm">
            האתגר מתחיל כשיש לפחות שני ילדים בחשבון. <Link href="/profiles" className="text-primary">הוספת פרופיל ←</Link>
          </div>
        )}

        <div className="flex flex-col gap-3 mb-8">
          {board.map((k, i) => (
            <div key={k.id} className={`bg-white border-4 rounded-3xl p-4 ${data.leader?.id === k.id ? 'border-amber-300' : 'border-purple-100'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl w-8 text-center">{k.stars > 0 ? MEDALS[i] ?? '⭐' : '·'}</span>
                <span className="text-3xl">{k.avatar}</span>
                <span className="font-display font-bold text-lg text-gray-800 flex-1">{k.displayName}</span>
                <span className="font-black text-yellow-600">{k.stars} ⭐</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-l from-yellow-400 to-orange-400 rounded-full transition-all" style={{ width: `${(k.stars / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {data.goalAllowed && (
          <section className="bg-white border-4 border-green-200 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-xl text-gray-800">🎯 היעד המשפחתי</h2>
              {!editing && <button onClick={() => setEditing(true)} className="text-sm font-bold text-primary cursor-pointer">שינוי יעד</button>}
            </div>
            {editing ? (
              <div className="flex items-center gap-2 mb-2">
                <input type="number" min={5} max={2000} value={goal} onChange={e => setGoal(Number(e.target.value))}
                  className="w-28 border-2 border-gray-200 rounded-xl px-3 py-2 font-black text-center" dir="ltr" />
                <span className="font-bold text-gray-500 text-sm">כוכבים בשבוע, לכל המשפחה יחד</span>
                <button onClick={saveGoal} disabled={busy || goal < 5} className="mr-auto px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-sm disabled:opacity-50 cursor-pointer">שמירה</button>
              </div>
            ) : (
              <p className="font-bold text-gray-500 text-sm mb-2">יחד אוספים {data.goal} כוכבים השבוע</p>
            )}
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-l from-green-400 to-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-700">{data.total} / {data.goal} ⭐</span>
            </div>
            {data.goalReached && <p className="bounce-in text-center font-display font-bold text-xl text-green-600 mt-3">🎉 הגעתם ליעד! כל הכבוד לכל המשפחה!</p>}
          </section>
        )}
      </div>
    </div>
  )
}
