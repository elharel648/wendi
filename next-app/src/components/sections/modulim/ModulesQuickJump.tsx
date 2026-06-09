"use client";

import { motion } from "framer-motion";
import type { Module } from "@/content/modulim";

type Props = {
  modules: Module[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ModulesQuickJump({ modules, activeId, onSelect }: Props) {
  return (
    <div
      dir="rtl"
      role="navigation"
      aria-label="קיצור דרך למודולים"
      className="sticky top-0 z-30 border-b border-slate-100 bg-paper/85 px-4 py-4 backdrop-blur-md sm:px-6 md:py-5"
    >
      <ul className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {modules.map((m) => {
          const isActive = m.id === activeId;
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onSelect(m.id)}
                aria-pressed={isActive}
                aria-label={`הצג מודול ${m.shortLabel}`}
                className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.85rem] font-bold transition-transform duration-200 hover:-translate-y-[2px] sm:px-5"
                style={{
                  background: isActive ? "transparent" : m.colorSoft,
                  border: `1.5px solid ${m.color}`,
                  color: isActive ? "#fff" : "#1e293b",
                }}
              >
                {/* Active fill — animates between buttons via shared layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="quickjump-active"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background: m.gradient,
                      boxShadow: `0 6px 20px -4px ${m.color}, 0 0 0 1px ${m.color}`,
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  aria-hidden
                  className="h-2 w-2 flex-shrink-0 rounded-full transition-colors duration-200"
                  style={{ background: isActive ? "#fff" : m.color }}
                />
                <span className="relative z-10 whitespace-nowrap">{m.shortLabel}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}