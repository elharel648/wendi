/**
 * Editable text for the hardcoded Home sections (WallOfLove, Sectors,
 * CinematicStatement, …). Mirrors the modulim/pitronot pattern: this is the
 * serializable text source. Icons/SVG/gradients stay in the components and are
 * merged back by index. Each `get…` defaults here when Umbraco has nothing.
 */

/* ─── Wall of Love (testimonials) ─── */
export type WolTestimonial = {
  name: string;
  role: string;
  quoteHtml: string;
  // visual identity stays in code; only text is editable. avatar/initial kept
  // here so the bundled fallback renders identically.
  avatar?: string;
  initial?: string;
  gradientA?: string;
  gradientB?: string;
};

export type WallOfLoveContent = {
  headingPlain: string;
  headingAccent: string;
  sub: string;
  row1: WolTestimonial[];
  row2: WolTestimonial[];
};

/* ─── Sectors strip ─── */
export type SectorCard = { title: string; desc: string };
export type SectorsContent = {
  titleLines: string[];
  cards: SectorCard[];
};

/* ─── Cinematic statement ─── */
export type CinematicContent = {
  ghostWord: string;
  line1: string;
  line1Accent: string;
  line2: string;
};

/* ─── Floating features (4 illustrated cards) ─── */
export type FloatingFeature = { title: string; sub: string; points: string[] };
export type FloatingFeaturesContent = { features: FloatingFeature[] };

/* ─── CTA band (contact form) ─── */
export type CtaBandContent = {
  eyebrow: string;
  heading: string;
  submitLabel: string;
  submittedLabel: string;
};

/* ─── Mobile showcase ─── */
export type MobileCategory = { title: string; desc: string };
export type MobileShowcaseContent = {
  eyebrow: string;
  title: string;
  categories: MobileCategory[];
};

export type HomeSectionsContent = {
  wallOfLove: WallOfLoveContent;
  sectors: SectorsContent;
  cinematic: CinematicContent;
  floating: FloatingFeaturesContent;
  cta: CtaBandContent;
  mobile: MobileShowcaseContent;
};

