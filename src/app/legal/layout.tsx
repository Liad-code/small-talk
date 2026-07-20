import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-10" dir="rtl">
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 legal-doc">
          {children}
        </div>
        <div className="flex gap-4 justify-center mt-6 text-sm font-bold">
          <Link href="/legal/terms" className="text-gray-400 hover:text-primary no-underline">תנאי שימוש</Link>
          <Link href="/legal/privacy" className="text-gray-400 hover:text-primary no-underline">מדיניות פרטיות</Link>
          <Link href="/legal/refunds" className="text-gray-400 hover:text-primary no-underline">ביטולים והחזרים</Link>
        </div>
      </div>
    </div>
  )
}
