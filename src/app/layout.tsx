import type { Metadata } from 'next'
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
  title: 'Small Talk – Learn English!',
  description: 'Fun English learning for kids',
}

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
