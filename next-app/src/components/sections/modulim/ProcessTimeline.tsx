"use client";

import { motion } from "framer-motion";

const expo = [0.22, 1, 0.36, 1] as const;

/* Vibrant "traffic-light" inspired palette — green→cyan→amber→red */
const C_GREEN = "#22C55E";
const C_CYAN = "#0EA5E9";
const C_AMBER = "#F59E0B";
const C_RED = "#EF4444";

type Station = {
  num: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
};

const STATIONS: Station[] = [
  {
    num: "1",
    label: "DISCOVERY",
    title: "הבנת הצורך העסקי",
    desc: "מתחילים בשיחה עמוקה: מה המידע שצריך לזרום, מי המשתמשים, ומה המטרה העסקית.",
    tags: ["גילוי צרכים", "מיפוי תהליכים", "הגדרת יעדים"],
    color: C_GREEN,
  },
  {
    num: "2",
    label: "DESIGN",
    title: "אפיון טכנולוגי משותף",
    desc: "הארכיטקטורה הנכונה: API, Webhook, Batch או Real-time. מבנה נתונים, הרשאות ואבטחה.",
    tags: ["API", "אבטחה", "הרשאות"],
    color: C_CYAN,
  },
  {
    num: "3",
    label: "BUILD",
    title: "פיתוח ובדיקות",
    desc: "פיתוח ב-Staging בשיתוף מלא איתכם. בדיקות קצה לקצה, UAT ובדיקות עומס לפני עלייה.",
    tags: ["Staging", "UAT", "QA"],
    color: C_AMBER,
  },
  {
    num: "4",
    label: "LAUNCH & CARE",
    title: "עלייה לאוויר וליווי שוטף",
    desc: "אחרי העלייה — ניטור 24/7, תחזוקה, התאמות לשינויים בארגון ושדרוגים עתידיים.",
    tags: ["ניטור 24/7", "SLA", "שדרוגים"],
    color: C_RED,
  },
];

