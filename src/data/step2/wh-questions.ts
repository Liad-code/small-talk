export const WH_WORDS = [
  { word: 'Who?',   hebrew: 'מי?',   bg: 'bg-blue-500',   light: 'bg-blue-100',   text: 'text-blue-700'   },
  { word: 'What?',  hebrew: 'מה?',   bg: 'bg-green-500',  light: 'bg-green-100',  text: 'text-green-700'  },
  { word: 'Where?', hebrew: 'איפה?', bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700' },
  { word: 'When?',  hebrew: 'מתי?',  bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700' },
  { word: 'Why?',   hebrew: 'למה?',  bg: 'bg-rose-500',   light: 'bg-rose-100',   text: 'text-rose-700'   },
  { word: 'How?',   hebrew: 'איך?',  bg: 'bg-teal-500',   light: 'bg-teal-100',   text: 'text-teal-700'   },
]

export const WH_WORD_COLORS: Record<string, { bg: string; light: string; text: string }> = {
  Who:   { bg: 'bg-blue-500',   light: 'bg-blue-100',   text: 'text-blue-700'   },
  What:  { bg: 'bg-green-500',  light: 'bg-green-100',  text: 'text-green-700'  },
  Where: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700' },
  When:  { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700' },
  Why:   { bg: 'bg-rose-500',   light: 'bg-rose-100',   text: 'text-rose-700'   },
  How:   { bg: 'bg-teal-500',   light: 'bg-teal-100',   text: 'text-teal-700'   },
}

// Ex1: pick the correct WH word (10 questions)
export interface WHEx1Q {
  sentence: string  // "is in the classroom?" — WH word is missing from start
  options: string[] // 3 WH word choices
  answer: string    // correct WH word
  hint: string      // answer hint in parentheses
}
export const WH_EX1: WHEx1Q[] = [
  { sentence: 'is in the classroom?',   options: ['Where', 'When',  'Who'],   answer: 'Who',   hint: 'The teacher.'          },
  { sentence: 'is your mom?',           options: ['What',  'Where', 'Who'],   answer: 'Where', hint: 'At the park.'           },
  { sentence: 'is your favorite book?', options: ['When',  'What',  'Why'],   answer: 'What',  hint: 'Harry Potter.'          },
  { sentence: 'is the party?',          options: ['When',  'How',   'Who'],   answer: 'When',  hint: 'On Sunday.'             },
  { sentence: 'is English class?',      options: ['How',   'Why',   'What'],  answer: 'How',   hint: "It's fun!"              },
  { sentence: 'is your best friend?',   options: ['Where', 'What',  'Who'],   answer: 'Who',   hint: 'Dana.'                  },
  { sentence: 'is your birthday?',      options: ['When',  'Where', 'Why'],   answer: 'When',  hint: 'In July.'               },
  { sentence: 'color is your shirt?',   options: ['What',  'Who',   'Where'], answer: 'What',  hint: "It's blue."             },
  { sentence: 'are you crying?',        options: ['Who',   'Why',   'When'],  answer: 'Why',   hint: "Because I'm sad."       },
  { sentence: 'is your school?',        options: ['What',  'Where', 'Who'],   answer: 'Where', hint: 'On Green Street.'       },
]

// Ex2: dialogue matching — pick WH question for each answer (3 cycles × 6)
export interface WHDialogue {
  asker: string
  answerer: string
  answer: string    // the given answer text
  question: string  // correct WH question to select
}
export interface WHDialogueCycle {
  bank: string[]
  dialogues: WHDialogue[]
}
export const WH_EX2: WHDialogueCycle[] = [
  {
    bank: [
      'How are you?',
      'Where is your sister?',
      'Who is your doctor?',
      'When is the party?',
      'Why are you late?',
      'What is your favorite color?',
    ],
    dialogues: [
      { asker: 'Ora',    answerer: 'Gilit', answer: "I'm fine, thank you.",   question: 'How are you?'                },
      { asker: 'Shlomi', answerer: 'Eyal',  answer: 'On Sunday.',             question: 'When is the party?'          },
      { asker: 'Irit',   answerer: 'Nava',  answer: 'At school.',             question: 'Where is your sister?'       },
      { asker: 'Sapir',  answerer: 'Tomer', answer: 'Because I missed the bus.', question: 'Why are you late?'       },
      { asker: 'Yossi',  answerer: 'Gadi',  answer: 'Dr. Stone.',             question: 'Who is your doctor?'         },
      { asker: 'Maya',   answerer: 'Ron',   answer: 'Blue.',                  question: 'What is your favorite color?'},
    ],
  },
  {
    bank: [
      'Where do you live?',
      'When is your birthday?',
      'Who is your teacher?',
      'How is your day?',
      'Why are you happy?',
      'What is in your bag?',
    ],
    dialogues: [
      { asker: 'Dan',   answerer: 'Noa',   answer: 'On Oak Street.',          question: 'Where do you live?'          },
      { asker: 'Lior',  answerer: 'Tamar', answer: 'In March.',               question: 'When is your birthday?'      },
      { asker: 'Benny', answerer: 'Keren', answer: 'Mr. Cohen.',              question: 'Who is your teacher?'        },
      { asker: 'Amit',  answerer: 'Sigal', answer: 'Great, thanks!',          question: 'How is your day?'            },
      { asker: 'Rani',  answerer: 'Dina',  answer: 'Because we have a trip.', question: 'Why are you happy?'          },
      { asker: 'Gal',   answerer: 'Avi',   answer: 'Books and a pencil.',     question: 'What is in your bag?'        },
    ],
  },
  {
    bank: [
      'Where is the school?',
      'What is your favorite food?',
      'When is the test?',
      'Who is at the door?',
      'Why is the dog wet?',
      'How old are you?',
    ],
    dialogues: [
      { asker: 'Moshe', answerer: 'Ruth',  answer: 'Next to the park.',       question: 'Where is the school?'        },
      { asker: 'Dov',   answerer: 'Anat',  answer: 'Pizza!',                  question: 'What is your favorite food?' },
      { asker: 'Sima',  answerer: 'Yair',  answer: 'On Friday.',              question: 'When is the test?'           },
      { asker: 'Pnina', answerer: 'Eli',   answer: "It's mom!",               question: 'Who is at the door?'         },
      { asker: 'Roni',  answerer: 'Shira', answer: "Because it's raining.",   question: 'Why is the dog wet?'         },
      { asker: 'Hila',  answerer: 'Tom',   answer: "I'm nine years old.",     question: 'How old are you?'            },
    ],
  },
]
