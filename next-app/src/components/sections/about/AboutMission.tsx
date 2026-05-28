"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/content/about";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

type Props = { content: AboutContent["mission"] };

const expo = [0.16, 1, 0.3, 1] as const;

/**
 * Mission strip wrapped in HeroHighlight (dot pattern + cursor-follow
 * indigo glow). Highlight component wraps the "Go-Live" phrase per
 * 21st.dev hero-highlight template.
 *
 * Quote text is rendered as 3 spans (before / Highlight / after) so the
 * Highlight animation can target just the highlighted phrase.
 */
/** Wrap any latin "Go-Live" run in an LTR atomic span so RTL bidi
 *  doesn't render its hyphen twice and the word never breaks across lines. */
function renderQuoteBefore(text: string): React.ReactNode {
  const segments = text.split(/(Go-Live)/g);
  return segments.map((seg, i) =>
    seg === "Go-Live" ? (
      <span key={i} dir="ltr" className="whitespace-nowrap">
        Go-Live
      </span>
    ) : (
      seg
    ),
  );
}

export function AboutMission({ content }: Props) {
  // Wrap only "אנחנו שם כל יום — עם כל עובד, בכל ארגון." in <Highlight>
  const PHRASE = "אנחנו שם כל יום — עם כל עובד, בכל ארגון.";
  const parts = content.quote.split(PHRASE);
  const hasPhrase = parts.length === 2;

  return (
    <section className="relative bg-white">
      <HeroHighlight containerClassName="h-[40rem]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
        >
          {hasPhrase ? (
            <>
              {renderQuoteBefore(parts[0])}
              <br />
              <Highlight
                className="bg-gradient-to-r from-[#3ECFBE] to-[#2BADA0] text-black dark:from-[#3ECFBE] dark:to-[#2BADA0] dark:text-white"
                duration={5}
                delay={0.8}
              >
                {PHRASE}
              </Highlight>
              {parts[1]}
            </>
          ) : (
            content.quote
          )}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expo, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span
            aria-hidden
            className="h-px w-8"
            style={{ background: "#0D9488" }}
          />
          <span
            style={{
              fontSize: "0.88rem",
              letterSpacing: "0.06em",
              color: "#64748B",
            }}
          >
            <span style={{ color: "#0D9488", fontWeight: 700 }}>
              {content.author}
            </span>{" "}
            — {content.authorRole}
          </span>
          <span
            aria-hidden
            className="h-px w-8"
            style={{ background: "#0D9488" }}
          />
        </motion.div>
      </HeroHighlight>
    </section>
  );
}
