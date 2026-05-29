"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LottieIcon } from "@/components/ui/lottie-icon";

const TEAL = "#0D9488";

type DuelCard = {
  id: number;
  label: string;
  title: string;
  body: string;
  labelColor: string;
  labelBg: string;
};

const WENDI_CARDS: DuelCard[] = [
  {
    id: 0,
    label: "אפיון משותף",
    title: "מתחילים בהבנת הצורך, לא בקוד גנרי",
    body:
      "אנחנו יושבים עם הלקוח לפני שורת קוד אחת — מבינים את התהליכים, ההרשאות והמטרה. רק אחר כך בונים.",
    labelColor: "#B45309",
    labelBg: "#FEF3C7",
  },
  {
    id: 1,
    label: "פיתוח ייעודי",
    title: "כל ממשק נבנה לארגון שלכם",
    body:
      "לא Template אחיד. לא Plug & Pray. ממשק שמתאים בדיוק למבנה, להיררכיה ולשפה של הארגון.",
    labelColor: "#C2410C",
    labelBg: "#FFEDD5",
  },
  {
    id: 2,
    label: "אחריות מלאה",
    title: "גורם אחד — מוצר, פיתוח, תמיכה",
    body:
      "אפיון, פיתוח, בדיקות, עלייה לאוויר, תחזוקה ושדרוגים — הכל באחריות אחת. אתם לא נעים בין ספקים.",
    labelColor: "#BE185D",
    labelBg: "#FCE7F3",
  },
];

type OthersItem = {
  name: string;
  desc: string;
  lottie: string;
};

const OTHERS_ITEMS: OthersItem[] = [
  {
    name: "חיבור מדף",
    desc: "Template אחיד לכל לקוח, ללא הבנת הצורך הארגוני",
    lottie: "/icons-lottie/folder.json",
  },
  {
    name: "תלות ב־API קיים",
    desc: "אם אין API, אין פתרון. תחזוקה — באחריותכם.",
    lottie: "/icons-lottie/lock.json",
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

        {/* Two-block grid — symmetric: visual on top, caption on bottom */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-2">
          {/* Wendi side */}
          <div className="flex flex-col bg-paper p-6 sm:p-8 lg:p-10">
            {/* Top identity chip — clear marker that this column is Wendi */}
            <div className="mb-5 flex items-center">
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
              <span className="ms-3 text-[0.75rem] font-bold tracking-wider text-muted-fg">
                הדרך שלנו
              </span>
            </div>

            <div className="relative w-full flex-1">
              <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-10 h-16 bg-gradient-to-t from-paper to-transparent sm:h-20" />
              <CardStack items={WENDI_CARDS} />
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <h3 className="text-lg font-bold leading-snug text-ink sm:text-xl">
                הדרך של וונדי{" "}
                <span style={{ color: TEAL }}>· פתרון חי ומותאם</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-fg sm:text-base">
                אפיון משותף, פיתוח ייעודי, ואחריות אחת מקצה לקצה — מהיום הראשון
                ולכל אורך חיי המוצר.
              </p>
            </div>
          </div>

          {/* Others side */}
          <div className="flex flex-col bg-paper p-6 sm:p-8 lg:p-10">
            {/* Top identity chip — clear marker that this column is competitors */}
            <div className="mb-5 flex items-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-line bg-line-2/50 px-4 py-2 text-[0.78rem] font-extrabold tracking-[0.10em] text-muted-fg"
              >
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
                אחרים
              </span>
              <span className="ms-3 text-[0.75rem] font-bold tracking-wider text-muted-fg">
                החיבור הגנרי
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <div className="space-y-3 rounded-2xl border border-line bg-paper p-3 sm:p-4">
                {OTHERS_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:bg-line-2/40"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                      <LottieIcon src={item.lottie} size={32} playOnHover />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-ink">{item.name}</p>
                      <p className="line-clamp-2 text-xs text-muted-fg">
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

            <div className="mt-6 border-t border-line pt-6">
              <h3 className="text-lg font-bold leading-snug text-ink sm:text-xl">
                פלטפורמות אחרות{" "}
                <span className="text-muted-fg">· חיבור גנרי</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-fg sm:text-base">
                חיבור מדף בלבד, תלות ב־API קיים, גישה גנרית להרשאות — וכאב ראש
                מתמשך של תחזוקה באחריותכם.
              </p>
            </div>
          </div>
        </div>

        {/* Stats + Quote row */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center">
            <div className="grid w-full grid-cols-3 gap-6 text-center sm:gap-8 sm:text-right">
              <Stat value="100%" label="ממשקים מותאמים אישית" />
              <Stat value="+30" label="מערכות שחיברנו בפועל" />
              <Stat value="1" label="גורם אחד באחריות" />
            </div>
          </div>

          <div>
            <blockquote
              className="border-r-2 pr-5 text-muted-fg sm:pr-7"
              style={{ borderColor: TEAL }}
            >
              <p className="text-base leading-relaxed text-ink sm:text-lg">
                "המטרה שלנו היא לא לחבר API. המטרה היא שהעובד שלכם יקבל את המידע
                הנכון בזמן הנכון — וזה דורש להבין את הארגון, לא רק את המערכת."
              </p>
              <div className="mt-5 space-y-1">
                <cite className="block text-sm font-bold not-italic text-ink sm:text-base">
                  צוות המוצר של Wendi
                </cite>
                <span className="block text-xs text-muted-fg sm:text-sm">
                  מתוך אפיון משותף עם לקוחות וונדי
                </span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-3xl font-black text-ink sm:text-4xl lg:text-5xl">
        {value}
      </div>
      <p className="text-sm text-muted-fg sm:text-base">{label}</p>
    </div>
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

/* ─── CardStack: 3 cards that rotate every 5s, scaled stack ───────────── */

function CardStack({ items }: { items: DuelCard[] }) {
  const CARD_OFFSET = 10;
  const SCALE_FACTOR = 0.06;
  const [cards, setCards] = useState<DuelCard[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto my-4 h-56 w-full md:h-52 md:max-w-md">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={cn(
            "absolute flex h-56 w-full flex-col justify-between rounded-3xl border bg-paper p-5 shadow-xl md:h-52",
          )}
          style={{
            transformOrigin: "top center",
            borderColor: "rgba(15,23,42,0.08)",
            boxShadow:
              "0 10px 24px -8px rgba(15,23,42,0.16), 0 40px 80px -20px rgba(13,148,136,0.12)",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div>
            <span
              className="inline-block rounded-md px-2 py-0.5 text-[11px] font-extrabold tracking-wider"
              style={{
                color: card.labelColor,
                background: card.labelBg,
              }}
            >
              {card.label}
            </span>
            <h4 className="mt-3 text-base font-bold leading-snug text-ink sm:text-lg">
              {card.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-fg">
              {card.body}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: TEAL }}
            />
            <span className="text-xs font-semibold text-muted-fg">
              הדרך של וונדי
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
