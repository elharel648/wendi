import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  quoteHtml: string;        // contains <span class="hl">…</span>
  avatar?: string;          // image src
  initial?: string;         // fallback letter avatar
  gradientA?: string;       // --av-a
  gradientB?: string;       // --av-b
};

const row1: Testimonial[] = [
  {
    name: "אורית לוי",
    role: "אחראית למידה · צבר רפואה",
    avatar: "/Orit Levi.jpg",
    quoteHtml:
      'אפליקציית הסברס שלנו <span class="hl">שינתה סדרי עולם</span> בצבר רפואה. כשאיש צוות מגיע למטופלים בביתם, הכל מחכה לו במקום אחד בנייד — נהלים, ייעוץ, מסמכים והכשרות. עולם ומלואו באפליקציה אחת.',
  },
  {
    name: "שירה לוי",
    role: "מנהלת משאבי אנוש · הפניקס בית השקעות",
    avatar: "/shira.jpg",
    quoteHtml:
      'אפליקציית העובדים אפשרה לנו לקדם את התקשורת הפנים-ארגונית ולהפוך אותה ל<span class="hl">חוויה חדשנית, נגישה ומחברת</span>. הצלחנו לייצר מעורבות גבוהה ולקבל פתרונות מדויקים.',
  },
  {
    name: "ריוי שהרבני",
    role: "פתרונות דיגיטל · משאבי אנוש בזק",
    avatar: "/rivi.jpg",
    quoteHtml:
      'האפליקציה מהווה <span class="hl">כלי משמעותי</span> להעברת מסרים לעובדים — ולא פחות חשוב, מלווה את התהליכים הפנים-ארגוניים ומאפשרת לעובדים Self Service במגוון נושאים.',
  },
  {
    name: "ליהי מטיחין",
    role: "מרכז שירות לעובד · איכילוב",
    initial: "ל",
    gradientA: "#4cd964",
    gradientB: "#1ea84a",
    quoteHtml:
      'האפליקציה היא <span class="hl">ערוץ מרכזי</span> — בזכות הנוחות, הבולטות והיכולת לחשוף תכנים מותאמים לפי קבוצות. זמין בכל מקום ובכל זמן.',
  },
  {
    name: "שרית הכמון",
    role: "CHRO · ארגון תעשייתי מוביל",
    initial: "ש",
    gradientA: "#FFB23E",
    gradientB: "#D8841E",
    quoteHtml:
      'המדדים לא משקרים: <span class="hl">91% מעורבות עובדים</span>, <span class="hl">78% השלמת הכשרות</span> — כל זה ב-6 חודשים מהעלייה לאוויר. מערכת שעובדת.',
  },
  {
    name: "אמיר חסן",
    role: 'מנכ"ל · רשת קמעונאות',
    initial: "א",
    gradientA: "#4A90C4",
    gradientB: "#1A5A8C",
    quoteHtml:
      'אחרי שני ניסיונות עם מערכות אחרות — וונדי הייתה הפתרון ש<span class="hl">באמת הבין את המורכבות שלנו</span>. תהליך הטמעה חלק, צוות מקצועי.',
  },
];

