"use client";

import { motion } from "framer-motion";
import { modules, type Feature, type Module } from "@/content/modulim";

const expo = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0D9488";

export function ModulesBento() {
  return (
    <section
      id="modules"
      dir="rtl"
      aria-label="המודולים והפיצ׳רים שלנו"
      className="relative isolate"
    >
      {modules.map((m, i) => (
        <ModuleBlock
          key={m.id}
          module={m}
          index={i}
          alternate={i % 2 === 1}
        />
      ))}
    </section>
  );
}

/* ─── One module block (Monday.com pattern: headline → 3 hero cards → compact list) ─ */
function ModuleBlock({
  module: m,
  index,
  alternate,
}: {
  module: Module;
  index: number;
  alternate: boolean;
}) {
  const [heroFeatures, restFeatures] = [
    m.features.slice(0, 3),
    m.features.slice(3),
  ];

  return (
    <div
      id={m.id}
      className={`relative scroll-mt-20 ${alternate ? "bg-slate-50/60" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: expo }}
          className="mx-auto mb-14 max-w-[860px] md:mb-20"
        >
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] text-slate-400">
            <span className="tabular-nums">
              <span className="text-slate-900">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-slate-300">/</span>
              <span>04</span>
            </span>
            <span className="h-px w-12 bg-slate-300" />
            <span style={{ color: TEAL }}>מודול</span>
            <span
              className="ms-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] tabular-nums shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
              style={{ color: TEAL }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: TEAL }}
              />
              {m.features.length} פיצ׳רים
            </span>
          </div>

          {/* Massive title */}
          <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] font-black leading-[1.05] tracking-[-0.045em] text-slate-900">
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

        {/* ── 3 Hero feature cards ── */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-3 md:gap-6">
          {heroFeatures.map((f, i) => (
            <HeroFeatureCard key={`hero-${i}`} feature={f} index={i} />
          ))}
        </div>

        {/* ── Compact remaining features list ── */}
        {restFeatures.length > 0 && (
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-slate-400 md:mb-6">
              <span className="h-px flex-1 bg-slate-200" />
              <span>עוד {restFeatures.length} פיצ׳רים</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {restFeatures.map((f, i) => (
                <CompactRow
                  key={`rest-${i}`}
                  feature={f}
                  index={i + 3}
                />
              ))}
            </div>
          </div>
        )}

        {/* Optional note */}
        {m.note && (
          <div
            className="mx-auto mt-12 flex max-w-[820px] items-center justify-center gap-2.5 rounded-2xl border px-6 py-4 text-center text-[0.95rem] font-medium leading-[1.6] md:mt-16"
            style={{
              borderColor: "rgba(13,148,136,0.22)",
              background: "rgba(13,148,136,0.06)",
              color: TEAL,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span>{m.note}</span>
          </div>
        )}
      </div>
    </div>
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
      transition={{ duration: 0.55, ease: expo, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.10)] md:p-10"
    >
      {/* Icon chip */}
      <div
        className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-[1.06] [&_svg]:h-[22px] [&_svg]:w-[22px]"
        style={{
          background: "rgba(13,148,136,0.10)",
          color: TEAL,
        }}
      >
        {feature.icon}
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-balance text-[1.32rem] font-bold leading-tight tracking-tight text-slate-900 md:text-[1.45rem]">
          {feature.title}
        </h3>
        <p className="text-[0.96rem] leading-[1.6] text-slate-600">
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
        duration: 0.45,
        ease: expo,
        delay: (index - 3) * 0.04,
      }}
      className="group flex items-start gap-4 rounded-xl bg-white px-5 py-4 transition-colors duration-200 hover:bg-[rgba(13,148,136,0.04)]"
    >
      <span
        className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg [&_svg]:h-[15px] [&_svg]:w-[15px]"
        style={{
          background: "rgba(13,148,136,0.10)",
          color: TEAL,
        }}
      >
        {feature.icon}
      </span>
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
