import type { Metadata } from 'next'
import { getAccess } from '@/lib/access'
import { AppHome } from '@/components/home/AppHome'
import { LandingPage } from '@/components/landing/LandingPage'
import { JsonLd } from '@/components/seo/JsonLd'
import { LANDING_FAQ } from '@/components/landing/content'
import { faqLd, organizationLd, productLd, websiteLd } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'אנגלית לילדים — מהאות הראשונה ועד שיחה | Small Talk' },
  alternates: { canonical: '/' },
}

/** "/" — the app home for anyone who may use the app (admins, subscribers, or everyone while the
 *  lock is off); the landing page for everyone else (and for search engines). */
export default async function Home() {
  const access = await getAccess()
  if (access.app) return <AppHome />
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), productLd(), faqLd(LANDING_FAQ)]} />
      <LandingPage />
    </>
  )
}
