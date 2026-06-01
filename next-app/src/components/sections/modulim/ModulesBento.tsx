"use client";

import { motion } from "framer-motion";
import { type Feature, type Module } from "@/content/modulim";
import { LottieIcon } from "@/components/ui/lottie-icon";

const expo = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0D9488";

export function ModulesBento({ modules, activeId }: { modules: Module[]; activeId?: string }) {
  const visible = activeId
    ? modules.filter((m) => m.id === activeId)
    : modules;
  return (
    <section
      id="modules"
      dir="rtl"
      aria-label="המודולים והפיצ׳רים שלנו"
      className="relative isolate"
    >
      {visible.map((m) => {
        const i = modules.findIndex((x) => x.id === m.id);
        return (
          <ModuleBlock
            key={m.id}
            module={m}
            alternate={i % 2 === 1}
            framed
          />
        );
      })}
    </section>
  );
}

/* ─── One module block (Monday.com pattern: headline → 3 hero cards → compact list) ─ */
function ModuleBlock({
  module: m,
  alternate,
  framed = false,
}: {
  module: Module;
  alternate: boolean;
  framed?: boolean;
}) {
  if (framed) {
    return (
      <div
        id={m.id}
        className="relative scroll-mt-20 bg-paper px-4 py-10 sm:px-6 md:py-14 lg:px-8"
      >
        <div className="relative mx-auto max-w-[980px]">
          {/* Soft purple halo behind the frame — Monday-style */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 rounded-[32px] blur-2xl md:-inset-x-8 md:-inset-y-10"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 45%, rgba(167,139,250,0.20) 0%, rgba(167,139,250,0.09) 45%, rgba(167,139,250,0) 75%)",
            }}
          />
          {/* The frame itself — thin rounded border on a faint lavender wash */}
          <div
            className="relative overflow-hidden rounded-[22px] md:rounded-[26px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,243,255,0.85) 0%, rgba(250,249,255,0.7) 60%, rgba(255,255,255,0.6) 100%)",
              border: "1px solid rgba(167,139,250,0.28)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -28px rgba(76,29,149,0.16)",
            }}
          >
            <div className="mx-auto max-w-[900px] px-3 py-8 sm:px-4 sm:py-10 md:px-8 md:py-14">
              <ModuleBlockInner m={m} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={m.id}
      className={`relative scroll-mt-20 ${alternate ? "bg-slate-50/60" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
        <ModuleBlockInner m={m} />
      </div>
    </div>
  );
}

/* ─── Inner content of a module block (shared between framed and unframed) ─── */
function ModuleBlockInner({ m }: { m: Module }) {
  return (
    <>
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.0, ease: expo }}
        className="mx-auto mb-14 max-w-[860px] md:mb-20"
      >
        {/* Massive title */}
        <h2 className="text-balance text-[clamp(1.75rem,6vw,3.8rem)] font-black leading-[1.05] tracking-[-0.04em] text-slate-900 md:tracking-[-0.045em]">
          {m.title}
        </h2>

        {/* Subtitle */}
        <p className="mt-5 max-w-[640px] text-[1.08rem] leading-[1.65] text-slate-600 md:text-[1.18rem]">
          {m.subtitle}
        </p>

        {/* Optional blurb */}
        {m.blurb && (
          <p className="mt-4 max-w-[640px] text-[0.95rem] leading-[1.7] text-slate-500">
            {m.blurb}
          </p>
        )}
      </motion.div>

      {/* ── All features as a uniform compact list (2 columns on desktop) ── */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {m.features.map((f, i) => (
          <CompactRow key={`feat-${i}`} feature={f} index={i} />
        ))}
      </div>


      {/* Optional note — plain text, no pill */}
      {m.note && (
        <p className="mx-auto mt-10 max-w-[760px] text-center text-[0.92rem] font-medium leading-[1.65] text-slate-500 md:mt-12">
          {m.note}
        </p>
      )}
    </>
  );
}

/* ─── Monday-style hero feature card ─────────────────────────────────── */
function HeroFeatureCard({
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
      transition={{ duration: 0.85, ease: expo, delay: index * 0.12 }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col gap-3.5 rounded-2xl bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.09)] md:p-6"
    >
      {/* Icon */}
      {feature.iconLottie ? (
        <LottieIcon src={feature.iconLottie} size={42} targetDuration={14} />
      ) : (
        <div
          className="grid h-9 w-9 place-items-center rounded-lg transition-transform duration-300 group-hover:scale-[1.06] [&_svg]:h-[17px] [&_svg]:w-[17px]"
          style={{
            background: "rgba(13,148,136,0.10)",
            color: TEAL,
          }}
        >
          {feature.icon}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <h3 className="text-balance text-[1.05rem] font-bold leading-tight tracking-tight text-slate-900 md:text-[1.12rem]">
          {feature.title}
        </h3>
        <p className="text-[0.85rem] leading-[1.55] text-slate-600">
          {feature.desc}
        </p>
      </div>

      {/* Subtle "arrow" hint on hover */}
      <div className="mt-auto flex items-center gap-1.5 pt-2 text-[0.82rem] font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: TEAL }}>
        <span>למידע נוסף</span>
        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
      </div>
    </motion.article>
  );
}

/* ─── Compact row for "the rest" features ─────────────────────────── */
function CompactRow({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: expo,
        delay: (index - 3) * 0.06,
      }}
      className="group flex items-start gap-4 rounded-xl bg-white px-5 py-4 transition-colors duration-200 hover:bg-[rgba(13,148,136,0.04)]"
    >
      {feature.iconLottie ? (
        <LottieIcon src={feature.iconLottie} size={36} targetDuration={40} />
      ) : (
        <span
          className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg [&_svg]:h-[15px] [&_svg]:w-[15px]"
          style={{
            background: "rgba(13,148,136,0.10)",
            color: TEAL,
          }}
        >
          {feature.icon}
        </span>
      )}
      <div className="flex flex-col gap-1">
        <h4 className="text-[0.95rem] font-bold leading-tight tracking-tight text-slate-900">
          {feature.title}
        </h4>
        <p className="text-[0.84rem] leading-[1.55] text-slate-600">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}
