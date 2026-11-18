// Step 7 — speaking scenes. Data-only types (no runtime code), so the scene
// files stay importable by the Node audio generator (type stripping).

/** Who says a line — each speaker has its own ElevenLabs voice (voices.ts). */
export type Speaker = 'tony' | 'kid'

/** A choice the child's order is made of (size, topping, …). */
export interface Pick {
  slot: string   // e.g. 'size'
  value: string  // e.g. 'medium'
}

/** One answer the child can give in Order / Build mode. */
export interface KidOption {
  say: string            // spoken by the child's voice
  correct: boolean
  pick?: Pick            // what this answer adds to the order
  reaction?: string      // the character's funny reply to a silly answer (correct: false)
  icon?: string          // picture for the Build-mode choice row
  label?: string         // short word under the icon
}

/** Role swap: the silly line the child (as the character) might pick, and the customer's reply. */
export interface SwapSilly {
  say: string       // spoken in the character's voice
  reaction: string  // spoken by the customer (kid voice)
}

export interface SceneStep {
  id: string
  ask: string            // the character's line that opens this step
  hintHe: string         // Hebrew hint for the child (Order / Build)
  swapHintHe: string     // Hebrew hint when the child plays the character
  options: KidOption[]
  distractorWord: string // extra tile in Build mode
  swapSilly: SwapSilly
  /** Order / Build: how many correct options to show at once (shuffled). */
  showCorrect?: number
}

/** A slot the child must "make" in role swap (e.g. the pizza size the customer ordered). */
export interface MakeSlot {
  slot: string
  titleHe: string
  choices: { value: string; icon: string; label: string }[]
}

export interface Scene {
  id: string
  title: string
  titleHe: string
  emoji: string
  character: { speaker: Speaker; name: string; emoji: string }
  steps: SceneStep[]
  /** Role swap: after this step the child makes the customer's order. */
  makeAfterStep: string
  makeSlots: MakeSlot[]
  lines: {
    farewell: string     // character's last line (Order / Build)
    makeRight: string    // customer, when the child made the right order
    makeWrong: string    // customer, when it's wrong
  }
  /** Learn tab: key phrases (speaker, English, Hebrew). */
  phrases: { speaker: Speaker; en: string; he: string }[]
}

// ── Story mode ────────────────────────────────────────────────────────────
// A branching story: each node is a moment in one place; the child's choices
// decide where the story goes (and which ending they reach).

/** Where a story moment happens — each place has its own illustrated backdrop. */
export type Place = 'street' | 'counter' | 'oven' | 'table' | 'park' | 'kitchen'

/** A line the character says, with its Hebrew translation (shown on request). */
export interface StoryLine { text: string; he: string }

export interface StoryChoice {
  say: string             // the child's line (recorded in the kid voice)
  he: string              // Hebrew meaning, small under the English
  icon: string
  /** Node to go to. Omit to stay (a silly answer gets its reaction and a retry). */
  next?: string
  /** The character's reply before moving on (its own recording). */
  reply?: StoryLine
  /** Silly answer: the character's funny reaction; the child tries again. */
  silly?: StoryLine
  /** Story memory this choice sets (e.g. birthday: 'yes', size: 'large'). */
  set?: Record<string, string>
  /** Topping-style choices: may be "sold out" once per story (a small twist). */
  canSellOut?: boolean
  /** Conditional next: the first rule whose memory matches wins (else next). */
  nextIf?: { key: string; value: string; next: string }[]
}

export interface StoryNode {
  id: string
  place: Place
  chapter: number          // which icon on the story map lights up
  narrationHe: string      // the story text (Hebrew), shown as the page caption
  lines: StoryLine[]       // what the character says when the moment opens
  choices?: StoryChoice[]
  /** How many choices (besides silly ones) to show — shuffled each play. */
  showChoices?: number
  /** A special interaction instead of choices. */
  event?: 'oven'
  /** Where an event or a choice-less node continues. */
  next?: string
  /** Ending nodes: which ending this is. */
  ending?: string
}

export interface StoryEnding { id: string; emoji: string; title: string; titleHe: string; descHe: string; place: Place }

export interface Story {
  id: string
  title: string
  titleHe: string
  start: string
  nodes: StoryNode[]
  endings: StoryEnding[]
  chapters: { icon: string; he: string }[]
  /** Fixed lines used by events / twists. */
  extra: {
    soldOut: StoryLine
    ovenEarly: StoryLine
    ovenBurnt: StoryLine
    ovenPerfect: StoryLine
  }
}
