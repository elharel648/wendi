import { PitronotHero } from "@/components/sections/pitronot/PitronotHero";
import { PitronotSectors } from "@/components/sections/pitronot/PitronotSectors";
import { PitronotSideNav } from "@/components/sections/pitronot/PitronotSideNav";
import { getPitronotHero, getPitronotText } from "@/content/cms";

export const metadata = {
  title: "Wendi — פתרונות לפי מגזר",
  description:
    "וונדי מותאמת לכל מגזר — פיננסים, לוגיסטיקה, מוסדות ציבוריים, שירותי בריאות, תעשייה ותיירות. פלטפורמה אחת עם התאמות, ממשקים ופתרונות ייעודיים.",
};

export default async function PitronotPage() {
  const [hero, cmsText] = await Promise.all([getPitronotHero(), getPitronotText()]);
  const text = cmsText ?? undefined;
  return (
    <>
      <PitronotHero title1={hero.title1} title2={hero.title2} sub={hero.sub} />
      <PitronotSectors cmsText={text} />
      <PitronotSideNav cmsText={text} />
    </>
  );
}
