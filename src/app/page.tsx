

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        📝 Pageit（ページット）
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        Pageit（ページット）は、中小企業・個人店舗向けに提供する月額制のホームページ編集サービスです。
        お店のメニュー・料金・お知らせ・写真などを、パソコンやスマートフォンから誰でも簡単に編集できます。
      </p>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>特長</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li>✅ ノーコード編集機能で、動画画面からそのまま更新可能</li>
        <li>✅ スマホ対応のシンプルで美しいデザイン</li>
        <li>✅ 画像・動画アップロード、AIによる文章作成支援（順次実装）</li>
        <li>✅ Firebase Hosting を活用した最新のWeb構成</li>
      </ul>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>ご連絡先</h2>
      <p>
        ご質問やお問い合わせは <strong>kikaikintots@gmail.com</strong> までお願いします。
      </p>


    </main>
  );
}

