export interface LetterGroup {
  id: string
  label: string
  hebrewLabel: string
  letters: string[] // lowercase
  color: string     // gradient classes
  bgColor: string
  textColor: string
  borderColor: string
  emoji: string
}

export const LETTER_GROUPS: LetterGroup[] = [
  {
    id: 'group1',
    label: 'Group 1',
    hebrewLabel: 'קבוצה 1',
    letters: ['t', 'm', 'a', 'b', 'n'],
    color: 'from-red-400 to-orange-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-300',
    emoji: '🔴',
  },
  {
    id: 'group2',
    label: 'Group 2',
    hebrewLabel: 'קבוצה 2',
    letters: ['i', 'd', 's', 'h', 'f'],
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-300',
    emoji: '🔵',
  },
  {
    id: 'group3',
    label: 'Group 3',
    hebrewLabel: 'קבוצה 3',
    letters: ['c', 'o', 'x', 'g', 'r'],
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    borderColor: 'border-green-300',
    emoji: '🟢',
  },
  {
    id: 'group4',
    label: 'Group 4',
    hebrewLabel: 'קבוצה 4',
    letters: ['p', 'e', 'l', 'k', 'y'],
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-300',
    emoji: '🟣',
  },
  {
    id: 'group5',
    label: 'Group 5',
    hebrewLabel: 'קבוצה 5',
    letters: ['j', 'u', 'q', 'v', 'w', 'z'],
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-300',
    emoji: '🩷',
  },
]
