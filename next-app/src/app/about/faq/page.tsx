import { AboutSubHero } from "@/components/sections/about/AboutSubHero";
import { FaqSection } from "@/components/sections/about/FaqSection";
import { aboutContent } from "@/content/about";

export const metadata = {
  title: "Wendi — שאלות ותשובות",
  description: "כל מה שרציתם לדעת על Wendi — שאלות שעולות תמיד, עם תשובות ישרות.",
};

export default function AboutFaqPage() {
  const { faq } = aboutContent;

  return (
    <>
      <AboutSubHero
        eyebrow={faq.eyebrow}
        title={faq.title}
        sub={faq.sub}
      />
      <FaqSection content={faq} />
    </>
  );
}
