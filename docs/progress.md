# Small Talk — Progress Log

## Session O — What's My Sound? Game (2026-03-28) ✅

### Changes

| # | Task | File(s) | Detail |
|---|---|---|---|
| 1 | Built "What's My Sound?" game from scratch | `public/games/whats-my-sound/index.html` | Self-contained HTML/JS/CSS game. 24-word bank (A–Z, one word per letter with emoji). Each round: 10 randomly shuffled questions. Shows big emoji + 🔊 TTS button (auto-plays on load). 4 letter choices (correct + 3 random distractors). Correct/wrong feedback with colour flash + spoken word confirmation. Results screen shows trophy, stars (⭐/⭐⭐/⭐⭐⭐), correct count. Confetti on 60%+. postMessage fires on results: `{ type: 'GAME_COMPLETE', score: Math.round((correct/total)*100) }`. |
| 2 | Registered in game selector | `src/app/games/[gameId]/page.tsx` | Added `whats-my-sound` to `GAME_INFO` (title "What's My Sound?", emoji 🔉) and `IFRAME_GAMES`. Phonics subject `availableGameIds` now: `[word-match, bubble-pop, phonics-fun, whats-my-sound]`. Not available for any other subject. |

> **Note:** The file was not found in `OneDrive/Desktop/mom` — the game was built fresh to spec.

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
ƒ /games/[gameId]                 3.18 kB  137 kB
Shared JS: 87.3 kB — zero errors
```

---

## Session N — Phonics Subject + Game Integration (2026-03-28) ✅

### Changes

| # | Task | File(s) | Detail |
|---|---|---|---|
| 1 | New Phonics content (3 levels) | `src/data/content/phonics.ts` | Level 1: Short Vowels (cat/bed/pig/dog/cup/hat) with 5 MC quiz questions identifying short a/e/i/o/u sounds. Level 2: Long Vowels (cake/tree/bike/bone/cute/rain) with 5 MC questions. Level 3: Consonant Blends (blue/green/stop/flag/drum/swim) with 5 MC questions identifying bl/gr/st/fl/dr/sw blends. All multiple-choice only — no typing. |
| 2 | Phonics registered as Beginner subject | `src/data/subjects.ts` | Added id `phonics`, emoji 🔊, title "Phonics", hebrewTitle "פונטיקה", teal color scheme, `category: 'beginner'`. Inserted at end of Beginner section before Intermediate. |
| 3 | Phonics Fun game integrated | `public/games/phonics-fun/index.html` | Copied from `OneDrive/Desktop/mom/phonics-game/index.html`. Added postMessage score bridge in `showCelebration()`: normalizes raw score (max 90) to 0–100 and fires `{ type: 'GAME_COMPLETE', score }` to parent. |
| 4 | Phonics Fun wired into game selector | `src/app/games/[gameId]/page.tsx` | Added `phonics-fun` to `GAME_INFO` and `IFRAME_GAMES`. `availableGameIds` now: phonics subject → `[word-match, bubble-pop, phonics-fun]`; all other subjects use existing rules. Renamed `game1` placeholder title to "Game 1". |

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
ƒ /games/[gameId]                 3.13 kB  137 kB
ƒ /lesson/[subjectId]/[level]     1.99 kB  136 kB
Shared JS: 87.3 kB — zero errors
```

---

## Session M — UX Polish (2026-03-28) ✅

### Changes

