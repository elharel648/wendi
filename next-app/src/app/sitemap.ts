import type { MetadataRoute } from "next";

const SITE_URL = "https://www.wendi.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about/gallery", changeFrequency: "monthly", priority: 0.6 },
    { path: "/modulim", changeFrequency: "monthly", priority: 0.8 },
    { path: "/mamashkim", changeFrequency: "monthly", priority: 0.8 },
    { path: "/pitronot", changeFrequency: "monthly", priority: 0.8 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
