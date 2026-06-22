/**
 * Server-side API client for the RenMaiTong admin backend.
 *
 * All calls run in Server Components (no browser, no CORS), are cached with
 * Next's fetch cache, and degrade gracefully: every function returns `null`
 * on any failure so pages can fall back to built-in content.
 *
 * Base URL is resolved in ./config (switchable per environment).
 */
import { API_BASE_URL, CONTENT_REVALIDATE_SECONDS } from "./config";

export interface Brand {
  name: string;
  tagline: string;
  logo_url: string;
  logo_mime_type: string;
  logo_size: number;
}

export interface LegalLinks {
  terms_of_service_url: string;
  privacy_policy_url: string;
}

export interface LegalDocument {
  /** Sanitized HTML from the backend. */
  content: string;
  last_updated_at: string | null;
}

export type LegalKind = "terms" | "privacy";

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Unwrap responses that may be either `{ data: ... }` or the payload itself. */
function unwrap<T>(json: unknown): T | null {
  if (json && typeof json === "object" && "data" in json) {
    return (json as { data: T }).data ?? null;
  }
  return (json as T) ?? null;
}

/** GET /api/app/config/brand */
export async function getBrand(): Promise<Brand | null> {
  const json = await getJson<{ success?: boolean; data?: Brand }>(
    "/api/app/config/brand",
  );
  return unwrap<Brand>(json);
}

/** GET /api/app/legal/links */
export async function getLegalLinks(): Promise<LegalLinks | null> {
  const json = await getJson<unknown>("/api/app/legal/links");
  return unwrap<LegalLinks>(json);
}

/** GET /api/app/legal/terms | /api/app/legal/privacy */
export async function getLegalDocument(
  kind: LegalKind,
): Promise<LegalDocument | null> {
  const json = await getJson<unknown>(`/api/app/legal/${kind}`);
  const data = unwrap<Partial<LegalDocument>>(json);
  if (!data || typeof data.content !== "string") return null;
  return { content: data.content, last_updated_at: data.last_updated_at ?? null };
}
