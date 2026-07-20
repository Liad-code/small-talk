'use client'
import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/layout/Header'

interface Stats {
  totalParents: number
  signups7: number
  signups30: number
  totalChildren: number
  activeChildren7: number
  totalStars: number
  subscriptions: Record<string, number>
  paywallEnabled: boolean
  pricePerChild: number
}

interface AdminChild { id: string; displayName: string; avatar: string; createdAt: string; stars: number }
interface AdminUser {
  id: string
  name: string | null
  email: string | null
  role: string
  createdAt: string
  children: AdminChild[]
  subscription: { status: string; seats: number; currentPeriodEnd: string } | null
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center">
      <div className="font-display font-black text-3xl text-gray-800">{value}</div>
      <div className="text-xs font-bold text-gray-400 mt-1">{label}</div>
      {sub && <div className="text-[11px] font-bold text-gray-300">{sub}</div>}
    </div>
  )
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [q, setQ] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUsers = useCallback(async (query: string) => {
    const res = await fetch(`/api/admin/users?q=${encodeURIComponent(query)}`, { cache: 'no-store' })
    if (res.ok) setUsers((await res.json()).users)
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)),
      loadUsers(''),
    ]).then(([s]) => {
      setStats(s)
      setLoading(false)
    })
  }, [loadUsers])

  useEffect(() => {
    const t = setTimeout(() => loadUsers(q), 300)
    return () => clearTimeout(t)
  }, [q, loadUsers])

  const activeSubs = stats ? (stats.subscriptions['active'] ?? 0) + (stats.subscriptions['trialing'] ?? 0) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-gray-800 mb-1">🛠️ Admin</h1>
        <p className="font-bold text-gray-400 text-sm mb-6" dir="rtl">לוח ניהול — נתוני משתמשים ופעילות</p>

        {loading ? (
          <div className="text-center text-gray-400 font-bold py-10">Loading...</div>
        ) : (
          <>
            {/* ── Metrics ─────────────────────────────────── */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                <StatCard label="הורים רשומים" value={stats.totalParents} />
                <StatCard label="נרשמו ב-7 ימים" value={stats.signups7} sub={`${stats.signups30} ב-30 ימים`} />
                <StatCard label="פרופילי ילדים" value={stats.totalChildren} />
                <StatCard label="ילדים פעילים (7 ימים)" value={stats.activeChildren7} />
                <StatCard label="כוכבים שנצברו" value={stats.totalStars.toLocaleString()} />
                <StatCard label="מנויים פעילים" value={activeSubs} sub="billing parked" />
              </div>
            )}

            {/* ── System status ───────────────────────────── */}
            {stats && (
              <div className="bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 mb-8 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold text-gray-500">
                <span>
                  Paywall:{' '}
                  {stats.paywallEnabled ? (
                    <span className="text-red-500">ON 🔒</span>
                  ) : (
                    <span className="text-green-600">OFF (site is free)</span>
                  )}
                </span>
                <span>Price: ₪{stats.pricePerChild}/child/month</span>
                <span>Provider: PayPlus (pending merchant account)</span>
              </div>
            )}

            {/* ── Users ───────────────────────────────────── */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-xl text-gray-700">👥 Users</h2>
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search name / email..."
                className="border-2 border-gray-200 rounded-xl px-3 py-1.5 font-bold text-sm text-gray-700 focus:outline-none focus:border-primary w-56"
              />
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
              {users.length === 0 && (
                <div className="p-6 text-center text-gray-400 font-bold text-sm">No users found</div>
              )}
              {users.map((u, i) => (
                <div key={u.id} className={i > 0 ? 'border-t border-gray-100' : ''}>
                  <button
                    onClick={() => setExpanded(prev => (prev === u.id ? null : u.id))}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-gray-800 truncate">
                        {u.name ?? '—'}
                        {u.role === 'ADMIN' && <span className="ml-2 text-[10px] bg-purple-100 text-purple-700 font-black px-1.5 py-0.5 rounded">ADMIN</span>}
                      </div>
                      <div className="text-xs font-bold text-gray-400 truncate">{u.email}</div>
                    </div>
                    <div className="text-xs font-bold text-gray-400 whitespace-nowrap">
                      {u.children.length} 🧒 · {new Date(u.createdAt).toLocaleDateString('he-IL')}
                    </div>
                    <span className="text-gray-300">{expanded === u.id ? '▲' : '▼'}</span>
                  </button>

                  {expanded === u.id && (
                    <div className="px-4 pb-4 bg-gray-50/50">
                      {u.subscription ? (
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Subscription: {u.subscription.status} · {u.subscription.seats} seats · renews{' '}
                          {new Date(u.subscription.currentPeriodEnd).toLocaleDateString('he-IL')}
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-gray-400 mb-2">No subscription (free)</div>
                      )}
                      {u.children.length === 0 ? (
                        <div className="text-xs font-bold text-gray-400">No child profiles</div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {u.children.map(c => (
                            <div key={c.id} className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
                              <span className="text-lg">{c.avatar}</span>
                              <span className="font-bold text-sm text-gray-700">{c.displayName}</span>
                              <span className="text-xs font-black text-yellow-600">⭐ {c.stars}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
