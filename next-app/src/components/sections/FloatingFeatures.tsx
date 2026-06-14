"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { FloatingFeaturesContent } from "@/content/homeSections";
import { homeSections } from "@/content/homeSections";

// Each feature card deep-links to its matching module tab on /modulim.
// Order mirrors homeSections.floating.features (index 0..3).
//   0 תקשורת פנים-ארגונית → portal   1 הארנק שלי → portal
//   2 למידה והכשרה → lms              3 הערכת ביצועים → performance
const FEAT_LINKS = [
  "/modulim?module=portal",
  "/modulim?module=portal",
  "/modulim?module=lms",
  "/modulim?module=performance",
  "/pitronot", // 4 — Wendi AI (no dedicated module; lives in the solution page)
];

// Hand-drawn "chalk sketch" arrow that reads as a connecting line flowing from
// the card toward Wendi. A long, loosely-wavy shaft fades in from nothing at the
// tail (a gradient stroke) and resolves into a hand-flicked arrowhead at the
// head — so it looks like a stroke being pulled toward the character rather than
// a detached icon. Base points left; CSS rotates it per column to aim at Wendi.
const TitleArrow = () => (
  <svg className="flt-feat-arrow" viewBox="0 0 96 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* long, loosely-wavy shaft — a clean continuous stroke */}
    <path className="flt-arrow-shaft" d="M93 7.4 C72 6, 50 9.6, 28 7.6 C20 6.9, 14 8.4, 9 8" />
    {/* two hand-flicked strokes forming an open arrowhead at the head */}
    <path className="flt-arrow-head" d="M16 1.8 C11 4, 7.4 6.5, 6.6 8 C7.4 9.8, 11 12, 15.8 14.4" />
  </svg>
);

// Clean single-weight line icons (Lucide-style) — one stroke colour, no fills
// or gradients. Replaces the old decorative blobs for a professional look.
const ICONS = [
  // 0 — תקשורת פנים-ארגונית (message / chat)
  (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </>
  ),
  // 1 — הארנק שלי (wallet)
  (
    <>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </>
  ),
  // 2 — למידה והכשרה (graduation cap)
  (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </>
  ),
  // 3 — הערכת ביצועים (trending chart)
  (
    <>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </>
  ),
  // 4 — Wendi AI (bot)
  (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V5" />
      <circle cx="12" cy="3.5" r="1.5" />
      <path d="M8 2h.01M16 2h.01" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
      <path d="M9 17h6" />
    </>
  ),
];

const FeatIcon = ({ idx }: { idx: number }) => (
  <div className="flt-art" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[idx]}
    </svg>
  </div>
);

/**
 * Scroll-zoom on Wendi: anchored on her face (not the bottom), so the
 * head stays in frame as scale climbs. `origin-bottom` would push her face
 * past the top edge of the sticky stage — we use `50% 35%` instead.
 *
 * The cards still animate via the legacy `--flt-fp` listener in
 * ClientBehaviors.tsx — only the character + headline/columns fade are
 * managed by framer-motion here.
 */
export function FloatingFeatures({ content }: { content?: FloatingFeaturesContent }) {
  const feats = (content ?? homeSections.floating).features;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Zoom strategy: scale the image with top-anchored origin so the head
  // stays pinned at the top. The legs naturally extend below — sticky
  // stage's overflow:hidden clips them, giving a clean half-body crop
  // without ever cutting the face. monday-style framing.
  const scale = useTransform(scrollYProgress, [0.72, 1], [1, 1.8]);

  // Pause the idle liftoff float once the zoom kicks in — otherwise the
  // continuous translate fights with the scale and creates jitter.
  const floatPlay = useTransform(scrollYProgress, (v) =>
    v > 0.7 ? "paused" : "running"
  );

  // Headline + side columns fade out as the zoom takes over.
  const stageFade = useTransform(scrollYProgress, [0.86, 0.99], [1, 0]);

  // Minimal parallax: a sparse dot field drifts opposite to the zoom,
  // giving subtle depth without polluting the deep black background.
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [0, 0.5, 0.5, 0]
  );

  const charStyle = reduceMotion ? {} : { scale };
  const wrapStyle = reduceMotion ? {} : { animationPlayState: floatPlay };
  const fadeStyle = reduceMotion ? {} : { opacity: stageFade };
  const parallaxStyle = reduceMotion
    ? {}
    : { y: parallaxY, opacity: parallaxOpacity };

  return (
    <section
      ref={sectionRef}
      className="flt-outer"
      id="flt-section"
      dir="rtl"
    >
      <div className="flt-bg" aria-hidden="true" />
      <div className="flt-tex" aria-hidden="true" />
      <div className="flt-sticky">
        <div className="flt-parallax-container" aria-hidden="true">
          <motion.div className="flt-parallax-dots" style={parallaxStyle} />
        </div>
        <div className="flt-stage">
          <div className="flt-grid">
            {/* RIGHT column (RTL: first DOM child renders on the right) */}
            <motion.div className="flt-col flt-col-r" style={fadeStyle}>
              <Link href={FEAT_LINKS[0]} className="flt-feat" data-flt-idx="0">
                <FeatIcon idx={0} />
                <h3 className="flt-feat-title">{feats[0]?.title}<TitleArrow /></h3>
                <p className="flt-feat-sub">{feats[0]?.sub}</p>
              </Link>
              <Link href={FEAT_LINKS[1]} className="flt-feat" data-flt-idx="1">
                <FeatIcon idx={1} />
                <h3 className="flt-feat-title">{feats[1]?.title}<TitleArrow /></h3>
                <p className="flt-feat-sub">{feats[1]?.sub}</p>
              </Link>
            </motion.div>

            {/* CENTER — the character */}
            <div className="flt-center flt-reveal relative z-10">
              <div className="flt-glow" aria-hidden="true" />
              <div className="flt-ring" aria-hidden="true" />
              <motion.div className="flt-char-wrap" style={wrapStyle}>
                <motion.div className="flt-char-zoom" style={charStyle}>
                  <Image
                    src="/05.webp"
                    alt="Wendi"
                    width={376}
                    height={600}
                    priority
                    sizes="(max-width: 768px) 52vw, 600px"
                    className="flt-char object-contain object-bottom"
                    style={{ width: "auto" }}
                  />
                </motion.div>
              </motion.div>

              {/* Wendi AI — centred feature card beneath the character */}
              <motion.div className="flt-ai-wrap" style={fadeStyle}>
                <Link href={FEAT_LINKS[4]} className="flt-feat flt-feat-ai" data-flt-idx="4">
                  <FeatIcon idx={4} />
                  <h3 className="flt-feat-title">{feats[4]?.title}<TitleArrow /></h3>
                  <p className="flt-feat-sub">{feats[4]?.sub}</p>
                </Link>
              </motion.div>
            </div>

            {/* LEFT column */}
            <motion.div className="flt-col flt-col-l" style={fadeStyle}>
              <Link href={FEAT_LINKS[2]} className="flt-feat" data-flt-idx="2">
                <FeatIcon idx={2} />
                <h3 className="flt-feat-title">{feats[2]?.title}<TitleArrow /></h3>
                <p className="flt-feat-sub">{feats[2]?.sub}</p>
              </Link>
              <Link href={FEAT_LINKS[3]} className="flt-feat" data-flt-idx="3">
                <FeatIcon idx={3} />
                <h3 className="flt-feat-title">{feats[3]?.title}<TitleArrow /></h3>
                <p className="flt-feat-sub">{feats[3]?.sub}</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
