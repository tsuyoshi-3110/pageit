"use client";

import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

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
        <meta property="og:title" content="Pageit ご案内｜ホームページ機能紹介" />
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

          {/* ヒーロー動画 */}
          <div
            className={[
              "relative mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/40 bg-black",
              videoMeta.portrait ? "max-w-[260px]" : "max-w-xl",
            ].join(" ")}
            style={{ aspectRatio: `${videoMeta.w} / ${videoMeta.h}` }}
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
                setVideoMeta({ w, h, portrait: h >= w, ready: true });
              }}
              className={[
                "absolute inset-0 h-full w-full",
                videoMeta.portrait ? "object-contain" : "object-cover",
              ].join(" ")}
              aria-label="Pageit 紹介動画"
            />

            {/* 枠のハイライト */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20 rounded-2xl" />
          </div>
        </section>
        {/* ▲▲ トップ：動画ヒーロー ▲▲ */}

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

          {/* ▼▼ テキストと動画を1つのラッパでまとめて、間隔だけを小さく制御 ▼▼ */}
          <div className="space-y-2"> {/* ← 必要に応じて space-y-1 / space-y-0 に変更 */}
            <p className="text-center text-2xl">
              自動で多言語翻訳。
              <br />
              世界中のユーザーに伝わります。
            </p>

            <div
              className={[
                "relative mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/40 bg-black",
                videoMeta.portrait ? "max-w-[260px]" : "max-w-xl",
              ].join(" ")}
              style={{ aspectRatio: `${videoMeta.w} / ${videoMeta.h}` }}
            >
              {/* やわらかい光彩 */}
              <div className="pointer-events-none absolute -inset-6 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-2xl" />

              {/* 動画本体 */}
              <video
                src="/setumei2.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  const w = v.videoWidth || 9;
                  const h = v.videoHeight || 16;
                  setVideoMeta({ w, h, portrait: h >= w, ready: true });
                }}
                className={[
                  "absolute inset-0 h-full w-full",
                  videoMeta.portrait ? "object-contain" : "object-cover",
                ].join(" ")}
                aria-label="Pageit 紹介動画（多言語翻訳紹介）"
              />

              {/* 枠のハイライト */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20 rounded-2xl" />
            </div>
          </div>
          {/* ▲▲ ここまでを1ラッパに ▲▲ */}

          {/* 課題訴求 */}
          <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10 space-y-4">
            <h2 className="text-2xl font-semibold">こんな経験はありませんか？</h2>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>新商品や価格を変えたいのに、業者さんに頼むと時間もお金もかかる…</li>
              <li>「ちょっと直しておいて」と言ったまま、いつ反映されるか分からない…</li>
              <li>外出先で、「あ、文章間違ってる！」と思っても修正できないモヤモヤ…</li>
            </ul>

            <p className="mt-4 text-gray-800">
              私も同じ経験をしました。だからこそ、
              <span className="font-semibold">スマホ1つで即編集・即反映できる</span>
              「Pageit」を開発。さらに
              <span className="font-semibold">プロのカメラマンの撮影＆編集＋インフルエンサー監修</span>
              で“伝わる見せ方”を実現し、
              <span className="font-semibold">オーナー同士のネットワーク×AI協業提案</span>
              で集客面までバックアップします。
            </p>
          </section>

          {/* 締め・料金・比較・CTA */}
          <section className="text-gray-800 text-center space-y-6 bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold">Pageitが選ばれる理由</h2>
            <ul className="list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
              <li>スマホひとつでいつでも編集、PCは不要＆即反映</li>
              <li>トップページに<span className="font-semibold">動画</span>、第一印象でしっかり差別化</li>
              <li><span className="font-semibold">AIが文章を自動生成</span>、ライティングの手間を削減</li>
              <li><span className="font-semibold">プロ撮影＆編集＋インフルエンサー監修</span>で“映える”世界観に</li>
              <li><span className="font-semibold">オーナー同士のネットワーク × AI協業提案</span>で相互送客・共同企画を促進</li>
              <li>アクセス分析・SEO対策・OGPなど運用に強い設計</li>
              <li>月額制でランニングも安心（必要なときだけ差し替えOK）</li>
            </ul>

            <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-300 shadow-sm max-w-md mx-auto">
              <p className="font-semibold text-lg text-blue-800">料金</p>

              <div className="mt-3 border p-4 rounded shadow bg-blue-50/60">
                <h3 className="font-bold text-pink-700">制作・導入セット（撮影・編集込み）</h3>
                <p className="mt-2 text-sm text-gray-700">
                  プロのカメラマンが撮影・編集。初期セットアップやSEO/OGP、アクセス計測の設定まで一括対応します。
                </p>

                <p className="mt-4">初期費用：<strong>80,000円</strong>（税別）</p>

                <ul className="mt-3 text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>プロ撮影・編集一式（トップ動画・画像対応）</li>
                  <li>初期セットアップ／ページ初期構成</li>
                  <li>基本SEO／OGP設定・アクセス計測</li>
                  <li>独自ドメイン／サーバー設定・運用</li>
                </ul>

                <div className="mt-4 p-3 rounded bg-white/70 border">
                  <p>
                    <span className="font-semibold">運用サポート料（毎月）：</span>
                    <strong>1,500円</strong>（税別）
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    <strong>ドメイン・サーバー費、SSL（https）もすべて含まれます。</strong>
                    軽微な文言差し替え・画像更新のご相談、技術サポートも含みます。
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-2">※キャンペーンは予告なく終了する場合があります</p>
            </div>

            {/* CTA */}
            <div className="text-center mt-6">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition"
              >
                この内容で相談する →
              </a>
            </div>

            <div className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto text-center">
              <p className="font-semibold text-gray-700 mb-1">なぜ高品質なのに手頃？</p>
              <p>
                Pageitは開発〜運用までをスリムな体制で一気通貫。テンプレート化と自動化により
                <span className="font-medium text-blue-800"> 高品質 × 低コスト × スピード </span>
                を実現しています。
              </p>
            </div>

            <p className="text-lg font-medium">
              「伝わる」見せ方と「続く」運用で、あなたのお店をPageitが後押しします。
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
                  「撮影から監修までお任せで助かりました。
                  <br />
                  お客さんから『世界観が伝わる』と言われ、来店につながっています。」
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
