import Link from "next/link";
import type { SectorsContent } from "@/content/homeSections";
import { homeSections } from "@/content/homeSections";

// Home cards map 1:1 by index to the sector blocks on /pitronot.
// Clicking a card deep-links to that sector's anchor (scroll-mt-24
// there keeps it clear of the sticky header). Order must mirror
// homeSections.sectors.cards and the `sectors` array in pitronot.tsx.
const SECTOR_ANCHORS = [
  "/pitronot#finantsim", // פיננסים וביטוח
  "/pitronot#logistika", // לוגיסטיקה ותחבורה
  "/pitronot#tsiburi",   // מוסדות ציבוריים
  "/pitronot#briut",     // שירותי בריאות
  "/pitronot#taasia",    // תעשייה ומסחר
  "/pitronot#tayarut",   // תיירות ואירוח
];

// Small chevron beside the sector name, nudges on hover (mirrors the
// FloatingFeatures card affordance).
const SectorArrow = () => (
  <svg className="ctg-feat-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// Icons stay in code (visual), matched to cards by index. Editable text
// (titleLines + card title/desc) comes from props / Umbraco.
const sectorIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
];

export function Sectors({ content }: { content?: SectorsContent }) {
  const c = content ?? homeSections.sectors;
  return (
    <section className="ctg-show" dir="rtl">
      <div className="ctg-inner">
        {/* Override legacy `.ctg-hd { margin-top: -160px }` on mobile —
            it pulls the title off-screen on small viewports. Desktop
            keeps the original negative offset (md: and up). */}
        <div className="ctg-hd !mt-0 md:!-mt-40">
          <h2 className="ctg-title">
            {c.titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < c.titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
        <div className="ctg-feats">
          {c.cards.map((s, i) => (
            <Link
              key={s.title}
              href={SECTOR_ANCHORS[i] ?? "/pitronot"}
              className="ctg-feat"
            >
              <div className="ctg-feat-ico">{sectorIcons[i]}</div>
              <h3 className="ctg-feat-name">{s.title}<SectorArrow /></h3>
              <p className="ctg-feat-desc">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
