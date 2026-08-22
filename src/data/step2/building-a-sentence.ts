// Step 2 · Grammar · "building a sentence"
// Each item is a correct English sentence. The exercise scrambles the words and
// asks the student to tap the word tiles back into the correct order.
//
// - `text` is stored already capitalized (first word starts with a capital
//   letter) so the tiles and the comparison use the capitalized forms.
// - `accept` (optional) lists extra word orders that are ALSO correct, so a
//   sentence can have more than one valid arrangement (e.g. read/write order).
export interface BuildSentence {
  text: string
  accept?: string[]
}

// ── Round 1 ──────────────────────────────────────────────────────────────────
export const BUILD_ROUND_1: BuildSentence[] = [
  { text: 'I can run fast' },
  { text: 'I have a red ball' },
  { text: 'I am hungry' },
  { text: 'She is in the classroom' },
  { text: 'They are at school now' },
  { text: 'We eat an apple every day' },
  { text: 'You have a nice house' },
  // read/write sentence — either order is accepted
  { text: 'They can read and write', accept: ['They can write and read'] },
  { text: 'The sun is yellow' },
  { text: 'I can see the flower' },
]

// ── Round 2 — 10 new sentences, exactly 5 negative "be" sentences ─────────────
export const BUILD_ROUND_2: BuildSentence[] = [
  // 5 negative "be" sentences
  { text: 'I am not happy' },
  { text: 'The children are not in the park' },
  { text: 'He is not on the bus' },
  { text: 'She is not at home' },
  { text: 'We are not tired' },
  // 5 positive sentences (round-1 level)
  { text: 'I like my dog' },
  { text: 'The cat is small' },
  { text: 'We play in the park' },
  { text: 'She has a red book' },
  { text: 'They run very fast' },
]

// All rounds in order. The exercise runs through round 1 then round 2.
export const BUILD_ROUNDS: BuildSentence[][] = [BUILD_ROUND_1, BUILD_ROUND_2]
