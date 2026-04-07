import type { SubjectLevel } from '@/types'

export const prepTimeLevels: SubjectLevel[] = [
  {
    level: 1,
    title: '"At" for Time',
    description: 'Use "at" with clock times and fixed time expressions like at noon, at night',
    words: [
      { english: 'At 3 o\'clock', hebrew: 'בְּ-3',              emoji: '🕒', example: 'School ends at 3 o\'clock.' },
      { english: 'At noon',       hebrew: 'בְּצָהֳרַיִם',       emoji: '☀️', example: 'We eat lunch at noon.' },
      { english: 'At night',      hebrew: 'בַּלַּיְלָה',         emoji: '🌙', example: 'I sleep at night.' },
      { english: 'At midnight',   hebrew: 'בַּחֲצוֹת',           emoji: '🕛', example: 'The party ends at midnight.' },
      { english: 'At sunrise',    hebrew: 'בִּזְרִיחָה',         emoji: '🌅', example: 'Birds sing at sunrise.' },
      { english: 'At the weekend',hebrew: 'בְּסוֹף הַשָּׁבוּעַ', emoji: '🏖️', example: 'We relax at the weekend.' },
    ],
    quiz: [
      {
        id: 'pt1q1', type: 'multiple-choice',
        question: '"School starts ___ 8 o\'clock." — which preposition?', answer: 'at',
        options: ['in', 'on', 'at', 'by'], emoji: '🕗',
      },
      {
        id: 'pt1q2', type: 'multiple-choice',
        question: 'I sleep ___ night. (🌙)', answer: 'at',
        options: ['in', 'on', 'at', 'by'],
      },
      {
        id: 'pt1q3', type: 'multiple-choice',
        question: '"We eat lunch ___ noon." — which preposition?', answer: 'at',
        options: ['in', 'on', 'at', 'by'], emoji: '☀️',
      },
      {
        id: 'pt1q4', type: 'multiple-choice',
        question: '"בְּסוֹף הַשָּׁבוּעַ" in English is:', answer: 'at the weekend',
        options: ['in the weekend', 'on the weekend', 'at the weekend', 'by the weekend'], emoji: '🏖️',
      },
      {
        id: 'pt1q5', type: 'multiple-choice',
        question: 'The film starts ___ 7 o\'clock. (🎬)', answer: 'at',
        options: ['in', 'on', 'at', 'by'],
      },
    ],
  },
  {
    level: 2,
    title: '"On" for Days & Dates',
    description: 'Use "on" with days of the week, dates, and special days like birthdays',
    words: [
      { english: 'On Monday',       hebrew: 'בְּיוֹם שֵׁנִי',           emoji: '📅', example: 'We have PE on Monday.' },
      { english: 'On Friday',       hebrew: 'בְּיוֹם שִׁישִּׁי',         emoji: '🎉', example: 'School finishes early on Friday.' },
      { english: 'On 3 March',      hebrew: 'בְּ-3 בְּמַרְץ',            emoji: '📆', example: 'My birthday is on 3 March.' },
      { english: 'On my birthday',  hebrew: 'בְּיוֹם הַהוּלֶּדֶת שֶׁלִּי', emoji: '🎂', example: 'I get presents on my birthday.' },
      { english: 'On New Year\'s Day', hebrew: 'בְּרֹאשׁ הַשָּׁנָה',     emoji: '🎊', example: 'We celebrate on New Year\'s Day.' },
      { english: 'On Saturday',     hebrew: 'בְּשַׁבָּת',                 emoji: '🕍', example: 'I rest on Saturday.' },
    ],
    quiz: [
      {
        id: 'pt2q1', type: 'multiple-choice',
        question: '"We have maths ___ Monday." — which preposition?', answer: 'on',
        options: ['in', 'on', 'at', 'by'], emoji: '📅',
      },
      {
        id: 'pt2q2', type: 'multiple-choice',
        question: 'My birthday is ___ 5 April. (🎂)', answer: 'on',
        options: ['in', 'on', 'at', 'by'],
      },
      {
        id: 'pt2q3', type: 'multiple-choice',
        question: '"I get presents ___ my birthday." — which preposition?', answer: 'on',
        options: ['in', 'on', 'at', 'by'], emoji: '🎁',
      },
      {
        id: 'pt2q4', type: 'multiple-choice',
        question: '"בְּיוֹם שֵׁנִי" in English is:', answer: 'on Monday',
        options: ['at Monday', 'in Monday', 'on Monday', 'by Monday'], emoji: '📅',
      },
      {
        id: 'pt2q5', type: 'multiple-choice',
        question: 'School is closed ___ Saturday. (🕍)', answer: 'on',
        options: ['in', 'on', 'at', 'by'],
      },
    ],
  },
  {
    level: 3,
    title: '"In" for Months, Years & Parts of the Day',
    description: 'Use "in" with months, years, seasons, and morning/afternoon/evening',
    words: [
      { english: 'In the morning',  hebrew: 'בַּבֹּקֶר',  emoji: '🌅', example: 'I wake up in the morning.' },
      { english: 'In the evening',  hebrew: 'בָּעֶרֶב',   emoji: '🌆', example: 'We eat dinner in the evening.' },
      { english: 'In March',        hebrew: 'בְּמַרְץ',   emoji: '📅', example: 'Spring starts in March.' },
      { english: 'In 2024',         hebrew: 'בִּשְׁנַת 2024', emoji: '📆', example: 'I was born in 2014.' },
      { english: 'In summer',       hebrew: 'בַּקַּיִץ',  emoji: '☀️', example: 'We swim in summer.' },
      { english: 'In winter',       hebrew: 'בַּחֹרֶף',   emoji: '❄️', example: 'It snows in winter.' },
    ],
    quiz: [
      {
        id: 'pt3q1', type: 'multiple-choice',
        question: '"I wake up ___ the morning." — which preposition?', answer: 'in',
        options: ['in', 'on', 'at', 'by'], emoji: '🌅',
      },
      {
        id: 'pt3q2', type: 'multiple-choice',
        question: 'My birthday is ___ July. (📅 — a month)', answer: 'in',
        options: ['in', 'on', 'at', 'by'],
      },
      {
        id: 'pt3q3', type: 'multiple-choice',
        question: 'Choose the correct preposition: "school at 8" / "Monday" / "the morning"', answer: 'at / on / in',
        options: ['at / on / in', 'on / at / in', 'in / on / at', 'at / in / on'], emoji: '⏰',
      },
      {
        id: 'pt3q4', type: 'multiple-choice',
        question: '"We swim ___ summer." — which preposition?', answer: 'in',
        options: ['in', 'on', 'at', 'by'], emoji: '🏊',
      },
      {
        id: 'pt3q5', type: 'multiple-choice',
        question: 'It gets cold ___ winter. (❄️)', answer: 'in',
        options: ['in', 'on', 'at', 'by'],
      },
    ],
  },
]
