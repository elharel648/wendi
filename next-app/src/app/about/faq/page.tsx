import { AboutSubHero } from "@/components/sections/about/AboutSubHero";
import { FaqSection } from "@/components/sections/about/FaqSection";
import { getAboutContent } from "@/content/cms";

export const metadata = {
  title: "Wendi — שאלות ותשובות",
  description: "כל מה שרציתם לדעת על Wendi — שאלות שעולות תמיד, עם תשובות ישרות.",
};

export default async function AboutFaqPage() {
  const { faq } = await getAboutContent();

  return (
    <>
      <AboutSubHero
        title={faq.title}
        sub={faq.sub}
      />
      <FaqSection content={faq} />
    </>
  );
}
