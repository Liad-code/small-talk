import type { SubjectLevel } from '@/types'

export const animalLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Easy Animals',
    description: 'Learn 6 common pets and farm animals',
    words: [
      { english: 'Dog',   hebrew: 'כֶּלֶב',  emoji: '🐶', example: 'I have a dog.' },
      { english: 'Cat',   hebrew: 'חָתוּל', emoji: '🐱', example: 'The cat is cute.' },
      { english: 'Fish',  hebrew: 'דָּג',    emoji: '🐟', example: 'I see a fish.' },
      { english: 'Bird',  hebrew: 'צִפּוֹר', emoji: '🐦', example: 'The bird sings.' },
      { english: 'Cow',   hebrew: 'פָּרָה',  emoji: '🐄', example: 'A cow is big.' },
      { english: 'Duck',  hebrew: 'בַּרְוָז', emoji: '🦆', example: 'The duck swims.' },
    ],
    quiz: [
      {
        id: 'a1q1', type: 'multiple-choice',
        question: 'Which animal says "Woof"?', answer: 'Dog',
        options: ['Cat', 'Dog', 'Fish', 'Bird'], emoji: '🐶',
      },
      {
        id: 'a1q2', type: 'multiple-choice',
        question: 'What is 🐱 in English?', answer: 'Cat',
        options: ['Dog', 'Cow', 'Cat', 'Duck'], emoji: '🐱',
      },
      {
        id: 'a1q3', type: 'multiple-choice',
        question: 'The ___ swims in water. (🐟)', answer: 'fish',
        options: ['cat', 'fish', 'cow', 'duck'],
      },
      {
        id: 'a1q4', type: 'multiple-choice',
        question: 'What gives us milk? 🥛', answer: 'Cow',
        options: ['Duck', 'Bird', 'Cow', 'Cat'], emoji: '🐄',
      },
      {
        id: 'a1q5', type: 'multiple-choice',
        question: 'The ___ sings a song. (🐦)', answer: 'bird',
        options: ['dog', 'bird', 'duck', 'fish'],
      },
    ],
  },
  {
    level: 2,
    title: 'Wild Animals',
    description: 'Learn 6 animals from the wild and zoo',
    words: [
      { english: 'Lion',     hebrew: 'אַרְיֵה',   emoji: '🦁', example: 'The lion is brave.' },
      { english: 'Elephant', hebrew: 'פִּיל',      emoji: '🐘', example: 'An elephant is big.' },
      { english: 'Monkey',   hebrew: 'קוֹף',      emoji: '🐒', example: 'The monkey climbs.' },
      { english: 'Giraffe',  hebrew: 'גִּ׳ירָפָה', emoji: '🦒', example: 'A giraffe has a long neck.' },
      { english: 'Zebra',    hebrew: 'זֶבְרָה',   emoji: '🦓', example: 'A zebra has stripes.' },
      { english: 'Penguin',  hebrew: 'פִּינְגְוִין', emoji: '🐧', example: 'The penguin is funny.' },
    ],
    quiz: [
      {
        id: 'a2q1', type: 'multiple-choice',
        question: 'Which animal has a very long neck?', answer: 'Giraffe',
        options: ['Lion', 'Giraffe', 'Zebra', 'Penguin'], emoji: '🦒',
      },
      {
        id: 'a2q2', type: 'multiple-choice',
        question: 'What is the king of the jungle?', answer: 'Lion',
        options: ['Elephant', 'Monkey', 'Lion', 'Penguin'], emoji: '🦁',
      },
      {
        id: 'a2q3', type: 'multiple-choice',
        question: 'The ___ has black and white stripes. (🦓)', answer: 'zebra',
        options: ['lion', 'giraffe', 'zebra', 'monkey'],
      },
      {
        id: 'a2q4', type: 'multiple-choice',
        question: 'Which animal is the biggest? 🌍', answer: 'Elephant',
        options: ['Monkey', 'Penguin', 'Elephant', 'Zebra'],
      },
      {
        id: 'a2q5', type: 'multiple-choice',
        question: 'The ___ lives in cold places. (🐧)', answer: 'penguin',
        options: ['monkey', 'elephant', 'zebra', 'penguin'],
      },
    ],
  },
  {
    level: 3,
    title: 'Animal Sentences',
    description: 'Use animal names in full sentences',
    words: [
      { english: 'Tiger',    hebrew: 'נָמֵר',    emoji: '🐯', example: 'The tiger is orange and black.' },
      { english: 'Crocodile',hebrew: 'תַּנִּין',  emoji: '🐊', example: 'The crocodile has big teeth.' },
      { english: 'Parrot',   hebrew: 'תּוּכִּי',  emoji: '🦜', example: 'The parrot can talk.' },
      { english: 'Dolphin',  hebrew: 'דּוֹלְפִין', emoji: '🐬', example: 'Dolphins are very smart.' },
      { english: 'Wolf',     hebrew: 'זְאֵב',    emoji: '🐺', example: 'The wolf howls at night.' },
      { english: 'Fox',      hebrew: 'שׁוּעָל',   emoji: '🦊', example: 'The fox is clever.' },
    ],
    quiz: [
      {
        id: 'a3q1', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'The parrot can talk.',
        options: [
          'The parrot can swim.',
          'The parrot can talk.',
          'The parrot can roar.',
          'The parrot can fly car.',
        ], emoji: '🦜',
      },
      {
        id: 'a3q2', type: 'multiple-choice',
        question: 'The ___ is orange and black. (🐯)', answer: 'tiger',
        options: ['fox', 'wolf', 'tiger', 'parrot'],
      },
      {
        id: 'a3q3', type: 'multiple-choice',
        question: 'Complete: "Dolphins are very ___"', answer: 'smart',
        options: ['small', 'slow', 'smart', 'scary'], emoji: '🐬',
      },
      {
        id: 'a3q4', type: 'multiple-choice',
        question: 'The ___ has big teeth. (🐊)', answer: 'crocodile',
        options: ['dolphin', 'wolf', 'fox', 'crocodile'],
      },
      {
        id: 'a3q5', type: 'multiple-choice',
        question: 'What does a wolf do at night? 🌙', answer: 'Howls',
        options: ['Swims', 'Flies', 'Howls', 'Hides'], emoji: '🐺',
      },
    ],
  },
]
