'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Header } from '@/components/layout/Header'
import { useActiveProfile } from '@/components/providers/ProfileProvider'
import { hasLocalProgress, importLocalProgress, pullProgress } from '@/lib/progressSync'

interface Child {
  id: string
  displayName: string
  avatar: string
  ageBand?: string | null
}

const AVATARS = ['🦉', '🦁', '🐼', '🦊', '🐸', '🦄', '🐯', '🐙', '🦖', '🐨', '🚀', '⭐']

export default function ProfilesPage() {
  const { status } = useSession()
  const { child: activeChild, refresh } = useActiveProfile()
  const router = useRouter()

  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAvatar, setNewAvatar] = useState('🦉')
  const [busy, setBusy] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [importAsk, setImportAsk] = useState<Child | null>(null)

  const loadChildren = useCallback(async () => {
    const res = await fetch('/api/children', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      setChildren(data.children)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (status === 'authenticated') loadChildren()
    if (status === 'unauthenticated') setLoading(false)
  }, [status, loadChildren])

  async function selectChild(c: Child) {
    if (busy) return
    setBusy(true)
    const res = await fetch('/api/children/active', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: c.id }),
    })
    if (res.ok) {
      // If this profile has no server progress yet but this device has local
      // progress — offer a one-time import instead of silently discarding it.
      const snap = await fetch('/api/progress', { cache: 'no-store' }).then(r => r.json()).catch(() => null)
      const serverEmpty =
        snap &&
        Object.keys(snap.subjects ?? {}).length === 0 &&
        (snap.step1?.stars ?? 0) === 0 &&
        Object.keys(snap.stepStars ?? {}).length === 0
      if (serverEmpty && hasLocalProgress()) {
        setImportAsk(c)
        setBusy(false)
        return
      }
      await pullProgress()
      await refresh()
      router.push('/')
    }
    setBusy(false)
  }

  async function finishImport(doImport: boolean) {
    setBusy(true)
    if (doImport) await importLocalProgress()
    await pullProgress()
    await refresh()
    setImportAsk(null)
    setBusy(false)
    router.push('/')
  }

  async function createChild() {
    if (!newName.trim() || busy) return
    setBusy(true)
    const res = await fetch('/api/children', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: newName.trim(), avatar: newAvatar }),
    })
    setBusy(false)
    if (res.ok) {
      const { child } = await res.json()
      setCreating(false)
      setNewName('')
      await loadChildren()
      await selectChild(child)
    }
  }

  async function renameChild(id: string, displayName: string) {
    if (!displayName.trim()) return
    await fetch(`/api/children/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: displayName.trim() }),
    })
    setEditingId(null)
    await loadChildren()
    await refresh()
  }

  async function deleteChild(id: string) {
    if (!confirm('למחוק את הפרופיל? ההתקדמות שנשמרה לו תימחק.')) return
    await fetch(`/api/children/${id}`, { method: 'DELETE' })
    await loadChildren()
    await refresh()
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
          <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">פרופילים</h1>
          <p className="font-bold text-gray-500 mb-6" dir="rtl">
            כדי ליצור פרופילים לילדים ולשמור את ההתקדמות בענן — יש להתחבר עם חשבון Google.
          </p>
          <button onClick={() => signIn('google')} className="btn-kid bg-primary">
            👤 התחברות עם Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-4xl font-bold text-gray-800 text-center mb-1">מי לומד עכשיו?</h1>
        <p className="font-bold text-gray-400 text-center mb-8" dir="rtl">בחרו פרופיל — ההתקדמות של כל ילד נשמרת בנפרד</p>

        {loading ? (
          <div className="text-center text-gray-400 font-bold py-10">טוען...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {children.map(c => (
              <div
                key={c.id}
                className={`relative bg-white border-4 rounded-3xl p-5 text-center card-3d transition-all
                  ${activeChild?.id === c.id ? 'border-green-400 ring-2 ring-green-200' : 'border-purple-200 hover:border-primary'}`}
              >
                <button onClick={() => selectChild(c)} disabled={busy} className="w-full cursor-pointer">
                  <div className="text-6xl mb-2">{c.avatar}</div>
                  {editingId === c.id ? null : (
                    <div className="font-display font-bold text-lg text-gray-800">{c.displayName}</div>
                  )}
                  {activeChild?.id === c.id && (
                    <div className="text-xs font-bold text-green-500 mt-1">✓ פעיל עכשיו</div>
                  )}
                </button>

                {editingId === c.id ? (
                  <RenameRow initial={c.displayName} onSave={name => renameChild(c.id, name)} onCancel={() => setEditingId(null)} />
                ) : (
                  <div className="flex justify-center gap-3 mt-2">
                    <button onClick={() => setEditingId(c.id)} className="text-xs font-bold text-gray-400 hover:text-primary cursor-pointer">✏️ שינוי שם</button>
                    <button onClick={() => deleteChild(c.id)} className="text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer">🗑️ מחיקה</button>
                  </div>
                )}
              </div>
            ))}

            {/* Add child */}
            {!creating ? (
              <button
                onClick={() => setCreating(true)}
                className="bg-purple-50 border-4 border-dashed border-purple-300 rounded-3xl p-5 text-center
                           hover:bg-purple-100 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center min-h-[150px]"
              >
                <div className="text-5xl mb-2">➕</div>
                <div className="font-display font-bold text-gray-600">הוספת פרופיל</div>
              </button>
            ) : (
              <div className="bg-white border-4 border-primary rounded-3xl p-4 col-span-2 sm:col-span-3">
                <p className="font-bold text-gray-600 text-sm mb-2" dir="rtl">שם הילד/ה:</p>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createChild()}
                  maxLength={30}
                  autoFocus
                  className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 font-bold text-gray-700 focus:outline-none focus:border-primary mb-3"
                  placeholder="למשל: דנה"
                  dir="rtl"
                />
                <p className="font-bold text-gray-600 text-sm mb-2" dir="rtl">בחרו דמות:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      onClick={() => setNewAvatar(a)}
                      className={`w-11 h-11 text-2xl rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all
                        ${newAvatar === a ? 'border-primary bg-purple-100 scale-110' : 'border-gray-200 hover:border-purple-300'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => { setCreating(false); setNewName('') }} className="px-4 py-2 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 cursor-pointer">ביטול</button>
                  <button onClick={createChild} disabled={!newName.trim() || busy} className="btn-kid bg-primary !py-2 !px-5 text-sm disabled:opacity-40">✅ יצירה</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* One-time import dialog */}
      {importAsk && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl border-4 border-purple-200 p-6 max-w-sm w-full text-center bounce-in">
            <div className="text-5xl mb-3">📥</div>
            <h2 className="font-display font-bold text-xl text-gray-800 mb-2">נמצאה התקדמות במכשיר הזה</h2>
            <p className="font-bold text-gray-500 text-sm mb-5" dir="rtl">
              לייבא את הכוכבים וההתקדמות שנצברו במכשיר הזה לפרופיל של {importAsk.displayName}?
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => finishImport(false)} disabled={busy} className="px-4 py-2 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 cursor-pointer">להתחיל מאפס</button>
              <button onClick={() => finishImport(true)} disabled={busy} className="btn-kid bg-green-500 !py-2 !px-5 text-sm">📥 לייבא</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RenameRow({ initial, onSave, onCancel }: { initial: string; onSave: (name: string) => void; onCancel: () => void }) {
  const [name, setName] = useState(initial)
  return (
    <div className="mt-2">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSave(name); if (e.key === 'Escape') onCancel() }}
        maxLength={30}
        autoFocus
        className="w-full border-2 border-gray-300 rounded-xl px-2 py-1 font-bold text-sm text-gray-700 focus:outline-none focus:border-primary mb-2"
        dir="rtl"
      />
      <div className="flex justify-center gap-2">
        <button onClick={() => onSave(name)} className="text-xs font-bold text-green-600 cursor-pointer">✅ שמירה</button>
        <button onClick={onCancel} className="text-xs font-bold text-gray-400 cursor-pointer">ביטול</button>
      </div>
    </div>
  )
}
