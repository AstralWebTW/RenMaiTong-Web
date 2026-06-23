# Software Design Document — Mr.Card Marketing Website (`mcard-web`)

**Last updated:** 2026-06-22
**Companion to:** `docs/PRD.md`

---

## 1. Overview

A small, statically renderable marketing site built with **Next.js 15 (App
Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, deployed on
**Vercel**. There is no backend, database, or authentication — every route renders
without runtime data, so the whole site is served as static assets / edge-cached
HTML. All content is **Traditional Chinese (zh-Hant-TW)**, matching the mobile
app's default locale; the homepage's highlight feature is the **AI assistant**,
which has its own spotlight section above the general feature grid.

## 2. Tech stack & rationale

| Concern    | Choice                          | Why                                                          |
| ---------- | ------------------------------- | ----------------------------------------------------------- |
| Framework  | Next.js 15 App Router           | First-class Vercel support; file-based routing; SEO metadata |
| UI runtime | React 19                        | Bundled with Next 15                                         |
| Styling    | Tailwind CSS v4 (`@theme`)      | Fast, tokenized design system; no separate config file       |
| Language   | TypeScript (strict)             | Type safety for a small surface                              |
| Hosting    | Vercel                          | Zero-config `next build`; PR previews; free TLS              |

## 3. Project structure

```
mcard-web/
├── app/
│   ├── layout.tsx            # Root layout, <html>, global metadata (SEO/OG)
│   ├── globals.css           # Tailwind import + @theme design tokens
│   ├── icon.svg              # Favicon (Next file convention)
│   ├── page.tsx              # Homepage (hero, AI spotlight, features, how-it-works)
│   ├── contact/page.tsx      # Contact channels + company info
│   ├── privacy/page.tsx      # Privacy Policy — fetched from backend, fallback body
│   ├── terms/page.tsx        # Terms of Service — fetched from backend, fallback body
│   └── components/
│       ├── SiteHeader.tsx    # Sticky nav + logo + CTA
│       ├── SiteFooter.tsx    # Footer with legal/contact links
│       ├── MobileNav.tsx     # client: hamburger menu (portal to body) for < md
│       ├── BrandMark.tsx     # Logo from /api/app/config/brand (async, SVG fallback)
│       └── PhoneVideo.tsx    # Device bezel wrapping the AI demo screen-recording
├── lib/
│   ├── config.ts             # Backend base URL + env switch (local/production)
│   └── api.ts                # Server-side typed fetchers (brand, legal)
├── docs/                     # PRD + this SDD
├── public/
│   └── video/                # ai-assistant.mp4 (+ poster) — AI spotlight demo
├── .env.example              # API_ENV / API_BASE_URL documentation
├── package.json
├── next.config.mjs
├── postcss.config.mjs        # Registers @tailwindcss/postcss
├── tsconfig.json
└── CLAUDE.md
```

## 4. Routing

App Router maps folders to routes. All pages are **Server Components** (no
`"use client"`), so they pre-render to static HTML:

| File                  | Route      |
| --------------------- | ---------- |
| `app/page.tsx`        | `/`        |
| `app/contact/page.tsx`| `/contact` |
| `app/privacy/page.tsx`| `/privacy` |
| `app/terms/page.tsx`  | `/terms`   |

`SiteHeader` and `SiteFooter` are shared and imported by each page (no shared
layout below root, to keep each page self-describing).

## 5. Design system

Tokens are declared once in `globals.css` under Tailwind v4's `@theme` block, which
generates matching utilities (e.g. `--color-brand` → `bg-brand`, `text-brand`).
Values mirror the mobile app's `Colors.xaml`:

| Token             | Value     | Usage                          |
| ----------------- | --------- | ------------------------------ |
| `--color-ink`     | `#080808` | Page background                |
| `--color-surface` | `#16161c` | Cards / panels                 |
| `--color-brand`   | `#6638fb` | Primary actions, brand accents |
| `--color-accent`  | `#00d68f` | Secondary highlights, icons    |
| `--color-muted`   | `#9a9aa8` | Secondary text                 |

Legal pages use a `.prose-legal` utility class (defined in `globals.css`) for
consistent heading/paragraph/list typography instead of pulling in a Markdown/MDX
pipeline.

## 6. Components

- **SiteHeader** — sticky, blurred top bar; wordmark logo (inline SVG); in-page
  anchor nav (`/#features`, `/#how`, `/#privacy`); "Get the app" CTA.
- **SiteFooter** — product/legal/contact link columns; dynamic copyright year.
- **Homepage-local components** (in `page.tsx`): `FeatureIcon` (inline SVG switch),
  `PhoneCard` (CSS mockup of a digital card). Kept local because they are not reused.

All icons are inline SVG — **no icon library or external font/image dependency**,
which keeps the bundle tiny and avoids network requests for assets.

## 7. SEO & metadata

- Root `metadata` in `layout.tsx`: title template, description, keywords, OpenGraph,
  Twitter card, `robots: index/follow`, and `metadataBase`.
- Per-page `metadata` exports on `/privacy` and `/terms` set page titles via the
  `%s · Mr.Card` template.
- `app/icon.svg` provides the favicon automatically.

> ⚠️ Update `SITE_URL` in `app/layout.tsx` once the production domain is known so
> canonical/OG URLs are correct.

## 8. Backend data layer (API)

Legal content and the brand logo are served by the RenMaiTong admin backend
(Laravel) so they can be edited without redeploying this site.

### Environment switch — `lib/config.ts`

```
API_ENV=local      -> http://renmaitongadmin.test
API_ENV=production -> https://renmaitong-admin.astralweb.com.tw   (default)
API_BASE_URL=...   -> overrides both (e.g. staging)
```

Switch by editing `DEFAULT_API_ENV` in `lib/config.ts` or by setting the `API_ENV`
env var (see `.env.example`). The resolved base URL has its trailing slash stripped.

### Fetchers — `lib/api.ts`

| Function | Endpoint | Returns |
| --- | --- | --- |
| `getBrand()` | `GET /api/app/config/brand` | `{ name, tagline, logo_url, logo_mime_type, logo_size }` |
| `getLegalDocument(kind)` | `GET /api/app/legal/{terms\|privacy}` | `{ content (sanitized HTML), last_updated_at }` |
| `getLegalLinks()` | `GET /api/app/legal/links` | `{ terms_of_service_url, privacy_policy_url }` |

Design points:

- **Server-only** — called from async Server Components; no browser fetch, no CORS.
- **Cached** via Next fetch cache (`revalidate = CONTENT_REVALIDATE_SECONDS`, 600s).
  Legal pages also export `revalidate = 600` so they regenerate via ISR.
- **Fail-safe** — every fetcher returns `null` on non-2xx / network error / bad
  shape. `unwrap()` accepts either `{ data: ... }` or a bare payload.
- **Graceful fallback** — `BrandMark` renders a built-in SVG mark if the brand
  endpoint fails; `/privacy` and `/terms` render `PrivacyFallback` / `TermsFallback`
  (the full built-in Chinese policy) if the document endpoint fails. This keeps the
  build green and the verification pages populated even when the backend is down.
- Sanitized HTML is injected with `dangerouslySetInnerHTML` — safe because the
  backend sanitizes it; do not feed unsanitized HTML through this path.

## 9. Build & deployment

### Local

```bash
npm install
npm run dev      # http://localhost:3000  (set API_ENV=local in .env.local for local backend)
npm run build    # production build
npm start        # serve the production build
```

> Do not run `npm run build` while `npm run dev` is running — `build` rewrites
> `.next` and corrupts the dev server (MODULE_NOT_FOUND). Stop dev first.

### Vercel

1. Push the repo to GitHub/GitLab.
2. Import the project in Vercel — framework preset **Next.js** is auto-detected.
3. No env vars required (defaults to the production backend). Optionally set
   `API_ENV` / `API_BASE_URL`.
4. Build command `next build`, output handled by Vercel automatically.
5. After deploy, copy the homepage, `/privacy`, and `/terms` URLs into the Google
   Cloud Console OAuth consent screen (Application home page, Privacy policy link,
   Terms of service link).

## 10. Security & privacy considerations

- No user data is collected or processed by this website; it is informational only.
- No secrets, API keys, or env vars — nothing sensitive to leak.
- All external links use `rel="noopener noreferrer"`.

## 11. Maintenance notes

- **Legal content** is edited in the **backend** (`/api/app/legal/*`), not here.
  The `PrivacyFallback` / `TermsFallback` JSX is only the offline safety net.
- **Backend base URL** is switched in `lib/config.ts` (or via `API_ENV`).
- **Download links** in `app/page.tsx` (`#download` section) are placeholders;
  replace with real store URLs at launch.
- **Contact email** (`mrcard.tw@gmail.com`) appears in the footer, the contact
  page, and both legal fallbacks — change them together if it moves.
- **`SITE_URL`** in `app/layout.tsx` should be updated to the production domain.
