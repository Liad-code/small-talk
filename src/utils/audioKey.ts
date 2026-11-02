/**
 * Maps a spoken string to its audio filename — the ONE function that the
 * build-time generator and the browser both call.
 *
 * Because both sides import this exact code, they cannot disagree about a
 * filename. That matters: playback has no runtime fallback, so a mismatch
 * would mean a silent word rather than a wrong-sounding one.
 *
 * The key is derived from the REQUEST text (what a component asks to speak),
 * not from the text we send ElevenLabs. So improving a pronunciation spelling
 * in spokenText.ts never renames a file.
 */

/**
 * Collapses the incidental differences that should NOT produce separate files.
 *
 * Case is folded because the app asks for the same sound in several cases —
 * `getLetterTts` yields "A" while other paths yield "a", and vocabulary data
 * mixes "Run" with "run". Folding case here is what stops us paying for, and
 * storing, two identical recordings.
 */
export function normalizeSpoken(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}

/** FNV-1a (32-bit). Small, dependency-free, and identical in Node and the browser. */
function fnv1a(input: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

/** Readable filename stem. Truncated so long sentences stay sane on disk. */
function slug(text: string): string {
  const s = text
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '')
  return s || 'audio'
}

/**
 * Audio filename stem for a request, e.g. `cat-3d8f2a1b`.
 *
 * The hash disambiguates strings that slugify identically ("I'm" vs "im") and
 * is computed over the normalized text plus the variant, so it is stable
 * across platforms and across runs.
 *
 * @param variant distinguishes different recordings of the same request —
 *   Track B's letter-plus-phoneme file uses `'sound'` so it never collides
 *   with the plain letter-name file.
 */
export function audioKey(text: string, variant?: string): string {
  const normalized = normalizeSpoken(text)
  const seed = variant ? `${variant}:${normalized}` : normalized
  const stem = variant ? `${variant}-${slug(normalized)}` : slug(normalized)
  return `${stem}-${fnv1a(seed)}`
}

/** Public URL for a request's audio. Files live in `public/audio/`. */
export function audioUrl(text: string, variant?: string): string {
  return `/audio/${audioKey(text, variant)}.mp3`
}
