"use client";

import { Button } from "@/components/ui/Button";

const TEAL = "#0D9488";
const TEAL_BRIGHT = "#3ECFBE";
const INK = "#0A0A0A";

// Brand-aligned: every icon chip is teal, only intensity varies for hierarchy.
type ToneKey = "teal" | "teal-deep" | "ink";

const TONES: Record<ToneKey, { bg: string; fg: string }> = {
  "teal":      { bg: "rgba(13,148,136,0.10)", fg: TEAL },
  "teal-deep": { bg: "rgba(13,148,136,0.14)", fg: "#0F766E" },
  "ink":       { bg: "rgba(10,10,10,0.06)",   fg: INK },
};

type SysRow = {
  tone: ToneKey;
  title: string;
  subtitle: string;
  badge: "SYNC" | "LIVE";
  icon: React.ReactNode;
};

const ICO = (path: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ width: 16, height: 16 }}
  >
    {path}
  </svg>
);

// Left column — backend systems (SYNC)
const LEFT_ROWS: SysRow[] = [
  {
    tone: "teal",
    title: "SAP HR",
    subtitle: "נתוני עובדים",
    badge: "SYNC",
    icon: ICO(
      <>
        <rect width={20} height={14} x={2} y={3} rx={2} />
        <line x1={8} x2={16} y1={21} y2={21} />
        <line x1={12} x2={12} y1={17} y2={21} />
      </>,
    ),
  },
  {
    tone: "teal-deep",
    title: "Synerion",
    subtitle: "נוכחות ומשמרות",
    badge: "SYNC",
    icon: ICO(
      <>
        <circle cx={12} cy={12} r={10} />
        <polyline points="12 6 12 12 16 14" />
      </>,
    ),
  },
  {
    tone: "teal",
    title: "Power BI",
    subtitle: "מדדים",
    badge: "SYNC",
    icon: ICO(
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M7 16h2v3H7zM12 11h2v8h-2zM17 7h2v12h-2z" fill="currentColor" />
      </>,
    ),
  },
  {
    tone: "teal-deep",
    title: "Legacy API",
    subtitle: "מותאם אישית",
    badge: "SYNC",
    icon: ICO(
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
    ),
  },
  {
    tone: "teal",
    title: "Comeet",
    subtitle: "גיוס",
    badge: "SYNC",
    icon: ICO(
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx={9} cy={7} r={4} />
      </>,
    ),
  },
];

// Right column — user touchpoints (LIVE)
const RIGHT_ROWS: SysRow[] = [
  {
    tone: "ink",
    title: "מנהל",
    subtitle: "דשבורד ניהולי",
    badge: "LIVE",
    icon: ICO(
      <>
        <rect width={20} height={14} x={2} y={7} rx={2} />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>,
    ),
  },
  {
    tone: "ink",
    title: "עובד שטח",
    subtitle: "נייד",
    badge: "LIVE",
    icon: ICO(
      <>
        <path d="M2.5 12a9.5 9.5 0 0 1 19 0" />
        <circle cx={12} cy={11} r={4} />
        <path d="M18 21a8 8 0 0 0-12 0" />
      </>,
    ),
  },
  {
    tone: "ink",
    title: "קליני",
    subtitle: "עמדה נייחת",
    badge: "LIVE",
    icon: ICO(
      <>
        <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
        <path d="M14 14h-4M14 18h-4M14 8h-4" />
      </>,
    ),
  },
  {
    tone: "ink",
    title: "מובייל",
    subtitle: "iOS · Android",
    badge: "LIVE",
    icon: ICO(
      <>
        <rect width={14} height={20} x={5} y={2} rx={2} />
        <path d="M12 18h.01" />
      </>,
    ),
  },
  {
    tone: "ink",
    title: "כל מכשיר",
    subtitle: "Web · Desktop",
    badge: "LIVE",
    icon: ICO(
      <>
        <circle cx={12} cy={12} r={10} />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </>,
    ),
  },
];

