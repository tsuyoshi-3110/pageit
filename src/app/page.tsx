import Image from "next/image";


export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* ロゴ */}
      <div className="flex justify-center">
        <Image
  src="/images/logo.png"
  alt="Pageit Logo"
  width={300}
  height={300}
/>
      </div>

      {/* タイトル */}
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">
           Pageit（ページット）
        </h1>
        <p className="text-gray-600">
          Pageit（ページット）は、中小企業・個人店舗向けに提供する月額制のホームページ編集サービスです。
          お店のメニュー・料金・お知らせ・写真などを、パソコンやスマートフォンから誰でも簡単に編集できます。
        </p>
      </section>

      {/* 特長 */}
      <section id="features">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">特長</h2>
        <ul className="space-y-2 list-disc list-inside text-gray-700">
          <li>✅ ノーコード編集機能で、動画画面からそのまま更新可能</li>
          <li>✅ スマホ対応のシンプルで美しいデザイン</li>
          <li>✅ 画像・動画アップロード、AIによる文章作成支援</li>
        </ul>
      </section>

     
    </main>
  );
}
