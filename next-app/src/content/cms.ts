/**
 * Umbraco Delivery API client.
 *
 * Fetches page content from a headless Umbraco instance and maps it onto the
 * existing typed content shapes (see ./home.ts). The section components are
 * unchanged — they still receive the same `HeroContent` / `HomeContent` objects,
 * only the *source* moves from a hardcoded constant to the CMS.
 *
 * If Umbraco is unreachable or the response is malformed, every getter falls
 * back to the bundled constant so the site never breaks. That makes the CMS an
 * enhancement, not a hard dependency — local dev and previews work with or
 * without the CMS running.
 */
import { homeContent, type HomeContent, type HeroContent } from "./home";
import { aboutContent, type AboutContent } from "./about";
import type { ModuleText } from "./modulim";
import type { SectorText } from "./pitronot";
import { homeSections, type HomeSectionsContent } from "./homeSections";
import { mamashkimContent, type MamashkimContent } from "./mamashkim";

const UMBRACO_URL =
  process.env.UMBRACO_API_URL?.replace(/\/$/, "") ?? "";

/* ─── Generic Delivery API helpers (shared by all pages) ─────────────── */

/** A single Umbraco content item from the Delivery API. */
type CmsItem = { properties?: Record<string, unknown> };

/** A Block List property as it appears in the Delivery API v2 JSON. */
type CmsBlockList = {
  items?: { content?: { properties?: Record<string, unknown> } }[];
};

