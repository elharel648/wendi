"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { sanitizeHtml } from "@/lib/sanitize";
import type { MamashkimHeroContent } from "@/content/mamashkim";
import { mamashkimContent } from "@/content/mamashkim";

const TEAL = "#0D9488";

/* ───────────────────────────── Node model ─────────────────────────────
 * A redesigned hub-and-spoke: systems sit in two balanced columns around the
 * Wendi hub, each connected with a thin glowing spoke that pulses light
 * *inward*. The whole thing lives in a deep "console" panel (Linear/Vercel
 * style) — a local dark surface on the otherwise light page, NOT a site-wide
 * dark mode.
 *
 * Array ORDER drives layout: the first half fill the right column top→bottom,
 * the second half fill the left column. Real brand SVGs are used where we have
 * them; everything else gets a clean monogram tile. */
type Node = {
  title: string;
  logo?: string;
  mono?: { char: string; from: string; to: string };
};

// 8 nodes — first 4 = right column, last 4 = left column (each top→bottom).
const NODES: Node[] = [
  { title: "SAP HR", logo: "/logos-systems/sap.svg" },
  { title: "Synerion", logo: "/logos-systems/synerion.svg" },
  { title: "Power BI", logo: "/logos-systems/powerbi.svg" },
  { title: "Comeet", mono: { char: "C", from: "#FF6200", to: "#FF8C00" } },
  { title: "Priority", mono: { char: "P", from: "#2563EB", to: "#3B82F6" } },
  { title: "Hilan", mono: { char: "H", from: "#7C3AED", to: "#A855F7" } },
  { title: "Moodle", mono: { char: "M", from: "#EA580C", to: "#F97316" } },
  { title: "Teams", mono: { char: "T", from: "#4F46E5", to: "#6366F1" } },
];

