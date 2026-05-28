/**
 * About page content — typed, CMS-ready.
 * Shared across /about, /about/faq, /about/gallery.
 */

export type AboutStat = { num: string; label: string };
export type TimelineItem = { year: string; title: string; desc: string };
export type ValueItem = { num: string; title: string; desc: string };
export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  fallbackLetter: string;
};

export type FaqCategory = "tech" | "impl" | "price" | "sec";
export type FaqItem = {
  cat: FaqCategory;
  catLabel: string;
  question: string;
  answer: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type VideoItem = {
  youtubeId: string;
  title: string;
};

export type AboutContent = {
  hero: {
    bgWord: string;
    titleLines: { text: string; accent?: boolean }[];
    sub: string;
    stats: AboutStat[];
  };
  story: {
    quote: { plain: string; accent: string };
    intro: string[];
    timeline: TimelineItem[];
  };
  mission: {
    quote: string;
    author: string;
    authorRole: string;
  };
  values: {
    title: string;
    items: ValueItem[];
  };
  team: {
    title: string;
    sub: string;
    members: TeamMember[];
  };
  faq: {
    eyebrow: string;
    title: string;
    sub: string;
    filters: { id: "all" | FaqCategory; label: string }[];
    items: FaqItem[];
  };
  gallery: {
    title: string;
    sub: string;
    images: GalleryImage[];
    videos: {
      title: string;
      sub: string;
      items: VideoItem[];
    };
  };
};

export const aboutContent: AboutContent = {
  hero: {
    bgWord: "WENDI",
    titleLines: [
      { text: "בונים את הדיגיטל" },
      { text: "של העובד הישראלי", accent: true },
    ],
    sub: "חברת מוצר ישראלית המתמחה בפלטפורמות דיגיטליות לעובדים. מאמינים שמה שעובד טוב לעובדים — עובד טוב לארגון.",
    stats: [
      { num: "50+", label: "ארגונים פעילים" },
      { num: "6", label: "מגזרי פעילות" },
      { num: "10+", label: "שנות ניסיון" },
      { num: "24/7", label: "זמינות" },
    ],
  },

  story: {
    quote: { plain: "וונדי היא הרבה יותר ממערכת.", accent: "היא שותפה." },
    intro: [
      "אנחנו הולכים יד ביד עם עשרות ארגונים בישראל. ביחד איתם בנינו את המוצר שמשרת את העובדים שלהם ביום-יום, בכל מקום ובכל רגע.",
      "כל ממשק, כל מודול וכל פיצ'ר נולד מתוך שיתוף פעולה אמיתי עם לקוחותינו — כי אנחנו מאמינים שמה שעובד טוב לעובדים, עובד טוב לארגון.",
      "הצוות שלנו משלב אנשי מוצר, פיתוח ותמיכה תחת קורת גג אחת — כך שהלקוח תמיד מדבר עם אנשים שמכירים אותו לעומק.",
    ],
    timeline: [
      { year: "2013", title: "הקמת החברה", desc: "נוסדה בתל אביב עם חזון ברור: לתת לעובד הישראלי כלי דיגיטל ראוי." },
      { year: "2016", title: "20 לקוחות ראשונים", desc: "עברנו את ה-20 ארגון פעיל — מהפיננסים ועד לשירות הציבורי." },
      { year: "2019", title: "אפליקציה נייטיב", desc: "השקנו אפליקציה iOS ו-Android תחת המותג של כל לקוח — בפעם הראשונה בשוק." },
      { year: "2023", title: "Wendi AI", desc: "שילוב בינה מלאכותית לפלטפורמה — עוזר חכם לכל עובד בכל שאלה." },
    ],
  },

  mission: {
    quote: '"המשימה שלנו לא נגמרת אחרי ה-Go-Live. אנחנו שם כל יום — עם כל עובד, בכל ארגון."',
    author: "שרית הכמון",
    authorRole: 'מנכ"לית ומייסדת Wendi',
  },

  values: {
    title: "מה מניע אותנו",
    items: [
      { num: "01", title: "שותפות אמיתית", desc: "אנחנו לא מוכרים מוצר — אנחנו בונים יחד עם הלקוח. כל פרויקט מתחיל בהקשבה ומסתיים בהצלחה משותפת." },
      { num: "02", title: "חדשנות מתמדת", desc: "הפלטפורמה שלנו מתפתחת כל הזמן. אנחנו מקשיבים לשטח ומשחררים עדכונים שמשפרים את חיי העובד." },
      { num: "03", title: "פשטות בשירות המורכבות", desc: "ארגונים גדולים מורכבים — הפתרון שלנו חייב להיות פשוט לשימוש. אנחנו לוקחים את הקושי על עצמנו." },
      { num: "04", title: "אבטחה ואמינות", desc: "נתוני עובדים הם רגישים. אנחנו עומדים בתקני אבטחה מחמירים ומבטיחים זמינות של 99.9%." },
      { num: "05", title: "נתונים מניעים החלטות", desc: "כל פעולה בפלטפורמה מייצרת תובנה. אנחנו עוזרים לארגון לקבל החלטות מבוססות נתוני אמת." },
      { num: "06", title: "גדילה יחד", desc: "המוצר גדל עם הלקוח. ממאה עובדים לעשרת אלפים — הפלטפורמה מתאימה את עצמה בלי כאבים." },
    ],
  },

  team: {
    title: "האנשים מאחורי Wendi",
    sub: "צוות מנוסה של אנשי מוצר, טכנולוגיה ועולם HR — שמבינים גם את הארגון וגם את העובד.",
    members: [
      { name: "שרית הכמון", role: 'מנכ"לית ומייסדת', photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "ש" },
      { name: "עמית לוי", role: 'סמנכ"ל טכנולוגיה', photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "ע" },
      { name: "מיכל כהן", role: "ראש צוות מוצר", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "מ" },
      { name: "דן שפירא", role: "ראש צוות לקוחות", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "ד" },
      { name: "נועה בן-דוד", role: "מעצבת מוצר ראשית", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "נ" },
      { name: "רון אדלר", role: "מנהל הנדסה", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "ר" },
      { name: "תמר אלון", role: "ראש שיווק", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "ת" },
      { name: "אורי שגב", role: "ראש מכירות", photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face&auto=format", fallbackLetter: "א" },
    ],
  },

  faq: {
    eyebrow: "שאלות ותשובות",
    title: "כל מה שרציתם לדעת",
    sub: "שאלות שעולות תמיד — עם תשובות ישרות.",
    filters: [
      { id: "all", label: "הכל" },
      { id: "tech", label: "טכנולוגיה" },
      { id: "impl", label: "הטמעה" },
      { id: "price", label: "תמחור" },
      { id: "sec", label: "אבטחה" },
    ],
    items: [
      { cat: "impl", catLabel: "הטמעה", question: "כמה זמן לוקחת ההטמעה?", answer: "רוב הלקוחות מקבלים פלטפורמה פעילה תוך 2–4 שבועות. ארגונים עם מערכות מורכבות — עד 8 שבועות. הצוות שלנו מוביל את כל התהליך, כולל בדיקות UAT, הדרכת מנהלים ועלייה לאוויר מלאה." },
      { cat: "tech", catLabel: "טכנולוגיה", question: "האם הנתונים שלנו עוזבים את ישראל?", answer: "לא. וונדי מציעה אחסון בענן ישראלי (AWS Israel / Azure Israel) ואפשרות On-Premise לארגונים שדורשים זאת. הנתונים שלכם נשארים תחת שליטתכם בכל עת." },
      { cat: "tech", catLabel: "טכנולוגיה", question: "איך זה עובד עם SAP / Priority / Oracle שלנו?", answer: "וונדי מתחברת דרך API סטנדרטי. בשלב ראשון — קריאה בלבד (read-only) בלי לגעת במערכות הקיימות. כתיבה חזרה זמינה לאחר אבטחת אישור ה-IT. יש לנו ניסיון מוכח עם SAP HR, Priority People, Oracle HCM, Agresso ועוד." },
      { cat: "sec", catLabel: "אבטחה", question: "האם הפלטפורמה עומדת בתקנות הגנת הפרטיות?", answer: "כן. וונדי תוכננה לעמוד בחוק הגנת הפרטיות הישראלי, תקנות אבטחת מידע 2017 ו-GDPR. אנחנו מספקים DPA מלא, תיעוד לביקורת רגולטורית, ועמידה בתקני ISO 27001." },
      { cat: "tech", catLabel: "טכנולוגיה", question: "האם יש אפליקציה נייטיב לנייד?", answer: "כן. לוונדי אפליקציית iOS ו-Android נייטיב — בשם המותג של הארגון שלכם, עם אייקון מותאם בחנות. לא PWA, לא Webview — אפליקציה אמיתית עם כל יכולות המובייל (Push Notifications, ביומטרי, מצב Offline ועוד)." },
      { cat: "price", catLabel: "תמחור", question: "מה מודל התמחור?", answer: "תמחור לפי מספר משתמשים פעילים חודשיים — כולל כל המודולים שבחרתם. אין עלויות הפתעה, אין תשלום על storage, אין חיוב על פיצ'רים עתידיים. הצעת מחיר מותאמת אישית לכל ארגון." },
      { cat: "impl", catLabel: "הטמעה", question: "מה קורה אחרי העלייה לאוויר?", answer: "יש לכם מנהל לקוח ייעודי, תמיכה טכנית בעברית, ו-SLA מובטח. אנחנו מבצעים ניטור שוטף, משחררים עדכונים אוטומטיים ומעדכנים אתכם על פיצ'רים חדשים. הקשר לא נגמר אחרי ה-Go-Live." },
      { cat: "impl", catLabel: "הטמעה", question: "האם ניתן לראות הדגמה?", answer: "בהחלט. אנחנו מציעים הדגמה ממוקדת של 30–45 דקות, מותאמת לארגון שלכם — עם דאטה לדוגמה מהמגזר הרלוונטי. ניתן לתאם כאן ואנחנו נחזור תוך יום עסקים." },
      { cat: "sec", catLabel: "אבטחה", question: "מה ה-SLA של הפלטפורמה?", answer: "זמינות מובטחת של 99.9% — עם monitoring 24/7, התראות אוטומטיות ו-incident response מהיר. עבור ארגונים ממשלתיים ובטחוניים — SLA מורחב עם זמני תגובה מוגדרים בחוזה." },
    ],
  },

  gallery: {
    title: "תמונות וסרטונים",
    sub: "הצצה לעבודה שלנו, האירועים, הצוות והלקוחות.",
    images: [
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop", alt: "כנסים והשקות", caption: "כנסים והשקות" },
      { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop", alt: "הצוות שלנו", caption: "הצוות שלנו" },
      { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop", alt: "ימי עיון והדרכות", caption: "ימי עיון והדרכות" },
      { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400&auto=format&fit=crop", alt: "מפגשי לקוחות", caption: "מפגשי לקוחות" },
      { src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1400&auto=format&fit=crop", alt: "מאחורי הקלעים", caption: "מאחורי הקלעים" },
    ],
    videos: {
      title: "Wendi בפעולה",
      sub: "סרטוני השקה, מפגשי לקוחות וסיפורי הצלחה — הישר מהערוץ שלנו.",
      items: [
        { youtubeId: "EjlyH-o1EYI", title: "השקת אפליקציית וונדי לעובדי MAX" },
        { youtubeId: "EZPMi76r48E", title: "השקת אפליקציית וונדי לעובדי הפניקס בית השקעות" },
        { youtubeId: "a1PWboIE2uc", title: "מפגש לקוחות ייחודי עם חברת וונדי — שיתוף, השראה וצמיחה משותפת" },
        { youtubeId: "HBtAus6YLsw", title: "השקת אפליקציית וונדי לעובדי חברת דלק" },
        { youtubeId: "LKF6vl2eQDs", title: "השקת אפליקציית וונדי לעובדי עיריית ירושלים" },
        { youtubeId: "VSK6TCU-Sb4", title: "אפליקציית וונדי באיקאה — סרטון מכנס משאבי אנוש" },
        { youtubeId: "78MSBpSSQfU", title: "בזק — השקת אפליקציית וונדי לתקשורת פנים ושירות עצמי" },
        { youtubeId: "KcK8gmhCd9k", title: "Wendi — סרטון לקוחות" },
        { youtubeId: "ANMtGVu7j4s", title: "פלטפורמה דיגיטלית פנים ארגונית — אפליקציה ופורטל וונדי לחווית העובד" },
        { youtubeId: "KiJ8spx3ccs", title: "Wendi LMS by Ewave — מערכת לניהול הדרכה והסמכה בארגון" },
      ],
    },
  },
};
