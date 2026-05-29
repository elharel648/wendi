"use client";

import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Button } from "@/components/ui/Button";

const expoOut = [0.22, 1, 0.36, 1] as const;

type ChipColor = "blue" | "green" | "amber" | "purple" | "rose" | "cyan";

const DOT_COLOR: Record<ChipColor, string> = {
  blue: "#3B82F6",
  green: "#10B981",
  amber: "#F59E0B",
  purple: "#8B5CF6",
  rose: "#F43F5E",
  cyan: "#06B6D4",
};

const SYSTEMS_ROW_1: Array<[string, ChipColor]> = [
  ["SAP HR", "blue"],
  ["SAP SuccessFactors", "green"],
  ["Oracle HCM", "amber"],
  ["Priority People", "purple"],
  ["Agresso · Unit4", "rose"],
  ["Hilan", "cyan"],
  ["Sapak", "blue"],
  ["Comeet", "green"],
  ["Synerion", "amber"],
  ["Adi Absence", "purple"],
  ["Talentsoft", "rose"],
];

const SYSTEMS_ROW_2: Array<[string, ChipColor]> = [
  ["TimeSoft", "cyan"],
  ["SmartHR", "purple"],
  ["Moodle", "blue"],
  ["TalentLMS", "green"],
  ["Docebo", "amber"],
  ["Cornerstone", "rose"],
  ["SAP Litmos", "cyan"],
  ["Microsoft Teams", "blue"],
  ["SharePoint", "green"],
  ["ServiceNow", "purple"],
  ["Jira", "amber"],
  ["Monday.com", "rose"],
  ["Power BI", "blue"],
  ["Tableau", "cyan"],
];

const HERO_PILLS = [
  "מותאם לתהליכים קיימים",
  "חיבור למערכות ליבה",
  "ניסיון בארגונים מורכבים",
  "תחזוקה במקום אחד",
];

function SystemPill({ name, color }: { name: string; color: ChipColor }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white/85 px-5 py-2.5 text-[0.95rem] font-semibold text-ink-2 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.18)] backdrop-blur">
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: DOT_COLOR[color],
          boxShadow: `0 0 0 3px ${DOT_COLOR[color]}26`,
        }}
      />
      {name}
    </span>
  );
}

export function IntegrationsHero() {
  return (
    <section
      dir="rtl"
      aria-labelledby="integrations-heading"
      className="relative isolate overflow-hidden bg-paper py-20 sm:py-28 md:py-36"
    >
      {/* dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(15,23,42,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 0%, transparent 75%)",
        }}
      />

      {/* brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.14) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 text-center sm:px-6">
        {/* tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: expoOut }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong/30 bg-white/70 px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-muted-fg backdrop-blur"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-brand/60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          <span>ממשקים · INTEGRATIONS</span>
        </motion.div>

        {/* headline */}
        <motion.h2
          id="integrations-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: expoOut, delay: 0.05 }}
          className="mx-auto max-w-[920px] text-[clamp(1.9rem,7.5vw,5rem)] font-black leading-[1.05] tracking-[-0.04em] text-ink md:tracking-[-0.045em]"
        >
          <span className="block">
            וונדי{" "}
            <span className="relative inline-block">
              מתחברת
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-[10px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(13,148,136,0.35) 12%, rgba(13,148,136,0.35) 88%, transparent 100%)",
                  borderRadius: "999px",
                }}
              />
            </span>{" "}
            לארגון שלכם —
          </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0D9488 0%, #3ECFBE 55%, #0D9488 100%)",
            }}
          >
            באמת.
          </span>
        </motion.h2>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: expoOut, delay: 0.12 }}
          className="mx-auto mt-6 max-w-[640px] text-[1rem] leading-[1.7] text-muted-fg sm:mt-7 md:text-[1.08rem] md:leading-[1.78]"
        >
          בניגוד לפלטפורמות מדף, וונדי היא חברת מוצר שמבצעת ממשקים ייעודיים לפי
          צורך ארגוני, כדי לספק לעובדים{" "}
          <strong className="font-bold text-ink-2">One Stop Shop</strong> אמיתי.
        </motion.p>

        {/* mini pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: expoOut, delay: 0.18 }}
          className="mx-auto mt-8 flex max-w-[820px] flex-wrap justify-center gap-2.5"
        >
          {HERO_PILLS.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5 text-[0.88rem] font-semibold text-ink-2 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: expoOut, delay: 0.24 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Button variant="primary" href="#contact" withArrow>
            דברו איתנו על אינטגרציה
          </Button>
          <Button variant="secondary" href="#process">
            ראו את התהליך
          </Button>
        </motion.div>

        {/* divider strip + label */}
        <div className="mt-14 mb-6 flex items-center gap-3 sm:mt-20 sm:mb-7 sm:gap-4">
          <span className="h-px flex-1 bg-line" />
          <span className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-fg sm:text-[0.82rem] sm:tracking-[0.22em]">
            30+ מערכות שכבר התחברנו אליהן
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </div>

      {/* marquee rows — full-bleed */}
      <div className="relative">
        <InfiniteSlider gap={14} duration={45} className="py-2">
          {SYSTEMS_ROW_1.map(([name, color]) => (
            <SystemPill key={`r1-${name}`} name={name} color={color} />
          ))}
        </InfiniteSlider>

        <div className="h-4" />

        <InfiniteSlider gap={14} duration={55} reverse className="py-2">
          {SYSTEMS_ROW_2.map(([name, color]) => (
            <SystemPill key={`r2-${name}`} name={name} color={color} />
          ))}
        </InfiniteSlider>

        {/* fade overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-56"
          style={{
            background:
              "linear-gradient(90deg, var(--color-paper) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-56"
          style={{
            background:
              "linear-gradient(-90deg, var(--color-paper) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}