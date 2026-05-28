"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import * as React from "react";

const SapLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <defs>
      <linearGradient id="sapGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00AEEF" />
        <stop offset="100%" stopColor="#0070C0" />
      </linearGradient>
    </defs>
    <path d="M1 5 L20 5 L23 12 L20 19 L1 19 Z" fill="url(#sapGrad)" />
    <text x="11" y="15.5" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#fff" letterSpacing="0.3">SAP</text>
  </svg>
);

const OracleLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    {/* stylised "O" mark — Oracle's iconic red ring */}
    <ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke="#C74634" strokeWidth="2.4" />
  </svg>
);

const WorkdayLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <circle cx="12" cy="12" r="11" fill="#F38B00" />
    <path d="M3.5 10 L6 17 L8.5 11.5 L10.8 17 L13 11.5 L15.4 17 L18 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="20" cy="10.5" r="0.9" fill="#fff" />
  </svg>
);

const SalesforceLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path
      d="M9.8 6.4c.9-.9 2.1-1.5 3.5-1.5 1.8 0 3.4 1 4.2 2.5.7-.3 1.6-.5 2.4-.5 3.2 0 5.8 2.6 5.8 5.9 0 3.3-2.6 5.9-5.8 5.9-.4 0-.8 0-1.2-.1a4.2 4.2 0 0 1-5.6 1.7 4.8 4.8 0 0 1-8.7-.2c-.4.1-.8.1-1.2.1C1.5 20.2-.3 18.4-.3 16.2c0-1.5.7-2.8 1.8-3.6-.2-.5-.4-1.1-.4-1.7 0-2.4 1.9-4.3 4.3-4.3 1.4 0 2.6.7 3.4 1.7.3-.3.7-.6 1-.9Z"
      fill="#00A1E0"
    />
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <rect x="2" y="2" width="9" height="9" fill="#F25022" />
    <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
    <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
    <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
  </svg>
);

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    {/* pink/red — left arm */}
    <rect x="3" y="10" width="2.5" height="2.5" rx="1.25" fill="#E01E5A" />
    <rect x="6.5" y="10" width="2.5" height="7" rx="1.25" fill="#E01E5A" />
    {/* blue — top */}
    <rect x="10" y="3" width="2.5" height="2.5" rx="1.25" fill="#36C5F0" />
    <rect x="3" y="6.5" width="7" height="2.5" rx="1.25" fill="#36C5F0" />
    {/* green — right arm */}
    <rect x="15" y="11.5" width="2.5" height="2.5" rx="1.25" fill="#2EB67D" />
    <rect x="11.5" y="7" width="2.5" height="7" rx="1.25" fill="#2EB67D" />
    {/* yellow — bottom */}
    <rect x="11.5" y="15" width="2.5" height="2.5" rx="1.25" fill="#ECB22E" />
    <rect x="14" y="11.5" width="7" height="2.5" rx="1.25" fill="#ECB22E" />
  </svg>
);

const WendiMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* LEFT "V" — teal: outer-left stroke + inner-right stroke meeting at the bottom point */}
    <path d="M6 6 L17 6 L25 48 L14 48 Z" fill="#3ECFBE" />
    <path d="M14 48 L25 48 L33 6 L22 6 Z" fill="#3ECFBE" />
    {/* RIGHT "V" — blue: outer-right stroke + inner-left stroke meeting at the bottom point */}
    <path d="M50 6 L39 6 L31 48 L42 48 Z" fill="#3B82B8" />
    <path d="M42 48 L31 48 L23 6 L34 6 Z" fill="#3B82B8" />
    {/* dark overlap where the two Vs cross — centre lozenge */}
    <path d="M22 6 L34 6 L31 22 L25 22 Z" fill="#0F5970" />
  </svg>
);

const expo = [0.16, 1, 0.3, 1] as const;

