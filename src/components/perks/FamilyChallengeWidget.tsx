'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface Kid { id: string; displayName: string; avatar: string; stars: number }
interface Week { allowed: boolean; goalAllowed?: boolean; board?: Kid[]; goal?: number; total?: number; leader?: Kid | null }

/** Compact weekly sibling challenge on the app home (₪49+ families with 2+ children). */
export function FamilyChallengeWidget() {
  const { status } = useSession()
  const [w, setW] = useState<Week | null>(null)
  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/family/week', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then(setW).catch(() => {})
  }, [status])
  if (!w?.allowed || (w.board?.length ?? 0) < 2) return null

  const pct = Math.min(100, Math.round(((w.total ?? 0) / Math.max(1, w.goal ?? 1)) * 100))
  return (
    <Link href="/account/family" className="block no-underline max-w-xl mx-auto px-4 mt-4 mb-2" dir="rtl">
      <div className="bg-white border-4 border-amber-200 rounded-3xl px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-gray-800">🏆 אתגר האחים השבוע</span>
          <span className="text-xs font-bold text-primary">ללוח ←</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {w.board!.map(k => (
            <span key={k.id} className={`rounded-full px-3 py-1 text-sm font-black ${w.leader?.id === k.id ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
              {w.leader?.id === k.id && '👑 '}{k.avatar} {k.displayName} · {k.stars}⭐
            </span>
          ))}
        </div>
        {w.goalAllowed && (
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden" title={`יעד משפחתי ${w.total}/${w.goal}`}>
            <div className="h-full bg-gradient-to-l from-green-400 to-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
    </Link>
  )
}
