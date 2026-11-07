// app/legal/page.tsx
export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <div className="max-w-3xl mx-auto px-4 py-12 ">
        <h1 className="text-2xl font-bold mb-6">特定商取引法に基づく表記</h1>

        <div>
          <strong>販売業者名：</strong> Xenovant合同会社
        </div>
        <div>
          <strong>代表責任者名：</strong> 斉藤 剛
        </div>
        <div>
          <strong>所在地：</strong> 〒561-0813 大阪府豊中市小曽根3丁目6-13
        </div>
        <div>
          <strong>電話番号：</strong> お問い合わせはメールで受け付けています。電話番号はご請求いただければ遅滞なく開示します。
        </div>
        <div>
          <strong>メールアドレス：</strong> info@xenovant.jp
        </div>
        <div>
          <strong>販売URL：</strong> https://pageit.shop/
        </div>
        <div>
          <strong>サービス名称：</strong> Pageit（ページット）
        </div>
        <div>
          <strong>販売価格：</strong>
          <br />
          月額 3,980円（税抜）／税込 4,378円
          <br />
          ※これまでにご契約のお客様は、ご契約時の料金（月額 1,500円）です。
          <br />
          初期費用：初期設定 30,000円（税抜）／税込 33,000円、撮影編集代行 50,000円（税抜）／税込 55,000円、フルセット（初期設定＋撮影編集代行）80,000円（税抜）／税込 88,000円
          <br />
          個別のご依頼：撮影代行 35,000円（税抜）／税込 38,500円、編集代行 15,000円（税抜）／税込 16,500円
          <br />
          XenoCoin（AI機能で使うコイン）の追加購入：500コイン 1,100円（税込）。購入日から6か月有効で、購入した店舗だけで使えます。
        </div>
        <div>
          <strong>商品代金以外の必要料金：</strong> 通信費等はお客様負担
        </div>
        <div>
          <strong>支払方法：</strong> クレジットカード決済（Stripe）
        </div>
        <div>
          <strong>支払時期：</strong>
          初回申込時に初月分を請求。その後毎月自動課金。
          XenoCoinの追加購入は、購入の都度、その場で決済します（自動で継続課金されることはありません）。
        </div>
        <div>
          <strong>サービス提供時期：</strong> お申し込み後、初期設定完了次第。
          XenoCoinは決済完了後すぐに付与します（反映まで少し時間がかかることがあります）。
        </div>
        <div>
          <strong>キャンセル・解約：</strong>{" "}
          管理ページから解約可能。次回請求分以降停止。
          XenoCoinは、サービスの性質上、購入後の返金・キャンセルはできません（当社の責任で利用できなかった場合を除きます）。
          購入日から6か月で失効し、解約後は未使用分を利用できません。
        </div>
      </div>
    </div>
  );
}
