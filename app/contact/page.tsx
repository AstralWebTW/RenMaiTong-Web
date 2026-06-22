import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "與名片先生（MCard）團隊聯繫——客戶支援、隱私與資料請求、商務合作。",
};

const channels = [
  {
    title: "客戶支援",
    desc: "使用上的問題、帳號協助或錯誤回報，歡迎來信，我們很樂意幫忙。",
    email: "mrcard.tw@gmail.com",
    icon: "support",
  },
  {
    title: "隱私與資料",
    desc: "資料存取、匯出或刪除請求。詳情請參閱我們的隱私權政策。",
    email: "mrcard.tw@gmail.com",
    icon: "shield",
  },
  {
    title: "商務合作",
    desc: "合作提案、媒體採訪或商務洽詢，請與我們聯繫。",
    email: "mrcard.tw@gmail.com",
    icon: "handshake",
  },
];

function ChannelIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, fill: "none", stroke: "#00d68f", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "shield":
      return (<svg viewBox="0 0 24 24" {...common}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9.5 12l1.8 1.8 3.2-3.6" /></svg>);
    case "handshake":
      return (<svg viewBox="0 0 24 24" {...common}><path d="M7 11l3-3 3 3 2-2 4 4-3 3-2-2" /><path d="M3 13l4 4 3-1" /></svg>);
    default:
      return (<svg viewBox="0 0 24 24" {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></svg>);
  }
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm text-brand-soft">聯絡</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">聯絡我們</h1>
        <p className="mt-4 max-w-xl text-muted">
          有任何問題、建議或合作需求嗎？選擇最適合的方式與名片先生團隊聯繫，
          我們通常會在 2 個工作天內回覆。
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-line bg-surface p-6 transition hover:border-brand-soft/60"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink">
                <ChannelIcon name={c.icon} />
              </span>
              <h2 className="mt-4 text-lg font-medium">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
              <a
                href={`mailto:${c.email}`}
                className="mt-4 inline-block text-sm font-medium text-brand-soft hover:underline"
              >
                {c.email}
              </a>
            </div>
          ))}
        </div>

        {/* Company block */}
        <div className="mt-10 rounded-3xl border border-line bg-gradient-to-br from-surface to-ink-soft p-8 md:p-10">
          <h2 className="text-xl font-semibold">服務資訊</h2>
          <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">服務名稱</dt>
              <dd className="mt-1 text-white">名片先生 MCard</dd>
            </div>
            <div>
              <dt className="text-muted">產品</dt>
              <dd className="mt-1 text-white">數位名片與人脈管理 App</dd>
            </div>
            <div>
              <dt className="text-muted">電子郵件</dt>
              <dd className="mt-1">
                <a href="mailto:mrcard.tw@gmail.com" className="text-brand-soft hover:underline">
                  mrcard.tw@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">所在地</dt>
              <dd className="mt-1 text-white">台灣</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted">
            想了解我們如何處理您的資料？請參閱{" "}
            <a href="/privacy" className="text-brand-soft hover:underline">隱私權政策</a>
            {" "}與{" "}
            <a href="/terms" className="text-brand-soft hover:underline">服務條款</a>。
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
