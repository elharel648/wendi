"use client";

import { useState } from "react";
import { modules } from "@/content/modulim";
import { ModulesQuickJump } from "@/components/sections/modulim/ModulesQuickJump";
import { ModulesBento } from "@/components/sections/modulim/ModulesBento";

export function ModulimSwitcher() {
  const [activeId, setActiveId] = useState<string>(modules[0].id);

  return (
    <>
      <ModulesQuickJump activeId={activeId} onSelect={setActiveId} />
      <ModulesBento activeId={activeId} />
    </>
  );
}
