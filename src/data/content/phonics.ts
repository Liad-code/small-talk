import type { SubjectLevel } from '@/types'

export const phonicsLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Short Vowels',
    description: 'Learn the five short vowel sounds: a, e, i, o, u',
    words: [
      { english: 'cat', hebrew: 'חתול',  emoji: '🐱', example: '"cat" has a short "a" sound.' },
      { english: 'bed', hebrew: 'מיטה',  emoji: '🛏️', example: '"bed" has a short "e" sound.' },
      { english: 'pig', hebrew: 'חזיר',  emoji: '🐷', example: '"pig" has a short "i" sound.' },
      { english: 'dog', hebrew: 'כלב',   emoji: '🐶', example: '"dog" has a short "o" sound.' },
      { english: 'cup', hebrew: 'כוס',   emoji: '🥤', example: '"cup" has a short "u" sound.' },
      { english: 'hat', hebrew: 'כובע',  emoji: '🎩', example: '"hat" has a short "a" sound.' },
    ],
    quiz: [
      {
        id: 'p1q1', type: 'multiple-choice',
        question: 'Which word has a short "a" sound? 🐱',
        answer: 'cat', options: ['bed', 'pig', 'cat', 'dog'],
      },
      {
        id: 'p1q2', type: 'multiple-choice',
        question: 'Which word has a short "e" sound? 🛏️',
        answer: 'bed', options: ['cat', 'bed', 'cup', 'hat'],
      },
      {
        id: 'p1q3', type: 'multiple-choice',
        question: 'Which word has a short "i" sound? 🐷',
        answer: 'pig', options: ['dog', 'cup', 'pig', 'hat'],
      },
      {
        id: 'p1q4', type: 'multiple-choice',
        question: 'Which word has a short "o" sound? 🐶',
        answer: 'dog', options: ['cat', 'dog', 'bed', 'pig'],
      },
      {
        id: 'p1q5', type: 'multiple-choice',
        question: 'Which word has a short "u" sound? 🥤',
        answer: 'cup', options: ['hat', 'pig', 'dog', 'cup'],
      },
    ],
  },
  {
    level: 2,
    title: 'Long Vowels',
    description: 'Learn the five long vowel sounds: a, e, i, o, u',
    words: [
      { english: 'cake', hebrew: 'עוגה',   emoji: '🎂', example: '"cake" has a long "a" sound.' },
      { english: 'tree', hebrew: 'עץ',      emoji: '🌳', example: '"tree" has a long "e" sound.' },
      { english: 'bike', hebrew: 'אופניים', emoji: '🚲', example: '"bike" has a long "i" sound.' },
      { english: 'bone', hebrew: 'עצם',     emoji: '🦴', example: '"bone" has a long "o" sound.' },
      { english: 'cute', hebrew: 'חמוד',    emoji: '🥰', example: '"cute" has a long "u" sound.' },
      { english: 'rain', hebrew: 'גשם',     emoji: '🌧️', example: '"rain" has a long "a" sound.' },
    ],
    quiz: [
      {
        id: 'p2q1', type: 'multiple-choice',
        question: 'Which word has a long "a" sound? 🎂',
        answer: 'cake', options: ['tree', 'bike', 'cake', 'bone'],
      },
      {
        id: 'p2q2', type: 'multiple-choice',
        question: 'Which word has a long "e" sound? 🌳',
        answer: 'tree', options: ['cake', 'tree', 'cute', 'rain'],
      },
      {
        id: 'p2q3', type: 'multiple-choice',
        question: 'Which word has a long "i" sound? 🚲',
        answer: 'bike', options: ['bone', 'cute', 'rain', 'bike'],
      },
      {
        id: 'p2q4', type: 'multiple-choice',
        question: 'Which word has a long "o" sound? 🦴',
        answer: 'bone', options: ['cake', 'tree', 'bone', 'cute'],
      },
      {
        id: 'p2q5', type: 'multiple-choice',
        question: 'Which word has a long "u" sound? 🥰',
        answer: 'cute', options: ['rain', 'cake', 'bike', 'cute'],
      },
    ],
  },
  {
    level: 3,
    title: 'Consonant Blends',
    description: 'Learn words that start with two consonants blended together',
    words: [
      { english: 'blue',  hebrew: 'כחול',    emoji: '🔵', example: '"blue" starts with the "bl" blend.' },
      { english: 'green', hebrew: 'ירוק',    emoji: '💚', example: '"green" starts with the "gr" blend.' },
      { english: 'stop',  hebrew: 'עצור',    emoji: '🛑', example: '"stop" starts with the "st" blend.' },
      { english: 'flag',  hebrew: 'דגל',     emoji: '🚩', example: '"flag" starts with the "fl" blend.' },
      { english: 'drum',  hebrew: 'תוף',     emoji: '🥁', example: '"drum" starts with the "dr" blend.' },
      { english: 'swim',  hebrew: 'לשחות',   emoji: '🏊', example: '"swim" starts with the "sw" blend.' },
    ],
    quiz: [
      {
        id: 'p3q1', type: 'multiple-choice',
        question: 'Which word starts with the "bl" blend? 🔵',
        answer: 'blue', options: ['green', 'stop', 'blue', 'flag'],
      },
      {
        id: 'p3q2', type: 'multiple-choice',
        question: 'Which word starts with the "gr" blend? 💚',
        answer: 'green', options: ['blue', 'green', 'drum', 'swim'],
      },
      {
        id: 'p3q3', type: 'multiple-choice',
        question: 'Which word starts with the "st" blend? 🛑',
        answer: 'stop', options: ['flag', 'drum', 'stop', 'swim'],
      },
      {
        id: 'p3q4', type: 'multiple-choice',
        question: 'Which word starts with the "fl" blend? 🚩',
        answer: 'flag', options: ['green', 'stop', 'flag', 'blue'],
      },
      {
        id: 'p3q5', type: 'multiple-choice',
        question: 'Which word starts with the "sw" blend? 🏊',
        answer: 'swim', options: ['drum', 'swim', 'stop', 'green'],
      },
    ],
  },
]
