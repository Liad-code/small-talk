import type { SubjectLevel } from '@/types'

export const verbLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Move Your Body',
    description: 'Learn 6 basic action verbs',
    words: [
      { english: 'Run',   hebrew: 'לָרוּץ',    emoji: '🏃', example: 'I run fast.' },
      { english: 'Jump',  hebrew: 'לִקְפֹּץ',   emoji: '🦘', example: 'I jump high.' },
      { english: 'Swim',  hebrew: 'לִשְׂחוֹת', emoji: '🏊', example: 'I swim in the pool.' },
      { english: 'Walk',  hebrew: 'לָלֶכֶת',   emoji: '🚶', example: 'I walk to school.' },
      { english: 'Eat',   hebrew: 'לֶאֱכֹל',   emoji: '🍴', example: 'I eat lunch.' },
      { english: 'Sleep', hebrew: 'לִישֹׁן',   emoji: '😴', example: 'I sleep at night.' },
    ],
    quiz: [
      {
        id: 'v1q1', type: 'multiple-choice',
        question: 'What do you do at night in bed? 😴', answer: 'Sleep',
        options: ['Run', 'Jump', 'Sleep', 'Swim'], emoji: '😴',
      },
      {
        id: 'v1q2', type: 'multiple-choice',
        question: 'What is 🏃 in English?', answer: 'Run',
        options: ['Walk', 'Run', 'Jump', 'Eat'], emoji: '🏃',
      },
      {
        id: 'v1q3', type: 'fill-blank',
        question: 'I ___ in the pool. (🏊)', answer: 'swim',
        questionHebrew: 'אני ___ בבריכה.',
      },
      {
        id: 'v1q4', type: 'multiple-choice',
        question: 'I ___ to school every morning. 🎒', answer: 'Walk',
        options: ['Swim', 'Sleep', 'Walk', 'Jump'], emoji: '🚶',
      },
      {
        id: 'v1q5', type: 'fill-blank',
        question: 'I ___ lunch at 12 o\'clock. (🍴)', answer: 'eat',
        questionHebrew: 'אני ___ ארוחת צהריים בשעה 12.',
      },
    ],
  },
  {
    level: 2,
    title: 'School & Fun',
    description: 'Learn 6 verbs for school and free time',
    words: [
      { english: 'Read',  hebrew: 'לִקְרֹא',   emoji: '📖', example: 'I read a book.' },
      { english: 'Write', hebrew: 'לִכְתֹּב',  emoji: '✏️', example: 'I write my name.' },
      { english: 'Draw',  hebrew: 'לְצַיֵּר',  emoji: '🎨', example: 'I draw a house.' },
      { english: 'Play',  hebrew: 'לְשַׂחֵק',  emoji: '🎮', example: 'I play with friends.' },
      { english: 'Sing',  hebrew: 'לָשִׁיר',   emoji: '🎤', example: 'I sing a song.' },
      { english: 'Dance', hebrew: 'לִרְקֹד',   emoji: '💃', example: 'I dance at the party.' },
    ],
    quiz: [
      {
        id: 'v2q1', type: 'multiple-choice',
        question: 'What do you do with a pencil? ✏️', answer: 'Write',
        options: ['Read', 'Write', 'Sing', 'Dance'], emoji: '✏️',
      },
      {
        id: 'v2q2', type: 'multiple-choice',
        question: 'What is 📖 in English?', answer: 'Read',
        options: ['Write', 'Draw', 'Read', 'Play'], emoji: '📖',
      },
      {
        id: 'v2q3', type: 'fill-blank',
        question: 'I ___ a picture of my family. (🎨)', answer: 'draw',
        questionHebrew: 'אני ___ ציור של המשפחה שלי.',
      },
      {
        id: 'v2q4', type: 'multiple-choice',
        question: 'What do you do with your voice and music? 🎤', answer: 'Sing',
        options: ['Play', 'Read', 'Dance', 'Sing'], emoji: '🎤',
      },
      {
        id: 'v2q5', type: 'fill-blank',
        question: 'I ___ with my friends at recess. (🎮)', answer: 'play',
        questionHebrew: 'אני ___ עם חברים בהפסקה.',
      },
    ],
  },
  {
    level: 3,
    title: 'Verbs in Sentences',
    description: 'Use 6 action verbs in full sentences',
    words: [
      { english: 'Fly',   hebrew: 'לָעוּף',    emoji: '✈️', example: 'Birds can fly.' },
      { english: 'Build', hebrew: 'לִבְנוֹת',  emoji: '🏗️', example: 'I build with blocks.' },
      { english: 'Cook',  hebrew: 'לְבַשֵּׁל', emoji: '👨‍🍳', example: 'I cook with my mum.' },
      { english: 'Clean', hebrew: 'לְנַקּוֹת', emoji: '🧹', example: 'I clean my room.' },
      { english: 'Help',  hebrew: 'לַעֲזֹר',   emoji: '🤝', example: 'I help my friend.' },
      { english: 'Think', hebrew: 'לַחְשֹׁב',  emoji: '🤔', example: 'I think before I answer.' },
    ],
    quiz: [
      {
        id: 'v3q1', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'Birds can fly.',
        options: [
          'Birds can swim fast.',
          'Birds can fly.',
          'Birds can cook.',
          'Birds can clean.',
        ], emoji: '✈️',
      },
      {
        id: 'v3q2', type: 'fill-blank',
        question: 'I ___ my room every Sunday. (🧹)', answer: 'clean',
        questionHebrew: 'אני ___ את החדר שלי כל יום ראשון.',
      },
      {
        id: 'v3q3', type: 'multiple-choice',
        question: 'Complete: "I ___ before I answer."', answer: 'think',
        options: ['fly', 'cook', 'think', 'build'], emoji: '🤔',
      },
      {
        id: 'v3q4', type: 'fill-blank',
        question: 'I ___ my friend carry the bag. (🤝)', answer: 'help',
        questionHebrew: 'אני ___ לחבר שלי לשאת את התיק.',
      },
      {
        id: 'v3q5', type: 'multiple-choice',
        question: 'What do you do with blocks and Lego? 🏗️', answer: 'Build',
        options: ['Cook', 'Fly', 'Think', 'Build'], emoji: '🏗️',
      },
    ],
  },
]