| # | Fix | File(s) | Detail |
|---|---|---|---|
| 1 | Letters quiz uses emoji-only questions | `src/data/content/letters.ts` | All 15 quiz questions (3 levels × 5) rewritten as "Which letter does this start with? [emoji]" — answer is the letter itself, options are letters from that level's range (A–F, G–M, N–Z). No English words appear in any question. |
| 2 | BubblePop collision avoidance + varied animations | `src/components/games/BubblePop.tsx` | Added `findSpot()` using a virtual 420×300 px arena: 40-attempt placement loop checks Euclidean distance between bubble centres with 1.25× safety margin. `y` stored as px (fixed arena height). Added `delay: number` field to `Bubble`; each bubble gets a random 0–2.5 s `animation-delay`. 6 keyframe variants with both x+y movement (`bubble-float-0` through `bubble-float-5`), varying durations (4–11.5 s). |
| 3 | Phonics Fun removed from all game selectors | `src/app/games/[gameId]/page.tsx` | Removed the `subjectId === 'letters'` special case. `availableGameIds` is now simply: grammar → `[word-match, bubble-pop]`; all other vocab (including letters) → `[word-match, spelling-bee, bubble-pop]`. |

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
ƒ /games/[gameId]                 3.08 kB  134 kB
ƒ /lesson/[subjectId]/[level]     2 kB     133 kB
Shared JS: 87.1 kB — zero errors
```

---

## Session L — UX Fixes (2026-03-28) ✅

### Changes

| # | Fix | File(s) | Detail |
|---|---|---|---|
| 1 | Flashcard Hebrew removed for visual subjects | `src/app/lesson/[subjectId]/[level]/page.tsx` | Grammar subjects (category contains `'grammar'`): card flips to show Hebrew as before. Vocabulary subjects: card front shows emoji + English word; back shows example sentence only — no Hebrew, no "Tap for Hebrew" prompt. Tip text updated accordingly. |
| 2 | Phonics Fun only shown for Letters subject | `src/app/games/[gameId]/page.tsx` | Computed `availableGameIds` per subject: `letters` → Word Match + Bubble Pop + Phonics Fun; grammar → Word Match + Bubble Pop; other vocab → Word Match + Spelling Bee + Bubble Pop. Selector pills filtered to available games only. |
| 3 | Bubble Pop bubbles show emoji/Hebrew, not words | `src/components/games/BubblePop.tsx` | Bubble content: `emoji` if present (vocab subjects), else `hebrew` (grammar subjects). Emoji font size scales to ~42% of bubble diameter; text uses smaller size. HUD label changed from "Pop the word" to "Find & pop" showing only the English target word. |

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
ƒ /games/[gameId]                 3.09 kB  134 kB
ƒ /lesson/[subjectId]/[level]     2 kB     133 kB
Shared JS: 87.1 kB — zero errors
```

---

## Session K — Critical Bug Fixes (2026-03-28) ✅

### Bugs Fixed

