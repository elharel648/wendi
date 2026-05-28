"use client";

import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
  };

  return (
    <nav className={scrolled ? "scrolled" : undefined}>
      <div className="nav-inner">
        <a href="/" className="nav-home" title="דף הבית">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </a>
        <div className="nav-logo">
          <a href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wendi-logo.png" alt="Wendi" style={{ height: "36px", width: "auto" }} />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/about">
              אודותינו <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="/about">מי אנחנו</a>
              <a href="/about#faq">שאלות ותשובות</a>
              <a href="/about#gallery">גלריה</a>
            </div>
          </li>
          <li>
            <a href="/pitronot">
              מגזרים <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="/pitronot#finantsim">פיננסים</a>
              <a href="/pitronot#logistika">לוגיסטיקה ותחבורה</a>
              <a href="/pitronot#tsiburi">מוסדות ציבוריים</a>
              <a href="/pitronot#briut">שירותי בריאות</a>
              <a href="/pitronot#taasia">תעשייה ומסחר</a>
              <a href="/pitronot#tayarut">תיירות</a>
            </div>
          </li>
          <li>
            <a href="/modulim">מודולים</a>
          </li>
          <li>
            <a href="/mamashkim">
              ממשקים <span className="arr">▾</span>
            </a>
            <div className="dropdown">
              <a href="/mamashkim#why">למה ממשקים</a>
              <a href="/mamashkim#different">מה מייחד אותנו</a>
              <a href="/mamashkim#types">סוגי ממשקים</a>
              <a href="/mamashkim#systems">מערכות שחיברנו</a>
              <a href="/mamashkim#process">תהליך העבודה</a>
            </div>
          </li>
        </ul>
        <a href="#contact" className="nav-cta">
          דברו איתנו
        </a>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          role="switch"
          aria-label="מצב כהה / בהיר"
          title="מצב כהה / בהיר"
        >
          <svg
            className="tt-ico tt-moon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span className="tt-track">
            <span className="tt-thumb" />
          </span>
          <svg
            className="tt-ico tt-sun"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
