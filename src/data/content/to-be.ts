import type { SubjectLevel } from '@/types'

export const toBeLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Am / Is / Are',
    description: 'Learn the positive forms of "to be" — am, is, are — with every pronoun',
    words: [
      { english: 'I am',      hebrew: 'אֲנִי',       emoji: '🙋', example: 'I am ten years old.' },
      { english: 'You are',   hebrew: 'אַתָּה / אַתְּ', emoji: '🫵', example: 'You are a great student.' },
      { english: 'He is',     hebrew: 'הוּא',         emoji: '🧒', example: 'He is my brother.' },
      { english: 'She is',    hebrew: 'הִיא',         emoji: '👧', example: 'She is kind.' },
      { english: 'We are',    hebrew: 'אֲנַחְנוּ',    emoji: '👥', example: 'We are in class.' },
      { english: 'They are',  hebrew: 'הֵם',          emoji: '👫', example: 'They are funny.' },
    ],
    quiz: [
      {
        id: 'tb1q1', type: 'multiple-choice',
        question: 'Complete: "She ___ my best friend."', answer: 'is',
        options: ['am', 'is', 'are', 'be'], emoji: '👧',
      },
      {
        id: 'tb1q2', type: 'multiple-choice',
        question: 'Complete: "We ___ happy today."', answer: 'are',
        options: ['is', 'am', 'are', 'be'], emoji: '👥',
      },
      {
        id: 'tb1q3', type: 'multiple-choice',
        question: 'I ___ a student. (🙋)', answer: 'am',
        options: ['is', 'am', 'are', 'be'],
      },
      {
        id: 'tb1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: 'He is tall.',
        options: ['He are tall.', 'He am tall.', 'He is tall.', 'He be tall.'], emoji: '🧒',
      },
      {
        id: 'tb1q5', type: 'multiple-choice',
        question: 'They ___ my friends. (👫)', answer: 'are',
        options: ['am', 'is', 'are', 'be'],
      },
    ],
  },
  {
    level: 2,
    title: "Am Not / Isn't / Aren't",
    description: 'Learn the negative forms — am not, is not (isn\'t), are not (aren\'t)',
    words: [
      { english: "I'm not",    hebrew: 'אֲנִי לֹא',  emoji: '🙅', example: "I'm not tired." },
      { english: "You aren't", hebrew: 'אַתָּה לֹא', emoji: '🫵', example: "You aren't late." },
      { english: "He isn't",   hebrew: 'הוּא לֹא',  emoji: '🧒', example: "He isn't sad." },
      { english: "She isn't",  hebrew: 'הִיא לֹא',  emoji: '👧', example: "She isn't angry." },
      { english: "We aren't",  hebrew: 'אֲנַחְנוּ לֹא', emoji: '👥', example: "We aren't ready yet." },
      { english: "They aren't",hebrew: 'הֵם לֹא',   emoji: '👫', example: "They aren't at school." },
    ],
    quiz: [
      {
        id: 'tb2q1', type: 'multiple-choice',
        question: 'Complete: "She ___ happy — she is sad."', answer: "isn't",
        options: ["isn't", "aren't", "am not", "is not be"], emoji: '👧',
      },
      {
        id: 'tb2q2', type: 'multiple-choice',
        question: "I ___ tired. (🙅)", answer: "am not",
        options: ["am not", "isn't", "aren't", "be not"],
      },
      {
        id: 'tb2q3', type: 'multiple-choice',
        question: 'Which is correct?', answer: "They aren't late.",
        options: ["They isn't late.", "They aren't late.", "They amn't late.", "They not are late."], emoji: '👫',
      },
      {
        id: 'tb2q4', type: 'multiple-choice',
        question: '"He ___ my brother." (negative)', answer: "isn't",
        options: ["aren't", "isn't", "am not", "not is"], emoji: '🧒',
      },
      {
        id: 'tb2q5', type: 'multiple-choice',
        question: "We ___ late. (👥)", answer: "aren't",
        options: ["isn't", "am not", "aren't", "not are"],
      },
    ],
  },
  {
    level: 3,
    title: 'Am I? / Are you? / Is he?',
    description: 'Form yes/no questions with to be and give short answers',
    words: [
      { english: 'Am I?',       hebrew: 'האם אני?',       emoji: '🙋', example: 'Am I late? No, you are not.' },
      { english: 'Are you?',    hebrew: 'האם אתה/את?',     emoji: '🫵', example: 'Are you ready? Yes, I am.' },
      { english: 'Is he/she?',  hebrew: 'האם הוא/היא?',    emoji: '🤔', example: 'Is she a teacher? Yes, she is.' },
      { english: 'Are we?',     hebrew: 'האם אנחנו?',      emoji: '👥', example: 'Are we on time? Yes, we are.' },
      { english: 'Yes, ... am/is/are', hebrew: 'כן',       emoji: '✅', example: 'Yes, I am. Yes, she is.' },
      { english: 'No, ... not', hebrew: 'לא',              emoji: '❌', example: "No, I'm not. No, he isn't." },
    ],
    quiz: [
      {
        id: 'tb3q1', type: 'multiple-choice',
        question: 'How do you ask "Is she a student?" (question form)', answer: 'Is she a student?',
        options: ['She is a student?', 'Is she a student?', 'Does she a student?', 'Is a student she?'], emoji: '🤔',
      },
      {
        id: 'tb3q2', type: 'multiple-choice',
        question: '___ you ready? (🫵)', answer: 'are',
        options: ['is', 'am', 'are', 'be'],
      },
      {
        id: 'tb3q3', type: 'multiple-choice',
        question: 'Short answer: "Are you happy?" → "Yes, ___"', answer: 'Yes, I am.',
        options: ['Yes, I am.', 'Yes, I be.', 'Yes, I is.', 'Yes, am I.'], emoji: '✅',
      },
      {
        id: 'tb3q4', type: 'multiple-choice',
        question: '"Is he tired?" → short negative answer', answer: "No, he isn't.",
        options: ["No, he isn't.", "No, he aren't.", "No, he amn't.", "No, is not he."], emoji: '❌',
      },
      {
        id: 'tb3q5', type: 'multiple-choice',
        question: '___ she your teacher? (🤔)', answer: 'is',
        options: ['am', 'is', 'are', 'be'],
      },
    ],
  },
]
