import type { SubjectLevel } from '@/types'

export const articlesLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'A or An?',
    description: 'Learn when to use "a" (before consonants) and "an" (before vowel sounds)',
    words: [
      { english: 'A dog',     hebrew: 'כֶּלֶב',    emoji: '🐶', example: 'I have a dog.' },
      { english: 'A cat',     hebrew: 'חָתוּל',    emoji: '🐱', example: 'She has a cat.' },
      { english: 'An apple',  hebrew: 'תַּפּוּחַ',  emoji: '🍎', example: 'I eat an apple.' },
      { english: 'An egg',    hebrew: 'בֵּיצָה',   emoji: '🥚', example: 'He eats an egg.' },
      { english: 'An orange', hebrew: 'תַּפּוּז',   emoji: '🍊', example: 'She has an orange.' },
      { english: 'A book',    hebrew: 'סֵפֶר',    emoji: '📚', example: 'I read a book.' },
    ],
    quiz: [
      {
        id: 'at1q1', type: 'multiple-choice',
        question: 'Which is correct: "___ elephant"?', answer: 'an elephant',
        options: ['a elephant', 'an elephant', 'the elephant', 'elephants'], emoji: '🐘',
      },
      {
        id: 'at1q2', type: 'multiple-choice',
        question: 'Which is correct: "___ banana"?', answer: 'a banana',
        options: ['an banana', 'a banana', 'the banana', 'bananas'], emoji: '🍌',
      },
      {
        id: 'at1q3', type: 'multiple-choice',
        question: 'I eat ___ apple every day. (🍎)', answer: 'an',
        options: ['a', 'an', 'the', 'no article'],
      },
      {
        id: 'at1q4', type: 'multiple-choice',
        question: '"An" is used before words that start with:', answer: 'a vowel sound (a, e, i, o, u)',
        options: ['any letter', 'a vowel sound (a, e, i, o, u)', 'the letter s', 'a big word'], emoji: '🔤',
      },
      {
        id: 'at1q5', type: 'multiple-choice',
        question: 'She has ___ dog. (🐶)', answer: 'a',
        options: ['a', 'an', 'the', 'no article'],
      },
    ],
  },
  {
    level: 2,
    title: 'The',
    description: 'Learn when to use "the" — for specific, known things',
    words: [
      { english: 'The sun',     hebrew: 'הַשֶּׁמֶשׁ', emoji: '☀️', example: 'The sun is bright.' },
      { english: 'The school',  hebrew: 'בֵּית הַסֵּפֶר', emoji: '🏫', example: 'I love the school.' },
      { english: 'The teacher', hebrew: 'הַמּוֹרֶה', emoji: '👩‍🏫', example: 'The teacher is kind.' },
      { english: 'The dog',     hebrew: 'הַכֶּלֶב', emoji: '🐶', example: 'The dog is mine.' },
      { english: 'The book',    hebrew: 'הַסֵּפֶר', emoji: '📚', example: 'Open the book to page 5.' },
      { english: 'The class',   hebrew: 'הַכִּיתָה', emoji: '🏫', example: 'The class is quiet.' },
    ],
    quiz: [
      {
        id: 'at2q1', type: 'multiple-choice',
        question: '"___ sun rises in the morning." — which article?', answer: 'The',
        options: ['A', 'An', 'The', 'no article'], emoji: '☀️',
      },
      {
        id: 'at2q2', type: 'multiple-choice',
        question: 'Close ___ door, please. (🚪)', answer: 'the',
        options: ['a', 'an', 'the', 'no article'],
      },
      {
        id: 'at2q3', type: 'multiple-choice',
        question: 'When do we use "the"?', answer: 'When we talk about a specific thing both speaker and listener know',
        options: [
          'Before all nouns',
          'When we talk about a specific thing both speaker and listener know',
          'Only before vowel sounds',
          'Only in questions',
        ], emoji: '📌',
      },
      {
        id: 'at2q4', type: 'multiple-choice',
        question: 'First time: "I saw ___ dog." Second time: "___ dog was big."', answer: 'a … The',
        options: ['the … a', 'a … The', 'an … The', 'the … the'], emoji: '🐶',
      },
      {
        id: 'at2q5', type: 'multiple-choice',
        question: '___ teacher wrote on the board. (👩‍🏫)', answer: 'the',
        options: ['a', 'an', 'the', 'no article'],
      },
    ],
  },
  {
    level: 3,
    title: 'A, An, The or Nothing?',
    description: 'Choose the right article — or no article — in full sentences',
    words: [
      { english: 'A / An (first mention)', hebrew: 'הזכרה ראשונה', emoji: '1️⃣', example: 'I found a coin.' },
      { english: 'The (second mention)',   hebrew: 'הזכרה חוזרת',  emoji: '2️⃣', example: 'The coin was gold.' },
      { english: 'The (unique things)',    hebrew: 'דברים יחידים', emoji: '🌍', example: 'The moon is full.' },
      { english: 'No article (names)',     hebrew: 'שמות פרטיים',  emoji: '🙋', example: 'David is my friend.' },
      { english: 'No article (languages)', hebrew: 'שפות',         emoji: '🗣️', example: 'She speaks English.' },
      { english: 'No article (subjects)',  hebrew: 'מקצועות לימוד',emoji: '📐', example: 'I like maths.' },
    ],
    quiz: [
      {
        id: 'at3q1', type: 'multiple-choice',
        question: '"She speaks ___ Hebrew." — which article?', answer: 'no article',
        options: ['a', 'an', 'the', 'no article'], emoji: '🗣️',
      },
      {
        id: 'at3q2', type: 'multiple-choice',
        question: '___ moon is beautiful tonight. (🌙)', answer: 'the',
        options: ['a', 'an', 'the', 'no article'],
      },
      {
        id: 'at3q3', type: 'multiple-choice',
        question: '"I have ___ idea!" (one idea, first mention)', answer: 'an',
        options: ['a', 'an', 'the', 'no article'], emoji: '💡',
      },
      {
        id: 'at3q4', type: 'multiple-choice',
        question: '"___ London is in England." — correct?', answer: 'No article — London is a name',
        options: ['A London is in England.', 'An London is in England.', 'The London is in England.', 'No article — London is a name'], emoji: '🏙️',
      },
      {
        id: 'at3q5', type: 'multiple-choice',
        question: 'I have ___ dog. His name is Max. (🐶)', answer: 'a',
        options: ['a', 'an', 'the', 'no article'],
      },
    ],
  },
]