| # | Bug | File(s) | Fix |
|---|---|---|---|
| 1 | Quiz answer leaking to next question — `selected`/`value`/`submitted` state persisted across question changes | `src/app/quiz/[subjectId]/[level]/page.tsx` | Added `key={q.id}` to `MultipleChoiceQ` and `FillBlankQ` to force React remount on every question change |
| 2+3 | Hebrew prefix in WordMatch / SpellingBee — verified code already used `w.hebrew` field directly | `src/components/games/WordMatch.tsx`, `SpellingBee.tsx` | No code change needed — data-driven correctly |
| 4 | Bubble Pop UX unclear and had stale closure bug with `nextId` | `src/components/games/BubblePop.tsx` | Full rewrite: `nextId` as `useRef`, clearer target display (English + Hebrew), hearts for lives, round counter, correct/wrong flash animations |
| 5 | Beginner levels had fill-in-blank questions — children aged 7–8 cannot type yet | All 17 beginner/beginner-grammar content files | Converted every `fill-blank` question to `multiple-choice` with 4 options across: `letters`, `numbers`, `colors`, `animals`, `food`, `family`, `pronouns`, `to-be`, `articles`, `demonstratives`, `to-have`, `poss-adj`, `nouns-plural`, `prep-place`, `prep-time`, `there-is`, `imperative` |
| 6 | Hebrew text in Numbers and Colors vocabulary/quiz — these subjects teach English not Hebrew | `numbers.ts`, `colors.ts` | Set all `hebrew: ''` fields, removed all `questionHebrew` from quiz questions |
| 7 | `public/games/game1` was a placeholder | `public/games/game1/index.html`, `src/app/games/[gameId]/page.tsx` | Replaced placeholder with real Phonics Fun game (Short Vowel Words CVC spelling, TTS, Hebrew hints, confetti); added `sendScore()` postMessage bridge normalizing score to 0–100; updated `GAME_INFO` title/description |

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
○ /                               2.39 kB  134 kB
○ /profile                        2.48 kB  134 kB
ƒ /games/[gameId]                 3 kB     134 kB
ƒ /lesson/[subjectId]/[level]     1.92 kB  133 kB
ƒ /quiz/[subjectId]/[level]       3.21 kB  135 kB
ƒ /subject/[subjectId]            1.77 kB  133 kB
Shared JS: 87.1 kB — zero errors
```

---

## Session J — Full QA Audit (2026-03-28) ✅

### Completed
- [x] Wrote `scripts/validate-content.ts` — validates every quiz/vocabulary across all 30 subjects
- [x] Added `"scripts"` to `tsconfig.json` exclude list so script files don't interfere with Next.js build
- [x] Ran validation: **0 content bugs found** across 30 subjects × 3 levels = 90 levels, 450 quiz questions
- [x] Reviewed game components `WordMatch`, `SpellingBee`, `BubblePop` for edge cases
- [x] Wrote `scripts/test-routes.ts` — fetches all 212 routes and asserts HTTP 200
- [x] Ran route tests: **212 / 212 routes pass** (all subject/lesson/quiz pages, homepage, profile)
- [x] Clean production build: **zero TypeScript errors**
- [x] Build size unchanged from Session F baseline

### Bugs found and fixed

| # | File | Bug | Fix |
|---|---|---|---|
| 1 | `tsconfig.json` | `scripts/` directory included in Next.js TS compilation, causing Map iteration type error | Added `"scripts"` to `exclude` array |

### Validation results (scripts/validate-content.ts)
- Checked: 30 subjects, 90 levels, 450 quiz questions, 540 vocabulary items
- Multiple-choice answer-in-options: ✅ all pass
- Fill-blank answers non-empty: ✅ all pass
- Duplicate question IDs: ✅ none found
- Options count (≥2 per MC): ✅ all pass
- Empty question strings: ✅ none found
- Quiz count per level (exactly 5): ✅ all pass
- Vocabulary count per level (≥6): ✅ all pass

### Game component review
| Component | Edge case | Status |
|---|---|---|
| `WordMatch` | Empty words → `[].every()` fires immediately | Guarded by game page (`words.length === 0` check) ✅ |
| `SpellingBee` | Empty words → `current` is `undefined` | Returns `null` gracefully ✅ |
| `BubblePop` | Empty words → `words[0 % 0]` = undefined | Guarded by game page ✅ |
| All 3 | `onScore` callback | Fires with valid numeric score on completion ✅ |

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
○ /                               2.39 kB  135 kB
○ /profile                        2.48 kB  135 kB
ƒ /games/[gameId]                 2.96 kB  135 kB
ƒ /lesson/[subjectId]/[level]     1.92 kB  134 kB
ƒ /quiz/[subjectId]/[level]       3.21 kB  135 kB
ƒ /subject/[subjectId]            1.77 kB  134 kB
Shared JS: 87.1 kB — zero errors
```

---

## Session I — Grammar Curriculum Expansion (2026-03-28) ✅

### Completed
- [x] Generated **21 grammar content files** across 3 new homepage categories
- [x] Extended `Subject` type in `src/types/index.ts` — added `'beginner-grammar' | 'intermediate-grammar' | 'advanced-grammar'` to the `category` union
- [x] Added 3 new entries to `CATEGORIES` in `subjects.ts` with gradient colours and Hebrew titles
- [x] Registered all 21 new subjects in `src/data/subjects.ts` (imports + SUBJECTS array entries)
- [x] Deleted `.next` build cache

### New files created

