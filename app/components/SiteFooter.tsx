import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line/60 bg-ink-soft">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="text-lg font-semibold">
              名片先生 <span className="text-muted font-normal">MCard</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              專為現代專業人士打造的智慧數位名片。分享、掃描、拓展人脈——盡在您的手機。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <div className="mb-3 font-medium text-white">產品</div>
              <ul className="space-y-2 text-muted">
                <li><Link href="/#features" className="hover:text-white">功能特色</Link></li>
                <li><Link href="/#how" className="hover:text-white">運作方式</Link></li>
                <li><a href="#download" className="hover:text-white">下載 App</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-white">法律條款</div>
              <ul className="space-y-2 text-muted">
                <li><Link href="/privacy" className="hover:text-white">隱私權政策</Link></li>
                <li><Link href="/terms" className="hover:text-white">服務條款</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-white">聯絡我們</div>
              <ul className="space-y-2 text-muted">
                <li><Link href="/contact" className="hover:text-white">聯絡資訊</Link></li>
                <li>
                  <a href="mailto:mrcard.tw@gmail.com" className="hover:text-white">
                    mrcard.tw@gmail.com
                  </a>
                </li>
                <li>名片先生 MCard</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} 名片先生 MCard 版權所有。</span>
          <span>名片先生 MCard · 為台灣與各地專業人士打造</span>
        </div>
      </div>
    </footer>
  );
}
