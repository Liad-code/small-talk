import type { SubjectLevel } from '@/types'

export const thereIsLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'There Is / There Are',
    description: 'Learn to say what exists somewhere — "there is" (singular) and "there are" (plural)',
    words: [
      { english: 'There is',      hebrew: 'יֵשׁ',    emoji: '☝️', example: 'There is a dog in the garden.' },
      { english: 'There are',     hebrew: 'יֵשׁ',    emoji: '✌️', example: 'There are three cats.' },
      { english: 'There is a cat', hebrew: 'יֵשׁ חָתוּל', emoji: '🐱', example: 'There is a cat on the roof.' },
      { english: 'There is a book', hebrew: 'יֵשׁ סֵפֶר', emoji: '📚', example: 'There is a book on the desk.' },
      { english: 'There are two birds', hebrew: 'יֵשׁ שְׁנֵי צִפּוֹרִים', emoji: '🐦', example: 'There are two birds in the tree.' },
      { english: 'There are many children', hebrew: 'יֵשׁ הַרְבֵּה יְלָדִים', emoji: '👦', example: 'There are many children in the park.' },
    ],
    quiz: [
      {
        id: 'ti1q1', type: 'multiple-choice',
        question: '"___ a dog in the garden." (one dog)', answer: 'There is',
        options: ['There are', 'There is', 'There have', 'There be'], emoji: '🐶',
      },
      {
        id: 'ti1q2', type: 'multiple-choice',
        question: '"___ three cats on the roof." (more than one)', answer: 'There are',
        options: ['There is', 'There are', 'There have', 'There be'], emoji: '🐱',
      },
      {
        id: 'ti1q3', type: 'multiple-choice',
        question: 'There ___ a book on the table. (📚 — one book)', answer: 'is',
        options: ['is', 'are', 'have', 'be'],
      },
      {
        id: 'ti1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: 'There are five students in the room.',
        options: ['There is five students in the room.', 'There are five students in the room.', 'There have five students in the room.', 'Five students there are in the room.'], emoji: '🏫',
      },
      {
        id: 'ti1q5', type: 'multiple-choice',
        question: 'There ___ many children in the park. (👦 — plural)', answer: 'are',
        options: ['is', 'are', 'have', 'be'],
      },
    ],
  },
  {
    level: 2,
    title: "There Isn't / There Aren't",
    description: "Learn the negative forms — there isn't and there aren't",
    words: [
      { english: "There isn't",      hebrew: 'אֵין',     emoji: '🚫', example: "There isn't a pool here." },
      { english: "There aren't",     hebrew: 'אֵין',     emoji: '❌', example: "There aren't any dogs." },
      { english: "There isn't any",  hebrew: 'אֵין שׁוּם', emoji: '🔇', example: "There isn't any milk left." },
      { english: "There aren't any", hebrew: 'אֵין שׁוּם', emoji: '🈚', example: "There aren't any chairs." },
      { english: "There is no",      hebrew: 'אֵין',     emoji: '🚷', example: "There is no school today." },
      { english: "There are no",     hebrew: 'אֵין',     emoji: '📵', example: "There are no apples left." },
    ],
    quiz: [
      {
        id: 'ti2q1', type: 'multiple-choice',
        question: '"___ a pool here." (one pool, negative)', answer: "There isn't",
        options: ["There isn't", "There aren't", "There is", "There are no"], emoji: '🏊',
      },
      {
        id: 'ti2q2', type: 'multiple-choice',
        question: 'There ___ any chairs in the room. (❌ — no chairs)', answer: "aren't",
        options: ["isn't", "aren't", "is no", "are no"],
      },
      {
        id: 'ti2q3', type: 'multiple-choice',
        question: 'Which is correct?', answer: "There isn't any milk.",
        options: ["There aren't any milk.", "There isn't any milk.", "There is no milks.", "There are no milk."], emoji: '🥛',
      },
      {
        id: 'ti2q4', type: 'multiple-choice',
        question: '"אֵין" with a plural noun uses:', answer: "There aren't",
        options: ["There isn't", "There aren't", "There is no", "There be no"], emoji: '❌',
      },
      {
        id: 'ti2q5', type: 'multiple-choice',
        question: 'There ___ school today. (🎉 — no school)', answer: "is no",
        options: ["isn't", "aren't", "is no", "are no"],
      },
    ],
  },
  {
    level: 3,
    title: 'Is There? / Are There?',
    description: 'Ask questions with "Is there…?" and "Are there…?" and give short answers',
    words: [
      { english: 'Is there…?',        hebrew: 'הַאִם יֵשׁ…?', emoji: '❓', example: 'Is there a toilet nearby?' },
      { english: 'Are there…?',       hebrew: 'הַאִם יֵשׁ…?', emoji: '❓', example: 'Are there any apples?' },
      { english: 'Yes, there is.',    hebrew: 'כֵּן, יֵשׁ.',   emoji: '✅', example: 'Is there a cat? Yes, there is.' },
      { english: 'No, there isn\'t.', hebrew: 'לֹא, אֵין.',   emoji: '❌', example: "Is there milk? No, there isn't." },
      { english: 'Yes, there are.',   hebrew: 'כֵּן, יֵשׁ.',   emoji: '✅', example: 'Are there chairs? Yes, there are.' },
      { english: "No, there aren't.", hebrew: 'לֹא, אֵין.',   emoji: '❌', example: "Are there dogs? No, there aren't." },
    ],
    quiz: [
      {
        id: 'ti3q1', type: 'multiple-choice',
        question: 'How do you ask "יֵשׁ כֶּלֶב בַּבַּיִת?" in English?', answer: 'Is there a dog in the house?',
        options: ['There is a dog in the house?', 'Is there a dog in the house?', 'Are there a dog in the house?', 'Does there a dog in the house?'], emoji: '🐶',
      },
      {
        id: 'ti3q2', type: 'multiple-choice',
        question: '___ there a school near here? (❓)', answer: 'is',
        options: ['is', 'are', 'has', 'have'],
      },
      {
        id: 'ti3q3', type: 'multiple-choice',
        question: '"Are there any chairs?" → short positive answer', answer: 'Yes, there are.',
        options: ['Yes, there is.', 'Yes, there are.', 'Yes, they are.', 'Yes, are there.'], emoji: '✅',
      },
      {
        id: 'ti3q4', type: 'multiple-choice',
        question: '"Is there any milk?" → short negative answer', answer: "No, there isn't.",
        options: ["No, there is.", "No, there aren't.", "No, there isn't.", "No, it isn't."], emoji: '❌',
      },
      {
        id: 'ti3q5', type: 'multiple-choice',
        question: '___ there any students in the classroom? (👦 — plural)', answer: 'are',
        options: ['is', 'are', 'has', 'have'],
      },
    ],
  },
]
