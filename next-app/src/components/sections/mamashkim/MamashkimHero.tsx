"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { MamashkimHeroContent } from "@/content/mamashkim";
import { mamashkimContent } from "@/content/mamashkim";

const TEAL = "#0D9488";
const TEAL_BRIGHT = "#3ECFBE";

type LeftRow = {
  title: string;
  subtitle: string;
  logo?: string;
  initial?: string;
  // Monogram tile fallback — used when no real brand SVG is available.
  // Renders a colored circle with a single character. Looks like a real
  // partner-logo placeholder (Notion/Slack pattern).
  mono?: { char: string; from: string; to: string };
};

type RightRow = {
  title: string;
  subtitle: string;
  glyph: React.ReactNode;
};

// Solid glyph helper — filled silhouettes, no stick-figure strokes.
const GLYPH = (path: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ width: 19, height: 19 }}
  >
    {path}
  </svg>
);

// Left column — backend systems (SYNC). Real brand logos where available.
const LEFT_ROWS: LeftRow[] = [
  { title: "SAP HR",     subtitle: "נתוני עובדים",   logo: "/logos-systems/sap.svg" },
  { title: "Synerion",   subtitle: "נוכחות ומשמרות", logo: "/logos-systems/synerion.svg" },
  { title: "Power BI",   subtitle: "מדדים",          logo: "/logos-systems/powerbi.svg" },
  { title: "Legacy API", subtitle: "מותאם אישית",    initial: "{ }" },
  { title: "Comeet",     subtitle: "גיוס",           mono: { char: "C", from: "#FF6200", to: "#FF8C00" } },
];

// Right column — user touchpoints (LIVE). Filled glyphs for warmth, not wire stick-figures.
const RIGHT_ROWS: RightRow[] = [
  {
    title: "מנהל",
    subtitle: "דשבורד ניהולי",
    glyph: GLYPH(
      <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v11A1.5 1.5 0 0 1 19.5 17H13v2h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2H4.5A1.5 1.5 0 0 1 3 15.5v-11Zm3 2.5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2v-7H6Zm4 0v7h2V9.5a1 1 0 0 1 2 0V14h2V7h-6Z" />,
    ),
  },
  {
    title: "עובד שטח",
    subtitle: "נייד",
    glyph: GLYPH(
      <path d="M12 2.25c-3.2 0-5.75 2.55-5.75 5.75 0 4.31 5.05 12.46 5.27 12.8a.57.57 0 0 0 .96 0c.22-.34 5.27-8.49 5.27-12.8 0-3.2-2.55-5.75-5.75-5.75Zm0 8a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z" />,
    ),
  },
  {
    title: "קליני",
    subtitle: "עמדה נייחת",
    glyph: GLYPH(
      <path d="M5 3.5A1.5 1.5 0 0 1 6.5 2h11A1.5 1.5 0 0 1 19 3.5v17a1 1 0 0 1-1.5.87L12 18.21l-5.5 3.16A1 1 0 0 1 5 20.5v-17ZM9 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" />,
    ),
  },
  {
    title: "מובייל",
    subtitle: "iOS · Android",
    glyph: GLYPH(
      <path d="M7 2.5A1.5 1.5 0 0 1 8.5 1h7A1.5 1.5 0 0 1 17 2.5v19A1.5 1.5 0 0 1 15.5 23h-7A1.5 1.5 0 0 1 7 21.5v-19ZM12 19.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM9 3.5v.25c0 .41.34.75.75.75h4.5a.75.75 0 0 0 .75-.75V3.5H9Z" />,
    ),
  },
  {
    title: "כל מכשיר",
    subtitle: "Web · Desktop",
    glyph: GLYPH(
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3h13A1.5 1.5 0 0 1 20 4.5v10a1.5 1.5 0 0 1-1.5 1.5H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H5.5A1.5 1.5 0 0 1 4 14.5v-10Zm2 .5v9h12V5H6Z" />,
    ),
  },
];

