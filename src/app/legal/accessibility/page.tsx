export const metadata = {
  title: 'הצהרת נגישות – Small Talk',
  description: 'הצהרת הנגישות של Small Talk: התאמות הנגישות באתר, תפריט הנגישות, מגבלות ידועות ודרכי פנייה לרכז/ת הנגישות.',
  alternates: { canonical: '/legal/accessibility' },
}

const CONTACT_EMAIL = 'smalltalk.english1@gmail.com'

/**
 * Accessibility statement (תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013,
 * תקנה 35ה). The owner should add the coordinator's name and phone (see the note in the plan file).
 */
export default function AccessibilityPage() {
  return (
    <article className="flex flex-col gap-4 text-gray-700">
      <h1 className="font-display font-bold text-2xl text-gray-900">הצהרת נגישות</h1>
      <p className="text-xs font-bold text-gray-400">עודכנה לאחרונה: נובמבר 2026</p>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">המחויבות שלנו</h2>
        <p className="text-sm font-medium leading-relaxed">
          Small Talk רואה חשיבות רבה במתן שירות שוויוני ונגיש לכל המשתמשים, ובכלל זה הורים וילדים עם מוגבלות.
          אנו פועלים להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
          התשע״ג-2013, ולתקן הישראלי ת״י 5568 (המבוסס על הנחיות WCAG 2.0) ברמה AA.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">התאמות הנגישות באתר</h2>
        <ul className="text-sm font-medium leading-relaxed list-disc pr-5 flex flex-col gap-1">
          <li>תפריט נגישות (כפתור ♿ בצד המסך) בכל עמודי האתר: הגדלת והקטנת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, גופן קריא ועצירת אנימציות. ההגדרות נשמרות במכשיר.</li>
          <li>אפשרות ניווט במקלדת, עם סימון בולט של הרכיב הממוקד, וקישור ״דילוג לתוכן״ בתחילת כל עמוד.</li>
          <li>שפת העמוד מוגדרת לעברית, וכיווניות התוכן מותאמת לעברית (מימין לשמאל) ולאנגלית.</li>
          <li>כותרות מסודרות היררכית, טקסט חלופי לתמונות תוכן, וכפתורים עם תיאור לקוראי מסך.</li>
          <li>תרגולי השמע מלווים בטקסט כתוב, ואפשר להשמיע כל מילה שוב.</li>
          <li>האתר מכבד את הגדרת ״הפחתת תנועה״ של מערכת ההפעלה.</li>
          <li>האתר מותאם לצפייה בטלפון, בטאבלט ובמחשב, בדפדפנים העדכניים (Chrome, Safari, Edge, Firefox).</li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">מגבלות ידועות</h2>
        <p className="text-sm font-medium leading-relaxed">
          חלק מהתרגולים לילדים מבוססים על גרירה, על השמעת קול ועל תמונות, מטבעם כמשחקי למידה. אנו פועלים לשפר את
          הנגישות שלהם בהדרגה, ובמקרים מסוימים ייתכן שהם לא יהיו נגישים באופן מלא לכל אמצעי עזר. אם נתקלתם ברכיב
          שאינו נגיש — נשמח לשמוע ולתקן.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg text-gray-800 mb-1">פנייה בנושא נגישות</h2>
        <p className="text-sm font-medium leading-relaxed">
          נתקלתם בקושי? יש לכם הצעה לשיפור? פנו אלינו ונטפל בפנייה בהקדם:
          <br />
          רכז/ת נגישות · דוא״ל:{' '}
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('פנייה בנושא נגישות')}`} className="text-primary font-bold" dir="ltr">{CONTACT_EMAIL}</a>
          <br />
          כדי שנוכל לעזור, ציינו בפנייה את כתובת העמוד, תיאור הבעיה, והדפדפן והמכשיר שבהם השתמשתם.
        </p>
      </section>
    </article>
  )
}
