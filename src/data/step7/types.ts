// Step 7 — speaking scenes. Data-only types (no runtime code), so the scene
// files stay importable by the Node audio generator (type stripping).

/**
 * Who says a line — each speaker has its own ElevenLabs voice (voices.ts).
 * 'kid' is the child (and the customer in role swap); every scene has its own
 * character speaker ('tony', 'sam', …).
 */
export type Speaker = string

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

/**
 * A place drawn from data (CSS backgrounds + emoji decorations), so each scene
 * can define its own shop without new components. Positions are % of the stage.
 */
export interface PlaceArt {
  bg: string                                   // CSS background of the wall / sky
  floor?: { bg: string; h: number; border?: string } // bottom band (h = % of height)
  decor?: { e: string; x: number; y: number; s?: number; anim?: 'cloud' | 'float' | 'flicker' | 'glow' }[]
  sign?: string                                // a shop sign at the top centre
  /** A counter in front of the character (the character stands behind it). */
  counter?: { bg: string; border: string; item?: string }
}

/** The scene's character (the one the child talks to, and plays in role swap). */
export interface SceneCharacter {
  speaker: Speaker
  name: string
  nameHe: string
  emoji: string
}

/** Texts and colours that make each scene look like its own place. */
export interface SceneUI {
  /** Tailwind gradient for the header and hub card, e.g. 'from-orange-400 to-red-500'. */
  gradient: string
  /** Hub card lines. */
  cardEn: string
  cardHe: string
  subtitleHe: string           // under the title in the header
  sign: string                 // e.g. "🍕 Tony's Pizza" on the stage
  stagePlace: string           // place id used by Order / Build / role swap
  /** Order / Build / role-swap intros (Hebrew). */
  introHe: { order: string; build: string; swap: string }
  startEn: string              // Order/Build start button, e.g. "Let's go!"
  startHe: string
  swapTab: string              // e.g. '👨‍🍳 Be Tony'
  swapStartEn: string          // e.g. 'Open the shop!'
  swapStartHe: string
  swapAskHe: string            // e.g. 'מה טוני אומר עכשיו?'
  swapSayHe: string            // e.g. 'אמרו את המשפט של טוני בקול!'
  makeTitleHe: string          // e.g. 'הכינו ללקוח בדיוק את מה שהזמין:'
  serveEn: string              // e.g. 'Here you go!'
  serveHe: string
  doneEn: string               // Order/Build finish title, e.g. 'Your order is ready!'
  doneHe: string
  swapDoneEn: string           // role-swap finish title
  swapDoneHe: string
  customerName: string         // role swap: who the child serves, e.g. 'Customer'
  learnHe: string              // Learn tab intro
}

export interface Scene {
  id: string
  title: string
  titleHe: string
  emoji: string
  character: SceneCharacter
  ui: SceneUI
  /** Places this scene defines (the pizzeria's places are built in). */
  places?: Record<string, PlaceArt>
  /** How the result is drawn: the pizza, or a row of the chosen items. */
  result: 'pizza' | 'items'
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

/** A place id: the pizzeria's built-in places, or one from the scene's `places`. */
export type Place = string

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

/** "Find it!" mini-game: tap the target emoji (count times) among moving decoys. */
export interface FindEvent {
  kind: 'find'
  target: string
  decoys: string[]
  count: number
  promptHe: string        // e.g. 'מצאו את 3 הגורים שברחו!'
  doneLine: StoryLine     // the character, when all are found
}

/** One item in a "pick several" moment (toppings, flavours, vegetables…). */
export interface StoryPickOption {
  say: string     // the item in the child's voice, recorded alone (e.g. 'Cheese')
  he: string
  icon: string
  value: string   // stored in memory (comma-joined with the other picks)
}

/**
 * "Pick several" moment: the child taps up to `max` items (any number when omitted), then
 * confirms; each picked item is said in the child's voice, then the closer (e.g. 'please.').
 */
export interface StoryPick {
  key: string               // memory key, e.g. 'topping' → 'cheese,olives'
  options: StoryPickOption[]
  max?: number
  min?: number              // default 1
  promptHe: string          // e.g. 'בחרו עד 3 תוספות'
  closer: string            // kid line after the items, e.g. 'please.' (recorded once)
  reply?: StoryLine         // the character after the order
  next: string
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
  event?: 'oven' | FindEvent
  /** "Pick several" instead of choices. */
  pick?: StoryPick
  /** Where an event or a choice-less node continues. */
  next?: string
  /** Ending nodes: which ending this is. */
  ending?: string
  /** Extra emoji drawn in the scene for this moment (x, y in % of the stage). */
  props?: { e: string; x: number; y: number; s?: number }[]
  /** Hide the character until a reply brings them in (e.g. outside the shop door). */
  noCharacter?: boolean
}

export interface StoryEnding {
  id: string
  emoji: string
  title: string
  titleHe: string
  descHe: string
  place: Place
  /** Emoji drawn on the ending picture. */
  props?: { e: string; x: number; y: number; s?: number }[]
  /** Draw the character on the ending picture (default true). */
  withCharacter?: boolean
}

export interface Story {
  id: string
  title: string
  titleHe: string
  start: string
  nodes: StoryNode[]
  endings: StoryEnding[]
  chapters: { icon: string; he: string }[]
  /** Cover picture place. */
  coverPlace: Place
  introHe: string[]        // the cover's "how it works" lines (after the title line)
  /** The "sold out" twist line (for canSellOut choices). */
  soldOut?: StoryLine
  /** Pizzeria oven mini-game lines. */
  oven?: { early: StoryLine; burnt: StoryLine; perfect: StoryLine }
}

/** One Step 7 scene with its story — what the hub, the page and the audio generator use. */
export interface SceneBundle { scene: Scene; story: Story }
