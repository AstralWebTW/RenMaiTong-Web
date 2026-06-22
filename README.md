# MCard Website (`mcard-web`)

Public marketing & **OAuth-verification** site for the **名片先生 (MCard)** digital
business card app, built with Next.js 15 + Tailwind CSS v4 and deployed on Vercel.
Content is in Traditional Chinese (zh-TW).

It exists primarily to provide the **homepage**, **Privacy Policy**, and **Terms of
Service** that Google Cloud Console requires to verify the app's OAuth consent
screen (the app uses Google Sign-In).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build && npm start
```

## Pages

| Route      | Purpose                          |
| ---------- | -------------------------------- |
| `/`        | Marketing homepage               |
| `/contact` | Contact info                     |
| `/privacy` | Privacy Policy (Google required) |
| `/terms`   | Terms of Service                 |

## Backend content & environment switch

The legal documents (`/privacy`, `/terms`) and the header logo are fetched from the
RenMaiTong admin backend; if it's unreachable the site falls back to built-in
content. Switch backends in `lib/config.ts` or via env (see `.env.example`):

| `API_ENV`    | Base URL                                      |
| ------------ | --------------------------------------------- |
| `local`      | `http://renmaitongadmin.test`                 |
| `production` | `https://renmaitong-admin.astralweb.com.tw` (default) |

```bash
cp .env.example .env.local   # then set API_ENV=local for local backend dev
```

## Deploy to Vercel

1. Push to GitHub and import the repo in Vercel (Next.js preset auto-detected).
2. No env vars required (defaults to the production backend). Optionally set
   `API_ENV` / `API_BASE_URL` in project settings.
3. After deploy, paste the homepage, `/privacy`, and `/terms` URLs into the Google
   Cloud Console OAuth consent screen.

## Docs

- `docs/PRD.md` — product requirements
- `docs/SDD.md` — software design
- `CLAUDE.md` — guidance for Claude Code

## Before launch

- Replace placeholder app-store links in `app/page.tsx` (`#download`).
