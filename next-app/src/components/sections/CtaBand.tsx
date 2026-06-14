"use client";

import { useState } from "react";
import Image from "next/image";
import type { CtaBandContent } from "@/content/homeSections";
import { homeSections } from "@/content/homeSections";

export function CtaBand({ content }: { content?: CtaBandContent }) {
  const c = content ?? homeSections.cta;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(".cf-in");
    let valid = true;
    inputs.forEach((inp) => {
      const val = (inp as HTMLInputElement).value.trim();
      if (!val) {
        (inp as HTMLElement).style.borderColor = "#e05c5c";
        valid = false;
      } else {
        (inp as HTMLElement).style.borderColor = "";
      }
    });
    if (!valid) return;
    setSubmitted(true);
    inputs.forEach((inp) => {
      (inp as HTMLInputElement).value = "";
      (inp as HTMLElement).style.borderColor = "";
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="cta-band" id="contact">
      <Image
        src="/wendi-char1.webp"
        className="cta-char"
        alt=""
        width={480}
        height={960}
        sizes="440px"
        style={{ width: "auto", height: "440px" }}
      />
      <div className="cta-content">
        <div className="eyebrow" style={{ marginBottom: 16 }}>{c.eyebrow}</div>
        <h2 style={{ marginBottom: 8 }}>{c.heading}</h2>
        <p style={{ marginBottom: 8 }}>
          התקשרו <strong style={{ color: "var(--teal)" }}>077-7743044</strong> או מלאו את הפרטים
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="cf-row">
            <input className="cf-in" type="text" placeholder="שם" />
            <input className="cf-in" type="tel" placeholder="טלפון" />
            <input className="cf-in" type="text" placeholder="ארגון" />
            <input className="cf-in" type="text" placeholder="תפקיד בארגון" />
          </div>
          <div className="cf-row">
            <input className="cf-in" type="email" placeholder="כתובת מייל" />
            <select className="cf-in cf-select" defaultValue="">
              <option value="" disabled>מעוניינים ב:</option>
              <option>פורטל ואפליקציה</option>
              <option>LMS — למידה והכשרה</option>
              <option>Workflow וטפסים</option>
              <option>הערכת ביצועים</option>
              <option>Wendi AI</option>
              <option>כל הפתרון</option>
            </select>
            <select className="cf-in cf-select" defaultValue="">
              <option value="" disabled>כמות עובדים</option>
              <option>עד 200</option>
              <option>200 – 500</option>
              <option>500 – 1,000</option>
              <option>1,000 – 5,000</option>
              <option>מעל 5,000</option>
            </select>
            <button
              className="cf-btn"
              type="submit"
              disabled={submitted}
            >
              {submitted ? c.submittedLabel : c.submitLabel}
            </button>
          </div>
        </form>

        <p style={{ fontSize: ".76rem", color: "var(--muted)", marginTop: 12 }}>
          פגישת היכרות של 30 דקות, ללא התחייבות.
        </p>
      </div>
    </section>
  );
}
