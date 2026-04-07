import type { SubjectLevel } from '@/types'

export const sentenceLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'I Am...',
    description: 'Learn to describe yourself with "I am"',
    words: [
      { english: 'I am happy.',           hebrew: 'אֲנִי שָׂמֵחַ.',           emoji: '😊', example: 'I am happy today.' },
      { english: 'I am tired.',            hebrew: 'אֲנִי עָיֵף.',             emoji: '😴', example: 'I am tired after school.' },
      { english: 'I am hungry.',           hebrew: 'אֲנִי רָעֵב.',             emoji: '🍴', example: 'I am hungry for lunch.' },
      { english: 'I am a student.',        hebrew: 'אֲנִי תַּלְמִיד.',         emoji: '📚', example: 'I am a student at school.' },
      { english: 'I am seven years old.',  hebrew: 'אֲנִי בֶּן שֶׁבַע.',       emoji: '🎂', example: 'I am seven years old.' },
      { english: 'I am ready.',            hebrew: 'אֲנִי מוּכָן.',            emoji: '✅', example: 'I am ready to learn.' },
    ],
    quiz: [
      {
        id: 'ss1q1', type: 'multiple-choice',
        question: 'How do you say אֲנִי שָׂמֵחַ in English?', answer: 'I am happy.',
        options: ['I am tired.', 'I am happy.', 'I am hungry.', 'I am ready.'],
      },
      {
        id: 'ss1q2', type: 'multiple-choice',
        question: 'Which sentence matches 😴?', answer: 'I am tired.',
        options: ['I am happy.', 'I am a student.', 'I am tired.', 'I am ready.'], emoji: '😴',
      },
      {
        id: 'ss1q3', type: 'fill-blank',
        question: 'I ___ a student at school. (📚)', answer: 'am',
        questionHebrew: 'אֲנִי ___ תַּלְמִיד בבית הספר.',
      },
      {
        id: 'ss1q4', type: 'multiple-choice',
        question: 'Complete: "I am ___ for lunch." 🍴', answer: 'hungry',
        options: ['happy', 'tired', 'ready', 'hungry'], emoji: '🍴',
      },
      {
        id: 'ss1q5', type: 'fill-blank',
        question: 'I am ___ years old. (🎂)', answer: 'seven',
        questionHebrew: 'אֲנִי בֶּן ___ שָׁנִים.',
      },
    ],
  },
  {
    level: 2,
    title: 'I Have / I Like',
    description: 'Say what you have and what you like',
    words: [
      { english: 'I have a dog.',          hebrew: 'יֵשׁ לִי כֶּלֶב.',         emoji: '🐶', example: 'I have a dog at home.' },
      { english: 'I like to read.',         hebrew: 'אֲנִי אוֹהֵב לִקְרֹא.',    emoji: '📖', example: 'I like to read books.' },
      { english: 'I have blue eyes.',       hebrew: 'יֵשׁ לִי עֵינַיִם כְּחוּלוֹת.', emoji: '👀', example: 'I have blue eyes.' },
      { english: 'I like pizza.',           hebrew: 'אֲנִי אוֹהֵב פִּיצָה.',     emoji: '🍕', example: 'I like pizza a lot.' },
      { english: 'I have a best friend.',   hebrew: 'יֵשׁ לִי חָבֵר טוֹב.',     emoji: '🧑‍🤝‍🧑', example: 'I have a best friend.' },
      { english: 'I like to play outside.', hebrew: 'אֲנִי אוֹהֵב לְשַׂחֵק בַּחוּץ.', emoji: '🌳', example: 'I like to play outside.' },
    ],
    quiz: [
      {
        id: 'ss2q1', type: 'multiple-choice',
        question: 'How do you say יֵשׁ לִי כֶּלֶב in English?', answer: 'I have a dog.',
        options: ['I like a dog.', 'I have a dog.', 'I am a dog.', 'I see a dog.'],
      },
      {
        id: 'ss2q2', type: 'multiple-choice',
        question: 'Which sentence matches 📖?', answer: 'I like to read.',
        options: ['I have a dog.', 'I like to read.', 'I like pizza.', 'I have blue eyes.'], emoji: '📖',
      },
      {
        id: 'ss2q3', type: 'fill-blank',
        question: 'I ___ to play outside. (🌳)', answer: 'like',
        questionHebrew: 'אֲנִי ___ לְשַׂחֵק בַּחוּץ.',
      },
      {
        id: 'ss2q4', type: 'multiple-choice',
        question: 'Complete: "I have ___ eyes." 👀', answer: 'blue',
        options: ['big', 'blue', 'happy', 'good'], emoji: '👀',
      },
      {
        id: 'ss2q5', type: 'fill-blank',
        question: 'I have a best ___. (🧑‍🤝‍🧑)', answer: 'friend',
        questionHebrew: 'יֵשׁ לִי ___ טוֹב.',
      },
    ],
  },
  {
    level: 3,
    title: 'Questions & Answers',
    description: 'Ask and answer simple questions in English',
    words: [
      { english: 'What is your name?',          hebrew: 'מַה שִּׁמְךָ?',               emoji: '🙋', example: 'What is your name? My name is Dan.' },
      { english: 'Where do you live?',           hebrew: 'אֵיפֹה אַתָּה גָּר?',         emoji: '🏠', example: 'Where do you live? I live in Tel Aviv.' },
      { english: 'How old are you?',             hebrew: 'בֶּן כַּמָּה אַתָּה?',        emoji: '🎂', example: 'How old are you? I am eight.' },
      { english: 'Do you like school?',          hebrew: 'אַתָּה אוֹהֵב אֶת בֵּית הַסֵּפֶר?', emoji: '🏫', example: 'Do you like school? Yes, I do!' },
      { english: 'Can you swim?',                hebrew: 'אַתָּה יוֹדֵעַ לִשְׂחוֹת?',   emoji: '🏊', example: 'Can you swim? Yes, I can!' },
      { english: 'What is your favourite colour?', hebrew: 'מַה הַצֶּבַע הַאָהוּב עָלֶיךָ?', emoji: '🌈', example: 'What is your favourite colour? Blue!' },
    ],
    quiz: [
      {
        id: 'ss3q1', type: 'multiple-choice',
        question: 'Which question asks about a person\'s name? 🙋', answer: 'What is your name?',
        options: [
          'How old are you?',
          'Where do you live?',
          'What is your name?',
          'Can you swim?',
        ], emoji: '🙋',
      },
      {
        id: 'ss3q2', type: 'fill-blank',
        question: '___ you swim? (🏊)', answer: 'can',
        questionHebrew: '___ אַתָּה לִשְׂחוֹת?',
      },
      {
        id: 'ss3q3', type: 'multiple-choice',
        question: 'Complete: "Where do you ___?" 🏠', answer: 'live',
        options: ['swim', 'live', 'eat', 'play'], emoji: '🏠',
      },
      {
        id: 'ss3q4', type: 'fill-blank',
        question: 'How ___ are you? (🎂)', answer: 'old',
        questionHebrew: 'בֶּן ___ אַתָּה?',
      },
      {
        id: 'ss3q5', type: 'multiple-choice',
        question: 'What is your favourite ___? 🌈', answer: 'colour',
        options: ['name', 'food', 'colour', 'school'], emoji: '🌈',
      },
    ],
  },
]
