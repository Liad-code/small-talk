import type { SubjectLevel } from '@/types'

export const foodLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Yummy Foods',
    description: 'Learn 6 favourite foods',
    words: [
      { english: 'Apple',  hebrew: 'תַּפּוּחַ', emoji: '🍎', example: 'I eat an apple.' },
      { english: 'Bread',  hebrew: 'לֶחֶם',    emoji: '🍞', example: 'I eat bread.' },
      { english: 'Milk',   hebrew: 'חָלָב',    emoji: '🥛', example: 'I drink milk.' },
      { english: 'Cake',   hebrew: 'עוּגָה',   emoji: '🎂', example: 'I love cake!' },
      { english: 'Pizza',  hebrew: 'פִּיצָה',  emoji: '🍕', example: 'Pizza is yummy.' },
      { english: 'Banana', hebrew: 'בָּנָנָה',  emoji: '🍌', example: 'A banana is yellow.' },
    ],
    quiz: [
      {
        id: 'f1q1', type: 'multiple-choice',
        question: 'What is yellow and sweet? 🍌', answer: 'Banana',
        options: ['Apple', 'Bread', 'Banana', 'Milk'],
      },
      {
        id: 'f1q2', type: 'multiple-choice',
        question: 'I eat ___ with butter. (🍞)', answer: 'bread',
        options: ['apple', 'bread', 'cake', 'pizza'],
      },
      {
        id: 'f1q3', type: 'multiple-choice',
        question: 'You drink this cold. 🥛', answer: 'Milk',
        options: ['Pizza', 'Cake', 'Apple', 'Milk'],
      },
      {
        id: 'f1q4', type: 'multiple-choice',
        question: 'We eat ___ on a birthday. (🎂)', answer: 'cake',
        options: ['milk', 'banana', 'cake', 'pizza'],
      },
      {
        id: 'f1q5', type: 'multiple-choice',
        question: 'An apple is the color ___', answer: 'Red',
        options: ['Blue', 'Red', 'Green', 'Purple'],
      },
    ],
  },
  {
    level: 2,
    title: 'More Foods',
    description: 'Expand your food vocabulary',
    words: [
      { english: 'Egg',      hebrew: 'בֵּיצָה',  emoji: '🥚', example: 'I eat an egg.' },
      { english: 'Chicken',  hebrew: 'עוֹף',     emoji: '🍗', example: 'Chicken is yummy.' },
      { english: 'Rice',     hebrew: 'אֹרֶז',    emoji: '🍚', example: 'I love rice.' },
      { english: 'Soup',     hebrew: 'מָרָק',    emoji: '🍲', example: 'Soup is warm.' },
      { english: 'Cookie',   hebrew: 'עוּגִיָּה', emoji: '🍪', example: 'I love cookies.' },
      { english: 'Sandwich', hebrew: 'כְּרִיךְ', emoji: '🥪', example: 'I eat a sandwich.' },
    ],
    quiz: [
      {
        id: 'f2q1', type: 'multiple-choice',
        question: 'What is warm and you eat with a spoon? 🍲', answer: 'Soup',
        options: ['Cookie', 'Soup', 'Egg', 'Rice'],
      },
      {
        id: 'f2q2', type: 'multiple-choice',
        question: 'I eat a ___ for lunch. (🥪)', answer: 'sandwich',
        options: ['soup', 'egg', 'sandwich', 'cookie'],
      },
      {
        id: 'f2q3', type: 'multiple-choice',
        question: 'A hen lays a ___', answer: 'Egg',
        options: ['Soup', 'Rice', 'Egg', 'Cookie'],
      },
      {
        id: 'f2q4', type: 'multiple-choice',
        question: 'I love to eat ___ and milk. (🍪)', answer: 'cookies',
        options: ['rice', 'cookies', 'chicken', 'soup'],
      },
      {
        id: 'f2q5', type: 'multiple-choice',
        question: '"אֹרֶז" in English is:', answer: 'Rice',
        options: ['Egg', 'Rice', 'Soup', 'Chicken'],
      },
    ],
  },
  {
    level: 3,
    title: 'Food Sentences',
    description: 'Talk about food using full sentences',
    words: [
      { english: 'Delicious',  hebrew: 'טָעִים',        emoji: '😋', example: 'This pizza is delicious.' },
      { english: 'Hungry',     hebrew: 'רָעֵב',         emoji: '😤', example: 'I am hungry.' },
      { english: 'Thirsty',    hebrew: 'צָמֵא',         emoji: '😮‍💨', example: 'I am thirsty.' },
      { english: 'Full',       hebrew: 'שָׂבֵעַ',        emoji: '😌', example: 'I am full.' },
      { english: 'Favourite',  hebrew: 'מָּחִיב / אָהוּב', emoji: '❤️', example: 'Pizza is my favourite.' },
      { english: 'Taste',      hebrew: 'טַעַם',         emoji: '👅', example: 'This tastes sweet.' },
    ],
    quiz: [
      {
        id: 'f3q1', type: 'multiple-choice',
        question: 'Complete: "I am very ___, I need water!"', answer: 'thirsty',
        options: ['full', 'hungry', 'thirsty', 'delicious'],
      },
      {
        id: 'f3q2', type: 'multiple-choice',
        question: 'This cake is ___! (😋)', answer: 'delicious',
        options: ['hungry', 'thirsty', 'delicious', 'full'],
      },
      {
        id: 'f3q3', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'Pizza is my favourite food.',
        options: [
          'Pizza my favourite is food.',
          'My pizza is favourite food.',
          'Pizza is my favourite food.',
          'Is pizza favourite my food.',
        ],
      },
      {
        id: 'f3q4', type: 'multiple-choice',
        question: 'I ate too much, now I am ___. (😌)', answer: 'full',
        options: ['hungry', 'thirsty', 'full', 'delicious'],
      },
      {
        id: 'f3q5', type: 'multiple-choice',
        question: '"רָעֵב" in English is:', answer: 'Hungry',
        options: ['Full', 'Thirsty', 'Hungry', 'Delicious'],
      },
    ],
  },
]
