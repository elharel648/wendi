import type { ReactNode } from "react";

export type Feature = {
  title: string;
  desc: string;
  icon: ReactNode;
  iconLottie?: string;
};

export type Module = {
  id: "portal" | "workflow" | "lms" | "performance";
  shortLabel: string;
  title: string;
  subtitle: string;
  blurb?: string;
  note?: string;
  color: string;
  colorSoft: string;
  gradient: string;
  icon: ReactNode;
  features: Feature[];
};

const ico = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);

export const modules: Module[] = [
  {
    id: "portal",
    shortLabel: "פורטל ואפליקציה",
    title: "פורטל ואפליקציה פנים-ארגונית",
    subtitle: "One Stop Shop לכל עובד — בכל מכשיר, בכל רגע",
    color: "#4285F4",
    colorSoft: "rgba(66, 133, 244, 0.10)",
    gradient: "linear-gradient(135deg, #4285F4 0%, #6DA8FF 100%)",
    icon: ico(<><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></>),
    features: [
      { title: "אנשי קשר", desc: "חיפוש מהיר לפי עובד, תפקיד, מחלקה + Click to Call, מייל, וואטסאפ", iconLottie: "/icons-lottie/contacts.json", icon: ico(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>) },
      { title: "חוגגים", desc: "עובדים חוגגי ימי הולדת, שנת עבודה ועובדים חדשים – מוצגים ממוקד בכל מקום בפורטל", iconLottie: "/icons-lottie/celebrations.json", icon: ico(<><path d="M20 21v-8H4v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></>) },
      { title: "פרגונים", desc: "שיח מפרגן בין עובדים, חיזוק שייכות והוקרה יומיומית", iconLottie: "/icons-lottie/appreciation.json", icon: ico(<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>) },
      { title: "הרשמה לאירועים", desc: "פרסום ימי עיון, כנסים, הדרכות. הרשמה/ביטול, זימון ליומן וייצוא לאקסל", iconLottie: "/icons-lottie/calendar.json", icon: ico(<><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></>) },
      { title: "ספר טלפונים ארגוני", desc: "חיפוש מהיר של מחלקות הארגון", iconLottie: "/icons-lottie/folder.json", icon: ico(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>) },
      { title: "Push מפולח", desc: "שליחה לפי קבוצות, מתוזמנת, או טריגר אוטומטי לפי אירועים אישיים", iconLottie: "/icons-lottie/notification.json", icon: ico(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>) },
      { title: "טפסים וסקרים", desc: "טפסים חכמים + טפסים אנונימיים", iconLottie: "/icons-lottie/edit.json", icon: ico(<><path d="M3 3v18h18"/><path d="M7 17v-5"/><path d="M12 17V8"/><path d="M17 17v-9"/></>) },
      { title: "נהלים ומידע", desc: "מאגר נהלים חכם עם קישורים פנימיים וחיפוש מהיר", iconLottie: "/icons-lottie/bookmark.json", icon: ico(<><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></>) },
      { title: "מבנה ארגוני", desc: "ניהול אוטומטי של היררכיה ארגונית והצגתה", iconLottie: "/icons-lottie/puzzle.json", icon: ico(<><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></>) },
      { title: "אזור אישי", desc: "פרופיל, יתרות, מסמכים אישיים, טפסים ועוד", iconLottie: "/icons-lottie/man.json", icon: ico(<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>) },
      { title: "גלריית תמונות", desc: "אלבומי אירועים, הורדה לטלפון, תגובות ולייקים", iconLottie: "/icons-lottie/camera.json", icon: ico(<><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></>) },
      { title: "קרא וחתום", desc: "מנגנון חתימה על תכנים + מעקב אחר עובדים שחתמו ושלא חתמו", iconLottie: "/icons-lottie/edit-document.json", icon: ico(<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>) },
    ],
  },
  {
    id: "workflow",
    shortLabel: "Workflow",
    title: "מודול Workflow",
    subtitle: "אוטומציה של תהליכים פנים-ארגוניים — חסכו זמן, שפרו חוויה",
    blurb: "מטרת המודול לאפשר לארגון לנהל תהליכים פנים-ארגוניים בצורה דיגיטלית וחווייתית — לשיפור הפרודוקטיביות ושביעות רצון העובדים.",
    note: "כל תהליך עסקי פנים-ארגוני שמשלב שלבים, משימות ואנשים — ניתן לבנות בוונדי.",
    color: "#34A853",
    colorSoft: "rgba(52, 168, 83, 0.10)",
    gradient: "linear-gradient(135deg, #34A853 0%, #6BD088 100%)",
    icon: ico(<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>),
    features: [
      { title: "Pre-Boarding", desc: "מילוי טפסים, העלאת קבצים ואישורים — לפני יום תחילת העבודה", iconLottie: "/icons-lottie/contacts.json", icon: ico(<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>) },
      { title: "Onboarding", desc: "מסלול משימות עם התניות, קבלת ציוד וחתימות כל שלבי הקליטה", iconLottie: "/icons-lottie/man.json", icon: ico(<><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-1.32-.32a2.5 2.5 0 0 0-2.4.96l-.95 1.27c-.42.56-1.21.71-1.81.35l-1.39-.85a1.92 1.92 0 0 0-2.4.38L9.5 17"/><path d="M11 2c-1 1-1.5 2-1.5 3 0 1.5 1.5 3 1.5 4.5"/></>) },
      { title: "בקשות חופשה", desc: "ניהול בקשות עם סבבי אישורים אוטומטיים", iconLottie: "/icons-lottie/article.json", icon: ico(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></>) },
      { title: "החזר הוצאות", desc: "הגשה, אישורים ומעקב — הכל דיגיטלי", iconLottie: "/icons-lottie/coins.json", icon: ico(<><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/></>) },
      { title: "יציאה להשתלמות", desc: "בקשות לקורסים וכנסים עם אישור מנהל", iconLottie: "/icons-lottie/edit-document.json", icon: ico(<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>) },
      { title: "הזמנות ציוד", desc: "הזמנת ציוד, מדים, אוכל ועוד — בתהליך מסודר", iconLottie: "/icons-lottie/puzzle.json", icon: ico(<><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></>) },
      { title: "צ׳ק ליסט משימות", desc: "פתיחה/סגירה של חנות או משמרת עם מעקב", iconLottie: "/icons-lottie/celebrations.json", icon: ico(<><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9.5"/><path d="m9 11 3 3L22 4"/></>) },
      { title: "כניסת רכב לחניון", desc: "ניהול בקשות כניסת רכב לחניונים ארגוניים", iconLottie: "/icons-lottie/globe.json", icon: ico(<><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></>) },
    ],
  },
  {
    id: "lms",
    shortLabel: "LMS — למידה",
    title: "מודול LMS — למידה והכשרה",
    subtitle: "ניהול מלא של הכשרות, קורסים, הסמכות ולמידה שוטפת",
    color: "#E8710A",
    colorSoft: "rgba(232, 113, 10, 0.10)",
    gradient: "linear-gradient(135deg, #E8710A 0%, #FFA45C 100%)",
    icon: ico(<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></>),
    features: [
      { title: "למידה מתוקשבת", desc: "תמיכה במגוון סוגי קבצים וסטנדרט SCORM ללומדות", iconLottie: "/icons-lottie/video.json", icon: ico(<><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></>) },
      { title: "הדרכות פרונטליות", desc: "קטלוג קורסים, ניהול מדריכים, כיתות וחומרי הדרכה", iconLottie: "/icons-lottie/microphone.json", icon: ico(<><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></>) },
      { title: "ניהול הסמכות", desc: "מעקב אחר תוקף הסמכות, רגולציה וכשירות ארגונית", iconLottie: "/icons-lottie/star.json", icon: ico(<><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H6"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></>) },
      { title: "מחולל מבחנים", desc: "בנק שאלות, הגדרות מאפייני מבחן פר מסלול ולומד", iconLottie: "/icons-lottie/edit.json", icon: ico(<><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></>) },
      { title: "תעודות אוטומטיות", desc: "מחולל תעודות — מופקות אוטומטית עם סיום קורס", iconLottie: "/icons-lottie/download.json", icon: ico(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>) },
      { title: "קליטת עובדים חדשים", desc: "מסלול הכשרה מלא לעובד חדש מהיום הראשון", iconLottie: "/icons-lottie/user-plus.json", icon: ico(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></>) },
      { title: "תיק אישי", desc: "תיק אישי לכל עובד עם היסטוריית למידה והסמכות", iconLottie: "/icons-lottie/archive.json", icon: ico(<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>) },
      { title: "ממשקי HR ושכר", desc: "חיבור לכל מערכות שכר ומשאבי אנוש כולל עץ ארגוני", iconLottie: "/icons-lottie/share.json", icon: ico(<><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></>) },
      { title: "למידה שוטפת", desc: "רענון, מעקב אחר פגי תוקף והכשרות חוזרות", iconLottie: "/icons-lottie/loading.json", icon: ico(<><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></>) },
    ],
  },
  {
    id: "performance",
    shortLabel: "הערכת ביצועים",
    title: "מודול הערכת ביצועים",
    subtitle: "תהליך הערכה שנתי ממוחשב, גמיש ופרסונלי לכל עובד",
    blurb: "מודול הערכת ביצועים מתקדם לניהול ממוחשב ויעיל של תהליך ההערכה השנתי. ניתן לקיים תהליך אוטומטי מותאם לפי עיסוק.",
    color: "#EA4335",
    colorSoft: "rgba(234, 67, 53, 0.10)",
    gradient: "linear-gradient(135deg, #EA4335 0%, #FF7B6F 100%)",
    icon: ico(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>),
    features: [
      { title: "ממשק למערכת שכר", desc: "קליטת עובדים אוטומטית מממשק שכר", iconLottie: "/icons-lottie/share.json", icon: ico(<><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></>) },
      { title: "הערכה על בסיס כישורים", desc: "ניהול והערכה לפי כישורים ספציפיים לתפקיד", iconLottie: "/icons-lottie/star.json", icon: ico(<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>) },
      { title: "טופס פרסונלי", desc: "התאמת טופס הערכה לכל עובד באופן אישי", iconLottie: "/icons-lottie/settings.json", icon: ico(<><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></>) },
      { title: "תהליכים לפי קבוצות", desc: "הקמת תהליכי הערכה לפי קבוצות שונות בארגון", iconLottie: "/icons-lottie/copy.json", icon: ico(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>) },
      { title: "ממשק חדשני", desc: "ממשק משתמש ייחודי ונוח לשימוש לעובד ולמנהל", iconLottie: "/icons-lottie/airplay.json", icon: ico(<><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></>) },
      { title: "מנגנון התראות חכם", desc: "תזכורות אוטומטיות בכל שלבי תהליך ההערכה", iconLottie: "/icons-lottie/notification.json", icon: ico(<><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/></>) },
      { title: "מעקב ובקרה", desc: "דשבורד ניהולי עם סטטוס תהליכים ומדדים בזמן אמת", iconLottie: "/icons-lottie/visibility.json", icon: ico(<><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/></>) },
    ],
  },
];