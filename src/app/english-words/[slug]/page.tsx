import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PublicPage, Faq } from '@/components/seo/PublicPage'
import { PlayWord, TasteCta } from '@/components/seo/PublicBits'
import { JsonLd } from '@/components/seo/JsonLd'
import { TRACK_D_CATEGORIES } from '@/data/step1/trackDCategories'
import { CATEGORY_SEO } from '@/data/seo/categoryInfo'
import { WORD_INFO } from '@/data/seo/wordInfo'
import { audioUrl } from '@/utils/audioKey'
import { publicFileExists } from '@/lib/publicFiles'
import { breadcrumbLd, faqLd, abs } from '@/lib/seo'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORY_SEO.map(c => ({ slug: c.slug }))
}

const find = (slug: string) => {
  const seo = CATEGORY_SEO.find(c => c.slug === slug)
  const cat = seo && TRACK_D_CATEGORIES.find(t => t.id === seo.id)
  return seo && cat ? { seo, cat } : null
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = find(params.slug)
  if (!f) return {}
  return {
    title: { absolute: `${f.seo.metaTitle} | Small Talk` },
    description: f.seo.description,
    alternates: { canonical: `/english-words/${f.seo.slug}` },
    openGraph: { title: f.seo.metaTitle, description: f.seo.description, url: abs(`/english-words/${f.seo.slug}`) },
  }
}

export default function WordCategoryPage({ params }: { params: { slug: string } }) {
  const f = find(params.slug)
  if (!f) notFound()
  const { seo, cat } = f
  const crumbs = [
    { name: 'דף הבית', path: '/' },
    { name: 'מילים באנגלית', path: '/english-words' },
    { name: seo.h1, path: `/english-words/${seo.slug}` },
  ]
  const related = seo.related.map(id => CATEGORY_SEO.find(c => c.id === id)).filter(Boolean)
    .map(c => ({ c: c!, cat: TRACK_D_CATEGORIES.find(t => t.id === c!.id)! })).filter(r => r.cat)
  const learning = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: seo.h1,
    description: seo.description,
    inLanguage: ['he-IL', 'en'],
    educationalLevel: 'Beginner',
    learningResourceType: 'Vocabulary list',
    teaches: cat.items.map(i => i.word).join(', '),
    url: abs(`/english-words/${seo.slug}`),
  }

  return (
    <PublicPage crumbs={crumbs}>
      <JsonLd data={[breadcrumbLd(crumbs), faqLd(seo.faq), learning]} />
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
        <span aria-hidden="true">{cat.emoji} </span>{seo.h1}
      </h1>
      <p className="mt-3 text-lg font-semibold text-gray-600 leading-relaxed">{seo.intro}</p>

      <h2 className="font-display font-bold text-2xl text-gray-800 mt-8 mb-3">{cat.hebrewTitle} באנגלית — הרשימה המלאה</h2>
      <div className="rounded-3xl bg-white border-2 border-purple-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-purple-50 text-xs font-black text-purple-700">
            <tr>
              <th scope="col" className="px-3 py-2">באנגלית</th>
              <th scope="col" className="px-3 py-2">בעברית</th>
              <th scope="col" className="px-3 py-2">איך אומרים</th>
              <th scope="col" className="px-3 py-2"><span className="sr-only">השמעה</span></th>
            </tr>
          </thead>
          <tbody>
            {cat.items.map(item => {
              const info = WORD_INFO[item.word]
              const src = audioUrl(item.ttsText ?? item.word)
              const hasAudio = publicFileExists(src)
              return (
                <tr key={item.word} className="border-t border-purple-50 align-top">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2" dir="ltr">
                      <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                      <span className="font-black text-lg text-gray-900">{item.word}</span>
                    </div>
                    {info?.example && <div className="text-xs font-semibold text-gray-400 mt-1" dir="ltr">{info.example}</div>}
                  </td>
                  <td className="px-3 py-3 font-bold text-gray-700">
                    {info?.he}
                    {info?.exampleHe && <div className="text-xs font-semibold text-gray-400 mt-1">{info.exampleHe}</div>}
                  </td>
                  <td className="px-3 py-3 font-bold text-primary">{info?.say}</td>
                  <td className="px-2 py-3">{hasAudio && <PlayWord src={src} label={item.word} />}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h2 className="font-display font-bold text-2xl text-gray-800 mt-10 mb-3">איך מתרגלים {cat.hebrewTitle} באנגלית בבית</h2>
      <ul className="flex flex-col gap-2">
        {seo.tips.map(t => (
          <li key={t} className="flex gap-3 rounded-2xl bg-white border-2 border-amber-100 p-4 font-semibold text-gray-700 leading-relaxed">
            <span aria-hidden="true">💡</span><span>{t}</span>
          </li>
        ))}
      </ul>

      <TasteCta />

      <h2 className="font-display font-bold text-2xl text-gray-800 mb-3">שאלות נפוצות</h2>
      <Faq items={seo.faq} />

      {related.length > 0 && (
        <>
          <h2 className="font-display font-bold text-xl text-gray-800 mt-10 mb-3">נושאים נוספים</h2>
          <ul className="grid grid-cols-3 gap-3">
            {related.map(({ c, cat: rc }) => (
              <li key={c.id}>
                <Link href={`/english-words/${c.slug}`} className="block rounded-2xl bg-white border-2 border-purple-100 hover:border-primary p-3 text-center no-underline">
                  <span className="text-2xl" aria-hidden="true">{rc.emoji}</span>
                  <span className="block font-bold text-gray-700 text-sm mt-1">{rc.hebrewTitle} באנגלית</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </PublicPage>
  )
}