export function ProcessTimeline() {
  return (
    <section
      id="process"
      dir="rtl"
      aria-label="תהליך העבודה"
      className="relative overflow-hidden bg-paper py-[100px]"
    >
      <div className="mx-auto max-w-[1080px] px-[30px]">
        {/* Section head */}
        <div className="mx-auto mb-14 max-w-[760px] text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: expo }}
            className="mb-[18px] inline-flex items-center gap-2 rounded-full border px-[14px] py-1.5 text-[0.78rem] font-bold tracking-[0.02em]"
            style={{
              background: `${C_GREEN}14`,
              borderColor: `${C_GREEN}38`,
              color: C_GREEN,
            }}
          >
            <motion.span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: C_GREEN }}
              animate={{
                boxShadow: [
                  `0 0 0 4px ${C_GREEN}30`,
                  `0 0 0 7px ${C_GREEN}10`,
                  `0 0 0 4px ${C_GREEN}30`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            תהליך העבודה
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: expo, delay: 0.08 }}
            className="mb-3.5 text-[clamp(1.9rem,3.6vw,3rem)] font-black leading-[1.15] tracking-[-0.025em] text-slate-900"
          >
            כך נראה{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${C_GREEN}, ${C_CYAN} 40%, ${C_AMBER} 70%, ${C_RED})`,
              }}
            >
              חיבור לוונדי
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: expo, delay: 0.16 }}
            className="text-[1.06rem] leading-[1.7] text-slate-600"
          >
            ארבע תחנות מסודרות — מהאפיון ועד לתחזוקה שוטפת. ככה זה אצלנו: בלי הפתעות.
          </motion.p>
        </div>

        {/* Metro line */}
        <div className="relative mt-[60px]">
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6">
            {/* Base track (low opacity, full gradient) — hidden on small screens */}
            <span
              aria-hidden
              className="pointer-events-none absolute z-0 hidden h-[5px] rounded-full opacity-[0.35] lg:block"
              style={{
                top: "34px",
                left: "8%",
                right: "8%",
                background: `linear-gradient(90deg, ${C_GREEN} 0%, ${C_CYAN} 33%, ${C_AMBER} 66%, ${C_RED} 100%)`,
              }}
            />

            {/* Animated overlay track — draws from right (RTL start) to left */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute z-[1] hidden h-[5px] rounded-full lg:block"
              style={{
                top: "34px",
                right: "8%",
                background: `linear-gradient(270deg, ${C_GREEN}, ${C_CYAN}, ${C_AMBER}, ${C_RED})`,
                boxShadow: `0 0 16px rgba(245,158,11,0.25)`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: "84%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: expo, delay: 0.25 }}
            />

            {/* Shimmer that travels along the track — continuous */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute z-[2] hidden h-[5px] w-[60px] rounded-full lg:block"
              style={{
                top: "34px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                mixBlendMode: "overlay",
              }}
              initial={{ right: "8%" }}
              animate={{ right: ["8%", "92%"] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "linear",
                delay: 1.8,
                repeatDelay: 2.2,
              }}
            />

            {/* Stations */}
            {STATIONS.map((s, i) => (
              <StationCard key={s.num} station={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StationCard({ station, index }: { station: Station; index: number }) {
  const { color } = station;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: expo,
        delay: 0.35 + index * 0.14,
      }}
      className="group relative z-[2] pt-[100px] text-center"
    >
      {/* Pulsing ring layer 1 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[2px] h-[68px] w-[68px] rounded-full border-2"
        style={{ borderColor: color, x: "-50%" }}
        initial={{ opacity: 0.55, scale: 0.9 }}
        animate={{ opacity: [0.55, 0], scale: [0.9, 1.8] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.4 + index * 0.14,
        }}
      />

      {/* Pulsing ring layer 2 — offset for layered effect */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[2px] h-[68px] w-[68px] rounded-full border-2"
        style={{ borderColor: color, x: "-50%" }}
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: [0.4, 0], scale: [0.9, 1.5] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1.6 + index * 0.14,
        }}
      />

      {/* Dot — SOLID colored fill with white number */}
      <motion.div
        className="absolute left-1/2 top-0 grid h-[72px] w-[72px] -translate-x-1/2 place-items-center rounded-full text-[1.5rem] font-black text-white"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${shade(color, -15)} 100%)`,
          boxShadow: `0 10px 28px -6px ${color}aa, inset 0 0 0 3px rgba(255,255,255,0.85)`,
        }}
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          type: "spring",
          damping: 14,
          stiffness: 240,
          delay: 0.55 + index * 0.14,
        }}
        whileHover={{
          scale: 1.12,
          rotate: 6,
          transition: { type: "spring", damping: 18, stiffness: 380 },
        }}
      >
        {station.num}

        {/* Continuous gentle glow pulse on the dot itself */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `0 0 0 0 ${color}55`,
              `0 0 0 8px ${color}00`,
              `0 0 0 0 ${color}00`,
            ],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1 + index * 0.3,
          }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        className="relative rounded-2xl border bg-white px-5 py-[22px]"
        style={{
          borderColor: "rgba(15, 23, 42, 0.08)",
          boxShadow: `0 8px 28px -10px ${color}30, 0 4px 12px rgba(15,23,42,0.05)`,
        }}
        whileHover={{
          y: -6,
          boxShadow: `0 18px 44px -12px ${color}66, 0 6px 16px rgba(15,23,42,0.08)`,
          borderColor: `${color}55`,
          transition: { duration: 0.3, ease: expo },
        }}
      >
        <span
          className="mb-1.5 inline-block text-[0.7rem] font-extrabold uppercase tracking-[0.10em]"
          style={{ color }}
        >
          {station.label}
        </span>
        <h3 className="mb-2 text-[1.08rem] font-extrabold leading-tight text-slate-900">
          {station.title}
        </h3>
        <p className="mb-3 text-[0.86rem] leading-[1.6] text-slate-600">
          {station.desc}
        </p>
        <div className="flex flex-wrap justify-center gap-[5px]">
          {station.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border px-[9px] py-1 text-[0.7rem] font-semibold"
              style={{
                background: `${color}14`,
                color,
                borderColor: `${color}3d`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Darken a hex color by a percentage — used for the dot gradient */
function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
