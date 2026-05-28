"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % modules.length);
    }, 3400);
    return () => clearInterval(interval);
  }, []);

  const current = modules[currentCard];
  const moduleNumber = String(currentCard + 1).padStart(2, "0");
  const total = String(modules.length).padStart(2, "0");

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
              className={`h-72 w-full rounded-3xl shadow-2xl transition-all duration-1000 ${
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

      {/* Foreground active card */}
      <div
        className="relative z-10 flex h-72 w-full flex-col rounded-3xl p-6 shadow-2xl transition-all duration-1000 ease-in-out"
        style={{ background: current.color }}
      >
        <div className="flex h-full flex-col rounded-2xl bg-white/25 p-5 backdrop-blur-sm transition-all duration-500">
          {/* Header row */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/90 transition-transform duration-300 hover:scale-110" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/90 transition-transform duration-300 hover:scale-110" />
              <span className="h-3 w-3 rounded-full bg-green-500/90 transition-transform duration-300 hover:scale-110" />
            </div>
            <span className="rounded-full bg-white/35 px-3 py-1 text-[11px] font-bold tabular-nums text-white">
              <span className="opacity-80">מודול</span>{" "}
              <span>
                {moduleNumber}
                <span className="opacity-50">/{total}</span>
              </span>
            </span>
          </div>

          {/* Module short label as eyebrow */}
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white opacity-85">
            {current.shortLabel}
          </div>

          {/* Module title */}
          <h3 className="mb-3 text-balance text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
            {current.subtitle}
          </h3>

          {/* Teaser */}
          <p className="text-[0.95rem] leading-[1.65] text-white opacity-95">
            {TEASERS[current.id] ?? ""}
          </p>

          {/* Footer link */}
          <div className="mt-auto flex items-center justify-end gap-1.5 pt-3 text-sm font-bold text-white">
            <span>למידע נוסף</span>
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </div>
        </div>
      </div>

      {/* Indicator dots — each tinted by its module color */}
      <div className="mt-8 flex justify-center gap-2">
        {modules.map((m, index) => {
          const isActive = currentCard === index;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setCurrentCard(index)}
              aria-label={`הצג ${m.shortLabel}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? "w-6" : "w-2 bg-slate-300 hover:bg-slate-500"
              }`}
              style={isActive ? { background: m.color } : undefined}
            />
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