export function MamashkimHero({ content }: { content?: MamashkimHeroContent }) {
  const c = content ?? mamashkimContent.hero;
  const t = c.titleLines;
  return (
    <section
      dir="rtl"
      aria-label="ממשקים — הירו"
      className="relative isolate overflow-hidden bg-paper pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <SoftGlow />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="text-right">
          <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[1.04] tracking-[-0.035em] text-ink">
            {t[0]}
            <br />
            {t[1]}
            <br />
            <span style={{ color: TEAL }}>{t[2]}</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-fg sm:text-lg"
            dangerouslySetInnerHTML={{ __html: c.sub }}
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" href="#contact" withArrow>
              {c.ctaLabel}
            </Button>
          </div>

          <p className="mt-10 text-sm text-muted-fg">
            {c.footnote}
          </p>
        </div>

        {/* Living console mockup — hidden on mobile (complex 3-col grid does not fit < md) */}
        <div className="hidden md:block">
          <IntegrationConsole hero={c} />
        </div>
      </div>

      {/* Scoped styles for the console (beam-flow + hub-ring + aura animations) */}
      <style jsx>{`
        @keyframes wendi-beam-flow {
          to { stroke-dashoffset: -310; }
        }
        @keyframes wendi-hub-ring {
          0%   { opacity: .8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.7); }
        }
        @keyframes wendi-console-aura {
          to { transform: rotate(360deg); }
        }
        @keyframes wendi-tag-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(13,148,136,.22); }
          50%      { box-shadow: 0 0 0 6px rgba(13,148,136,.05); }
        }
      `}</style>
    </section>
  );
}

