import { ModulimHero } from "@/components/sections/modulim/ModulimHero";
import { ModulesTabs } from "@/components/sections/modulim/ModulesTabs";

export const metadata = {
  title: "Wendi — מודולים ופיצ׳רים",
  description:
    "4 מודולים מרכזיים — פורטל ואפליקציה, Workflow, LMS, הערכת ביצועים. כל הפיצ׳רים במערכת אחת.",
};

export default function ModulimPage() {
  return (
    <>
      <ModulimHero />
      <ModulesTabs />
    </>
  );
}
