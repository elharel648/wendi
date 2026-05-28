"use client";

import { motion } from "framer-motion";

const TEAL = "#0D9488";

// Exact content from mamashkim.html `metro` section — do not change copy
const STATIONS = [
  {
    num: "01",
    label: "DISCOVERY",
    title: "הבנת הצורך העסקי",
    desc: "מתחילים בשיחה עמוקה: מה המידע שצריך לזרום, מי המשתמשים, ומה המטרה העסקית.",
    tags: ["גילוי צרכים", "מיפוי תהליכים", "הגדרת יעדים"],
    color: "#A16207", // yellow-700 (deeper, muted)
  },
  {
    num: "02",
    label: "DESIGN",
    title: "אפיון טכנולוגי משותף",
    desc: "הארכיטקטורה הנכונה: API, Webhook, Batch או Real-time. מבנה נתונים, הרשאות ואבטחה.",
    tags: ["API", "אבטחה", "הרשאות"],
    color: "#9A3412", // orange-800 (deeper, muted)
  },
  {
    num: "03",
    label: "BUILD",
    title: "פיתוח ובדיקות",
    desc: "פיתוח ב-Staging בשיתוף מלא איתכם. בדיקות קצה לקצה, UAT ובדיקות עומס לפני עלייה.",
    tags: ["Staging", "UAT", "QA"],
    color: "#9D174D", // pink-800 (deeper, muted)
  },
  {
    num: "04",
    label: "LAUNCH & CARE",
    title: "עלייה לאוויר וליווי שוטף",
    desc: "אחרי העלייה — ניטור 24/7, תחזוקה, התאמות לשינויים בארגון ושדרוגים עתידיים.",
    tags: ["ניטור 24/7", "SLA", "שדרוגים"],
    color: "#6B21A8", // purple-800 (deeper, muted)
  },
];

const expo = [0.16, 1, 0.3, 1] as const;

export function IntegrationsProcess() {
  return (
    <section
      id="process"
      dir="rtl"
      className="relative isolate overflow-hidden bg-paper py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section head — exact copy from mamashkim.html */}
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            כך נראה <span style={{ color: TEAL }}>חיבור לוונדי</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-fg sm:text-lg">
            ארבע תחנות מסודרות — מהאפיון ועד לתחזוקה שוטפת. ככה זה אצלנו: בלי
            הפתעות.
          </p>
        </div>

        {/* Timeline — horizontal on desktop, stacked on mobile */}
        <div className="relative">
          {/* Horizontal connector line — RTL: spans from right edge of first card to left edge of last */}
          <div
            aria-hidden
            className="absolute right-[12.5%] left-[12.5%] top-[44px] hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(to left, rgba(15,23,42,0.10) 0%, rgba(13,148,136,0.45) 50%, rgba(15,23,42,0.10) 100%)",
            }}
          />

          {/* Animated draw — colored connection from station 01 (right) to 04 (left) */}
          <motion.div
            aria-hidden
            className="absolute top-[44px] right-[12.5%] hidden h-px rounded-full lg:block"
            style={{
              background:
                "linear-gradient(to left, #A16207 0%, #9A3412 33%, #9D174D 66%, #6B21A8 100%)",
            }}
            initial={{ width: 0 }}
            whileInView={{ width: "75%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: expo, delay: 0.3 }}
          />

          {/* Traveling light along the connection — subtle, continuous */}
          <motion.div
            aria-hidden
            className="absolute top-[42px] hidden h-[5px] w-[5px] rounded-full lg:block"
            style={{
              background: "#fff",
              boxShadow:
                "0 0 8px 3px rgba(255,255,255,0.9), 0 0 14px 6px rgba(157,23,77,0.55)",
            }}
            initial={{ right: "12.5%", opacity: 0 }}
            animate={{ right: "87.5%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.6,
              delay: 2,
              times: [0, 0.1, 0.9, 1],
            }}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STATIONS.map((station, i) => (
              <Station key={station.num} station={station} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Station({
  station,
  index,
}: {
  station: (typeof STATIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: expo, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Number dot — sits ON the timeline line */}
      <div
        className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white"
        style={{
          border: "1px solid rgba(15,23,42,0.10)",
          boxShadow:
            "0 8px 20px -8px rgba(15,23,42,0.15), 0 1px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        <span
          className="flex h-[64px] w-[64px] items-center justify-center rounded-full text-lg font-black"
          style={{
            background: station.color,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          {station.num}
        </span>
      </div>

      {/* Card below */}
      <div
        className="mt-6 w-full rounded-2xl bg-white p-6 text-right"
        style={{
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow:
            "0 12px 30px -16px rgba(15,23,42,0.12), 0 2px 4px rgba(15,23,42,0.04)",
        }}
      >
        <div
          className="mb-2 text-[0.7rem] font-bold"
          style={{
            color: TEAL,
            letterSpacing: "0.14em",
          }}
        >
          {station.label}
        </div>
        <h3 className="mb-3 text-lg font-black leading-tight tracking-tight text-ink">
          {station.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-fg">{station.desc}</p>
      </div>
    </motion.div>
  );
}
