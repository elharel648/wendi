"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, type Module } from "@/content/modulim";
import { ModulesBento } from "./ModulesBento";

const expo = [0.22, 1, 0.36, 1] as const;

export function ModulesTabs() {
  const [activeId, setActiveId] = useState<Module["id"]>(modules[0].id);

  return (
    <div dir="rtl" className="relative">
      {/* Bubble nav */}
      <nav
        aria-label="בחירת מודול"
        className="sticky top-16 z-30 bg-paper/85 px-4 py-5 backdrop-blur-md sm:px-6 md:top-20 md:py-6"
      >
        <ul className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
          {modules.map((m, i) => {
            const isActive = m.id === activeId;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(m.id)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`הצג מודול ${m.shortLabel}`}
                  className="group relative inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2.5 text-[0.85rem] font-bold leading-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-5 sm:py-3 sm:text-[0.95rem] md:px-6 md:text-[1rem]"
                  style={{
                    background: isActive ? m.color : "#ffffff",
                    color: isActive ? "#0f172a" : "#475569",
                    boxShadow: isActive
                      ? `0 10px 28px -10px ${m.color}90, 0 0 0 1.5px ${m.color}, inset 0 0 0 1px rgba(255,255,255,0.4)`
                      : `0 4px 14px rgba(15,23,42,0.06), 0 0 0 1px ${m.color}55`,
                  }}
                >
                  <span
                    aria-hidden
                    className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[0.7rem] font-black tabular-nums sm:h-7 sm:w-7 sm:text-[0.78rem]"
                    style={{
                      background: isActive
                        ? "rgba(255,255,255,0.55)"
                        : `${m.color}1f`,
                      color: isActive ? "#0f172a" : m.color,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap">{m.shortLabel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Active module */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: expo }}
        >
          <ModulesBento selectedId={activeId} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
