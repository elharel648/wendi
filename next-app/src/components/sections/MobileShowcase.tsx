import Image from "next/image";

type Category = {
  cat: string;
  title: string;
  desc: string;
};

const categories: Category[] = [
  {
    cat: "comm",
    title: "תקשורת פנים-ארגונית",
    desc: "פורטלי עובדים חכמים עם עדכוני חברה, צ'אט מובנה ודחיפות מותאמות אישית — הכל תחת מותג הארגון שלכם.",
  },
  {
    cat: "health",
    title: "בריאות ורפואה",
    desc: "אפליקציות לקופות חולים ומרפאות — תורים, הפניות, בדיקות ומידע רפואי בנגישות מלאה מהנייד.",
  },
  {
    cat: "wallet",
    title: "ארנק והטבות",
    desc: "ניהול תקציב עובד, הטבות ותגמולים, תוכניות נאמנות וארנק דיגיטלי — הכל בממשק אחד נקי.",
  },
  {
    cat: "learn",
    title: "למידה ופיתוח",
    desc: "פלטפורמות e-learning עם קורסי חובה, מבחני ציות ומסלולי הכשרה מותאמים לכל תפקיד בארגון.",
  },
  {
    cat: "tools",
    title: "כלים וניהול",
    desc: "כלי ניהול פנימי לממשקי Back-Office, לוחות בקרה, אדמין ועוד — מותאמים לתפעול יומיומי.",
  },
];

type Card = {
  cat: string;
  img: string;
  alt: string;
  lbl: string;
};

const cards: Card[] = [
  { cat: "comm",   img: "/apps/Screenshot_2.png",  alt: "תקשורת ארגונית", lbl: "תקשורת פנים-ארגונית" },
  { cat: "comm",   img: "/apps/Screenshot_11.png", alt: "תקשורת ארגונית", lbl: "תקשורת פנים-ארגונית" },
  { cat: "comm",   img: "/apps/Screenshot_16.png", alt: "תקשורת ארגונית", lbl: "תקשורת פנים-ארגונית" },
  { cat: "health", img: "/apps/Screenshot_3.png",  alt: "בריאות ורפואה",  lbl: "בריאות ורפואה" },
  { cat: "health", img: "/apps/Screenshot_4.png",  alt: "בריאות ורפואה",  lbl: "בריאות ורפואה" },
  { cat: "health", img: "/apps/Screenshot_5.png",  alt: "בריאות ורפואה",  lbl: "בריאות ורפואה" },
  { cat: "wallet", img: "/apps/Screenshot_6.png",  alt: "ארנק והטבות",    lbl: "ארנק והטבות" },
  { cat: "wallet", img: "/apps/Screenshot_7.png",  alt: "ארנק והטבות",    lbl: "ארנק והטבות" },
  { cat: "wallet", img: "/apps/Screenshot_9.png",  alt: "ארנק והטבות",    lbl: "ארנק והטבות" },
  { cat: "learn",  img: "/apps/Screenshot_10.png", alt: "למידה ופיתוח",   lbl: "למידה ופיתוח" },
  { cat: "learn",  img: "/apps/Screenshot_13.png", alt: "למידה ופיתוח",   lbl: "למידה ופיתוח" },
  { cat: "learn",  img: "/apps/Screenshot_15.png", alt: "למידה ופיתוח",   lbl: "למידה ופיתוח" },
  { cat: "tools",  img: "/apps/Screenshot_1.png",  alt: "כלים וניהול",    lbl: "כלים וניהול" },
  { cat: "tools",  img: "/apps/Screenshot_8.png",  alt: "כלים וניהול",    lbl: "כלים וניהול" },
  { cat: "tools",  img: "/apps/Screenshot_12.png", alt: "כלים וניהול",    lbl: "כלים וניהול" },
  { cat: "tools",  img: "/apps/Screenshot_14.png", alt: "כלים וניהול",    lbl: "כלים וניהול" },
];

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const DemoArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export function MobileShowcase() {
  return (
    <section className="mob-show" dir="rtl" id="mobShowcase">
      <span className="mob-eyebrow">אפליקציות מובייל בהתאמה אישית</span>
      <h2 className="mob-title">אפליקציה לכל צורך</h2>
      <div className="mob-inner">
        <div className="mob-layout">

          {/* LEFT: accordion categories */}
          <div className="mob-acc" id="mobAcc">
            {categories.map((c) => (
              <div key={c.cat} className="mob-acc-item" data-cat={c.cat}>
                <div className="mob-acc-hd">
                  <span className="mob-acc-hd-title">{c.title}</span>
                  <span className="mob-acc-icon"><PlusIcon /></span>
                </div>
                <div className="mob-acc-body">
                  <p className="mob-acc-desc">{c.desc}</p>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT: peek carousel */}
          <div className="mob-stage-wrap">
            <div className="mob-stage" id="mobStage">
              <div className="mob-track" id="mobTrack">
                {cards.map((card, i) => (
                  <div key={i} className="mob-card" data-cat={card.cat}>
                    <span className="mob-card-badge-top">אפליקציה מותאמת</span>
                    <Image
                      src={card.img}
                      className="mob-sc-img"
                      alt={card.alt}
                      width={320}
                      height={640}
                      sizes="(max-width: 768px) 50vw, 280px"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="mob-sc-foot">
                      <button type="button" className="mob-sc-cta">
                        צפו בדמו
                        <DemoArrow />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="mob-arrow mob-arrow-prev" id="mobPrev" aria-label="הקודם">
              <ChevronLeftIcon />
            </button>
            <button className="mob-arrow mob-arrow-next" id="mobNext" aria-label="הבא">
              <ChevronRightIcon />
            </button>
            <div className="mob-dots" id="mobDots" />
          </div>

        </div>
      </div>
    </section>
  );
}
