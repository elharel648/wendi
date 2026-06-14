/**
 * Mamashkim (Integrations) page content — editable text only. Visuals (logos,
 * SVG glyphs, Lottie icons, colours) stay in the components and merge back by
 * index. Mirrors the modulim/pitronot/home pattern.
 */

/* ─── Hero ─── */
export type MamashkimRow = { title: string; subtitle: string };
export type MamashkimHeroContent = {
  titleLines: string[];      // 3 lines; last is the teal accent
  sub: string;               // may contain <strong>
  ctaLabel: string;
  footnote: string;
  leftRows: MamashkimRow[];  // backend systems (text only; logo/mono in code)
  rightRows: MamashkimRow[]; // user touchpoints (text only; glyph in code)
};

/* ─── Duel (Wendi vs others) ─── */
export type DuelPoint = { title: string; body: string };
export type DuelItem = { name: string; desc: string };
export type DuelContent = {
  headingPlain: string;
  headingAccent: string;
  sub: string;
  wendiChip: string;
  wendiTagline: string;
  wendiSubtitle: string;
  othersChip: string;
  othersTagline: string;
  othersSubtitle: string;
  quote: string;
  quoteCite: string;
  quoteSub: string;
  wendiPoints: DuelPoint[];
  othersItems: DuelItem[];  // text only; lottie icon in code
};

/* ─── Process ─── */
export type ProcessStep = { title: string; desc: string };
export type ProcessContent = {
  headingPlain: string;
  headingAccent: string;
  steps: ProcessStep[];
};

export type MamashkimContent = {
  hero: MamashkimHeroContent;
  duel: DuelContent;
  process: ProcessContent;
};

export const mamashkimContent: MamashkimContent = {
  hero: {
    titleLines: ["וונדי מתחברת", "לארגון שלכם —", "באמת."],
    sub: 'בניגוד לפלטפורמות מדף, וונדי היא חברת מוצר שמבצעת ממשקים ייעודיים לפי צורך ארגוני, כדי לספק לעובדים <strong class="font-bold text-ink">One Stop Shop</strong> אמיתי.',
    ctaLabel: "דברו איתנו על אינטגרציה",
    footnote: "+30 מערכות שכבר התחברנו אליהן · HR, שכר, נוכחות, BI, גיוס, למידה, תפעול.",
    // Order mirrors the constellation NODES in MamashkimHero so the CMS
    // index-merge lands each label on its matching logo.
    leftRows: [
      { title: "SAP HR", subtitle: "נתוני עובדים" },
      { title: "Synerion", subtitle: "נוכחות ומשמרות" },
      { title: "Power BI", subtitle: "מדדים" },
      { title: "Comeet", subtitle: "גיוס" },
      { title: "Priority", subtitle: "ERP" },
      { title: "Hilan", subtitle: "שכר ונוכחות" },
      { title: "Moodle", subtitle: "למידה" },
      { title: "Teams", subtitle: "תקשורת" },
    ],
    rightRows: [
      { title: "מנהל", subtitle: "דשבורד ניהולי" },
      { title: "עובד שטח", subtitle: "נייד" },
      { title: "קליני", subtitle: "עמדה נייחת" },
      { title: "מובייל", subtitle: "iOS · Android" },
      { title: "כל מכשיר", subtitle: "Web · Desktop" },
    ],
  },

  duel: {
    headingPlain: "לא רק API.",
    headingAccent: "פתרון מלא.",
    sub: "רוב הפלטפורמות מציעות חיבור טכני בלבד ומשאירות לכם את כל ההתאמה והאחריות. וונדי עושה הרבה יותר מזה.",
    wendiChip: "וונדי",
    wendiTagline: "הדרך שלנו",
    wendiSubtitle: "פתרון חי, מותאם, ובאחריות אחת",
    othersChip: "פלטפורמות אחרות",
    othersTagline: "החיבור הגנרי",
    othersSubtitle: "חיבור גנרי, וכאב ראש מתמשך",
    quote: "\"המטרה שלנו היא לא לחבר API. המטרה היא שהעובד שלכם יקבל את המידע הנכון בזמן הנכון — וזה דורש להבין את הארגון, לא רק את המערכת.\"",
    quoteCite: "צוות המוצר של Wendi",
    quoteSub: "מתוך אפיון משותף עם לקוחות וונדי",
    wendiPoints: [
      { title: "אפיון משותף עם הלקוח", body: "לפני שורה אחת של קוד" },
      { title: "פיתוח ממשק ייעודי", body: "מותאם לארגון שלכם" },
      { title: "התאמה מלאה להרשאות", body: "ולהיררכיה הארגונית" },
      { title: "תחזוקה שוטפת ושדרוגים", body: "כולל SLA מובטח" },
      { title: "גורם אחד — מקצה לקצה", body: "מוצר, פיתוח ותמיכה" },
      { title: "התאמה לתרבות הארגון", body: "ולשפה הפנים-ארגונית" },
    ],
    othersItems: [
      { name: "חיבור מדף בלבד", desc: "ללא הבנת הצורך הארגוני" },
      { name: "תלות ב־API קיים", desc: "אם אין API, אין פתרון" },
      { name: "גישה גנרית להרשאות", desc: "אותו דבר לכל משתמש, ללא הבחנה" },
      { name: "תחזוקה? באחריותכם", desc: "אתם נשארים לבד עם התקלות" },
      { name: "ספקים מרובים, גלגול האשמה", desc: "כל אחד מצביע על השני" },
      { name: "Template אחיד לכל ארגון", desc: "אותה תבנית, ללא התאמה אישית" },
    ],
  },

  process: {
    headingPlain: "כך נראה",
    headingAccent: "חיבור לוונדי",
    steps: [
      { title: "הבנת הצורך העסקי", desc: "מתחילים בשיחה עמוקה: מה המידע שצריך לזרום, מי המשתמשים, ומה המטרה העסקית." },
      { title: "אפיון טכנולוגי משותף", desc: "הארכיטקטורה הנכונה: API, Webhook, Batch או Real-time. מבנה נתונים, הרשאות ואבטחה." },
      { title: "פיתוח ובדיקות", desc: "פיתוח ב-Staging בשיתוף מלא איתכם. בדיקות קצה לקצה, UAT ובדיקות עומס לפני עלייה." },
      { title: "עלייה לאוויר וליווי שוטף", desc: "אחרי העלייה — ניטור 24/7, תחזוקה, התאמות לשינויים בארגון ושדרוגים עתידיים." },
    ],
  },
};
