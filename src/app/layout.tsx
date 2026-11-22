import type { Metadata, Viewport } from 'next'
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, OG_IMAGE } from '@/lib/seo'
import { Nunito, Baloo_2 } from 'next/font/google'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ProfileProvider } from '@/components/providers/ProfileProvider'
import { AccessibilityMenu } from '@/components/a11y/AccessibilityMenu'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito',
})

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'he_IL',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Small Talk — אנגלית לילדים' }],
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE] },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/apple-touch-icon.png' },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false },
  // Search Console ownership (set GOOGLE_SITE_VERIFICATION in Vercel when you add the property).
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
}

export const viewport: Viewport = { themeColor: '#6C63FF' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" className={`${nunito.variable} ${baloo.variable}`}>
      <body className="font-kid antialiased">
        <a href="#content" className="skip-link">דילוג לתוכן</a>
        <AuthProvider>
          <ProfileProvider>
            <div id="content">{children}</div>
          </ProfileProvider>
        </AuthProvider>
        <AccessibilityMenu />
      </body>
    </html>
  )
}
