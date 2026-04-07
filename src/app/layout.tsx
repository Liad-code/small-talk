import type { Metadata } from 'next'
import { Nunito, Baloo_2 } from 'next/font/google'
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
    <html lang="en" className={`${nunito.variable} ${baloo.variable}`}>
      <body className="font-kid antialiased">
        {children}
      </body>
    </html>
  )
}
