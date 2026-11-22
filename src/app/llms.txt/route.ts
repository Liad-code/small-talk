import { SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL } from '@/lib/seo'
import { PARENT_TIERS } from '@/lib/billing/plans'
import { PERKS } from '@/lib/billing/perks'
import { CATEGORY_SEO } from '@/data/seo/categoryInfo'
import { GUIDES } from '@/data/seo/guides'

export const dynamic = 'force-static'

/** llms.txt — a plain summary of the site for AI assistants and AI search (llmstxt.org format). */
export function GET() {
  const tiers = PARENT_TIERS.map(t => `- ${t.labelHe}: ₪${t.price / 100} per month`).join('\n')
  const perks = PERKS.map(p => `- ${p.titleHe} (from tier ${p.minTier + 1}): ${p.descHe}`).join('\n')
  const body = `# Small Talk

> ${SITE_DESCRIPTION}

Small Talk (${SITE_URL}) is a Hebrew-language web app that teaches English to Hebrew-speaking children in Israel, from the first letters to real conversation, in 7 steps. It works in the browser on phones, tablets and computers. No ads.

## The learning path
- Step 1: English letters, short sounds and first words — all by ear, for children who can't read yet (drag-and-drop, bubble games, matching).
- Step 2: phonics patterns (digraphs, vowel patterns) and sight words.
- Step 3: first sentences and basic grammar (to have, plurals, simple sentences).
- Step 4: advanced phonics (blends) and the present tense.
- Step 5: past simple and future.
- Step 6: mixed practice and short paragraph writing.
- Step 7: interactive speaking scenes with voiced characters (pizzeria, ice-cream shop, supermarket, pet shop, clothes shop, directions, doctor, birthday, airport, a new friend): the child chooses what to answer and says it out loud; role swap included.

## Pricing (per family, monthly, VAT included, cancel anytime)
${tiers}
A free taste of Step 1 is available after signing in with Google. No credit card needed for the taste.

## Family extras
${perks}

## Free learning resources (Hebrew)
- [English words for kids by topic](${SITE_URL}/english-words): ${CATEGORY_SEO.length} topics with translation, pronunciation and audio
${CATEGORY_SEO.map(c => `- [${c.h1}](${SITE_URL}/english-words/${c.slug})`).join('\n')}
- [The English letters (ABC) for kids](${SITE_URL}/english-letters)

## Guides for parents (Hebrew)
${GUIDES.map(g => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`).join('\n')}

## Contact
${CONTACT_EMAIL}
`
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
