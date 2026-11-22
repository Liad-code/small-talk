import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { CATEGORY_SEO } from '@/data/seo/categoryInfo'
import { GUIDES } from '@/data/seo/guides'

/** Public, indexable pages only (the app itself is behind the lock). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly', lastModified: Date = now) =>
    ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority })
  return [
    page('/', 1, 'weekly'),
    page('/pricing', 0.8),
    page('/english-words', 0.8, 'weekly'),
    ...CATEGORY_SEO.map(c => page(`/english-words/${c.slug}`, 0.7)),
    page('/english-letters', 0.8),
    page('/guides', 0.8, 'weekly'),
    ...GUIDES.map(g => page(`/guides/${g.slug}`, 0.7, 'monthly', new Date(g.updated))),
    page('/legal/terms', 0.2, 'yearly'),
    page('/legal/privacy', 0.2, 'yearly'),
    page('/legal/refunds', 0.2, 'yearly'),
    page('/legal/accessibility', 0.3, 'yearly'),
  ]
}
