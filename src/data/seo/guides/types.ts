export interface GuideSection {
  h2: string
  paragraphs: string[]
  bullets?: string[]
  tip?: string
}

export interface Guide {
  slug: string // English, lowercase-hyphen, used in /guides/<slug>
  title: string // H1 (Hebrew)
  metaTitle: string // ≤ 60 chars, keyword first
  description: string // ≤ 155 chars
  keyword: string // the main Hebrew search query targeted
  updated: string // 'YYYY-MM-DD'
  readingMinutes: number
  intro: string // 2–3 sentences, answer-first
  sections: GuideSection[] // 5–8 sections, each starting with the direct answer
  faq: { q: string; a: string }[] // 4–5 follow-up questions
  related: string[] // slugs of 2–3 other guides
}
