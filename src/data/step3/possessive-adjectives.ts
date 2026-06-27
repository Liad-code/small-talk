// ── Types ─────────────────────────────────────────────────────────────────────

export type PossAdj = 'My' | 'Your' | 'His' | 'Her' | 'Its' | 'Our' | 'Their'

// ── Ex1: 2 choices, pick the correct possessive adjective (2 rounds × 10) ────

export interface PAEx1Q {
  sentence: string    // context sentence
  blank: string       // "___ ... is/are ..."
  options: [string, string]
  answer: string
}

export const PA_EX1: PAEx1Q[][] = [
  // Round 1
  [
    { sentence: 'I have a sister.',            blank: '___ sister is twelve.',  options: ['My',   'His'],   answer: 'My'    },
    { sentence: 'Oded and Anat have a car.',   blank: '___ car is red.',        options: ['Her',  'Their'], answer: 'Their' },
    { sentence: 'The dog has a bone.',         blank: '___ bone is big.',       options: ['Its',  'His'],   answer: 'Its'   },
    { sentence: 'We have a house.',            blank: '___ house is big.',      options: ['My',   'Our'],   answer: 'Our'   },
    { sentence: 'She has a book.',             blank: '___ book is blue.',      options: ['Her',  'His'],   answer: 'Her'   },
    { sentence: 'You have a bag.',             blank: '___ bag is green.',      options: ['Your', 'My'],    answer: 'Your'  },
    { sentence: 'He has a cat.',               blank: '___ cat is white.',      options: ['Her',  'His'],   answer: 'His'   },
    { sentence: 'They have a school.',         blank: '___ school is new.',     options: ['Their','Our'],   answer: 'Their' },
    { sentence: 'She has a dress.',            blank: '___ dress is pink.',     options: ['His',  'Her'],   answer: 'Her'   },
    { sentence: 'I have a dog.',               blank: '___ dog is brown.',      options: ['My',   'Your'],  answer: 'My'    },
  ],
  // Round 2
  [
    { sentence: 'Nurit has a jacket.',         blank: '___ jacket is red.',     options: ['Her',  'His'],   answer: 'Her'   },
    { sentence: 'The house has a door.',       blank: '___ door is yellow.',    options: ['Its',  'His'],   answer: 'Its'   },
    { sentence: 'Tom and I have a room.',      blank: '___ room is big.',       options: ['Their','Our'],   answer: 'Our'   },
    { sentence: 'The cat has a toy.',          blank: '___ toy is small.',      options: ['Its',  'Her'],   answer: 'Its'   },
    { sentence: 'He has a bike.',              blank: '___ bike is new.',       options: ['Her',  'His'],   answer: 'His'   },
    { sentence: 'They have a garden.',         blank: '___ garden is nice.',    options: ['Your', 'Their'], answer: 'Their' },
    { sentence: 'You have a pencil.',          blank: '___ pencil is short.',   options: ['Your', 'My'],    answer: 'Your'  },
    { sentence: 'We have a dog.',              blank: '___ dog is big.',        options: ['Our',  'Their'], answer: 'Our'   },
    { sentence: 'She has long hair.',          blank: '___ hair is brown.',     options: ['His',  'Her'],   answer: 'Her'   },
    { sentence: 'I have a brother.',           blank: '___ name is Omer.',      options: ['My',   'Her'],   answer: 'My'    },
  ],
]

// ── Ex2: word bank fill-in (10 sentences) ────────────────────────────────────

export interface PAEx2Q {
  context: string
  blank: string
  answer: PossAdj
}

export const PA_EX2: PAEx2Q[] = [
  { context: 'Nurit has a jacket.',   blank: '___ jacket is red.',     answer: 'Her'   },
  { context: 'The house has a door.', blank: '___ door is yellow.',    answer: 'Its'   },
  { context: 'Yoni has a car.',       blank: '___ car is blue.',       answer: 'His'   },
  { context: 'We have a dog.',        blank: '___ dog is big.',        answer: 'Our'   },
  { context: 'You have a bag.',       blank: '___ bag is new.',        answer: 'Your'  },
  { context: 'They have a school.',   blank: '___ school is big.',     answer: 'Their' },
  { context: 'She has a cat.',        blank: '___ cat is white.',      answer: 'Her'   },
  { context: 'I have a sister.',      blank: '___ sister is funny.',   answer: 'My'    },
  { context: 'The cat has a toy.',    blank: '___ toy is small.',      answer: 'Its'   },
  { context: 'He has a ball.',        blank: '___ ball is red.',       answer: 'His'   },
]

export const PA_WORD_BANK: PossAdj[] = ['My', 'Your', 'His', 'Her', 'Its', 'Our', 'Their']

// ── Ex2 Round 2 ───────────────────────────────────────────────────────────────

