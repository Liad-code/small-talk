export type NegVerb = 'am not' | "isn't" | "aren't"

// Ex1: drag am not / isn't / aren't to fill blank (3 cycles × 10)
export interface TBNFillQ { before: string; after: string; answer: NegVerb }
export const TBN_EX1: TBNFillQ[][] = [
  [ // cycle 1
    { before: 'The horse',    after: 'white.',         answer: "isn't"  },
    { before: 'The girls',    after: 'at the park.',   answer: "aren't" },
    { before: 'I',            after: 'happy.',         answer: 'am not' },
    { before: 'She',          after: 'tall.',          answer: "isn't"  },
    { before: 'They',         after: 'at school.',     answer: "aren't" },
    { before: 'He',           after: 'my brother.',    answer: "isn't"  },
    { before: 'We',           after: 'tired.',         answer: "aren't" },
    { before: 'The cat',      after: 'big.',           answer: "isn't"  },
    { before: 'You',          after: 'late.',          answer: "aren't" },
    { before: 'The dog',      after: 'black.',         answer: "isn't"  },
  ],
  [ // cycle 2
    { before: 'I',            after: 'a teacher.',     answer: 'am not' },
    { before: 'The book',     after: 'on the table.',  answer: "isn't"  },
    { before: 'The boys',     after: 'in the garden.', answer: "aren't" },
    { before: 'She',          after: 'sad.',           answer: "isn't"  },
    { before: 'We',           after: 'ready.',         answer: "aren't" },
    { before: 'He',           after: 'a doctor.',      answer: "isn't"  },
    { before: 'They',         after: 'friends.',       answer: "aren't" },
    { before: 'The bird',     after: 'yellow.',        answer: "isn't"  },
    { before: 'You',          after: 'correct.',       answer: "aren't" },
    { before: 'I',            after: 'cold.',          answer: 'am not' },
  ],
  [ // cycle 3
    { before: 'The children', after: 'quiet.',         answer: "aren't" },
    { before: 'He',           after: 'at home.',       answer: "isn't"  },
    { before: 'I',            after: 'hungry.',        answer: 'am not' },
    { before: 'She',          after: 'my sister.',     answer: "isn't"  },
    { before: 'We',           after: 'in the park.',   answer: "aren't" },
    { before: 'The cake',     after: 'sweet.',         answer: "isn't"  },
    { before: 'They',         after: 'students.',      answer: "aren't" },
    { before: 'You',          after: 'wrong.',         answer: "aren't" },
    { before: 'The car',      after: 'new.',           answer: "isn't"  },
    { before: 'I',            after: 'afraid.',        answer: 'am not' },
  ],
]

// Ex2: click-based sentence builder (3 cycles × 6 sentences)
export interface TBNSubject { text: string; verb: NegVerb }
export interface TBNBuilderCycle { subjects: TBNSubject[]; complements: string[] }
export const TBN_EX2: TBNBuilderCycle[] = [
  {
    subjects: [
      { text: 'I',           verb: 'am not'  },
      { text: 'Adam',        verb: "isn't"   },
      { text: 'The teacher', verb: "isn't"   },
      { text: 'You',         verb: "aren't"  },
      { text: 'We',          verb: "aren't"  },
      { text: 'He',          verb: "isn't"   },
    ],
    complements: ['big', 'at home', 'a pupil', 'friends', 'in the classroom', 'happy'],
  },
  {
    subjects: [
      { text: 'She',         verb: "isn't"   },
      { text: 'The cat',     verb: "isn't"   },
      { text: 'They',        verb: "aren't"  },
      { text: 'Ron',         verb: "isn't"   },
      { text: 'We',          verb: "aren't"  },
      { text: 'I',           verb: 'am not'  },
    ],
    complements: ['tired', 'at school', 'happy', 'at the park', 'in the garden', 'young'],
  },
  {
    subjects: [
      { text: 'I',           verb: 'am not'  },
      { text: 'The dog',     verb: "isn't"   },
      { text: 'The birds',   verb: "aren't"  },
      { text: 'She',         verb: "isn't"   },
      { text: 'They',        verb: "aren't"  },
      { text: 'The boy',     verb: "isn't"   },
    ],
    complements: ['funny', 'at home', 'quiet', 'cold', 'hungry', 'small'],
  },
]
