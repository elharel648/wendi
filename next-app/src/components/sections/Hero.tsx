"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/content/home";

type HeroProps = { content: HeroContent };

const expo = [0.22, 1, 0.36, 1] as const;

/** Match the legacy `stWIn` keyframe: opacity 0→1, translateY 40→0, skewY 2°→0. */
const wInVariants = {
  hidden:  { opacity: 0, y: 40, skewY: 2 },
  visible: { opacity: 1, y: 0,  skewY: 0 },
};

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero({ content }: HeroProps) {
  const { titleLines, subtitle, ctas, mascot } = content;

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-paper px-6 pt-24 md:px-16 md:pt-[100px]">
      {/* Decorative teal blob — drifts on a long loop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -end-[100px] -top-[200px] h-[800px] w-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-brand-glow) 0%, transparent 70%)" }}
        animate={{
          x:     [0, -30, 20, 0],
          y:     [0, 20, -15, 0],
          scale: [1, 1.05, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: GRAIN_SVG }}
      />

      {/* Content grid — natural size, centred by the section's flex.
          Columns are `auto auto` so each takes only the width it needs,
          and the section's `justify-center` puts the cluster smack in
          the middle regardless of viewport width. */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_auto] md:gap-28">
        {/* Text column — inline-start (RIGHT in RTL).
            `translate-x-4` shifts the text block ~16px to the right
            without affecting layout of the mascot column. */}
        <div className="md:w-[480px] md:translate-x-4">
          <h1 className="mb-7 text-[clamp(2.4rem,5.5vw,5.5rem)] font-black leading-[1.06] tracking-[-0.04em] text-ink">
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className={cn("block", i === 2 && "text-brand")}
                variants={wInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, ease: expo, delay: 0.15 + i * 0.13 }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mb-10 max-w-[480px] text-[1.08rem] leading-[1.78] text-muted-fg [&_strong]:font-bold [&_strong]:text-ink-2"
            variants={wInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: expo, delay: 0.55 }}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />

          <motion.div
            className="flex flex-wrap gap-6"
            variants={wInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: expo, delay: 0.7 }}
          >
            {ctas.map((cta) => (
              <Button
                key={cta.href + cta.label}
                href={cta.href}
                variant={cta.variant}
                withArrow={cta.withArrow}
              >
                {cta.label}
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Mascot column — inline-end (LEFT in RTL) */}
        <motion.div
          className="relative flex h-[420px] items-end justify-center md:h-[540px]"
          variants={wInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, ease: expo, delay: 0.25 }}
        >
          {/* Pulsing ring 1 */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 bottom-5 h-[360px] w-[360px] rounded-full border border-line"
            style={{ x: "-50%" }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Pulsing ring 2 (larger, slightly offset) */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 -bottom-[50px] h-[520px] w-[520px] rounded-full border border-line-2"
            style={{ x: "-50%" }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
          {/* Soft elliptical floor glow */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 h-[200px] w-[340px] rounded-full"
            style={{
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse, var(--color-line-glow) 0%, transparent 70%)",
            }}
          />
          {/* Mascot — gentle float + breathing */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={mascot.src}
            alt={mascot.alt}
            className="relative z-10 object-contain will-change-transform"
            style={{ height: "min(80vw, 500px)", width: "auto" }}
            animate={{
              y: [0, -14, 0],
              scale: [1, 1.018, 1],
            }}
            transition={{
              y:     { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

