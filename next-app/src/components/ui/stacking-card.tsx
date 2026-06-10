"use client";

import { useTransform, motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Scroll-stacking cards primitive (adapted from ui-layout's "stacking-card").
 *
 * The original demo shipped dark-mode chrome (black bg, Unsplash images, a giant
 * "ui-layout" footer) and an LTR layout. This version is a clean, prop-driven
 * primitive: it owns only the scroll-pinning + scale-stack mechanic and renders
 * whatever `children` you pass per card. Background, colors and copy are the
 * caller's job, so it can live on a light, RTL page without fighting the theme.
 */

export interface StackingCardItem {
  /** Stable key + lets the caller correlate cards back to its own data. */
  id: string;
  /** Card body. Receives nothing — the caller closes over its own data. */
  content: React.ReactNode;
  /** Card background (solid colour or gradient). */
  background?: string;
  /** Optional border colour for the card frame. */
  borderColor?: string;
}

export interface StackingCardsProps {
  items: StackingCardItem[];
  /** Per-card scale step as cards stack (smaller = more visible shrink). */
  scaleStep?: number;
  /** Vertical nudge per card so stacked tops peek out. */
  offsetStep?: number;
  className?: string;
  dir?: "ltr" | "rtl";
}

export function StackingCards({
  items,
  scaleStep = 0.05,
  offsetStep = 20,
  className,
  dir = "ltr",
}: StackingCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} dir={dir} className={className}>
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * scaleStep;
        return (
          <StackingCard
            key={item.id}
            i={i}
            item={item}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            offsetStep={offsetStep}
          />
        );
      })}
    </div>
  );
}

interface StackingCardProps {
  i: number;
  item: StackingCardItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  offsetStep: number;
}

function StackingCard({ i, item, progress, range, targetScale, offsetStep }: StackingCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex min-h-screen items-start justify-center pt-[12vh]">
      <motion.div
        style={{
          backgroundColor: item.background,
          border: item.borderColor ? `1px solid ${item.borderColor}` : undefined,
          scale,
          top: `${i * offsetStep}px`,
        }}
        className="relative w-[92%] max-w-[1000px] origin-top overflow-hidden rounded-[26px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]"
      >
        {item.content}
      </motion.div>
    </div>
  );
}

export default StackingCards;