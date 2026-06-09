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
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-white">

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

      {/* Mascot — anchored to the inline-start (LEFT in RTL), vertically
           centered, so the text column stays centered and undisturbed.
           On mobile it falls back into the column flow above the title. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden items-center pl-6 md:flex md:pl-12 lg:pl-20">
        <Mascot />
      </div>

      {/* Main content — single centered column. Outer wrapper is the full-width
           flex centerer; inner block holds the actual content at max 1100px. */}
      <div className="relative z-10 flex min-h-[78vh] w-full items-center justify-center px-4 py-12 sm:px-6 md:px-16 md:py-14">
        <div className="flex w-full max-w-[1100px] flex-col items-center gap-6 text-center md:gap-10">
        {/* Mascot — mobile only (above title); desktop uses the absolute one above */}
        <div className="md:hidden">
          <Mascot />
        </div>

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
