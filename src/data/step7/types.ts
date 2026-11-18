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
