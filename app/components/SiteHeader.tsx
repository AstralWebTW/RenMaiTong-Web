import Link from "next/link";
import BrandMark from "./BrandMark";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/#features", label: "功能特色" },
  { href: "/#how", label: "運作方式" },
  { href: "/#privacy", label: "隱私保護" },
  { href: "/contact", label: "聯絡我們" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <BrandMark className="h-8 w-auto max-w-[120px] object-contain" />
      <span className="text-lg font-semibold tracking-tight">
        名片先生 <span className="text-muted font-normal">M.Card</span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#download"
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-soft md:inline-flex"
          >
            取得 App
          </a>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
