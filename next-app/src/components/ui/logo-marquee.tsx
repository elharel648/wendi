"use client";

import { cn } from "@/lib/utils";

interface Logo {
  id: string;
  alt: string;
  src: string;
  className?: string;
}

interface LogoMarqueeProps {
  heading?: string;
  logos?: Logo[];
}

// Per-logo size overrides — used so every logo lands at roughly the same
// visual width (~140–160px on md+). Tall/square logos need a larger
// max-h to grow; ultra-wide logos use the default which caps by max-w.
const tallOverride = "max-h-16 max-w-[150px] md:max-h-[88px] md:max-w-[170px]";

const defaultLogos: Logo[] = [
  { id: "ikea", alt: "IKEA", src: "/logo-ikea.png" },
  { id: "maccabi", alt: "מכבי שירותי בריאות", src: "/logo-maccabi.png", className: tallOverride },
  { id: "shufersal", alt: "שופרסל", src: "/logo-shufersal.png" },
  { id: "super-pharm", alt: "סופר-פארם", src: "/Super_Pharm_Logo.svg.png" },
  { id: "soraski", alt: "איכילוב", src: "/Soraski2021.svg.png", className: tallOverride },
  { id: "bank-jerusalem", alt: "בנק ירושלים", src: "/logo-bank-jerusalem.png", className: tallOverride },
  { id: "doralon", alt: "דור אלן", src: "/logo-doralon.png" },
  { id: "bezeq", alt: "בזק", src: "/logo-bezeq.png" },
  { id: "elal", alt: "אל על", src: "/logo-elal.svg", className: tallOverride },
  { id: "fattal", alt: "פאתאל", src: "/logo-fattal.png", className: tallOverride },
  { id: "bituach-yashir", alt: "ביטוח ישיר", src: "/logo-bituach-yashir.png" },
  { id: "tikshoov", alt: "תקשוב", src: "/logo-tikshoov.svg", className: tallOverride },
  {
    id: "r2m",
    alt: "R2M",
    src: "/logo-r2m.png",
    // R2M's PNG has lots of transparent padding around a tiny bird icon —
    // even more generous to make the bird visually weigh like its neighbors.
    className: "max-h-20 max-w-[170px] md:max-h-24 md:max-w-[180px]",
  },
];

/**
 * Bulletproof infinite logo marquee — vanilla React + Tailwind.
 *
 * Rules followed (strict spec):
 *  1. RTL Immunity: outer section is RTL, but the scrolling track is forced
 *     dir="ltr" so translateX math behaves identically across engines.
 *  2. Double the content: `[...logos, ...logos]` — exactly once. Track is 2W.
 *  3. Uncrushable track: `flex w-max` — content-sized, never compressed.
 *  4. Uncrushable logos: every slot has `shrink-0` AND a fixed pixel width,
 *     so total track width is deterministic the instant the DOM mounts —
 *     regardless of when images finish loading.
 *  5. Native Tailwind animation: `animate-[marquee_40s_linear_infinite]`.
 *  6. Keyframe defined inline with React 19's `precedence` attribute — this
 *     hoists the <style> to <head> as a MANAGED resource. Without precedence,
 *     React 19 treats inline styles as transient and can strip them, which
 *     snaps the animation to its end-state (off-screen) and kills the logos.
 *
 * Seamless loop math:
 *  - 13 logos × 2 copies = 26 slots
 *  - Each slot: 240px (md) → total track = 6240px
 *  - translateX(-50%) = -3120px = exactly 13 slots = exactly 1 copy
 *  - Frame at -50% is byte-identical to frame at 0% (copy 2 = copy 1)
 */
export function LogoMarquee({
  heading = "מאות אלפי עובדים בישראל מתחילים את היום עם Wendi",
  logos = defaultLogos,
}: LogoMarqueeProps) {
  const loopLogos = [...logos, ...logos];

  return (
    <section className="w-full bg-white pt-2 pb-20 md:pt-4 md:pb-28" dir="rtl">
      {/* React 19 managed style — `precedence` + `href` = hoisted to <head>
          and NEVER stripped mid-render. This is the fix for the "logos
          disappear after a few seconds" bug from before. */}
      <style precedence="default" href="wendi-marquee-keyframes">{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Heading */}
      <div className="mx-auto mb-6 max-w-3xl px-6 text-center">
        <h2 className="text-balance font-medium text-base text-slate-500 md:text-lg">
          {heading}
        </h2>
      </div>

      {/* Marquee viewport — `dir="ltr"` MUST be here too, not just on the
          track. The viewport's parent is the RTL <section>, so without an
          explicit LTR override, the viewport positions its w-max child at
          its RIGHT edge (RTL inline-start). The animation then translates
          it further right → entirely off-screen. Forcing dir="ltr" here
          makes the track sit at the LEFT edge, where the animation expects. */}
      <div dir="ltr" className="relative mx-auto w-full max-w-5xl overflow-hidden">
        <div
          dir="ltr"
          className="flex w-max animate-[marquee_40s_linear_infinite] will-change-transform"
        >
          {loopLogos.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex h-16 w-[160px] shrink-0 items-center justify-center md:h-20 md:w-[180px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                draggable={false}
                className={cn(
                  "max-h-12 max-w-[130px] w-auto select-none object-contain transition-all duration-500 hover:scale-110 hover:[filter:none] md:max-h-14 md:max-w-[150px]",
                  logo.className,
                )}
                style={{
                  filter:
                    "grayscale(100%) brightness(0.35) contrast(1.4) opacity(0.85)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Edge fades — premium polish */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent md:w-32" />
      </div>
    </section>
  );
}
