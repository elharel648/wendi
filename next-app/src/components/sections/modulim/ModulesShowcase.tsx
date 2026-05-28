"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modules, type Feature, type Module } from "@/content/modulim";

const expo = [0.22, 1, 0.36, 1] as const;

const TEAL = "#0D9488";
const TEAL_BRIGHT = "#3ECFBE";
const NAVY = "#0B1437";
const NAVY_2 = "#1E3A8A";
const ACTIVE_GRADIENT = `linear-gradient(135deg, ${TEAL} 0%, ${NAVY} 100%)`;
const TITLE_GRADIENT = `linear-gradient(95deg, ${NAVY} 0%, ${TEAL} 50%, ${NAVY_2} 100%)`;

export function ModulesShowcase() {
  const [activeId, setActiveId] = useState<Module["id"]>("portal");
  const active = modules.find((m) => m.id === activeId)!;

  return (
    <section
      dir="rtl"
      aria-label="מודולים ופיצ׳רים"
      className="relative isolate overflow-hidden bg-paper"
    >
      <Ambient />
      <DotGrid />

      {/* HERO */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-36 pb-10 md:px-12 md:pt-48 md:pb-14">
        <Intro />
        <ModuleTabs activeId={activeId} onChange={setActiveId} />
      </div>

      {/* STAGE */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pb-24 md:px-12 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: expo }}
          >
            <ModuleHeader module={active} />
            <FeatureGrid features={active.features} module={active} />
          </motion.div>
        </AnimatePresence>

        <IntegrationsBridge />
      </div>
    </section>
  );
}

/* ─── Ambient washes ─────────────────────────────────────────────────── */
function Ambient() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-160px] h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[420px] left-[-180px] h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(11,20,55,0.08) 0%, transparent 65%)",
        }}
      />
    </>
  );
}

function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.55]"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(15,23,42,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        maskImage:
          "radial-gradient(ellipse at 50% 30%, #000 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 30%, #000 0%, transparent 70%)",
      }}
    />
  );
}

/* ─── Intro ──────────────────────────────────────────────────────────── */
function Intro() {
  return (
    <div className="mb-12 max-w-[820px] md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: expo }}
        className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line-strong/25 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-muted-fg backdrop-blur"
      >
        <span className="relative grid h-2 w-2 place-items-center">
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-brand/60" />
          <span
            className="relative h-1.5 w-1.5 rounded-full"
            style={{ background: TEAL }}
          />
        </span>
        <span>המודולים</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: expo, delay: 0.05 }}
        className="mb-7 text-[clamp(2.6rem,5.6vw,5rem)] font-black leading-[1.02] tracking-[-0.045em] text-ink"
      >
        <span className="block">כל כלי במקום הנכון</span>
        <span
          className="block bg-clip-text text-transparent"
          style={{ backgroundImage: TITLE_GRADIENT }}
        >
          במערכת אחת.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: expo, delay: 0.12 }}
        className="max-w-[640px] text-[1.1rem] leading-[1.78] text-muted-fg"
      >
        וונדי מציעה{" "}
        <strong className="font-bold text-ink-2">4 מודולים מרכזיים</strong>{" "}
        שעובדים יחד כמערכת אחת. כל מודול חי בנפרד – ומדבר עם השאר. בחרו מודול
        כדי לגלות את הפיצ׳רים המלאים.
      </motion.p>
    </div>
  );
}

