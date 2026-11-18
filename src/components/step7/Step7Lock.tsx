'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

/** Password screen shown in place of Step 7 until the review password is entered. */
export function Step7Lock() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (busy || !password) return
    setBusy(true)
    setError(false)
    const res = await fetch('/api/step7/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) { router.refresh(); return }
    setError(true)
    setBusy(false)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-sm mx-auto px-4 py-16 text-center" dir="rtl">
        <div className="text-6xl mb-3">🔒🗣️</div>
        <h1 className="font-display font-bold text-3xl text-sky-700 mb-1">Step 7</h1>
        <p className="font-bold text-gray-500 mb-6">השלב החדש עדיין בבנייה — הכניסה בסיסמה בלבד.</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="סיסמה"
            autoComplete="off"
            className="w-full rounded-2xl border-4 border-sky-200 px-4 py-3 text-lg font-bold text-center focus:border-sky-400 outline-none"
            dir="ltr"
          />
          {error && <p className="font-bold text-red-500 text-sm">הסיסמה לא נכונה, נסו שוב</p>}
          <button type="submit" disabled={busy || !password} className="btn-kid bg-sky-500 w-full disabled:opacity-50">
            {busy ? 'רגע…' : '🔓 כניסה'}
          </button>
        </form>
      </div>
    </div>
  )
}
