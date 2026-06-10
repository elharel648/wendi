"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/content/home";

type HeroProps = { content: HeroContent };

const expo = [0.22, 1, 0.36, 1] as const;

/**
 * Typewriter that cycles through `phrases`, mirroring the legacy index.html
 * hero: type at 90ms/char, pause 2200ms when full, delete at 55ms/char, then
 * advance to the next phrase. SSR-renders `phrases[0]` so there's no flash.
 */
function useTypewriter(phrases: string[]) {
  const [text, setText] = useState(phrases[0] ?? "");
  // Refs so the recursive timeout always reads live values without re-arming.
  const pi = useRef(0);
  const ci = useRef(phrases[0]?.length ?? 0);
  const deleting = useRef(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = phrases[pi.current];
      if (!deleting.current) {
        ci.current += 1;
        setText(phrase.slice(0, ci.current));
        if (ci.current === phrase.length) {
          deleting.current = true;
          timer = setTimeout(tick, 2200);
          return;
        }
      } else {
        ci.current -= 1;
        setText(phrase.slice(0, ci.current));
        if (ci.current === 0) {
          deleting.current = false;
          pi.current = (pi.current + 1) % phrases.length;
        }
      }
      timer = setTimeout(tick, deleting.current ? 55 : 90);
    };

    // Start in the "full first phrase" state, pause, then begin deleting.
    deleting.current = true;
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases.join("|")]);

  return text;
}

/** Match the legacy `stWIn` keyframe: opacity 0→1, translateY 40→0, skewY 2°→0. */
const wInVariants = {
  hidden:  { opacity: 0, y: 40, skewY: 2 },
  visible: { opacity: 1, y: 0,  skewY: 0 },
};

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero({ content }: HeroProps) {
  const { titleLines, typedPhrases, subtitle, ctas, mascot } = content;
  const typed = useTypewriter(typedPhrases);
  const lastIndex = titleLines.length - 1;

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-paper px-6 pt-0 md:px-16">
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
        <div className="md:w-[560px] md:translate-x-4">
          <h1 className="mb-7 text-[clamp(2.8rem,6.5vw,6.5rem)] font-black leading-[1.06] tracking-[-0.04em] text-ink">
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className={cn("block", i === lastIndex && "text-brand")}
                variants={wInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, ease: expo, delay: 0.15 + i * 0.13 }}
              >
                {i === lastIndex ? (
                  <>
                    {typed}
                    <span
                      aria-hidden
                      className="animate-blink font-normal text-brand"
                    >
                      |
                    </span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mb-8 max-w-[560px] text-[1.05rem] leading-[1.7] text-muted-fg md:mb-10 md:text-[1.2rem] md:leading-[1.78] [&_strong]:font-bold [&_strong]:text-ink-2"
            variants={wInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: expo, delay: 0.55 }}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />

          <motion.div
            className="flex flex-wrap gap-4 md:gap-6"
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
                className="rounded-full"
              >
                {cta.label}
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Mascot column — inline-end (LEFT in RTL) */}
        <motion.div
          className="relative flex h-[480px] items-center justify-center md:h-[620px]"
          variants={wInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, ease: expo, delay: 0.25 }}
        >
          {/* Pulsing ring 1 */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[260px] w-[260px] rounded-full border border-line md:h-[360px] md:w-[360px]"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Pulsing ring 2 (larger) */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[360px] w-[360px] rounded-full border border-line-2 md:h-[520px] md:w-[520px]"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
          {/* Soft elliptical glow — centred behind mascot */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[140px] w-[240px] rounded-full md:h-[200px] md:w-[340px]"
            style={{
              transform: "translate(-50%, -50%)",
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
            style={{ height: "min(85vw, 580px)", width: "auto" }}
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

