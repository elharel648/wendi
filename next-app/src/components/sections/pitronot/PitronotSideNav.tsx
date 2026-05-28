"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sectors } from "@/content/pitronot";

const expo = [0.22, 1, 0.36, 1] as const;

export function PitronotSideNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.intersectionRatio);
        });
        let bestId: string | null = null;
        let best = 0;
        ratios.forEach((r, id) => {
          if (r > best) {
            best = r;
            bestId = id;
          }
        });
        setActiveId(best > 0 ? bestId : null);
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
        rootMargin: "-30% 0px -30% 0px",
      },
    );

    sectors.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <AnimatePresence>
      {activeId && (
        <motion.aside
          dir="rtl"
          aria-label="ניווט מגזרים"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.8, ease: expo }}
          className="pointer-events-none fixed start-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
        >
          <ul className="pointer-events-auto relative flex flex-col gap-2.5">
            {/* Vertical rail line behind dots */}
            <span
              aria-hidden
              className="absolute start-5 top-5 bottom-5 w-px bg-slate-200/80"
            />

            {sectors.map((s) => {
              const isActive = s.id === activeId;
              const isHovered = s.id === hoveredId;
              const showLabel = isActive || isHovered;
              return (
                <li key={s.id} className="relative">
                  <button
                    type="button"
                    onClick={() => handleClick(s.id)}
                    onMouseEnter={() => setHoveredId(s.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(s.id)}
                    onBlur={() => setHoveredId(null)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`עבור למגזר ${s.short}`}
                    className="group relative flex items-center focus:outline-none"
                  >
                    {/* Index circle */}
                    <motion.span
                      className="relative z-10 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-[11px] font-black tabular-nums"
                      animate={{
                        background: isActive ? s.color : "#ffffff",
                        color: isActive ? "#ffffff" : "#64748b",
                        boxShadow: isActive
                          ? `0 8px 24px ${s.color}55, 0 0 0 1px ${s.color}`
                          : isHovered
                            ? `0 4px 14px rgba(15,23,42,0.10), 0 0 0 1px ${s.color}60`
                            : "0 2px 10px rgba(15,23,42,0.07), 0 0 0 1px rgba(15,23,42,0.04)",
                        scale: isHovered && !isActive ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.5, ease: expo }}
                    >
                      {s.num}

                      {/* Pulsing ring on active */}
                      {isActive && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          initial={{ boxShadow: `0 0 0 0 ${s.color}55` }}
                          animate={{
                            boxShadow: [
                              `0 0 0 0 ${s.color}55`,
                              `0 0 0 14px ${s.color}00`,
                            ],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                    </motion.span>

                    {/* Label — slides out inline (toward end / left in RTL) */}
                    <AnimatePresence>
                      {showLabel && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, marginInlineStart: 0 }}
                          animate={{
                            opacity: 1,
                            width: "auto",
                            marginInlineStart: 12,
                          }}
                          exit={{
                            opacity: 0,
                            width: 0,
                            marginInlineStart: 0,
                          }}
                          transition={{ duration: 0.55, ease: expo }}
                          className="overflow-hidden whitespace-nowrap rounded-full px-4 py-2 text-[0.82rem] font-bold leading-tight"
                          style={{
                            background: "#ffffff",
                            color: isActive ? s.color : "#475569",
                            boxShadow: `0 6px 20px rgba(15,23,42,0.10), inset 0 0 0 1px ${isActive ? s.color + "40" : "rgba(15,23,42,0.06)"}`,
                          }}
                        >
                          {s.short}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
