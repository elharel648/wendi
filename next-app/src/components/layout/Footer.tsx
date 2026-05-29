import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer aria-label="כותרת תחתונה">
      <div className="footer-grid">
        <div>
          <div className="fbrand">
            <Image
              src="/wendi-logo.png"
              alt="Wendi"
              width={153}
              height={36}
              style={{ height: "36px", width: "auto" }}
            />
          </div>
          <p className="ftagline">
            פלטפורמת העובד המובילה בישראל — תקשורת, למידה וממשקים ביחד.
          </p>
        </div>
        <div className="fcol">
          <h5>ממשקים</h5>
          <ul>
            <li><Link href="/mamashkim#different">סוגי ממשקים</Link></li>
            <li><Link href="/mamashkim#process">תהליך העבודה</Link></li>
            <li><Link href="/mamashkim#systems">ממשקים שבוצעו</Link></li>
          </ul>
        </div>
        <div className="fcol">
          <h5>מגזרים</h5>
          <ul>
            <li><Link href="/pitronot#finantsim">פיננסים</Link></li>
            <li><Link href="/pitronot#logistika">לוגיסטיקה</Link></li>
            <li><Link href="/pitronot#tsiburi">מוסדות ציבוריים</Link></li>
            <li><Link href="/pitronot#briut">שירותי בריאות</Link></li>
            <li><Link href="/pitronot#taasia">תעשייה</Link></li>
            <li><Link href="/pitronot#tayarut">תיירות</Link></li>
          </ul>
        </div>
        <div className="fcol">
          <h5>אודותינו</h5>
          <ul>
            <li><Link href="/about">מי אנחנו</Link></li>
            <li><Link href="/about/gallery">סיפורי לקוחות</Link></li>
            <li><Link href="/about/faq">שאלות ותשובות</Link></li>
            <li><Link href="/about/gallery">גלריה</Link></li>
            <li><a href="#contact">צרו קשר</a></li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <span>© 2026 Wendi. כל הזכויות שמורות.</span>
        <div>
          <Link href="/privacy">פרטיות</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/accessibility">נגישות</Link>
        </div>
      </div>
    </footer>
  );
}
