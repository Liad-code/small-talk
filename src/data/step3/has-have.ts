export type HHVerb = 'have' | 'has'
export type HHNegVerb = "don't have" | "doesn't have"
export type HHYNVerb = 'Do' | 'Does'
export type HHPronounGroup = 'i' | 'you' | 'he' | 'she' | 'it' | 'we' | 'they'

// ── Positive Ex1: circle have / has (3 cycles × 10) ──────────────────────────
export interface HHEx1Q { sentence: string; answer: HHVerb }
export const HH_POS_EX1: HHEx1Q[][] = [
  [
    { sentence: 'They ___ a car.',           answer: 'have' },
    { sentence: 'He ___ a big dog.',          answer: 'has'  },
    { sentence: 'She ___ a cat.',             answer: 'has'  },
    { sentence: 'I ___ a book.',              answer: 'have' },
    { sentence: 'We ___ a red bag.',          answer: 'have' },
    { sentence: 'The boy ___ a ball.',        answer: 'has'  },
    { sentence: 'You ___ a pencil.',          answer: 'have' },
    { sentence: 'My sister ___ long hair.',   answer: 'has'  },
    { sentence: 'They ___ two dogs.',         answer: 'have' },
    { sentence: 'The teacher ___ a pen.',     answer: 'has'  },
  ],
  [
    { sentence: 'The cat ___ a toy.',         answer: 'has'  },
    { sentence: 'We ___ a big house.',        answer: 'have' },
    { sentence: 'My father ___ a car.',       answer: 'has'  },
    { sentence: 'I ___ a red pencil.',        answer: 'have' },
    { sentence: 'You ___ a nice book.',       answer: 'have' },
    { sentence: 'Tom ___ a small dog.',       answer: 'has'  },
    { sentence: 'They ___ homework.',         answer: 'have' },
    { sentence: 'She ___ blue eyes.',         answer: 'has'  },
    { sentence: 'The bird ___ small wings.',  answer: 'has'  },
    { sentence: 'We ___ a good teacher.',     answer: 'have' },
  ],
  [
    { sentence: 'I ___ a brother.',           answer: 'have' },
    { sentence: 'He ___ a green bag.',        answer: 'has'  },
    { sentence: 'The children ___ a game.',   answer: 'have' },
    { sentence: 'My dog ___ a bone.',         answer: 'has'  },
    { sentence: 'You ___ homework today.',    answer: 'have' },
    { sentence: 'Dana ___ a nice dress.',     answer: 'has'  },
    { sentence: 'They ___ a ball.',           answer: 'have' },
    { sentence: 'The baby ___ a toy.',        answer: 'has'  },
    { sentence: 'We ___ a test today.',       answer: 'have' },
    { sentence: 'My mom ___ a red car.',      answer: 'has'  },
  ],
]

// ── Positive Ex2: sentence builder (3 cycles × 6) ────────────────────────────
export interface HHSubject { text: string; verb: HHVerb }
export interface HHBuilderCycle { subjects: HHSubject[]; nouns: string[] }
export const HH_POS_EX2: HHBuilderCycle[] = [
  {
    subjects: [
      { text: 'My sister', verb: 'has'  },
      { text: 'The boy',   verb: 'has'  },
      { text: 'They',      verb: 'have' },
      { text: 'We',        verb: 'have' },
      { text: 'The cat',   verb: 'has'  },
      { text: 'I',         verb: 'have' },
    ],
    nouns: ['a ball', 'a pencil', 'long hair', 'two dogs', 'a book', 'a red bag'],
  },
  {
    subjects: [
      { text: 'He',      verb: 'has'  },
      { text: 'You',     verb: 'have' },
      { text: 'The dog', verb: 'has'  },
      { text: 'She',     verb: 'has'  },
      { text: 'Tom',     verb: 'has'  },
      { text: 'We',      verb: 'have' },
    ],
    nouns: ['a big car', 'a new bag', 'a toy', 'blue eyes', 'a bone', 'two cats'],
  },
  {
    subjects: [
      { text: 'The baby',    verb: 'has'  },
      { text: 'My dad',      verb: 'has'  },
      { text: 'I',           verb: 'have' },
      { text: 'They',        verb: 'have' },
      { text: 'The teacher', verb: 'has'  },
      { text: 'You',         verb: 'have' },
    ],
    nouns: ['a white hat', 'a phone', 'a green pencil', 'many books', 'a small cat', 'homework'],
  },
]

