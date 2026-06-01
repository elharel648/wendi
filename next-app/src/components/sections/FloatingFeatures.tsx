"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { FloatingFeaturesContent } from "@/content/homeSections";
import { homeSections } from "@/content/homeSections";

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
              <article className="flt-feat" data-flt-idx="0">
                <div className="flt-art flt-art-msg" aria-hidden="true">
                  <svg viewBox="0 0 80 80" fill="none">
                    <defs>
                      <radialGradient id="msg-g1" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#3ECFBE" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#3ECFBE" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="msg-g2" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#5b9eff" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#5b9eff" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="32" cy="34" r="22" fill="url(#msg-g1)" />
                    <circle cx="52" cy="46" r="16" fill="url(#msg-g2)" />
                    <circle cx="32" cy="34" r="9" fill="none" stroke="#3ECFBE" strokeWidth="1.2" opacity="0.7" />
                    <circle cx="52" cy="46" r="7" fill="none" stroke="#5b9eff" strokeWidth="1.2" opacity="0.65" />
                    <circle cx="32" cy="34" r="2.5" fill="#3ECFBE" />
                    <circle cx="52" cy="46" r="2" fill="#5b9eff" />
                  </svg>
                </div>
                <h3 className="flt-feat-title">{feats[0]?.title}</h3>
                <p className="flt-feat-sub">{feats[0]?.sub}</p>
                <ul className="flt-list">
                  {feats[0]?.points.map((pt) => <li key={pt} className="flt-pt">{pt}</li>)}
                </ul>
              </article>
              <article className="flt-feat" data-flt-idx="1">
                <div className="flt-art flt-art-wallet" aria-hidden="true">
                  <svg viewBox="0 0 80 80" fill="none">
                    <defs>
                      <linearGradient id="wal-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3ECFBE" />
                        <stop offset="100%" stopColor="#2aa094" />
                      </linearGradient>
                      <linearGradient id="wal-g2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f5c451" />
                        <stop offset="100%" stopColor="#d99c2e" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="40" cy="58" rx="22" ry="4" fill="#3ECFBE" opacity="0.10" />
                    <circle cx="30" cy="48" r="14" fill="url(#wal-g2)" opacity="0.92" />
                    <circle cx="30" cy="48" r="9" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.45" />
                    <circle cx="48" cy="36" r="16" fill="url(#wal-g1)" />
                    <circle cx="48" cy="36" r="10" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.35" />
                    <text x="48" y="40" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0a0a0a" opacity="0.7">W</text>
                  </svg>
                </div>
                <h3 className="flt-feat-title">{feats[1]?.title}</h3>
                <p className="flt-feat-sub">{feats[1]?.sub}</p>
                <ul className="flt-list">
                  {feats[1]?.points.map((pt) => <li key={pt} className="flt-pt">{pt}</li>)}
                </ul>
              </article>
            </motion.div>

            {/* CENTER — the character */}
            <div className="flt-center flt-reveal relative z-10">
              <div className="flt-glow" aria-hidden="true" />
              <div className="flt-ring" aria-hidden="true" />
              <motion.div className="flt-char-wrap" style={wrapStyle}>
                <motion.div className="flt-char-zoom" style={charStyle}>
                  <Image
                    src="/05.png"
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
            </div>

            {/* LEFT column */}
            <motion.div className="flt-col flt-col-l" style={fadeStyle}>
              <article className="flt-feat" data-flt-idx="2">
                <div className="flt-art flt-art-learn" aria-hidden="true">
                  <svg viewBox="0 0 80 80" fill="none">
                    <defs>
                      <linearGradient id="lrn-teal" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#3ECFBE" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3ECFBE" />
                      </linearGradient>
                      <linearGradient id="lrn-blue" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#5b9eff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#5b9eff" />
                      </linearGradient>
                    </defs>
                    <rect x="14" y="46" width="10" height="22" rx="2" fill="url(#lrn-teal)" opacity="0.55" />
                    <rect x="28" y="34" width="10" height="34" rx="2" fill="url(#lrn-teal)" opacity="0.75" />
                    <rect x="42" y="22" width="10" height="46" rx="2" fill="url(#lrn-blue)" opacity="0.9" />
                    <rect x="56" y="12" width="10" height="56" rx="2" fill="url(#lrn-teal)" />
                    <circle cx="61" cy="12" r="3" fill="#3ECFBE" />
                    <circle cx="61" cy="12" r="6" fill="none" stroke="#3ECFBE" strokeWidth="1" opacity="0.4" />
                  </svg>
                </div>
                <h3 className="flt-feat-title">{feats[2]?.title}</h3>
                <p className="flt-feat-sub">{feats[2]?.sub}</p>
                <ul className="flt-list">
                  {feats[2]?.points.map((pt) => <li key={pt} className="flt-pt">{pt}</li>)}
                </ul>
              </article>
              <article className="flt-feat" data-flt-idx="3">
                <div className="flt-art flt-art-perf" aria-hidden="true">
                  <svg viewBox="0 0 80 80" fill="none">
                    <defs>
                      <linearGradient id="prf-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3ECFBE" />
                        <stop offset="55%" stopColor="#5b9eff" />
                        <stop offset="100%" stopColor="#f5c451" />
                      </linearGradient>
                    </defs>
                    <path d="M 14 56 A 26 26 0 0 1 66 56" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M 14 56 A 26 26 0 0 1 66 56" stroke="url(#prf-arc)" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="82" strokeDashoffset="14" />
                    <circle cx="58" cy="38" r="4.5" fill="#f5c451" />
                    <circle cx="58" cy="38" r="9" fill="none" stroke="#f5c451" strokeWidth="1" opacity="0.35" />
                    <circle cx="40" cy="56" r="2" fill="rgba(255,255,255,0.65)" />
                    <line x1="40" y1="56" x2="56" y2="40" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="flt-feat-title">{feats[3]?.title}</h3>
                <p className="flt-feat-sub">{feats[3]?.sub}</p>
                <ul className="flt-list">
                  {feats[3]?.points.map((pt) => <li key={pt} className="flt-pt">{pt}</li>)}
                </ul>
              </article>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
