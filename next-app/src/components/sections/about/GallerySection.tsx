"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AboutContent } from "@/content/about";

type Props = { content: AboutContent["gallery"] };

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Light Gallery — image accordion + video grid + dark lightbox (kept dark
 * for video viewing context).
 */
export function GallerySection({ content }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!openVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openVideo]);

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ padding: "80px 0 140px" }}
    >
      <div className="relative z-10 flex w-full justify-center px-6 md:px-16">
        <div className="w-full max-w-[1440px]">
        {/* ── Image accordion ─────────────── */}
        <div className="flex h-[340px] gap-[8px] md:h-[460px] md:gap-[12px]">
          {content.images.map((img, i) => {
            const active = activeImg === i;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveImg(i)}
                className={cn(
                  "group relative overflow-hidden transition-[flex] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active ? "flex-[4] md:flex-[5]" : "min-w-[52px] flex-1",
                )}
                style={{
                  borderRadius: "20px",
                  border: active
                    ? "1px solid rgba(13,148,136,0.4)"
                    : "1px solid rgba(15,23,42,0.08)",
                  boxShadow: active
                    ? "0 30px 60px -20px rgba(13,148,136,0.32)"
                    : "0 4px 16px -8px rgba(15,23,42,0.15)",
                  transition:
                    "flex 0.7s cubic-bezier(0.22,1,0.36,1), border-color 0.5s, box-shadow 0.5s",
                }}
                aria-label={img.caption}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* overlay */}
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: active
                      ? "linear-gradient(to top, rgba(15,23,42,0.6), transparent 60%)"
                      : "linear-gradient(to top, rgba(15,23,42,0.7), rgba(15,23,42,0.25) 50%, rgba(15,23,42,0.4))",
                    transition: "background 0.5s ease",
                  }}
                />
                {/* caption */}
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap font-bold text-white tracking-[-0.2px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active
                      ? "bottom-7 text-[1.1rem] md:text-[1.3rem]"
                      : "bottom-[85px] origin-center -rotate-90 text-[.9rem] md:text-[1.05rem]",
                  )}
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
                >
                  {img.caption}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Videos ─────────────── */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expo }}
            className="mb-10"
          >
            <div
              className="mb-3 text-xs font-bold uppercase"
              style={{ letterSpacing: "0.18em", color: "#0D9488" }}
            >
              Watch us in action
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                color: "#0F172A",
                marginBottom: "12px",
              }}
            >
              {content.videos.title}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.78,
                color: "#475569",
                maxWidth: "600px",
              }}
            >
              {content.videos.sub}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.videos.items.map((video, i) => (
              <motion.button
                key={video.youtubeId}
                type="button"
                onClick={() => setOpenVideo(video.youtubeId)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  ease: expo,
                  delay: 0.04 + (i % 3) * 0.06,
                }}
                className="group overflow-hidden text-right"
                style={{
                  borderRadius: "18px",
                  background: "#fff",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow:
                    "0 4px 12px -4px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                  transition:
                    "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(13,148,136,0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 30px 60px -20px rgba(15,23,42,0.15), 0 0 50px -10px rgba(13,148,136,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(15,23,42,0.08)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px -4px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.8)";
                }}
              >
                <div className="relative aspect-video overflow-hidden bg-[#F1F5F9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,23,42,0.45), transparent 60%)",
                    }}
                  />
                  <span
                    className="absolute left-1/2 top-1/2 z-[2] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-[350ms] group-hover:scale-[1.12]"
                    style={{
                      background:
                        "linear-gradient(135deg, #2BADA0, #3ECFBE)",
                      boxShadow: "0 12px 32px rgba(13,148,136,0.5)",
                    }}
                  >
                    <Play
                      className="h-6 w-6 -mr-0.5"
                      style={{ fill: "#fff", color: "#fff" }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    padding: "18px 20px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    lineHeight: 1.55,
                    color: "#0F172A",
                  }}
                >
                  {video.title}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Lightbox — stays dark for video viewing */}
      <AnimatePresence>
        {openVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenVideo(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 backdrop-blur-xl"
            style={{ background: "rgba(3,0,20,0.92)" }}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1000px]"
            >
              <button
                type="button"
                onClick={() => setOpenVideo(null)}
                aria-label="סגור"
                className="absolute -top-14 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(62,207,190,0.2)";
                  e.currentTarget.style.borderColor = "rgba(62,207,190,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="aspect-video w-full overflow-hidden bg-black"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
