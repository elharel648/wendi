import { AboutSubHero } from "@/components/sections/about/AboutSubHero";
import { GallerySection } from "@/components/sections/about/GallerySection";
import { aboutContent } from "@/content/about";

export const metadata = {
  title: "Wendi — גלריה וסרטונים",
  description: "הצצה לעבודה של Wendi — אירועים, הצוות, לקוחות וסרטוני השקה.",
};

export default function AboutGalleryPage() {
  const { gallery } = aboutContent;

  return (
    <>
      <AboutSubHero title={gallery.title} sub={gallery.sub} />
      <GallerySection content={gallery} />
    </>
  );
}
