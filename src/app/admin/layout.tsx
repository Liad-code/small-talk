import { auth } from '@/auth'
import { Header } from '@/components/layout/Header'

/** Server-side gate: /admin is ADMIN-only. Non-admins get an explicit screen. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user?.role === 'ADMIN') return <>{children}</>

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-md mx-auto px-4 py-20 text-center" dir="rtl">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="font-display text-2xl font-bold text-gray-800 mb-2">אזור מנהלים בלבד</h1>
        {session?.user?.email ? (
          <p className="font-bold text-gray-500 text-sm">
            מחוברים כרגע בתור <span className="text-gray-700">{session.user.email}</span> — לחשבון זה אין הרשאת ניהול.
            <br />
            יש להתנתק ולהתחבר עם חשבון המנהל.
          </p>
        ) : (
          <p className="font-bold text-gray-500 text-sm">יש להתחבר עם חשבון המנהל כדי לגשת לעמוד זה.</p>
        )}
      </div>
    </div>
  )
}