const row2: Testimonial[] = [
  {
    name: "דנה ברק",
    role: "VP משאבי אנוש · רשת שירותי מזון",
    initial: "ד",
    gradientA: "#FF6B9D",
    gradientB: "#C44569",
    quoteHtml:
      'תוך 4 חודשים <span class="hl">חיברנו 3,200 עובדי שטח</span> לאפליקציה. מעולם לא הייתה לנו תקשורת כל כך מהירה ואפקטיבית עם הצוותים בסניפים.',
  },
  {
    name: "יוסי גולן",
    role: "מנהל הכשרות · בית חולים",
    initial: "י",
    gradientA: "#8e44ad",
    gradientB: "#5a2d82",
    quoteHtml:
      'מודול ההכשרות <span class="hl">החזיר את ההשקעה ב-7 חודשים</span>. הצוותים שלנו לומדים בתוך זרימת העבודה — לא מחוצה לה.',
  },
  {
    name: "מיכל אדלר",
    role: "ראש תחום למידה · חברת אנרגיה",
    initial: "מ",
    gradientA: "#16a085",
    gradientB: "#0e7060",
    quoteHtml:
      'Wendi הוא הכלי הראשון שעובדי השטח שלנו <span class="hl">באמת אוהבים</span> להשתמש בו. זה נשמע בנאלי — אבל זה לא קורה כל יום.',
  },
  {
    name: "טל רוזנברג",
    role: "L&D Manager · רשת תחבורה",
    initial: "ט",
    gradientA: "#e67e22",
    gradientB: "#a55307",
    quoteHtml:
      'ראינו <span class="hl">עלייה של 73%</span> בהשתתפות בהכשרות תוך 60 יום מההשקה. הנתונים מדברים בעד עצמם — וההנהלה שלי מודה לי כל יום.',
  },
  {
    name: "גלי שמש",
    role: "דירקטורית תקשורת פנים · קמעונאות",
    initial: "ג",
    gradientA: "#3498db",
    gradientB: "#1a5f8c",
    quoteHtml:
      'סוף סוף יש לנו <span class="hl">ערוץ אחד שכולם פותחים</span>. הודעות חשובות לא הולכות לאיבוד יותר במייל ובוואטסאפ קבוצתי.',
  },
  {
    name: "רון יעקובי",
    role: "CIO · ארגון פיננסי",
    initial: "ר",
    gradientA: "#9b59b6",
    gradientB: "#6c3483",
    quoteHtml:
      'האינטגרציה עם SAP ו-Active Directory שלנו <span class="hl">עברה חלק תוך שבועיים</span>. צוות Wendi הוא מקצועי ברמה שלא ראיתי אצל ספקים אחרים.',
  },
  {
    name: "נטע פרידמן",
    role: "תקשורת ארגונית · יצרן עולמי",
    initial: "נ",
    gradientA: "#27ae60",
    gradientB: "#196f3d",
    quoteHtml:
      'חשבתי שזה לא יעבוד לעובדי קו ייצור. טעיתי. <span class="hl">89% מהעובדים מתחברים מדי שבוע</span> — בלי מחשב, בלי הדרכה מורכבת.',
  },
];

function Avatar({ t }: { t: Testimonial }) {
  if (t.avatar) {
    return (
      <span className="wol-avatar">
        <Image
          src={t.avatar}
          alt=""
          width={84}
          height={84}
          loading="lazy"
          sizes="42px"
        />
      </span>
    );
  }
  return (
    <span
      className="wol-avatar"
      style={{ ["--av-a" as string]: t.gradientA, ["--av-b" as string]: t.gradientB } as React.CSSProperties}
    >
      {t.initial}
    </span>
  );
}

function Card({ t, ariaHidden = false }: { t: Testimonial; ariaHidden?: boolean }) {
  return (
    <article className="wol-card" {...(ariaHidden ? { "aria-hidden": "true" } : {})}>
      <div className="wol-head">
        <Avatar t={t} />
        <div className="wol-meta">
          <strong>{t.name}</strong>
          <span>{t.role}</span>
        </div>
      </div>
      <p className="wol-quote" dangerouslySetInnerHTML={{ __html: t.quoteHtml }} />
    </article>
  );
}

