import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FeatureShowcase — premium "Monday.com" feature accordion + hero.
 * Reusable React + Tailwind + Framer Motion. RTL / Hebrew.
 *
 * ── Setup ───────────────────────────────────────────────────────────
 *   npm i framer-motion
 *   Tailwind must be active (arbitrary values are used, e.g. bg-[#181b26]).
 *   Put the screenshots in /public/apps/  →  served at /apps/Screenshot_X.png
 *   (or change IMG below to wherever you host them / import them).
 *
 * ── Image protection ────────────────────────────────────────────────
 *   The <img> tags are NEVER cropped, masked, filtered, rounded, or
 *   stretched. Every premium effect (glow, elevation, shadow) lives on
 *   sibling/wrapper elements — the bitmap itself is left pristine and is
 *   only scaled proportionally (aspect ratio preserved).
 */

const BRAND = "43, 173, 160"; // Wendi teal, used inside rgba()
const IMG = "/apps"; // base path for the screenshots — change to match your host

const FEATURES = [
  {
    id: "comm",
    title: "תקשורת פנים-ארגונית",
    desc: "פורטלי עובדים חכמים עם עדכוני חברה, צ'אט מובנה ודחיפות מותאמות אישית — הכל תחת מותג הארגון שלכם.",
    images: [`${IMG}/Screenshot_2.png`, `${IMG}/Screenshot_11.png`, `${IMG}/Screenshot_16.png`],
  },
  {
    id: "health",
    title: "בריאות ורפואה",
    desc: "אפליקציות לקופות חולים ומרפאות — תורים, הפניות, בדיקות ומידע רפואי בנגישות מלאה מהנייד.",
    images: [`${IMG}/Screenshot_3.png`, `${IMG}/Screenshot_4.png`, `${IMG}/Screenshot_5.png`],
  },
  {
    id: "wallet",
    title: "ארנק והטבות",
    desc: "ניהול תקציב עובד, הטבות ותגמולים, תוכניות נאמנות וארנק דיגיטלי — הכל בממשק אחד נקי.",
    images: [`${IMG}/Screenshot_6.png`, `${IMG}/Screenshot_7.png`, `${IMG}/Screenshot_9.png`],
  },
  {
    id: "learn",
    title: "למידה ופיתוח",
    desc: "פלטפורמות e-learning עם קורסי חובה, מבחני ציות ומסלולי הכשרה מותאמים לכל תפקיד בארגון.",
    images: [`${IMG}/Screenshot_10.png`, `${IMG}/Screenshot_13.png`, `${IMG}/Screenshot_15.png`],
  },
  {
    id: "tools",
    title: "כלים וניהול",
    desc: "כלי ניהול פנימי לממשקי Back-Office, לוחות בקרה, אדמין ועוד — מותאמים לתפעול יומיומי.",
    images: [`${IMG}/Screenshot_1.png`, `${IMG}/Screenshot_8.png`, `${IMG}/Screenshot_12.png`, `${IMG}/Screenshot_14.png`],
  },
];

const EASE = [0.25, 1, 0.5, 1];

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── LEFT COLUMN: pill → block accordion item ─────────────────────── */
function AccordionItem({ feature, isActive, isDimmed, onSelect }) {
  return (
    <motion.div
      onClick={() => onSelect(feature.id)}
      // Dimming overlay: non-active items recede (lower opacity + soft blur)
      animate={{ opacity: isDimmed ? 0.3 : 1, filter: isDimmed ? "blur(2px)" : "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={[
        "group cursor-pointer overflow-hidden border transition-all duration-500 ease-in-out",
        isActive
          ? "rounded-2xl border-white/10 bg-[#2A2E3E] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)]"
          : "rounded-full border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between gap-3 transition-all duration-500 ease-in-out",
          isActive ? "px-6 pb-3 pt-5" : "px-6 py-3.5",
        ].join(" ")}
      >
        <span
          className={[
            "text-[15px] font-bold leading-tight transition-colors duration-300",
            isActive ? "text-white" : "text-white/60 group-hover:text-white/85",
          ].join(" ")}
        >
          {feature.title}
        </span>
        <span
          className={[
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-in-out",
            isActive
              ? `rotate-45 border-[rgba(${BRAND},0.45)] bg-[rgba(${BRAND},0.15)] text-[#3ECFBE]`
              : "border-white/15 bg-white/5 text-white/60",
          ].join(" ")}
        >
          <PlusIcon />
        </span>
      </div>

      {/* description: graceful height + fade expand */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[13.5px] leading-[1.85] text-white/70">{feature.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── RIGHT COLUMN: hero stage + ambient glow + thumbnail strip ────── */
function Hero({ feature }) {
  const [imgIndex, setImgIndex] = useState(0);
  const current = feature.images[imgIndex] ?? feature.images[0];

  return (
    <div className="flex flex-col items-center">
      {/* Elevated stage — subtle box-shadow lifts it off the master block */}
      <div className="relative flex min-h-[460px] w-full items-center justify-center rounded-[28px] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
        {/* AMBIENT GLOW — radial brand color behind the image, heavily blurred */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-[58%] w-[58%] rounded-full opacity-60 blur-[80px]"
            style={{ background: `radial-gradient(circle, rgba(${BRAND}, 0.9), transparent 70%)` }}
          />
        </div>

        {/* UNTOUCHED IMAGE — wrapper carries the shadow so the bitmap stays pristine */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative z-10 shadow-[0_40px_70px_-20px_rgba(0,0,0,0.7)]"
          >
            <img src={current} alt={feature.title} className="block h-auto w-[230px] max-w-full" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip — browse the apps inside this category */}
      <div className="mt-6 flex items-center gap-3" dir="rtl">
        {feature.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setImgIndex(i)}
            aria-label={`תצוגה ${i + 1}`}
            className={[
              "overflow-hidden rounded-xl border bg-[#0c0c10] p-1 transition-all duration-300 ease-in-out",
              i === imgIndex
                ? `border-[rgba(${BRAND},0.6)] ring-2 ring-[rgba(${BRAND},0.25)]`
                : "border-white/10 opacity-60 hover:opacity-100",
            ].join(" ")}
          >
            <img src={src} alt="" className="h-16 w-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── SECTION ──────────────────────────────────────────────────────── */
export default function FeatureShowcase() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section dir="rtl" className="bg-[#08080A] px-6 py-24">
      {/* Heading — strict hierarchy: eyebrow / large bold white title */}
      <div className="mx-auto mb-12 max-w-[1240px] text-center">
        <span className="mb-3.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#2BADA0]">
          אפליקציות מובייל בהתאמה אישית
        </span>
        <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.4rem]">
          אפליקציה לכל צורך
        </h2>
      </div>

      {/* MASTER CONTAINER */}
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#181b26] p-8 shadow-[0_50px_130px_-50px_rgba(0,0,0,0.9)] md:p-12 lg:p-16">
        {/* top ambient glow bleeding from the block's edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-44"
          style={{ background: `radial-gradient(60% 100% at 50% 0%, rgba(${BRAND},0.13), transparent 72%)` }}
        />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
          {/* LEFT — accordion + primary CTA (first in DOM → renders on the right in RTL) */}
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <AccordionItem
                key={f.id}
                feature={f}
                isActive={f.id === activeId}
                isDimmed={f.id !== activeId}
                onSelect={setActiveId}
              />
            ))}

            <button
              type="button"
              className="group mt-2 flex items-center justify-between gap-3 rounded-full border border-[rgba(62,207,190,0.5)] bg-gradient-to-br from-[#2BADA0] to-[#23938a] px-6 py-4 shadow-[0_12px_30px_-10px_rgba(43,173,160,0.5)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_42px_-10px_rgba(43,173,160,0.65)]"
            >
              <span className="text-[15px] font-extrabold text-white">רוצים לראות דמו חי?</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:-translate-x-1">
                <ArrowIcon />
              </span>
            </button>
          </div>

          {/* RIGHT — hero. Keyed by category → graceful crossfade + resets thumbnail state */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Hero feature={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
