// app/legal/page.tsx
export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <div className="max-w-3xl mx-auto px-4 py-12 ">
        <h1 className="text-2xl font-bold mb-6">特定商取引法に基づく表記</h1>

        <div>
          <strong>販売業者名：</strong> 株式会社TS Reform
        </div>
        <div>
          <strong>代表責任者名：</strong> 斉藤 剛
        </div>
        <div>
          <strong>所在地：</strong> 〒561-0813 大阪府豊中市小曽根3丁目6-13
        </div>
        <div>
          <strong>電話番号：</strong> 06-6151-3328（平日10:00〜17:00）
        </div>
        <div>
          <strong>メールアドレス：</strong> kikaikintots@gmail.com
        </div>
        <div>
          <strong>販売URL：</strong> https://pageit.vercel.app/
        </div>
        <div>
          <strong>サービス名称：</strong> Pageit（ページット）
        </div>
        <div>
          <strong>販売価格：</strong> 月額 1,500円（税込）
        </div>
        <div>
          <strong>商品代金以外の必要料金：</strong> 通信費等はお客様負担
        </div>
        <div>
          <strong>支払方法：</strong> クレジットカード決済（Stripe）
        </div>
        <div>
          <strong>支払時期：</strong>{" "}
          初回申込時に初月分を請求。その後毎月自動課金。
        </div>
        <div>
          <strong>サービス提供時期：</strong> お申し込み後、初期設定完了次第
        </div>
        <div>
          <strong>キャンセル・解約：</strong>{" "}
          管理ページから解約可能。次回請求分以降停止。
        </div>
      </div>
    </div>
  );
}
