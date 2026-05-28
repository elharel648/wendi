"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/about", label: "מי אנחנו" },
  { href: "/about/faq", label: "שאלות ותשובות" },
  { href: "/about/gallery", label: "גלריה וסרטונים" },
] as const;

/**
 * Light theme tabs — pill style.
 * Active: teal gradient.
 * Default: transparent w/ dark border.
 */
export function AboutTabs() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="inline-flex items-center justify-center font-semibold"
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "0.9rem",
              border: active
                ? "1px solid #0A0A0A"
                : "1px solid rgba(15,23,42,0.14)",
              background: active ? "#0A0A0A" : "transparent",
              color: active ? "#fff" : "#475569",
              boxShadow: active
                ? "0 8px 24px rgba(10,10,10,0.25)"
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
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
