"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type Feature, type Module } from "@/content/modulim";
import { LottieIcon } from "@/components/ui/lottie-icon";

const expo = [0.22, 1, 0.36, 1] as const;

export function ModulesBento({ modules, activeId }: { modules: Module[]; activeId?: string }) {
  const active = activeId ? modules.find((m) => m.id === activeId) : undefined;
  const list = active ? [active] : modules;
  return (
    <section
      id="modules"
      dir="rtl"
      aria-label="המודולים והפיצ׳רים שלנו"
      className="relative isolate overflow-hidden bg-paper"
    >
      <AnimatePresence mode="wait" initial={false}>
        {list.map((m) => (
          <ModuleBlock key={m.id} module={m} />
        ))}
      </AnimatePresence>
    </section>
  );
}

/* ─── One module block — framed in the module's own color, with a magic-move transition ─── */
function ModuleBlock({ module: m }: { module: Module }) {
  return (
    <motion.div
      id={m.id}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: expo }}
      className="relative scroll-mt-24 px-4 py-10 sm:px-6 md:py-14 lg:px-8"
    >
      <div className="relative mx-auto max-w-[980px]">
        {/* Soft halo behind the frame — in the module's own color */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: expo }}
          className="pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 rounded-[32px] blur-2xl md:-inset-x-8 md:-inset-y-10"
          style={{
            background: `radial-gradient(60% 55% at 50% 40%, ${m.colorSoft} 0%, transparent 72%)`,
          }}
        />
        {/* The frame — thin colored border on a faint wash of the module color */}
        <div
          className="relative overflow-hidden rounded-[22px] md:rounded-[26px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 100%)",
            border: `1px solid ${m.color}`,
            boxShadow: `0 1px 0 rgba(255,255,255,0.9) inset, 0 24px 48px -30px ${m.color}`,
          }}
        >
          {/* Top accent bar in the module gradient */}
          <div aria-hidden className="h-1.5 w-full" style={{ background: m.gradient }} />

          <div className="mx-auto max-w-[900px] px-3 py-8 sm:px-4 sm:py-10 md:px-8 md:py-12">
            <ModuleBlockInner m={m} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Inner content: header → feature grid ─── */
function ModuleBlockInner({ m }: { m: Module }) {
  return (
    <>
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: expo, delay: 0.08 }}
        className="mb-10 max-w-[860px] md:mb-12"
      >
        <div className="mb-4 flex items-center gap-3">
          {/* Module icon chip in its own color */}
          <span
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-white shadow-sm [&_svg]:h-5 [&_svg]:w-5"
            style={{ background: m.gradient }}
          >
            {m.icon}
          </span>
          <span
            className="rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide"
            style={{ background: m.colorSoft, color: "#1e293b", border: `1px solid ${m.color}` }}
          >
            {m.shortLabel}
          </span>
        </div>

        <h2 className="text-balance text-[clamp(1.75rem,6vw,3.6rem)] font-black leading-[1.05] tracking-[-0.04em] text-slate-900 md:tracking-[-0.045em]">
          {m.title}
        </h2>

        <p className="mt-5 max-w-[640px] text-[1.08rem] leading-[1.65] text-slate-600 md:text-[1.18rem]">
          {m.subtitle}
        </p>

        {m.blurb && (
          <p className="mt-4 max-w-[640px] text-[0.95rem] leading-[1.7] text-slate-500">
            {m.blurb}
          </p>
        )}
      </motion.div>

      {/* ── Feature grid — uniform two columns ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } } }}
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        {m.features.map((f, i) => (
          <FeatureCard key={`feat-${i}`} feature={f} module={m} />
        ))}
      </motion.div>

      {m.note && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-10 max-w-[760px] text-center text-[0.92rem] font-medium leading-[1.65] text-slate-500 md:mt-12"
        >
          {m.note}
        </motion.p>
      )}
    </>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/* ─── Standard feature card ─── */
function FeatureCard({ feature, module: m }: { feature: Feature; module: Module }) {
  return (
    <motion.article
      variants={cardVariants}
      transition={{ duration: 0.55, ease: expo }}
      whileHover={{ y: -4 }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-transparent bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]"
      style={{ ["--mc" as string]: m.color }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = m.color)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      <FeatureIcon feature={feature} module={m} size={42} />
      <div className="flex flex-col gap-1.5">
        <h4 className="text-[1rem] font-bold leading-tight tracking-tight text-slate-900">
          {feature.title}
        </h4>
        <p className="text-[0.85rem] leading-[1.55] text-slate-600">{feature.desc}</p>
      </div>
    </motion.article>
  );
}

/* ─── Shared icon: same as before — Lottie frozen on a static frame, SVG fallback ─── */
function FeatureIcon({
  feature,
  module: m,
  size,
  big = false,
}: {
  feature: Feature;
  module: Module;
  size: number;
  big?: boolean;
}) {
  const box = big ? "h-14 w-14 md:h-16 md:w-16" : "h-11 w-11";
  const svg = big ? "[&_svg]:h-6 [&_svg]:w-6 md:[&_svg]:h-7 md:[&_svg]:w-7" : "[&_svg]:h-[18px] [&_svg]:w-[18px]";
  if (feature.iconLottie) {
    return (
      <span
        className={`grid flex-shrink-0 place-items-center rounded-xl ${box} transition-transform duration-300 group-hover:scale-110`}
        style={{ background: m.colorSoft }}
      >
        <LottieIcon src={feature.iconLottie} size={size} staticFrame />
      </span>
    );
  }
  // SVG fallback — matches the Lottie chips: soft tinted background, dark readable icon.
  return (
    <span
      className={`grid flex-shrink-0 place-items-center rounded-xl text-slate-700 ${box} ${svg} transition-transform duration-300 group-hover:scale-110`}
      style={{ background: m.colorSoft }}
    >
      {feature.icon}
    </span>
  );
}
