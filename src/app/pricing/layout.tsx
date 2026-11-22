import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מחירים — מנוי משפחתי לאנגלית לילדים',
  description: 'מחיר אחד לכל המשפחה: ₪39 לילד אחד, ₪49 עד 3 ילדים, ₪69 ללא הגבלה. שלב 1 בטעימה חינמית, ביטול בכל עת, בלי פרסומות.',
  alternates: { canonical: '/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
