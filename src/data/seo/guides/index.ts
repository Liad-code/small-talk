import type { Guide } from './types'
import { GUIDE as englishForKidsAtHome } from './english-for-kids-at-home'
import { GUIDE as whatAgeToStartEnglish } from './what-age-to-start-english'
import { GUIDE as teachingEnglishLetters } from './teaching-english-letters'
import { GUIDE as whatIsPhonics } from './what-is-phonics'
import { GUIDE as sightWords } from './sight-words'
import { GUIDE as kidsSpeakingEnglish } from './kids-speaking-english'
import { GUIDE as tutorOrApp } from './tutor-or-app'

export type { Guide, GuideSection } from './types'

/** Pillar first, then the learning path in order, then the decision guide. */
export const GUIDES: Guide[] = [
  englishForKidsAtHome,
  whatAgeToStartEnglish,
  teachingEnglishLetters,
  whatIsPhonics,
  sightWords,
  kidsSpeakingEnglish,
  tutorOrApp,
]
