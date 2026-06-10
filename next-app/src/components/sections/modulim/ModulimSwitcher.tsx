"use client";

import { useEffect, useState } from "react";
import { mergeModulesText, type ModuleText } from "@/content/modulim";
import { ModulesQuickJump } from "@/components/sections/modulim/ModulesQuickJump";
import { ModulesStack } from "@/components/sections/modulim/ModulesStack";

/**
 * Client switcher. Receives CMS text (serializable) from the server page and
 * merges it onto the bundled modules locally — icons/colors stay in code,
 * only the text comes from Umbraco. Falls back to bundled text if none given.
 *
 * The modules now render as scroll-stacking cards (ModulesStack); the QuickJump
 * tabs scroll to a module's card rather than toggling a single visible module.
 * `activeId` is kept only to highlight the tab matching the module in view.
 */
export function ModulimSwitcher({ cmsText }: { cmsText?: ModuleText[] }) {
  const merged = mergeModulesText(cmsText);
  const [activeId, setActiveId] = useState<string>(merged[0]?.id ?? "");

  // Smoothly scroll a module's stacking card into view (used by the tabs).
  const goTo = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Highlight the tab for whichever module card is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.5, 0.9] }
    );
    merged.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // merged ids are stable; observe once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deep-link support: ?module=lms scrolls to the matching card on mount.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("module");
    if (wanted && merged.some((m) => m.id === wanted)) {
      // Defer so the cards are laid out before we scroll.
      requestAnimationFrame(() => goTo(wanted));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModulesQuickJump modules={merged} activeId={activeId} onSelect={goTo} />
      <ModulesStack modules={merged} />
    </>
  );
}
