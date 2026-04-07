import type { SubjectLevel } from '@/types'

export const numberLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Numbers 1-10',
    description: 'Count from one to ten in English',
    words: [
      { english: 'One',   hebrew: '', emoji: '1️⃣', example: 'I have one nose.' },
      { english: 'Two',   hebrew: '', emoji: '2️⃣', example: 'I have two eyes.' },
      { english: 'Three', hebrew: '', emoji: '3️⃣', example: 'I see three dogs.' },
      { english: 'Four',  hebrew: '', emoji: '4️⃣', example: 'A cat has four legs.' },
      { english: 'Five',  hebrew: '', emoji: '5️⃣', example: 'I have five fingers.' },
      { english: 'Six',   hebrew: '', emoji: '6️⃣', example: 'There are six apples.' },
      { english: 'Seven', hebrew: '', emoji: '7️⃣', example: 'I am seven years old.' },
      { english: 'Eight', hebrew: '', emoji: '8️⃣', example: 'I have eight crayons.' },
      { english: 'Nine',  hebrew: '', emoji: '9️⃣', example: 'Nine birds sit on a tree.' },
      { english: 'Ten',   hebrew: '', emoji: '🔟', example: 'Ten fingers on two hands.' },
    ],
    quiz: [
      {
        id: 'n1q1', type: 'multiple-choice',
        question: 'How many legs does a cat have? 🐱', answer: 'Four',
        options: ['Two', 'Three', 'Four', 'Six'],
      },
      {
        id: 'n1q2', type: 'multiple-choice',
        question: 'I have ___ fingers on one hand. (✋)', answer: 'Five',
        options: ['Three', 'Four', 'Five', 'Six'],
      },
      {
        id: 'n1q3', type: 'multiple-choice',
        question: 'What number comes after NINE?', answer: 'Ten',
        options: ['Eight', 'Seven', 'Ten', 'Six'],
      },
      {
        id: 'n1q4', type: 'multiple-choice',
        question: 'Two plus one equals ___', answer: 'Three',
        options: ['Two', 'Three', 'Four', 'Five'],
      },
      {
        id: 'n1q5', type: 'multiple-choice',
        question: 'How many eyes do you have? 👀', answer: 'Two',
        options: ['One', 'Two', 'Three', 'Four'],
      },
    ],
  },
  {
    level: 2,
    title: 'Numbers 11-20',
    description: 'Learn the teen numbers',
    words: [
      { english: 'Eleven',    hebrew: '', emoji: '1️⃣1️⃣' },
      { english: 'Twelve',    hebrew: '', emoji: '1️⃣2️⃣' },
      { english: 'Thirteen',  hebrew: '', emoji: '1️⃣3️⃣' },
      { english: 'Fourteen',  hebrew: '', emoji: '1️⃣4️⃣' },
      { english: 'Fifteen',   hebrew: '', emoji: '1️⃣5️⃣' },
      { english: 'Sixteen',   hebrew: '', emoji: '1️⃣6️⃣' },
      { english: 'Seventeen', hebrew: '', emoji: '1️⃣7️⃣' },
      { english: 'Eighteen',  hebrew: '', emoji: '1️⃣8️⃣' },
      { english: 'Nineteen',  hebrew: '', emoji: '1️⃣9️⃣' },
      { english: 'Twenty',    hebrew: '', emoji: '2️⃣0️⃣' },
    ],
    quiz: [
      {
        id: 'n2q1', type: 'multiple-choice',
        question: 'How do you say "12" in English?', answer: 'Twelve',
        options: ['Eleven', 'Twelve', 'Twenty', 'Thirteen'],
      },
      {
        id: 'n2q2', type: 'multiple-choice',
        question: 'Ten plus five equals ___', answer: 'Fifteen',
        options: ['Eleven', 'Twelve', 'Fifteen', 'Seventeen'],
      },
      {
        id: 'n2q3', type: 'multiple-choice',
        question: 'Which number is "20" in English?', answer: 'Twenty',
        options: ['Twelve', 'Nineteen', 'Twenty', 'Fifteen'],
      },
      {
        id: 'n2q4', type: 'multiple-choice',
        question: 'The number after nineteen is ___', answer: 'Twenty',
        options: ['Eighteen', 'Nineteen', 'Twenty', 'Twelve'],
      },
      {
        id: 'n2q5', type: 'multiple-choice',
        question: 'Which number is BETWEEN 16 and 18?', answer: 'Seventeen',
        options: ['Sixteen', 'Seventeen', 'Fourteen', 'Eighteen'],
      },
    ],
  },
  {
    level: 3,
    title: 'Numbers in Sentences',
    description: 'Use numbers in real sentences',
    words: [
      { english: 'First',   hebrew: '', emoji: '🥇', example: 'I am first in line.' },
      { english: 'Second',  hebrew: '', emoji: '🥈', example: 'She is second.' },
      { english: 'Third',   hebrew: '', emoji: '🥉', example: 'He is third.' },
      { english: 'Last',    hebrew: '', emoji: '🔚', example: 'I am last in the queue.' },
      { english: 'Double',  hebrew: '', emoji: '✌️', example: 'Double four is eight.' },
      { english: 'Half',    hebrew: '', emoji: '½',  example: 'Half of ten is five.' },
    ],
    quiz: [
      {
        id: 'n3q1', type: 'multiple-choice',
        question: 'Complete: "Half of ten is ___"', answer: 'five',
        options: ['two', 'five', 'eight', 'six'],
      },
      {
        id: 'n3q2', type: 'multiple-choice',
        question: 'Double six is ___', answer: 'twelve',
        options: ['ten', 'twelve', 'fourteen', 'sixteen'],
      },
      {
        id: 'n3q3', type: 'multiple-choice',
        question: 'Who wins the gold medal? 🥇', answer: 'First place',
        options: ['Second place', 'Third place', 'First place', 'Last place'],
      },
      {
        id: 'n3q4', type: 'multiple-choice',
        question: 'The ___ person in the race wins silver. (🥈)', answer: 'second',
        options: ['first', 'second', 'third', 'last'],
      },
      {
        id: 'n3q5', type: 'multiple-choice',
        question: 'Which word means "the very end"?', answer: 'Last',
        options: ['First', 'Half', 'Last', 'Double'],
      },
    ],
  },
]
