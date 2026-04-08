# Small Talk - Step 1 Enhancement Plan

## IMPORTANT: This is an EXISTING working project. DO NOT rebuild from scratch.
## The site is live at localhost:3000 with Bubo mascot, stars system, subjects, games, etc.
## This document describes NEW features and exercises to ADD to the existing platform.

## What This Document Is
A detailed spec for expanding Small Talk with Step 1 content — the full phonics and letter-learning curriculum for complete beginners (ages 7-11, Hebrew-speaking children in Israel).

## What Already Exists (DO NOT touch or replace)
- Working Next.js 14 App Router site with Tailwind + TypeScript
- Bubo the owl mascot
- Star/progress tracking system (localStorage)
- 30+ vocabulary subjects (Letters, Numbers, Colors, Animals, Food, Family, etc.)
- Built-in games: Word Match, Spelling Bee, Bubble Pop, Phonics Fun, What's My Sound
- Profile/trophy room
- Custom content-builder skill at .claude/skills/english-game-builder/SKILL.md
- Existing navigation, routing, and UI components

## External Games (already built, to integrate)
- What's My Sound: https://liad-code.github.io/whats-my-sound/
- Phonics Fun: https://liad-code.github.io/phonics-fun/

## Letter Teaching Order (from ECB textbook)
Group 1: t, m, a, b, n (then review)
Group 2: i, d, s, h, f (then review)
Group 3: c, o, x, g, r (then review)
Group 4: p, e, l, k, y (then review)
Group 5: j, u, q, v, w, z (then review)

## CVC Words Bank (organized by vowel)
- Short a: cat, bat, hat, map, van, bag, dad, jam, cap, fan, ran, man, sad, tap, ram
- Short e: bed, red, hen, pen, ten, leg, net, jet, pet, wet, set, men, get, let, bet
- Short i: pig, big, dig, sit, hit, lip, pin, fin, win, mix, six, zip, tip, kid, bit
- Short o: dog, box, log, hop, top, mop, pot, hot, fox, dot, got, cop, cob, rob, nod
- Short u: sun, bus, cup, hug, rug, bug, run, fun, gun, mud, bud, cut, nut, tub, pup

---

## NEW FEATURES TO BUILD (Step 1 Curriculum)

### Overview
Step 1 has 4 learning tracks, all running in parallel. All exercises unlocked from the start (no gating). The site needs a new "Step One" section/page that serves as the hub for these 4 tracks.

### Design Principles for Step 1
- All exercises are VOICE-BASED (kids can't read yet) — use Web Speech API
- Wrong answers silently rejected (drag snaps back, no error message/sound)
- Confetti + happy sound on exercise completion
- Every completion earns a star (repeatable)
- Mobile-first (most users on phones) — real drag-and-drop
- Hebrew instructions where needed
- Big, colorful, child-friendly design matching existing site style

---

### TRACK A: Letter Recognition (הכרת האותיות)

#### A1. Letter Learning Page (שלב הקניה)
Simple interactive page — grid of colorful letter cards organized by the 5 groups above. Tap a card to hear the letter name via Web Speech API. Each card shows uppercase + lowercase (e.g., Aa). Kids explore at their own pace.

#### A2. Group Exercises (per group, same exercises for all 5 groups)

**Exercise 1 — Drag to Square:**
Decorated squares on screen. Tap a square to hear letter name. Below: shuffled uppercase and lowercase letter tiles from that group. Drag the correct uppercase AND lowercase tile into the matching square. Wrong drag silently rejects.

**Exercise 2 — Bubble Pop:**
Colorful bubbles floating on screen, each showing a letter pair (e.g., "Tt"). A button at the bottom plays a letter name. Kid must pop the matching bubble. Wrong bubble doesn't pop. Each tap plays next letter until all popped.

**Exercise 3 — Match Pairs (3 variants):**
a) Side-by-side: Uppercase on left, lowercase on right. Drag lowercase to matching uppercase.
b) Flower & Pot: Pots with uppercase letters at bottom, flowers with lowercase letters above. Drag flower to correct pot.
c) Maze Paths: Uppercase letters at top with tangled visual paths leading to endpoints at bottom. Lowercase letters at bottom. Kid figures out which path leads where and drags lowercase to the correct endpoint.

