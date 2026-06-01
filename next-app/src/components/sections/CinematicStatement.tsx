import type { CinematicContent } from "@/content/homeSections";
import { homeSections } from "@/content/homeSections";

export function CinematicStatement({ content }: { content?: CinematicContent }) {
  const c = content ?? homeSections.cinematic;
  return (
    <div className="cin-outer" id="cin-statement">
      <div className="cin-sticky">
        <div className="cin-vignette-top" />
        <div className="cin-vignette-bot" />
        <div className="cin-ghost" aria-hidden="true">
          <span className="cin-ghost-word">{c.ghostWord}</span>
        </div>
        <div className="cin-stage">
          <span className="cin-l1">
            {c.line1} <span className="cin-accent">{c.line1Accent}</span>
          </span>
          <div className="cin-rule" />
          <span className="cin-l2">{c.line2}</span>
        </div>
      </div>
    </div>
  );
}
