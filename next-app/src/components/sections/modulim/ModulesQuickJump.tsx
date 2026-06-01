"use client";

import { modules } from "@/content/modulim";

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
};

export function ModulesQuickJump({ activeId, onSelect }: Props) {
  return (
    <div
      dir="rtl"
      role="navigation"
      aria-label="קיצור דרך למודולים"
      className="relative z-10 bg-paper px-4 py-6 sm:px-6 md:py-8"
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
                className="rounded-full px-4 py-2 text-[0.85rem] font-bold text-slate-800 shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(15,23,42,0.08)]"
                style={{
                  background: m.colorSoft,
                  border: `1px solid ${m.color}`,
                  boxShadow: isActive
                    ? `0 0 0 2px ${m.color}, 0 4px 14px rgba(15,23,42,0.10)`
                    : undefined,
                }}
              >
                {m.shortLabel}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
