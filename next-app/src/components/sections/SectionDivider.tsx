"use client";

import { motion } from "framer-motion";

const expoOut = [0.22, 1, 0.36, 1] as const;

/**
 * Lightweight section break: a single hairline that strengthens toward
 * the center and fades out at the edges. Separates adjacent sections
 * without a heavy band.
 */
export function SectionDivider() {
  return (
    <div
      dir="rtl"
      data-section-divider
      className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: expoOut }}
        className="relative flex items-center justify-center"
      >
        <span
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.12) 35%, rgba(13,148,136,0.45) 50%, rgba(15,23,42,0.12) 65%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
