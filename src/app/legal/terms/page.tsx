export const metadata = { title: 'תנאי שימוש – Small Talk' }

export default function TermsPage() {
  return (
    <article className="flex flex-col gap-4 text-gray-700">
      <h1 className="font-display font-bold text-2xl text-gray-900">תנאי שימוש</h1>
      <p className="text-xs font-bold text-gray-400">עודכן לאחרונה: יולי 2026</p>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">1. השירות</h2>
        <p className="text-sm font-medium leading-relaxed">
          Small Talk (small-talk.online) היא פלטפורמה מקוונת ללימוד אנגלית לילדים דוברי עברית, הכוללת
          שלבי לימוד, תרגולים, משחקים ומעקב התקדמות. השימוש באתר מהווה הסכמה לתנאים אלה.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">2. חשבונות ופרופילים</h2>
        <p className="text-sm font-medium leading-relaxed">
          ההרשמה מתבצעת באמצעות חשבון Google של הורה או אפוטרופוס בגיר. ההורה רשאי ליצור פרופילים
          לילדיו; הפרופילים אינם חשבונות עצמאיים ואינם דורשים פרטים מזהים מעבר לשם תצוגה. ההורה
          אחראי לשימוש הנעשה בחשבונו ולשמירה על פרטי הגישה אליו.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">3. מנוי ותשלום</h2>
        <p className="text-sm font-medium leading-relaxed">
          בתקופת ההרצה השירות פתוח ללא תשלום. עם השקת מערך המנויים, חלקים מהשירות (שלבים 2–6) יהיו
          כרוכים במנוי חודשי מתחדש שמחירו יוצג בעמוד המחירים לפני כל רכישה (כולל מע״מ). שלב 1 יישאר
          פתוח ללא תשלום. ניתן לבטל את המנוי בכל עת באופן מקוון — ראו מדיניות ביטולים והחזרים.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">4. שימוש מותר</h2>
        <p className="text-sm font-medium leading-relaxed">
          השירות מיועד לשימוש אישי-ביתי או חינוכי. אין להעתיק, להפיץ או למכור תכנים מהאתר, ואין לבצע
          פעולות הפוגעות בפעילות התקינה של השירות או בפרטיות משתמשים אחרים.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">5. קניין רוחני</h2>
        <p className="text-sm font-medium leading-relaxed">
          כלל התכנים באתר — תרגולים, טקסטים, עיצוב ואיורים — הם קניינה של Small Talk או של בעלי
          הרישיונות שלה, ומוגנים בזכויות יוצרים.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">6. הגבלת אחריות</h2>
        <p className="text-sm font-medium leading-relaxed">
          השירות ניתן כפי שהוא (As-Is). אנו פועלים לזמינות ותקינות מרביות, אך איננו מתחייבים לפעולה
          רציפה ללא תקלות. אחריותנו מוגבלת בהתאם לדין החל.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">7. שינויים בתנאים</h2>
        <p className="text-sm font-medium leading-relaxed">
          נעדכן תנאים אלה מעת לעת; שינוי מהותי יפורסם באתר. המשך שימוש לאחר עדכון מהווה הסכמה לנוסח
          המעודכן.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">8. יצירת קשר</h2>
        <p className="text-sm font-medium leading-relaxed">
          לשאלות: <a href="mailto:smalltalk.english1@gmail.com" className="text-primary">smalltalk.english1@gmail.com</a>
        </p>
      </section>
    </article>
  )
}
