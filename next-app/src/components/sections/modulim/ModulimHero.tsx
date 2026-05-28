"use client";

import { motion } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";

const expo = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0D9488";

const STATIC_TITLE_WORDS = ["כל", "כלי", "במקום"] as const;
const CYCLING_WORDS = ["הנכון", "המדויק", "המתאים", "שלכם"];

export function ModulimHero() {
  return (
    <section
      dir="rtl"
      aria-label="מודולים ופיצ׳רים"
      className="relative isolate grid min-h-screen w-full place-items-center overflow-hidden bg-paper"
    >
      <SoftGlow />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        {/* TITLE */}
        <h1
          aria-label="כל כלי במקום הנכון"
          className="mb-7 text-[clamp(2.6rem,6.4vw,5.6rem)] font-black leading-[1.1] tracking-[-0.045em] text-ink"
        >
          {STATIC_TITLE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: expo,
                delay: 0.12 + i * 0.08,
              }}
              className="inline-block"
            >
              {word}
              {" "}
            </motion.span>
          ))}

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: expo,
              delay: 0.12 + STATIC_TITLE_WORDS.length * 0.08,
            }}
            className="inline-flex align-baseline overflow-hidden"
            style={{ color: TEAL }}
          >
            <TextRotate
              texts={CYCLING_WORDS}
              rotationInterval={2400}
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-110%" }}
              mainClassName="inline-flex"
              splitLevelClassName="overflow-hidden"
            />
          </motion.span>
        </h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: expo, delay: 0.55 }}
          className="mx-auto max-w-[620px] text-[1.08rem] leading-[1.8] text-muted-fg md:text-[1.15rem]"
        >
          וונדי מציעה{" "}
          <strong className="font-bold text-ink-2">4 מודולים מרכזיים</strong>{" "}
          שעובדים יחד כמערכת אחת. לחצו על כל מודול לגלות את הפיצ׳רים המלאים.
        </motion.p>
      </div>
    </section>
  );
}

function SoftGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-[120px]"
      style={{
        background: `radial-gradient(circle, ${TEAL} 0%, transparent 70%)`,
      }}
    />
  );
}
