import { getAccess } from '@/lib/access'
import { AppHome } from '@/components/home/AppHome'
import { LandingPage } from '@/components/landing/LandingPage'

export const dynamic = 'force-dynamic'

/** "/" — the app home for anyone who may use the app (admins, subscribers, or everyone while the
 *  lock is off); the landing page for everyone else. */
export default async function Home() {
  const access = await getAccess()
  return access.app ? <AppHome /> : <LandingPage />
}
