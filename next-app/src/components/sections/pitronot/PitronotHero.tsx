"use client";

const TEAL = "#0D9488";

export function PitronotHero() {
  return (
    <section
      dir="rtl"
      aria-label="פתרונות לפי מגזר — הירו"
      className="relative isolate overflow-hidden bg-paper px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8 lg:pt-36"
    >
      <SoftGlow />

      <div className="relative z-10 mx-auto max-w-7xl">
        <HeroHeadline />
      </div>
    </section>
  );
}

function HeroHeadline() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-black leading-[1.08] tracking-[-0.035em] text-ink">
        <span className="block">וונדי מותאמת לארגון שלכם —</span>
        <span className="block" style={{ color: TEAL }}>
          לא משנה באיזה מגזר
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.8] text-muted-fg sm:text-lg">
        כל מגזר מתמודד עם אתגרים שונים — רגולציה, פריסה, עומסים ואוכלוסיות
        מגוונות. פלטפורמה אחת עם התאמות, ממשקים ופתרונות ייעודיים לכל מגזר.
      </p>
    </div>
  );
}

function SoftGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-48 right-[-10%] h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.12), transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] left-[-15%] h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(62,207,190,0.10), transparent 65%)",
        }}
      />
    </div>
  );
}
