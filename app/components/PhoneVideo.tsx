"use client";

import { useEffect, useRef } from "react";

/**
 * Plays an app screen-recording inside a device bezel.
 * Muted + loop + playsInline, and lazy: it only downloads (preload="none")
 * and starts playing once scrolled into view, pausing when it leaves.
 */
export default function PhoneVideo({
  src,
  poster,
  width = 340,
  className = "",
}: {
  src: string;
  poster?: string;
  width?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`relative mx-auto w-full rounded-[2.2rem] border border-line bg-ink-soft p-2.5 shadow-2xl ${className}`}
      style={{ maxWidth: width }}
    >
      <video
        ref={ref}
        className="block w-full rounded-[1.7rem]"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label="小脈 AI 助理操作示範"
      />
    </div>
  );
}
