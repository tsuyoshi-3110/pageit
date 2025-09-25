// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Pageit",
  description:
    "Pageit（ページット）のプライバシーポリシーです。収集する情報、利用目的、第三者提供、Google APIデータの取り扱い、セキュリティ、利用者の権利等について記載しています。",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.pageit.shop/privacy" },
};

export default function PrivacyPage() {
  const updated = "2025-09-26"; // 必要に応じて更新

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold tracking-tight">プライバシーポリシー</h1>
      <p className="mt-2 text-sm text-gray-500">施行日：{updated}</p>

      <section className="mt-8 space-y-6 leading-relaxed">
        <p>
          本サービス「Pageit」（以下「当サービス」）は、ゼノバント（運営者：
          斉藤 剛）が提供します。当サービスにおける利用者情報の取扱いについて、
          以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
        </p>

        <div>
          <h2 className="text-xl font-semibold">1. 事業者情報</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>事業者名：ゼノバント（Pageit 運営）</li>
            <li>お問い合わせ：<a href="mailto:pageitstore@gmail.com" className="underline text-blue-600">pageitstore@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. 収集する情報</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>店舗情報（名称、住所、電話番号、営業時間 等）</li>
            <li>ユーザーがアップロードする写真・動画・文章等のコンテンツ</li>
            <li>サービス利用ログ（アクセス日時、IPアドレス、端末情報、ブラウザ情報 等）</li>
            <li>Google アカウント連携時の公開プロフィール情報（氏名、メールアドレス 等）</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. 利用目的</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>ホームページの制作・公開・管理機能の提供</li>
            <li>Google ビジネスプロフィール等の外部サービス連携</li>
            <li>機能改善・品質向上のための利用状況の分析</li>
            <li>お問い合わせ対応、重要なお知らせの送付</li>
            <li>不正利用防止、セキュリティ確保</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Google API の利用について</h2>
          <p className="mt-2">
            当サービスは Google API を利用します。取得した Google ユーザーデータは、
            ユーザーの同意に基づき、店舗情報・写真・投稿等を Google
            ビジネスプロフィールへ連携する目的に限って使用します。
            これらのデータを第三者へ販売・共有することはありません。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. 第三者提供</h2>
          <p className="mt-2">
            法令に基づく場合を除き、本人の同意なく情報を第三者に提供しません。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. セキュリティ</h2>
          <p className="mt-2">
            当サービスは、通信の暗号化（HTTPS）やアクセス制御等、適切な安全管理措置を講じ、利用者情報の保護に努めます。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. 利用者の権利</h2>
          <p className="mt-2">
            ご自身の情報の照会・訂正・削除の請求は、
            <a href="mailto:pageitstore@gmail.com" className="underline text-blue-600">
              pageitstore@gmail.com
            </a>
            までご連絡ください。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. 改定</h2>
          <p className="mt-2">
            本ポリシーは必要に応じて改定されます。変更後の内容は本ページに掲示し、掲示した時点で効力を生じます。
          </p>
        </div>
      </section>
    </main>
  );
}
