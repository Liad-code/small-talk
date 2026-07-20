export const metadata = { title: 'מדיניות פרטיות – Small Talk' }

export default function PrivacyPage() {
  return (
    <article className="flex flex-col gap-4 text-gray-700">
      <h1 className="font-display font-bold text-2xl text-gray-900">מדיניות פרטיות</h1>
      <p className="text-xs font-bold text-gray-400">עודכן לאחרונה: יולי 2026 · בהתאם לחוק הגנת הפרטיות, התשמ״א-1981</p>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">1. אילו נתונים נאספים</h2>
        <p className="text-sm font-medium leading-relaxed">
          <strong>מההורה (בעל החשבון):</strong> שם, כתובת דוא״ל ותמונת פרופיל — כפי שמתקבלים מחשבון
          Google בעת ההתחברות.
          <br />
          <strong>על הילד:</strong> מינימום הכרחי בלבד — שם תצוגה (או כינוי) שההורה בוחר, דמות
          (אימוג׳י), טווח גיל אופציונלי, ונתוני התקדמות בלימוד (כוכבים, תרגולים שהושלמו). איננו
          אוספים דוא״ל, טלפון או כל פרט מזהה אחר של הילד, ולילד אין חשבון עצמאי.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">2. הסכמה ואחריות הורית</h2>
        <p className="text-sm font-medium leading-relaxed">
          החשבון נפתח ומנוהל על ידי הורה/אפוטרופוס בגיר, והוא הנותן את ההסכמה לעיבוד נתוני הילד
          במסגרת השירות. יצירת פרופיל ילד מהווה הסכמה כאמור.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">3. למה משמשים הנתונים</h2>
        <p className="text-sm font-medium leading-relaxed">
          אך ורק להפעלת השירות: שמירת התקדמות לכל פרופיל, הצגתה להורה, ניהול החשבון והמנוי (כשיושק),
          ואבטחת השירות. איננו מוכרים או משכירים מידע אישי לצדדים שלישיים.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">4. עוגיות (Cookies) ואחסון מקומי</h2>
        <p className="text-sm font-medium leading-relaxed">
          האתר משתמש בעוגיות חיוניות בלבד: עוגיית התחברות (session) ועוגיית הפרופיל הפעיל, וכן
          באחסון מקומי בדפדפן לשמירת התקדמות מהירה. אין באתר כיום עוגיות פרסום או מעקב. אם יתווספו
          כלי אנליטיקה — תוצג הודעת הסכמה מתאימה.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">5. אחסון ואבטחה</h2>
        <p className="text-sm font-medium leading-relaxed">
          הנתונים נשמרים במסד נתונים מנוהל (Neon/Vercel) בתקשורת מוצפנת (TLS) ובהצפנה במנוחה. הגישה
          לנתונים מוגבלת לחשבון ההורה המחובר בלבד, והמערכת כוללת אמצעי הגנה כגון אימות, הרשאות
          והגבלת קצב בקשות.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">6. זכויותיך</h2>
        <p className="text-sm font-medium leading-relaxed">
          הנך זכאי/ת לעיין במידע, לתקנו ולמחקו. עיון והתקדמות זמינים בעמוד ״החשבון שלי״; מחיקת
          החשבון וכל הנתונים (כולל כל פרופילי הילדים) זמינה שם בלחיצה — המחיקה מלאה ובלתי הפיכה.
          ניתן גם לפנות אלינו בדוא״ל.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">7. שמירת נתונים</h2>
        <p className="text-sm font-medium leading-relaxed">
          הנתונים נשמרים כל עוד החשבון פעיל. עם מחיקת החשבון נמחקים כל הנתונים ממסד הנתונים הפעיל;
          גיבויים מתגלגלים נמחקים במחזור הגיבוי הרגיל.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">8. פנייה בנושאי פרטיות</h2>
        <p className="text-sm font-medium leading-relaxed">
          <a href="mailto:smalltalk.english1@gmail.com" className="text-primary">smalltalk.english1@gmail.com</a>
        </p>
      </section>
    </article>
  )
}
