import type { SubjectLevel } from '@/types'

export const letterLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'A to F',
    description: 'Learn the first six letters of the alphabet',
    words: [
      { english: 'A – Apple',  hebrew: 'א – תַּפּוּחַ', emoji: '🍎', example: 'A is for Apple.' },
      { english: 'B – Ball',   hebrew: 'ב – כַּדּוּר',  emoji: '⚽', example: 'B is for Ball.' },
      { english: 'C – Cat',    hebrew: 'ג – חָתוּל',    emoji: '🐱', example: 'C is for Cat.' },
      { english: 'D – Dog',    hebrew: 'ד – כֶּלֶב',    emoji: '🐶', example: 'D is for Dog.' },
      { english: 'E – Egg',    hebrew: 'ה – בֵּיצָה',   emoji: '🥚', example: 'E is for Egg.' },
      { english: 'F – Fish',   hebrew: 'ו – דָּג',      emoji: '🐟', example: 'F is for Fish.' },
    ],
    quiz: [
      {
        id: 'l1q1', type: 'multiple-choice',
        question: 'Which letter does this start with? 🍎', answer: 'A',
        options: ['A', 'B', 'C', 'D'],
      },
      {
        id: 'l1q2', type: 'multiple-choice',
        question: 'Which letter does this start with? 🐶', answer: 'D',
        options: ['A', 'B', 'D', 'F'],
      },
      {
        id: 'l1q3', type: 'multiple-choice',
        question: 'Which letter does this start with? 🐱', answer: 'C',
        options: ['A', 'B', 'C', 'D'],
      },
      {
        id: 'l1q4', type: 'multiple-choice',
        question: 'Which letter does this start with? 🐟', answer: 'F',
        options: ['B', 'D', 'E', 'F'],
      },
      {
        id: 'l1q5', type: 'multiple-choice',
        question: 'Which letter does this start with? 🥚', answer: 'E',
        options: ['B', 'C', 'E', 'F'],
      },
    ],
  },
  {
    level: 2,
    title: 'G to M',
    description: 'Learn letters G through M',
    words: [
      { english: 'G – Giraffe', hebrew: 'ג׳ירָפָה',   emoji: '🦒', example: 'G is for Giraffe.' },
      { english: 'H – House',   hebrew: 'בַּיִת',      emoji: '🏠', example: 'H is for House.' },
      { english: 'I – Ice',     hebrew: 'קֶרַח',       emoji: '🧊', example: 'I is for Ice.' },
      { english: 'J – Juice',   hebrew: 'מִיץ',         emoji: '🧃', example: 'J is for Juice.' },
      { english: 'K – Kite',    hebrew: 'עֲפִיפוֹן',   emoji: '🪁', example: 'K is for Kite.' },
      { english: 'L – Lion',    hebrew: 'אַרְיֵה',     emoji: '🦁', example: 'L is for Lion.' },
      { english: 'M – Moon',    hebrew: 'יָרֵחַ',      emoji: '🌙', example: 'M is for Moon.' },
    ],
    quiz: [
      {
        id: 'l2q1', type: 'multiple-choice',
        question: 'Which letter does this start with? 🏠', answer: 'H',
        options: ['G', 'H', 'I', 'J'],
      },
      {
        id: 'l2q2', type: 'multiple-choice',
        question: 'Which letter does this start with? 🌙', answer: 'M',
        options: ['I', 'J', 'L', 'M'],
      },
      {
        id: 'l2q3', type: 'multiple-choice',
        question: 'Which letter does this start with? 🪁', answer: 'K',
        options: ['G', 'H', 'J', 'K'],
      },
      {
        id: 'l2q4', type: 'multiple-choice',
        question: 'Which letter does this start with? 🧃', answer: 'J',
        options: ['G', 'H', 'I', 'J'],
      },
      {
        id: 'l2q5', type: 'multiple-choice',
        question: 'Which letter does this start with? 🧊', answer: 'I',
        options: ['G', 'H', 'I', 'K'],
      },
    ],
  },
  {
    level: 3,
    title: 'N to Z',
    description: 'Finish the alphabet — N through Z!',
    words: [
      { english: 'N – Nest',     hebrew: 'קֵן',         emoji: '🪺', example: 'N is for Nest.' },
      { english: 'O – Orange',   hebrew: 'תַּפּוּז',   emoji: '🍊', example: 'O is for Orange.' },
      { english: 'P – Penguin',  hebrew: 'פִּינְגְוִין', emoji: '🐧', example: 'P is for Penguin.' },
      { english: 'Q – Queen',    hebrew: 'מַלְכָּה',   emoji: '👑', example: 'Q is for Queen.' },
      { english: 'R – Rainbow',  hebrew: 'קֶשֶׁת',     emoji: '🌈', example: 'R is for Rainbow.' },
      { english: 'S – Star',     hebrew: 'כּוֹכָב',    emoji: '⭐', example: 'S is for Star.' },
      { english: 'T – Tiger',    hebrew: 'נָמֵר',      emoji: '🐯', example: 'T is for Tiger.' },
      { english: 'U – Umbrella', hebrew: 'מִטְרִיָּה', emoji: '☂️', example: 'U is for Umbrella.' },
      { english: 'V – Violin',   hebrew: 'כִּנּוֹר',   emoji: '🎻', example: 'V is for Violin.' },
      { english: 'W – Whale',    hebrew: 'לְוִיָּתָן', emoji: '🐳', example: 'W is for Whale.' },
      { english: 'X – Xylophone',hebrew: 'קְסִילוֹפוֹן', emoji: '🎵', example: 'X is for Xylophone.' },
      { english: 'Y – Yogurt',   hebrew: 'יוֹגוּרְט', emoji: '🥛', example: 'Y is for Yogurt.' },
      { english: 'Z – Zebra',    hebrew: 'זֶבְרָה',    emoji: '🦓', example: 'Z is for Zebra.' },
    ],
    quiz: [
      {
        id: 'l3q1', type: 'multiple-choice',
        question: 'Which letter does this start with? 👑', answer: 'Q',
        options: ['N', 'P', 'Q', 'R'],
      },
      {
        id: 'l3q2', type: 'multiple-choice',
        question: 'Which letter does this start with? 🦓', answer: 'Z',
        options: ['W', 'X', 'Y', 'Z'],
      },
      {
        id: 'l3q3', type: 'multiple-choice',
        question: 'Which letter does this start with? 🐯', answer: 'T',
        options: ['N', 'P', 'T', 'V'],
      },
      {
        id: 'l3q4', type: 'multiple-choice',
        question: 'Which letter does this start with? 🌈', answer: 'R',
        options: ['N', 'O', 'R', 'S'],
      },
      {
        id: 'l3q5', type: 'multiple-choice',
        question: 'Which letter does this start with? ☂️', answer: 'U',
        options: ['R', 'S', 'T', 'U'],
      },
    ],
  },
]
