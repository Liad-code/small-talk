# Step 7 scene files — authoring brief

Each file here is one Step 7 speaking scene for **Small Talk** (a kids' English app for
Hebrew-speaking children in Israel, ages ~8–11, English level A1). The child talks with one
character in a real-life place. No microphone: the child picks / builds what to say, hears it
in the child's voice, and says it aloud with it.

Every scene has five modes, all driven by this one data file:
- **Story** (default tab) — a branching adventure; choices change what happens; 3–4 endings to collect.
- **Learn** — the key phrases with Hebrew + 🔊.
- **Order** — the character asks, the child chooses the right sentence (silly answers get a funny reply + retry).
- **Build** — same steps, the child taps the words of the sentence in order (plus one distractor tile).
- **Role swap** — the child plays the character: picks the right question each step (vs. a silly one),
  the "customer" (kid voice) answers randomly, then the child must **make** what the customer asked for.

## Read first
- `../types.ts` — the exact shape (Scene, SceneUI, PlaceArt, Story, StoryNode, FindEvent…). Comments explain each field.
- `../pizzeria.ts` + `../pizzeriaStory.ts` — the finished first scene. Match its tone, size and quality.
  (It uses built-in places; new scenes define their own places in `scene.places`.)

## File format
`src/data/step7/scenes/<scene-id>.ts`:
```ts
import type { SceneBundle, Scene, Story } from '../types'
const SCENE: Scene = { ... }
const STORY: Story = { ... }
export const BUNDLE: SceneBundle = { scene: SCENE, story: STORY }
```
**Only `import type`** — no runtime imports, no functions with side effects (the Node audio
generator imports these files with type stripping). Plain helper functions/consts inside the file are fine.

## Rules
- **English**: short, simple, natural A1 sentences (≤ 60 characters per line; validator hard-limits 75).
  Straight quotes only. Use the same few patterns repeatedly so children learn them (`I would like…, please.`, `Can I have…?`).
- **Hebrew**: natural Israeli Hebrew, addressing the child in plural (`אתם`, `בחרו`, `אמרו`). For first-person
  lines with gender use the slash form (`אני אוהב/ת`). Hints (`hintHe`) teach the key words: `small = קטנה`.
- **Silly answers**: every Order step has one funny wrong option with a kind, funny `reaction` ending in
  `Try again.` (e.g. "A blue pizza? Pizza is not blue! Try again."). Never mean, never scary.
- **Speakers**: the character's lines use the scene's `character.speaker` (given below); the child and the
  role-swap customer are always `'kid'`. Learn `phrases` use one of those two.
- **Role swap**: `makeSlots` = what the child must make/fill after `makeAfterStep`. Every correct option in the
  steps up to `makeAfterStep` that answers a slot must have `pick: { slot, value }` whose value exists in that
  slot's `choices`. Steps with several correct options need `icon` + `label` on each (Build-mode picker).
  `swapSilly` = a silly line the character might say + the customer's funny reply.
- `result: 'items'` (only the pizzeria is `'pizza'`).
- **Places** (`scene.places`): 2–5 places drawn from CSS + emoji. You may also reuse built-in ids
  `street` (pizza shop front — avoid), `park`, `table` (checked tablecloth). Example:
  ```ts
  shop: {
    bg: 'linear-gradient(#fdf2f8, #fce7f3)',
    floor: { bg: 'repeating-conic-gradient(#f9a8d4 0% 25%, #fdf2f8 0% 50%) 0 0 / 28px 28px', h: 22, border: '#f472b6' },
    decor: [{ e: '🍦', x: 8, y: 10, s: 34 }, { e: '☁️', x: 60, y: 6, s: 30, anim: 'cloud' }],
    sign: "🍦 Lulu's Ice Cream",
    counter: { bg: '#f472b6', border: '#db2777', item: '🍨' },   // character stands behind it
  },
  ```
  Keep decor in the **top ~55%** (characters stand at the bottom-left and bottom-right; the speech
  bubble covers the top ~25% when someone talks, so put the most important decor in y 25–55).
  `ui.stagePlace` is the place used by Order / Build / Role swap (usually the one with the counter).
- **Story**: 10–15 nodes, `chapters` = 6–9 icons (`chapter` indexes 0…n-1, the last = the ending),
  3–4 endings, each reached by a real choice (different choices → different endings; a remembered choice
  can change the ending through `set` + `nextIf`). Include:
  - at least one **FindEvent** mini-game (`event: { kind: 'find', target, decoys (≥6 different emoji), count 3–4, promptHe, doneLine }` + `next`), fitting the story (find the lost puppies, the apples on the list…);
  - a couple of silly choices with funny replies;
  - character `reply` lines that react to choices (personality!);
  - `narrationHe` for every node: 1–2 short, vivid Hebrew sentences that tell the story;
  - `props` (emoji on the picture) where they add to the moment; `noCharacter: true` on a node where the
    character hasn't appeared yet (a `reply` then makes them appear);
  - `introHe`: 3 cover lines like the pizzeria's (`🗨️ … מדבר/ת — ואתם בוחרים מה לענות.` etc.);
  - each ending: `emoji`, `title`, `titleHe`, `descHe`, `place`, optional `props`.
  The final node of each ending has choices **without** `next` (e.g. "Thank you! Goodbye!") — choosing one ends the story.
- **Recording cost**: every distinct English line is recorded with ElevenLabs. Re-use identical sentences
  between modes and story where natural (identical text + speaker = one recording). Aim for
  **≤ 2,100 characters** per scene (the validator prints it; the pizzeria is ~2,000).
- `ui` texts: all fields filled, Hebrew where the field name ends in `He`. `gradient` must be a Tailwind pair
  like `'from-pink-400 to-rose-500'`.

## Check your work
```
node scripts/validate-step7.mjs <scene-id>     # must print ✓
npx tsc --noEmit -p .                           # no errors in your files
```
Do not edit any other file. Do not record audio, do not commit.
