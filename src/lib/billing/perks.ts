/**
 * What each family tier includes. One list for the landing page, /pricing and the perk checks.
 * Tier index = position in PARENT_TIERS (0 = 1 child ₪39, 1 = up to 3 ₪49, 2 = unlimited ₪69).
 * Learning content is the same in every tier — the higher tiers add extras for the family.
 */
export type TierIndex = 0 | 1 | 2

export type PerkId =
  | 'all_content' | 'cloud_progress' | 'speaking'
  | 'sibling_challenge' | 'family_goal'
  | 'monthly_report' | 'certificates' | 'early_access' | 'personal_support'

export interface Perk { id: PerkId; minTier: TierIndex; icon: string; titleHe: string; descHe: string }

export const PERKS: Perk[] = [
  { id: 'all_content', minTier: 0, icon: '📚', titleHe: 'כל תוכנית הלימוד', descHe: 'כל השלבים, המשחקים והתרגולים — מהאותיות הראשונות ועד שיחה באנגלית' },
  { id: 'speaking', minTier: 0, icon: '🗣️', titleHe: 'סצנות דיבור', descHe: 'סיפורים אינטראקטיביים עם דמויות מדברות: פיצרייה, גלידרייה, שדה תעופה ועוד' },
  { id: 'cloud_progress', minTier: 0, icon: '☁️', titleHe: 'פרופיל לכל ילד', descHe: 'כל ילד מתקדם בקצב שלו, וההתקדמות נשמרת בכל מכשיר' },
  { id: 'sibling_challenge', minTier: 1, icon: '🏆', titleHe: 'אתגר האחים השבועי', descHe: 'לוח משפחתי: מי אסף הכי הרבה כוכבים השבוע? עם חגיגה למנצח/ת' },
  { id: 'family_goal', minTier: 1, icon: '🎯', titleHe: 'יעד משפחתי', descHe: 'מציבים יעד כוכבים שבועי משותף ומתקדמים אליו יחד' },
  { id: 'monthly_report', minTier: 2, icon: '📄', titleHe: 'דוח חודשי להורים', descHe: 'דוח מעוצב לכל ילד: מה למד, כמה כוכבים, ימי פעילות והמלצות לתרגול בבית' },
  { id: 'certificates', minTier: 2, icon: '🎓', titleHe: 'תעודות הישג', descHe: 'תעודה אישית עם שם הילד להדפסה, על כל הישג בכל שלב' },
  { id: 'early_access', minTier: 2, icon: '✨', titleHe: 'גישה מוקדמת', descHe: 'סצנות ומשחקים חדשים — לפני כולם' },
  { id: 'personal_support', minTier: 2, icon: '💬', titleHe: 'תמיכה אישית', descHe: 'קו ישיר לשאלות, עם מענה מועדף' },
]

export const perksForTier = (tier: TierIndex) => PERKS.filter(p => p.minTier <= tier)
export const newPerksAtTier = (tier: TierIndex) => PERKS.filter(p => p.minTier === tier)
export const perkMinTier = (id: PerkId): TierIndex => PERKS.find(p => p.id === id)!.minTier
