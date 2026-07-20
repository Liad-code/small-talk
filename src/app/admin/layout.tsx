import { redirect } from 'next/navigation'
import { auth } from '@/auth'

/** Server-side gate: /admin is ADMIN-only; everyone else goes home. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')
  return <>{children}</>
}
