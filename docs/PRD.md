# Product Requirements Document — M.Card Marketing & Verification Website

**Product:** 名片先生 M.Card marketing website (`mcard-web`)
**Owner:** 名片先生 M.Card
**Status:** v1
**Last updated:** 2026-06-22

---

## 1. Background

名片先生 / M.Card (internal name **RenMaiTong**, bundle ID `com.astralweb.renmaitong`) is a
cross-platform .NET MAUI app for digital business cards and professional network
management. The mobile app uses **Google Sign-In** as an authentication option.

Google requires apps using OAuth / Google Sign-In to have a public-facing website
with a clear **homepage**, **Privacy Policy**, and **Terms of Service** before the
OAuth consent screen can be verified and moved out of "testing." This website
exists to satisfy that requirement and to serve as the public marketing presence
for the product.

## 2. Goals

1. **Pass Google Cloud Console OAuth verification** — provide a live, hosted
   homepage, Privacy Policy, and Terms of Service at stable public URLs.
2. **Explain the product** clearly to prospective users in a single scannable page.
3. **Be trivially deployable** to Vercel with zero custom infrastructure.

### Non-goals (v1)

- User authentication or any app functionality on the web.
- A blog, pricing tiers, or a CMS.
- Multi-locale i18n. Content is Traditional Chinese (zh-TW) only for v1; other
  locales can be added later via Next.js i18n routing.

## 3. Target audience

- **Google reviewers** verifying the OAuth consent screen.
- **Prospective users** — professionals in Taiwan and the wider region who attend
  events, exchange business cards, and want to manage their network digitally.

## 4. Success criteria

- Privacy Policy and Terms are reachable at `/privacy` and `/terms` and accurately
  describe the data the app collects (incl. the Google Sign-In data and Limited Use
  disclosure).
- The homepage URL, Privacy Policy URL, and Terms URL can be pasted directly into
  the Google Cloud Console OAuth consent screen configuration.
- Lighthouse: no broken links, responsive on mobile, accessible color contrast.

## 5. Requirements

### 5.1 Pages

| Route      | Purpose                                                              | Priority |
| ---------- | -------------------------------------------------------------------- | -------- |
| `/`        | Homepage: hero, AI spotlight, feature grid, how-it-works, privacy CTA | P0       |
| `/contact` | Contact channels + company info                                      | P0       |
| `/privacy` | Privacy Policy (Google verification requirement)                     | P0       |
| `/terms`   | Terms of Service                                                     | P0       |

### 5.2 Homepage content

- **Hero** — product name (名片先生 / M.Card), one-line value prop, a stylized
  digital-card mockup (not a screenshot), download CTAs, supported-platform note.
- **AI assistant spotlight (小脈)** — the **highlight feature**, given its own
  dedicated section (capability bullets + an autoplaying app screen-recording of
  the assistant) above the feature grid.
- **Features** — the actual app capabilities (no invented ones):
  - **Card scanning** — OCR of business-card front/back, continuous batch scanning
  - **Background check** — AI cross-references company + public/government data
  - **Notes → AI insight card** — record interactions on a contact; AI summarizes
  - **Contact management** — tags, favorites, custom categories (人脈俱樂部)
  - **Reminders** — holidays + custom follow-up reminders
- **How it works** — 3 steps (scan/record → AI insights → grow your network).
- **Privacy callout** — short trust statement (notes background check uses only
  public data) linking to the full policy.
- **Footer** — product links, legal links, contact email, company name.

> **Google Sign-In** remains an authentication method in the app (it is why this
> verification site exists) but is intentionally **not marketed as a feature** on
> the homepage. Its data disclosure stays in the Privacy Policy.

### 5.3 Backend-driven content

The legal documents and brand logo are **fetched from the RenMaiTong admin backend**
so they can be updated without redeploying the site:

- `GET /api/app/legal/terms` and `/api/app/legal/privacy` → sanitized HTML
  `content` + `last_updated_at`, rendered on `/terms` and `/privacy`.
- `GET /api/app/legal/links` → canonical `terms_of_service_url` /
  `privacy_policy_url` (available to the app/site).
- `GET /api/app/config/brand` → brand `name`, `tagline`, and `logo_url`; the logo
  is shown in the site header.
- The backend base URL is **configurable** between local
  (`http://renmaitongadmin.test`) and production
  (`https://renmaitong-admin.astralweb.com.tw`) via a config file / env var.
- If any endpoint is unavailable, the site must **fall back** to built-in content
  so the verification pages always render.

### 5.4 Legal content requirements

The Privacy Policy **must** disclose:

- Categories of data collected (account, card profile, contacts, images, device,
  push token).
- That **Google Sign-In** shares only basic profile data and adheres to the
  **Google API Services User Data Policy**, including Limited Use.
- Camera/photos and notification permissions and why they are used.
- Data sharing (no sale of data; service providers; legal).
- Retention, user rights (access/export/delete), security, children's privacy,
  international transfers, and a contact email.

### 5.5 Branding

Mirror the app's design system (`Colors.xaml`):

- Background near-black `#080808`, brand purple `#6638FB`, accent green `#00D68F`.
- Dark theme, modern, professional, mobile-first.

### 5.6 Non-functional

- Statically renderable with ISR (legal/brand content revalidated periodically).
- Deployable to Vercel via `next build`; defaults to the production backend with no
  env vars required. `API_ENV` / `API_BASE_URL` can override.
- Responsive ≥320px; accessible (semantic landmarks, sufficient contrast).
- SEO metadata + OpenGraph; `robots: index, follow`.

## 6. Constraints & assumptions

- Stack: **Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript**, hosted on Vercel.
- Content language is Traditional Chinese (zh-TW).
- Backend (Laravel admin) provides legal + brand content; base URL switchable via
  `lib/config.ts` / `API_ENV`. Site degrades gracefully if the backend is down.
- Contact email used publicly: `mrcard.tw@gmail.com`.
- App-store download links are placeholders until the apps are published; swap in
  real URLs before launch.

## 7. Open items / future work

- Replace placeholder download links with real App Store / Google Play URLs.
- Add zh-TW localization to match the app's default locale.
- Add a custom domain and update `metadataBase` / canonical URLs accordingly.
