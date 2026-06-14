"use client";

import { useTransform, motion, useScroll, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** True when the viewport is below the md breakpoint (768px). Drives the
 *  mobile behaviour: the scroll-stacking effect is desktop-only — on phones
 *  the tall module cards would overflow the pinned viewport and get clipped,
 *  so we render them as a plain vertical list instead. */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

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
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Mobile: render each card in normal flow, full height, no pinning/scaling —
  // so nothing is clipped. Desktop keeps the scroll-stacking effect.
  if (isMobile) {
    return (
      <div dir={dir} className={className}>
        <div className="flex flex-col gap-6 px-3 py-6">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: item.background,
                border: item.borderColor ? `1px solid ${item.borderColor}` : undefined,
              }}
              className="overflow-hidden rounded-[22px] shadow-[0_16px_40px_-26px_rgba(15,23,42,0.4)]"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

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