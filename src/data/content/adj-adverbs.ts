import type { SubjectLevel } from '@/types'

export const adjAdverbsLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Comparative Adjectives',
    description: 'Learn to compare two things using -er adjectives (bigger, faster, taller)',
    words: [
      { english: 'big → bigger',   hebrew: 'גָּדוֹל → יוֹתֵר גָּדוֹל', emoji: '🐘', example: 'An elephant is bigger than a dog.' },
      { english: 'small → smaller',hebrew: 'קָטָן → יוֹתֵר קָטָן',    emoji: '🐭', example: 'A mouse is smaller than a cat.' },
      { english: 'fast → faster',  hebrew: 'מָהִיר → יוֹתֵר מָהִיר',  emoji: '🏎️', example: 'A car is faster than a bike.' },
      { english: 'tall → taller',  hebrew: 'גָּבוֹהַּ → יוֹתֵר גָּבוֹהַּ', emoji: '🏀', example: 'He is taller than me.' },
      { english: 'short → shorter',hebrew: 'נָמוּךְ → יוֹתֵר נָמוּךְ',  emoji: '📏', example: 'She is shorter than her brother.' },
      { english: 'slow → slower',  hebrew: 'אִטִּי → יוֹתֵר אִטִּי',  emoji: '🐢', example: 'A turtle is slower than a rabbit.' },
    ],
    quiz: [
      {
        id: 'aa1q1', type: 'multiple-choice',
        question: '"A cheetah is ___ than a horse." (fast)', answer: 'faster',
        options: ['more fast', 'faster', 'fastest', 'fast than'], emoji: '🏎️',
      },
      {
        id: 'aa1q2', type: 'multiple-choice',
        question: '"My brother is ___ than me." (tall)', answer: 'taller',
        options: ['more tall', 'tallest', 'taller', 'tall'], emoji: '🏀',
      },
      {
        id: 'aa1q3', type: 'fill-blank',
        question: 'A mouse is ___ than a cat. (🐭 — comparative of small)', answer: 'smaller',
        questionHebrew: 'עכבר ___ מחתול.',
      },
      {
        id: 'aa1q4', type: 'multiple-choice',
        question: 'To compare with short adjectives (1-2 syllables), we:', answer: 'add -er',
        options: ['add more', 'add -er', 'add -est', 'add most'], emoji: '📏',
      },
      {
        id: 'aa1q5', type: 'fill-blank',
        question: 'A turtle is ___ than a rabbit. (🐢 — comparative of slow)', answer: 'slower',
        questionHebrew: 'צב ___ מארנב.',
      },
    ],
  },
  {
    level: 2,
    title: 'Superlative + As…As',
    description: 'Learn the superlative (-est, the most) and the "as…as" comparison structure',
    words: [
      { english: 'the biggest',   hebrew: 'הֲכִי גָּדוֹל',  emoji: '🏆', example: 'The elephant is the biggest land animal.' },
      { english: 'the fastest',   hebrew: 'הֲכִי מָהִיר',   emoji: '⚡', example: 'A cheetah is the fastest animal.' },
      { english: 'the tallest',   hebrew: 'הֲכִי גָּבוֹהַּ', emoji: '🦒', example: 'A giraffe is the tallest animal.' },
      { english: 'the smallest',  hebrew: 'הֲכִי קָטָן',    emoji: '🐜', example: 'An ant is the smallest.' },
      { english: 'as big as',     hebrew: 'גָּדוֹל כְּמוֹ', emoji: '⚖️', example: 'My dog is as big as yours.' },
      { english: 'as tall as',    hebrew: 'גָּבוֹהַּ כְּמוֹ',emoji: '📐', example: 'I am as tall as my sister.' },
    ],
    quiz: [
      {
        id: 'aa2q1', type: 'multiple-choice',
        question: '"A giraffe is ___ animal." (tall — superlative)', answer: 'the tallest',
        options: ['taller', 'the tallest', 'most tall', 'tallest'], emoji: '🦒',
      },
      {
        id: 'aa2q2', type: 'multiple-choice',
        question: '"My bag is ___ yours." (same size)', answer: 'as big as',
        options: ['bigger as', 'as big as', 'the biggest', 'bigger than'], emoji: '⚖️',
      },
      {
        id: 'aa2q3', type: 'fill-blank',
        question: 'A cheetah is ___ fastest animal. (⚡)', answer: 'the',
        questionHebrew: 'נמר ציד הוא ___ חיה המהירה ביותר.',
      },
      {
        id: 'aa2q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: 'I am as tall as my brother.',
        options: ['I am tall as my brother.', 'I am tallest as my brother.', 'I am as tall as my brother.', 'I am as tallest my brother.'], emoji: '📐',
      },
      {
        id: 'aa2q5', type: 'fill-blank',
        question: 'She is ___ tallest girl in the class. (🦒)', answer: 'the',
        questionHebrew: 'היא הבחורה ___ גבוהה ביותר בכיתה.',
      },
    ],
  },
  {
    level: 3,
    title: 'Adverbs of Manner',
    description: 'Learn adverbs that describe HOW an action is done — quickly, slowly, carefully, well',
    words: [
      { english: 'quickly',   hebrew: 'בְּמַהֲרוּת',  emoji: '⚡', example: 'She finished quickly.' },
      { english: 'slowly',    hebrew: 'לְאַט',         emoji: '🐢', example: 'The turtle moves slowly.' },
      { english: 'carefully', hebrew: 'בִּזְהִירוּת',  emoji: '⚠️', example: 'He drives carefully.' },
      { english: 'loudly',    hebrew: 'בְּקוֹל רָם',   emoji: '📢', example: 'She sang loudly.' },
      { english: 'quietly',   hebrew: 'בְּשֶׁקֶט',    emoji: '🤫', example: 'Please walk quietly.' },
      { english: 'well',      hebrew: 'טוֹב',          emoji: '👍', example: 'He plays football well.' },
    ],
    quiz: [
      {
        id: 'aa3q1', type: 'multiple-choice',
        question: '"She sang ___." — which adverb means "בְּקוֹל רָם"?', answer: 'loudly',
        options: ['quickly', 'slowly', 'loudly', 'well'], emoji: '📢',
      },
      {
        id: 'aa3q2', type: 'fill-blank',
        question: 'He drives very ___. (⚠️ — with care)', answer: 'carefully',
        questionHebrew: 'הוא נוסע מאוד ___.',
      },
      {
        id: 'aa3q3', type: 'multiple-choice',
        question: '"The turtle moves ___." (slow → adverb)', answer: 'slowly',
        options: ['slow', 'slower', 'slowly', 'slowest'], emoji: '🐢',
      },
      {
        id: 'aa3q4', type: 'multiple-choice',
        question: '"She plays piano ___." — adverb form of "good"', answer: 'well',
        options: ['good', 'better', 'well', 'goodly'], emoji: '🎹',
      },
      {
        id: 'aa3q5', type: 'fill-blank',
        question: 'Please walk ___. (🤫 — without noise)', answer: 'quietly',
        questionHebrew: 'נא ללכת ___.',
      },
    ],
  },
]