export function IntegrationsOrbit() {
  return (
    <section className="bg-paper overflow-hidden relative z-20">
      <div className="pt-4 pb-24 md:pt-6 md:pb-32 relative z-10">
        <div className="flex w-full justify-center px-6">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* ── ORBIT (הוויז'ואל) ── */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: expo }}
              className="flex justify-center md:order-2 relative"
            >
              <div dir="ltr" className="group relative aspect-square w-full max-w-[28rem] sm:max-w-md">
                {/* טבעת הילה רכה מאחורי כל העסק */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D9488]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* "נחש" צבעוני זוהר שמסתובב על הטבעת החיצונית */}
                <OrbitSnake />

                {/* קווי זרימה מינימליסטיים מ-W לכל לוגו — נקודה זורמת לאורך כל קו */}
                <OrbitFlowLines />

                {/* טבעת סיבוב תמידית — תחושת זרימת נתונים */}
                <div
                  role="presentation"
                  className="absolute inset-0 z-10 aspect-square animate-spin items-center justify-center rounded-full border-t-2 border-[#0D9488]/40 bg-gradient-to-b from-[#0D9488]/5 to-transparent to-25% [animation-duration:15s] group-hover:[animation-duration:5s] transition-all duration-700"
                />

                {/* טבעת פנימית מסתובבת נגד הכיוון */}
                <div
                  role="presentation"
                  className="absolute inset-16 z-10 aspect-square scale-90 animate-spin-reverse items-center justify-center rounded-full border-l-2 border-[#3ECFBE]/40 bg-gradient-to-r from-[#3ECFBE]/5 to-transparent to-25% [animation-duration:20s] group-hover:[animation-duration:7s] transition-all duration-700 delay-100"
                />

                {/* Static outer ring */}
                <div className="absolute inset-0 flex aspect-square items-center justify-center rounded-full border-[1.5px] border-slate-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
                  <IntegrationCard className="absolute left-0 top-1/4 -translate-x-[16.666%] -translate-y-1/4" delay={0}>
                    <SapLogo />
                  </IntegrationCard>
                  <IntegrationCard className="absolute top-0 -translate-y-1/2" delay={1.2}>
                    <OracleLogo />
                  </IntegrationCard>
                  <IntegrationCard className="absolute right-0 top-1/4 translate-x-[16.666%] -translate-y-1/4" delay={0.5}>
                    <WorkdayLogo />
                  </IntegrationCard>
                </div>

                {/* Static inner ring */}
                <div className="absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-[1.5px] border-slate-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
                  <IntegrationCard className="absolute top-0 -translate-y-1/2" delay={0.8}>
                    <SalesforceLogo />
                  </IntegrationCard>
                  <IntegrationCard className="absolute left-0 top-1/4 -translate-x-1/4 -translate-y-1/4" delay={0.3}>
                    <MicrosoftLogo />
                  </IntegrationCard>
                  <IntegrationCard className="absolute right-0 top-1/4 -translate-y-1/4 translate-x-1/4" delay={1.5}>
                    <SlackLogo />
                  </IntegrationCard>
                </div>

                {/* Center Wendi mark — הילות מהבהבות */}
                <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 md:bottom-10">
                  <div className="relative flex items-center justify-center">
                    {/* גל הדף (Ping) שיוצא מוונדי */}
                    <div
                      className="absolute inset-0 rounded-full bg-[#0D9488]/30 blur-md animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                    {/* פולס קבוע */}
                    <div className="absolute -inset-4 rounded-full bg-[#0D9488]/20 blur-xl animate-pulse" />

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full border border-slate-200 bg-white p-1.5 relative z-10 shadow-xl"
                    >
                      <IntegrationCard
                        className="size-20 border-none shadow-2xl shadow-[#0D9488]/30"
                        isCenter
                        delay={0}
                        floating={false}
                      >
                        <WendiMark className="text-[#0D9488]" />
                      </IntegrationCard>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── TEXT ── */}
            <motion.div
              className="relative z-20 space-y-8 text-center md:order-1 md:text-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: expo, delay: 0.2 }}
            >
              <div className="space-y-6">
                <h2 className="text-balance text-4xl font-black leading-[1.1] tracking-[-0.03em] md:text-5xl text-[#0F172A]">
                  מתחברים לכלים שאתם אוהבים
                </h2>
                <p className="text-base leading-[1.78] md:text-lg text-slate-500 max-w-lg mx-auto md:mx-0">
                  Wendi מתממשקת בקלות ל-SAP, Oracle, Workday ולכל המערכות שכבר חיות
                  אצלכם — הנתונים זורמים ישירות, בלי כפילויות ובלי שום מאמץ מצד הצוות.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
                <Button
                  href="#feature-tour"
                  variant="primary"
                  className="shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-shadow"
                >
                  ראו איך זה עובד
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Minimalist flow lines from the central Wendi mark to each integration logo.
 *
 * Coordinates are in a 0–100 viewBox that maps 1:1 onto the orbit container
 * (which is aspect-square). The W sits near the bottom-centre (≈ 50, 80),
 * each target is the centre of its IntegrationCard on the outer/inner ring.
 * Lines are shortened on both ends so they don't poke into either logo.
 *
 * Each line carries a tiny dot animated from W → target via SMIL <animateMotion>,
 * giving a subtle "data flowing outward" feel. Pure SVG, no JS, GPU-friendly.
 */
const FLOW_TARGETS = [
  // Outer ring
  { id: "oracle",     x: 50, y:  3 },
  { id: "sap",        x:  8, y: 28 },
  { id: "workday",    x: 92, y: 28 },
  // Inner ring
  { id: "salesforce", x: 50, y: 21 },
  { id: "microsoft",  x: 29, y: 37 },
  { id: "slack",      x: 71, y: 37 },
] as const;

const W_CENTER = { x: 50, y: 80 } as const;

/** Pull each endpoint a few units inward so the line stops before the logo. */
function trimEndpoints(
  from: { x: number; y: number },
  to: { x: number; y: number },
  startPad = 6,
  endPad = 6,
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: from.x + ux * startPad,
    y1: from.y + uy * startPad,
    x2: to.x   - ux * endPad,
    y2: to.y   - uy * endPad,
  };
}

