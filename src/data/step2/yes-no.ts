export type YNVerb = 'Am' | 'Is' | 'Are'
export type PronounGroup = 'i' | 'she' | 'he' | 'it' | 'we' | 'you' | 'they'

// Ex1: drag Am/Is/Are to start of question (1 cycle × 12)
export interface YNEx1Q { after: string; answer: YNVerb }
export const YN_EX1: YNEx1Q[] = [
  { after: 'they pupils?',         answer: 'Are' },
  { after: 'I hungry?',            answer: 'Am'  },
  { after: 'we in the kitchen?',   answer: 'Are' },
  { after: 'Ronit short?',         answer: 'Is'  },
  { after: 'they friends?',        answer: 'Are' },
  { after: 'she a teacher?',       answer: 'Is'  },
  { after: 'you happy?',           answer: 'Are' },
  { after: 'the cat black?',       answer: 'Is'  },
  { after: 'I late?',              answer: 'Am'  },
  { after: 'the boys at school?',  answer: 'Are' },
  { after: 'he tall?',             answer: 'Is'  },
  { after: 'we ready?',            answer: 'Are' },
]

// Ex2: question sentence builder (3 cycles × 6)
export interface YNSubject { text: string; verb: YNVerb }
export interface YNBuilderCycle { subjects: YNSubject[]; complements: string[] }
export const YN_EX2: YNBuilderCycle[] = [
  {
    subjects: [
      { text: 'I',            verb: 'Am'  },
      { text: 'you',          verb: 'Are' },
      { text: 'your friends', verb: 'Are' },
      { text: 'the teacher',  verb: 'Is'  },
      { text: 'the dog',      verb: 'Is'  },
      { text: 'she',          verb: 'Is'  },
    ],
    complements: ['at home?', 'tired?', 'hungry?', 'late?', 'at school?', 'ready?'],
  },
  {
    subjects: [
      { text: 'I',       verb: 'Am'  },
      { text: 'he',      verb: 'Is'  },
      { text: 'they',    verb: 'Are' },
      { text: 'the cat', verb: 'Is'  },
      { text: 'we',      verb: 'Are' },
      { text: 'you',     verb: 'Are' },
    ],
    complements: ['happy?', 'at the park?', 'in the garden?', 'young?', 'cold?', 'funny?'],
  },
  {
    subjects: [
      { text: 'I',            verb: 'Am'  },
      { text: 'she',          verb: 'Is'  },
      { text: 'the children', verb: 'Are' },
      { text: 'Ron',          verb: 'Is'  },
      { text: 'we',           verb: 'Are' },
      { text: 'they',         verb: 'Are' },
    ],
    complements: ['tall?', 'at home?', 'quiet?', 'hungry?', 'in the classroom?', 'fast?'],
  },
]

// Ex3: click yes/no answer for the question (15 questions)
export interface YNEx3Q { question: string; group: PronounGroup }
export const YN_EX3: YNEx3Q[] = [
  { question: 'Am I a student?',        group: 'i'    },
  { question: 'Is she happy?',          group: 'she'  },
  { question: 'Are they friends?',      group: 'they' },
  { question: 'Is he tall?',            group: 'he'   },
  { question: 'Are we ready?',          group: 'we'   },
  { question: 'Is it big?',             group: 'it'   },
  { question: 'Are you tired?',         group: 'you'  },
  { question: 'Am I late?',             group: 'i'    },
  { question: 'Is she at home?',        group: 'she'  },
  { question: 'Are they at school?',    group: 'they' },
  { question: 'Is he a teacher?',       group: 'he'   },
  { question: 'Are we in the park?',    group: 'we'   },
  { question: 'Is it fast?',            group: 'it'   },
  { question: 'Are you happy?',         group: 'you'  },
  { question: 'Are they hungry?',       group: 'they' },
]

export const YN_ANSWER_BANK: Record<PronounGroup, { yes: string; no: string }> = {
  i:    { yes: 'Yes, I am',     no: "No, I'm not"     },
  she:  { yes: 'Yes, she is',   no: "No, she isn't"   },
  he:   { yes: 'Yes, he is',    no: "No, he isn't"    },
  it:   { yes: 'Yes, it is',    no: "No, it isn't"    },
  we:   { yes: 'Yes, we are',   no: "No, we aren't"   },
  you:  { yes: 'Yes, you are',  no: "No, you aren't"  },
  they: { yes: 'Yes, they are', no: "No, they aren't" },
}

export const PRONOUN_GROUPS: PronounGroup[] = ['i', 'she', 'he', 'it', 'we', 'you', 'they']
