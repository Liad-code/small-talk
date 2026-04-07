import type { SubjectLevel } from '@/types'

export const goingToLevels: SubjectLevel[] = [
  {
    level: 1,
    title: "Be Going To — Plans",
    description: 'Use "be going to + base verb" for future plans you have already decided on',
    words: [
      { english: "I'm going to",     hebrew: 'אֲנִי הוֹלֵךְ לְ…',       emoji: '📋', example: "I'm going to visit Grandma." },
      { english: "You're going to",  hebrew: 'אַתָּה הוֹלֵךְ לְ…',       emoji: '🫵', example: "You're going to love this!" },
      { english: "He's going to",    hebrew: 'הוּא הוֹלֵךְ לְ…',         emoji: '🧒', example: "He's going to play football." },
      { english: "She's going to",   hebrew: 'הִיא הוֹלֶכֶת לְ…',        emoji: '👧', example: "She's going to study tonight." },
      { english: "We're going to",   hebrew: 'אֲנַחְנוּ הוֹלְכִים לְ…',  emoji: '👥', example: "We're going to have a picnic." },
      { english: "They're going to", hebrew: 'הֵם הוֹלְכִים לְ…',        emoji: '👫', example: "They're going to move house." },
    ],
    quiz: [
      {
        id: 'gt1q1', type: 'multiple-choice',
        question: '"She ___ study tonight." (be going to)', answer: "is going to",
        options: ["going to", "is going to", "will going to", "are going to"], emoji: '📚',
      },
      {
        id: 'gt1q2', type: 'multiple-choice',
        question: '"Be going to" is used for:', answer: 'plans already decided',
        options: ['spontaneous decisions', 'plans already decided', 'past habits', 'current actions'], emoji: '📋',
      },
      {
        id: 'gt1q3', type: 'fill-blank',
        question: 'I ___ going to visit my grandma tomorrow. (📋)', answer: 'am',
        questionHebrew: 'אני ___ לבקר את סבתא שלי מחר.',
      },
      {
        id: 'gt1q4', type: 'multiple-choice',
        question: 'Which is correct?', answer: "They're going to move house.",
        options: ["They're going to moves house.", "They're going to moving house.", "They're going to move house.", "They going to move house."], emoji: '🏠',
      },
      {
        id: 'gt1q5', type: 'fill-blank',
        question: 'We ___ going to have a picnic on Sunday. (👥)', answer: 'are',
        questionHebrew: 'אנחנו ___ לקיים פיקניק ביום ראשון.',
      },
    ],
  },
  {
    level: 2,
    title: "Not Going To / Are You Going To?",
    description: 'Learn the negative and question forms of be going to',
    words: [
      { english: "I'm not going to",     hebrew: 'אֲנִי לֹא הוֹלֵךְ לְ…', emoji: '🚫', example: "I'm not going to be late." },
      { english: "He isn't going to",    hebrew: 'הוּא לֹא הוֹלֵךְ לְ…',  emoji: '🧒', example: "He isn't going to come." },
      { english: "They aren't going to", hebrew: 'הֵם לֹא הוֹלְכִים לְ…', emoji: '👫', example: "They aren't going to finish." },
      { english: 'Are you going to…?',   hebrew: 'הַאִם אַתָּה הוֹלֵךְ לְ…?', emoji: '❓', example: 'Are you going to study?' },
      { english: 'Is she going to…?',    hebrew: 'הַאִם הִיא הוֹלֶכֶת לְ…?', emoji: '❓', example: 'Is she going to come?' },
      { english: 'Yes / No short answers',hebrew: 'כֵּן / לֹא',            emoji: '✅', example: 'Yes, I am. No, I\'m not.' },
    ],
    quiz: [
      {
        id: 'gt2q1', type: 'multiple-choice',
        question: '"He ___ come to the party." (negative going to)', answer: "isn't going to",
        options: ["isn't going to", "aren't going to", "don't going to", "won't going to"], emoji: '🎉',
      },
      {
        id: 'gt2q2', type: 'fill-blank',
        question: '___ you going to study tonight? (❓)', answer: 'are',
        questionHebrew: '___ אתה הולך ללמוד הלילה?',
      },
      {
        id: 'gt2q3', type: 'multiple-choice',
        question: '"Are you going to come?" → short positive answer', answer: "Yes, I am.",
        options: ["Yes, I will.", "Yes, I am.", "Yes, I do.", "Yes, I going to."], emoji: '✅',
      },
      {
        id: 'gt2q4', type: 'multiple-choice',
        question: 'Which is correct? (negative)', answer: "I'm not going to be late.",
        options: ["I'm not going to being late.", "I'm not going to be late.", "I not going to be late.", "I'm going not to be late."], emoji: '🚫',
      },
      {
        id: 'gt2q5', type: 'fill-blank',
        question: "She ___ going to forget this time! (🚫 — negative)", answer: "isn't",
        questionHebrew: 'היא ___ הולכת לשכוח הפעם!',
      },
    ],
  },
  {
    level: 3,
    title: 'Will vs Going To',
    description: 'Learn the difference — "will" for spontaneous decisions, "going to" for pre-made plans',
    words: [
      { english: 'Will — instant decision',    hebrew: 'הַחְלָטָה מִיָּד',    emoji: '💡', example: "I'll have the pizza! (decided now)" },
      { english: 'Going to — planned',          hebrew: 'תָּכְנִית מֻכֶּנֶת', emoji: '📋', example: "I'm going to visit Grandma. (planned)" },
      { english: 'Will — prediction',           hebrew: 'תַּחֲזִית',          emoji: '🔮', example: "It will be cold tomorrow." },
      { english: 'Going to — evidence',         hebrew: 'עֵדוּת / סִימָן',    emoji: '🌧️', example: "It's going to rain — look at those clouds!" },
      { english: 'Will — offer/promise',        hebrew: 'הַצָּעָה / הַבְטָחָה', emoji: '🤝', example: "I'll help you with that." },
      { english: 'Going to — intention',        hebrew: 'כַּוָּנָה',          emoji: '🎯', example: "I'm going to be a doctor one day." },
    ],
    quiz: [
      {
        id: 'gt3q1', type: 'multiple-choice',
        question: 'Someone asks: "What do you want to eat?" You decide now: "I ___ have the fish."', answer: "'ll",
        options: ["'m going to", "'ll", "'ve", "am"], emoji: '🐟',
      },
      {
        id: 'gt3q2', type: 'multiple-choice',
        question: 'You planned a trip last week. You say: "I ___ visit Paris next month."', answer: "'m going to",
        options: ["'ll", "'m going to", "'ve", "was"], emoji: '🗼',
      },
      {
        id: 'gt3q3', type: 'fill-blank',
        question: 'Look at those clouds! It ___ going to rain. (🌧️)', answer: 'is',
        questionHebrew: 'תסתכל על העננים האלה! יורד ___ גשם.',
      },
      {
        id: 'gt3q4', type: 'multiple-choice',
        question: '"Don\'t worry, I ___ help you." (offering right now)', answer: 'will',
        options: ['am going to', 'will', 'was', 'did'], emoji: '🤝',
      },
      {
        id: 'gt3q5', type: 'fill-blank',
        question: 'I ___ going to be a doctor when I grow up. (🎯 — my intention)', answer: 'am',
        questionHebrew: 'אני ___ להיות רופא כשאגדל.',
      },
    ],
  },
]
