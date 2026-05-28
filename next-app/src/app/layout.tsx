import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wendi – פלטפורמת העובד המובילה בישראל",
  description:
    "וונדי היא הפלטפורמה שמנהלי HR בחרו. תקשורת, למידה, תהליכים דיגיטליים וממשקים — במקום אחד.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
