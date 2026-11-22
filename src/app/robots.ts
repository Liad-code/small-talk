import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/** Everyone may crawl the public site — including AI search crawlers (GPTBot, ClaudeBot, PerplexityBot,
 *  Google-Extended…), so the site can be cited in AI answers. Private areas are excluded. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/account', '/teacher', '/landing-preview', '/profiles'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
