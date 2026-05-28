"use client";

import { motion } from "framer-motion";
import { sectors } from "@/content/pitronot";
import { Gravity, MatterBody } from "@/components/ui/gravity";

const expo = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0D9488";

// Drop positions distributed across the top — bubbles fall and settle with friction.
const DROP_SPOTS: Array<{ x: string; y: string; angle: number }> = [
  { x: "20%", y: "8%", angle: -8 },
  { x: "38%", y: "0%", angle: 6 },
  { x: "55%", y: "10%", angle: -4 },
  { x: "70%", y: "2%", angle: 10 },
  { x: "82%", y: "14%", angle: -12 },
  { x: "10%", y: "18%", angle: 14 },
];

export function PitronotHero() {
  return (
    <section
      dir="rtl"
      aria-label="פתרונות לפי מגזר — הירו"
      className="relative isolate overflow-hidden bg-paper px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
    >
      <SoftGlow />

      <div className="relative z-10 mx-auto max-w-7xl">
        <HeroHeadline />
      </div>

      {/* Gravity playground — bubbles drop, collide, settle, draggable.
          dir="ltr" is mandatory: Matter.js positions bodies via absolute left
          offsets, which break under RTL inheritance and push bubbles offscreen. */}
      <div
        dir="ltr"
        className="relative mt-10 h-[520px] w-full sm:h-[560px] md:h-[600px]"
      >
        <Gravity
          gravity={{ x: 0, y: 1 }}
          grabCursor
          addTopWall={false}
          className="absolute inset-0"
        >
          {sectors.map((s, i) => {
            const spot = DROP_SPOTS[i] ?? DROP_SPOTS[0];
            return (
              <MatterBody
                key={s.id}
                matterBodyOptions={{
                  friction: 0.35,
                  restitution: 0.45,
                  density: 0.0018,
                }}
                x={spot.x}
                y={spot.y}
                angle={spot.angle}
              >
                <a
                  href={`#${s.id}`}
                  dir="rtl"
                  className="flex cursor-grab select-none items-center gap-3 rounded-full px-5 py-3 text-white shadow-lg transition-transform active:cursor-grabbing sm:gap-4 sm:px-7 sm:py-4"
                  style={{
                    background: s.color,
                    boxShadow: `0 12px 28px -10px ${s.color}80, 0 0 0 1px rgba(255,255,255,0.18) inset`,
                  }}
                >
                  <span className="block h-5 w-5 sm:h-6 sm:w-6">{s.icon}</span>
                  <span className="whitespace-nowrap text-base font-bold sm:text-lg">
                    {s.short}
                  </span>
                </a>
              </MatterBody>
            );
          })}
        </Gravity>
      </div>

    </section>
  );
}

function HeroHeadline() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-black leading-[1.08] tracking-[-0.035em] text-ink">
        <span className="block">וונדי מותאמת לארגון שלכם —</span>
        <span className="block" style={{ color: TEAL }}>
          לא משנה באיזה מגזר
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.8] text-muted-fg sm:text-lg">
        כל מגזר מתמודד עם אתגרים שונים — רגולציה, פריסה, עומסים ואוכלוסיות
        מגוונות. פלטפורמה אחת עם התאמות, ממשקים ופתרונות ייעודיים לכל מגזר.
      </p>
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
