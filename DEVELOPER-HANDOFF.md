# Wendi Website — Developer Handoff

מסמך מסירה למפתח: חיבור האתר לשרתי Azure + שינוי דומיין.

---

## 1. הקוד

- **Repo:** `https://github.com/elharel648/wendi`
- **Branch:** `main` (העדכני — כל העבודה כולל מעבר production-readiness ותיקוני מובייל).
- **אפליקציה:** הקוד החי נמצא בתיקייה **`next-app/`** בלבד. קבצי ה-`.html` בשורש הם reference ישן — להתעלם.
- **Stack:** Next.js 16.2.6 (App Router, Turbopack), React 19, Tailwind v4, TypeScript. CMS: Umbraco headless (Delivery API).

```bash
git clone https://github.com/elharel648/wendi.git
cd wendi/next-app
npm ci
npm run dev      # dev server, http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

---

## 2. משתני סביבה (חובה ל-production)

האתר קורא משתנה סביבה **אחד**:

| משתנה | תיאור |
|---|---|
| `UMBRACO_API_URL` | כתובת ה-Umbraco Delivery API (server-side בלבד, ללא `NEXT_PUBLIC_`) |

- בדיב הוא ב-`next-app/.env.local` ומצביע על `http://localhost:64763` (Umbraco מקומי).
- **בפרודקשן חובה להגדיר אותו לכתובת ה-Umbraco האמיתי** (ב-Azure App Service: Configuration → Application settings).
- אם לא מוגדר/לא נגיש — האתר **לא נופל**: הוא מציג את התוכן ה-bundled (ברירת מחדל מהקוד), אבל עריכה ב-CMS לא תשפיע. לכן ודא שהוא מוגדר אם רוצים CMS חי.
- `next.config.ts` גוזר את ה-`images.remotePatterns` אוטומטית מ-`UMBRACO_API_URL`, כדי ש-`next/image` יוכל לטעון תמונות מ-Umbraco.

---

## 3. Deployment ל-Azure

האתר הוא **Next.js SSR/ISR** (יש `revalidate: 60` על fetch מה-CMS) — **לא** export סטטי. צריך runtime של Node.

### אפשרות A — Azure App Service (Linux, Node 20+)  ← מומלץ
1. צור Web App (Linux, Node 20 LTS).
2. Build & deploy:
   ```bash
   cd next-app
   npm ci
   npm run build
   ```
   העלה את כל `next-app/` (כולל `.next/`, `public/`, `package.json`, `next.config.ts`).
3. Startup command: `npm run start` (או `next start -p $PORT`).
4. App Settings: `UMBRACO_API_URL`, `NODE_ENV=production`, `WEBSITES_PORT=3000` (אם נדרש).
5. CI/CD: אפשר לחבר GitHub Actions ל-`main` של `elharel648/wendi` → deploy אוטומטי.

### אפשרות B — Azure Static Web Apps (עם Next.js hybrid)
- תומך ב-Next.js SSR דרך ה-build adapter המובנה. חבר את ה-repo, Azure בונה אוטומטית. הגדר `UMBRACO_API_URL` ב-Configuration.
- **שים לב:** דורש שה-build יעבוד עם ה-adapter; ודא שאין `output: 'export'` (אין — והאתר צריך SSR ל-ISR).

> אם תרצה הכי פשוט ללא ניהול שרת — App Service מנצח. אם רוצים CDN-first עם פחות תחזוקה — Static Web Apps.

### בדיקות לפני go-live
- `npm run build` עובר נקי (12 routes, כולם prerendered).
- `UMBRACO_API_URL` מוגדר ונגיש מהשרת (לא מאחורי VPN/localhost).
- הנכסים ב-`public/` עלו (לוגואים, og-image, icons, webmanifest, WebP).

---

## 4. שינוי דומיין

ב-Azure App Service:
1. Custom domains → Add custom domain → הזן את הדומיין (למשל `www.wendi.co.il`).
2. אצל ה-DNS provider של הדומיין: הוסף רשומת `CNAME` (ל-www) או `A`/`TXT` לאימות, לפי מה ש-Azure מציג.
3. הוסף **App Service Managed Certificate** (TLS חינמי) או העלה תעודה.
4. אכוף HTTPS (HTTPS Only = On).

> שים לב: ה-`metadataBase` בקוד מוגדר ל-`https://www.wendi.co.il` ([next-app/src/app/layout.tsx](next-app/src/app/layout.tsx)). אם הדומיין הסופי שונה — לעדכן שם (משפיע על OG/canonical/sitemap).

---

## 5. ⚠️ נקודות קריטיות לפני production

1. **🔴 סיסמת Umbraco חשופה ב-git (CMS repo, לא זה):** בפרויקט ה-CMS (`WendiCms`), הקובץ `appsettings.Development.json` מכיל סיסמת admin ב-plaintext והוא tracked ב-git. **חובה:** להחליף סיסמה, להוסיף ל-`.gitignore`, ולנקות מההיסטוריה. (לא טופל — נשאר לטיפול.)
2. **`UMBRACO_API_URL` של פרודקשן** — חייב להצביע על שרת Umbraco אמיתי נגיש, לא localhost.
3. **`metadataBase`** — לוודא שתואם לדומיין הסופי.

---

## 6. מצב איכות נוכחי

- ✅ `npm run build` — עובר, 12 עמודים סטטיים.
- ✅ `npx tsc --noEmit` — נקי.
- ✅ `npm run lint` — 0 errors / 0 warnings.
- ✅ אומת בדפדפן (דסקטופ + מובייל).
- ✅ Security headers (CSP/HSTS/X-Frame-Options) מוגדרים ב-`next.config.ts`.
- 📄 דוח אבטחה/ביצועים/CMS מלא: [AUDIT-REPORT.md](AUDIT-REPORT.md).