export function MamashkimHero() {
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
            וונדי מתחברת
            <br />
            לארגון שלכם —
            <br />
            <span style={{ color: TEAL }}>באמת.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-fg sm:text-lg">
            בניגוד לפלטפורמות מדף, וונדי היא חברת מוצר שמבצעת ממשקים ייעודיים
            לפי צורך ארגוני, כדי לספק לעובדים{" "}
            <strong className="font-bold text-ink">One Stop Shop</strong>{" "}
            אמיתי.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" href="#contact" withArrow>
              דברו איתנו על אינטגרציה
            </Button>
            <Button variant="secondary" href="#different">
              ראו את ההבדל
            </Button>
          </div>

          <p className="mt-10 text-sm text-muted-fg">
            +30 מערכות שכבר התחברנו אליהן · HR, שכר, נוכחות, BI, גיוס, למידה,
            תפעול.
          </p>
        </div>

        {/* Living console mockup */}
        <IntegrationConsole />
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

function IntegrationConsole() {
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
        style={{ gridTemplateColumns: "1fr 110px 1fr", minHeight: 360 }}
      >
        <div className="flex flex-col gap-[9px]">
          {LEFT_ROWS.map((row) => (
            <SysrowItem key={row.title} row={row} />
          ))}
        </div>

        <Hub />

        <div className="flex flex-col gap-[9px]">
          {RIGHT_ROWS.map((row) => (
            <SysrowItem key={row.title} row={row} />
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

function SysrowItem({ row }: { row: SysRow }) {
  const tone = TONES[row.tone];
  const isTeal = row.tone !== "ink";
  return (
    <div
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-[11px] text-[0.84rem] font-semibold text-ink-2 transition-all duration-300 hover:-translate-x-1"
      style={{
        borderColor: isTeal ? "rgba(13,148,136,0.16)" : "rgba(10,10,10,0.10)",
        background: isTeal
          ? "linear-gradient(135deg, #FFFFFF 0%, #F4FBF9 100%)"
          : "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      {/* Hover-only teal sheen sliding across the row */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(13,148,136,0.06) 50%, transparent 70%)",
        }}
      />
      <span
        className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105"
        style={{
          background: isTeal
            ? "linear-gradient(135deg, rgba(13,148,136,0.14), rgba(62,207,190,0.10))"
            : "linear-gradient(135deg, rgba(10,10,10,0.08), rgba(10,10,10,0.04))",
          color: tone.fg,
          boxShadow: isTeal
            ? "0 4px 12px -4px rgba(13,148,136,0.30), 0 0 0 1px rgba(13,148,136,0.12) inset"
            : "0 4px 12px -4px rgba(10,10,10,0.15), 0 0 0 1px rgba(10,10,10,0.06) inset",
        }}
      >
        {row.icon}
      </span>
      <span className="relative flex flex-col gap-0.5 leading-[1.2]">
        <span>{row.title}</span>
        <small className="text-[0.68rem] font-medium text-muted-fg">
          {row.subtitle}
        </small>
      </span>
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
        {row.badge}
      </span>
    </div>
  );
}

function Hub() {
  // Brand W = two overlapping triangles (teal-turquoise + blue), exactly like wendi-logo.png
  const TEAL_BRAND = "#3FB7A8";
  const BLUE_BRAND = "#3D7DB8";

  return (
    <div className="relative mx-auto">
      <div
        className="relative flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-[30px] bg-white"
        style={{
          border: "1px solid rgba(15,23,42,0.10)",
          boxShadow:
            "0 12px 30px -10px rgba(15,23,42,0.18), 0 2px 6px -2px rgba(15,23,42,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        {/* Pulsing rings — neutral, subtle */}
        <span
          aria-hidden
          className="absolute inset-[-2px] rounded-[inherit] border-2"
          style={{
            borderColor: "rgba(15,23,42,0.10)",
            animation: "wendi-hub-ring 2.4s ease-out infinite",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-[-2px] rounded-[inherit] border-2"
          style={{
            borderColor: "rgba(15,23,42,0.10)",
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
