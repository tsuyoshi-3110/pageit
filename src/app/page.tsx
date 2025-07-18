import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br  from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16 text-gray-800">
        {/* ロゴ */}
        <div className="flex justify-center">
          <Image
            src="/images/iconImage.png"
            alt="Pageit Logo"
            width={240}
            height={240}
          />
        </div>

        {/* キャッチコピー */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900">
            スマホで編集、動画で魅せる。
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Pageit（ページット）は、SNS世代のために設計された、動画×スマホ×AI対応のホームページサービスです。
          </p>
        </section>

        {/* 特長 */}
        <section id="features">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Pageitの特長
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm ">
              <h3 className="font-bold text-lg mb-2">📱 スマホで簡単編集</h3>
              <p>PC不要。メニューやお知らせもその場で更新できます。</p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">🎥 トップ動画で印象UP</h3>
              <p>来店前のユーザーに強いインパクトを与える動画表示。</p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">✍️ AIが文章を自動生成</h3>
              <p>商品説明やお知らせ文章も、キーワード入力だけでOK。</p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-2">
                🔄 簡単に差し替え・更新
              </h3>
              <p>動画や画像を何度でも自由に変更でき、常に“今”の情報を発信。</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