export const homeSections: HomeSectionsContent = {
  wallOfLove: {
    headingPlain: "אהובים על ידי",
    headingAccent: "המובילים בישראל",
    sub: "מה אומרים מנהלי משאבי אנוש ולמידה בארגונים הגדולים בישראל על Wendi.",
    row1: [
      { name: "אורית לוי", role: "אחראית למידה · צבר רפואה", avatar: "/Orit Levi.jpg", quoteHtml: 'אפליקציית הסברס שלנו <span class="hl">שינתה סדרי עולם</span> בצבר רפואה. כשאיש צוות מגיע למטופלים בביתם, הכל מחכה לו במקום אחד בנייד — נהלים, ייעוץ, מסמכים והכשרות. עולם ומלואו באפליקציה אחת.' },
      { name: "שירה לוי", role: "מנהלת משאבי אנוש · הפניקס בית השקעות", avatar: "/shira.jpg", quoteHtml: 'אפליקציית העובדים אפשרה לנו לקדם את התקשורת הפנים-ארגונית ולהפוך אותה ל<span class="hl">חוויה חדשנית, נגישה ומחברת</span>. הצלחנו לייצר מעורבות גבוהה ולקבל פתרונות מדויקים.' },
      { name: "ריוי שהרבני", role: "פתרונות דיגיטל · משאבי אנוש בזק", avatar: "/rivi.jpg", quoteHtml: 'האפליקציה מהווה <span class="hl">כלי משמעותי</span> להעברת מסרים לעובדים — ולא פחות חשוב, מלווה את התהליכים הפנים-ארגוניים ומאפשרת לעובדים Self Service במגוון נושאים.' },
      { name: "ליהי מטיחין", role: "מרכז שירות לעובד · איכילוב", initial: "ל", gradientA: "#4cd964", gradientB: "#1ea84a", quoteHtml: 'האפליקציה היא <span class="hl">ערוץ מרכזי</span> — בזכות הנוחות, הבולטות והיכולת לחשוף תכנים מותאמים לפי קבוצות. זמין בכל מקום ובכל זמן.' },
      { name: "שרית הכמון", role: "CHRO · ארגון תעשייתי מוביל", initial: "ש", gradientA: "#FFB23E", gradientB: "#D8841E", quoteHtml: 'המדדים לא משקרים: <span class="hl">91% מעורבות עובדים</span>, <span class="hl">78% השלמת הכשרות</span> — כל זה ב-6 חודשים מהעלייה לאוויר. מערכת שעובדת.' },
      { name: "אמיר חסן", role: 'מנכ"ל · רשת קמעונאות', initial: "א", gradientA: "#4A90C4", gradientB: "#1A5A8C", quoteHtml: 'אחרי שני ניסיונות עם מערכות אחרות — וונדי הייתה הפתרון ש<span class="hl">באמת הבין את המורכבות שלנו</span>. תהליך הטמעה חלק, צוות מקצועי.' },
    ],
    row2: [
      { name: "דנה ברק", role: "VP משאבי אנוש · רשת שירותי מזון", initial: "ד", gradientA: "#FF6B9D", gradientB: "#C44569", quoteHtml: 'תוך 4 חודשים <span class="hl">חיברנו 3,200 עובדי שטח</span> לאפליקציה. מעולם לא הייתה לנו תקשורת כל כך מהירה ואפקטיבית עם הצוותים בסניפים.' },
      { name: "יוסי גולן", role: "מנהל הכשרות · בית חולים", initial: "י", gradientA: "#8e44ad", gradientB: "#5a2d82", quoteHtml: 'מודול ההכשרות <span class="hl">החזיר את ההשקעה ב-7 חודשים</span>. הצוותים שלנו לומדים בתוך זרימת העבודה — לא מחוצה לה.' },
      { name: "מיכל אדלר", role: "ראש תחום למידה · חברת אנרגיה", initial: "מ", gradientA: "#16a085", gradientB: "#0e7060", quoteHtml: 'Wendi הוא הכלי הראשון שעובדי השטח שלנו <span class="hl">באמת אוהבים</span> להשתמש בו. זה נשמע בנאלי — אבל זה לא קורה כל יום.' },
      { name: "טל רוזנברג", role: "L&D Manager · רשת תחבורה", initial: "ט", gradientA: "#e67e22", gradientB: "#a55307", quoteHtml: 'ראינו <span class="hl">עלייה של 73%</span> בהשתתפות בהכשרות תוך 60 יום מההשקה. הנתונים מדברים בעד עצמם — וההנהלה שלי מודה לי כל יום.' },
      { name: "גלי שמש", role: "דירקטורית תקשורת פנים · קמעונאות", initial: "ג", gradientA: "#3498db", gradientB: "#1a5f8c", quoteHtml: 'סוף סוף יש לנו <span class="hl">ערוץ אחד שכולם פותחים</span>. הודעות חשובות לא הולכות לאיבוד יותר במייל ובוואטסאפ קבוצתי.' },
      { name: "רון יעקובי", role: "CIO · ארגון פיננסי", initial: "ר", gradientA: "#9b59b6", gradientB: "#6c3483", quoteHtml: 'האינטגרציה עם SAP ו-Active Directory שלנו <span class="hl">עברה חלק תוך שבועיים</span>. צוות Wendi הוא מקצועי ברמה שלא ראיתי אצל ספקים אחרים.' },
      { name: "נטע פרידמן", role: "תקשורת ארגונית · יצרן עולמי", initial: "נ", gradientA: "#27ae60", gradientB: "#196f3d", quoteHtml: 'חשבתי שזה לא יעבוד לעובדי קו ייצור. טעיתי. <span class="hl">89% מהעובדים מתחברים מדי שבוע</span> — בלי מחשב, בלי הדרכה מורכבת.' },
    ],
  },

  sectors: {
    titleLines: ["פתרון", "לכל", "מגזר."],
    cards: [
      { title: "פיננסים וביטוח", desc: "ציות, הכשרות רגולטוריות ותקשורת פנימית מאובטחת." },
      { title: "לוגיסטיקה ותחבורה", desc: "חיבור אמיתי לעובדי שטח — מובייל-first, בזמן אמת." },
      { title: "מוסדות ציבוריים", desc: "עמידה בדרישות רגולציה ציבורית עם נגישות מלאה." },
      { title: "שירותי בריאות", desc: "תקשורת בין משמרות, עדכוני נהלים וטפסים קליניים." },
      { title: "תעשייה ומסחר", desc: "ניהול עובדי ייצור, בטיחות ושרשרת אספקה." },
      { title: "תיירות ואירוח", desc: "שיבוץ משמרות, הכשרות שירות ועדכוני נהלים בזמן אמת." },
    ],
  },

  cinematic: {
    ghostWord: "פלטפורמה",
    line1: "פלטפורמה",
    line1Accent: "אחת.",
    line2: "כל מה שהעובד צריך.",
  },

  floating: {
    features: [
      { title: "תקשורת פנים-ארגונית", sub: "ערוץ תקשורת ארגוני חכם, אחיד ובזמן אמת", points: ["הודעות לפי תפקיד ומחלקה", "Push notifications חכמות", "ניהול תוכן מרכזי"] },
      { title: "הארנק שלי", sub: "הטבות, תגמולים וקופת חיסכון בקצות האצבעות", points: ["מטבעות חברה ומסלולי תגמול", "הטבות מותאמות אישית", "היסטוריית פרסים ומימוש"] },
      { title: "למידה והכשרה", sub: "12,000+ תכנים, קורסים ו-SCORM בפלטפורמה אחת", points: ["נתיבי לימוד לפי תפקיד", "הסמכות ותעודות דיגיטליות", "דוחות ציות בזמן אמת"] },
      { title: "הערכת ביצועים", sub: "סקרי 360°, KPIs ומשוב מתמשך לכל הארגון", points: ["הערכת 360° עמיתים ומנהלים", "לוח KPIs אינטראקטיבי", "תובנות AI ודוחות מעורבות"] },
      { title: "Wendi AI", sub: "עוזר חכם שעונה על שאלות HR בשפה טבעית.", points: [] },
    ],
  },

  cta: {
    eyebrow: "צרו קשר",
    heading: "לקבלת מידע נוסף על המוצר שלנו",
    submitLabel: "שליחה »",
    submittedLabel: "✓ נשלח בהצלחה!",
  },

  mobile: {
    eyebrow: "אפליקציות מובייל בהתאמה אישית",
    title: "אפליקציה לכל צורך",
    categories: [
      { title: "תקשורת פנים-ארגונית", desc: "" },
      { title: "בריאות ורפואה", desc: "" },
      { title: "ארנק והטבות", desc: "" },
      { title: "למידה ופיתוח", desc: "" },
      { title: "כלים וניהול", desc: "" },
    ],
  },
};
