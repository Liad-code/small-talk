import type { SubjectLevel } from '@/types'

export const bodyLevels: SubjectLevel[] = [
  {
    level: 1,
    title: 'Face & Head',
    description: 'Learn 6 parts of the face and head',
    words: [
      { english: 'Head',  hebrew: 'רֹאשׁ', emoji: '🧠', example: 'I have a big head.' },
      { english: 'Eye',   hebrew: 'עַיִן', emoji: '👁️', example: 'My eye is brown.' },
      { english: 'Nose',  hebrew: 'אַף',   emoji: '👃', example: 'I smell with my nose.' },
      { english: 'Mouth', hebrew: 'פֶּה',  emoji: '👄', example: 'I eat with my mouth.' },
      { english: 'Ear',   hebrew: 'אֹזֶן', emoji: '👂', example: 'I hear with my ear.' },
      { english: 'Hair',  hebrew: 'שֵׂעָר', emoji: '💇', example: 'My hair is long.' },
    ],
    quiz: [
      {
        id: 'bp1q1', type: 'multiple-choice',
        question: 'What do you use to smell? 👃', answer: 'Nose',
        options: ['Ear', 'Eye', 'Nose', 'Mouth'], emoji: '👃',
      },
      {
        id: 'bp1q2', type: 'multiple-choice',
        question: 'What is 👂 in English?', answer: 'Ear',
        options: ['Eye', 'Ear', 'Nose', 'Hair'], emoji: '👂',
      },
      {
        id: 'bp1q3', type: 'fill-blank',
        question: 'I eat with my ___. (👄)', answer: 'mouth',
        questionHebrew: 'אני אוכל עם ה___ שלי.',
      },
      {
        id: 'bp1q4', type: 'multiple-choice',
        question: 'What do you use to see? 👁️', answer: 'Eye',
        options: ['Ear', 'Mouth', 'Hair', 'Eye'], emoji: '👁️',
      },
      {
        id: 'bp1q5', type: 'fill-blank',
        question: 'My ___ is long and brown. (💇)', answer: 'hair',
        questionHebrew: 'ה___ שלי ארוך וחום.',
      },
    ],
  },
  {
    level: 2,
    title: 'Arms & Legs',
    description: 'Learn 6 major parts of the body',
    words: [
      { english: 'Hand',    hebrew: 'יָד',     emoji: '🤚', example: 'I wave my hand.' },
      { english: 'Arm',     hebrew: 'זְרוֹעַ',  emoji: '💪', example: 'My arm is strong.' },
      { english: 'Leg',     hebrew: 'רֶגֶל',   emoji: '🦵', example: 'I kick with my leg.' },
      { english: 'Foot',    hebrew: 'כַּף רֶגֶל', emoji: '🦶', example: 'My foot is in the shoe.' },
      { english: 'Stomach', hebrew: 'בֶּטֶן',   emoji: '🫃', example: 'My stomach is full.' },
      { english: 'Back',    hebrew: 'גַּב',     emoji: '🔙', example: 'My back hurts.' },
    ],
    quiz: [
      {
        id: 'bp2q1', type: 'multiple-choice',
        question: 'Which body part do you kick with? 🦵', answer: 'Leg',
        options: ['Arm', 'Hand', 'Leg', 'Back'], emoji: '🦵',
      },
      {
        id: 'bp2q2', type: 'multiple-choice',
        question: 'What is 🤚 in English?', answer: 'Hand',
        options: ['Foot', 'Arm', 'Hand', 'Back'], emoji: '🤚',
      },
      {
        id: 'bp2q3', type: 'fill-blank',
        question: 'My ___ is strong. (💪)', answer: 'arm',
        questionHebrew: 'ה___ שלי חזקה.',
      },
      {
        id: 'bp2q4', type: 'multiple-choice',
        question: 'What is inside your shoe? 👟', answer: 'Foot',
        options: ['Hand', 'Back', 'Stomach', 'Foot'], emoji: '🦶',
      },
      {
        id: 'bp2q5', type: 'fill-blank',
        question: 'My ___ is full after lunch. (🫃)', answer: 'stomach',
        questionHebrew: 'ה___ שלי מלאה אחרי ארוחת צהריים.',
      },
    ],
  },
  {
    level: 3,
    title: 'Body Details',
    description: 'Learn 6 smaller, detailed body parts',
    words: [
      { english: 'Finger',   hebrew: 'אֶצְבַּע', emoji: '☝️', example: 'I point with my finger.' },
      { english: 'Tooth',    hebrew: 'שֵׁן',     emoji: '🦷', example: 'I brush my tooth.' },
      { english: 'Tongue',   hebrew: 'לָשׁוֹן',  emoji: '👅', example: 'My tongue tastes food.' },
      { english: 'Knee',     hebrew: 'בֶּרֶךְ',  emoji: '🦵', example: 'I hurt my knee.' },
      { english: 'Elbow',    hebrew: 'מַרְפֵּק', emoji: '💪', example: 'My elbow bends.' },
      { english: 'Shoulder', hebrew: 'כָּתֵף',   emoji: '🤷', example: 'I carry a bag on my shoulder.' },
    ],
    quiz: [
      {
        id: 'bp3q1', type: 'multiple-choice',
        question: 'Which body part do you use to point? ☝️', answer: 'Finger',
        options: ['Knee', 'Tooth', 'Finger', 'Tongue'], emoji: '☝️',
      },
      {
        id: 'bp3q2', type: 'fill-blank',
        question: 'My ___ tastes sweet food. (👅)', answer: 'tongue',
        questionHebrew: 'ה___ שלי טועמת אוכל מתוק.',
      },
      {
        id: 'bp3q3', type: 'multiple-choice',
        question: 'What do you brush every morning? 🪥', answer: 'Tooth',
        options: ['Elbow', 'Knee', 'Tooth', 'Shoulder'], emoji: '🦷',
      },
      {
        id: 'bp3q4', type: 'fill-blank',
        question: 'I carry my bag on my ___. (🤷)', answer: 'shoulder',
        questionHebrew: 'אני נושא את התיק שלי על ה___ שלי.',
      },
      {
        id: 'bp3q5', type: 'multiple-choice',
        question: 'Complete: "My ___ bends when I sit."', answer: 'knee',
        options: ['elbow', 'knee', 'finger', 'tooth'], emoji: '🦵',
      },
    ],
  },
]
