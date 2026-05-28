import { PitronotHero } from "@/components/sections/pitronot/PitronotHero";
import { PitronotSectors } from "@/components/sections/pitronot/PitronotSectors";
import { PitronotSideNav } from "@/components/sections/pitronot/PitronotSideNav";

export const metadata = {
  title: "Wendi — פתרונות לפי מגזר",
  description:
    "וונדי מותאמת לכל מגזר — פיננסים, לוגיסטיקה, מוסדות ציבוריים, שירותי בריאות, תעשייה ותיירות. פלטפורמה אחת עם התאמות, ממשקים ופתרונות ייעודיים.",
};

export default function PitronotPage() {
  return (
    <>
      <PitronotHero />
      <PitronotSectors />
      <PitronotSideNav />
    </>
  );
}
