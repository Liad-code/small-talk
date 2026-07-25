// Ex1: drag subjects to am/is/are buckets (ONE cycle, 20 words total)
export interface ToBeBucket { verb: 'am' | 'is' | 'are'; subjects: string[] }
export const TB_EX1: ToBeBucket[] = [
  { verb: 'am',  subjects: ['I'] },
  { verb: 'is',  subjects: ['he', 'she', 'it', 'Ron', 'Dana', 'my mom', 'the cat', 'the dog', 'the teacher', 'the cake'] },
  { verb: 'are', subjects: ['you', 'we', 'they', 'the boys', 'books', 'my friends', 'the cats', 'Tom and Ron', 'you and Dana'] },
]

// Ex2: click am/is/are for sentence (3 cycles × 10)
export interface TBChoiceQ { sentence: string; answer: 'am' | 'is' | 'are' }
// Order is arranged so the same answer never appears more than twice in a row
export const TB_EX2: TBChoiceQ[][] = [
  [ // cycle 1
    { sentence: 'She ___ a teacher.',           answer: 'is'  },
    { sentence: 'They ___ at school.',          answer: 'are' },
    { sentence: 'The cat ___ black.',           answer: 'is'  },
    { sentence: 'I ___ hungry.',                answer: 'am'  },
    { sentence: 'The boys ___ tall.',           answer: 'are' },
    { sentence: 'He ___ my dad.',               answer: 'is'  },
    { sentence: 'We ___ happy.',                answer: 'are' },
    { sentence: 'The book ___ new.',            answer: 'is'  },
    { sentence: 'You ___ my friend.',           answer: 'are' },
    { sentence: 'My dog ___ brown.',            answer: 'is'  },
  ],
  [ // cycle 2
    { sentence: 'Ron ___ tall.',                answer: 'is'  },
    { sentence: 'The girls ___ at home.',       answer: 'are' },
    { sentence: 'It ___ cold.',                 answer: 'is'  },
    { sentence: 'I ___ a student.',             answer: 'am'  },
    { sentence: 'The teachers ___ nice.',       answer: 'are' },
    { sentence: 'The baby ___ small.',          answer: 'is'  },
    { sentence: 'Dana and Ron ___ happy.',      answer: 'are' },
    { sentence: 'My sister ___ at school.',     answer: 'is'  },
    { sentence: 'You ___ kind.',                answer: 'are' },
    { sentence: 'We ___ friends.',              answer: 'are' },
  ],
  [ // cycle 3
    { sentence: 'She ___ tall.',                answer: 'is'  },
    { sentence: 'We ___ in class.',             answer: 'are' },
    { sentence: 'The cake ___ big.',            answer: 'is'  },
    { sentence: 'The cats ___ hungry.',         answer: 'are' },
    { sentence: 'I ___ at home.',               answer: 'am'  },
    { sentence: 'The computer ___ new.',        answer: 'is'  },
    { sentence: 'They ___ my parents.',         answer: 'are' },
    { sentence: 'My mom ___ a nurse.',          answer: 'is'  },
    { sentence: 'You and I ___ friends.',       answer: 'are' },
    { sentence: 'Tom ___ my friend.',           answer: 'is'  },
  ],
]

// Ex3: drag am/is/are into blank (3 cycles × 10)
export interface TBFillQ { before: string; after: string; answer: 'am' | 'is' | 'are' }
// Order is arranged so the same answer never appears more than twice in a row
export const TB_EX3: TBFillQ[][] = [
  [ // cycle 1
    { before: 'My dad',       after: 'a teacher.',       answer: 'is'  },
    { before: 'My friends',   after: 'at home.',         answer: 'are' },
    { before: 'I',            after: 'happy.',           answer: 'am'  },
    { before: 'The cake',     after: 'big.',             answer: 'is'  },
    { before: 'They',         after: 'at school.',       answer: 'are' },
    { before: 'She',          after: 'my sister.',       answer: 'is'  },
    { before: 'We',           after: 'happy.',           answer: 'are' },
    { before: 'I',            after: 'a student.',       answer: 'am'  },
    { before: 'My book',      after: 'open.',            answer: 'is'  },
    { before: 'The cats',     after: 'small.',           answer: 'are' },
  ],
  [ // cycle 2
    { before: 'He',           after: 'tall.',            answer: 'is'  },
    { before: 'The boys',     after: 'in the park.',     answer: 'are' },
    { before: 'I',            after: 'tired.',           answer: 'am'  },
    { before: 'My mom',       after: 'a doctor.',        answer: 'is'  },
    { before: 'You',          after: 'my friend.',       answer: 'are' },
    { before: 'The dog',      after: 'brown.',           answer: 'is'  },
    { before: 'The books',    after: 'new.',             answer: 'are' },
    { before: 'I',            after: 'at home.',         answer: 'am'  },
    { before: 'Dana',         after: 'happy.',           answer: 'is'  },
    { before: 'We',           after: 'in class.',        answer: 'are' },
  ],
  [ // cycle 3
    { before: 'The school',   after: 'big.',             answer: 'is'  },
    { before: 'They',         after: 'at home.',         answer: 'are' },
    { before: 'I',            after: 'cold.',            answer: 'am'  },
    { before: 'My teacher',   after: 'nice.',            answer: 'is'  },
    { before: 'Tom and Ron',  after: 'brothers.',        answer: 'are' },
    { before: 'The baby',     after: 'cute.',            answer: 'is'  },
    { before: 'We',           after: 'friends.',         answer: 'are' },
    { before: 'I',            after: 'a boy.',           answer: 'am'  },
    { before: 'My sister',    after: 'tall.',            answer: 'is'  },
    { before: 'You',          after: 'kind.',            answer: 'are' },
  ],
]

// Ex4: click-based sentence builder (3 cycles × 6 sentences)
export interface TBSubject { text: string; verb: 'is' | 'are' }
export interface TBBuilderCycle { subjects: TBSubject[]; adjectives: string[] }
export const TB_EX4: TBBuilderCycle[] = [
  {
    subjects: [
      { text: 'My sister',  verb: 'is'  },
      { text: 'The boy',    verb: 'is'  },
      { text: 'My friends', verb: 'are' },
      { text: 'The dogs',   verb: 'are' },
      { text: 'The book',   verb: 'is'  },
      { text: 'My brother', verb: 'is'  },
    ],
    adjectives: ['angry', 'small', 'big', 'white', 'happy', 'cute'],
  },
  {
    subjects: [
      { text: 'The dog',      verb: 'is'  },
      { text: 'The boys',     verb: 'are' },
      { text: 'The book',     verb: 'is'  },
      { text: 'The teachers', verb: 'are' },
      { text: 'My dad',       verb: 'is'  },
      { text: 'The flowers',  verb: 'are' },
    ],
    adjectives: ['fast', 'young', 'new', 'nice', 'tired', 'pretty'],
  },
  {
    subjects: [
      { text: 'The baby',     verb: 'is'  },
      { text: 'The students', verb: 'are' },
      { text: 'My sister',    verb: 'is'  },
      { text: 'The cars',     verb: 'are' },
      { text: 'The teacher',  verb: 'is'  },
      { text: 'The birds',    verb: 'are' },
    ],
    adjectives: ['sick', 'smart', 'short', 'old', 'funny', 'loud'],
  },
]
