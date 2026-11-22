import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicPage, Faq } from '@/components/seo/PublicPage'
import { PlayWord, TasteCta } from '@/components/seo/PublicBits'
import { JsonLd } from '@/components/seo/JsonLd'
import { LETTER_INFO, LETTERS_SEO } from '@/data/seo/letterInfo'
import { audioUrl } from '@/utils/audioKey'
import { publicFileExists } from '@/lib/publicFiles'
import { breadcrumbLd, faqLd, abs } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: { absolute: `${LETTERS_SEO.metaTitle} | Small Talk` },
  description: LETTERS_SEO.description,
  alternates: { canonical: '/english-letters' },
  openGraph: { title: LETTERS_SEO.metaTitle, description: LETTERS_SEO.description, url: abs('/english-letters') },
}

const crumbs = [{ name: 'דף הבית', path: '/' }, { name: 'האותיות באנגלית', path: '/english-letters' }]

export default function EnglishLettersPage() {
  return (
    <PublicPage crumbs={crumbs}>
      <JsonLd data={[breadcrumbLd(crumbs), faqLd(LETTERS_SEO.faq)]} />
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">{LETTERS_SEO.h1}</h1>
      <p className="mt-3 text-lg font-semibold text-gray-600 leading-relaxed">{LETTERS_SEO.intro}</p>

      <h2 className="font-display font-bold text-2xl text-gray-800 mt-8 mb-3">26 האותיות — שם, צליל ומילה לדוגמה</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LETTER_INFO.map(l => {
          const src = audioUrl(l.upper)
          const hasAudio = publicFileExists(src)
          return (
            <li key={l.upper} className="rounded-2xl bg-white border-2 border-purple-100 p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="font-display font-black text-4xl text-primary leading-none" dir="ltr">{l.upper}{l.lower}</span>
                {hasAudio && <PlayWord src={src} label={`האות ${l.upper}`} />}
              </div>
              <dl className="mt-2 text-sm font-bold text-gray-600 space-y-0.5">
                <div><dt className="inline text-gray-400">שם האות: </dt><dd className="inline text-gray-800">{l.nameSay}</dd></div>
                <div><dt className="inline text-gray-400">הצליל: </dt><dd className="inline text-gray-800">{l.sound}</dd></div>
                <div><dt className="inline text-gray-400">מילה: </dt><dd className="inline"><span dir="ltr" className="text-gray-800">{l.emoji} {l.word}</span> — {l.wordHe}</dd></div>
              </dl>
            </li>
          )
        })}
      </ul>

      <h2 className="font-display font-bold text-2xl text-gray-800 mt-10 mb-3">איך מלמדים את האותיות בבית</h2>
      <ul className="flex flex-col gap-2">
        {LETTERS_SEO.tips.map(t => (
          <li key={t} className="flex gap-3 rounded-2xl bg-white border-2 border-amber-100 p-4 font-semibold text-gray-700 leading-relaxed">
            <span aria-hidden="true">💡</span><span>{t}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold text-gray-600">
        מדריך מפורט: <Link href="/guides/teaching-english-letters" className="text-primary font-bold">איך ללמד ילד את האותיות באנגלית ←</Link>
      </p>

      <TasteCta />

      <h2 className="font-display font-bold text-2xl text-gray-800 mb-3">שאלות נפוצות</h2>
      <Faq items={LETTERS_SEO.faq} />
    </PublicPage>
  )
}
