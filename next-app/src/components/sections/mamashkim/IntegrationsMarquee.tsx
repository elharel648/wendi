"use client";

// Each system gets an authentic logo. Two sources:
//   - Simple Icons CDN  → for verified brands (sap, moodle, jira)
//   - Google favicons   → fallback that always returns the brand's real favicon
type LogoSpec = { simpleIconsSlug?: string; hex?: string; domain: string };

const LOGOS: Record<string, LogoSpec> = {
  // Row 1 — exact list from mamashkim.html
  "SAP HR":              { simpleIconsSlug: "sap", hex: "0FAAFF", domain: "sap.com" },
  "SAP SuccessFactors":  { domain: "successfactors.com" },
  "Oracle HCM":          { domain: "oracle.com" },
  "Priority People":     { domain: "priority-software.com" },
  "Agresso · Unit4":     { domain: "unit4.com" },
  "Hilan":               { domain: "hilan.co.il" },
  "Sapak":               { domain: "sapak.co.il" },
  "Comeet":              { domain: "comeet.com" },
  "Synerion":            { domain: "synerion.com" },
  "Adi Absence":         { domain: "adi-il.com" },
  "Talentsoft":          { domain: "cegid.com" },

  // Row 2 — exact list from mamashkim.html
  "TimeSoft":            { domain: "timesoft.co.il" },
  "SmartHR":             { domain: "smarthr.io" },
  "Moodle":              { simpleIconsSlug: "moodle", hex: "F98012", domain: "moodle.org" },
  "TalentLMS":           { domain: "talentlms.com" },
  "Docebo":              { domain: "docebo.com" },
  "Cornerstone":         { domain: "cornerstoneondemand.com" },
  "SAP Litmos":          { domain: "litmos.com" },
  "Microsoft Teams":     { domain: "microsoft.com" },
  "SharePoint":          { domain: "microsoft.com" },
  "ServiceNow":          { domain: "servicenow.com" },
  "Jira":                { simpleIconsSlug: "jira", hex: "0052CC", domain: "atlassian.com" },
  "Monday.com":          { domain: "monday.com" },
  "Power BI":            { domain: "powerbi.microsoft.com" },
  "Tableau":             { domain: "tableau.com" },
};

// Exact rows from mamashkim.html — do not reorder, do not edit
const ROW_1 = [
  "SAP HR",
  "SAP SuccessFactors",
  "Oracle HCM",
  "Priority People",
  "Agresso · Unit4",
  "Hilan",
  "Sapak",
  "Comeet",
  "Synerion",
  "Adi Absence",
  "Talentsoft",
];

const ROW_2 = [
  "TimeSoft",
  "SmartHR",
  "Moodle",
  "TalentLMS",
  "Docebo",
  "Cornerstone",
  "SAP Litmos",
  "Microsoft Teams",
  "SharePoint",
  "ServiceNow",
  "Jira",
  "Monday.com",
  "Power BI",
  "Tableau",
];

export function IntegrationsMarquee() {
  return (
    <section
      id="systems"
      dir="rtl"
      className="relative isolate overflow-hidden bg-paper py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Lead row — exact copy from mamashkim.html (do not edit) */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h3 className="text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            30+ מערכות שכבר התחברנו אליהן
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-fg sm:text-lg">
            HR, שכר, נוכחות, BI, גיוס, למידה, תפעול — וונדי מדברת עם כולם.
          </p>
        </div>

      </div>

      {/* Two sliding rows of logos — full-bleed, opposite directions.
          CSS-only marquee (transform on the compositor) so scrolling stays smooth. */}
      <div className="relative" dir="ltr">
        <MarqueeRow items={ROW_1} duration="55s" />
        <div className="mt-4">
          <MarqueeRow items={ROW_2} duration="65s" reverse />
        </div>

        {/* fade overlays so chips melt into the background at the edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40"
          style={{
            background:
              "linear-gradient(90deg, var(--color-paper) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40"
          style={{
            background:
              "linear-gradient(-90deg, var(--color-paper) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: string[];
  duration: string;
  reverse?: boolean;
}) {
  return (
    <div className="marquee-row overflow-hidden py-2">
      <div
        className="marquee-track gap-3"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {/* rendered twice so translateX(-50%) loops seamlessly */}
        {[...items, ...items].map((label, i) => (
          <LogoChip key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

function LogoChip({ label }: { label: string }) {
  const spec = LOGOS[label];
  // Prefer Simple Icons (cleaner SVG) when available, else fall back to Google favicons
  const src = spec?.simpleIconsSlug
    ? `https://cdn.simpleicons.org/${spec.simpleIconsSlug}/${spec.hex ?? "0D9488"}`
    : `https://www.google.com/s2/favicons?domain=${spec?.domain}&sz=128`;

  return (
    <div
      className="group flex shrink-0 items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: "rgba(15,23,42,0.08)",
        boxShadow:
          "0 6px 18px -8px rgba(15,23,42,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      {/* Logo bubble — white circle */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white"
        style={{
          boxShadow:
            "0 4px 12px -4px rgba(15,23,42,0.12), 0 0 0 1px rgba(15,23,42,0.06) inset",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${label} logo`}
          loading="lazy"
          className="h-7 w-7 object-contain"
        />
      </div>

      {/* System name */}
      <span className="whitespace-nowrap text-sm font-semibold text-ink-2">
        {label}
      </span>
    </div>
  );
}