function IntegrationConsole({ hero }: { hero: MamashkimHeroContent }) {
  // merge editable title/subtitle onto visual row defs by index (logo/glyph in code)
  const leftRows = LEFT_ROWS.map((r, i) => ({ ...r, title: hero.leftRows[i]?.title ?? r.title, subtitle: hero.leftRows[i]?.subtitle ?? r.subtitle }));
  const rightRows = RIGHT_ROWS.map((r, i) => ({ ...r, title: hero.rightRows[i]?.title ?? r.title, subtitle: hero.rightRows[i]?.subtitle ?? r.subtitle }));
  return (
    <div
      aria-label="Wendi integration console"
      className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl border bg-white p-[22px]"
      style={{
        isolation: "isolate",
        borderColor: "rgba(15,23,42,0.10)",
        boxShadow:
          "0 20px 40px -20px rgba(15,23,42,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >

      {/* Top bar: traffic lights + URL + LIVE badge */}
      <div className="mb-[14px] flex items-center gap-2 border-b border-line px-1 pb-[14px]">
        <span className="block h-[11px] w-[11px] rounded-full" style={{ background: "#FF6058" }} />
        <span className="block h-[11px] w-[11px] rounded-full" style={{ background: "#FEBC30" }} />
        <span className="block h-[11px] w-[11px] rounded-full" style={{ background: "#28C840" }} />
        <span
          className="ms-auto text-xs font-semibold text-muted-fg"
          dir="ltr"
          style={{ letterSpacing: "0.01em" }}
        >
          wendi://connect.live
        </span>
      </div>

      {/* Beam SVG layer */}
      <svg
        className="pointer-events-none absolute z-0"
        style={{ inset: "56px 22px 22px" }}
        viewBox="0 0 460 360"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="beam-grad-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.4" />
            <stop offset="50%" stopColor={TEAL} stopOpacity="0.9" />
            <stop offset="100%" stopColor={TEAL_BRIGHT} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="beam-grad-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={TEAL_BRIGHT} stopOpacity="1" />
            <stop offset="50%" stopColor={TEAL} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g>
          {BEAM_PATHS.map((d, i) => (
            <path
              key={`b-${i}`}
              d={d}
              fill="none"
              stroke="rgba(13,148,136,0.10)"
              strokeWidth={1.5}
            />
          ))}
        </g>
        <g>
          {BEAM_PATHS.map((d, i) => {
            const isLeft = i < 5;
            return (
              <path
                key={`f-${i}`}
                d={d}
                fill="none"
                stroke={`url(#beam-grad-${isLeft ? "left" : "right"})`}
                strokeWidth={2}
                strokeLinecap="round"
                style={{
                  strokeDasharray: "10 300",
                  animation: `wendi-beam-flow 2.4s linear infinite`,
                  animationDelay: `${(i % 5) * 0.3}s`,
                  filter: "drop-shadow(0 0 6px rgba(13,148,136,0.55))",
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* 3-col grid: left systems | hub | right systems */}
      <div
        className="relative z-10 grid items-center gap-[14px]"
        style={{ gridTemplateColumns: "1fr 128px 1fr", minHeight: 360 }}
      >
        <div className="flex flex-col gap-[9px]">
          {leftRows.map((row) => (
            <SystemRow key={row.title} row={row} />
          ))}
        </div>

        <Hub />

        <div className="flex flex-col gap-[9px]">
          {rightRows.map((row) => (
            <TouchpointRow key={row.title} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Cubic beam paths — left side & right side, all converging on hub at (230,180)
const BEAM_PATHS = [
  "M 30 30   C 140 30,  140 180, 230 180",
  "M 30 105  C 150 105, 150 180, 230 180",
  "M 30 180  C 155 180, 155 180, 230 180",
  "M 30 255  C 150 255, 150 180, 230 180",
  "M 30 330  C 140 330, 140 180, 230 180",
  "M 230 180 C 310 180, 310 30,  430 30",
  "M 230 180 C 320 180, 320 105, 430 105",
  "M 230 180 C 325 180, 325 180, 430 180",
  "M 230 180 C 320 180, 320 255, 430 255",
  "M 230 180 C 310 180, 310 330, 430 330",
];

// Shared row shell — keeps both columns visually consistent.
function RowShell({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "system" | "touchpoint";
}) {
  // Borderless row — the outer rectangle frame was visual noise that competed
  // with the circular icon. We keep the layout (padding + gap) but drop the
  // border, background fill, and box-shadow so the icon and text breathe
  // directly on the console's white surface.
  void variant;
  return (
    <div className="group relative flex items-center gap-2.5 px-3 py-[11px] text-[0.84rem] font-semibold text-ink-2 transition-transform duration-300 hover:-translate-x-1">
      {children}
    </div>
  );
}

function Badge({ kind }: { kind: "SYNC" | "LIVE" }) {
  return (
    <span
      className="relative ms-auto rounded-full px-2 py-0.5 text-[0.65rem] font-bold"
      style={{
        background:
          "linear-gradient(135deg, rgba(13,148,136,0.16), rgba(62,207,190,0.10))",
        color: TEAL,
        letterSpacing: "0.04em",
        boxShadow: "0 0 0 1px rgba(13,148,136,0.18) inset",
      }}
    >
      {kind}
    </span>
  );
}

// Left column row — real brand logo, monogram tile, or initial-only token.
function SystemRow({ row }: { row: LeftRow }) {
  const isMono = !!row.mono;
  return (
    <RowShell variant="system">
      <span
        className="relative inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
        style={
          isMono
            ? {
                background: `linear-gradient(135deg, ${row.mono!.from} 0%, ${row.mono!.to} 100%)`,
                color: "#FFFFFF",
                boxShadow:
                  "0 2px 6px -2px rgba(15,23,42,0.18), 0 0 0 1px rgba(255,255,255,0.6) inset",
              }
            : {
                background: "#FFFFFF",
                padding: "2px",
                boxShadow:
                  "0 1px 2px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.08) inset",
              }
        }
      >
        {row.logo ? (
          <Image
            src={row.logo}
            alt={`${row.title} logo`}
            width={40}
            height={40}
            className="h-full w-full object-contain"
            unoptimized
          />
        ) : row.mono ? (
          <span className="text-[1.05rem] font-extrabold leading-none">
            {row.mono.char}
          </span>
        ) : (
          <span
            className="font-mono text-[0.75rem] font-bold"
            style={{ color: TEAL }}
          >
            {row.initial}
          </span>
        )}
      </span>
      <span className="relative flex flex-col gap-0.5 leading-[1.2]">
        <span>{row.title}</span>
        <small className="text-[0.68rem] font-medium text-muted-fg">
          {row.subtitle}
        </small>
      </span>
    </RowShell>
  );
}

// Right column row — filled monochrome glyphs in same circular white treatment as left column.
function TouchpointRow({ row }: { row: RightRow }) {
  return (
    <RowShell variant="touchpoint">
      <span
        className="relative inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105"
        style={{
          color: "#0F766E",
          boxShadow:
            "0 1px 2px rgba(15,23,42,0.04), 0 0 0 1px rgba(13,148,136,0.18) inset",
        }}
      >
        {row.glyph}
      </span>
      <span className="relative flex flex-col gap-0.5 leading-[1.2]">
        <span>{row.title}</span>
        <small className="text-[0.68rem] font-medium text-muted-fg">
          {row.subtitle}
        </small>
      </span>
    </RowShell>
  );
}

function Hub() {
  // Brand W = two overlapping triangles (teal-turquoise + blue), exactly like wendi-logo.png
  const TEAL_BRAND = "#3FB7A8";
  const BLUE_BRAND = "#3D7DB8";

  return (
    <div className="relative mx-auto">
      {/* Ambient teal glow — gives the hub real presence as the system's center. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.22) 0%, rgba(62,207,190,0.12) 35%, transparent 65%)",
          transform: "scale(1.85)",
          filter: "blur(8px)",
        }}
      />

      <div
        className="relative flex h-[128px] w-[128px] items-center justify-center overflow-hidden rounded-[34px] bg-white"
        style={{
          border: "1px solid rgba(13,148,136,0.18)",
          boxShadow:
            "0 18px 40px -12px rgba(13,148,136,0.32), 0 4px 10px -2px rgba(15,23,42,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        {/* Pulsing rings — brand teal, signals the hub as 'live'. */}
        <span
          aria-hidden
          className="absolute inset-[-2px] rounded-[inherit] border-2"
          style={{
            borderColor: "rgba(13,148,136,0.30)",
            animation: "wendi-hub-ring 2.4s ease-out infinite",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-[-2px] rounded-[inherit] border-2"
          style={{
            borderColor: "rgba(13,148,136,0.30)",
            animation: "wendi-hub-ring 2.4s ease-out infinite",
            animationDelay: "1.2s",
          }}
        />

        {/* W mark — two overlapping inverted triangles. Dark center is the natural overlap (multiply blend). */}
        <svg
          viewBox="0 0 100 100"
          className="relative h-[68%] w-[68%]"
          aria-label="Wendi"
        >
          {/*
            Each triangle is an inverted V:
              - apex at the bottom-center
              - flat baseline at the top
            They overlap horizontally in the middle, and the multiply blend
            produces the darker wedge naturally — no third polygon needed.
          */}
          <g style={{ mixBlendMode: "multiply" }}>
            {/* Left inverted triangle — teal. Apex slightly RIGHT of center. */}
            <polygon points="6,10 58,10 38,90" fill={TEAL_BRAND} />
            {/* Right inverted triangle — blue. Apex slightly LEFT of center. */}
            <polygon points="42,10 94,10 62,90" fill={BLUE_BRAND} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SoftGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-48 right-[-10%] h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.12), transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] left-[-15%] h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(62,207,190,0.10), transparent 65%)",
        }}
      />
    </div>
  );
}
