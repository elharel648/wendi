"use client";

import { motion } from "framer-motion";
import { mergeSectorsText, type Sector, type SectorText } from "@/content/pitronot";

const expo = [0.22, 1, 0.36, 1] as const;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v = parseInt(h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255] as const;
}
function rgba(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function PitronotSectors({ cmsText }: { cmsText?: SectorText[] }) {
  const sectors = mergeSectorsText(cmsText);
  return (
    <section
      dir="rtl"
      aria-label="פתרונות לפי מגזר"
      className="relative isolate bg-paper"
    >
      {sectors.map((s, i) => (
        <SectorBlock key={s.id} sector={s} alternate={i % 2 === 1} />
      ))}
    </section>
  );
}

function SectorBlock({
  sector: s,
  alternate,
}: {
  sector: Sector;
  alternate: boolean;
}) {
  return (
    <div
      id={s.id}
      className="relative scroll-mt-24 overflow-hidden border-t border-line px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{
        background: alternate
          ? "linear-gradient(180deg, #FAFCFE 0%, #F5F9FC 100%)"
          : "#ffffff",
      }}
    >
      {/* Color wash — soft tinted halo per sector, breathes life into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 blur-3xl"
        style={{
          top: "-12rem",
          insetInlineStart: alternate ? "auto" : "-8rem",
          insetInlineEnd: alternate ? "-8rem" : "auto",
          width: "44rem",
          height: "32rem",
          background: `radial-gradient(circle, ${rgba(s.color, 0.16)} 0%, ${rgba(s.color, 0.04)} 45%, transparent 70%)`,
        }}
      />

      {/* Ghost number — large outlined numeral, decorative */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-black leading-none text-transparent"
        style={{
          fontSize: "clamp(5rem, 16vw, 16rem)",
          top: "-1.5rem",
          insetInlineStart: alternate ? "auto" : "-1.5rem",
          insetInlineEnd: alternate ? "-1.5rem" : "auto",
          WebkitTextStroke: `1.5px ${rgba(s.color, 0.14)}`,
          letterSpacing: "-0.05em",
        }}
      >
        {s.num}
      </span>

      <div
        className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* LEFT — copy + features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: expo }}
          className={alternate ? "lg:order-2" : ""}
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-white"
              style={{
                background: s.color,
                boxShadow: `0 4px 12px -4px ${rgba(s.color, 0.50)}`,
              }}
            >
              <span className="block h-4 w-4">{s.icon}</span>
            </span>
            <span
              className="rounded-full px-3 py-1 text-[0.78rem] font-bold text-white"
              style={{
                background: s.color,
                boxShadow: `0 4px 12px -4px ${rgba(s.color, 0.45)}`,
              }}
            >
              {s.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-black leading-[1.2] tracking-[-0.025em] text-ink">
            {s.title}
          </h2>

          {/* Description */}
          <p className="mt-4 text-base leading-[1.8] text-muted-fg">{s.desc}</p>

          {/* Feature list */}
          <ul className="mt-7 flex flex-col gap-3">
            {s.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-2"
              >
                <span
                  className="relative mt-[9px] block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: s.color }}
                  aria-hidden
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT — story card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: expo, delay: 0.15 }}
          className={alternate ? "lg:order-1" : ""}
        >
          <StoryCard s={s} />
        </motion.div>
      </div>

    </div>
  );
}

function StoryCard({ s }: { s: Sector }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border bg-white p-7 sm:p-8"
      style={{
        borderColor: rgba(s.color, 0.22),
        boxShadow: `0 1px 0 rgba(255,255,255,0.9) inset, 0 16px 48px -24px rgba(15,23,42,0.16), 0 0 0 1px ${rgba(s.color, 0.06)}`,
      }}
    >
      {/* Soft halo behind — tinted to sector color */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -top-16 -z-10 h-48 blur-3xl"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${rgba(s.color, 0.18)}, transparent 70%)`,
        }}
      />

      {/* Label */}
      <div className="mb-5 inline-flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
          style={{ color: s.color }}
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
        <span
          className="text-[0.72rem] font-bold uppercase tracking-[0.08em]"
          style={{ color: s.color }}
        >
          {s.story.label}
        </span>
      </div>

      {/* Quote */}
      <p className="text-[1.02rem] italic leading-[1.85] text-ink-2">
        “{s.story.quote}”
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <div
          className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-base font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${s.color} 0%, ${rgba(s.color, 0.7)} 100%)`,
            boxShadow: `0 4px 14px -4px ${rgba(s.color, 0.55)}`,
          }}
        >
          {s.story.avatar}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.92rem] font-bold text-ink">
            {s.story.name}
          </span>
          <span className="text-[0.78rem] text-muted-fg">{s.story.role}</span>
        </div>
      </div>
    </div>
  );
}
