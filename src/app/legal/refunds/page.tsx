export const metadata = { title: 'ביטולים והחזרים – Small Talk' }

export default function RefundsPage() {
  return (
    <article className="flex flex-col gap-4 text-gray-700">
      <h1 className="font-display font-bold text-2xl text-gray-900">מדיניות ביטולים והחזרים</h1>
      <p className="text-xs font-bold text-gray-400">עודכן לאחרונה: יולי 2026 · בהתאם לחוק הגנת הצרכן, התשמ״א-1981</p>

      <p className="text-sm font-medium leading-relaxed bg-blue-50 border-2 border-blue-100 rounded-xl p-3">
        בתקופת ההרצה השירות חינמי ואינו כרוך בתשלום. המדיניות שלהלן תיכנס לתוקף עם השקת מערך
        המנויים בתשלום.
      </p>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">1. ביטול מנוי</h2>
        <p className="text-sm font-medium leading-relaxed">
          ניתן לבטל את המנוי בכל עת, באופן מקוון, מעמוד ניהול המנוי — באותו ערוץ שבו בוצעה הרכישה,
          ללא צורך בשיחת טלפון. הביטול ייכנס לתוקף בתום תקופת החיוב ששולמה, והגישה תישמר עד אז.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">2. ביטול בתוך 14 יום (עסקת מכר מרחוק)</h2>
        <p className="text-sm font-medium leading-relaxed">
          בהתאם להוראות חוק הגנת הצרכן לעניין עסקת מכר מרחוק, ניתן לבטל את העסקה בתוך 14 יום ממועד
          ביצועה. במקרה כזה יוחזר התשלום בניכוי החלק היחסי של תקופת השימוש שנוצלה ובניכוי דמי ביטול
          כדין (הנמוך מבין 5% או 100 ₪), ככל שיחולו.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">3. תקופת ניסיון</h2>
        <p className="text-sm font-medium leading-relaxed">
          מנוי חדש כולל תקופת ניסיון חינם. ביטול במהלך תקופת הניסיון אינו כרוך בחיוב כלשהו.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">4. חשבוניות</h2>
        <p className="text-sm font-medium leading-relaxed">
          עבור כל חיוב תופק חשבונית מס/קבלה כדין ותישלח לכתובת הדוא״ל של בעל החשבון.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">5. יצירת קשר</h2>
        <p className="text-sm font-medium leading-relaxed">
          לבקשות ביטול או שאלות: <a href="mailto:smalltalk.english1@gmail.com" className="text-primary">smalltalk.english1@gmail.com</a>
        </p>
      </section>
    </article>
  )
}
