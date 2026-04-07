import type { SubjectLevel } from '@/types'

export const pronounsLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Subject Pronouns',
    description: 'Learn the pronouns that act as the subject of a sentence — I, you, he, she, we, they',
    words: [
      { english: 'I',    hebrew: 'אֲנִי',       emoji: '👤', example: 'I am a student.' },
      { english: 'You',  hebrew: 'אַתָּה / אַתְּ', emoji: '🫵', example: 'You are my friend.' },
      { english: 'He',   hebrew: 'הוּא',         emoji: '🧒', example: 'He is funny.' },
      { english: 'She',  hebrew: 'הִיא',         emoji: '👧', example: 'She is smart.' },
      { english: 'We',   hebrew: 'אֲנַחְנוּ',    emoji: '👥', example: 'We are a great team.' },
      { english: 'They', hebrew: 'הֵם / הֵן',    emoji: '👫', example: 'They are happy.' },
    ],
    quiz: [
      {
        id: 'pr1q1', type: 'multiple-choice',
        question: 'Which pronoun replaces the name "David"? 🧒', answer: 'He',
        options: ['I', 'She', 'He', 'We'], emoji: '🧒',
      },
      {
        id: 'pr1q2', type: 'multiple-choice',
        question: 'What is "אֲנַחְנוּ" in English?', answer: 'We',
        options: ['They', 'I', 'We', 'She'], emoji: '👥',
      },
      {
        id: 'pr1q3', type: 'multiple-choice',
        question: '___ are my best friends. (👫)', answer: 'they',
        options: ['he', 'she', 'we', 'they'],
      },
      {
        id: 'pr1q4', type: 'multiple-choice',
        question: 'Which pronoun replaces the name "Rachel"? 👧', answer: 'She',
        options: ['He', 'She', 'We', 'I'], emoji: '👧',
      },
      {
        id: 'pr1q5', type: 'multiple-choice',
        question: '___ am happy today. (👤)', answer: 'i',
        options: ['he', 'she', 'i', 'we'],
      },
    ],
  },
  {
    level: 2,
    title: 'Object Pronouns',
    description: 'Learn me, him, her, us, them — pronouns that receive the action',
    words: [
      { english: 'Me',   hebrew: 'אוֹתִי',  emoji: '👤', example: 'She helps me.' },
      { english: 'Him',  hebrew: 'אוֹתוֹ',  emoji: '🧒', example: 'I like him.' },
      { english: 'Her',  hebrew: 'אוֹתָהּ', emoji: '👧', example: 'We love her.' },
      { english: 'Us',   hebrew: 'אוֹתָנוּ', emoji: '👥', example: 'They see us.' },
      { english: 'Them', hebrew: 'אוֹתָם',  emoji: '👫', example: 'I know them.' },
      { english: 'It',   hebrew: 'אוֹתוֹ',  emoji: '🐱', example: 'I like it.' },
    ],
    quiz: [
      {
        id: 'pr2q1', type: 'multiple-choice',
        question: '"She helps ___." — which word completes the sentence?', answer: 'me',
        options: ['I', 'me', 'he', 'him'], emoji: '👤',
      },
      {
        id: 'pr2q2', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'I like him.',
        options: ['I likes him.', 'I like he.', 'I like him.', 'Me like him.'], emoji: '🧒',
      },
      {
        id: 'pr2q3', type: 'multiple-choice',
        question: 'We see ___ every day. (👫)', answer: 'them',
        options: ['us', 'him', 'her', 'them'],
      },
      {
        id: 'pr2q4', type: 'multiple-choice',
        question: '"אוֹתָהּ" in English is:', answer: 'her',
        options: ['him', 'her', 'me', 'them'], emoji: '👧',
      },
      {
        id: 'pr2q5', type: 'multiple-choice',
        question: 'She helps ___. (👥)', answer: 'us',
        options: ['me', 'him', 'us', 'them'],
      },
    ],
  },
  {
    level: 3,
    title: 'Subject vs Object',
    description: 'Practice choosing the right pronoun — subject or object — in full sentences',
    words: [
      { english: 'I / Me',     hebrew: 'אֲנִי / אוֹתִי',     emoji: '👤', example: 'I see him. He sees me.' },
      { english: 'You / You',  hebrew: 'אַתָּה / אוֹתְךָ',    emoji: '🫵', example: 'You help her. She helps you.' },
      { english: 'He / Him',   hebrew: 'הוּא / אוֹתוֹ',      emoji: '🧒', example: 'He calls us. We call him.' },
      { english: 'She / Her',  hebrew: 'הִיא / אוֹתָהּ',     emoji: '👧', example: 'She sees them. They see her.' },
      { english: 'We / Us',    hebrew: 'אֲנַחְנוּ / אוֹתָנוּ', emoji: '👥', example: 'We love them. They love us.' },
      { english: 'They / Them',hebrew: 'הֵם / אוֹתָם',       emoji: '👫', example: 'They invite us. We invite them.' },
    ],
    quiz: [
      {
        id: 'pr3q1', type: 'multiple-choice',
        question: '"I see ___." — which word is correct?', answer: 'him',
        options: ['he', 'him', 'she', 'her'], emoji: '🧒',
      },
      {
        id: 'pr3q2', type: 'multiple-choice',
        question: '___ calls me every day. (🧒)', answer: 'he',
        options: ['she', 'he', 'they', 'we'],
      },
      {
        id: 'pr3q3', type: 'multiple-choice',
        question: 'Which sentence is correct?', answer: 'She loves him.',
        options: ['Her loves him.', 'She loves he.', 'She loves him.', 'Him loves she.'], emoji: '❤️',
      },
      {
        id: 'pr3q4', type: 'multiple-choice',
        question: '"They help ___." — to mean "us", which word fits?', answer: 'us',
        options: ['we', 'us', 'our', 'them'], emoji: '👥',
      },
      {
        id: 'pr3q5', type: 'multiple-choice',
        question: 'She sees ___. (👥)', answer: 'us',
        options: ['we', 'us', 'them', 'her'],
      },
    ],
  },
]
