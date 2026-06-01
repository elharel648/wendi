import { AboutSubHero } from "@/components/sections/about/AboutSubHero";
import { GallerySection } from "@/components/sections/about/GallerySection";
import { getAboutContent } from "@/content/cms";

export const metadata = {
  title: "Wendi — גלריה וסרטונים",
  description: "הצצה לעבודה של Wendi — אירועים, הצוות, לקוחות וסרטוני השקה.",
};

export default async function AboutGalleryPage() {
  const { gallery } = await getAboutContent();

  return (
    <>
      <AboutSubHero title={gallery.title} sub={gallery.sub} />
      <GallerySection content={gallery} />
    </>
  );
}
