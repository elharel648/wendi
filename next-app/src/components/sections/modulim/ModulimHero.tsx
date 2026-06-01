"use client";

import { motion } from "framer-motion";
import { FluxCardHero } from "@/components/ui/flux-card-hero";

const expo = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0D9488";

type ModulimHeroProps = { title?: string; subtitleHtml?: string };

const DEFAULT_TITLE = "כל כלי במקום הנכון";
const DEFAULT_SUBTITLE =
  'וונדי מציעה <strong class="font-bold text-ink-2">4 מודולים מרכזיים</strong> שעובדים יחד כמערכת אחת. לחצו על כל מודול לגלות את הפיצ׳רים המלאים.';

export function ModulimHero({ title, subtitleHtml }: ModulimHeroProps = {}) {
  return (
    <section
      dir="rtl"
      aria-label="מודולים ופיצ׳רים"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-paper px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:pt-32"
    >
      <SoftGlow />

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: expo, delay: 0.18 }}
          className="mb-6 text-[clamp(2rem,8vw,5.6rem)] font-black leading-[1.1] tracking-[-0.045em] text-ink md:mb-7"
        >
          {title || DEFAULT_TITLE}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: expo, delay: 0.85 }}
          className="mx-auto max-w-[620px] text-[1rem] leading-[1.75] text-muted-fg md:text-[1.15rem] md:leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: subtitleHtml || DEFAULT_SUBTITLE }}
        />
      </div>

      {/* Animated layered cards — module previews */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: expo, delay: 1.05 }}
        className="relative z-10 mt-10 w-full md:mt-20"
      >
        <FluxCardHero />
      </motion.div>
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
