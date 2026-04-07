import type { SubjectLevel } from '@/types'

export const colorLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Basic Colors',
    description: 'Learn the 6 most important colors',
    words: [
      { english: 'Red',    hebrew: '', emoji: '🔴', example: 'An apple is red.' },
      { english: 'Blue',   hebrew: '', emoji: '🔵', example: 'The sky is blue.' },
      { english: 'Yellow', hebrew: '', emoji: '🟡', example: 'The sun is yellow.' },
      { english: 'Green',  hebrew: '', emoji: '🟢', example: 'Grass is green.' },
      { english: 'White',  hebrew: '', emoji: '⚪', example: 'Snow is white.' },
      { english: 'Black',  hebrew: '', emoji: '⚫', example: 'The night is black.' },
    ],
    quiz: [
      {
        id: 'c1q1', type: 'multiple-choice',
        question: 'What color is the sky? ☁️', answer: 'Blue',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
      },
      {
        id: 'c1q2', type: 'multiple-choice',
        question: 'What is 🔴 in English?', answer: 'Red',
        options: ['Blue', 'Red', 'Black', 'White'],
      },
      {
        id: 'c1q3', type: 'multiple-choice',
        question: 'Grass is ___ . (🟢)', answer: 'Green',
        options: ['Blue', 'Green', 'Yellow', 'White'],
      },
      {
        id: 'c1q4', type: 'multiple-choice',
        question: 'The sun is ___ 🌞', answer: 'Yellow',
        options: ['White', 'Green', 'Yellow', 'Black'],
      },
      {
        id: 'c1q5', type: 'multiple-choice',
        question: 'Snow is ___ . (❄️)', answer: 'White',
        options: ['Grey', 'Blue', 'White', 'Yellow'],
      },
    ],
  },
  {
    level: 2,
    title: 'More Colors',
    description: 'Learn 6 more colors and shades',
    words: [
      { english: 'Orange', hebrew: '', emoji: '🟠', example: 'An orange is orange.' },
      { english: 'Purple', hebrew: '', emoji: '🟣', example: 'Grapes are purple.' },
      { english: 'Pink',   hebrew: '', emoji: '🩷', example: 'Flowers are pink.' },
      { english: 'Brown',  hebrew: '', emoji: '🟤', example: 'Chocolate is brown.' },
      { english: 'Grey',   hebrew: '', emoji: '🩶', example: 'Clouds can be grey.' },
      { english: 'Gold',   hebrew: '', emoji: '🌟', example: 'Stars look gold.' },
    ],
    quiz: [
      {
        id: 'c2q1', type: 'multiple-choice',
        question: 'What color are grapes? 🍇', answer: 'Purple',
        options: ['Green', 'Orange', 'Purple', 'Brown'],
      },
      {
        id: 'c2q2', type: 'multiple-choice',
        question: 'Chocolate is ___ . (🍫)', answer: 'Brown',
        options: ['Red', 'Orange', 'Brown', 'Purple'],
      },
      {
        id: 'c2q3', type: 'multiple-choice',
        question: 'An orange fruit is the color ___', answer: 'Orange',
        options: ['Red', 'Orange', 'Pink', 'Gold'],
      },
      {
        id: 'c2q4', type: 'multiple-choice',
        question: 'Flowers can be ___ . (🌸)', answer: 'Pink',
        options: ['Grey', 'Gold', 'Pink', 'Green'],
      },
      {
        id: 'c2q5', type: 'multiple-choice',
        question: 'Clouds on a rainy day are ___', answer: 'Grey',
        options: ['White', 'Blue', 'Grey', 'Gold'],
      },
    ],
  },
  {
    level: 3,
    title: 'Color Sentences',
    description: 'Describe things using colors in full sentences',
    words: [
      { english: 'Light Blue', hebrew: '', emoji: '🩵', example: 'The pool is light blue.' },
      { english: 'Dark Red',   hebrew: '', emoji: '❤️‍🔥', example: 'The rose is dark red.' },
      { english: 'Colorful',   hebrew: '', emoji: '🌈', example: 'The rainbow is colorful.' },
      { english: 'Bright',     hebrew: '', emoji: '☀️', example: 'The sun is bright yellow.' },
      { english: 'Dark',       hebrew: '', emoji: '🌑', example: 'The night sky is dark blue.' },
      { english: 'Pale',       hebrew: '', emoji: '🫥', example: 'Her face is pale.' },
    ],
    quiz: [
      {
        id: 'c3q1', type: 'multiple-choice',
        question: 'Complete: "The rainbow is ___"', answer: 'colorful',
        options: ['dark', 'pale', 'colorful', 'bright'], emoji: '🌈',
      },
      {
        id: 'c3q2', type: 'multiple-choice',
        question: 'The sun is ___ yellow. (☀️)', answer: 'bright',
        options: ['light', 'bright', 'dark', 'pale'],
      },
      {
        id: 'c3q3', type: 'multiple-choice',
        question: 'Which sentence uses a color correctly?', answer: 'The sky is light blue.',
        options: [
          'The sky is light dog.',
          'The sky is light blue.',
          'The sky is blue run.',
          'The sky blue is.',
        ],
      },
      {
        id: 'c3q4', type: 'multiple-choice',
        question: 'At night the sky is ___ . (🌑)', answer: 'dark',
        options: ['bright', 'pale', 'dark', 'light blue'],
      },
      {
        id: 'c3q5', type: 'multiple-choice',
        question: 'What is the opposite of "bright"?', answer: 'dark',
        options: ['colorful', 'pale', 'dark', 'light blue'],
      },
    ],
  },
]
