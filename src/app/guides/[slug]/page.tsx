import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PublicPage, Faq } from '@/components/seo/PublicPage'
import { TasteCta } from '@/components/seo/PublicBits'
import { JsonLd } from '@/components/seo/JsonLd'
import { GUIDES } from '@/data/seo/guides'
import { articleLd, breadcrumbLd, faqLd, abs } from '@/lib/seo'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = GUIDES.find(x => x.slug === params.slug)
  if (!g) return {}
  return {
    title: { absolute: `${g.metaTitle} | Small Talk` },
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: 'article', title: g.metaTitle, description: g.description, url: abs(`/guides/${g.slug}`), modifiedTime: g.updated },
  }
}

const formatDate = (iso: string) => iso.split('-').reverse().join('.')

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = GUIDES.find(x => x.slug === params.slug)
  if (!g) notFound()
  const path = `/guides/${g.slug}`
  const crumbs = [{ name: 'דף הבית', path: '/' }, { name: 'מדריכים להורים', path: '/guides' }, { name: g.title, path }]
  const related = g.related.map(s => GUIDES.find(x => x.slug === s)).filter(Boolean)
  const ctaAfter = Math.min(2, g.sections.length - 1)

  return (
    <PublicPage crumbs={crumbs}>
      <JsonLd data={[breadcrumbLd(crumbs), articleLd({ title: g.title, description: g.description, path, updated: g.updated }), faqLd(g.faq)]} />
      <article>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">{g.title}</h1>
        <p className="mt-2 text-sm font-bold text-gray-400">
          עודכן: <time dateTime={g.updated}>{formatDate(g.updated)}</time> · {g.readingMinutes} דקות קריאה
        </p>
        <p className="mt-4 text-lg font-semibold text-gray-700 leading-relaxed">{g.intro}</p>

        {g.sections.length > 3 && (
          <nav aria-label="תוכן העניינים" className="mt-6 rounded-2xl bg-white border-2 border-purple-100 p-4">
            <p className="font-bold text-gray-800 mb-2">בכתבה:</p>
            <ol className="list-decimal pr-5 flex flex-col gap-1 text-sm font-bold">
              {g.sections.map((s, i) => <li key={s.h2}><a href={`#s${i + 1}`} className="text-primary no-underline hover:underline">{s.h2}</a></li>)}
            </ol>
          </nav>
        )}

        {g.sections.map((s, i) => (
          <section key={s.h2} id={`s${i + 1}`} className="scroll-mt-20">
            <h2 className="font-display font-bold text-2xl text-gray-900 mt-10 mb-3">{s.h2}</h2>
            {s.paragraphs.map(p => <p key={p.slice(0, 40)} className="text-gray-700 font-medium leading-loose mb-3">{p}</p>)}
            {s.bullets && (
              <ul className="list-disc pr-6 flex flex-col gap-1.5 text-gray-700 font-medium leading-relaxed mb-3">
                {s.bullets.map(b => <li key={b.slice(0, 40)}>{b}</li>)}
              </ul>
            )}
            {s.tip && (
              <p className="rounded-2xl bg-amber-50 border-2 border-amber-100 p-4 font-semibold text-amber-900 leading-relaxed">💡 {s.tip}</p>
            )}
            {i === ctaAfter && <TasteCta />}
          </section>
        ))}

        <h2 className="font-display font-bold text-2xl text-gray-900 mt-10 mb-3">שאלות נפוצות</h2>
        <Faq items={g.faq} />
      </article>

      {related.length > 0 && (
        <>
          <h2 className="font-display font-bold text-xl text-gray-800 mt-10 mb-3">עוד מדריכים</h2>
          <ul className="flex flex-col gap-2">
            {related.map(r => (
              <li key={r!.slug}><Link href={`/guides/${r!.slug}`} className="font-bold text-primary no-underline hover:underline">{r!.title} ←</Link></li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-8 font-semibold text-gray-600">
        עוד בנושא: <Link href="/english-words" className="text-primary font-bold">מילים באנגלית לפי נושאים</Link> ·{' '}
        <Link href="/english-letters" className="text-primary font-bold">האותיות באנגלית</Link>
      </p>
    </PublicPage>
  )
}