export const PA_EX2_R2: PAEx2Q[] = [
  { context: 'David has a bike.',        blank: '___ bike is new.',         answer: 'His'   as PossAdj },
  { context: 'The birds have a nest.',   blank: '___ nest is big.',         answer: 'Their' as PossAdj },
  { context: 'I have a pencil.',         blank: '___ pencil is yellow.',    answer: 'My'    as PossAdj },
  { context: 'We have a teacher.',       blank: '___ teacher is great.',    answer: 'Our'   as PossAdj },
  { context: 'She has a dress.',         blank: '___ dress is pink.',       answer: 'Her'   as PossAdj },
  { context: 'You have a pet.',          blank: '___ pet is cute.',         answer: 'Your'  as PossAdj },
  { context: 'The cat has a toy.',       blank: '___ toy is small.',        answer: 'Its'   as PossAdj },
  { context: 'Tom has a phone.',         blank: '___ phone is new.',        answer: 'His'   as PossAdj },
  { context: 'They have a dog.',         blank: '___ dog is brown.',        answer: 'Their' as PossAdj },
  { context: 'She has a sister.',        blank: '___ sister is funny.',     answer: 'Her'   as PossAdj },
]

// ── Ex3: reading passage with 8 blanks ───────────────────────────────────────

export interface PAEx3Segment {
  type: 'text' | 'blank'
  text?: string
  blankIndex?: number
}

export interface PAEx3Blank {
  index: number
  answer: string
}

export interface PAEx3Round {
  segments: PAEx3Segment[]
  blanks: PAEx3Blank[]
  wordBank: string[]
}

// ── Round 1 ───────────────────────────────────────────────────────────────────
// Passage broken into segments for rendering
export const PA_EX3_SEGMENTS: PAEx3Segment[] = [
  { type: 'text',  text: 'I have a big family. ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text',  text: ' family lives in Tel Aviv. I have a sister. ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text',  text: ' name is Maya. She has a dog. ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text',  text: ' dog is big and brown. My mom is a teacher. ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text',  text: ' school is near our house. My dad has a car. ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text',  text: ' car is red. We have a nice home. ' },
  { type: 'blank', blankIndex: 5 },
  { type: 'text',  text: ' home is on a quiet street. My sister and I have a room. ' },
  { type: 'blank', blankIndex: 6 },
  { type: 'text',  text: ' room is big. We love ' },
  { type: 'blank', blankIndex: 7 },
  { type: 'text',  text: ' family!' },
]

export const PA_EX3_BLANKS: PAEx3Blank[] = [
  { index: 0, answer: 'My'  },
  { index: 1, answer: 'Her' },
  { index: 2, answer: 'Her' },
  { index: 3, answer: 'Her' },
  { index: 4, answer: 'His' },
  { index: 5, answer: 'Our' },
  { index: 6, answer: 'Our' },
  { index: 7, answer: 'our' },
]

export const PA_EX3_WORD_BANK: string[] = ['My', 'Her', 'His', 'Its', 'Our', 'Their', 'Your']

// ── Round 2 ───────────────────────────────────────────────────────────────────
// Practices "your" and "their" as the correct answers (mixed with others)
export const PA_EX3_SEGMENTS_R2: PAEx3Segment[] = [
  { type: 'text',  text: 'My friends are great. ' },
  { type: 'blank', blankIndex: 0 },
  { type: 'text',  text: ' house is near the park. They have a dog. ' },
  { type: 'blank', blankIndex: 1 },
  { type: 'text',  text: ' dog is small and white. "Dan, is this ' },
  { type: 'blank', blankIndex: 2 },
  { type: 'text',  text: ' bag?" "Yes, and these are ' },
  { type: 'blank', blankIndex: 3 },
  { type: 'text',  text: ' books too!" Mira and Tal love sports. ' },
  { type: 'blank', blankIndex: 4 },
  { type: 'text',  text: ' team is the best. "Kids, where is ' },
  { type: 'blank', blankIndex: 5 },
  { type: 'text',  text: ' ball?" The children have a teacher. ' },
  { type: 'blank', blankIndex: 6 },
  { type: 'text',  text: ' teacher is kind. We all love ' },
  { type: 'blank', blankIndex: 7 },
  { type: 'text',  text: ' school!' },
]

export const PA_EX3_BLANKS_R2: PAEx3Blank[] = [
  { index: 0, answer: 'Their' },
  { index: 1, answer: 'Their' },
  { index: 2, answer: 'your'  },
  { index: 3, answer: 'my'    },
  { index: 4, answer: 'Their' },
  { index: 5, answer: 'your'  },
  { index: 6, answer: 'Their' },
  { index: 7, answer: 'our'   },
]

export const PA_EX3_WORD_BANK_R2: string[] = ['Their', 'your', 'my', 'our', 'His', 'Her', 'Its']

export const PA_EX3_ROUNDS: PAEx3Round[] = [
  { segments: PA_EX3_SEGMENTS,    blanks: PA_EX3_BLANKS,    wordBank: PA_EX3_WORD_BANK    },
  { segments: PA_EX3_SEGMENTS_R2, blanks: PA_EX3_BLANKS_R2, wordBank: PA_EX3_WORD_BANK_R2 },
]
