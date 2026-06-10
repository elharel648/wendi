"use client";

import { onColor, type Module } from "@/content/modulim";

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
                className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.85rem] font-bold transition-all duration-200 hover:-translate-y-[2px] sm:px-5"
                style={{
                  // Every bubble is filled with its own colour — always vivid.
                  background: m.color,
                  color: onColor(m.color),
                  // The active one pops with a brighter ring + shadow; others sit calmer.
                  boxShadow: isActive
                    ? `0 8px 22px -4px ${m.color}, 0 0 0 3px #fff, 0 0 0 5px ${m.color}`
                    : `0 2px 8px -3px ${m.color}`,
                  opacity: isActive ? 1 : 0.82,
                  transform: isActive ? "scale(1.04)" : undefined,
                }}
              >
                <span className="relative z-10 whitespace-nowrap">{m.shortLabel}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}