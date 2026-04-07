import type { SubjectLevel } from '@/types'

export const prepPlaceLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'In, On, Under',
    description: 'Learn three key prepositions of place — in, on, and under',
    words: [
      { english: 'In',    hebrew: 'בְּתוֹךְ / בְּ', emoji: '📦', example: 'The cat is in the box.' },
      { english: 'On',    hebrew: 'עַל',             emoji: '🪑', example: 'The book is on the table.' },
      { english: 'Under', hebrew: 'מִתַּחַת לְ',     emoji: '⬇️', example: 'The dog is under the bed.' },
      { english: 'In the box',    hebrew: 'בְּתוֹךְ הַקֻּפְסָה', emoji: '🎁', example: 'The gift is in the box.' },
      { english: 'On the chair',  hebrew: 'עַל הַכִּסֵּא',        emoji: '🪑', example: 'My bag is on the chair.' },
      { english: 'Under the table',hebrew: 'מִתַּחַת לַשֻּׁלְחָן', emoji: '🍽️', example: 'The ball is under the table.' },
    ],
    quiz: [
      {
        id: 'pp1q1', type: 'multiple-choice',
        question: 'The cat is ___ the box. (inside the box 📦)', answer: 'in',
        options: ['on', 'in', 'under', 'near'], emoji: '🐱',
      },
      {
        id: 'pp1q2', type: 'multiple-choice',
        question: 'The book is ___ the table. (on top of the table)', answer: 'on',
        options: ['in', 'under', 'on', 'behind'], emoji: '📚',
      },
      {
        id: 'pp1q3', type: 'multiple-choice',
        question: 'My dog is sleeping ___ the bed. (⬇️)', answer: 'under',
        options: ['in', 'on', 'under', 'near'],
      },
      {
        id: 'pp1q4', type: 'multiple-choice',
        question: '"מִתַּחַת לְ" in English is:', answer: 'under',
        options: ['in', 'on', 'under', 'near'], emoji: '⬇️',
      },
      {
        id: 'pp1q5', type: 'multiple-choice',
        question: 'The pencil is ___ the pencil case. (📦 — inside)', answer: 'in',
        options: ['in', 'on', 'under', 'near'],
      },
    ],
  },
  {
    level: 2,
    title: 'Near, Between, Behind',
    description: 'Learn more prepositions of place — near, between, behind, in front of',
    words: [
      { english: 'Near',        hebrew: 'לְיַד',       emoji: '📍', example: 'The school is near my house.' },
      { english: 'Between',     hebrew: 'בֵּין',        emoji: '↔️', example: 'The cat is between the chairs.' },
      { english: 'Behind',      hebrew: 'מֵאֲחוֹרֵי',  emoji: '⬅️', example: 'The dog is behind the door.' },
      { english: 'In front of', hebrew: 'לִפְנֵי',     emoji: '➡️', example: 'She is in front of the class.' },
      { english: 'Next to',     hebrew: 'לְיַד',       emoji: '🤝', example: 'Sit next to your friend.' },
      { english: 'Beside',      hebrew: 'לְצַד',       emoji: '🔛', example: 'The lamp is beside the bed.' },
    ],
    quiz: [
      {
        id: 'pp2q1', type: 'multiple-choice',
        question: 'The cat is ___ the two chairs. (☚ 🐱 ☛)', answer: 'between',
        options: ['near', 'behind', 'between', 'in front of'], emoji: '↔️',
      },
      {
        id: 'pp2q2', type: 'multiple-choice',
        question: 'The school is ___ my house. (📍 — close to)', answer: 'near',
        options: ['near', 'behind', 'between', 'in front of'],
      },
      {
        id: 'pp2q3', type: 'multiple-choice',
        question: '"מֵאֲחוֹרֵי" in English is:', answer: 'behind',
        options: ['near', 'between', 'in front of', 'behind'], emoji: '⬅️',
      },
      {
        id: 'pp2q4', type: 'multiple-choice',
        question: 'The teacher is standing ___ the class. (facing the students)', answer: 'in front of',
        options: ['behind', 'between', 'in front of', 'under'], emoji: '👩‍🏫',
      },
      {
        id: 'pp2q5', type: 'multiple-choice',
        question: 'Sit ___ to your best friend. (🤝)', answer: 'next',
        options: ['near', 'next', 'behind', 'between'],
      },
    ],
  },
  {
    level: 3,
    title: 'Where Is It?',
    description: 'Answer "Where is…?" questions using all prepositions of place in full sentences',
    words: [
      { english: 'Where is…?',   hebrew: 'אֵיפֹה…?',    emoji: '❓', example: 'Where is my bag?' },
      { english: 'It is in…',    hebrew: 'זֶה בְּ…',    emoji: '📦', example: 'It is in the drawer.' },
      { english: 'It is on…',    hebrew: 'זֶה עַל…',    emoji: '🪑', example: 'It is on the shelf.' },
      { english: 'It is under…', hebrew: 'זֶה מִתַּחַת לְ…', emoji: '⬇️', example: 'It is under the bed.' },
      { english: 'It is near…',  hebrew: 'זֶה לְיַד…',  emoji: '📍', example: 'It is near the window.' },
      { english: 'It is behind…',hebrew: 'זֶה מֵאֲחוֹרֵי…', emoji: '⬅️', example: 'It is behind the door.' },
    ],
    quiz: [
      {
        id: 'pp3q1', type: 'multiple-choice',
        question: '"Where is my pencil?" — "It is ___ the desk." (on top)', answer: 'on',
        options: ['in', 'on', 'under', 'behind'], emoji: '✏️',
      },
      {
        id: 'pp3q2', type: 'multiple-choice',
        question: 'Where is the cat? — It is ___ the sofa. (⬇️ — below it)', answer: 'under',
        options: ['in', 'on', 'under', 'behind'],
      },
      {
        id: 'pp3q3', type: 'multiple-choice',
        question: '"The ball is ___ the two boxes." (☚ ⚽ ☛)', answer: 'between',
        options: ['behind', 'near', 'between', 'on'], emoji: '⚽',
      },
      {
        id: 'pp3q4', type: 'multiple-choice',
        question: 'Complete: "The school is ___ the park — just a short walk."', answer: 'near',
        options: ['in', 'on', 'near', 'under'], emoji: '🏫',
      },
      {
        id: 'pp3q5', type: 'multiple-choice',
        question: 'The clock is ___ the door. (⬅️ — on the other side)', answer: 'behind',
        options: ['in', 'on', 'near', 'behind'],
      },
    ],
  },
]