/**
 * Colorful "snake" that travels around the outer orbit ring.
 *
 * How it works:
 * - A full SVG circle sits exactly on the outer ring (cx=50, cy=50, r=50, but
 *   inset slightly so the snake doesn't bleed past the ring stroke).
 * - The stroke is a linear gradient (teal → cyan → brand blue) — these are the
 *   brand DNA colors, so it never feels foreign.
 * - `strokeDasharray` defines ONE visible arc (~25% of the circumference) +
 *   one big gap. `strokeDashoffset` is animated linearly with CSS keyframes,
 *   which rotates that arc around the circle endlessly.
 * - A soft blur filter gives the glowing "snake" feel without being garish.
 * - Pointer-events-none + low base opacity so it complements the existing
 *   spin rings rather than fighting them.
 *
 * Circumference math (r=48): 2πr ≈ 301.6 → dash 75 + gap 226.6 ≈ a quarter-arc.
 */
const OrbitSnake = () => (
  <svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-[6] h-full w-full"
  >
    <defs>
      <linearGradient id="snake-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#3ECFBE" />
        <stop offset="50%"  stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
      <filter id="snake-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" />
      </filter>
    </defs>

    <circle
      cx="50"
      cy="50"
      r="48"
      fill="none"
      stroke="url(#snake-grad)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="75 226.6"
      pathLength="301.6"
      filter="url(#snake-blur)"
      className="orbit-snake-path"
      opacity="0.85"
    />
  </svg>
);

const OrbitFlowLines = () => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
  >
    {FLOW_TARGETS.map((t) => {
      const { x1, y1, x2, y2 } = trimEndpoints(W_CENTER, t, 8, 8);
      return (
        <line
          key={t.id}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#0D9488"
          strokeOpacity="0.22"
          strokeWidth="0.25"
          strokeLinecap="round"
          strokeDasharray="0.8 1.4"
        />
      );
    })}
  </svg>
);

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
  delay = 0,
  floating = true,
}: {
  children: React.ReactNode;
  className?: string;
  isCenter?: boolean;
  delay?: number;
  floating?: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "relative z-30 flex size-14 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-300/50",
        className,
      )}
      animate={floating ? { y: [-5, 5, -5] } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      whileHover={{ scale: 1.15, zIndex: 40 }}
    >
      <div
        className={cn(
          "m-auto flex h-[55%] w-[55%] items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain",
          isCenter && "h-[60%] w-[60%]",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