// ── Negative Ex1: circle don't have / doesn't have (3 cycles × 10) ───────────
export interface HHNegEx1Q { sentence: string; answer: HHNegVerb }
export const HH_NEG_EX1: HHNegEx1Q[][] = [
  [
    { sentence: 'You ___ a black bag.',        answer: "don't have"    },
    { sentence: 'Dana ___ a cake.',           answer: "doesn't have"  },
    { sentence: 'We ___ a dog.',              answer: "don't have"    },
    { sentence: 'She ___ a cat.',             answer: "doesn't have"  },
    { sentence: 'They ___ a big house.',      answer: "don't have"    },
    { sentence: 'He ___ a pencil.',           answer: "doesn't have"  },
    { sentence: 'I ___ a red bag.',           answer: "don't have"    },
    { sentence: 'The boy ___ a ball.',        answer: "doesn't have"  },
    { sentence: 'We ___ homework today.',     answer: "don't have"    },
    { sentence: 'The cat ___ a toy.',         answer: "doesn't have"  },
  ],
  [
    { sentence: 'I ___ a sister.',            answer: "don't have"    },
    { sentence: 'My mom ___ a car.',          answer: "doesn't have"  },
    { sentence: 'You ___ a pet.',             answer: "don't have"    },
    { sentence: 'The dog ___ a bone.',        answer: "doesn't have"  },
    { sentence: 'They ___ a garden.',         answer: "don't have"    },
    { sentence: 'He ___ a bicycle.',          answer: "doesn't have"  },
    { sentence: 'We ___ a big room.',         answer: "don't have"    },
    { sentence: 'She ___ long hair.',         answer: "doesn't have"  },
    { sentence: 'I ___ a hat.',               answer: "don't have"    },
    { sentence: 'The baby ___ a name yet.',   answer: "doesn't have"  },
  ],
  [
    { sentence: 'They ___ a ball.',           answer: "don't have"    },
    { sentence: 'The boy ___ a bag.',         answer: "doesn't have"  },
    { sentence: 'We ___ a pool.',             answer: "don't have"    },
    { sentence: 'She ___ a bicycle.',         answer: "doesn't have"  },
    { sentence: 'I ___ a new book.',          answer: "don't have"    },
    { sentence: 'He ___ a dog.',              answer: "doesn't have"  },
    { sentence: 'You ___ a pen.',             answer: "don't have"    },
    { sentence: 'The cat ___ a collar.',      answer: "doesn't have"  },
    { sentence: 'We ___ a test today.',       answer: "don't have"    },
    { sentence: 'Dana ___ a sister.',         answer: "doesn't have"  },
  ],
]

// ── Negative Ex2: sentence builder (3 cycles × 5) ────────────────────────────
export interface HHNegSubject { text: string; verb: HHNegVerb }
export interface HHNegBuilderCycle { subjects: HHNegSubject[]; nouns: string[] }
export const HH_NEG_EX2: HHNegBuilderCycle[] = [
  {
    subjects: [
      { text: 'I',           verb: "don't have"   },
      { text: 'She',         verb: "doesn't have" },
      { text: 'He',          verb: "doesn't have" },
      { text: 'We',          verb: "don't have"   },
      { text: 'They',        verb: "don't have"   },
    ],
    nouns: ['a ball', 'a pencil', 'a book', 'a dog', 'a car'],
  },
  {
    subjects: [
      { text: 'You',         verb: "don't have"   },
      { text: 'The boy',     verb: "doesn't have" },
      { text: 'My sister',   verb: "doesn't have" },
      { text: 'We',          verb: "don't have"   },
      { text: 'The cat',     verb: "doesn't have" },
    ],
    nouns: ['a bag', 'a toy', 'a red pen', 'homework', 'a bicycle'],
  },
  {
    subjects: [
      { text: 'I',           verb: "don't have"   },
      { text: 'The teacher', verb: "doesn't have" },
      { text: 'They',        verb: "don't have"   },
      { text: 'She',         verb: "doesn't have" },
      { text: 'We',          verb: "don't have"   },
    ],
    nouns: ['a phone', 'a hat', 'two cats', 'long hair', 'a green bag'],
  },
]