| # | Subject | Category | File | Levels |
|---|---|---|---|---|
| 1 | Pronouns | Beginner Grammar | `src/data/content/pronouns.ts` | Subject / Object / Subject vs Object |
| 2 | To Be am/is/are | Beginner Grammar | `src/data/content/to-be.ts` | Positive / Negative / Questions |
| 3 | Articles a/an/the | Beginner Grammar | `src/data/content/articles.ts` | A vs An / The / Context |
| 4 | Demonstratives | Beginner Grammar | `src/data/content/demonstratives.ts` | This+These / That+Those / Choose all 4 |
| 5 | To Have | Beginner Grammar | `src/data/content/to-have.ts` | have/has / don't/doesn't / Possessive 's |
| 6 | Possessive Adjectives | Beginner Grammar | `src/data/content/poss-adj.ts` | my/your/his/her / its/our/their / All |
| 7 | Nouns Singular & Plural | Beginner Grammar | `src/data/content/nouns-plural.ts` | -s/-es / Irregular / Count vs Non-count |
| 8 | Prepositions of Place | Beginner Grammar | `src/data/content/prep-place.ts` | in/on/under / near/between/behind / Where is? |
| 9 | Prepositions of Time | Beginner Grammar | `src/data/content/prep-time.ts` | at / on / in |
| 10 | There is / There are | Beginner Grammar | `src/data/content/there-is.ts` | Positive / Negative / Questions |
| 11 | The Imperative | Beginner Grammar | `src/data/content/imperative.ts` | Positive / Don't / Polite |
| 12 | Can / Could | Intermediate Grammar | `src/data/content/can-could.ts` | Can positive / Can't+questions / Could |
| 13 | Present Simple | Intermediate Grammar | `src/data/content/present-simple.ts` | I/you/we/they / He/she/it -s / Neg+Freq |
| 14 | Present Progressive | Intermediate Grammar | `src/data/content/present-prog.ts` | am/is/are+-ing / Neg+Questions / -ing spelling |
| 15 | Simple vs Progressive | Intermediate Grammar | `src/data/content/simple-vs-prog.ts` | Spot habit / Spot moment / Choose tense |
| 16 | Adjectives & Adverbs | Intermediate Grammar | `src/data/content/adj-adverbs.ts` | Comparative / Superlative+as…as / Adverbs |
| 17 | To Be Past was/were | Advanced Grammar | `src/data/content/past-be.ts` | was/were / wasn't/weren't / Questions |
| 18 | Past Simple | Advanced Grammar | `src/data/content/past-simple.ts` | Regular -ed / Irregular / didn't+Did? |
| 19 | Future Will | Advanced Grammar | `src/data/content/future-will.ts` | will positive / won't / Questions |
| 20 | Future Be Going To | Advanced Grammar | `src/data/content/going-to.ts` | going to positive / Neg+Questions / Will vs going to |
| 21 | Review of Tenses | Advanced Grammar | `src/data/content/review-tenses.ts` | Present review / Past review / Future review |

### Content spec (per subject)
- 3 levels × 6 vocabulary/grammar items × 5 quiz questions = 18 items + 15 questions per subject
- Quiz mix: 3 multiple-choice + 2 fill-in-blank per level
- Fill-blank answers: always lowercase, base verb forms only
- Hebrew: nikud included where confident; plain text otherwise
- Target age: 7–11

### Next up
- Run `npm run build` and verify zero TypeScript errors
- QA pass: check Hebrew translations in grammar files (AI-generated — verify nikud accuracy)
- Consider adding grammar subjects to the games system if desired
- Profile page already shows all new subjects automatically (data-driven)

---

## Session H — Content Builder Skill (2026-03-27) ✅

### Completed
- [x] Built `small-talk-content-builder` skill at `.claude/skills/small-talk-content-builder/SKILL.md`
  - Trigger: "add subject: X, Category" / "create content for: X" / "fill in stub for X"
  - Generates 3 levels × 6 words × 5 quiz questions (3 MC + 2 fill-blank) per run
  - Built-in Hebrew vocabulary reference tables for: Family, Body Parts, Verbs, Weather, Clothes
  - Auto-registers in `subjects.ts` (import + SUBJECTS entry + Tailwind color deduplication)
  - Quality checklist: unique IDs, lowercase fill-blank answers, 6 words / 5 quiz count check
