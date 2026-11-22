import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicPage } from '@/components/seo/PublicPage'
import { TasteCta } from '@/components/seo/PublicBits'
import { JsonLd } from '@/components/seo/JsonLd'
import { GUIDES } from '@/data/seo/guides'
import { breadcrumbLd } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'מדריכים להורים — איך ללמד ילדים אנגלית',
  description: 'מדריכים מעשיים להורים: לימוד אנגלית לילדים בבית, אותיות, פוניקס, sight words, עידוד דיבור, מאיזה גיל להתחיל, ומורה פרטי או אפליקציה.',
  alternates: { canonical: '/guides' },
}

const crumbs = [{ name: 'דף הבית', path: '/' }, { name: 'מדריכים להורים', path: '/guides' }]

export default function GuidesHub() {
  return (
    <PublicPage crumbs={crumbs}>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">מדריכים להורים: איך ללמד ילדים אנגלית</h1>
      <p className="mt-3 text-lg font-semibold text-gray-600 leading-relaxed">
        עצות מעשיות, שלב אחר שלב — מהאותיות הראשונות ועד שהילד מדבר. כל מדריך כתוב כך שתוכלו להתחיל ליישם עוד היום, גם אם אתם לא מדברים אנגלית בעצמכם.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {GUIDES.map(g => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="block rounded-3xl bg-white border-2 border-purple-100 hover:border-primary p-5 no-underline transition-colors">
              <span className="block font-display font-bold text-xl text-gray-900">{g.title}</span>
              <span className="block mt-1 font-semibold text-gray-500 leading-relaxed">{g.description}</span>
              <span className="block mt-2 text-xs font-bold text-primary">{g.readingMinutes} דקות קריאה ←</span>
            </Link>
          </li>
        ))}
      </ul>
      <TasteCta />
    </PublicPage>
  )
}
