import type { SubjectLevel } from '@/types'

export const toHaveLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Have and Has',
    description: 'Learn the positive forms of "to have" — have (I/you/we/they) and has (he/she/it)',
    words: [
      { english: 'I have',    hebrew: 'יֵשׁ לִי',    emoji: '👤', example: 'I have a dog.' },
      { english: 'You have',  hebrew: 'יֵשׁ לְךָ',   emoji: '🫵', example: 'You have a big bag.' },
      { english: 'He has',    hebrew: 'יֵשׁ לוֹ',    emoji: '🧒', example: 'He has a red bike.' },
      { english: 'She has',   hebrew: 'יֵשׁ לָהּ',   emoji: '👧', example: 'She has long hair.' },
      { english: 'We have',   hebrew: 'יֵשׁ לָנוּ',  emoji: '👥', example: 'We have a great teacher.' },
      { english: 'They have', hebrew: 'יֵשׁ לָהֶם',  emoji: '👫', example: 'They have a new house.' },
    ],
    quiz: [
      {
        id: 'th1q1', type: 'multiple-choice',
        question: 'Complete: "She ___ a cat."', answer: 'has',
        options: ['have', 'has', 'is', 'are'], emoji: '🐱',
      },
      {
        id: 'th1q2', type: 'multiple-choice',
        question: 'Complete: "We ___ a big house."', answer: 'have',
        options: ['has', 'have', 'is', 'are'], emoji: '🏠',
      },
      {
        id: 'th1q3', type: 'multiple-choice',
        question: 'He ___ a red bike. (🚲)', answer: 'has',
        options: ['have', 'has', 'is', 'are'],
      },
      {
        id: 'th1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: 'They have a dog.',
        options: ['They has a dog.', 'They have a dog.', 'They haves a dog.', 'They is have a dog.'], emoji: '🐶',
      },
      {
        id: 'th1q5', type: 'multiple-choice',
        question: 'I ___ a best friend. (👤)', answer: 'have',
        options: ['has', 'have', 'is', 'are'],
      },
    ],
  },
  {
    level: 2,
    title: "Don't Have / Doesn't Have",
    description: "Learn the negative and question forms — don't have, doesn't have, do/does…have?",
    words: [
      { english: "I don't have",      hebrew: 'אֵין לִי',    emoji: '🚫', example: "I don't have a pet." },
      { english: "He doesn't have",   hebrew: 'אֵין לוֹ',    emoji: '🧒', example: "He doesn't have a phone." },
      { english: "She doesn't have",  hebrew: 'אֵין לָהּ',   emoji: '👧', example: "She doesn't have a sister." },
      { english: 'Do you have?',      hebrew: 'יֵשׁ לְךָ?',  emoji: '❓', example: 'Do you have a pencil?' },
      { english: 'Does he have?',     hebrew: 'יֵשׁ לוֹ?',   emoji: '❓', example: 'Does he have a bike?' },
      { english: 'Does she have?',    hebrew: 'יֵשׁ לָהּ?',  emoji: '❓', example: 'Does she have a dog?' },
    ],
    quiz: [
      {
        id: 'th2q1', type: 'multiple-choice',
        question: 'Complete: "She ___ have a phone."', answer: "doesn't",
        options: ["don't", "doesn't", "hasn't", "isn't"], emoji: '📱',
      },
      {
        id: 'th2q2', type: 'multiple-choice',
        question: 'I ___ have a pet. (🚫)', answer: "don't",
        options: ["don't", "doesn't", "hasn't", "isn't"],
      },
      {
        id: 'th2q3', type: 'multiple-choice',
        question: 'How do you ask: "יֵשׁ לוֹ כֶּלֶב?"', answer: 'Does he have a dog?',
        options: ['He has a dog?', 'Does he have a dog?', 'Is he have a dog?', 'Have he a dog?'], emoji: '🐶',
      },
      {
        id: 'th2q4', type: 'multiple-choice',
        question: '"___ you have a ruler?" (question form)', answer: 'Do',
        options: ['Do', 'Does', 'Are', 'Is'], emoji: '📏',
      },
      {
        id: 'th2q5', type: 'multiple-choice',
        question: 'He ___ have a computer. (🧒)', answer: "doesn't",
        options: ["don't", "doesn't", "hasn't", "isn't"],
      },
    ],
  },
  {
    level: 3,
    title: "Possessive 's",
    description: "Learn to show ownership with apostrophe s — Lily's cat, the teacher's book",
    words: [
      { english: "Lily's dog",      hebrew: 'הכלב של לילי',    emoji: '🐶', example: "Lily's dog is called Max." },
      { english: "Tom's bike",      hebrew: 'האופניים של טום',  emoji: '🚲', example: "Tom's bike is red." },
      { english: "Mom's bag",       hebrew: 'התיק של אמא',      emoji: '👜', example: "Mom's bag is big." },
      { english: "The teacher's book", hebrew: 'הספר של המורה',emoji: '📚', example: "The teacher's book is on the desk." },
      { english: "My friend's house", hebrew: 'הבית של חברי',   emoji: '🏠', example: "My friend's house is near school." },
      { english: "Sarah's cat",     hebrew: 'החתול של שרה',     emoji: '🐱', example: "Sarah's cat is white." },
    ],
    quiz: [
      {
        id: 'th3q1', type: 'multiple-choice',
        question: 'How do we say "הַכֶּלֶב שֶׁל דָּוִד" in English?', answer: "David's dog",
        options: ["David dog", "Davids dog", "David's dog", "the dog of David's"], emoji: '🐶',
      },
      {
        id: 'th3q2', type: 'multiple-choice',
        question: "That is ___ book. (📚 — it belongs to the teacher)", answer: "teacher's",
        options: ["teachers", "teachers'", "teacher's", "the teacher"],
      },
      {
        id: 'th3q3', type: 'multiple-choice',
        question: 'Which is correct?', answer: "My sister's room is pink.",
        options: ["My sisters room is pink.", "My sister's room is pink.", "The room of my sister is pink.", "My sister room is pink."], emoji: '🌸',
      },
      {
        id: 'th3q4', type: 'multiple-choice',
        question: '"___ cat is sleeping." (the cat belongs to Sara)', answer: "Sara's",
        options: ["Sara", "Saras", "Sara's", "the Sara"], emoji: '🐱',
      },
      {
        id: 'th3q5', type: 'multiple-choice',
        question: "___ house has a big garden. (🏠 — it belongs to your friend)", answer: "friend's",
        options: ["friends", "friends'", "friend's", "the friend"],
      },
    ],
  },
]
