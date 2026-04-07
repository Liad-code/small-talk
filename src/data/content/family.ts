import type { SubjectLevel } from '@/types'

export const familyLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'My Family',
    description: 'Learn the 6 most important family words',
    words: [
      { english: 'Mom',     hebrew: 'אִמָּא',   emoji: '👩', example: 'My mom is kind.' },
      { english: 'Dad',     hebrew: 'אַבָּא',   emoji: '👨', example: 'My dad is tall.' },
      { english: 'Sister',  hebrew: 'אָחוֹת',  emoji: '👧', example: 'My sister is funny.' },
      { english: 'Brother', hebrew: 'אָח',     emoji: '👦', example: 'My brother plays football.' },
      { english: 'Grandma', hebrew: 'סָבְתָא', emoji: '👵', example: 'Grandma bakes cookies.' },
      { english: 'Grandpa', hebrew: 'סָבָא',   emoji: '👴', example: 'Grandpa reads books.' },
    ],
    quiz: [
      {
        id: 'fm1q1', type: 'multiple-choice',
        question: 'Who bakes cookies? 🍪', answer: 'Grandma',
        options: ['Mom', 'Grandpa', 'Grandma', 'Sister'], emoji: '👵',
      },
      {
        id: 'fm1q2', type: 'multiple-choice',
        question: 'What is 👧 in English?', answer: 'Sister',
        options: ['Brother', 'Mom', 'Sister', 'Grandma'], emoji: '👧',
      },
      {
        id: 'fm1q3', type: 'multiple-choice',
        question: 'My ___ plays football. (👦)', answer: 'brother',
        options: ['sister', 'brother', 'grandpa', 'dad'],
      },
      {
        id: 'fm1q4', type: 'multiple-choice',
        question: 'Who is your father? 👨', answer: 'Dad',
        options: ['Grandpa', 'Mom', 'Dad', 'Brother'], emoji: '👨',
      },
      {
        id: 'fm1q5', type: 'multiple-choice',
        question: 'My ___ gives me hugs. (👩)', answer: 'mom',
        options: ['grandma', 'sister', 'mom', 'aunt'],
      },
    ],
  },
  {
    level: 2,
    title: 'More Family',
    description: 'Learn extended family words',
    words: [
      { english: 'Uncle',   hebrew: 'דּוֹד',       emoji: '🧔', example: 'My uncle is funny.' },
      { english: 'Aunt',    hebrew: 'דּוֹדָה',     emoji: '👩‍🦱', example: 'My aunt has long hair.' },
      { english: 'Cousin',  hebrew: 'בֶּן דּוֹד',  emoji: '🧒', example: 'My cousin visits on weekends.' },
      { english: 'Baby',    hebrew: 'תִּינוֹק',    emoji: '👶', example: 'The baby is very cute.' },
      { english: 'Parents', hebrew: 'הוֹרִים',     emoji: '👨‍👩‍👦', example: 'My parents love me.' },
      { english: 'Family',  hebrew: 'מִשְׁפָּחָה', emoji: '👨‍👩‍👧‍👦', example: 'I love my family.' },
    ],
    quiz: [
      {
        id: 'fm2q1', type: 'multiple-choice',
        question: 'Who are Mom and Dad together?', answer: 'Parents',
        options: ['Sister', 'Cousins', 'Parents', 'Baby'], emoji: '👨‍👩‍👦',
      },
      {
        id: 'fm2q2', type: 'multiple-choice',
        question: 'My ___ visits on weekends. (🧒)', answer: 'cousin',
        options: ['uncle', 'aunt', 'cousin', 'baby'],
      },
      {
        id: 'fm2q3', type: 'multiple-choice',
        question: 'What is 👶 in English?', answer: 'Baby',
        options: ['Cousin', 'Baby', 'Uncle', 'Aunt'], emoji: '👶',
      },
      {
        id: 'fm2q4', type: 'multiple-choice',
        question: '"דּוֹד" in English is:', answer: 'Uncle',
        options: ['Aunt', 'Uncle', 'Baby', 'Parents'], emoji: '🧔',
      },
      {
        id: 'fm2q5', type: 'multiple-choice',
        question: 'I love my ___. (👨‍👩‍👧‍👦)', answer: 'family',
        options: ['cousin', 'parents', 'family', 'baby'],
      },
    ],
  },
  {
    level: 3,
    title: 'Family Sentences',
    description: 'Use family words in full sentences',
    words: [
      { english: 'Older',    hebrew: 'גָּדוֹל',     emoji: '🔝', example: 'My older brother helps me.' },
      { english: 'Younger',  hebrew: 'קָטָן',       emoji: '🐣', example: 'My younger sister is cute.' },
      { english: 'Together', hebrew: 'יַחַד',       emoji: '🤝', example: 'We eat together.' },
      { english: 'Love',     hebrew: 'אַהֲבָה',     emoji: '❤️', example: 'There is love in my family.' },
      { english: 'Happy',    hebrew: 'שָׂמֵחַ',     emoji: '😊', example: 'My family is happy.' },
      { english: 'Home',     hebrew: 'בַּיִת',      emoji: '🏠', example: 'My family is at home.' },
    ],
    quiz: [
      {
        id: 'fm3q1', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'We eat together.',
        options: [
          'We eat together.',
          'Together we eats.',
          'We eats together.',
          'Together eating we.',
        ], emoji: '🤝',
      },
      {
        id: 'fm3q2', type: 'multiple-choice',
        question: 'My ___ brother helps me with homework. (🔝)', answer: 'older',
        options: ['younger', 'older', 'happy', 'together'],
      },
      {
        id: 'fm3q3', type: 'multiple-choice',
        question: 'Complete: "I ___ my family very much."', answer: 'love',
        options: ['miss', 'love', 'want', 'have'], emoji: '❤️',
      },
      {
        id: 'fm3q4', type: 'multiple-choice',
        question: 'My family is always ___. (😊)', answer: 'happy',
        options: ['older', 'younger', 'together', 'happy'],
      },
      {
        id: 'fm3q5', type: 'multiple-choice',
        question: '"אַהֲבָה" in English is:', answer: 'Love',
        options: ['Home', 'Happy', 'Together', 'Love'], emoji: '❤️',
      },
    ],
  },
]
