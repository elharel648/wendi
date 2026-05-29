"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/content/about";
import { AboutTabs } from "./AboutTabs";

type Props = { content: AboutContent["hero"] };

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Light Hero — fully centered stack:
 *   Mascot (top) → Title → Sub → Stats bar → Tabs
 * Everything centered horizontally as a single column group.
 */
export function AboutHero({ content }: Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-white">

      {/* Soft teal blob — top-right drift */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -end-[100px] -top-[200px] z-0 h-[800px] w-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(62,207,190,0.10) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -15, 0],
          scale: [1, 1.05, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-left ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[150px] -left-[120px] z-0 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74,144,196,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Main content — single centered column. Outer wrapper is the full-width
           flex centerer; inner block holds the actual content at max 1100px. */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 pt-20 pb-10 sm:px-6 md:px-16 md:pt-28 md:pb-12">
        <div className="flex w-full max-w-[1100px] flex-col items-center gap-6 text-center md:gap-10">
        {/* Mascot (top) */}
        <Mascot />

        {/* Title — centered */}
        <h1
          className="font-black"
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)",
            lineHeight: 1.04,
            letterSpacing: "-2.5px",
            color: "#0F172A",
          }}
        >
          {content.titleLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                ease: expo,
                delay: 0.2 + i * 0.18,
              }}
              className="block"
              style={line.accent ? { color: "#0D9488" } : undefined}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        {/* Sub — centered, max-width for readability */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: expo, delay: 0.55 }}
          className="mx-auto"
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.85,
            color: "#475569",
            maxWidth: "640px",
          }}
        >
          {content.sub}
        </motion.p>

        {/* Stats bar — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: expo, delay: 0.7 }}
          className="mx-auto flex w-full flex-wrap items-center px-4 py-4 md:px-7 md:py-5"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(15,23,42,0.08)",
            borderRadius: "18px",
            maxWidth: "640px",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow:
              "0 20px 50px -20px rgba(15,23,42,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {content.stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-1 items-center">
              <div className="min-w-[80px] flex-1 text-center">
                <div
                  className="tabular-nums"
                  style={{
                    fontSize: "1.85rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#0A0A0A",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    marginTop: "4px",
                    color: "#64748B",
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < content.stats.length - 1 && (
                <div
                  aria-hidden
                  className="shrink-0"
                  style={{
                    width: "1px",
                    height: "36px",
                    background:
                      "linear-gradient(to bottom, transparent, rgba(15,23,42,0.12), transparent)",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Tabs — centered */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: expo, delay: 0.85 }}
          className="flex justify-center"
        >
          <AboutTabs />
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function Mascot() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative flex h-[280px] w-[280px] items-end justify-center md:h-[340px] md:w-[340px]"
    >
      {/* Single soft pulsing ring — kept subtle */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 bottom-2 h-[260px] w-[260px] rounded-full md:h-[320px] md:w-[320px]"
        style={{
          border: "1px solid rgba(13,148,136,0.18)",
          x: "-50%",
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Soft floor glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[100px] w-[200px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(62,207,190,0.18) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Mascot image — floats */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/wendi-char1.png"
        alt="Wendi"
        className="relative z-10 object-contain will-change-transform"
        style={{ height: "min(60vw, 360px)", width: "auto" }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </motion.div>
  );
}
