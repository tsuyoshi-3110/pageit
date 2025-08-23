"use client";

import Image from "next/image";
import Head from "next/head";
import { useState } from "react"; // 追加

type GuideSection = {
  image: string;
  alt: string;
  title: string;
  description: string | string[];
};

const sections: GuideSection[] = [
  {
    image: "/images/topImage.jpeg",
    alt: "Pageit トップ画面のカスタマイズ例",
    title: "トップ画面のカスタマイズ",
    description: [
      "ワンタップで背景カラーを変更できます。スマホから簡単に操作可能です。",
      "トップには動画または画像（最大3枚）を設定可能。画像はスライドショー表示も対応。",
      "背景画像やヘッダー画像も簡単に編集できます。",
    ],
  },
  {
    image: "/images/productImage.jpeg",
    alt: "Pageit 商品管理画面イメージ",
    title: "商品情報の管理",
    description: [
      "商品カードはスマホから簡単に追加・削除・編集が可能です。",
      "ショート動画と画像どちらかを表示することができます。",
      "ドラッグ＆ドロップで商品の表示順を自由に並び替えできます。",
      "紹介文にはAIによる自動生成機能も搭載しており、魅力的な説明文がすぐに完成します。",
    ],
  },
  {
    image: "/images/inputImage.jpeg",
    alt: "Pageit 商品編集画面の操作例",
    title: "商品情報の編集",
    description: [
      "商品名・価格・税込/税抜をワンタップで編集できます。",
      "画像の変更も簡単に行えます（スマホから直接アップロード可能）。",
      "AIによる紹介文の自動生成ボタンを使えば、プロのような説明文がすぐに完成します。",
    ],
  },
];

