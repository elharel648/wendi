"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { AboutContent, TeamMember } from "@/content/about";

type Props = { content: AboutContent["team"] };

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Light Team — white cards with NEON TEAL gradient border on hover.
 */
export function AboutTeam({ content }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 md:pt-[120px] md:pb-[160px]"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(13,148,136,0.32), transparent)",
        }}
      />

      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 md:px-16">
        <div className="w-full max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expo }}
          className="mb-10 max-w-[680px] md:mb-14"
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "#0F172A",
              marginBottom: "16px",
            }}
          >
            {content.title}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.78,
              color: "#475569",
            }}
          >
            {content.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {content.members.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: expo, delay: 0.04 + (index % 4) * 0.06 }}
      className="group relative overflow-hidden text-center"
      style={{
        padding: "28px 20px",
        borderRadius: "20px",
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
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 60px -20px rgba(15,23,42,0.15), 0 0 50px -10px rgba(13,148,136,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "rgba(15,23,42,0.08)";
        e.currentTarget.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 12px -4px rgba(15,23,42,0.06)";
      }}
    >
      {/* Animated neon gradient border */}
      <span
        aria-hidden
        className="tc-border pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500"
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

      {/* Photo with double-ring */}
      <div
        className="tc-photo relative mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full transition-all duration-[400ms]"
        style={{
          width: "92px",
          height: "92px",
          background: "linear-gradient(135deg, #2BADA0, #4A90C4)",
          padding: "3px",
          boxShadow: "0 0 0 1px rgba(13,148,136,0.2)",
        }}
      >
        <div
          className="overflow-hidden rounded-full"
          style={{
            width: "100%",
            height: "100%",
            background: "#fff",
          }}
        >
          {!imgFailed ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #2BADA0, #4A90C4)",
                color: "#fff",
                fontSize: "1.85rem",
                fontWeight: 900,
              }}
            >
              {member.fallbackLetter}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: "0.98rem",
          color: "#0F172A",
          marginBottom: "4px",
        }}
      >
        {member.name}
      </div>
      <div
        style={{
          fontSize: "0.82rem",
          color: "#64748B",
        }}
      >
        {member.role}
      </div>

      <style jsx>{`
        article:hover :global(.tc-border) {
          opacity: 1;
        }
        article:hover :global(.tc-photo) {
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.6),
            0 0 30px rgba(13, 148, 136, 0.3);
          transform: scale(1.04);
        }
      `}</style>
    </motion.article>
  );
}
