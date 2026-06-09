"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { AboutContent, FaqCategory } from "@/content/about";

type Props = { content: AboutContent["faq"] };
type FilterId = "all" | FaqCategory;

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Light FAQ — teal-accented filters, accordion with teal hover.
 */
export function FaqSection({ content }: Props) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const visible = content.items
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => filter === "all" || item.cat === filter);

  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:pt-20 md:pb-[140px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 md:px-16">
        <div className="flex w-full max-w-[1100px] flex-col items-center">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expo }}
          className="mb-8 flex flex-wrap justify-center gap-2 md:mb-12"
        >
          {content.filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  setOpenIdx(null);
                }}
                className="font-semibold whitespace-nowrap min-h-[44px] px-5 py-3 md:min-h-0 md:px-6 md:py-2.5"
                style={{
                  borderRadius: "999px",
                  fontSize: "0.88rem",
                  border: active
                    ? "1px solid #0D9488"
                    : "1px solid rgba(15,23,42,0.14)",
                  background: active
                    ? "linear-gradient(135deg, #2BADA0, #3ECFBE)"
                    : "transparent",
                  color: active ? "#fff" : "#475569",
                  boxShadow: active
                    ? "0 8px 24px rgba(13,148,136,0.32)"
                    : "none",
                  transition:
                    "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (active) return;
                  e.currentTarget.style.background = "#F8FAFC";
                  e.currentTarget.style.borderColor = "rgba(15,23,42,0.3)";
                  e.currentTarget.style.color = "#0F172A";
                }}
                onMouseLeave={(e) => {
                  if (active) return;
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(15,23,42,0.14)";
                  e.currentTarget.style.color = "#475569";
                }}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* List */}
        <div className="w-full max-w-[880px]">
          {visible.map(({ item, idx }, displayIdx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={`${filter}-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: expo, delay: 0.04 * displayIdx }}
                style={{
                  borderBottom: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-right"
                  style={{
                    padding: "26px 0",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: isOpen ? "#0D9488" : "#0F172A",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) e.currentTarget.style.color = "#0D9488";
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) e.currentTarget.style.color = "#0F172A";
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: "#0D9488",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    <Plus className="h-5 w-5" strokeWidth={2} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: expo }}
                      className="overflow-hidden"
                    >
                      <div
                        style={{
                          paddingBottom: "26px",
                          fontSize: "0.96rem",
                          lineHeight: 1.85,
                          color: "#475569",
                        }}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
