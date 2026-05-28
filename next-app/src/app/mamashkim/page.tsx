import { MamashkimHero } from "@/components/sections/mamashkim/MamashkimHero";
import { IntegrationsMarquee } from "@/components/sections/mamashkim/IntegrationsMarquee";
import { IntegrationsDuel } from "@/components/sections/mamashkim/IntegrationsDuel";
import { IntegrationsProcess } from "@/components/sections/mamashkim/IntegrationsProcess";

export const metadata = {
  title: "Wendi — ממשקים",
  description:
    "וונדי מתחברת לארגון שלכם באמת. אפיון משותף, פיתוח ייעודי, ואחריות אחת מקצה לקצה — לא רק API.",
};

export default function MamashkimPage() {
  return (
    <>
      <MamashkimHero />
      <IntegrationsMarquee />
      <IntegrationsDuel />
      <IntegrationsProcess />
    </>
  );
}
