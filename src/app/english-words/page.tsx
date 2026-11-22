import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicPage } from '@/components/seo/PublicPage'
import { TasteCta } from '@/components/seo/PublicBits'
import { JsonLd } from '@/components/seo/JsonLd'
import { TRACK_D_CATEGORIES } from '@/data/step1/trackDCategories'
import { CATEGORY_SEO } from '@/data/seo/categoryInfo'
import { breadcrumbLd } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'מילים באנגלית לילדים לפי נושאים — עם הגייה ותרגום',
  description: 'רשימות מילים באנגלית לילדים לפי נושאים: צבעים, מספרים, חיות, אוכל, בגדים, ימות השבוע ועוד — עם תרגום, הגייה בעברית, הקלטה ומשפט לדוגמה.',
  alternates: { canonical: '/english-words' },
}

const crumbs = [{ name: 'דף הבית', path: '/' }, { name: 'מילים באנגלית לפי נושאים', path: '/english-words' }]

export default function EnglishWordsHub() {
  return (
    <PublicPage crumbs={crumbs}>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">מילים באנגלית לילדים — לפי נושאים</h1>
      <p className="mt-3 text-lg font-semibold text-gray-600 leading-relaxed">
        {TRACK_D_CATEGORIES.length} נושאים של אוצר מילים ראשון באנגלית, בדיוק כמו שילדים לומדים אותו: כל מילה עם תרגום לעברית,
        הגייה כתובה באותיות עבריות, הקלטה של דוברת אנגלית ומשפט קצר לדוגמה. בחרו נושא:
      </p>
      <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORY_SEO.map(c => {
          const cat = TRACK_D_CATEGORIES.find(t => t.id === c.id)
          if (!cat) return null
          return (
            <li key={c.id}>
              <Link href={`/english-words/${c.slug}`} className="block h-full rounded-2xl bg-white border-2 border-purple-100 hover:border-primary p-4 no-underline transition-colors">
                <span className="text-3xl" aria-hidden="true">{cat.emoji}</span>
                <span className="block font-bold text-gray-800 mt-1">{cat.hebrewTitle} באנגלית</span>
                <span className="block text-xs font-bold text-gray-400" dir="ltr">{cat.title} · {cat.items.length}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <TasteCta />
    </PublicPage>
  )
}
