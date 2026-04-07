import type { SubjectLevel } from '@/types'

export const nounsPluralLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Add -s or -es',
    description: 'Learn the regular plural rules — add -s to most nouns, -es to words ending in ch, sh, s, x, z',
    words: [
      { english: 'book → books',   hebrew: 'סֵפֶר → סְפָרִים', emoji: '📚', example: 'I have three books.' },
      { english: 'cat → cats',     hebrew: 'חָתוּל → חֲתוּלִים', emoji: '🐱', example: 'Two cats are sleeping.' },
      { english: 'box → boxes',    hebrew: 'קֻפְסָה → קֻפְסָאוֹת', emoji: '📦', example: 'There are five boxes.' },
      { english: 'dish → dishes',  hebrew: 'צַלַּחַת → צַלָּחוֹת', emoji: '🍽️', example: 'We washed the dishes.' },
      { english: 'bus → buses',    hebrew: 'אוֹטוֹבּוּס → אוֹטוֹבּוּסִים', emoji: '🚌', example: 'Two buses were late.' },
      { english: 'class → classes',hebrew: 'כִּיתָה → כִּיתּוֹת', emoji: '🏫', example: 'Our school has ten classes.' },
    ],
    quiz: [
      {
        id: 'np1q1', type: 'multiple-choice',
        question: 'What is the plural of "box"?', answer: 'boxes',
        options: ['boxs', 'boxes', 'boxies', 'boxi'], emoji: '📦',
      },
      {
        id: 'np1q2', type: 'multiple-choice',
        question: 'What is the plural of "cat"?', answer: 'cats',
        options: ['cates', 'caties', 'cats', 'cati'], emoji: '🐱',
      },
      {
        id: 'np1q3', type: 'multiple-choice',
        question: 'I have five ___. (📚 — more than one book)', answer: 'books',
        options: ['book', 'books', 'booker', 'bookies'],
      },
      {
        id: 'np1q4', type: 'multiple-choice',
        question: 'Which word needs -es to become plural?', answer: 'dish',
        options: ['pen', 'dog', 'dish', 'tree'], emoji: '🍽️',
      },
      {
        id: 'np1q5', type: 'multiple-choice',
        question: 'We washed all the ___. (🍽️ — plural of dish)', answer: 'dishes',
        options: ['dishs', 'dishes', 'dishies', 'dish'],
      },
    ],
  },
  {
    level: 2,
    title: 'Irregular Plurals',
    description: 'Some nouns have special plural forms — learn the most important ones',
    words: [
      { english: 'child → children', hebrew: 'יֶלֶד → יְלָדִים', emoji: '👦', example: 'Three children are playing.' },
      { english: 'tooth → teeth',    hebrew: 'שֵׁן → שִׁנַּיִים',  emoji: '🦷', example: 'I brush my teeth.' },
      { english: 'foot → feet',      hebrew: 'רֶגֶל → רַגְלַיִים', emoji: '🦶', example: 'My feet are cold.' },
      { english: 'man → men',        hebrew: 'אִישׁ → אֲנָשִׁים',  emoji: '🧔', example: 'Two men walked in.' },
      { english: 'woman → women',    hebrew: 'אִשָּׁה → נָשִׁים',  emoji: '👩', example: 'The women are teachers.' },
      { english: 'mouse → mice',     hebrew: 'עַכְבָּר → עַכְבָּרִים', emoji: '🐭', example: 'The cat chased the mice.' },
    ],
    quiz: [
      {
        id: 'np2q1', type: 'multiple-choice',
        question: 'What is the plural of "child"?', answer: 'children',
        options: ['childs', 'childes', 'children', 'childrens'], emoji: '👦',
      },
      {
        id: 'np2q2', type: 'multiple-choice',
        question: 'What is the plural of "tooth"?', answer: 'teeth',
        options: ['tooths', 'toothes', 'teeth', 'teeths'], emoji: '🦷',
      },
      {
        id: 'np2q3', type: 'multiple-choice',
        question: 'I brush my ___ every morning. (🦷)', answer: 'teeth',
        options: ['tooths', 'toothes', 'teeth', 'teeths'],
      },
      {
        id: 'np2q4', type: 'multiple-choice',
        question: 'What is the plural of "man"?', answer: 'men',
        options: ['mans', 'manes', 'men', 'mens'], emoji: '🧔',
      },
      {
        id: 'np2q5', type: 'multiple-choice',
        question: 'Four ___ are playing in the park. (👦 — plural of child)', answer: 'children',
        options: ['childs', 'childes', 'children', 'childrens'],
      },
    ],
  },
  {
    level: 3,
    title: 'Count vs Non-count Nouns',
    description: 'Count nouns can be plural; non-count nouns (like water, bread) cannot',
    words: [
      { english: 'Water (non-count)',    hebrew: 'מַיִם',   emoji: '💧', example: 'I drink water every day.' },
      { english: 'Bread (non-count)',    hebrew: 'לֶחֶם',   emoji: '🍞', example: 'She eats bread for breakfast.' },
      { english: 'Milk (non-count)',     hebrew: 'חָלָב',   emoji: '🥛', example: 'He drinks milk at night.' },
      { english: 'Rice (non-count)',     hebrew: 'אֹרֶז',   emoji: '🍚', example: 'We eat rice for lunch.' },
      { english: 'Apple (count)',        hebrew: 'תַּפּוּחַ', emoji: '🍎', example: 'I have two apples.' },
      { english: 'Chair (count)',        hebrew: 'כִּסֵּא',  emoji: '🪑', example: 'There are six chairs.' },
    ],
    quiz: [
      {
        id: 'np3q1', type: 'multiple-choice',
        question: 'Which word can be made plural?', answer: 'apple',
        options: ['water', 'milk', 'apple', 'rice'], emoji: '🍎',
      },
      {
        id: 'np3q2', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'She drinks water.',
        options: ['She drinks waters.', 'She drinks water.', 'She drink water.', 'She drink waters.'], emoji: '💧',
      },
      {
        id: 'np3q3', type: 'multiple-choice',
        question: 'I have two ___. (🍎 — plural of apple)', answer: 'apples',
        options: ['apple', 'apples', 'appleses', 'appleis'],
      },
      {
        id: 'np3q4', type: 'multiple-choice',
        question: '"___ is on the table." (milk — non-count)', answer: 'The milk',
        options: ['A milk', 'The milks', 'The milk', 'Some milks'], emoji: '🥛',
      },
      {
        id: 'np3q5', type: 'multiple-choice',
        question: 'There are three ___ in the room. (🪑 — plural of chair)', answer: 'chairs',
        options: ['chair', 'chairs', 'chairies', 'chairses'],
      },
    ],
  },
]
