"use client";

import { motion } from "framer-motion";
import { AboutTabs } from "./AboutTabs";

type Props = {
  eyebrow?: string;
  title: string;
  sub: string;
};

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Compact light Hero for /about/faq and /about/gallery.
 */
export function AboutSubHero({ eyebrow, title, sub }: Props) {
  return (
    <section
      className="relative isolate overflow-hidden bg-white pt-24 pb-12 md:pt-[140px] md:pb-20"
    >
      {/* Soft ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[120px] -right-[150px] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-[100px] h-[350px] w-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74,144,196,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 md:px-16">
        <div className="w-full max-w-[1440px]">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: expo }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{
              background: "rgba(13,148,136,0.08)",
              border: "1px solid rgba(13,148,136,0.28)",
              color: "#0D9488",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "#0D9488",
                boxShadow: "0 0 8px rgba(13,148,136,0.5)",
              }}
            />
            {eyebrow}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo, delay: 0.1 }}
          className="font-black"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: "#0F172A",
            marginBottom: "20px",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: expo, delay: 0.2 }}
          style={{
            fontSize: "1.08rem",
            lineHeight: 1.78,
            color: "#475569",
            maxWidth: "560px",
            marginBottom: "36px",
          }}
        >
          {sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: expo, delay: 0.3 }}
        >
          <AboutTabs />
        </motion.div>
        </div>
      </div>
    </section>
  );
}
