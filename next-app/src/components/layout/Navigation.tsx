"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Plug,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

// The four primary destinations. The pill keeps these flat (no sub-menus) by
// design — the tubelight nav is a minimal launcher, not a mega-menu.
const navItems: NavItem[] = [
  { name: "אודותינו", url: "/about", icon: Users },
  { name: "ממשקים", url: "/mamashkim", icon: Plug },
  { name: "מודולים", url: "/modulim", icon: Home },
  { name: "מגזרים", url: "/pitronot", icon: LayoutGrid },
];

const ctaText = "דברו איתנו";
const ctaHref = "#contact";

/** Active when the current path matches the item's base route
 *  (e.g. `/modulim` highlights on `/modulim` and `/modulim/...`). */
function isItemActive(itemUrl: string, pathname: string) {
  const base = itemUrl.split("#")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** The tubelight glow — a small lit bar with layered blurred halos that
 *  slides between tabs via a shared `layoutId`. Adapted from the
 *  shadcn `NavBar` in `@/components/ui/tubelight-navbar`. */
function Lamp() {
  return (
    <motion.div
      layoutId="lamp"
      className="absolute inset-0 -z-10 w-full rounded-full bg-primary/5"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary">
        <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-primary/20 blur-md" />
        <div className="absolute -top-1 h-6 w-8 rounded-full bg-primary/20 blur-md" />
        <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
      </div>
    </motion.div>
  );
}

/** A single pill tab. Shows the label on md+, the icon below md — matching
 *  the original tubelight responsive behavior. */
function PillTab({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.url}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors",
        "text-foreground/80 hover:text-primary",
        active && "bg-muted text-primary",
      )}
    >
      <span className="hidden md:inline">{item.name}</span>
      <span className="md:hidden">
        <Icon size={18} strokeWidth={2.5} aria-label={item.name} />
      </span>
      {active && <Lamp />}
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return (
    // RTL pill nav. JSX order (logo → tabs → CTA) renders right-to-left:
    // logo on the visual right, CTA on the visual left.
    <div
      dir="rtl"
      className="fixed left-1/2 top-0 z-50 -translate-x-1/2 pt-4 sm:pt-6"
    >
      <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-2 py-1.5 shadow-lg backdrop-blur-lg sm:gap-3">
        <Link
          href="/"
          aria-label="Wendi — דף הבית"
          className="flex shrink-0 items-center gap-2 pl-2 pr-3 sm:pr-4"
        >
          <Image
            src="/wendi-logo.png"
            alt="Wendi"
            width={120}
            height={28}
            priority
            className="nav-logo h-7 w-auto"
          />
        </Link>

        <div role="navigation" aria-label="ראשי" className="flex items-center">
          {navItems.map((item) => (
            <PillTab
              key={item.name}
              item={item}
              active={isItemActive(item.url, pathname)}
            />
          ))}
        </div>

        <a
          href={ctaHref}
          className={cn(
            "ml-1 inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5",
            "border border-primary bg-white text-sm font-semibold text-primary",
            "transition-all hover:-translate-y-px hover:bg-primary hover:text-white",
          )}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}