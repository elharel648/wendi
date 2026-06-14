import Link from "next/link";

export const metadata = {
  title: "הדף לא נמצא",
};

export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 text-center"
    >
      <p className="text-[clamp(4rem,12vw,7rem)] font-black leading-none tracking-tight text-slate-900">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
        הדף שחיפשתם לא נמצא
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
        ייתכן שהקישור שגוי או שהדף הוסר. אפשר לחזור לעמוד הבית ולהמשיך משם.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0D9488] px-7 font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        חזרה לעמוד הבית
      </Link>
    </div>
  );
}