export default function GuidePage() {
  // ▼ 縦長動画に合わせて表示比率を自動調整
  const [videoMeta, setVideoMeta] = useState({
    w: 9,
    h: 16,
    portrait: true,
    ready: false,
  });

  return (
    <>
      <Head>
        <title>Pageit ご案内｜スマホで編集できる動画対応ホームページ</title>
        <meta
          name="description"
          content="Pageit（ページット）の機能紹介ページです。スマホだけで簡単に編集・更新できるホームページ。トップ動画、画像スライド、AI文章生成など、今の店舗集客に必要な機能がすべて揃っています。"
        />
        <meta
          name="keywords"
          content="Pageit, ページット, ホームページ編集, スマホ対応, 中小企業向け, 店舗ホームページ, 動画ホームページ, AI紹介文"
        />
        <meta
          property="og:title"
          content="Pageit ご案内｜ホームページ機能紹介"
        />
        <meta
          property="og:description"
          content="スマホ×動画×AI。Pageitは、誰でも簡単にホームページを更新できる店舗向けサービスです。"
        />
        <meta
          property="og:image"
          content="https://www.pageit.shop/images/ogpImage.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <link rel="canonical" href="https://www.pageit.shop/guide" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 py-16 px-4">
        {/* ▼▼ トップ：動画ヒーロー（縦長に最適化） ▼▼ */}
        <section className="max-w-5xl mx-auto mb-16">
            {/* 導入紹介 */}
          <section className="text-center text-gray-800 space-y-4 mb-10">
            <h1 className="text-4xl font-bold">Pageit ご案内</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Pageit（ページット）は、動画・スマホ・AIを活用し、誰でも簡単にホームページを編集・運用できるサービスです。
              スマホだけで更新でき、トップに動画を配置できるなど、SNS時代の集客にぴったりです。
            </p>
          </section>

          <div
            className={[
              "relative mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/40 bg-black",
              videoMeta.portrait ? "max-w-[260px]" : "max-w-xl", // ← 枠をさらに小さく
            ].join(" ")}
            style={{
              aspectRatio: `${videoMeta.w} / ${videoMeta.h}`, // 動画比率で枠も変わる
            }}
          >
            {/* やわらかい光彩 */}
            <div className="pointer-events-none absolute -inset-6 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-2xl" />

            {/* 動画本体 */}
            <video
              src="/setumeiMovie.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                const w = v.videoWidth || 9;
                const h = v.videoHeight || 16;
                setVideoMeta({
                  w,
                  h,
                  portrait: h >= w,
                  ready: true,
                });
              }}
              className={[
                "absolute inset-0 h-full w-full", // 枠にフィット
                videoMeta.portrait ? "object-contain" : "object-cover",
              ].join(" ")}
              aria-label="Pageit 紹介動画"
            />

            {/* 枠のハイライト */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20 rounded-2xl" />
          </div>
        </section>
        {/* ▲▲ トップ：動画ヒーロー（縦長に最適化） ▲▲ */}

        <div className="max-w-5xl mx-auto space-y-16">


          {/* 各機能セクション */}
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="flex-shrink-0">
                <Image
                  src={section.image}
                  alt={section.alt}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
              <div className="flex-1 space-y-3 text-gray-800">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                {Array.isArray(section.description) ? (
                  <ul className="list-disc pl-5 space-y-1 text-base">
                    {section.description.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{section.description}</p>
                )}
              </div>
            </section>
          ))}

          <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10 space-y-4">
            <h2 className="text-2xl font-semibold">
              こんな経験はありませんか？
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                新商品や価格を変えたいのに、業者さんに頼むと時間もお金もかかる…
              </li>
              <li>
                「ちょっと直しておいて」と言ったまま、いつ反映されるか分からない…
              </li>
              <li>
                外出先で、「あ、文章間違ってる！」と思っても修正できないモヤモヤ…
              </li>
            </ul>

            <p className="mt-4 text-gray-800">
              私も同じ経験をしました。
              そんな「もどかしい」状況を解決するために開発したのがPageitです。
            </p>
          </section>

          {/* 締め・料金・比較・CTA */}
          <section className="text-gray-800 text-center space-y-6 bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold">Pageitが選ばれる理由</h2>
            <ul className="list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
              <li>スマホひとつでいつでも編集、PCは不要</li>
              <li>トップページに動画を使い、第一印象で差がつく</li>
              <li>AIによる文章自動生成でライティング不要</li>
              <li>テンプレートを使って即納品、スピード対応</li>
              <li>月額制なのでコストも安心</li>
            </ul>

            {/* 料金 */}
            <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-300 shadow-sm max-w-md mx-auto">
              <p className="font-semibold text-lg text-blue-800">
                導入料金（キャンペーン中）
              </p>
              <p className="text-gray-700">
                <span className="font-bold">通常価格：</span>
                <br />
                初期費用：
                <span className="line-through text-red-500">100,000円</span>
                （税別）
                <br />
                月額費用：
                <span className="line-through text-red-500">3,000円</span>
                （税別）
                <br />
                <br />
                <span className="font-bold text-blue-700">
                  ▼ 今だけの実績づくりキャンペーン ▼
                </span>
                <br />
                初期費用：
                <span className="text-green-600 font-bold">30,000円</span>
                （税別）
                <br />
                月額費用：
                <span className="text-green-600 font-bold">1,500円</span>
                （税別）
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* 自己撮影プラン */}
                <div className="border p-4 rounded shadow">
                  <h3 className="font-bold text-blue-700">📸 自己撮影プラン</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    お客様ご自身で動画や画像などの素材をご用意いただき、弊社にお渡しいただくプランです。
                    撮影や編集は含まれておらず、コストを抑えたい方におすすめです。
                  </p>
                  <p className="mt-4">
                    初期費用：<strong>30,000円</strong>
                    <br />
                    月額：<strong>1,500円</strong>
                  </p>
                </div>

                {/* おまかせプラン */}
                <div className="border p-4 rounded shadow bg-blue-50">
                  <h3 className="font-bold text-pink-700">🎥 おまかせプラン</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    弊社スタッフが直接訪問し、トップ動画・画像・商品写真などを撮影。
                    編集・セットアップまでを一括でお任せいただける安心プランです。
                  </p>
                  <p className="mt-4">
                    初期費用：<strong>80,000円</strong>（撮影＋編集込み）
                    <br />
                    月額：<strong>1,500円</strong>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                ※キャンペーンは予告なく終了する場合があります
              </p>
              <p className="text-sm text-gray-500 mt-2">
                ※撮影編集代行50,000円
              </p>
            </div>

            <div className="text-center mt-6">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition"
              >
                この価格で導入したい方はこちら →
              </a>
            </div>

            {/* 安さの理由 */}
            <div className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto text-center">
              <p className="font-semibold text-gray-700 mb-1">
                なぜ他社より安いの？
              </p>
              <p>
                Pageitは、開発者がすべての設計・運用を一人で行っているため、
                <br />
                大手のような人件費・管理コストが不要です。
                <br />
                またテンプレート化された仕組みにより、
                <br />
                スピーディかつ効率的に制作できるため、
                <span className="font-medium text-blue-800">
                  高品質かつ低価格
                </span>
                を実現しています。
              </p>
            </div>

            <p className="text-lg font-medium">
              今だけのお得な価格で、あなたのお店をPageitで魅力的に発信してみませんか？
            </p>
          </section>

          {/* お客様の声 */}
          <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10 mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-center">お客様の声</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-4">
                <p className="text-gray-800">
                  「新商品の追加もその場でできて本当に便利。
                  <br />
                  スマホだけでここまでできるとは思いませんでした！」
                </p>
                <p className="text-sm text-gray-500 mt-1">― カフェ Y様</p>
              </div>
              <div className="border-l-4 border-pink-400 pl-4">
                <p className="text-gray-800">
                  「AIの紹介文機能に感動しました。
                  <br />
                  言葉にするのが苦手な自分には最高です。」
                </p>
                <p className="text-sm text-gray-500 mt-1">― ネイルサロン R様</p>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <p className="text-gray-800">
                  「撮影からすべてお任せできて助かりました。
                  <br />
                  今ではお客さんから『見やすいね』とよく言われます。」
                </p>
                <p className="text-sm text-gray-500 mt-1">― 整骨院 K様</p>
              </div>
            </div>
          </section>

          <section className="bg-white/60 backdrop-blur-md rounded-xl shadow p-6 md:p-10 space-y-4 text-center">
            <h2 className="text-2xl font-bold">導入はかんたん3ステップ</h2>
            <ol className="list-decimal list-inside md:text-left text-center max-w-2xl mx-auto space-y-2">
              <li>お問い合わせフォームからご連絡ください</li>
              <li>ヒアリング後、すぐに初期設定開始</li>
              <li>ご希望の内容を反映後、すぐに公開スタート！</li>
            </ol>

            <a
              href="/contact"
              className="mt-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition inline-block"
            >
              お問い合わせはこちら
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
