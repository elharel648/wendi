# דוח מוכנוּת לפרודקשן — אתר Wendi

**תאריך:** 2026-06-11
**טכנולוגיה:** Next.js 16.2.6 (App Router + Turbopack), React 19, Tailwind v4, TypeScript 5, Umbraco headless CMS
**שיטה:** סריקת קוד בפועל ע"י 6 סוכני סקירה מקבילים (אבטחה, סנכרון CMS, ביצועים, מובייל, נגישות, מוכנוּת פרודקשן) + הרצת build/lint/typecheck.

---

## 🚦 מצב כללי

| ציר | מצב | סיכום |
|---|---|---|
| **Build** | ✅ עובר | 12 עמודים סטטיים, 4 שניות, Turbopack |
| **TypeScript** | ✅ נקי | 0 שגיאות |
| **ESLint** | ❌ נכשל | 10 שגיאות (חוסם CI), 8 אזהרות |
| **אבטחה** | 🔴 בעיה קריטית | סיסמת admin של Umbraco ב-git |
| **סנכרון CMS** | 🟡 ~75% עריך | פערים בעיקר בעמוד ממשקים |
| **ביצועים** | 🟡 טוב עם תיקונים | ~450KB dead code, תמונות כבדות, Lottie |
| **מובייל** | 🔴 בעיה קריטית | הכרטיס החדש בממשקים נעלם במובייל |
| **נגישות** | 🟡 רובו תקין | ניגודיות הזהב נכשלת WCAG AA |

---

## 🔴 קריטי — חובה לפני עלייה לאוויר

### 1. סיסמת admin של Umbraco חשופה ב-git
- **קובץ:** `WendiCms/appsettings.Development.json:30` — `UnattendedUserPassword: "WendiCms2026!"` ב-plaintext, **tracked ב-git**.
- **סיכון:** כל מי שיש לו גישה להיסטוריית ה-repo מקבל שליטה מלאה ב-CMS.
- **תיקון:**
  1. להחליף סיסמה מיד.
  2. להוסיף ל-`.gitignore` של WendiCms: `appsettings.Development.json`, `appsettings.*.json`, `Properties/launchSettings.json`.
  3. למחוק מהיסטוריית git (`git filter-repo` / `filter-branch`).
  4. אחרי deploy — לוודא ש-unattended install מושבת בפרודקשן.

### 2. הכרטיס החדש בעמוד ממשקים נעלם לגמרי במובייל
- **קובץ:** `MamashkimHero.tsx:79` — `<div className="hidden md:block">` עוטף את ה-ConstellationHub בלי שום fallback.
- **השפעה:** במובייל (<768px) המשתמש רואה כותרת + CTA, ואז **שטח ריק** — כל ויזואל האינטגרציות נעלם.
- **תיקון:** להוסיף גרסת מובייל — גריד לוגואים פשוט (`md:hidden`) מתחת לטקסט.

### 3. ניגודיות הזהב נכשלת WCAG AA
- **קובץ:** `modulim.tsx` (onColor, סף 0.62) — הזהב `#E4B322` מקבל טקסט לבן בניגודיות **1.95:1** (נדרש 4.5:1).
- **תיקון:** להוריד את הסף ב-`onColor()` מ-0.62 ל-0.5, או hardcode לזהב טקסט כהה. תיקון של שורה אחת שמשפיע על QuickJump/Stack/Bento.

---

## 🟠 חשוב (HIGH)

### 4. 10 שגיאות ESLint חוסמות CI
- **`Sectors.tsx`** (שורות 30,40,48,54,59,65): 6× חסר `key` prop ברשימות — **באג React אמיתי**.
- **`gravity.tsx`**: `Math.random()` ב-render, שימוש-לפני-הגדרה. (קומפוננטה מתה — ראה סעיף 11, אפשר למחוק.)
- **`infinite-slider.tsx:41`**: `setState` ב-effect. הקומפוננטה **בשימוש** (marquee) — לתקן.