#### A3. Full ABC Exercises

**Exercise 1 — ABC Grid Fill (uppercase):**
A-Z grid with some letters shown, some blank. Letter bank at bottom. Drag missing letters to correct positions in alphabetical order.

**Exercise 2 — ABC Grid Fill (lowercase):**
Same as above but with lowercase letters.

**Exercise 3 — Puzzle Match:**
26 puzzle piece pairs. Each pair: one piece uppercase, one lowercase. Drag to connect matching pairs. Wrong pairs don't connect.

**Exercise 4 — Pot & Lid:**
26 pots with uppercase letters, 26 lids with lowercase letters scattered. Drag correct lid onto matching pot.

**Exercise 5 — Match the Letters (line drawing):**
Two columns: uppercase A-Z on left, shuffled lowercase on right. Tap uppercase then tap matching lowercase to draw a connecting line.

---

### TRACK B: Short Sounds (צלילים קצרים)

#### B1. Sound Learning Page
Same grid as letter learning, but tapping a card plays BOTH the letter name AND its short sound.

#### B2. Sound Box Exercise (per group)
Open boxes on screen. Tap a box to hear the short sound of a letter. From a scattered pool of letter tiles, drag BOTH matching tiles (uppercase + lowercase) into the box. Box closes when both placed correctly.

---

### TRACK C: CVC Words (מילים)

#### C1. Vowel Sort
Word bank at top. Five columns labeled a, e, i, o, u. Hear each word, drag it to the correct vowel column.

#### C2. Vowel Fill (Missing Middle Sound)
Image of object + partial word with missing vowel (c_t). Five vowel buttons. Tap image to hear word, tap correct vowel.

#### C3. Beginning Sound
Image + partial word missing first letter (_at). Consonant options shown. Tap image to hear word, drag correct beginning consonant.

#### C4. CVC Word Template
Images with empty letter boxes below (one box per letter). Word bank at top. Drag correct word to match image.

#### C5. Word-Image Match
CVC words on one side, images on the other. Drag image to matching word.

#### C6. Line Matching
Words in center, images on sides. Tap image then tap matching word to connect.

#### C7. Circle Correct Image
Show a CVC word + two images. Tap the correct one.

#### C8. Let's Read Cards
Per-vowel reading practice. Cards showing word + image + dots for sound segmentation. Tap to hear word.

#### C9. Word Scramble
Hear a CVC word. See scrambled letters. Tap in correct order to spell.

---

### TRACK D: Vocabulary (אוצר מילים) — Voice-Only

24 categories, up to 6 words each. Voice-based only (no reading required). Each category: flashcard learning + image quiz practice.

Categories: Numbers (1-10), Colors, Weather, Seasons, Emotions, Days of the week, Face, Body, Senses, Farm animals, Jungle animals, Prepositions, Fruits, Clothes, Transport, Actions, Opposites, Shapes, Meals, Food, House, Family, Nature, School

NOTE: Many categories may already exist as subjects. The Step 1 version should be voice-only with the specific word lists from the spec.

---

## Implementation Priority Order
1. Create "Step One" hub page accessible from the main site
2. Track A: Letter Learning page + group exercises (drag-to-square, bubble-pop, match-pairs)
3. Track B: Sound Learning + Sound Box exercises
4. Track C: CVC word exercises (Vowel Sort, Vowel Fill, Word-Image Match first)
5. Track D: Voice-only vocabulary (leverage existing subjects if possible)
6. Remaining CVC exercises
7. Full ABC exercises

## Known Issues & Patterns
- **Stale .next cache** — run: `powershell -Command "Remove-Item -Recurse -Force .next"`
- **Coordinate-based clicks fail on animated elements** — use querySelector + .click()
- **Young learners can't write** — all exercises must be multiple-choice or drag-and-drop, never keyboard input
- **Visual/numeric subjects** (Numbers, Colors) don't need Hebrew translations
