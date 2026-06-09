"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { AboutContent } from "@/content/about";

type Props = { content: AboutContent["story"] };

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Light Story section — quote + intro on top, ZINE flip card timeline below.
 */
export function AboutStory({ content }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-white pt-8 pb-12 md:pt-10 md:pb-20"
    >
      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 md:px-16">
        <div className="w-full max-w-[1440px]">
        {/* Editorial intro — two columns */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          {/* RIGHT (inline-start): big quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: expo }}
          >
            <div
              aria-hidden
              className="mb-6 h-[2px] w-12 rounded-sm"
              style={{
                background:
                  "linear-gradient(to left, #0D9488, transparent)",
              }}
            />
            <div
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                color: "#0F172A",
              }}
            >
              {content.quote.plain}
              <br />
              <span style={{ color: "#0D9488" }}>{content.quote.accent}</span>
            </div>

          </motion.div>

          {/* LEFT: intro paragraphs — nudged down so its first line aligns with
               the quote's first line (the quote sits below a 2px rule + 24px gap). */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: expo, delay: 0.15 }}
            className="md:pt-[26px]"
          >
            {content.intro.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  color: "#475569",
                  marginBottom: i === content.intro.length - 1 ? 0 : "20px",
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>

        {/* ZINE timeline */}
        <div className="mt-16 md:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expo }}
            className="mb-10 flex items-end justify-between gap-4 flex-wrap md:mb-14 md:gap-6"
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-1.5px",
                  color: "#0F172A",
                }}
              >
                עשור של בנייה.
                <br />
                <span style={{ color: "#0D9488" }}>הצצה מאחורי הקלעים.</span>
              </h2>
            </div>
            <div
              className="text-xs"
              style={{
                color: "#64748B",
                letterSpacing: "0.08em",
              }}
            >
              לחצו על כרטיס כדי להפוך אותו →
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.timeline.map((item, i) => (
              <ZineCard key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

// Cinematic editorial images per timeline card — dramatic, high-contrast
const TIMELINE_IMAGES = [
  // 2013 — founding: moody architectural / empty office at dawn
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&auto=format&fit=crop",
  // 2016 — team growth: dramatic team silhouette / late-night work
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85&auto=format&fit=crop",
  // 2019 — native mobile: cinematic phone shot, dark moody
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=85&auto=format&fit=crop",
  // 2023 — AI: dramatic neural / abstract tech with deep contrast
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85&auto=format&fit=crop",
];

function ZineCard({
  item,
  index,
}: {
  item: AboutContent["story"]["timeline"][number];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  // Slight ZINE-style rotation per card
  const baseRotations = [-2.2, 1.4, -1.1, 2.0];
  const baseRot = baseRotations[index % 4];
  const imgSrc = TIMELINE_IMAGES[index % TIMELINE_IMAGES.length];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: expo, delay: 0.05 + index * 0.1 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="group relative aspect-[3/4] w-full text-right [perspective:1200px]"
      style={{ transform: `rotate(${baseRot}deg)` }}
      aria-label={`${item.year} — ${item.title}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: expo }}
      >
        {/* FRONT — full-bleed cinematic image with overlay */}
        <div
          className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
          style={{
            border: "1px solid rgba(15,23,42,0.12)",
            borderRadius: "18px",
            boxShadow:
              "0 30px 60px -20px rgba(15,23,42,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Full-bleed image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />

          {/* Cinematic gradient — dark bottom for text legibility */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)",
            }}
          />

          {/* Big year — outlined, top-right */}
          <div
            className="absolute right-5 top-4"
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.9)",
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          >
            {item.year}
          </div>

          {/* Teal accent line — separator above text */}
          <div
            aria-hidden
            className="absolute bottom-[88px] left-6 right-6 h-[2px]"
            style={{
              background:
                "linear-gradient(to right, transparent, #3ECFBE, transparent)",
              opacity: 0.85,
            }}
          />

          {/* Bottom text block — title + chapter */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#fff",
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              {item.title}
            </div>

            <div
              className="mt-2 inline-flex items-center gap-2 text-xs"
              style={{ color: "#3ECFBE" }}
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: "#3ECFBE" }}
              />
              <span style={{ letterSpacing: "0.06em", fontWeight: 600 }}>
                פרק {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* BACK — description (teal-tinted card) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]"
          style={{
            background:
              "linear-gradient(160deg, rgba(13,148,136,0.08) 0%, rgba(62,207,190,0.02) 100%)",
            border: "1px solid rgba(13,148,136,0.32)",
            borderRadius: "18px",
            boxShadow:
              "0 30px 60px -20px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div
            className="text-xs font-bold"
            style={{
              color: "#0D9488",
              letterSpacing: "0.12em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {item.year}
          </div>

          <div
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "#0F172A",
            }}
          >
            {item.desc}
          </div>

          <div className="text-xs" style={{ color: "#64748B" }}>
            {item.title}
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}
