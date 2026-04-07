import type { SubjectLevel } from '@/types'

export const demonstrativesLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'This and These',
    description: 'Use "this" for one nearby thing and "these" for many nearby things',
    words: [
      { english: 'This',       hebrew: 'זֶה / זֹאת',  emoji: '👇', example: 'This is my pencil.' },
      { english: 'These',      hebrew: 'אֵלֶּה',       emoji: '👆', example: 'These are my books.' },
      { english: 'This book',  hebrew: 'הַסֵּפֶר הַזֶּה', emoji: '📚', example: 'This book is great.' },
      { english: 'This cat',   hebrew: 'הַחָתוּל הַזֶּה', emoji: '🐱', example: 'This cat is cute.' },
      { english: 'These dogs', hebrew: 'הַכְּלָבִים הָאֵלֶּה', emoji: '🐶', example: 'These dogs are big.' },
      { english: 'These apples', hebrew: 'הַתַּפּוּחִים הָאֵלֶּה', emoji: '🍎', example: 'These apples are red.' },
    ],
    quiz: [
      {
        id: 'dm1q1', type: 'multiple-choice',
        question: 'You point to ONE book near you. You say:', answer: 'This book',
        options: ['These book', 'This book', 'That book', 'Those book'], emoji: '📚',
      },
      {
        id: 'dm1q2', type: 'multiple-choice',
        question: 'You point to MANY apples near you. You say:', answer: 'These apples',
        options: ['This apples', 'These apples', 'That apples', 'Those apples'], emoji: '🍎',
      },
      {
        id: 'dm1q3', type: 'multiple-choice',
        question: '___ is my cat. (🐱 — near you)', answer: 'this',
        options: ['this', 'that', 'these', 'those'],
      },
      {
        id: 'dm1q4', type: 'multiple-choice',
        question: '"___ are my friends." (more than one, close to you)', answer: 'These',
        options: ['This', 'These', 'That', 'Those'], emoji: '👫',
      },
      {
        id: 'dm1q5', type: 'multiple-choice',
        question: '___ dogs are very cute. (🐶 — next to you)', answer: 'these',
        options: ['this', 'that', 'these', 'those'],
      },
    ],
  },
  {
    level: 2,
    title: 'That and Those',
    description: 'Use "that" for one distant thing and "those" for many distant things',
    words: [
      { english: 'That',        hebrew: 'הַהוּא / הַהִיא', emoji: '👉', example: 'That is a tall tree.' },
      { english: 'Those',       hebrew: 'הָהֵם',            emoji: '↗️', example: 'Those are big clouds.' },
      { english: 'That house',  hebrew: 'הַבַּיִת הַהוּא',  emoji: '🏠', example: 'That house is far.' },
      { english: 'That cloud',  hebrew: 'הֶעָנָן הַהוּא',   emoji: '☁️', example: 'That cloud looks like a rabbit.' },
      { english: 'Those trees', hebrew: 'הָעֵצִים הָהֵם',   emoji: '🌲', example: 'Those trees are very tall.' },
      { english: 'Those stars', hebrew: 'הַכּוֹכָבִים הָהֵם', emoji: '⭐', example: 'Those stars are bright.' },
    ],
    quiz: [
      {
        id: 'dm2q1', type: 'multiple-choice',
        question: 'You point to ONE house far away. You say:', answer: 'That house',
        options: ['This house', 'These house', 'That house', 'Those house'], emoji: '🏠',
      },
      {
        id: 'dm2q2', type: 'multiple-choice',
        question: 'You point to MANY stars far away. You say:', answer: 'Those stars',
        options: ['This stars', 'These stars', 'That stars', 'Those stars'], emoji: '⭐',
      },
      {
        id: 'dm2q3', type: 'multiple-choice',
        question: '___ tree over there is very tall. (🌲 — far away)', answer: 'that',
        options: ['this', 'that', 'these', 'those'],
      },
      {
        id: 'dm2q4', type: 'multiple-choice',
        question: '"___ clouds look like rain." (many, far away)', answer: 'Those',
        options: ['This', 'These', 'That', 'Those'], emoji: '☁️',
      },
      {
        id: 'dm2q5', type: 'multiple-choice',
        question: '___ mountains are beautiful. (🏔️ — far away)', answer: 'those',
        options: ['this', 'that', 'these', 'those'],
      },
    ],
  },
  {
    level: 3,
    title: 'This / That / These / Those',
    description: 'Choose the right demonstrative and use it in full sentences',
    words: [
      { english: 'This is…',   hebrew: 'זֶה…',       emoji: '☝️', example: 'This is my bag.' },
      { english: 'That is…',   hebrew: 'זֶה שָׁם…',  emoji: '👉', example: 'That is the school.' },
      { english: 'These are…', hebrew: 'אֵלֶּה…',    emoji: '✌️', example: 'These are my shoes.' },
      { english: 'Those are…', hebrew: 'אֵלֶּה שָׁם…', emoji: '🤙', example: 'Those are big buildings.' },
      { english: 'near (close)',  hebrew: 'קָרוֹב',   emoji: '📍', example: 'This pen is near me.' },
      { english: 'far (distant)', hebrew: 'רָחוֹק',   emoji: '🗺️', example: 'That mountain is far.' },
    ],
    quiz: [
      {
        id: 'dm3q1', type: 'multiple-choice',
        question: 'Singular + near = ?', answer: 'this',
        options: ['this', 'that', 'these', 'those'], emoji: '📍',
      },
      {
        id: 'dm3q2', type: 'multiple-choice',
        question: '___ are my pencils. (✌️ — on your desk)', answer: 'these',
        options: ['this', 'that', 'these', 'those'],
      },
      {
        id: 'dm3q3', type: 'multiple-choice',
        question: 'Plural + far = ?', answer: 'those',
        options: ['this', 'that', 'these', 'those'], emoji: '🗺️',
      },
      {
        id: 'dm3q4', type: 'multiple-choice',
        question: '"___ is my teacher." (one person standing next to you)', answer: 'This',
        options: ['This', 'That', 'These', 'Those'], emoji: '👩‍🏫',
      },
      {
        id: 'dm3q5', type: 'multiple-choice',
        question: '___ building over there is very tall. (🏢 — far)', answer: 'that',
        options: ['this', 'that', 'these', 'those'],
      },
    ],
  },
]
