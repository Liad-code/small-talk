# SEO — what's in place and what's left (2026-11-22)

## In place (code)
- **Metadata:** Hebrew title template + description, Open Graph / Twitter card with `public/og.png` (1200×630),
  canonicals, `lang="he"`, theme color, manifest, icons (`public/icon.svg`, `icon-192/512.png`, `apple-touch-icon.png`, `favicon.ico`).
- **robots.txt** (`src/app/robots.ts`): everyone may crawl the public site, including AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended). `/api`, `/admin`, `/account`, `/teacher`, `/profiles` are excluded; private layouts also send `noindex`.
- **sitemap.xml** (`src/app/sitemap.ts`), built from the same data as the pages.
- **llms.txt** (`src/app/llms.txt/route.ts`): plain-text summary for AI assistants, generated from the data.
- **Structured data (JSON-LD):** Organization, WebSite, Product with one Offer per tier, FAQPage (home);
  BreadcrumbList + FAQPage + LearningResource (word pages); Article + FAQPage (guides).
- **Public content** (open through the lock, statically generated):
  - `/english-words` + 23 topic pages ("צבעים באנגלית לילדים"…): translation, Hebrew-letter pronunciation, audio, example, tips, FAQ.
  - `/english-letters`: the 26 letters with name, sound, example word, audio.
  - `/guides` + 7 parent guides (pillar: לימוד אנגלית לילדים בבית).
  - Every content page ends in a "free Step 1" call to action and links to related pages.
- **Accessibility** (also a ranking/UX signal): ♿ menu, `/legal/accessibility`, skip link, focus outlines.

## Owner to-do (needs your accounts)
1. **Google Search Console** → add property `small-talk.online` (Domain property via DNS is best; or "URL prefix" with the
   HTML-tag method: copy the `content="…"` value into Vercel env `GOOGLE_SITE_VERIFICATION` and redeploy).
   Then **Sitemaps → submit `https://small-talk.online/sitemap.xml`**, and use URL Inspection → "Request indexing" for `/`,
   `/english-words`, `/guides`.
2. **Bing Webmaster Tools** → "Import from Google Search Console" (Bing also feeds ChatGPT search and Copilot).
3. **Google Business Profile** (optional, if you want a brand panel): online business, category "Educational website".
4. **Backlinks / mentions** (the biggest remaining lever):
   - Hebrew parenting groups and forums (Facebook groups, parents' WhatsApp communities), sharing the free word lists, not ads.
   - Teachers and kindergartens: the word lists and letters page are useful printouts/links.
   - Directories: Israeli education/parenting directories, Product Hunt-style listings.
5. **Accessibility statement:** add the accessibility coordinator's **name and phone** (`src/app/legal/accessibility/page.tsx`).
6. **Founder section** on the landing page (E-E-A-T: who is behind the content), when you're ready.

## Ideas for later
- More guides (one per month keeps the site fresh): "שירים באנגלית לילדים", "ימות השבוע באנגלית — שיר ומשחק", "אנגלית לכיתה א'".
- Printable worksheets (PDF) per word topic — strong for teachers and backlinks.
- A short demo video on YouTube (video results + a second search surface).
