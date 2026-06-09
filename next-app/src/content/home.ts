/**
 * Home-page content — typed, CMS-ready shape.
 *
 * Today: hardcoded values exported as a constant.
 * Tomorrow (Umbraco): swap the constant for an async loader that returns
 *   the same `HomeContent` shape. No section component changes.
 */

/* ─── Hero ────────────────────────────────────────────── */
export type CtaLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  /** Show a forward chevron after the label. */
  withArrow?: boolean;
};

export type HeroContent = {
  /** Static lines of the title. The last line is the typewriter slot —
   *  its initial text doubles as `typedPhrases[0]` for SSR. */
  titleLines: string[];
  /** Phrases the last title line cycles through (typewriter effect). */
  typedPhrases: string[];
  subtitle: string;
  ctas: CtaLink[];
  mascot: { src: string; alt: string };
};

/* ─── Wall of Love ────────────────────────────────────── */
export type WolPhotoAvatar = { kind: "photo"; src: string };
export type WolLetterAvatar = {
  kind: "letter";
  letter: string;
  gradientFrom: string;
  gradientTo: string;
};
export type WolAvatar = WolPhotoAvatar | WolLetterAvatar;

export type WolTestimonial = {
  id: string;
  name: string;
  role: string;
  /** May contain `<span class="hl">…</span>` highlight spans. */
  quoteHtml: string;
  avatar: WolAvatar;
};

export type WolMetric = {
  id: string;
  value: string;          // e.g. "91%", "+3,200", "7 חודשים"
  label: string;          // e.g. "מעורבות עובדים"
  attribution: string;    // e.g. "שרית הכמון · CHRO"
};

export type WolContent = {
  eyebrow: string;
  titlePlain: string;     // "אהובים על ידי"
  titleAccent: string;    // "המובילים בישראל"
  subtitle: string;
  trust: { rating: string; volume: string };
  testimonials: WolTestimonial[];
  metrics: WolMetric[];
};

/* ─── Combined ───────────────────────────────────────── */
export type HomeContent = {
  hero: HeroContent;
  wol: WolContent;
};

