// Ex1: drag subjects to am/is/are buckets (ONE cycle, 20 words total)
export interface ToBeBucket { verb: 'am' | 'is' | 'are'; subjects: string[] }
export const TB_EX1: ToBeBucket[] = [
  { verb: 'am',  subjects: ['I'] },
  { verb: 'is',  subjects: ['he', 'she', 'it', 'Ron', 'Dana', 'my mom', 'the cat', 'the dog', 'the teacher', 'the cake'] },
  { verb: 'are', subjects: ['you', 'we', 'they', 'the boys', 'books', 'my friends', 'the cats', 'Tom and Ron', 'you and Dana'] },
]

// Ex2: click am/is/are for sentence (3 cycles × 10)
export interface TBChoiceQ { sentence: string; answer: 'am' | 'is' | 'are' }
export const TB_EX2: TBChoiceQ[][] = [
  [ // cycle 1
    { sentence: 'The cat ___ black.',           answer: 'is'  },
    { sentence: 'We ___ happy.',                answer: 'are' },
    { sentence: 'I ___ hungry.',                answer: 'am'  },
    { sentence: 'The boys ___ tall.',           answer: 'are' },
    { sentence: 'She ___ a teacher.',           answer: 'is'  },
    { sentence: 'You ___ my friend.',           answer: 'are' },
    { sentence: 'The book ___ new.',            answer: 'is'  },
    { sentence: 'They ___ at school.',          answer: 'are' },
    { sentence: 'He ___ my dad.',               answer: 'is'  },
    { sentence: 'My dog ___ brown.',            answer: 'is'  },
  ],
  [ // cycle 2
    { sentence: 'The girls ___ at home.',       answer: 'are' },
    { sentence: 'I ___ a student.',             answer: 'am'  },
    { sentence: 'Ron ___ tall.',                answer: 'is'  },
    { sentence: 'We ___ friends.',              answer: 'are' },
    { sentence: 'The baby ___ small.',          answer: 'is'  },
    { sentence: 'You ___ kind.',                answer: 'are' },
    { sentence: 'The teachers ___ nice.',       answer: 'are' },
    { sentence: 'It ___ cold.',                 answer: 'is'  },
    { sentence: 'My sister ___ at school.',     answer: 'is'  },
    { sentence: 'Dana and Ron ___ happy.',      answer: 'are' },
  ],
  [ // cycle 3
    { sentence: 'The computer ___ new.',        answer: 'is'  },
    { sentence: 'We ___ in class.',             answer: 'are' },
    { sentence: 'Tom ___ my friend.',           answer: 'is'  },
    { sentence: 'I ___ at home.',               answer: 'am'  },
    { sentence: 'The cats ___ hungry.',         answer: 'are' },
    { sentence: 'She ___ tall.',                answer: 'is'  },
    { sentence: 'You and I ___ friends.',       answer: 'are' },
    { sentence: 'The cake ___ big.',            answer: 'is'  },
    { sentence: 'They ___ my parents.',         answer: 'are' },
    { sentence: 'My mom ___ a nurse.',          answer: 'is'  },
  ],
]

// Ex3: drag am/is/are into blank (3 cycles × 10)
export interface TBFillQ { before: string; after: string; answer: 'am' | 'is' | 'are' }
export const TB_EX3: TBFillQ[][] = [
  [ // cycle 1
    { before: 'I',            after: 'hungry.',          answer: 'am'  },
    { before: 'My telephone', after: 'red.',             answer: 'is'  },
    { before: 'My friends',   after: 'in my class.',     answer: 'are' },
    { before: 'My dad',       after: 'a teacher.',       answer: 'is'  },
    { before: 'We',           after: 'happy.',           answer: 'are' },
    { before: 'She',          after: 'my sister.',       answer: 'is'  },
    { before: 'The cats',     after: 'small.',           answer: 'are' },
    { before: 'I',            after: 'a student.',       answer: 'am'  },
    { before: 'The cake',     after: 'big.',             answer: 'is'  },
    { before: 'They',         after: 'at school.',       answer: 'are' },
  ],
  [ // cycle 2
    { before: 'You',          after: 'my friend.',       answer: 'are' },
    { before: 'He',           after: 'tall.',            answer: 'is'  },
    { before: 'The boys',     after: 'in the park.',     answer: 'are' },
    { before: 'I',            after: 'at home.',         answer: 'am'  },
    { before: 'My mom',       after: 'a doctor.',        answer: 'is'  },
    { before: 'The dog',      after: 'brown.',           answer: 'is'  },
    { before: 'We',           after: 'in class.',        answer: 'are' },
    { before: 'Dana',         after: 'happy.',           answer: 'is'  },
    { before: 'I',            after: 'tired.',           answer: 'am'  },
    { before: 'The books',    after: 'new.',             answer: 'are' },
  ],
  [ // cycle 3
    { before: 'I',            after: 'a boy.',           answer: 'am'  },
    { before: 'The school',   after: 'big.',             answer: 'is'  },
    { before: 'Tom and Ron',  after: 'brothers.',        answer: 'are' },
    { before: 'My teacher',   after: 'nice.',            answer: 'is'  },
    { before: 'They',         after: 'at home.',         answer: 'are' },
    { before: 'I',            after: 'cold.',            answer: 'am'  },
    { before: 'The baby',     after: 'cute.',            answer: 'is'  },
    { before: 'You',          after: 'kind.',            answer: 'are' },
    { before: 'My sister',    after: 'tall.',            answer: 'is'  },
    { before: 'We',           after: 'friends.',         answer: 'are' },
  ],
]

// Ex4: click-based sentence builder (3 cycles × 6 sentences)
export interface TBSubject { text: string; verb: 'is' | 'are' }
export interface TBBuilderCycle { subjects: TBSubject[]; adjectives: string[] }
export const TB_EX4: TBBuilderCycle[] = [
  {
    subjects: [
      { text: 'Mother',     verb: 'is'  },
      { text: 'The baby',   verb: 'is'  },
      { text: 'The girls',  verb: 'are' },
      { text: 'The cats',   verb: 'are' },
      { text: 'The cake',   verb: 'is'  },
      { text: 'My brother', verb: 'is'  },
    ],
    adjectives: ['hungry', 'small', 'big', 'tall', 'happy', 'cute'],
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
