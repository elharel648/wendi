"use client";

import { mamashkimContent as mamashkimDefault } from "@/content/mamashkim";

const TEAL = "#0D9488";
const ROSE = "#E11D48"; // soft rose for the ✗ side — muted enough for the light theme

type WendiPoint = {
  title: string;
  body: string;
};

const WENDI_POINTS: WendiPoint[] = [
  { title: "אפיון משותף עם הלקוח", body: "לפני שורה אחת של קוד" },
  { title: "פיתוח ממשק ייעודי", body: "מותאם לארגון שלכם" },
  { title: "התאמה מלאה להרשאות", body: "ולהיררכיה הארגונית" },
  { title: "תחזוקה שוטפת ושדרוגים", body: "כולל SLA מובטח" },
  { title: "גורם אחד — מקצה לקצה", body: "מוצר, פיתוח ותמיכה" },
  { title: "התאמה לתרבות הארגון", body: "ולשפה הפנים-ארגונית" },
];

type OthersItem = {
  name: string;
  desc: string;
};

const OTHERS_ITEMS: OthersItem[] = [
  { name: "חיבור מדף בלבד", desc: "ללא הבנת הצורך הארגוני" },
  { name: "תלות ב־API קיים", desc: "אם אין API, אין פתרון" },
  { name: "גישה גנרית להרשאות", desc: "אותו דבר לכל משתמש, ללא הבחנה" },
  { name: "תחזוקה? באחריותכם", desc: "אתם נשארים לבד עם התקלות" },
  { name: "ספקים מרובים, גלגול האשמה", desc: "כל אחד מצביע על השני" },
  { name: "Template אחיד לכל ארגון", desc: "אותה תבנית, ללא התאמה אישית" },
];

function CheckMark() {
  return (
    <span
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white"
      style={{ background: TEAL }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function CrossMark() {
  return (
    <span
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(225,29,72,0.10)", color: ROSE }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}

export function IntegrationsDuel({ content }: { content?: import("@/content/mamashkim").DuelContent }) {
  const c = content ?? mamashkimDefault.duel;
  // merge editable text onto visual defs by index
  const wendiPoints = WENDI_POINTS.map((p, i) => ({ ...p, ...c.wendiPoints[i] }));
  const othersItems = OTHERS_ITEMS.map((o, i) => ({
    name: c.othersItems[i]?.name ?? o.name,
    desc: c.othersItems[i]?.desc ?? o.desc,
  }));
  const rows = wendiPoints.map((w, i) => ({ wendi: w, other: othersItems[i] }));

  return (
    <section
      id="different"
      dir="rtl"
      aria-label="מה מייחד את וונדי"
      className="relative isolate bg-paper py-16 sm:py-20 lg:py-28"
    >
      <SoftGlow />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section head */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {c.headingPlain}{" "}
            <span className="relative inline-block">
              <span style={{ color: TEAL }}>{c.headingAccent}</span>
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-fg sm:text-lg">
            {c.sub}
          </p>
        </div>

        {/* Comparison table — Wendi (right) vs Others (left), row by row */}
        <div
          className="overflow-hidden rounded-3xl border border-line bg-paper"
          style={{ boxShadow: "0 24px 60px -30px rgba(15,23,42,0.18), 0 4px 12px -6px rgba(15,23,42,0.06)" }}
        >
          {/* Column header */}
          <div className="grid grid-cols-2">
            {/* Wendi header */}
            <div
              className="flex items-center justify-center gap-2 px-4 py-4 text-sm font-extrabold sm:px-6 sm:py-5 sm:text-base"
              style={{ background: "rgba(13,148,136,0.07)", color: TEAL }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.4 6.9H22l-6 4.3 2.3 6.8L12 16.2 5.7 20l2.3-6.8-6-4.3h7.6z" />
              </svg>
              {c.wendiChip}
            </div>
            {/* Others header */}
            <div className="flex items-center justify-center gap-2 border-r border-line px-4 py-4 text-sm font-extrabold text-muted-fg sm:px-6 sm:py-5 sm:text-base">
              {c.othersChip}
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.wendi.title}
              className={`grid grid-cols-2 border-t border-line ${i % 2 === 1 ? "bg-line-2/40" : ""}`}
            >
              {/* Wendi cell */}
              <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
                <CheckMark />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink sm:text-[0.95rem]">{row.wendi.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-fg">{row.wendi.body}</p>
                </div>
              </div>
              {/* Others cell */}
              <div className="flex items-center gap-3 border-r border-line px-4 py-4 sm:px-6 sm:py-5">
                <CrossMark />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink/80 sm:text-[0.95rem]">{row.other.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-fg">{row.other.desc}</p>
                </div>
              </div>
            </div>
          ))}
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
