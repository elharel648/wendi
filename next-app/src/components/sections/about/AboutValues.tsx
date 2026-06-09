"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  Sparkles,
  Crosshair,
  Lock,
  BarChart3,
  Sprout,
} from "lucide-react";
import type { AboutContent } from "@/content/about";

type Props = { content: AboutContent["values"] };

const expo = [0.16, 1, 0.3, 1] as const;
const ICONS = [Handshake, Sparkles, Crosshair, Lock, BarChart3, Sprout] as const;

/**
 * Light Values — white cards with NEON TEAL gradient borders on hover.
 * The border ring lights up + card lifts + icon box flips to teal solid.
 */
export function AboutValues({ content }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 md:pt-[120px] md:pb-[140px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[100px] left-1/4 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[80px] right-1/4 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74,144,196,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 md:px-16">
        <div className="w-full max-w-[1440px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expo }}
          className="mb-10 max-w-[640px] md:mb-16"
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "#0F172A",
            }}
          >
            {content.title}{" "}
            <span style={{ color: "#0D9488" }}>באמת.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = ICONS[i] ?? Handshake;
            return <ValueCard key={item.num} item={item} Icon={Icon} index={i} />;
          })}
        </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  item,
  Icon,
  index,
}: {
  item: AboutContent["values"]["items"][number];
  Icon: (typeof ICONS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: expo, delay: 0.05 + (index % 3) * 0.08 }}
      className="group relative overflow-hidden"
      style={{
        padding: "34px 30px",
        borderRadius: "22px",
        background: "#fff",
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 12px -4px rgba(15,23,42,0.06)",
        transition:
          "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease, box-shadow 0.5s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "rgba(13,148,136,0.4)";
        e.currentTarget.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 60px -20px rgba(15,23,42,0.15), 0 0 50px -10px rgba(13,148,136,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "rgba(15,23,42,0.08)";
        e.currentTarget.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 12px -4px rgba(15,23,42,0.06)";
      }}
    >
      {/* Neon teal gradient border — appears on hover */}
      <span
        aria-hidden
        className="vc-border pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(13,148,136,0.7), rgba(74,144,196,0.5) 50%, rgba(62,207,190,0.7))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Top corner sweep */}
      <span
        aria-hidden
        className="vc-sweep pointer-events-none absolute left-0 right-0 top-0 h-[2px] origin-right scale-x-0 transition-transform duration-700"
        style={{
          background:
            "linear-gradient(to right, transparent, #0D9488, transparent)",
        }}
      />

      {/* Header — clean teal line icon (no box, matches the Sectors style) +
          big stroked number */}
      <div className="mb-7 flex items-center justify-between">
        <Icon
          className="vc-icon-svg transition-colors duration-[400ms]"
          style={{
            width: "30px",
            height: "30px",
            color: "#2BADA0",
          }}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Big stroked number */}
        <span
          className="vc-num tabular-nums transition-all duration-[400ms]"
          style={{
            fontSize: "2.6rem",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-1.5px",
            color: "transparent",
            WebkitTextStroke: "1.4px rgba(15,23,42,0.14)",
          }}
        >
          {item.num}
        </span>
      </div>

      <h3
        style={{
          fontSize: "1.18rem",
          fontWeight: 800,
          color: "#0F172A",
          marginBottom: "12px",
          letterSpacing: "-0.3px",
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontSize: "0.92rem",
          lineHeight: 1.75,
          color: "#475569",
        }}
      >
        {item.desc}
      </p>

      <style jsx>{`
        article:hover :global(.vc-border) {
          opacity: 1;
        }
        article:hover :global(.vc-sweep) {
          transform: scaleX(1);
        }
        article:hover :global(.vc-icon-svg) {
          color: #0d9488 !important;
          transform: scale(1.08);
        }
        article:hover :global(.vc-num) {
          -webkit-text-stroke-color: rgba(13, 148, 136, 0.7);
        }
      `}</style>
    </motion.article>
  );
}
