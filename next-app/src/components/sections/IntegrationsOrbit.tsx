"use client";

import { cn } from "@/lib/utils";
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

const TeamsLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <circle cx="17.5" cy="6.2" r="2.6" fill="#5059C9" />
    <rect x="12.5" y="9" width="10" height="8.2" rx="2" fill="#5059C9" />
    <circle cx="10" cy="5.6" r="3.1" fill="#7B83EB" />
    <rect x="3" y="9" width="12" height="9.4" rx="2.4" fill="#7B83EB" />
    <text x="9" y="16.4" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#fff">T</text>
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6Z" fill="#4285F4" />
    <path d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 20.9 7.6 23.5 12 23.5Z" fill="#34A853" />
    <path d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3Z" fill="#FBBC05" />
    <path d="M12 4.7c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1.2 12 .2 7.6.2 3.7 2.8 1.8 6.8l3.8 3c.9-2.7 3.4-4.7 6.4-5.1Z" fill="#EA4335" />
  </svg>
);

const HubspotLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M16.4 8.1V5.4a2 2 0 1 0-1.8 0v2.7a6 6 0 0 0-2.6 1l-7-5.4a2.3 2.3 0 1 0-1 1.4l6.9 5.3a5.6 5.6 0 0 0 .1 6.3l-2.1 2.1a1.8 1.8 0 1 0 1.1 1.2l2.1-2.1a5.7 5.7 0 1 0 4.3-9.9Zm-.9 8.6a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Z" fill="#FF7A59" />
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
              <div dir="ltr" className="group relative aspect-square w-full max-w-[22rem] sm:max-w-md">
                {/* טבעת הילה רכה מאחורי כל העסק — קומפקטית סביב המרכז כדי לא לבלוע את הקווים */}
                <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#0D9488]/14 via-[#0D9488]/4 to-transparent blur-2xl pointer-events-none" />

                {/* קווי זרימה — מהמרכז המדויק לכל לוגו */}
                <OrbitFlowLines />

                {/* טבעת חיצונית סטטית */}
                <div className="absolute inset-0 rounded-full border-[1.5px] border-slate-200/80 shadow-[inset_0_0_24px_rgba(0,0,0,0.02)]" />
                {/* טבעת אמצעית סטטית */}
                <div className="absolute inset-[26%] rounded-full border-[1.5px] border-slate-200/70" />

                {/* טבעות סיבוב עדינות — תחושת זרימת נתונים, נצמדות בדיוק לטבעות */}
                <div
                  role="presentation"
                  className="absolute inset-0 z-[8] animate-spin rounded-full border-t-2 border-[#0D9488]/30 [animation-duration:20s] group-hover:[animation-duration:8s] transition-all duration-700"
                />
                <div
                  role="presentation"
                  className="absolute inset-[26%] z-[8] animate-spin-reverse rounded-full border-l-2 border-[#3ECFBE]/30 [animation-duration:26s] group-hover:[animation-duration:10s] transition-all duration-700"
                />

                {/* לוגואים מפוזרים סביב המרכז */}
                {ORBIT_NODES.map((node) => (
                  <div
                    key={node.id}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <IntegrationCard delay={node.delay}>
                      <node.Logo />
                    </IntegrationCard>
                  </div>
                ))}

                {/* לוגו וונדי — בדיוק במרכז */}
                <div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
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
                        className="size-16 border-none shadow-2xl shadow-[#0D9488]/30 md:size-20"
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
                <a
                  href="#feature-tour"
                  className="group inline-flex h-[60px] min-w-[200px] shrink-0 select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-black px-12 text-[15px] font-semibold tracking-tight !text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-black/90 hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)]"
                >
                  ראו איך זה עובד
                  <span className="text-[18px] transition-transform group-hover:-translate-x-1">
                    ←
                  </span>
                </a>
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
/**
 * Single source of truth for every orbiting logo.
 *
 * The orbit container is aspect-square, so we describe everything in a 0–100
 * percentage grid where the Wendi mark sits at the exact center (50, 50).
 * Each node is placed by polar coordinates: an angle (degrees, 0° = straight
 * up, clockwise) and a radius (% of half-width). The same (x, y) computed here
 * is used both to position the logo card AND to draw its flow line — so every
 * line points precisely at the center of its logo, by construction.
 */
const CENTER = { x: 50, y: 50 } as const;

type OrbitNode = {
  id: string;
  angle: number; // degrees, 0 = up, clockwise
  radius: number; // % of half-width from center
  delay: number;
  Logo: () => React.JSX.Element;
};

const RAW_NODES: OrbitNode[] = [
  // Inner ring — 3 logos, evenly spaced 120° apart, sitting just outside the
  // middle ring so they're not crammed against the Wendi mark.
  { id: "salesforce", angle: 0,   radius: 30, delay: 0.8, Logo: SalesforceLogo },
  { id: "microsoft",  angle: 240, radius: 30, delay: 0.3, Logo: MicrosoftLogo },
  { id: "slack",      angle: 120, radius: 30, delay: 1.5, Logo: SlackLogo },
  // Outer ring — 6 logos, evenly spaced 60° apart, offset 30° from the inner
  // ring so the two rings interlock instead of stacking on the same spokes.
  { id: "teams",      angle: 330, radius: 45, delay: 1.3, Logo: TeamsLogo },
  { id: "oracle",     angle: 30,  radius: 45, delay: 0,   Logo: OracleLogo },
  { id: "hubspot",    angle: 90,  radius: 45, delay: 0.4, Logo: HubspotLogo },
  { id: "workday",    angle: 150, radius: 45, delay: 1.0, Logo: WorkdayLogo },
  { id: "google",     angle: 210, radius: 45, delay: 0.6, Logo: GoogleLogo },
  { id: "sap",        angle: 270, radius: 45, delay: 0.5, Logo: SapLogo },
];

const polar = (angle: number, radius: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER.x + radius * Math.cos(rad),
    y: CENTER.y + radius * Math.sin(rad),
  };
};

const ORBIT_NODES = RAW_NODES.map((n) => ({ ...n, ...polar(n.angle, n.radius) }));

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

const OrbitFlowLines = () => (
  <svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
  >
    {ORBIT_NODES.map((node) => {
      // All lines start on the same tight circle hugging the Wendi mark edge,
      // so they visibly converge on one focal point, and stop just before each
      // logo card — pointing dead-center at both ends by construction.
      const { x1, y1, x2, y2 } = trimEndpoints(CENTER, node, 11, 7);
      return (
        <line
          key={node.id}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#0D9488"
          strokeOpacity="0.32"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="0.9 1.5"
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
        "relative z-30 flex size-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-300/50 md:size-14",
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
