import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { MobileShowcase } from "@/components/sections/MobileShowcase";
import { CinematicStatement } from "@/components/sections/CinematicStatement";
import { FloatingFeatures } from "@/components/sections/FloatingFeatures";
import { IntegrationsOrbit } from "@/components/sections/IntegrationsOrbit";
import { Sectors } from "@/components/sections/Sectors";
import { WallOfLove } from "@/components/sections/WallOfLove";
import { CtaBand } from "@/components/sections/CtaBand";
import { ClientBehaviors } from "@/components/layout/ClientBehaviors";
import { homeContent } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero content={homeContent.hero} />
      <LogoMarquee />
      <MobileShowcase />
      <CinematicStatement />
      <FloatingFeatures />
      <div className="h-[15vh] w-full" aria-hidden="true" />
      <IntegrationsOrbit />
      <div className="h-16 md:h-24 w-full" aria-hidden="true" />
      <Sectors />
      <WallOfLove />
      <CtaBand />
      <ClientBehaviors />
    </>
  );
}
