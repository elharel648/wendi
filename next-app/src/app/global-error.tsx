"use client";

import { useEffect } from "react";

/**
 * Root error boundary — catches failures in the root layout itself. It must
 * render its own <html>/<body> because the layout has crashed. Kept minimal
 * and dependency-free so it works even when everything else is broken.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="he" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#1e293b",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>משהו השתבש</h1>
        <p style={{ marginTop: 12, maxWidth: 420, color: "#64748b", lineHeight: 1.6 }}>
          אירעה תקלה בטעינת הדף. אנא נסו לרענן.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 28,
            minHeight: 44,
            padding: "0 28px",
            borderRadius: 999,
            border: "none",
            background: "#0D9488",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          נסו שוב
        </button>
      </body>
    </html>
  );
}
