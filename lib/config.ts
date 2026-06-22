/**
 * Central configuration — switch which backend the site talks to here.
 *
 * Two ways to switch:
 *   1. Change DEFAULT_API_ENV below (this config file), or
 *   2. Set the API_ENV environment variable (e.g. in .env.local) to
 *      "local" or "production" — it overrides the default.
 *
 * To point at a one-off / staging host, set API_BASE_URL directly; it wins
 * over everything else.
 */

export type ApiEnv = "local" | "production";

const BASE_URLS: Record<ApiEnv, string> = {
  local: "http://renmaitongadmin.test",
  production: "https://renmaitong-admin.astralweb.com.tw",
};

// 👉 Flip this to "local" for local backend development.
const DEFAULT_API_ENV: ApiEnv = "production";

function resolveEnv(): ApiEnv {
  const v = process.env.API_ENV?.toLowerCase();
  return v === "local" || v === "production" ? v : DEFAULT_API_ENV;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export const API_ENV: ApiEnv = resolveEnv();

/** Resolved backend base URL (no trailing slash). API_BASE_URL env var wins. */
export const API_BASE_URL: string = stripTrailingSlash(
  process.env.API_BASE_URL || BASE_URLS[API_ENV],
);

/** How long (seconds) fetched brand/legal content is cached before revalidating. */
export const CONTENT_REVALIDATE_SECONDS = 600;