export function MamashkimHero({ content }: { content?: MamashkimHeroContent }) {
  const c = content ?? mamashkimContent.hero;
  const t = c.titleLines;
  // Node labels are brand names tied 1:1 to their logos in code. They are NOT
  // merged from CMS heroLeftRows: that field has its own order/content (from the
  // old two-column hero) and index-merging mismatches labels onto wrong logos.
  // CMS still drives the headline, sub and CTA.
  const nodes = NODES;

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
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(c.sub) }}
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" href="#contact" withArrow className="rounded-full">
              {c.ctaLabel}
            </Button>
          </div>
        </div>

        {/* The same constellation hub on every size — it's aspect-square with a
            max width, so it scales down cleanly on phones (no separate cramped
            mobile grid). */}
        <ConstellationHub nodes={nodes} />
      </div>

      <style jsx>{`
        @keyframes wendi-spoke-flow {
          to {
            stroke-dashoffset: -120;
          }
        }
        @keyframes wendi-ring-pulse {
          0% {
            opacity: 0.5;
            transform: scale(0.96);
          }
          70% {
            opacity: 0;
            transform: scale(1.35);
          }
          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }
        @keyframes wendi-node-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.82);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.wendi-anim) {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────── The constellation panel ───────────────────────── */
function ConstellationHub({ nodes }: { nodes: Node[] }) {
  const SIZE = 460;
  const C = SIZE / 2;
  const HUB_R = 46; // hub visual radius (spokes start just outside it)

  // Two balanced columns around the hub (reference layout): the first half of
  // the nodes sit on the right column, the second half on the left — each
  // column evenly spaced vertically, so everything lines up in clean rows.
  const half = Math.ceil(nodes.length / 2);
  const COL_X = { right: 0.83, left: 0.17 } as const; // fraction of SIZE
  const ROW_TOP = 0.17;
  const ROW_BOTTOM = 0.83;

  const layout = nodes.map((n, i) => {
    const col = i < half ? "right" : "left";
    const idxInCol = i < half ? i : i - half;
    const countInCol = i < half ? half : nodes.length - half;
    const t = countInCol > 1 ? idxInCol / (countInCol - 1) : 0.5;
    const yFrac = ROW_TOP + t * (ROW_BOTTOM - ROW_TOP);
    return { node: n, xFrac: COL_X[col], yFrac, x: COL_X[col] * SIZE, y: yFrac * SIZE };
  });

  // Spoke endpoints: from just outside the hub to just inside each node icon.
  const ICON_R = 26;
  const spokeEnds = (x: number, y: number) => {
    const dx = x - C;
    const dy = y - C;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    return {
      x1: x - ux * ICON_R,
      y1: y - uy * ICON_R,
      x2: C + ux * (HUB_R + 6),
      y2: C + uy * (HUB_R + 6),
    };
  };

  return (
    <div
      aria-label="Wendi integration network"
      className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-[28px]"
      style={{
        // Deep console surface — local dark panel, Linear/Vercel flavour.
        background:
          "radial-gradient(120% 120% at 50% 0%, #122a37 0%, #0b1a24 55%, #07131b 100%)",
        border: "1px solid rgba(62,207,190,0.16)",
        boxShadow:
          "0 30px 80px -36px rgba(7,19,27,0.65), 0 1px 0 rgba(255,255,255,0.05) inset",
      }}
    >
      {/* fine dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(120,180,200,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, #000 30%, transparent 80%)",
        }}
      />

      {/* top status bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-5 pt-4">
        <span className="h-[10px] w-[10px] rounded-full" style={{ background: "#FF6058" }} />
        <span className="h-[10px] w-[10px] rounded-full" style={{ background: "#FEBC30" }} />
        <span className="h-[10px] w-[10px] rounded-full" style={{ background: "#28C840" }} />
        <span
          dir="ltr"
          className="ms-auto font-mono text-[11px] tracking-tight text-[#5e8a93]"
        >
          wendi://connect.live
        </span>
      </div>

      {/* SVG: spokes (under the DOM nodes) */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hub-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(62,207,190,0.55)" />
            <stop offset="55%" stopColor="rgba(13,148,136,0.18)" />
            <stop offset="100%" stopColor="rgba(13,148,136,0)" />
          </radialGradient>
          <linearGradient id="spoke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(62,207,190,0)" />
            <stop offset="100%" stopColor="rgba(62,207,190,0.9)" />
          </linearGradient>
        </defs>

        {/* hub halo */}
        <circle cx={C} cy={C} r={150} fill="url(#hub-halo)" />

        {/* static base spokes */}
        {layout.map(({ x, y }, i) => {
          const s = spokeEnds(x, y);
          return (
            <line
              key={`base-${i}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="rgba(120,180,200,0.16)"
              strokeWidth={1}
            />
          );
        })}

        {/* animated light flowing inward to the hub */}
        {layout.map(({ x, y }, i) => {
          const s = spokeEnds(x, y);
          return (
            <line
              key={`flow-${i}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="url(#spoke)"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="wendi-anim"
              style={{
                strokeDasharray: "6 200",
                animation: "wendi-spoke-flow 2.2s linear infinite",
                animationDelay: `${(i % nodes.length) * 0.22}s`,
              }}
            />
          );
        })}
      </svg>

      {/* DOM layer: hub + nodes, positioned by % so they scale with the panel */}
      <div className="absolute inset-0">
        {/* Hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <HubMark />
        </div>

        {/* Nodes — two balanced columns */}
        {layout.map(({ node, xFrac, yFrac }, i) => (
          <NodeChip
            key={node.title}
            node={node}
            leftPct={xFrac * 100}
            topPct={yFrac * 100}
            delay={i * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

/* The Wendi hub — W mark in a glowing teal-ringed tile with live pulse rings. */
function HubMark() {
  const TEAL_BRAND = "#3FB7A8";
  const BLUE_BRAND = "#5AA6E0";
  return (
    <div className="relative grid h-[92px] w-[92px] place-items-center">
      {[0, 1].map((k) => (
        <span
          key={k}
          aria-hidden
          className="wendi-anim absolute inset-0 rounded-[26px] border"
          style={{
            borderColor: "rgba(62,207,190,0.4)",
            animation: "wendi-ring-pulse 2.6s ease-out infinite",
            animationDelay: `${k * 1.3}s`,
          }}
        />
      ))}
      <div
        className="relative grid h-full w-full place-items-center rounded-[24px]"
        style={{
          background: "linear-gradient(160deg, #0f2b35 0%, #0a1f28 100%)",
          border: "1px solid rgba(62,207,190,0.5)",
          boxShadow:
            "0 0 0 6px rgba(62,207,190,0.06), 0 14px 36px -10px rgba(62,207,190,0.5), 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
      >
        <svg viewBox="0 0 100 100" className="h-[58%] w-[58%]" aria-label="Wendi">
          <g style={{ mixBlendMode: "screen" }}>
            <polygon points="6,12 58,12 38,90" fill={TEAL_BRAND} />
            <polygon points="42,12 94,12 62,90" fill={BLUE_BRAND} />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* A single orbit node — real logo or monogram tile + label, glows on hover. */
function NodeChip({
  node,
  leftPct,
  topPct,
  delay,
}: {
  node: Node;
  leftPct: number;
  topPct: number;
  delay: number;
}) {
  return (
    // The wrapper is exactly the icon's size and is centred on the ring point,
    // so every icon sits precisely on the circle. The label hangs below it
    // absolutely, so its height never shifts the icon off the ring.
    <div
      className="wendi-node group absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        animation: `wendi-node-in 0.6s ${delay}s both ease-out`,
      }}
    >
      <span
        className="relative grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
        style={
          node.mono
            ? {
                background: `linear-gradient(135deg, ${node.mono.from}, ${node.mono.to})`,
                color: "#fff",
                boxShadow:
                  "0 8px 20px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12) inset",
              }
            : {
                background: "rgba(255,255,255,0.96)",
                padding: 8,
                boxShadow:
                  "0 8px 20px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(62,207,190,0.18)",
              }
        }
      >
        {/* hover glow halo */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "0 0 22px 2px rgba(62,207,190,0.45)" }}
        />
        {node.logo ? (
          // Constrain every brand logo to the same centred box so logos of
          // different aspect ratios (SAP wide, Synerion tall…) read as evenly
          // sized across the tiles instead of each filling differently.
          <span className="flex h-[26px] w-[26px] items-center justify-center">
            <Image
              src={node.logo}
              alt={`${node.title} logo`}
              width={40}
              height={40}
              className="max-h-full max-w-full object-contain"
              unoptimized
            />
          </span>
        ) : (
          <span className="text-[1.1rem] font-extrabold leading-none">
            {node.mono?.char}
          </span>
        )}
      </span>
      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0a1f28]/70 px-2 py-0.5 text-[11px] font-semibold text-[#cfe7ea] backdrop-blur-sm">
        {node.title}
      </span>
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
