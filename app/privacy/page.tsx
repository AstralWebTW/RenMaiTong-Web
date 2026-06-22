import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getLegalDocument } from "@/lib/api";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "名片先生（MCard）如何收集、使用、分享與保護您的個人資料。",
};

// Legal content is fetched from the backend; revalidate periodically.
export const revalidate = 600;

const FALLBACK_LAST_UPDATED = "2026 年 6 月 22 日";

function formatLegalDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("zh-TW", { dateStyle: "long" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

export default async function PrivacyPage() {
  const doc = await getLegalDocument("privacy");
  const lastUpdated = doc?.last_updated_at
    ? formatLegalDate(doc.last_updated_at)
    : FALLBACK_LAST_UPDATED;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm text-brand-soft">法律條款</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">隱私權政策</h1>
        <p className="mt-3 text-sm text-muted">最後更新：{lastUpdated}</p>

        {doc?.content ? (
          <div
            className="prose-legal mt-10"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />
        ) : (
          <PrivacyFallback />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

/** Built-in policy shown if the backend content is unavailable. */
function PrivacyFallback() {
  return (
    <div className="prose-legal mt-10">
      <p>
        本隱私權政策說明<strong>名片先生（MCard）</strong>團隊（以下稱「我們」）
        在您使用名片先生（MCard）行動應用程式及相關網站與服務
        （合稱「本服務」）時，如何收集、使用、揭露與保護您的資料。
        使用本服務即表示您同意本政策所述之做法。
      </p>

      <h2>1. 我們收集的資料</h2>

      <h3>您主動提供的資料</h3>
      <ul>
        <li><strong>帳號資料</strong>——註冊時提供的姓名、電子郵件地址，以及密碼（僅以雜湊形式儲存）。</li>
        <li><strong>數位名片內容</strong>——您選擇放在名片上的資訊，例如職稱、公司、電話、電子郵件、網站、社群連結與個人照片。</li>
        <li><strong>您建立的聯絡人</strong>——您新增或儲存的人員資訊，包含掃描的名片，以及您加註的備註、標籤與提醒。</li>
        <li><strong>影像</strong>——您掃描的名片照片，以及您為個人檔案或名片上傳的圖片。</li>
        <li><strong>客服往來內容</strong>——您寄送給我們的訊息。</li>
      </ul>

      <h3>來自 Google 登入的資料</h3>
      <p>
        若您選擇使用 Google 登入，我們會取得您的基本 Google 個人資料
        （姓名、電子郵件地址與個人頭像），僅用於建立及驗證您的帳號。
        我們不會取得您的 Google 密碼，且僅要求識別您所需的最小權限範圍。
        我們對於透過 Google API 取得之資訊的使用，皆遵循{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API 服務使用者資料政策
        </a>
        ，包含其「有限使用（Limited Use）」之相關要求。
      </p>

      <h3>自動收集的資料</h3>
      <ul>
        <li><strong>裝置與使用資料</strong>——裝置型號、作業系統版本、App 版本、語言，以及用於維持服務穩定的基本診斷／當機紀錄。</li>
        <li><strong>推播通知權杖</strong>——用於傳送您已啟用之通知的 Firebase Cloud Messaging 權杖。</li>
      </ul>

      <h2>2. 我們如何使用您的資料</h2>
      <ul>
        <li>建立與管理您的帳號及數位名片。</li>
        <li>透過光學字元辨識（OCR）將掃描的名片轉換為聯絡人。</li>
        <li>在您的各裝置間同步名片與聯絡人。</li>
        <li>提供 AI 助理功能，例如依您的要求彙整聯絡人或草擬後續訊息。</li>
        <li>傳送您已啟用的提醒與推播通知。</li>
        <li>維護安全、防止濫用、除錯並改善服務。</li>
        <li>回覆您的客服需求並遵循法律規定。</li>
      </ul>

      <h2>3. 我們如何分享資料</h2>
      <p>我們<strong>不會</strong>販售您的個人資料。僅在下列有限情況下分享：</p>
      <ul>
        <li><strong>當您分享名片時。</strong>您放在數位名片上的資訊，會分享給您選擇分享的對象（例如透過 QR Code 或連結）。</li>
        <li><strong>服務供應商。</strong>代表我們處理資料的可信賴廠商——例如雲端代管、提供登入與推播的 Google／Firebase，以及 OCR／AI 處理——並受保密義務約束。</li>
        <li><strong>法律因素。</strong>於法律、法規或有效法律程序要求時，或為保護使用者或大眾之權利、安全與財產時。</li>
        <li><strong>業務移轉。</strong>於合併、收購或資產出售時，並受本政策約束。</li>
      </ul>

      <h2>4. 我們要求的權限</h2>
      <ul>
        <li><strong>相機與相簿</strong>——用於掃描名片及設定您的個人檔案／名片圖片，僅在您主動操作時使用。</li>
        <li><strong>通知</strong>——用於傳送您選擇接收的提醒與更新。</li>
      </ul>

      <h2>5. 資料保留</h2>
      <p>
        在您的帳號維持使用期間，或為提供服務所需期間，我們會保留您的資料。
        當您刪除帳號時，我們會在合理期間內刪除或匿名化您的個人資料，
        但為遵循法律義務、解決爭議或執行協議而須保留者除外。
      </p>

      <h2>6. 您的權利與選擇</h2>
      <ul>
        <li>在 App 內存取、更新或修正您的個人檔案與聯絡人。</li>
        <li>匯出您的資料或要求取得副本。</li>
        <li>隨時在 App 內刪除您的帳號及相關資料，或透過下方聯絡方式與我們聯繫。</li>
        <li>於裝置設定中管理通知與相機權限。</li>
      </ul>
      <p>
        依您所在地區，您可能依台灣《個人資料保護法》、歐盟／英國 GDPR
        或加州《消費者隱私法》（CCPA）等法律享有額外權利。
        如需行使任何權利，請以第 10 節之聯絡資訊與我們聯繫。
      </p>

      <h2>7. 資料安全</h2>
      <p>
        我們採用業界標準的防護措施，包含傳輸加密（HTTPS／TLS）與密碼雜湊，
        並將個人資料的存取權限制於經授權的人員。
        雖然沒有任何傳輸或儲存方式能保證百分之百安全，
        但我們持續致力於保護您的資料。
      </p>

      <h2>8. 兒童隱私</h2>
      <p>
        名片先生為專業人士設計，並非以未滿 13 歲（或您所在司法管轄區所要求之最低年齡）
        之兒童為對象。我們不會在知情下收集兒童的個人資料。
        若您認為有兒童向我們提供資料，請與我們聯繫以便移除。
      </p>

      <h2>9. 跨境傳輸</h2>
      <p>
        您的資料可能於台灣或其他國家的伺服器上處理及儲存。
        於必要時，我們會採取措施，確保您的資料在任何處理地點都能獲得適當程度的保護。
      </p>

      <h2>10. 聯絡我們</h2>
      <p>若您對本隱私權政策或您的資料有任何疑問，請聯繫：</p>
      <ul>
        <li>名片先生 MCard 團隊</li>
        <li>電子郵件：<a href="mailto:mrcard.tw@gmail.com">mrcard.tw@gmail.com</a></li>
      </ul>

      <h2>11. 本政策之變更</h2>
      <p>
        我們可能不時更新本隱私權政策。更新時，我們會修改上方的「最後更新」日期，
        並於適當情況下在 App 內通知您。變更生效後您持續使用本服務，
        即視為接受更新後之政策。
      </p>
    </div>
  );
}