- [x] Generated **Family** (Beginner) as proof-of-concept subject
  - `src/data/content/family.ts` — 3 levels, 18 words, 15 quiz questions
  - Registered in `subjects.ts` with `bg-rose-100` color set
  - Build passes clean ✓
- [x] Discovered Session E already filled Body Parts, Action Verbs, Simple Sentences — all subjects now complete

### All subjects now complete
| Subject | Category | File |
|---|---|---|
| Letters, Numbers, Colors, Animals, Food | Beginner | ✅ Pre-existing |
| Family | Beginner | ✅ New — Session H |
| Body Parts, Action Verbs | Intermediate | ✅ Session E |
| Simple Sentences | Advanced | ✅ Session E |

### Using the skill in future sessions
```
add subject: Weather, Beginner
add subject: Clothes, Intermediate
create content for: Transport, Beginner
```

### Next up
- QA pass on new content: family.ts, body-parts.ts, action-verbs.ts, simple-sentences.ts
  - Verify Hebrew nikud accuracy (especially family.ts level 3 — Older/Younger phrases)
- Profile page link from homepage (currently nav only)
- Consider adding more Beginner subjects (Weather, School Supplies, Transport)

---

## Session G — Bug Fixes (2026-03-27) ✅

### Fixed
- [x] **Hydration mismatch on quiz page** — `shuffledQuestions` was initialized via `useState(() => shuffle(...))`, running on both server and client and producing different HTML. Fixed by initializing as `[]` with a separate `questionsLoaded: false` flag, then shuffling inside `useEffect` (client-only). A loading spinner is shown until `questionsLoaded` is true. Zero hydration errors after reload.
- [x] **Hebrew hint text too small** — `text-gray-400 font-bold text-sm` (faint, tiny) changed to `text-base font-semibold text-gray-600` in `FillBlankQ`, and `text-gray-400 font-bold` changed to `text-lg font-semibold text-gray-600` on the question card for multiple-choice. Readable for kids aged 7–11.

---

## Session C — UI Redesign & Mobile Polish (2026-03-27) ✅

### Completed
- [x] **Baloo 2 display font** — added via `next/font/google` in `layout.tsx`; wired as `--font-baloo` CSS variable; exposed as `font-display` Tailwind class and `.font-display` CSS class. Used on all headings, subject card titles, and category banners.
- [x] **Owl mascot "Bubo"** — new `src/components/ui/Mascot.tsx`, fully inline SVG (no external files needed). Golden owl with graduation cap. Floats in the homepage hero using `float` CSS keyframe animation + `drop-shadow-lg`.
- [x] **3D card hover effect** — new `.card-3d` CSS class: offset box-shadow deepens on hover, cards lift `translateY(-7px)` with a springy cubic-bezier. Cards on homepage alternate `hover:rotate-1` / `hover:-rotate-1` for a hand-placed feel. Card emoji scales + lifts independently on group-hover.
- [x] **Mute toggle button** — new `src/hooks/useMute.ts` (localStorage + custom window event for cross-component sync). 🔊/🔇 button in Header next to the stars counter. Exposes `isMuted()` helper for quiz sound gating (see Session D note below).
- [x] **Homepage hero redesign** — scattered sparkle decorations (⭐✨🌟) with staggered `twinkle` animations, wavy SVG underline on "Small Talk!" brand text, staggered `slide-up` entrance animations on hero text.
- [x] **Category banners** — decorative white blob circles for depth, `font-display` headings, `flex-wrap sm:flex-nowrap` for safe small-screen layout.
- [x] **Background** — warmer gradient `#FFF6EE → #F0F4FF → #FFF0F8` replacing the old blue-only gradient.
- [x] **Mobile polish at 375px** across all pages:
  - Header: compact stars counter (hides "Stars" label on mobile), mute button, logo truncates safely
  - Quiz question card: `p-5 sm:p-8` (was `p-8`)
  - Quiz done screen: `p-6 sm:p-10` (was `p-10`)
  - Quiz header: `min-w-0 truncate` + `flex-shrink-0` counter to prevent flex overflow
  - FillBlankQ: Check button gets `flex-shrink-0 px-4 sm:px-6`
  - Subject page: hero uses `text-3xl sm:text-4xl`; level action buttons use `px-4 py-2 text-sm`
  - Lesson finish button: `w-full sm:w-auto` + responsive padding