// ── Negative Ex3: positive → type negative (10 questions) ────────────────────
export interface HHNegEx3Q {
  positive: string
  before: string
  answer: HHNegVerb
  after: string
}
export const HH_NEG_EX3: HHNegEx3Q[] = [
  { positive: 'I have a ball.',            before: 'I',          answer: "don't have",   after: 'a ball.'     },
  { positive: 'He has a car.',             before: 'He',         answer: "doesn't have", after: 'a car.'      },
  { positive: 'She has a cat.',            before: 'She',        answer: "doesn't have", after: 'a cat.'      },
  { positive: 'We have a dog.',            before: 'We',         answer: "don't have",   after: 'a dog.'      },
  { positive: 'They have a ball.',         before: 'They',       answer: "don't have",   after: 'a ball.'     },
  { positive: 'The boy has a pencil.',     before: 'The boy',    answer: "doesn't have", after: 'a pencil.'   },
  { positive: 'You have a book.',          before: 'You',        answer: "don't have",   after: 'a book.'     },
  { positive: 'My sister has long hair.',  before: 'My sister',  answer: "doesn't have", after: 'long hair.'  },
  { positive: 'The cat has a toy.',        before: 'The cat',    answer: "doesn't have", after: 'a toy.'      },
  { positive: 'I have a red bag.',         before: 'I',          answer: "don't have",   after: 'a red bag.'  },
]

// ── Yes/No Ex1: drag Do / Does to start of question (3 cycles × 10) ──────────
export interface HHYNEx1Q { after: string; answer: HHYNVerb }
export const HH_YN_EX1: HHYNEx1Q[][] = [
  [
    { after: 'they have a dog?',           answer: 'Do'   },
    { after: 'she have a cat?',            answer: 'Does' },
    { after: 'he have a book?',            answer: 'Does' },
    { after: 'you have a pencil?',         answer: 'Do'   },
    { after: 'I have homework?',           answer: 'Do'   },
    { after: 'the boy have a ball?',       answer: 'Does' },
    { after: 'we have a test?',            answer: 'Do'   },
    { after: 'my sister have long hair?',  answer: 'Does' },
    { after: 'they have a red bag?',       answer: 'Do'   },
    { after: 'the cat have a toy?',        answer: 'Does' },
  ],
  [
    { after: 'she have a sister?',         answer: 'Does' },
    { after: 'I have a bicycle?',          answer: 'Do'   },
    { after: 'he have a phone?',           answer: 'Does' },
    { after: 'we have a garden?',          answer: 'Do'   },
    { after: 'the baby have a name?',      answer: 'Does' },
    { after: 'you have a pet?',            answer: 'Do'   },
    { after: 'Tom have a big room?',       answer: 'Does' },
    { after: 'they have two cats?',        answer: 'Do'   },
    { after: 'the dog have a bone?',       answer: 'Does' },
    { after: 'we have homework today?',    answer: 'Do'   },
  ],
  [
    { after: 'he have a green bag?',       answer: 'Does' },
    { after: 'I have a brother?',          answer: 'Do'   },
    { after: 'the teacher have a pen?',    answer: 'Does' },
    { after: 'they have a ball?',          answer: 'Do'   },
    { after: 'she have blue eyes?',        answer: 'Does' },
    { after: 'we have a pool?',            answer: 'Do'   },
    { after: 'my dad have a car?',         answer: 'Does' },
    { after: 'you have a hat?',            answer: 'Do'   },
    { after: 'Dana have a nice dress?',    answer: 'Does' },
    { after: 'they have a game?',          answer: 'Do'   },
  ],
]

