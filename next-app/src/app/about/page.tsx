import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { aboutContent } from "@/content/about";

export const metadata = {
  title: "Wendi — אודותינו",
  description:
    "חברת מוצר ישראלית המתמחה בפלטפורמות דיגיטליות לעובדים. מאמינים שמה שעובד טוב לעובדים — עובד טוב לארגון.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero content={aboutContent.hero} />
      <AboutStory content={aboutContent.story} />
      <AboutMission content={aboutContent.mission} />
      <AboutValues content={aboutContent.values} />
      <AboutTeam content={aboutContent.team} />
    </>
  );
}
