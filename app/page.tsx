import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import PhoneVideo from "./components/PhoneVideo";

const features = [
  {
    title: "掃描名片",
    body: "用 OCR 自動辨識名片正反面，連續批次掃描在背景處理，一張接一張，自動建立乾淨的聯絡人。",
    icon: "scan",
  },
  {
    title: "背景調查",
    body: "小脈 AI 比對公司與公開／政府資料，在見面前快速幫您掌握對方的背景與脈絡。",
    icon: "search",
  },
  {
    title: "互動筆記轉洞察卡",
    body: "在聯絡人頁面記下每次互動，AI 會自動整理成「洞察卡」，重點一目了然。",
    icon: "insight",
  },
  {
    title: "人脈分類管理",
    body: "用標籤、最愛與自訂分類整理您的人脈俱樂部，數十、數百位聯絡人也井然有序。",
    icon: "tag",
  },
  {
    title: "重要時刻提醒",
    body: "節日與自訂追蹤提醒，在對的時機送上問候，重要的人脈不再從指縫間溜走。",
    icon: "bell",
  },
];

const aiCapabilities = [
  "用自然語言查詢聯絡人與公司：「上週展會認識的食品業客戶」",
  "自動進行背景調查，比對公司與公開／政府資料",
  "推薦適合拜訪的對象，並協助規劃拜訪與送禮",
  "把您記下的互動筆記，整理成清楚的洞察卡",
];

const steps = [
  {
    n: "01",
    title: "掃描名片、記錄互動",
    body: "拍下收到的名片，或在聯絡人頁面寫下每次見面的互動內容。",
  },
  {
    n: "02",
    title: "AI 整理洞察",
    body: "小脈自動做背景調查、補上公司資訊，並把您的筆記整理成洞察卡。",
  },
  {
    n: "03",
    title: "主動經營人脈",
    body: "用標籤分類、設定提醒，並讓 AI 協助您規劃下一步聯繫。",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, fill: "none", stroke: "#00d68f", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "search":
      return (<svg viewBox="0 0 24 24" {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-3.5-3.5" /><path d="M11 8v6M8 11h6" /></svg>);
    case "insight":
      return (<svg viewBox="0 0 24 24" {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /><path d="M17.5 3.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6L15.2 5.8l1.6-.7z" fill="#00d68f" stroke="none" /></svg>);
    case "tag":
      return (<svg viewBox="0 0 24 24" {...common}><path d="M3 12l9-9h7v7l-9 9z" /><circle cx="15.5" cy="8.5" r="1.4" /></svg>);
    case "bell":
      return (<svg viewBox="0 0 24 24" {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>);
    default: // scan
      return (<svg viewBox="0 0 24 24" {...common}><path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2" /><path d="M4 12h16" /></svg>);
  }
}

function PhoneCard() {
  return (
    <div className="relative mx-auto w-[260px] rounded-[2.2rem] border border-line bg-ink-soft p-3 shadow-2xl">
      <div className="overflow-hidden rounded-[1.7rem] bg-surface">
        <div className="bg-gradient-to-br from-brand to-brand-soft p-5">
          <div className="h-14 w-14 rounded-full bg-white/90" />
          <div className="mt-3 text-lg font-semibold text-white">陳冠宇</div>
          <div className="text-sm text-white/80">合作夥伴部 主管</div>
          <div className="text-xs text-white/70">宏遠科技股份有限公司</div>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-surface-2" />
            <div className="h-2.5 w-28 rounded bg-surface-2" />
          </div>
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-surface-2" />
            <div className="h-2.5 w-24 rounded bg-surface-2" />
          </div>
          <div className="mt-4 flex items-center justify-center rounded-xl border border-line bg-ink p-4">
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 w-3 rounded-sm ${i % 3 === 0 ? "bg-accent" : "bg-surface-2"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiSpotlight() {
  return (
    <section id="ai" className="relative overflow-hidden border-y border-line/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(102,56,251,0.28),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-soft/40 bg-brand/15 px-3 py-1 text-xs font-medium text-brand-soft">
            ★ 主打功能 · 小脈 AI 助理
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            您的專屬{" "}
            <span className="bg-gradient-to-r from-brand-soft to-accent bg-clip-text text-transparent">
              AI 人脈助理
            </span>
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            「小脈」不只是聊天機器人。用自然語言下指令，它會幫您查詢人脈、
            進行背景調查，並主動建議該如何拓展與經營您的網絡。
          </p>
          <ul className="mt-7 space-y-3">
            {aiCapabilities.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-white/90">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <PhoneVideo
          src="/video/ai-assistant.mp4"
          poster="/video/ai-assistant-poster.jpg"
          width={340}
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="glow-brand pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                數位名片 · 智慧人脈管理
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                把人脈，{" "}
                <span className="bg-gradient-to-r from-brand-soft to-accent bg-clip-text text-transparent">
                  放進口袋
                </span>
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                名片先生（Mr.Card）幫您掃描名片、調查背景、記錄互動，
                並由 AI 助理「小脈」把這一切整理成洞察，協助您經營每一段人脈。
              </p>
              <div className="mt-8 flex flex-wrap gap-3" id="download">
                <a className="rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-soft" href="#">
                  下載 iOS 版
                </a>
                <a className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-white transition hover:border-brand-soft" href="#">
                  下載 Android 版
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">
                適用於 iOS 15 以上與 Android 5.0 以上，免費開始使用。
              </p>
            </div>
            <PhoneCard />
          </div>
        </section>

        {/* AI assistant — highlight feature */}
        <AiSpotlight />

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              經營人脈所需的一切
            </h2>
            <p className="mt-3 text-muted">
              從交換名片到長久關係——名片先生替您掃描、調查、記錄與提醒，讓您專注於人。
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-line bg-surface p-6 transition hover:border-brand-soft/60"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink">
                  <FeatureIcon name={f.icon} />
                </span>
                <h3 className="mt-4 text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y border-line/60 bg-ink-soft">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-3xl font-semibold tracking-tight">運作方式</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl border border-line bg-surface p-7">
                  <div className="text-sm font-semibold text-brand-soft">{s.n}</div>
                  <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy callout */}
        <section id="privacy" className="mx-auto max-w-6xl px-5 py-20">
          <div className="rounded-3xl border border-line bg-gradient-to-br from-surface to-ink-soft p-10 md:p-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink px-3 py-1 text-xs text-accent">
                以隱私為設計核心
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                您的聯絡人，屬於您
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                背景調查僅使用公開資料，我們只收集營運 App 所需的資訊，絕不販售您的資料，
                您可以隨時匯出或刪除。所有連線傳輸均經加密。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/privacy" className="rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-soft">
                  閱讀隱私權政策
                </Link>
                <Link href="/terms" className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-white transition hover:border-brand-soft">
                  服務條款
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