/* ─── Tab bar — Monday/21DEV-style sliding pill ──────────────────────── */
function ModuleTabs({
  activeId,
  onChange,
}: {
  activeId: Module["id"];
  onChange: (id: Module["id"]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: expo, delay: 0.18 }}
      className="relative grid grid-cols-2 gap-1.5 rounded-3xl border border-line bg-white/75 p-1.5 shadow-[0_18px_50px_-24px_rgba(11,20,55,0.22)] backdrop-blur-md md:flex md:rounded-full"
    >
      {modules.map((m) => {
        const isActive = m.id === activeId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className="relative isolate cursor-pointer rounded-full px-5 py-3 text-[0.92rem] font-semibold transition-colors duration-300 md:flex-1 md:min-w-[150px] md:text-[1rem]"
            style={{ color: isActive ? "#fff" : "#475569" }}
          >
            {isActive && (
              <motion.span
                layoutId="mod-tab-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: ACTIVE_GRADIENT,
                  boxShadow:
                    "0 14px 30px -10px rgba(13,148,136,0.55), 0 2px 0 rgba(255,255,255,0.4) inset",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              />
            )}
            <span className="flex items-center justify-center gap-2.5">
              <span
                className="grid h-[22px] w-[22px] place-items-center [&_svg]:h-[20px] [&_svg]:w-[20px]"
                style={{ color: isActive ? "#fff" : TEAL }}
              >
                {m.icon}
              </span>
              <span>{m.shortLabel}</span>
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ─── Active module header ───────────────────────────────────────────── */
function ModuleHeader({ module: m }: { module: Module }) {
  return (
    <div className="mt-14 mb-10 md:mt-16 md:mb-14">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        {/* Right (RTL): big title + tag */}
        <div className="max-w-[760px]">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em]"
            style={{
              color: TEAL,
              background: "rgba(13,148,136,0.10)",
              border: "1px solid rgba(13,148,136,0.22)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: TEAL }}
            />
            מודול פעיל
          </div>

          <h2 className="text-[clamp(1.9rem,3.6vw,3.2rem)] font-black leading-[1.05] tracking-[-0.035em] text-ink">
            {m.title}
          </h2>
          <p className="mt-3 text-[1.05rem] leading-[1.65] text-muted-fg md:text-[1.15rem]">
            {m.subtitle}
          </p>
        </div>

        {/* Left (RTL end): the BIG number */}
        <div
          className="relative flex items-end gap-3 self-start md:self-end"
          aria-label={`${m.features.length} פיצ׳רים במודול`}
        >
          <div
            className="font-black tabular-nums leading-none"
            style={{
              fontSize: "clamp(4.5rem, 9vw, 8rem)",
              backgroundImage: ACTIVE_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.06em",
            }}
          >
            {m.features.length}
          </div>
          <div className="mb-3 flex flex-col items-start">
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-muted-fg">
              פיצ׳רים
            </span>
            <span
              className="mt-1 inline-block h-[3px] w-12 rounded-full"
              style={{ background: ACTIVE_GRADIENT }}
            />
          </div>
        </div>
      </div>

      {m.blurb && (
        <p
          className="mt-7 max-w-[860px] rounded-2xl border-r-[3px] bg-white/70 px-5 py-4 text-[1rem] leading-[1.8] text-ink-2 backdrop-blur"
          style={{ borderRightColor: TEAL }}
        >
          {m.blurb}
        </p>
      )}
    </div>
  );
}

/* ─── Feature grid (bento) ───────────────────────────────────────────── */
function FeatureGrid({
  features,
  module: m,
}: {
  features: Feature[];
  module: Module;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {features.map((f, i) => (
        <FeatureCard key={`${m.id}-${i}`} feature={f} index={i} />
      ))}
    </div>
  );
}

/* ─── Individual feature card ────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: expo,
        delay: 0.04 + (index % 8) * 0.05,
      }}
      whileHover={{ y: -6 }}
      className="group relative isolate overflow-hidden rounded-2xl border border-line bg-white/85 p-6 backdrop-blur transition-shadow duration-300 hover:shadow-[0_24px_60px_-22px_rgba(11,20,55,0.22)]"
    >
      {/* gradient border on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: "1.5px",
          background: ACTIVE_GRADIENT,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      />
      {/* corner glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* icon chip */}
        <div
          className="mb-5 grid h-12 w-12 place-items-center rounded-xl transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-[-4deg] [&_svg]:h-[22px] [&_svg]:w-[22px]"
          style={{
            background: "linear-gradient(135deg, rgba(13,148,136,0.10) 0%, rgba(11,20,55,0.06) 100%)",
            color: TEAL,
            border: "1px solid rgba(13,148,136,0.22)",
          }}
        >
          {feature.icon}
        </div>

        <h3 className="mb-2 text-[1.08rem] font-bold leading-[1.3] tracking-[-0.012em] text-ink">
          {feature.title}
        </h3>
        <p className="text-[0.92rem] leading-[1.65] text-muted-fg">
          {feature.desc}
        </p>
      </div>
    </motion.article>
  );
}

/* ─── Integrations bridge — transition into the next section ─────────── */
function IntegrationsBridge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: expo }}
      className="mt-24 flex flex-col items-center text-center md:mt-32"
    >
      <span className="mb-5 h-px w-24 bg-line-strong/30" />
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-strong/25 bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-muted-fg backdrop-blur">
        <span className="relative grid h-2 w-2 place-items-center">
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-brand/60" />
          <span
            className="relative h-1.5 w-1.5 rounded-full"
            style={{ background: TEAL }}
          />
        </span>
        <span>ממשקים · INTEGRATIONS</span>
      </div>
      <h3
        className="max-w-[760px] text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-[1.1] tracking-[-0.03em]"
        style={{
          backgroundImage: TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        וונדי מתחברת לארגון שלכם
      </h3>
    </motion.div>
  );
}
