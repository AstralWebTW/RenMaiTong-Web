import { getBrand } from "@/lib/api";

/**
 * Brand logo, fetched from /api/app/config/brand. Falls back to a built-in
 * SVG mark when the API or logo is unavailable. Async Server Component.
 */
export default async function BrandMark({
  className = "h-8 w-auto",
}: {
  className?: string;
}) {
  const brand = await getBrand();

  if (brand?.logo_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.logo_url}
        alt={brand.name || "名片先生"}
        className={className}
      />
    );
  }

  // Fallback mark
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="6" width="18" height="13" rx="2.5" fill="#fff" opacity="0.95" />
        <circle cx="8" cy="11" r="2" fill="#6638fb" />
        <rect x="12" y="10" width="6" height="1.6" rx="0.8" fill="#6638fb" />
        <rect x="12" y="13" width="4" height="1.6" rx="0.8" fill="#8a66ff" />
      </svg>
    </span>
  );
}