export function WallOfLove() {
  return (
    <section className="wol-section" id="testimonials">
      {/* Glassmorphic heart bg */}
      <div className="wol-heart-bg" aria-hidden="true">
        <div className="wol-heart-light" />
        <svg className="wol-heart-stars" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet">
          <g fill="rgba(255,255,255,.85)">
            <circle cx="40"  cy="100" r="0.7" opacity=".40"/>
            <circle cx="80"  cy="380" r="0.9" opacity=".55"/>
            <circle cx="540" cy="80"  r="0.7" opacity=".50"/>
            <circle cx="572" cy="320" r="0.6" opacity=".42"/>
            <circle cx="20"  cy="220" r="0.8" opacity=".55"/>
            <circle cx="588" cy="200" r="0.6" opacity=".38"/>
            <circle cx="120" cy="60"  r="0.5" opacity=".34"/>
            <circle cx="480" cy="440" r="0.7" opacity=".50"/>
            <circle cx="380" cy="450" r="0.5" opacity=".40"/>
            <circle cx="220" cy="450" r="0.6" opacity=".45"/>
            <circle cx="60"  cy="280" r="0.5" opacity=".32"/>
            <circle cx="540" cy="380" r="0.7" opacity=".50"/>
            <circle cx="32"  cy="160" r="0.5" opacity=".30"/>
            <circle cx="560" cy="250" r="0.5" opacity=".38"/>
            <circle cx="160" cy="180" r="0.8" opacity=".70"/>
            <circle cx="232" cy="120" r="0.7" opacity=".75"/>
            <circle cx="184" cy="244" r="1.0" opacity=".70"/>
            <circle cx="252" cy="200" r="0.6" opacity=".60"/>
            <circle cx="204" cy="312" r="0.8" opacity=".80"/>
            <circle cx="292" cy="252" r="0.9" opacity=".65"/>
            <circle cx="342" cy="180" r="0.7" opacity=".70"/>
            <circle cx="384" cy="240" r="1.1" opacity=".85"/>
            <circle cx="424" cy="200" r="0.6" opacity=".60"/>
            <circle cx="452" cy="162" r="0.8" opacity=".68"/>
            <circle cx="352" cy="322" r="0.7" opacity=".72"/>
            <circle cx="282" cy="352" r="0.6" opacity=".58"/>
            <circle cx="224" cy="282" r="0.6" opacity=".60"/>
            <circle cx="382" cy="100" r="0.5" opacity=".50"/>
            <circle cx="162" cy="282" r="0.6" opacity=".60"/>
            <circle cx="322" cy="380" r="0.5" opacity=".48"/>
            <circle cx="404" cy="352" r="0.7" opacity=".65"/>
            <circle cx="158" cy="152" r="0.5" opacity=".50"/>
            <circle cx="446" cy="222" r="0.6" opacity=".58"/>
            <circle cx="306" cy="160" r="0.6" opacity=".60"/>
            <circle cx="272" cy="380" r="0.6" opacity=".55"/>
            <circle cx="202" cy="200" r="0.7" opacity=".60"/>
            <circle cx="432" cy="290" r="0.5" opacity=".55"/>
            <circle cx="240" cy="240" r="0.5" opacity=".50"/>
            <circle cx="342" cy="280" r="0.8" opacity=".72"/>
            <circle cx="372" cy="378" r="0.5" opacity=".48"/>
            <circle cx="192" cy="350" r="0.6" opacity=".55"/>
            <circle cx="412" cy="148" r="0.6" opacity=".55"/>
            <circle cx="262" cy="280" r="0.5" opacity=".55"/>
            <circle cx="356" cy="220" r="0.6" opacity=".60"/>
            <circle cx="208" cy="362" r="0.5" opacity=".50"/>
            <circle cx="304" cy="218" r="0.5" opacity=".55"/>
          </g>
        </svg>
        <div className="wol-particles" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="wol-particle" />
          ))}
        </div>
        <div className="wol-heart-glass" />
        <svg className="wol-heart-border" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="wolHeartEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0F172A" stopOpacity="0.10" />
              <stop offset="40%"  stopColor="#0F172A" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path d="M300 420 C 270 395 175 320 110 250 C 55 192 35 130 75 78 C 115 26 205 30 245 80 C 270 110 290 145 300 175 C 310 145 330 110 355 80 C 395 30 485 26 525 78 C 565 130 545 192 490 250 C 425 320 330 395 300 420 Z" fill="none" stroke="url(#wolHeartEdge)" strokeWidth="1" strokeLinejoin="round" />
          <path className="wol-edge-chase" d="M300 420 C 270 395 175 320 110 250 C 55 192 35 130 75 78 C 115 26 205 30 245 80 C 270 110 290 145 300 175 C 310 145 330 110 355 80 C 395 30 485 26 525 78 C 565 130 545 192 490 250 C 425 320 330 395 300 420 Z" fill="none" stroke="rgba(6,182,212,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="14 86" />
        </svg>
      </div>

      <div className="wol-header">
        <h2>אהובים על ידי <span className="accent">המובילים בישראל</span></h2>
        <p>מה אומרים מנהלי משאבי אנוש ולמידה בארגונים הגדולים בישראל על Wendi.</p>
      </div>

      <div className="wol-rows">
        {/* ROW 1 — scrolls LEFT */}
        <div className="wol-marquee wol-marquee-left">
          <div className="wol-track">
            {row1.map((t, i) => <Card key={`a-${i}`} t={t} />)}
            {row1.map((t, i) => <Card key={`a2-${i}`} t={t} ariaHidden />)}
          </div>
        </div>

        {/* ROW 2 — scrolls RIGHT */}
        <div className="wol-marquee wol-marquee-right">
          <div className="wol-track">
            {row2.map((t, i) => <Card key={`b-${i}`} t={t} />)}
            {row2.map((t, i) => <Card key={`b2-${i}`} t={t} ariaHidden />)}
          </div>
        </div>
      </div>
    </section>
  );
}