### 5. נכסי SEO/אייקונים חסרים — 404 בפרודקשן
- `layout.tsx` מפנה ל-`og-image.png`, `icon-32.png`, `icon-192.png`, `apple-icon.png`, `site.webmanifest` — **אף אחד לא קיים ב-public/**.
- **השפעה:** preview שבור בשיתוף ברשתות, אייקוני PWA חסרים, שגיאות console.
- **תיקון:** להוסיף את 5 הקבצים, או להסיר את ההפניות.

### 6. תמונות hero כבדות (LCP)
- `wendi-char1.png` 1.7MB, `wendi-char2.png` 1.5MB, `05.png` 1.9MB, screenshots ~2.9MB.
- **תיקון:** המרה ל-WebP/AVIF (חיסכון 60-80%), `priority` על תמונת ה-hero.

### 7. XSS — `dangerouslySetInnerHTML` על תוכן CMS בלי sanitization צד-לקוח
- 5 מקומות (Hero, MamashkimHero, ModulimHero, WallOfLove, layout JSON-LD).
- Umbraco מסנן צד-שרת (TinyMCE), אבל אין שכבת הגנה שנייה.
- **תיקון:** DOMPurify ב-`src/lib/sanitize.ts` עם whitelist תגים.

---

## 🟡 בינוני (MEDIUM)

### 8. סנכרון CMS — ~75% מהתוכן עריך. הפערים העיקריים:
| פער | קובץ | תיקון |
|---|---|---|
| 8 שמות מערכות בכרטיס ממשקים (נותקו מ-CMS) | `MamashkimHero.tsx:26-37` | להוסיף שדה CMS או להחזיר merge |
| כותרת "30+ מערכות" + רשימת 25 מערכות במרקי | `IntegrationsMarquee.tsx` | block list ב-CMS |
| תוויות תהליך (DISCOVERY/DESIGN/BUILD/LAUNCH) | `IntegrationsProcess.tsx:11-44` | שדה CMS |
| פסקת typewriter + CTA בבית | `home.ts` | שדות CMS |
| גלריית וידאו (21 וידאו) + טאבי FAQ ב-about | `about.ts` | block list |
| כרטיס Wendi AI ב-FloatingFeatures | `homeSections.ts` | שדה CMS |

**הערה:** אייקונים, צבעים וגרדיאנטים מכוונים להישאר בקוד (לא פער).

### 9. ביצועים
- **Dead code ~450KB:** `gravity.tsx` + `matter-js`/`poly-decomp`/`svg-path-commander` — לא בשימוש. **למחוק.**
- **שתי ספריות אנימציה:** `framer-motion` + `motion` שתיהן מותקנות. לאחד ל-`framer-motion` בלבד (אבל ה-stacking-card שלנו משתמש ב-`motion/react` — צריך החלפת import).
- **Lottie:** ~34 fetch בו-זמנית בעמוד modulim. להוסיף `cache: 'force-cache'` / lazy-load.
- **`<img>` גולמי** (gallery, marquee, team) → להחליף ל-`next/image`.

### 10. error boundaries חסרים
- אין `error.tsx`, `global-error.tsx`, `not-found.tsx` מותאם. להוסיף שלושתם.

### 11. `images.remotePatterns: []` ריק
- כש-Umbraco יגיש תמונות דרך `next/image` הן ייחסמו. להוסיף את ה-host של Umbraco. (כרגע latent — CMS מחזיר רק טקסט.)

### 12. מובייל נוסף
- `stacking-card.tsx`: `min-h-screen` מעיק בטלפון — לעשות רספונסיבי.
- **Touch targets <44px:** טאבי QuickJump (`py-2`=16px), pills בניווט. להגדיל.
- **`onMouseEnter` בלבד** (ModulesStack + 6 קומפוננטות about): לא עובד במגע. להוסיף `onTouchStart`/`onFocus` או `:group-hover`.

### 13. נגישות נוסף
- אין skip-link. אנימציות framer-motion לא מכבדות `prefers-reduced-motion` (יש פתרון CSS גלובלי קל).
- `onFocus`/`onBlur` חסרים במקומות עם hover.
- ולידציית טופס ב-CtaBand לא מוכרזת לקורא מסך.

---

## 🟢 נמוך / היגיינה

- **3 קבצים מתים** (אישור: 0 imports): `ModulesBento.tsx`, `IntegrationsHero.tsx` (modulim), `tubelight-navbar.tsx` — למחוק.
- 8 אזהרות ESLint (משתנים לא בשימוש, הערות disable מתות).
- `UMBRACO_API_URL` חייב להיות מוגדר בסביבת הפרודקשן (ה-`.env.local` לא עולה ל-deploy). האתר מתפקד גם בלעדיו (fallback לתוכן bundled) — אבל יציג תוכן ישן בשקט.

---

## ✅ מה כבר מצוין

- **Build** סטטי מלא, **TypeScript** נקי.
- **Security headers** מעולים: CSP, HSTS, X-Frame-Options, COOP/CORP, Permissions-Policy, `poweredByHeader: false`.
- **SEO:** `lang="he" dir="rtl"`, `metadataBase`, canonical, OpenGraph, JSON-LD, sitemap + robots מכסים את כל ה-routes.
- **פונטים:** Heebo עם `display: swap` + preload — אין layout shift.
- **CMS:** degradation חיננית מלאה (נופל ל-bundled content), `Promise.all` בלי waterfalls.
- **`.env.local`** מוגן ב-gitignore, `UMBRACO_API_URL` server-side בלבד.
- **RTL & alt text** — כיסוי טוב.

---

## 📋 סדר עבודה מומלץ לסגירת האתר

**שלב 1 — חוסמי שחרור (יום):**
1. להחליף סיסמת Umbraco + לנקות מ-git (#1)
2. fallback מובייל לכרטיס ממשקים (#2)
3. תיקון ניגודיות הזהב (#3)
4. 10 שגיאות ESLint (#4)
5. נכסי OG/אייקונים חסרים (#5)

**שלב 2 — איכות (1-2 ימים):**
6. דחיסת תמונות (#6), DOMPurify (#7)
7. error/not-found boundaries (#10)
8. Touch targets + onTouch/onFocus (#12, #13)
9. מחיקת dead code + ספריית motion כפולה (#9, #11-low)

**שלב 3 — סנכרון CMS מלא (2-3 ימים):**
10. לסגור את פערי ה-CMS (#8) — שדות לכרטיס ממשקים, marquee, process, גלריה, וכו'.

**שלב 4 — ליטוש:**
11. reduced-motion, skip-link, remotePatterns, ניקוי אזהרות.