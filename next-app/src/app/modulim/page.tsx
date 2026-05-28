import { ModulimHero } from "@/components/sections/modulim/ModulimHero";
import { ModulesBento } from "@/components/sections/modulim/ModulesBento";
import { ModulesSideNav } from "@/components/sections/modulim/ModulesSideNav";

export const metadata = {
  title: "Wendi — מודולים ופיצ׳רים",
  description:
    "4 מודולים מרכזיים — פורטל ואפליקציה, Workflow, LMS, הערכת ביצועים. כל הפיצ׳רים במערכת אחת.",
};

export default function ModulimPage() {
  return (
    <>
      <ModulimHero />
      <ModulesBento />
      <ModulesSideNav />
    </>
  );
}
