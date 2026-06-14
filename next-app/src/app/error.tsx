"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-segment error boundary. Catches render/runtime errors within a page
 * and offers a recovery action instead of a blank screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for monitoring; the digest links to server logs.
    console.error(error);
  }, [error]);

  return (
    <div
      dir="rtl"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 text-center"
    >
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
        משהו השתבש
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
        נתקלנו בתקלה בלתי צפויה. אפשר לנסות שוב, ואם זה חוזר — לרענן את הדף.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0D9488] px-7 font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          נסו שוב
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-7 font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
        >
          לעמוד הבית
        </Link>
      </div>
    </div>
  );
}
