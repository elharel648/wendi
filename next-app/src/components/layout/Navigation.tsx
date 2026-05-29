"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Users,
  MessageCircleQuestion,
  Images,
  Landmark,
  Truck,
  Building2,
  HeartPulse,
  Factory,
  Plane,
  Plug,
  Award,
  Cable,
  Network,
  Workflow,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  url: string;
  description?: string;
  icon?: ReactNode;
  items?: MenuItem[];
};

const menu: MenuItem[] = [
  {
    title: "אודותינו",
    url: "/about",
    items: [
      {
        title: "מי אנחנו",
        description: "הסיפור של Wendi, הצוות והערכים",
        icon: <Users className="size-5 shrink-0" aria-hidden="true" />,
        url: "/about",
      },
      {
        title: "שאלות ותשובות",
        description: "תשובות לשאלות הנפוצות ביותר על הפלטפורמה",
        icon: <MessageCircleQuestion className="size-5 shrink-0" aria-hidden="true" />,
        url: "/about#faq",
      },
      {
        title: "גלריה",
        description: "מבט מבפנים — צילומי מסך וסרטוני מערכת",
        icon: <Images className="size-5 shrink-0" aria-hidden="true" />,
        url: "/about#gallery",
      },
    ],
  },
  {
    title: "מגזרים",
    url: "/pitronot",
    items: [
      {
        title: "פיננסים",
        description: "פתרונות לבנקים, ביטוח ומוסדות פיננסיים",
        icon: <Landmark className="size-5 shrink-0" aria-hidden="true" />,
        url: "/pitronot#finantsim",
      },
      {
        title: "לוגיסטיקה ותחבורה",
        description: "ניהול עובדי שטח, נהגים וצוותי מחסן",
        icon: <Truck className="size-5 shrink-0" aria-hidden="true" />,
        url: "/pitronot#logistika",
      },
      {
        title: "מוסדות ציבוריים",
        description: "רשויות, ארגונים ממשלתיים וגופי שירות",
        icon: <Building2 className="size-5 shrink-0" aria-hidden="true" />,
        url: "/pitronot#tsiburi",
      },
      {
        title: "שירותי בריאות",
        description: "בתי חולים, קופות חולים וצוותי רפואה",
        icon: <HeartPulse className="size-5 shrink-0" aria-hidden="true" />,
        url: "/pitronot#briut",
      },
      {
        title: "תעשייה ומסחר",
        description: "מפעלים, רשתות וצוותים תפעוליים",
        icon: <Factory className="size-5 shrink-0" aria-hidden="true" />,
        url: "/pitronot#taasia",
      },
      {
        title: "תיירות",
        description: "מלונאות, חברות תעופה ושירותי תיירות",
        icon: <Plane className="size-5 shrink-0" aria-hidden="true" />,
        url: "/pitronot#tayarut",
      },
    ],
  },
  {
    title: "מודולים",
    url: "/modulim",
  },
  {
    title: "ממשקים",
    url: "/mamashkim",
    items: [
      {
        title: "למה ממשקים",
        description: "מדוע אינטגרציה היא לב הפלטפורמה",
        icon: <Plug className="size-5 shrink-0" aria-hidden="true" />,
        url: "/mamashkim#why",
      },
      {
        title: "מה מייחד אותנו",
        description: "היתרון התחרותי של Wendi באינטגרציה",
        icon: <Award className="size-5 shrink-0" aria-hidden="true" />,
        url: "/mamashkim#different",
      },
      {
        title: "סוגי ממשקים",
        description: "API, Webhooks, SFTP ו-Direct DB",
        icon: <Cable className="size-5 shrink-0" aria-hidden="true" />,
        url: "/mamashkim#types",
      },
      {
        title: "מערכות שחיברנו",
        description: "Priority, SAP, Oracle, Salesforce ועוד",
        icon: <Network className="size-5 shrink-0" aria-hidden="true" />,
        url: "/mamashkim#systems",
      },
      {
        title: "תהליך העבודה",
        description: "כיצד פרויקט אינטגרציה רץ מהיום הראשון",
        icon: <Workflow className="size-5 shrink-0" aria-hidden="true" />,
        url: "/mamashkim#process",
      },
    ],
  },
];

const ctaText = "דברו איתנו";
const ctaHref = "#contact";