export const homeContent: HomeContent = {
  hero: {
    titleLines: ["חוויית", "העובד", "חכמה יותר."],
    typedPhrases: ["חכמה יותר.", "מהירה יותר.", "פשוטה יותר."],
    subtitle:
      "וונדי היא הפלטפורמה שמנהלי HR בחרו.<br/>תקשורת למידה, תהליכים דיגיטליים וממשקים- ב<strong>מקום אחד</strong>! בלי ריצה בין&nbsp;מערכות.",
    ctas: [
      { label: "קבלו הדגמה חינמית", href: "#contact", variant: "primary", withArrow: true },
    ],
    mascot: { src: "/wendi-char2.png", alt: "Wendi" },
  },

  wol: {
    eyebrow: "לקוחות",
    titlePlain: "אהובים על ידי",
    titleAccent: "המובילים בישראל",
    subtitle:
      "מה אומרים מנהלי משאבי אנוש ולמידה בארגונים הגדולים בישראל על Wendi.",
    trust: { rating: "4.9 / 5", volume: "150+ מנהלי HR" },

    testimonials: [
      {
        id: "orit",
        name: "אורית לוי",
        role: "אחראית למידה · צבר רפואה",
        avatar: { kind: "photo", src: "/Orit Levi.jpg" },
        quoteHtml:
          'אפליקציית הסברס שלנו <span class="hl">שינתה סדרי עולם</span> בצבר רפואה. כשאיש צוות מגיע למטופלים בביתם, הכל מחכה לו במקום אחד בנייד — נהלים, ייעוץ, מסמכים והכשרות. עולם ומלואו באפליקציה אחת.',
      },
      {
        id: "shira",
        name: "שירה לוי",
        role: "מנהלת משאבי אנוש · הפניקס בית השקעות",
        avatar: { kind: "photo", src: "/shira.jpg" },
        quoteHtml:
          'אפליקציית העובדים אפשרה לנו לקדם את התקשורת הפנים-ארגונית ולהפוך אותה ל<span class="hl">חוויה חדשנית, נגישה ומחברת</span>. הצלחנו לייצר מעורבות גבוהה ולקבל פתרונות מדויקים.',
      },
      {
        id: "rivi",
        name: "ריוי שהרבני",
        role: "פתרונות דיגיטל · משאבי אנוש בזק",
        avatar: { kind: "photo", src: "/rivi.jpg" },
        quoteHtml:
          'האפליקציה מהווה <span class="hl">כלי משמעותי</span> להעברת מסרים לעובדים — ולא פחות חשוב, מלווה את התהליכים הפנים-ארגוניים ומאפשרת לעובדים Self Service במגוון נושאים.',
      },
      {
        id: "lihi",
        name: "ליהי מטיחין",
        role: "מרכז שירות לעובד · איכילוב",
        avatar: { kind: "letter", letter: "ל", gradientFrom: "#4cd964", gradientTo: "#1ea84a" },
        quoteHtml:
          'האפליקציה היא <span class="hl">ערוץ מרכזי</span> — בזכות הנוחות, הבולטות והיכולת לחשוף תכנים מותאמים לפי קבוצות.',
      },
      {
        id: "amir",
        name: "אמיר חסן",
        role: 'מנכ"ל · רשת קמעונאות',
        avatar: { kind: "letter", letter: "א", gradientFrom: "#4A90C4", gradientTo: "#1A5A8C" },
        quoteHtml:
          'אחרי שני ניסיונות עם מערכות אחרות — וונדי הייתה הפתרון ש<span class="hl">באמת הבין את המורכבות שלנו</span>. תהליך הטמעה חלק, צוות מקצועי.',
      },
      {
        id: "michal",
        name: "מיכל אדלר",
        role: "ראש תחום למידה · חברת אנרגיה",
        avatar: { kind: "letter", letter: "מ", gradientFrom: "#16a085", gradientTo: "#0e7060" },
        quoteHtml:
          'Wendi הוא הכלי הראשון שעובדי השטח שלנו <span class="hl">באמת אוהבים</span> להשתמש בו.',
      },
      {
        id: "gali",
        name: "גלי שמש",
        role: "תקשורת פנים · קמעונאות",
        avatar: { kind: "letter", letter: "ג", gradientFrom: "#3498db", gradientTo: "#1a5f8c" },
        quoteHtml:
          'סוף סוף יש לנו <span class="hl">ערוץ אחד שכולם פותחים</span>. הודעות חשובות לא הולכות לאיבוד יותר.',
      },
      {
        id: "ron",
        name: "רון יעקובי",
        role: "CIO · ארגון פיננסי",
        avatar: { kind: "letter", letter: "ר", gradientFrom: "#9b59b6", gradientTo: "#6c3483" },
        quoteHtml:
          'האינטגרציה עם SAP ו-Active Directory <span class="hl">עברה חלק תוך שבועיים</span>. צוות מקצועי ברמה שלא ראיתי אצל ספקים אחרים.',
      },
    ],

    metrics: [
      {
        id: "engagement",
        value: "91%",
        label: "מעורבות עובדים",
        attribution: "שרית הכמון · CHRO · ארגון תעשייתי",
      },
      {
        id: "field-team",
        value: "+3,200",
        label: "עובדי שטח חוברו ב-4 חודשים",
        attribution: "דנה ברק · VP משאבי אנוש",
      },
      {
        id: "roi",
        value: "7 חודשים",
        label: "ROI על מודול ההכשרות",
        attribution: "יוסי גולן · מנהל הכשרות",
      },
      {
        id: "training",
        value: "+73%",
        label: "השתתפות בהכשרות תוך 60 יום",
        attribution: "טל רוזנברג · L&D Manager",
      },
      {
        id: "weekly",
        value: "89%",
        label: "התחברות שבועית מעובדי ייצור",
        attribution: "נטע פרידמן · תקשורת ארגונית",
      },
    ],
  },
};
