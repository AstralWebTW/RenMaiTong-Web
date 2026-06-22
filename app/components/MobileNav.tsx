"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type NavLink = { href: string; label: string };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock background scroll and allow Escape to close while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-white transition hover:border-brand-soft"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="md:hidden">
            {/* click-away backdrop (below the header so the toggle stays usable) */}
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed bottom-0 left-0 right-0 top-16 z-40 cursor-default bg-black/50"
            />
            <div className="fixed left-0 right-0 top-16 z-50 border-b border-line/60 bg-ink/95 backdrop-blur">
              <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-white/90 transition hover:bg-surface"
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href="#download"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-brand px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-brand-soft"
                >
                  取得 App
                </a>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
