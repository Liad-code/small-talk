import type { SubjectLevel } from '@/types'

export const possAdjLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'My, Your, His, Her',
    description: 'Learn the possessive adjectives for I, you, he and she',
    words: [
      { english: 'My',   hebrew: 'שֶׁלִּי',  emoji: '👤', example: 'This is my book.' },
      { english: 'Your', hebrew: 'שֶׁלְּךָ', emoji: '🫵', example: 'Where is your bag?' },
      { english: 'His',  hebrew: 'שֶׁלּוֹ',  emoji: '🧒', example: 'His name is Tom.' },
      { english: 'Her',  hebrew: 'שֶׁלָּהּ', emoji: '👧', example: 'Her cat is white.' },
      { english: 'My dog',  hebrew: 'הַכֶּלֶב שֶׁלִּי',  emoji: '🐶', example: 'My dog is funny.' },
      { english: 'Her bag', hebrew: 'הַתִּיק שֶׁלָּהּ',  emoji: '👜', example: 'Her bag is blue.' },
    ],
    quiz: [
      {
        id: 'pa1q1', type: 'multiple-choice',
        question: '"This is ___ pencil." (the pencil belongs to me)', answer: 'my',
        options: ['my', 'your', 'his', 'her'], emoji: '✏️',
      },
      {
        id: 'pa1q2', type: 'multiple-choice',
        question: '"___ cat is white." (the cat belongs to Sara — a girl)', answer: 'Her',
        options: ['My', 'His', 'Her', 'Your'], emoji: '🐱',
      },
      {
        id: 'pa1q3', type: 'multiple-choice',
        question: 'What is ___ name? (🫵 — asking the other person)', answer: 'your',
        options: ['my', 'your', 'his', 'her'],
      },
      {
        id: 'pa1q4', type: 'multiple-choice',
        question: '"___ bike is red." (the bike belongs to Dan — a boy)', answer: 'His',
        options: ['My', 'Her', 'His', 'Your'], emoji: '🚲',
      },
      {
        id: 'pa1q5', type: 'multiple-choice',
        question: 'I love ___ family. (👤 — talking about yourself)', answer: 'my',
        options: ['my', 'your', 'his', 'her'],
      },
    ],
  },
  {
    level: 2,
    title: 'Its, Our, Their',
    description: 'Learn possessive adjectives for it, we and they',
    words: [
      { english: 'Its',   hebrew: 'שֶׁלּוֹ (של דבר)',   emoji: '🐾', example: 'The dog wags its tail.' },
      { english: 'Our',   hebrew: 'שֶׁלָּנוּ',           emoji: '👥', example: 'Our class is the best.' },
      { english: 'Their', hebrew: 'שֶׁלָּהֶם',           emoji: '👫', example: 'Their house is big.' },
      { english: 'Our school',  hebrew: 'בֵּית הַסֵּפֶר שֶׁלָּנוּ', emoji: '🏫', example: 'Our school is great.' },
      { english: 'Their dog',   hebrew: 'הַכֶּלֶב שֶׁלָּהֶם', emoji: '🐶', example: 'Their dog is small.' },
      { english: 'Its name',    hebrew: 'הַשֵּׁם שֶׁלּוֹ', emoji: '🏷️', example: "The cat licks its paw." },
    ],
    quiz: [
      {
        id: 'pa2q1', type: 'multiple-choice',
        question: '"___ class is the best." (we are the students)', answer: 'Our',
        options: ['Their', 'Its', 'Our', 'Your'], emoji: '🏫',
      },
      {
        id: 'pa2q2', type: 'multiple-choice',
        question: 'The dog wags ___ tail. (🐾)', answer: 'its',
        options: ['his', 'her', 'its', 'their'],
      },
      {
        id: 'pa2q3', type: 'multiple-choice',
        question: '"___ house is near the park." (the house belongs to Dan and Sara)', answer: 'Their',
        options: ['Our', 'Its', 'Your', 'Their'], emoji: '🏠',
      },
      {
        id: 'pa2q4', type: 'multiple-choice',
        question: '"The bird sang ___ song." (the bird\'s song)', answer: 'its',
        options: ['her', 'his', 'its', 'their'], emoji: '🐦',
      },
      {
        id: 'pa2q5', type: 'multiple-choice',
        question: '___ teacher is very kind. (👥 — your class)', answer: 'our',
        options: ['its', 'our', 'their', 'your'],
      },
    ],
  },
  {
    level: 3,
    title: 'All Possessive Adjectives',
    description: 'Choose the correct possessive adjective in full sentences',
    words: [
      { english: 'My / Mine',    hebrew: 'שֶׁלִּי',    emoji: '👤', example: 'My book is here.' },
      { english: 'Your / Yours', hebrew: 'שֶׁלְּךָ',   emoji: '🫵', example: 'Your idea is great.' },
      { english: 'His',          hebrew: 'שֶׁלּוֹ',    emoji: '🧒', example: 'His answer is correct.' },
      { english: 'Her',          hebrew: 'שֶׁלָּהּ',   emoji: '👧', example: 'Her drawing is beautiful.' },
      { english: 'Our',          hebrew: 'שֶׁלָּנוּ',  emoji: '👥', example: 'Our team won!' },
      { english: 'Their',        hebrew: 'שֶׁלָּהֶם',  emoji: '👫', example: 'Their cat is called Luna.' },
    ],
    quiz: [
      {
        id: 'pa3q1', type: 'multiple-choice',
        question: '"This is ___ book." (the book belongs to Mia — a girl)', answer: 'her',
        options: ['his', 'her', 'its', 'their'], emoji: '📚',
      },
      {
        id: 'pa3q2', type: 'multiple-choice',
        question: '___ team won the game! (👥 — we are on the team)', answer: 'our',
        options: ['its', 'our', 'their', 'your'],
      },
      {
        id: 'pa3q3', type: 'multiple-choice',
        question: '"___ dog is very big." (the dog belongs to a boy)', answer: 'His',
        options: ['Her', 'His', 'Its', 'Our'], emoji: '🐶',
      },
      {
        id: 'pa3q4', type: 'multiple-choice',
        question: '"___ house is painted yellow." (the house belongs to them)', answer: 'Their',
        options: ['Our', 'Its', 'Her', 'Their'], emoji: '🏠',
      },
      {
        id: 'pa3q5', type: 'multiple-choice',
        question: 'I forgot ___ homework again. (👤 — yours)', answer: 'my',
        options: ['my', 'your', 'his', 'her'],
      },
    ],
  },
]