// ── Yes/No Ex2: question builder (3 cycles × 6) ───────────────────────────────
export interface HHYNSubject { text: string; verb: HHYNVerb }
export interface HHYNBuilderCycle { subjects: HHYNSubject[]; phrases: string[] }
export const HH_YN_EX2: HHYNBuilderCycle[] = [
  {
    subjects: [
      { text: 'I',       verb: 'Do'   },
      { text: 'she',     verb: 'Does' },
      { text: 'he',      verb: 'Does' },
      { text: 'you',     verb: 'Do'   },
      { text: 'we',      verb: 'Do'   },
      { text: 'the cat', verb: 'Does' },
    ],
    phrases: ['have a dog?', 'have a pencil?', 'have a book?', 'have a red bag?', 'have homework?', 'have a toy?'],
  },
  {
    subjects: [
      { text: 'I',        verb: 'Do'   },
      { text: 'he',       verb: 'Does' },
      { text: 'they',     verb: 'Do'   },
      { text: 'the boy',  verb: 'Does' },
      { text: 'we',       verb: 'Do'   },
      { text: 'she',      verb: 'Does' },
    ],
    phrases: ['have a cat?', 'have a bicycle?', 'have a ball?', 'have a phone?', 'have a car?', 'have blue eyes?'],
  },
  {
    subjects: [
      { text: 'I',           verb: 'Do'   },
      { text: 'the teacher', verb: 'Does' },
      { text: 'they',        verb: 'Do'   },
      { text: 'she',         verb: 'Does' },
      { text: 'we',          verb: 'Do'   },
      { text: 'my dad',      verb: 'Does' },
    ],
    phrases: ['have a hat?', 'have a pen?', 'have a game?', 'have long hair?', 'have a pool?', 'have a car?'],
  },
]

// ── Yes/No Ex3: click yes/no (15 questions) ───────────────────────────────────
export interface HHYNEx3Q { question: string; group: HHPronounGroup }
export const HH_YN_EX3: HHYNEx3Q[] = [
  { question: 'Do I have a pencil?',        group: 'i'    },
  { question: 'Does she have a cat?',       group: 'she'  },
  { question: 'Do they have a dog?',        group: 'they' },
  { question: 'Does he have a book?',       group: 'he'   },
  { question: 'Do we have homework?',       group: 'we'   },
  { question: 'Does it have a name?',       group: 'it'   },
  { question: 'Do you have a bicycle?',     group: 'you'  },
  { question: 'Does she have long hair?',   group: 'she'  },
  { question: 'Do they have a ball?',       group: 'they' },
  { question: 'Does he have a phone?',      group: 'he'   },
  { question: 'Do we have a garden?',       group: 'we'   },
  { question: 'Does it have a toy?',        group: 'it'   },
  { question: 'Do I have a red bag?',       group: 'i'    },
  { question: 'Do you have a hat?',         group: 'you'  },
  { question: 'Does she have a bicycle?',   group: 'she'  },
]

export const HH_YN_ANSWER_BANK: Record<HHPronounGroup, { yes: string; no: string }> = {
  i:    { yes: 'Yes, I do',     no: "No, I don't"     },
  you:  { yes: 'Yes, you do',   no: "No, you don't"   },
  he:   { yes: 'Yes, he does',  no: "No, he doesn't"  },
  she:  { yes: 'Yes, she does', no: "No, she doesn't" },
  it:   { yes: 'Yes, it does',  no: "No, it doesn't"  },
  we:   { yes: 'Yes, we do',    no: "No, we don't"    },
  they: { yes: 'Yes, they do',  no: "No, they don't"  },
}

export const HH_PRONOUN_GROUPS: HHPronounGroup[] = ['i', 'you', 'he', 'she', 'it', 'we', 'they']
