"use client";

import { LottieIcon } from "@/components/ui/lottie-icon";

const TEAL = "#0D9488";

type WendiPoint = {
  title: string;
  body: string;
};

const WENDI_POINTS: WendiPoint[] = [
  {
    title: "אפיון משותף עם הלקוח",
    body: "לפני שורה אחת של קוד",
  },
  {
    title: "פיתוח ממשק ייעודי",
    body: "מותאם לארגון שלכם",
  },
  {
    title: "התאמה מלאה להרשאות",
    body: "ולהיררכיה הארגונית",
  },
  {
    title: "תחזוקה שוטפת ושדרוגים",
    body: "כולל SLA מובטח",
  },
  {
    title: "גורם אחד — מקצה לקצה",
    body: "מוצר, פיתוח ותמיכה",
  },
  {
    title: "התאמה לתרבות הארגון",
    body: "ולשפה הפנים-ארגונית",
  },
];

type OthersItem = {
  name: string;
  desc: string;
  lottie: string;
};

const OTHERS_ITEMS: OthersItem[] = [
  {
    name: "חיבור מדף בלבד",
    desc: "ללא הבנת הצורך הארגוני",
    lottie: "/icons-lottie/folder.json",
  },
  {
    name: "תלות ב־API קיים",
    desc: "אם אין API, אין פתרון",
    lottie: "/icons-lottie/lock.json",
  },
  {
    name: "גישה גנרית להרשאות",
    desc: "אותו דבר לכל משתמש, ללא הבחנה",
    lottie: "/icons-lottie/user-x.json",
  },
  {
    name: "תחזוקה? באחריותכם",
    desc: "אתם נשארים לבד עם התקלות",
    lottie: "/icons-lottie/settings.json",
  },
  {
    name: "ספקים מרובים, גלגול האשמה",
    desc: "כל אחד מצביע על השני",
    lottie: "/icons-lottie/share.json",
  },
  {
    name: "Template אחיד לכל ארגון",
    desc: "אותה תבנית, ללא התאמה אישית",
    lottie: "/icons-lottie/copy.json",
  },
];

export function IntegrationsDuel() {
  return (
    <section
      id="different"
      dir="rtl"
      aria-label="מה מייחד את וונדי"
      className="relative isolate bg-paper py-16 sm:py-20 lg:py-28"
    >
      <SoftGlow />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section head */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            לא רק API.{" "}
            <span className="relative inline-block">
              <span style={{ color: TEAL }}>פתרון מלא.</span>
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-fg sm:text-lg">
            רוב הפלטפורמות מציעות חיבור טכני בלבד ומשאירות לכם את כל ההתאמה
            והאחריות. וונדי עושה הרבה יותר מזה.
          </p>
        </div>

        {/* Two separate boxes — Wendi (highlighted) vs Others (muted) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* ── Wendi box ── */}
          <div
            className="flex flex-col rounded-3xl border-2 bg-paper p-6 sm:p-8 lg:p-10"
            style={{
              borderColor: "rgba(13,148,136,0.30)",
              boxShadow:
                "0 20px 50px -24px rgba(13,148,136,0.30), 0 4px 12px -6px rgba(15,23,42,0.08)",
            }}
          >
            {/* identity chip */}
            <div className="mb-6 flex items-center">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.78rem] font-extrabold tracking-[0.10em] text-white"
                style={{
                  boxShadow:
                    "0 6px 16px -4px rgba(15,23,42,0.35), 0 0 0 1px rgba(15,23,42,0.20)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                וונדי
              </span>
            </div>

            <p
              className="mb-6 border-b border-line pb-5 text-center text-sm font-bold sm:text-base"
              style={{ color: TEAL }}
            >
              פתרון חי, מותאם, ובאחריות אחת
            </p>

            {/* static point list */}
            <div className="flex-1 space-y-3">
              {WENDI_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="flex items-center gap-3 rounded-2xl border bg-paper p-3.5 sm:p-4"
                  style={{ borderColor: "rgba(13,148,136,0.25)" }}
                >
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: TEAL }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-ink">{point.title}</p>
                    <p className="text-xs leading-relaxed text-muted-fg">
                      {point.body}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 rounded-full px-2 py-1 text-[10px] font-bold tracking-wider text-white"
                    style={{ background: TEAL }}
                  >
                    עם וונדי
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Others box ── */}
          <div className="flex flex-col rounded-3xl border border-line bg-line-2/30 p-6 sm:p-8 lg:p-10">
            {/* identity chip */}
            <div className="mb-6 flex items-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[0.78rem] font-extrabold tracking-[0.10em] text-muted-fg">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                פלטפורמות אחרות
              </span>
            </div>

            <p className="mb-6 border-b border-line pb-5 text-center text-sm font-bold text-muted-fg sm:text-base">
              חיבור גנרי, וכאב ראש מתמשך
            </p>

            <div className="flex-1 space-y-3">
              {OTHERS_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-3.5 sm:p-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <LottieIcon src={item.lottie} size={32} playOnHover />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-ink">{item.name}</p>
                    <p className="text-xs leading-relaxed text-muted-fg">
                      {item.desc}
                    </p>
                  </div>
                  <span className="flex-shrink-0 rounded-full border border-line px-2 py-1 text-[10px] font-bold tracking-wider text-muted-fg">
                    ללא וונדי
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SoftGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-32 right-[-15%] h-[440px] w-[440px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.10), transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.08), transparent 65%)",
        }}
      />
    </div>
  );
}