### Note for next session
- Wire `isMuted()` into quiz `playSound()` function — the hook is ready, just needs a check at the top of `playSound`

---

## Session F — Performance & Deploy (2026-03-27) ✅

### Performance audit — findings & fixes

| Issue | Fix | Impact |
|---|---|---|
| `framer-motion` + `react-confetti` installed but **never used** | `npm uninstall` (removed 5 packages) | ~140 KB off bundle |
| All 3 game components statically imported (only 1 rendered at a time) | Converted to `next/dynamic` with `ssr: false` in `games/[gameId]/page.tsx` | Games split into lazy chunks |
| Google Fonts via blocking CSS `@import` | Replaced with `next/font/google` (`Nunito` + `Baloo 2`) in `layout.tsx` — self-hosted at build time | No external request at runtime, eliminates CLS risk |
| Tailwind `font-display` referenced literal `"Baloo 2"` | Updated to `var(--font-baloo)` | Consistent with next/font variable |

No localhost URLs found. No image assets to optimize (emoji-only).

### Build output (clean ✅)
```
Route (app)                       Size     First Load JS
○ /                               1.23 kB  106 kB
○ /profile                        2.48 kB  108 kB
ƒ /games/[gameId]                 2.96 kB  108 kB
ƒ /lesson/[subjectId]/[level]     1.9 kB   107 kB
ƒ /quiz/[subjectId]/[level]       3.07 kB  108 kB
ƒ /subject/[subjectId]            1.74 kB  107 kB
Shared JS: 87.1 kB — zero errors
```

