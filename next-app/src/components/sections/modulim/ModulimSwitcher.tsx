"use client";

import { useEffect, useState } from "react";
import { modules, mergeModulesText, type ModuleText } from "@/content/modulim";
import { ModulesQuickJump } from "@/components/sections/modulim/ModulesQuickJump";
import { ModulesBento } from "@/components/sections/modulim/ModulesBento";

/**
 * Client switcher. Receives CMS text (serializable) from the server page and
 * merges it onto the bundled modules locally — icons/colors stay in code,
 * only the text comes from Umbraco. Falls back to bundled text if none given.
 */
export function ModulimSwitcher({ cmsText }: { cmsText?: ModuleText[] }) {
  const merged = mergeModulesText(cmsText);
  const [activeId, setActiveId] = useState<string>(merged[0]?.id ?? modules[0].id);

  // Deep-link support: ?module=lms (from the home-page feature cards) selects
  // the matching tab on mount. Ignored if the id isn't a real module.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("module");
    if (wanted && merged.some((m) => m.id === wanted)) {
      setActiveId(wanted);
    }
    // merged is recomputed each render but its ids are stable — run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModulesQuickJump modules={merged} activeId={activeId} onSelect={setActiveId} />
      <ModulesBento modules={merged} activeId={activeId} />
    </>
  );
}
