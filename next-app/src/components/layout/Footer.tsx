import Image from "next/image";
import Link from "next/link";
// NOTE: this lucide-react version (v1) has removed all third-party brand
// glyphs (Facebook/Instagram/LinkedIn/Twitter no longer exist). We use
// generic, available icons for the social/contact row instead.
import { Send, Globe, Mail, Phone, Share2 } from "lucide-react";

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
          {/* Newsletter signup — borrowed from the shadcn footer demo, in Hebrew/RTL */}
          <form
            className="fnews"
            action="#contact"
            aria-label="הרשמה לעדכונים"
          >
            <div className="fnews-form">
              <input
                type="email"
                className="fnews-input"
                placeholder="הזינו אימייל לעדכונים"
                aria-label="כתובת אימייל"
              />
              <button type="submit" className="fnews-btn" aria-label="הרשמה">
                <Send aria-hidden="true" />
              </button>
            </div>
          </form>
          {/* Social / contact links */}
          <div className="fsocial">
            <a href="#" aria-label="אתר"><Globe aria-hidden="true" /></a>
            <a href="mailto:hello@wendi.co.il" aria-label="אימייל"><Mail aria-hidden="true" /></a>
            <a href="tel:+97200000000" aria-label="טלפון"><Phone aria-hidden="true" /></a>
            <a href="#" aria-label="שיתוף"><Share2 aria-hidden="true" /></a>
          </div>
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