### Vercel deploy steps

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "initial"
   gh repo create small-talk --public --source=. --push
   ```

2. **Import on Vercel** — vercel.com/new → Import Git Repository → select repo
   - Framework: Next.js (auto-detected)
   - Build command: `npm run build` (default)
   - No env vars needed (fully client-side)
   - Click **Deploy** — done, get `*.vercel.app` URL

3. Every push to `main` auto-deploys.

### Next up
- Add your real external games into `public/games/game1,2,3/index.html`
- Fill in more intermediate/advanced content if desired
- Optional: `/profile` sharing button, sound effects polish

---

## Session D — Integrate External Games (2026-03-27) ✅

### Completed
- [x] Created `public/games/game1/index.html` — placeholder with postMessage bridge + test button
- [x] Created `public/games/game2/index.html` — same, different colour scheme
- [x] Created `public/games/game3/index.html` — same, different colour scheme
- [x] Added `game1`, `game2`, `game3` to `GAME_INFO` in `src/app/games/[gameId]/page.tsx`
- [x] Added `IFRAME_GAMES` set to identify external iframe games
- [x] Added `useEffect` postMessage listener — catches `{ type: 'GAME_COMPLETE', score: N }` and saves to progress
- [x] Added iframe render branch for all IFRAME_GAMES (full layout, passes `?subject=&level=` to iframe)
- [x] Score display after game completion shows star tier (⭐ / ⭐⭐ / ⭐⭐⭐)
- [x] All 3 external games visible in game-selector pill strip alongside built-in games

### How to add your real games
1. Open `public/games/game1/index.html` (or game2/game3)
2. Replace the placeholder `<div class="card">...</div>` block with your game HTML/CSS/JS
3. Keep the `<script>` bridge at the bottom — call `sendScore(pts)` when the game ends
4. Update the `title`, `emoji`, and `description` in `GAME_INFO` inside `src/app/games/[gameId]/page.tsx`
5. Use the "🧪 Test Score Bridge" button in the placeholder to verify the postMessage connection first

### postMessage protocol
- **Game → platform:** `window.parent.postMessage({ type: 'GAME_COMPLETE', score: 0–100 }, '*')`
- **Platform → game (via URL params):** `/games/game1/index.html?subject=animals&level=1`
- Score thresholds: `≥80` → 3 stars, `≥60` → 2 stars, `<60` → 1 star

---

## Session A — QA & Fixes

### Completed
- [x] Level unlock threshold changed from ≥1 star to ≥2 stars (`src/hooks/useProgress.ts`)
- [x] Advanced section banner gradient darkened (`from-purple-400 to-pink-500` → `from-purple-600 to-pink-600`) to fix faded white text contrast (`src/data/subjects.ts`)

### Content complete (pre-QA)
- Letters (3 levels, A–Z split)
- Numbers (3 levels, 1–10, 11–20, ordinals)
- Colors (3 levels)
- Animals (3 levels, 18 words, 15 quiz questions)
- Food (3 levels)
- Games: WordMatch, SpellingBee, BubblePop
- Progress system (localStorage, stars, unlock logic)

---

## Session E — Content Expansion (2026-03-27) ✅

### Completed
- [x] Body Parts — 3 full levels, 6 words + 5 quiz questions each (`src/data/content/body-parts.ts`)
  - Level 1: Face & Head (head, eye, nose, mouth, ear, hair)
  - Level 2: Arms & Legs (hand, arm, leg, foot, stomach, back)
  - Level 3: Body Details (finger, tooth, tongue, knee, elbow, shoulder)
- [x] Action Verbs — 3 full levels, 6 words + 5 quiz questions each (`src/data/content/action-verbs.ts`)
  - Level 1: Move Your Body (run, jump, swim, walk, eat, sleep)
  - Level 2: School & Fun (read, write, draw, play, sing, dance)
  - Level 3: Verbs in Sentences (fly, build, cook, clean, help, think)
- [x] Simple Sentences — 3 full levels, 6 phrases + 5 quiz questions each (`src/data/content/simple-sentences.ts`)
  - Level 1: I Am... (I am happy / tired / hungry / a student / seven / ready)
  - Level 2: I Have / I Like (I have a dog / blue eyes / a best friend; I like to read / pizza / play outside)
  - Level 3: Questions & Answers (What is your name? / Where do you live? / How old are you? etc.)
- [x] Registered all three new subjects in `src/data/subjects.ts` — inline stubs replaced with imported level arrays

---

## Session B — Profile Page & Rewards (2026-03-27) ✅

### Completed
- [x] Created `/profile` page (`src/app/profile/page.tsx`)
  - Hero section: large golden star badge showing total stars + global % complete
  - Polka-dot + gradient background (warm sunshine aesthetic, child-friendly)
  - Category sections (Beginner / Intermediate / Advanced) with colored banners
  - Subject cards in a responsive grid — each shows emoji, Hebrew title, 3 level badges, progress bar
  - Level badges: 🔒 locked, ☆/⭐ stars earned (1–3), full star highlights (Lv complete)
  - "✓ Done!" ribbon on subjects at 100% star completion
  - Star count + % per subject displayed on each card
- [x] CSS-only confetti animation — 60 deterministic colored pieces, fall + rotate keyframe
  - Triggers once when `totalStars > 0` and `smalltalk_confetti_shown` key is absent from localStorage
  - Key written on first trigger so it never re-fires; times out after 4.8 s
- [x] Header star badge now links to `/profile` (hover highlight added)

### Next up
- QA: verify Hebrew renders correctly in browser, quiz IDs are all unique
- Run `npm run build` to confirm no TypeScript errors
- Fill in intermediate/advanced content (body-parts, action-verbs, simple-sentences) if not already done
