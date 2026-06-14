"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  LayoutGrid,
  Plug,
  Users,
  Menu,
  X,
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

/** A single pill tab (desktop only — md and up). */
function PillTab({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.url}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex min-h-[44px] cursor-pointer items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors",
        "text-foreground/80 hover:text-primary",
        active && "bg-muted text-primary",
      )}
    >
      {item.name}
      {active && <Lamp />}
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu overlay is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      {/* RTL pill nav. JSX order (logo → tabs → CTA) renders right-to-left:
          logo on the visual right, CTA on the visual left. */}
      <div
        dir="rtl"
        className="fixed left-1/2 top-0 z-50 w-[calc(100%-1.5rem)] max-w-fit -translate-x-1/2 pt-4 sm:pt-6"
      >
        <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-background/70 px-2 py-1.5 shadow-lg backdrop-blur-lg sm:gap-3">
          {/* Mobile: logo on the LEFT (order-last in RTL), hamburger on the
              right. Desktop (md+): natural order — logo right, CTA left. */}
          <Link
            href="/"
            aria-label="Wendi — דף הבית"
            className="order-last flex shrink-0 items-center gap-2 pl-2 pr-3 sm:pr-4 md:order-first"
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

          {/* Desktop tabs — hidden on mobile */}
          <div
            role="navigation"
            aria-label="ראשי"
            className="hidden items-center md:flex"
          >
            {navItems.map((item) => (
              <PillTab
                key={item.name}
                item={item}
                active={isItemActive(item.url, pathname)}
              />
            ))}
          </div>

          {/* Desktop CTA — hidden on mobile */}
          <a
            href={ctaHref}
            className={cn(
              "ml-1 hidden h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 md:inline-flex",
              "border border-primary bg-white text-sm font-semibold text-primary",
              "transition-all hover:-translate-y-px hover:bg-primary hover:text-white",
            )}
          >
            {ctaText}
          </a>

          {/* Mobile hamburger — only below md, sits on the right (order-first
              in RTL) so logo ends up on the left. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={menuOpen}
            className="order-first flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-primary md:hidden"
          >
            {menuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="סגירת תפריט"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 h-full w-full bg-slate-900/40 backdrop-blur-sm"
          />
          {/* sheet — div, NOT <nav>: legacy.css hijacks bare <nav> with
              position:fixed; height:82px which collapses this menu. */}
          <div
            role="navigation"
            aria-label="תפריט נייד"
            style={{ position: "absolute", left: 12, right: 12, top: 88 }}
            className="animate-[fadeInDown_0.22s_ease] rounded-3xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <ul className="flex w-full flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.url, pathname);
                return (
                  <li key={item.name} className="w-full">
                    <Link
                      href={item.url}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex w-full min-h-[52px] items-center gap-3 rounded-2xl px-4 text-base font-semibold transition-colors",
                        active
                          ? "bg-muted text-primary"
                          : "text-foreground/85 hover:bg-muted/60 hover:text-primary",
                      )}
                    >
                      <Icon size={20} strokeWidth={2.4} aria-hidden />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-1 w-full">
                <a
                  href={ctaHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full min-h-[52px] items-center justify-center rounded-2xl border border-primary bg-primary px-4 text-base font-bold text-white transition-colors"
                >
                  {ctaText}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
