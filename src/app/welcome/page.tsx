import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing/LandingPage'

// Same content as "/" for visitors → canonical points there (no duplicate in search results).
export const metadata: Metadata = { alternates: { canonical: '/' } }

/** The landing page, always (also for admins and subscribers — e.g. to share or review it). */
export default function WelcomePage() {
  return <LandingPage />
}