const navLinkClass = cn(
  "inline-flex items-center px-2 py-1",
  "text-[15px] font-medium text-foreground/80 transition-colors",
  "hover:text-foreground",
);

const ctaButtonClass = cn(
  "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-6",
  "border-2 border-[#5EC2B7] bg-transparent text-sm font-semibold text-slate-700",
  "transition-all hover:bg-[#5EC2B7] hover:!text-white hover:-translate-y-px",
);

const iconButtonClass = cn(
  "inline-flex h-10 w-10 items-center justify-center rounded-md",
  "border border-border bg-background",
  "transition-colors hover:bg-muted",
);

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <header
      role="banner"
      aria-label="ראשי"
      className="wendi-nav sticky top-0 z-40 w-full bg-white pt-4 pb-2"
    >
      {/* Desktop nav — wrapped in a plain div whose `hidden lg:block`
          visibility we fully control. shadcn's NavigationMenu primitive
          hardcodes `flex` on its root, so applying `hidden lg:flex` to
          the primitive directly does not reliably hide it on mobile. */}
      <div className="hidden lg:block">
        <NavigationMenu className="h-16 w-full">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">
            <a href={ctaHref} className={ctaButtonClass}>
              {ctaText}
            </a>
            <NavigationMenuList>
              {menu.map((item) => renderDesktopItem(item, router))}
            </NavigationMenuList>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/wendi-logo.png"
                alt="Wendi"
                width={153}
                height={36}
                priority
                className="h-9 w-auto"
              />
            </Link>
          </div>
        </NavigationMenu>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:hidden lg:px-8">
        {/* Mobile nav — JSX order: hamburger first (visual right in RTL),
            logo second (visual left). */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
                  aria-expanded={mobileOpen}
                  aria-controls="wendi-mobile-menu"
                  className={iconButtonClass}
                >
                  <Menu className="size-4" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                id="wendi-mobile-menu"
                className="overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Image
                        src="/wendi-logo.png"
                        alt="Wendi"
                        width={136}
                        height={32}
                        className="h-8 w-auto"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) =>
                      renderMobileItem(item, () => setMobileOpen(false)),
                    )}
                  </Accordion>
                  <a
                    href={ctaHref}
                    className={ctaButtonClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    {ctaText}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/wendi-logo.png"
              alt="Wendi"
              width={136}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

function renderDesktopItem(
  item: MenuItem,
  router: ReturnType<typeof useRouter>,
) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          onClick={(e) => {
            e.preventDefault();
            router.push(item.url);
          }}
          onPointerDown={(e) => {
            // Prevent Radix from toggling the menu on click; let onClick handle navigation.
            // Hover still opens the dropdown via Radix's pointer-enter behavior.
            e.preventDefault();
          }}
          className={cn(
            "h-auto flex-row-reverse bg-transparent px-2 py-1 text-[15px] font-medium text-foreground/80",
            "hover:bg-transparent hover:text-foreground",
            "focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent",
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div dir="rtl" className="px-8 py-8">
            <ul className="grid w-[760px] grid-cols-3 gap-x-10 gap-y-5">
              {item.items.map((sub) => (
                <li key={sub.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={sub.url}
                      className="group flex select-none items-start gap-4 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/60"
                    >
                      <span className="mt-0.5 text-foreground/70 transition-colors group-hover:text-[#5EC2B7]">
                        {sub.icon}
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-semibold text-foreground">
                          {sub.title}
                        </span>
                        {sub.description && (
                          <span className="text-[13px] leading-snug text-muted-foreground">
                            {sub.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link href={item.url} className={navLinkClass}>
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileItem(item: MenuItem, onNavigate: () => void) {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b-0"
      >
        <AccordionTrigger className="py-2 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((sub) => (
            <Link
              key={sub.title}
              href={sub.url}
              onClick={onNavigate}
              className="flex select-none items-start gap-3 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted"
            >
              <span className="mt-0.5 text-primary">{sub.icon}</span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">
                  {sub.title}
                </span>
                {sub.description && (
                  <span className="text-xs leading-snug text-muted-foreground">
                    {sub.description}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      onClick={onNavigate}
      className="py-2 font-semibold text-foreground"
    >
      {item.title}
    </Link>
  );
}