/** Fetch one published item by its Umbraco path/segment. Null on any failure. */
async function fetchItem(segment: string): Promise<CmsItem | null> {
  if (!UMBRACO_URL) return null;
  try {
    const res = await fetch(
      `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${segment}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as CmsItem;
  } catch {
    return null;
  }
}

/** Read a plain string property, or undefined if missing/blank. */
function str(props: Record<string, unknown>, key: string): string | undefined {
  const v = props[key];
  return typeof v === "string" && v.trim() ? v : undefined;
}

/** Map a Block List property to an array of plain `{alias: value}` row objects. */
function blocks(
  props: Record<string, unknown>,
  key: string,
): Record<string, unknown>[] {
  const bl = props[key] as CmsBlockList | undefined;
  if (!bl?.items?.length) return [];
  return bl.items.map((it) => it.content?.properties ?? {});
}

/** Coerce a row field to string (Block List values come back as strings). */
const rowStr = (row: Record<string, unknown>, k: string): string =>
  typeof row[k] === "string" ? (row[k] as string) : "";

/** Shape of the bits we read from the Delivery API `homePage` item. */
type DeliveryItem = {
  contentType?: string;
  properties?: {
    subtitle?: string | null;
    titleLines?: string | null;
  };
};

/**
 * Fetch the published Home Page from Umbraco and merge it onto the bundled
 * defaults. Only the fields modelled in Umbraco so far (subtitle, titleLines)
 * are overridden; ctas/mascot keep their bundled values until they're modelled.
 */
export async function getHomeContent(): Promise<HomeContent> {
  if (!UMBRACO_URL) return homeContent;

  try {
    const res = await fetch(
      `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/home`,
      // Revalidate every 60s so editor changes show up without a redeploy.
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return homeContent;

    const item = (await res.json()) as DeliveryItem;
    const props = item?.properties ?? {};

    const hero: HeroContent = {
      ...homeContent.hero,
      subtitle: props.subtitle?.trim()
        ? props.subtitle
        : homeContent.hero.subtitle,
      titleLines: props.titleLines?.trim()
        ? props.titleLines.split("\n").map((l) => l.trim()).filter(Boolean)
        : homeContent.hero.titleLines,
    };

    return { ...homeContent, hero };
  } catch {
    // Umbraco down / network error → bundled content keeps the site alive.
    return homeContent;
  }
}

/* ─── About page (shared by /about, /about/faq, /about/gallery) ──────── */

/**
 * Fetch the About page from Umbraco and map it onto the `AboutContent` shape.
 * Every section falls back to the bundled `aboutContent` if its data is missing,
 * and the whole thing falls back if Umbraco is unreachable.
 */
export async function getAboutContent(): Promise<AboutContent> {
  const item = await fetchItem("about");
  if (!item?.properties) return aboutContent;
  const p = item.properties;

  const titleLines = [
    { text: str(p, "heroTitle1") ?? aboutContent.hero.titleLines[0]?.text ?? "" },
    { text: str(p, "heroTitle2") ?? aboutContent.hero.titleLines[1]?.text ?? "", accent: true },
  ];

  const stats = blocks(p, "heroStats");
  const timeline = blocks(p, "storyTimeline");
  const values = blocks(p, "valuesItems");
  const members = blocks(p, "teamMembers");
  const faq = blocks(p, "faqItems");
  const galleryImgs = blocks(p, "galleryImages");
  const videos = blocks(p, "videoItems");
  const intro = str(p, "storyIntro");

  return {
    hero: {
      bgWord: str(p, "heroBgWord") ?? aboutContent.hero.bgWord,
      titleLines,
      sub: str(p, "heroSub") ?? aboutContent.hero.sub,
      stats: stats.length
        ? stats.map((r) => ({ num: rowStr(r, "num"), label: rowStr(r, "label") }))
        : aboutContent.hero.stats,
    },
    story: {
      quote: {
        plain: str(p, "storyQuotePlain") ?? aboutContent.story.quote.plain,
        accent: str(p, "storyQuoteAccent") ?? aboutContent.story.quote.accent,
      },
      intro: intro ? intro.split("\n").map((l) => l.trim()).filter(Boolean) : aboutContent.story.intro,
      timeline: timeline.length
        ? timeline.map((r) => ({ year: rowStr(r, "year"), title: rowStr(r, "title"), desc: rowStr(r, "desc") }))
        : aboutContent.story.timeline,
    },
    mission: {
      quote: str(p, "missionQuote") ?? aboutContent.mission.quote,
      author: str(p, "missionAuthor") ?? aboutContent.mission.author,
      authorRole: str(p, "missionAuthorRole") ?? aboutContent.mission.authorRole,
    },
    values: {
      title: str(p, "valuesTitle") ?? aboutContent.values.title,
      items: values.length
        ? values.map((r) => ({ num: rowStr(r, "num"), title: rowStr(r, "title"), desc: rowStr(r, "desc") }))
        : aboutContent.values.items,
    },
    team: {
      title: str(p, "teamTitle") ?? aboutContent.team.title,
      sub: str(p, "teamSub") ?? aboutContent.team.sub,
      members: members.length
        ? members.map((r) => ({
            name: rowStr(r, "name"),
            role: rowStr(r, "role"),
            photo: rowStr(r, "photo"),
            fallbackLetter: rowStr(r, "fallbackLetter"),
          }))
        : aboutContent.team.members,
    },
    faq: {
      ...aboutContent.faq,
      eyebrow: str(p, "faqEyebrow") ?? aboutContent.faq.eyebrow,
      title: str(p, "faqTitle") ?? aboutContent.faq.title,
      sub: str(p, "faqSub") ?? aboutContent.faq.sub,
      items: faq.length
        ? faq.map((r) => ({
            cat: rowStr(r, "cat") as AboutContent["faq"]["items"][number]["cat"],
            catLabel: rowStr(r, "catLabel"),
            question: rowStr(r, "question"),
            answer: rowStr(r, "answer"),
          }))
        : aboutContent.faq.items,
    },
    gallery: {
      title: str(p, "galleryTitle") ?? aboutContent.gallery.title,
      sub: str(p, "gallerySub") ?? aboutContent.gallery.sub,
      images: galleryImgs.length
        ? galleryImgs.map((r) => ({ src: rowStr(r, "src"), alt: rowStr(r, "alt"), caption: rowStr(r, "caption") }))
        : aboutContent.gallery.images,
      videos: {
        title: str(p, "videosTitle") ?? aboutContent.gallery.videos.title,
        sub: str(p, "videosSub") ?? aboutContent.gallery.videos.sub,
        items: videos.length
          ? videos.map((r) => ({ youtubeId: rowStr(r, "youtubeId"), title: rowStr(r, "title") }))
          : aboutContent.gallery.videos.items,
      },
    },
  };
}

/* ─── Modulim page ──────────────────────────────────────────────────── */

const MODULE_IDS = ["portal", "workflow", "lms", "performance"] as const;

/** Modulim hero copy (editable). Falls back to the component defaults. */
export async function getModulimHero(): Promise<{ title?: string; subtitleHtml?: string }> {
  const item = await fetchItem("modulim");
  const p = item?.properties;
  if (!p) return {};
  return { title: str(p, "heroTitle"), subtitleHtml: str(p, "heroSubtitle") };
}

/**
 * Modulim module text (serializable) for the client switcher to merge with the
 * bundled icons/colors. Returns null if Umbraco is unreachable → bundled text.
 */
export async function getModulimText(): Promise<ModuleText[] | null> {
  const item = await fetchItem("modulim");
  const p = item?.properties;
  if (!p) return null;

  return MODULE_IDS.map((id) => ({
    id,
    shortLabel: str(p, `${id}ShortLabel`) ?? "",
    title: str(p, `${id}Title`) ?? "",
    subtitle: str(p, `${id}Subtitle`) ?? "",
    blurb: str(p, `${id}Blurb`),
    note: str(p, `${id}Note`),
    features: blocks(p, `${id}Features`).map((r) => ({
      title: rowStr(r, "title"),
      desc: rowStr(r, "desc"),
    })),
  }));
}

/* ─── Pitronot page ─────────────────────────────────────────────────── */

const SECTOR_IDS = ["finantsim", "logistika", "tsiburi", "briut", "taasia", "tayarut"] as const;

/** Pitronot hero copy. */
export async function getPitronotHero(): Promise<{ title1?: string; title2?: string; sub?: string }> {
  const item = await fetchItem("pitronot");
  const p = item?.properties;
  if (!p) return {};
  return { title1: str(p, "heroTitle1"), title2: str(p, "heroTitle2"), sub: str(p, "heroSub") };
}

/** Pitronot sector text (serializable) for the client components to merge. */
export async function getPitronotText(): Promise<SectorText[] | null> {
  const item = await fetchItem("pitronot");
  const p = item?.properties;
  if (!p) return null;

  return SECTOR_IDS.map((id) => ({
    id,
    num: str(p, `${id}Num`) ?? "",
    short: str(p, `${id}Short`) ?? "",
    teaser: str(p, `${id}Teaser`) ?? "",
    badge: str(p, `${id}Badge`) ?? "",
    title: str(p, `${id}Title`) ?? "",
    desc: str(p, `${id}Desc`) ?? "",
    features: blocks(p, `${id}Features`).map((r) => rowStr(r, "text")).filter(Boolean),
    story: {
      label: str(p, `${id}StoryLabel`) ?? "",
      quote: str(p, `${id}StoryQuote`) ?? "",
      avatar: str(p, `${id}StoryAvatar`) ?? "",
      name: str(p, `${id}StoryName`) ?? "",
      role: str(p, `${id}StoryRole`) ?? "",
    },
  }));
}

/* ─── Home sections (Wall of Love, Sectors strip, Cinematic) ────────── */

/**
 * Editable text for the hardcoded Home sections. Merges visual identity
 * (avatars/gradients) from the bundled defaults by index so the rendered look
 * is preserved; only the editable text comes from Umbraco.
 */
export async function getHomeSections(): Promise<HomeSectionsContent> {
  const item = await fetchItem("home");
  const p = item?.properties;
  if (!p || !str(p, "wolHeadingPlain")) return homeSections;

  const d = homeSections;
  const mergeWol = (rows: Record<string, unknown>[], fallback: typeof d.wallOfLove.row1) =>
    rows.length
      ? rows.map((r, i) => ({
          // text from CMS, visual identity (avatar/initial/gradient) from bundled by index
          ...(fallback[i] ?? {}),
          name: rowStr(r, "name") || fallback[i]?.name || "",
          role: rowStr(r, "role") || fallback[i]?.role || "",
          quoteHtml: rowStr(r, "quoteHtml") || fallback[i]?.quoteHtml || "",
        }))
      : fallback;

  const titleLines = str(p, "sectorsTitleLines");
  const cards = blocks(p, "sectorsCards");

  return {
    wallOfLove: {
      headingPlain: str(p, "wolHeadingPlain") ?? d.wallOfLove.headingPlain,
      headingAccent: str(p, "wolHeadingAccent") ?? d.wallOfLove.headingAccent,
      sub: str(p, "wolSub") ?? d.wallOfLove.sub,
      row1: mergeWol(blocks(p, "wolRow1"), d.wallOfLove.row1),
      row2: mergeWol(blocks(p, "wolRow2"), d.wallOfLove.row2),
    },
    sectors: {
      titleLines: titleLines ? titleLines.split("\n").map((l) => l.trim()).filter(Boolean) : d.sectors.titleLines,
      cards: cards.length
        ? cards.map((r) => ({ title: rowStr(r, "title"), desc: rowStr(r, "desc") }))
        : d.sectors.cards,
    },
    cinematic: {
      ghostWord: str(p, "cinGhost") ?? d.cinematic.ghostWord,
      line1: str(p, "cinLine1") ?? d.cinematic.line1,
      line1Accent: str(p, "cinLine1Accent") ?? d.cinematic.line1Accent,
      line2: str(p, "cinLine2") ?? d.cinematic.line2,
    },
    floating: {
      features: (() => {
        const f = blocks(p, "floatingFeatures");
        return f.length
          ? f.map((r) => ({
              title: rowStr(r, "title"),
              sub: rowStr(r, "sub"),
              points: rowStr(r, "points").split("\n").map((l) => l.trim()).filter(Boolean),
            }))
          : d.floating.features;
      })(),
    },
    cta: {
      eyebrow: str(p, "ctaEyebrow") ?? d.cta.eyebrow,
      heading: str(p, "ctaHeading") ?? d.cta.heading,
      submitLabel: str(p, "ctaSubmit") ?? d.cta.submitLabel,
      submittedLabel: str(p, "ctaSubmitted") ?? d.cta.submittedLabel,
    },
    mobile: {
      eyebrow: str(p, "mobEyebrow") ?? d.mobile.eyebrow,
      title: str(p, "mobTitle") ?? d.mobile.title,
      categories: (() => {
        const c = blocks(p, "mobileCategories");
        return c.length
          ? c.map((r) => ({ title: rowStr(r, "title"), desc: rowStr(r, "desc") }))
          : d.mobile.categories;
      })(),
    },
  };
}

/* ─── Mamashkim (Integrations) page ─────────────────────────────────── */

export async function getMamashkimContent(): Promise<MamashkimContent> {
  const item = await fetchItem("mamashkim");
  const p = item?.properties;
  if (!p || !str(p, "heroTitle1")) return mamashkimContent;
  const d = mamashkimContent;

  const rows = (key: string, fb: { title: string; subtitle: string }[]) => {
    const b = blocks(p, key);
    return b.length ? b.map((r) => ({ title: rowStr(r, "title"), subtitle: rowStr(r, "subtitle") })) : fb;
  };

  return {
    hero: {
      titleLines: [str(p, "heroTitle1") ?? d.hero.titleLines[0], str(p, "heroTitle2") ?? d.hero.titleLines[1], str(p, "heroTitle3") ?? d.hero.titleLines[2]],
      sub: str(p, "heroSub") ?? d.hero.sub,
      ctaLabel: str(p, "heroCta") ?? d.hero.ctaLabel,
      footnote: str(p, "heroFootnote") ?? d.hero.footnote,
      leftRows: rows("heroLeftRows", d.hero.leftRows),
      rightRows: rows("heroRightRows", d.hero.rightRows),
    },
    duel: {
      headingPlain: str(p, "duelHeadingPlain") ?? d.duel.headingPlain,
      headingAccent: str(p, "duelHeadingAccent") ?? d.duel.headingAccent,
      sub: str(p, "duelSub") ?? d.duel.sub,
      wendiChip: str(p, "duelWendiChip") ?? d.duel.wendiChip,
      wendiTagline: d.duel.wendiTagline,
      wendiSubtitle: str(p, "duelWendiSubtitle") ?? d.duel.wendiSubtitle,
      wendiBadge: str(p, "duelWendiBadge") ?? d.duel.wendiBadge,
      othersChip: str(p, "duelOthersChip") ?? d.duel.othersChip,
      othersTagline: d.duel.othersTagline,
      othersSubtitle: str(p, "duelOthersSubtitle") ?? d.duel.othersSubtitle,
      othersBadge: str(p, "duelOthersBadge") ?? d.duel.othersBadge,
      quote: d.duel.quote,
      quoteCite: d.duel.quoteCite,
      quoteSub: d.duel.quoteSub,
      wendiPoints: (() => {
        const b = blocks(p, "duelWendiPoints");
        return b.length ? b.map((r) => ({ title: rowStr(r, "title"), body: rowStr(r, "body") })) : d.duel.wendiPoints;
      })(),
      othersItems: (() => {
        const b = blocks(p, "duelOthersItems");
        return b.length ? b.map((r) => ({ name: rowStr(r, "name"), desc: rowStr(r, "desc") })) : d.duel.othersItems;
      })(),
    },
    process: {
      headingPlain: str(p, "processHeadingPlain") ?? d.process.headingPlain,
      headingAccent: str(p, "processHeadingAccent") ?? d.process.headingAccent,
      steps: (() => {
        const b = blocks(p, "processSteps");
        return b.length ? b.map((r) => ({ title: rowStr(r, "title"), desc: rowStr(r, "desc") })) : d.process.steps;
      })(),
    },
  };
}
