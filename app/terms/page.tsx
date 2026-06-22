import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getLegalDocument } from "@/lib/api";

export const metadata: Metadata = {
  title: "服務條款",
  description: "規範您使用名片先生（MCard）App 與服務之條款。",
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

export default async function TermsPage() {
  const doc = await getLegalDocument("terms");
  const lastUpdated = doc?.last_updated_at
    ? formatLegalDate(doc.last_updated_at)
    : FALLBACK_LAST_UPDATED;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm text-brand-soft">法律條款</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">服務條款</h1>
        <p className="mt-3 text-sm text-muted">最後更新：{lastUpdated}</p>

        {doc?.content ? (
          <div
            className="prose-legal mt-10"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />
        ) : (
          <TermsFallback />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

/** Built-in terms shown if the backend content is unavailable. */
function TermsFallback() {
  return (
    <div className="prose-legal mt-10">
      <p>
        本服務條款（以下稱「本條款」）規範您存取及使用由<strong>名片先生（MCard）</strong>
        團隊（以下稱「我們」）提供之名片先生（MCard）
        行動應用程式、網站及相關服務（以下稱「本服務」）。
        一旦您建立帳號或使用本服務，即表示您同意本條款。若您不同意，請勿使用本服務。
      </p>

      <h2>1. 資格與帳號</h2>
      <p>
        您必須年滿 13 歲（或您所在司法管轄區之數位同意最低年齡）方可使用本服務。
        您須對帳號資料的正確性負責，並妥善保管您的登入憑證。
        您須對在您帳號下進行的所有活動負責。
      </p>

      <h2>2. 服務之使用</h2>
      <p>您同意不得：</p>
      <ul>
        <li>將本服務用於任何違法、有害或詐欺之目的。</li>
        <li>上傳侵害他人權利、或您未獲授權使用之內容。</li>
        <li>在無合法依據或未於必要時讓對方知悉的情況下，收集或儲存他人之聯絡資訊。</li>
        <li>嘗試對本服務或其系統進行還原工程、干擾、超載或未經授權之存取。</li>
        <li>未經我們同意，轉售、再授權或商業性利用本服務。</li>
      </ul>

      <h2>3. 您的內容</h2>
      <p>
        您保有您所新增之資訊的所有權，包含您的名片內容及您建立的聯絡人（以下稱「您的內容」）。
        您授予我們有限授權，以代管、處理及顯示您的內容，僅為向您營運及提供本服務之目的——
        例如呈現您的名片、對掃描的名片執行 OCR，以及在您的各裝置間同步資料。
        您須對您的內容負責，並須擁有提供該內容所需之權利。
      </p>

      <h2>4. AI 功能</h2>
      <p>
        本服務可能提供 AI 輔助功能（例如草擬訊息或彙整聯絡人）。
        AI 產生之內容可能不準確或不完整，您在依賴前須自行檢視。
        AI 功能係以「現狀」提供。
      </p>

      <h2>5. 第三方服務</h2>
      <p>
        本服務整合第三方服務，包含 Google 登入與 Firebase Cloud Messaging。
        您使用該等功能時，亦可能受該第三方自身條款與政策之約束。
        我們對第三方服務不負責任。
      </p>

      <h2>6. 智慧財產權</h2>
      <p>
        本服務（包含其軟體、設計與品牌）為我們所有，並受智慧財產權法律保護。
        本條款不授予您任何對我們商標或標誌之權利。
      </p>

      <h2>7. 終止</h2>
      <p>
        您可隨時停止使用本服務並刪除您的帳號。若您違反本條款，或我們停止提供本服務，
        我們得暫停或終止您的存取權。終止後，您使用本服務之權利即告終止，
        而我們將依<a href="/privacy">隱私權政策</a>所述處理您的資料。
      </p>

      <h2>8. 免責聲明</h2>
      <p>
        本服務係以「現狀」及「現有」基礎提供，不提供任何明示或默示之擔保，
        包含適售性、特定用途之適用性及不侵權。
        我們不擔保本服務不會中斷、無錯誤或安全無虞。
      </p>

      <h2>9. 責任限制</h2>
      <p>
        在法律允許之最大範圍內，我們對於因您使用本服務所生之任何間接、附隨、特殊、
        衍生或懲罰性損害，或任何資料、利潤或商譽之損失，均不負責。
        對任何請求，我們之總責任以您在請求發生前 12 個月內就本服務支付予我們之金額為限；
        若您未支付任何費用，則以 100 美元為限。
      </p>

      <h2>10. 服務或條款之變更</h2>
      <p>
        我們可能不時修改本服務或本條款。若有重大變更，我們會更新「最後更新」日期，
        並於適當情況下在 App 內通知您。變更生效後您持續使用，即視為接受。
      </p>

      <h2>11. 準據法</h2>
      <p>
        本條款以中華民國（台灣）法律為準據法，不適用其法律衝突規定。
        除適用法律另有要求外，相關爭議應由台灣台北之法院管轄。
      </p>

      <h2>12. 聯絡方式</h2>
      <p>
        如對本條款有任何疑問，請聯繫{" "}
        <a href="mailto:mrcard.tw@gmail.com">mrcard.tw@gmail.com</a>。
      </p>
    </div>
  );
}
