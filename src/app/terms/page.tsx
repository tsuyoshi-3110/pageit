// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Pageit",
  description:
    "Pageit（ページット）の利用規約です。サービスの利用条件、禁止事項、免責、著作権、準拠法などを定めます。",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.pageit.shop/terms" },
};

export default function TermsPage() {
  const effective = "2025-09-26"; // 必要に応じて更新
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold tracking-tight">利用規約</h1>
      <p className="mt-2 text-sm text-gray-500">施行日：{effective}</p>

      <section className="mt-8 space-y-6 leading-relaxed">
        <p>
          本利用規約（以下「本規約」）は、ゼノバント（運営者：斉藤 剛、
          以下「当社」）が提供する「Pageit」（以下「本サービス」）の利用条件を定めるものです。
          ユーザーは、本規約に同意のうえ本サービスを利用するものとします。
        </p>

        <div>
          <h2 className="text-xl font-semibold">1. 適用</h2>
          <p className="mt-2">
            本規約は、ユーザーによる本サービスの一切の利用に適用されます。
            当社が本サービス上で随時掲載する各ポリシー・ガイドライン等は本規約の一部を構成します。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. アカウント</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>ユーザーは正確な情報を登録し、最新の状態に保つものとします。</li>
            <li>アカウントの管理責任はユーザー本人が負います。第三者に利用させてはなりません。</li>
            <li>不正利用が判明した場合、当社はアカウント停止等の措置を講じることがあります。</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. 料金と支払い</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>有料プランの内容・料金・課金周期は、申込画面または当社サイトに表示します。</li>
            <li>ユーザーの都合による途中解約でも既に支払われた料金は返金されません（法令で認められる場合を除く）。</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. コンテンツの取扱い</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>
              ユーザーが本サービスに投稿・アップロードしたテキスト、画像、動画等（以下「ユーザーコンテンツ」）の権利はユーザーに帰属します。
            </li>
            <li>
              ユーザーは、当社に対し、サービス運営・表示・バックアップ等のために必要な範囲でユーザーコンテンツを無償で利用（複製・翻訳・公衆送信等）する権利を許諾します。
            </li>
            <li>
              ユーザーは、第三者の権利を侵害しないことを保証します。紛争が生じた場合はユーザーの費用と責任で解決するものとします。
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. 禁止事項</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>法令または公序良俗に反する行為</li>
            <li>第三者の知的財産権・プライバシー・名誉等を侵害する行為</li>
            <li>本サービスの運営を妨害する行為、不正アクセス、過度な負荷を与える行為</li>
            <li>虚偽情報の登録、なりすまし、データの改ざん</li>
            <li>反社会的勢力への利益供与その他これに準ずる行為</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. 外部サービス連携</h2>
          <p className="mt-2">
            本サービスは Google ビジネスプロフィール等の外部サービスと連携する場合があります。
            連携により取得・利用されるデータは、ユーザーの同意の範囲で当社が利用し、当社の
            <a href="/privacy" className="underline text-blue-600">プライバシーポリシー</a>
            に従って取り扱います。外部サービスの障害・仕様変更により連携機能が制限されることがあります。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. サービスの変更・中断・終了</h2>
          <p className="mt-2">
            当社は、ユーザーへの事前通知のうえ（緊急の場合を除く）、本サービスの全部または一部を変更・中断・終了することができます。
            これによりユーザーに生じた損害について、当社は第9条の範囲でのみ責任を負います。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. 免責</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>当社は、本サービスに事実上または法律上の瑕疵がないことを保証しません。</li>
            <li>ユーザー間またはユーザーと第三者との間に生じたトラブルについて、当社は関与せず、責任を負いません。</li>
            <li>外部サービスの仕様変更・停止等により生じた損害について、当社は責任を負いません。</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">9. 責任の限定</h2>
          <p className="mt-2">
            当社がユーザーに対して負う損害賠償責任は、当社の故意または重過失による場合を除き、
            直近12か月間にユーザーが当社に支払った利用料金の総額を上限とします。
            逸失利益・間接損害については責任を負いません。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">10. 規約の変更</h2>
          <p className="mt-2">
            当社は、必要に応じて本規約を変更できます。重要な変更を行う場合は、本サービス上で周知します。
            変更後にユーザーが本サービスを利用した場合、変更に同意したものとみなします。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">11. 準拠法・裁判管轄</h2>
          <p className="mt-2">
            本規約は日本法に準拠します。本サービスに関して紛争が生じた場合、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">12. お問い合わせ</h2>
          <p className="mt-2">
            本規約に関するお問い合わせは、
            <a href="mailto:info@pageit.shop" className="underline text-blue-600">pageitstore@gmail.com</a>
            までご連絡ください。
          </p>
        </div>
      </section>
    </main>
  );
}
