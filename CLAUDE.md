# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mcard-web** — the public marketing and **OAuth-verification** website for the
**名片先生 (MCard / RenMaiTong)** digital business card app. Its primary job is to
satisfy Google Cloud Console's requirement that an app using Google Sign-In expose
a public **homepage**, **Privacy Policy**, and **Terms of Service** before the OAuth
consent screen can be verified. It is also the product's marketing landing page.

The companion mobile app is a separate .NET MAUI repo (`~/RenMaiTong`, bundle ID
`com.astralweb.renmaitong`). This repo is **web only** — no app functionality, auth,
or backend lives here.

See `docs/PRD.md` and `docs/SDD.md` for full product and design context.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · deployed on Vercel.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:3000
npm run build      # production build (what Vercel runs)
npm start          # serve the production build locally
npm run lint       # Next.js lint
```

There is no test suite — verify changes by running `npm run dev` and checking
`/`, `/privacy`, and `/terms` render correctly and responsively.

## Architecture

- **App Router, mostly Server Components.** Pages are static Server Components.
  The only client components (`"use client"`) are leaf interactions: `MobileNav`
  (hamburger menu) and `PhoneVideo` (scroll-triggered playback). Keep it that way —
  `SiteHeader` stays a Server Component so the async `BrandMark` works; the mobile
  menu is a separate client leaf it renders.
- **Mobile nav:** below `md`, the desktop nav + CTA are hidden and `MobileNav`
  shows a hamburger that opens a full-width dropdown via a **React portal to
  `document.body`** (required: the header's `backdrop-blur` would otherwise be the
  containing block for `position: fixed` and clip the menu to the 64px header).
- **Routes** map from `app/`: `app/page.tsx` → `/`, `app/contact/page.tsx` →
  `/contact`, `app/privacy/page.tsx` → `/privacy`, `app/terms/page.tsx` → `/terms`.
- **Language:** all content is **Traditional Chinese (zh-Hant-TW)** to match the
  app's default locale. `<html lang>` is set in `app/layout.tsx`. The Chinese
  product name is **名片先生** (kept alongside the "MCard" wordmark).
- The homepage's **highlight feature is the AI assistant** — it has its own
  spotlight section (`AiSpotlight` in `app/page.tsx`, anchor `#ai`) above the
  general feature grid. Keep it visually distinct from the other features.
- **Shared chrome** is `app/components/SiteHeader.tsx` and `SiteFooter.tsx`,
  imported per-page (there is no nested layout below the root).
- **Design tokens** live in `app/globals.css` under Tailwind v4's `@theme` block.
  Brand colors mirror the app's `Colors.xaml`: ink `#080808`, brand purple
  `#6638fb`, accent green `#00d68f`. Use the generated utilities (`bg-brand`,
  `text-accent`, etc.) — do not hardcode hex in components.
- **Icons are inline SVG** — no icon library, no external fonts. One real app
  the AI spotlight plays an app screen-recording (`public/video/ai-assistant.mp4`,
  2× speed, muted/loop/autoplay) via `PhoneVideo`; the hero uses a CSS `PhoneCard`
  mockup. No screenshots. The only remote image is the brand logo (from the API).
  Re-encode the video with ffmpeg (`setpts=PTS/2,scale=720:-2 -crf 21 -an`).
- **Features shown reflect the real app:** card scanning (OCR), AI background check
  vs. public/government data, interaction notes → AI insight card, the 小脈 AI
  assistant (highlight), contact management (tags), and reminders. **Google
  Sign-In is intentionally NOT listed as a feature** — but the app still uses it
  (that's why this verification site exists), so keep its Privacy Policy disclosure.
- **Legal copy & logo are backend-driven.** See "Backend data layer" below.
  The `.prose-legal` class in `globals.css` styles legal HTML (no MDX pipeline).

## Backend data layer

The site pulls content from the RenMaiTong admin backend (Laravel). All access goes
through two files:

- **`lib/config.ts`** — resolves the backend base URL. Switch environments by
  changing `DEFAULT_API_ENV` here, or by setting the `API_ENV` env var
  (`local` → `http://renmaitongadmin.test`, `production` →
  `https://renmaitong-admin.astralweb.com.tw`). `API_BASE_URL` env var overrides
  both. See `.env.example`.
- **`lib/api.ts`** — typed, server-side fetchers. Every function returns `null` on
  any failure (non-2xx, network, bad shape) so callers fall back gracefully. They
  use Next's fetch cache with `revalidate` (`CONTENT_REVALIDATE_SECONDS`).

Endpoints consumed:

| Function | Endpoint | Used by |
| --- | --- | --- |
| `getBrand()` | `GET /api/app/config/brand` → `{success,data:{name,tagline,logo_url,...}}` | `BrandMark` (header logo) |
| `getLegalDocument('privacy'\|'terms')` | `GET /api/app/legal/{kind}` → `{success,data:{content,last_updated_at}}` | `/privacy`, `/terms` |
| `getLegalLinks()` | `GET /api/app/legal/links` | available; not wired into UI |

Responses may be wrapped in `{ data }` or returned bare — `unwrap()` handles both.

## Editing the legal pages

`/privacy` and `/terms` are the reason this site exists — load-bearing for Google
verification. They are **async Server Components** that fetch `content` (sanitized
HTML) + `last_updated_at` from the backend and render it via
`dangerouslySetInnerHTML` (the HTML is sanitized server-side — keep it that way; do
not inject unsanitized HTML).

- **Edit the live text in the backend**, not here. The JSX in `PrivacyFallback` /
  `TermsFallback` is only shown when the API is unavailable — keep it reasonable
  but it is not the source of truth.
- The fallback Privacy Policy must keep its **Google Sign-In / Google API Services
  User Data Policy (Limited Use)** disclosure.
- `FALLBACK_LAST_UPDATED` is only used when the API omits `last_updated_at`.
- The contact email `mrcard.tw@gmail.com` appears in `SiteFooter.tsx`,
  `app/contact/page.tsx`, and both legal fallbacks — update them together.
- The header logo comes from `getBrand()` via `app/components/BrandMark.tsx`;
  it falls back to a built-in SVG mark when the brand endpoint is unavailable.

## Before launch / things that are placeholders

- **Download links** in the `#download` section of `app/page.tsx` are `#`
  placeholders — replace with real App Store / Google Play URLs.
- **`SITE_URL`** in `app/layout.tsx` is `https://mcard-web.vercel.app` — update to
  the production/custom domain so canonical and OpenGraph URLs are correct.
- Content is Traditional Chinese (zh-TW). If an English locale is later needed,
  add it via Next.js i18n routing rather than duplicating pages by hand.

## Deployment

Vercel auto-detects the Next.js preset. The default backend is **production**, so
no env vars are strictly required — but you can set `API_ENV` / `API_BASE_URL` in
Vercel project settings to point elsewhere. After deploying, paste the homepage,
`/privacy`, and `/terms` URLs into the Google Cloud Console OAuth consent screen
fields.

> Build note: because legal/brand fetches degrade to `null`, the build never fails
> if the backend is down or an endpoint is missing — the page renders its fallback
> and ISR (`revalidate`) picks up real content later. (As of writing, the backend
> serves `/legal/privacy` and `/legal/links`; `/legal/terms` and `/config/brand`
> 404 and use fallbacks.)
