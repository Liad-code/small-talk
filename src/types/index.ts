export type DifficultyLevel = 1 | 2 | 3

export interface WordItem {
  english: string
  hebrew: string
  emoji: string
  example?: string
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'fill-blank' | 'match'
  question: string
  questionHebrew?: string
  answer: string
  options?: string[]
  emoji?: string
}

export interface SubjectLevel {
  level: DifficultyLevel
  title: string
  description: string
  words: WordItem[]
  quiz: QuizQuestion[]
}

export interface Subject {
  id: string
  title: string
  hebrewTitle: string
  emoji: string
  color: string        // Tailwind bg class
  textColor: string    // Tailwind text class
  borderColor: string  // Tailwind border class
  category: 'beginner' | 'intermediate' | 'advanced' | 'beginner-grammar' | 'intermediate-grammar' | 'advanced-grammar'
  levels: SubjectLevel[]
}

export interface UserProgress {
  [subjectId: string]: {
    [level: number]: {
      lessonDone: boolean
      quizScore: number    // 0-100
      stars: number        // 0-3
      gameHighScore: number
    }
  }
}

export interface GameConfig {
  id: string
  title: string
  description: string
  emoji: string
  subjectId?: string
  isExternal?: boolean   // true = user's own game pasted in /public/games/
  externalPath?: string
}
