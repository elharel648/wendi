import { ModulimHero } from "@/components/sections/modulim/ModulimHero";
import { ModulimSwitcher } from "@/components/sections/modulim/ModulimSwitcher";
import { getModulimHero, getModulimText } from "@/content/cms";

export const metadata = {
  title: "Wendi — מודולים ופיצ׳רים",
  description:
    "4 מודולים מרכזיים — פורטל ואפליקציה, Workflow, LMS, הערכת ביצועים. כל הפיצ׳רים במערכת אחת.",
};

export default async function ModulimPage() {
  const [hero, cmsText] = await Promise.all([getModulimHero(), getModulimText()]);
  return (
    <>
      <ModulimHero title={hero.title} subtitleHtml={hero.subtitleHtml} />
      <ModulimSwitcher cmsText={cmsText ?? undefined} />
    </>
  );
}
