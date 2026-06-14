"use client";

import { motion } from "framer-motion";
import { modules } from "@/content/modulim";
import { sanitizeHtml } from "@/lib/sanitize";

const expo = [0.22, 1, 0.36, 1] as const;

type ModulimHeroProps = { title?: string; subtitleHtml?: string };

const DEFAULT_TITLE = "כל כלי במקום הנכון";
const DEFAULT_SUBTITLE =
  'וונדי מציעה <strong class="font-bold text-ink-2">4 מודולים מרכזיים</strong> שעובדים יחד כמערכת אחת. לחצו על כל מודול לגלות את הפיצ׳רים המלאים.';

export function ModulimHero({ title, subtitleHtml }: ModulimHeroProps = {}) {
  return (
    <section
      dir="rtl"
      aria-label="מודולים ופיצ׳רים"
      className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-paper px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 md:pt-36"
    >
      <DriftingGlows />

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: expo, delay: 0.12 }}
          className="mb-6 text-[clamp(2rem,8vw,5.6rem)] font-black leading-[1.1] tracking-[-0.045em] text-ink md:mb-7"
        >
          {title || DEFAULT_TITLE}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: expo, delay: 0.55 }}
          className="mx-auto max-w-[620px] text-[1rem] leading-[1.75] text-muted-fg md:text-[1.15rem] md:leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(subtitleHtml || DEFAULT_SUBTITLE) }}
        />
      </div>
    </section>
  );
}

/* Two slow-drifting color glows in the existing module palette — adds life without changing colors. */
function DriftingGlows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute left-[18%] top-[8%] h-[460px] w-[460px] rounded-full opacity-[0.28] blur-[110px]"
        style={{ background: `radial-gradient(circle, ${modules[0].color} 0%, transparent 70%)` }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[14%] top-[22%] h-[420px] w-[420px] rounded-full opacity-[0.26] blur-[110px]"
        style={{ background: `radial-gradient(circle, ${modules[2].color} 0%, transparent 70%)` }}
        animate={{ x: [0, -36, 24, 0], y: [0, 28, -18, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-[40%] h-[360px] w-[520px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[120px]"
        style={{ background: `radial-gradient(circle, ${modules[1].color} 0%, transparent 72%)` }}
        animate={{ scale: [1, 1.12, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}