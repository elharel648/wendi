"use client";

import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { modules } from "@/content/modulim";

const TEASERS: Record<string, string> = {
  portal:
    "בכל מכשיר, בכל רגע — אנשי קשר, חוגגים, אזור אישי, אירועים ונהלים.",
  workflow:
    "Pre-Boarding, חופשות, החזרי הוצאות — בתהליך מסודר עם סבבי אישורים.",
  lms: "למידה מתוקשבת, הסמכות, תעודות אוטומטיות וקליטת עובדים חדשים.",
  performance:
    "טופס פר-עובד, תהליכים לפי קבוצות, מנגנון התראות חכם ודשבורד ניהולי.",
};

export function FluxCardHero() {
  const [currentCard, setCurrentCard] = useState(0);
  // Once the user drags or taps a dot, stop the auto-rotation for good.
  const [userControlled, setUserControlled] = useState(false);

  useEffect(() => {
    if (userControlled) return;
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % modules.length);
    }, 3400);
    return () => clearInterval(interval);
  }, [userControlled]);

  const goTo = (index: number) => {
    setUserControlled(true);
    setCurrentCard((index + modules.length) % modules.length);
  };

  // RTL: dragging the card to the left advances to the NEXT module.
  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const threshold = 60;
    const { offset, velocity } = info;
    if (offset.x < -threshold || velocity.x < -400) {
      goTo(currentCard + 1);
    } else if (offset.x > threshold || velocity.x > 400) {
      goTo(currentCard - 1);
    }
  };

  const current = modules[currentCard];

  return (
    <div className="relative mx-auto w-full max-w-3xl" dir="rtl">
      {/* Stacked background cards — staggered rotations, animate when their index becomes active */}
      {modules.map((m, i) => {
        const layout = LAYOUTS[i];
        const isActive = currentCard === i;
        return (
          <div
            key={`bg-${m.id}`}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${layout.wrapper}`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <div
              className={`h-64 w-full rounded-3xl shadow-2xl transition-all duration-1000 sm:h-72 ${
                isActive ? "scale-105" : ""
              }`}
              style={{
                background: m.color,
                opacity: isActive ? layout.activeOpacity : layout.idleOpacity,
              }}
            />
          </div>
        );
      })}

      {/* Foreground active card — draggable left/right to switch modules */}
      <motion.div
        className="relative z-10 flex h-64 w-full cursor-grab flex-col rounded-3xl p-4 shadow-2xl transition-colors duration-1000 ease-in-out active:cursor-grabbing sm:h-72 sm:p-6"
        style={{ background: current.color }}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.18}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        <div className="pointer-events-none flex h-full flex-col rounded-2xl bg-white/25 p-4 backdrop-blur-sm transition-all duration-500 sm:p-5">
          {/* Module short label as eyebrow */}
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white opacity-85">
            {current.shortLabel}
          </div>

          {/* Module title */}
          <h3 className="mb-3 text-balance text-xl font-black leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
            {current.subtitle}
          </h3>

          {/* Teaser */}
          <p className="text-[0.88rem] leading-[1.55] text-white opacity-95 sm:text-[0.95rem] sm:leading-[1.65]">
            {TEASERS[current.id] ?? ""}
          </p>

          {/* Footer link */}
          <div className="mt-auto flex items-center justify-end gap-1.5 pt-3 text-sm font-bold text-white">
            <span>למידע נוסף</span>
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </div>
        </div>
      </motion.div>

      {/* Indicator dots — each tinted by its module color */}
      <div className="mt-6 flex justify-center gap-2 sm:mt-8">
        {modules.map((m, index) => {
          const isActive = currentCard === index;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`הצג ${m.shortLabel}`}
              aria-current={isActive ? "true" : undefined}
              className="grid h-11 place-items-center px-1.5"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-6" : "w-2 bg-slate-300 hover:bg-slate-500"
                }`}
                style={isActive ? { background: m.color } : undefined}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Per-card stagger: rotation, opacity, and which index "pops" when active. */
const LAYOUTS = [
  { wrapper: "rotate-1 scale-[0.98]", idleOpacity: 0.4, activeOpacity: 0.6 },
  { wrapper: "-rotate-3 scale-95", idleOpacity: 0.5, activeOpacity: 0.7 },
  { wrapper: "rotate-2 scale-[0.96]", idleOpacity: 0.6, activeOpacity: 0.8 },
  { wrapper: "-rotate-1 scale-[0.97]", idleOpacity: 0.5, activeOpacity: 0.7 },
];

export default FluxCardHero;
