export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="fbrand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wendi-logo.png" alt="Wendi" style={{ height: "36px", width: "auto" }} />
          </div>
          <p className="ftagline">
            פלטפורמת העובד המובילה בישראל — תקשורת, למידה וממשקים ביחד.
          </p>
        </div>
        <div className="fcol">
          <h5>ממשקים</h5>
          <ul>
            <li><a href="#">סוגי ממשקים</a></li>
            <li><a href="#">תהליך העבודה</a></li>
            <li><a href="#">ממשקים שבוצעו</a></li>
          </ul>
        </div>
        <div className="fcol">
          <h5>מגזרים</h5>
          <ul>
            <li><a href="#">פיננסים</a></li>
            <li><a href="#">לוגיסטיקה</a></li>
            <li><a href="#">מוסדות ציבוריים</a></li>
            <li><a href="#">שירותי בריאות</a></li>
            <li><a href="#">תעשייה</a></li>
            <li><a href="#">תיירות</a></li>
          </ul>
        </div>
        <div className="fcol">
          <h5>אודותינו</h5>
          <ul>
            <li><a href="#">מי אנחנו</a></li>
            <li><a href="#">סיפורי לקוחות</a></li>
            <li><a href="#">שאלות ותשובות</a></li>
            <li><a href="#">גלריה</a></li>
            <li><a href="#">צרו קשר</a></li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <span>© 2026 Wendi. כל הזכויות שמורות.</span>
        <div>
          <a href="#">פרטיות</a>
          <a href="#">תנאי שימוש</a>
          <a href="#">נגישות</a>
        </div>
      </div>
    </footer>
  );
}
