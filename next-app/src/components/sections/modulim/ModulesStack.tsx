"use client";

import { onColor, type Feature, type Module } from "@/content/modulim";
import { StackingCards, type StackingCardItem } from "@/components/ui/stacking-card";
import { LottieIcon } from "@/components/ui/lottie-icon";

/**
 * The four modules rendered as scroll-stacking cards — replaces the old
 * single-module switcher view. Each module is a full card (header + every
 * feature) in its own approved pastel colour; scrolling stacks the next module
 * over the previous one. The QuickJump tabs scroll to each card's anchor id.
 *
 * Light "paper" background, RTL, no dark mode, no stock images — the card
 * content matches the previous Bento card exactly.
 */
export function ModulesStack({ modules }: { modules: Module[] }) {
  const items: StackingCardItem[] = modules.map((m) => ({
    id: m.id,
    background: "#ffffff",
    borderColor: m.color,
    content: <ModuleCard module={m} />,
  }));

  return (
    <section
      id="modules"
      dir="rtl"
      aria-label="המודולים והפיצ׳רים שלנו"
      className="bg-paper"
    >
      <StackingCards items={items} dir="rtl" />
    </section>
  );
}

/* ─── One module rendered inside a stacking card (mirrors the old Bento card) ─── */
function ModuleCard({ module: m }: { module: Module }) {
  return (
    <div id={m.id} className="scroll-mt-24">
      <div className="px-5 py-8 sm:px-7 md:px-10 md:py-10">
        {/* ── Header ── */}
        <div className="mb-8 max-w-[860px]">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl shadow-sm [&_svg]:h-5 [&_svg]:w-5"
              style={{ background: m.color, color: onColor(m.color) }}
            >
              {m.icon}
            </span>
          </div>

          <h2 className="text-balance text-[clamp(1.5rem,4.5vw,2.8rem)] font-black leading-[1.05] tracking-[-0.04em] text-slate-900">
            {m.title}
          </h2>

          <p className="mt-4 max-w-[640px] text-[1rem] leading-[1.6] text-slate-600 md:text-[1.1rem]">
            {m.subtitle}
          </p>

          {m.blurb && (
            <p className="mt-3 max-w-[640px] text-[0.92rem] leading-[1.65] text-slate-500">
              {m.blurb}
            </p>
          )}
        </div>

        {/* ── Feature grid — uniform two columns ── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {m.features.map((f, i) => (
            <FeatureCard key={`feat-${i}`} feature={f} module={m} />
          ))}
        </div>

        {m.note && (
          <p className="mx-auto mt-8 max-w-[760px] text-center text-[0.9rem] font-medium leading-[1.6] text-slate-500">
            {m.note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Standard feature card (same as Bento) ─── */
function FeatureCard({ feature, module: m }: { feature: Feature; module: Module }) {
  return (
    <article
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-transparent bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = m.color)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      <FeatureIcon feature={feature} module={m} size={42} />
      <div className="flex flex-col gap-1">
        <h4 className="text-[0.95rem] font-bold leading-tight tracking-tight text-slate-900">
          {feature.title}
        </h4>
        <p className="text-[0.82rem] leading-[1.5] text-slate-600">{feature.desc}</p>
      </div>
    </article>
  );
}

/* ─── Shared icon: Lottie frozen on a static frame, SVG fallback (same as Bento) ─── */
function FeatureIcon({ feature, module: m, size }: { feature: Feature; module: Module; size: number }) {
  if (feature.iconLottie) {
    return (
      <span
        className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ background: m.colorSoft }}
      >
        <LottieIcon src={feature.iconLottie} size={size} staticFrame />
      </span>
    );
  }
  return (
    <span
      className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-slate-700 [&_svg]:h-[18px] [&_svg]:w-[18px] transition-transform duration-300 group-hover:scale-110"
      style={{ background: m.colorSoft }}
    >
      {feature.icon}
    </span>
  );
}
