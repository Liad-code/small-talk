/** Site-wide SEO constants and JSON-LD builders (schema.org). One source for metadata, sitemap and llms.txt. */
import { PARENT_TIERS } from '@/lib/billing/plans'

export const SITE_URL = 'https://small-talk.online'
export const SITE_NAME = 'Small Talk'
export const SITE_TITLE = 'Small Talk — אנגלית לילדים: מהאות הראשונה ועד שיחה'
export const SITE_DESCRIPTION =
  'תוכנית אנגלית לילדים דוברי עברית: 7 שלבים מהאותיות והצלילים ועד שיחה אמיתית עם דמויות מדברות. מתאים גם לילדים שעוד לא קוראים. שלב 1 בטעימה חינמית, ₪49 לחודש לכל המשפחה.'
export const CONTACT_EMAIL = 'smalltalk.english1@gmail.com'
export const OG_IMAGE = '/og.png'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs('/icon-512.png'),
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  areaServed: 'IL',
  knowsLanguage: ['he', 'en'],
})

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'he-IL',
  publisher: { '@id': `${SITE_URL}/#organization` },
})

/** The family subscription as a Product with one Offer per tier (prices from plans.ts). */
export const productLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Small Talk — מנוי אנגלית לילדים',
  description: SITE_DESCRIPTION,
  image: abs(OG_IMAGE),
  brand: { '@type': 'Brand', name: SITE_NAME },
  category: 'Educational software',
  offers: PARENT_TIERS.map(t => ({
    '@type': 'Offer',
    name: `מנוי חודשי — ${t.labelHe}`,
    price: (t.price / 100).toFixed(2),
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
    url: abs('/pricing'),
    priceSpecification: { '@type': 'UnitPriceSpecification', price: (t.price / 100).toFixed(2), priceCurrency: 'ILS', unitCode: 'MON' },
  })),
})

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a.replace(/`/g, '') } })),
})

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

export const articleLd = (a: { title: string; description: string; path: string; updated: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.description,
  inLanguage: 'he-IL',
  mainEntityOfPage: abs(a.path),
  datePublished: a.updated,
  dateModified: a.updated,
  image: abs(OG_IMAGE),
  author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  publisher: { '@id': `${SITE_URL}/#organization` },
})
