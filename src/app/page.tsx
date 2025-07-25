"use client";

import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Pageit（ページット）｜スマホで簡単編集できるホームページサブスク
        </title>
        <meta
          name="description"
          content="Pageit（ページット）は、動画×スマホ×AIで簡単にホームページを更新できる中小企業・個人店舗向けの編集サービスです。スマホだけでトップ動画・画像・テキストを自在に管理できます。"
        />
        <meta
          name="keywords"
          content="Pageit, ページット, ホームページ編集, スマホ更新, 店舗向けHP, 動画ホームページ, AIホームページ"
        />
        <meta
          property="og:title"
          content="Pageit（ページット）｜スマホで簡単編集"
        />
        <meta
          property="og:description"
          content="スマホで簡単に編集できるホームページ。動画・画像・AIがすべて揃った次世代型サブスク型Webサービス。"
        />
        <meta
          property="og:image"
          content="https://www.pageit.shop/images/ogpImage.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.pageit.shop/" />
        <meta
          name="google-site-verification"
          content="b2le0w60OVwzkCTsr2nc9z3Mdh5_MlfiFUQfsQXHo1w"
        />
      </Head>

      <main
        className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300"
        role="main"
      >
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16 text-gray-800">
          {/* ロゴ */}
          <div className="flex justify-center">
            <Image
              src="/images/iconImage.png"
              alt="Pageit（ページット）のロゴ"
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
            <p className="text-base text-gray-600">
              これからの時代、ホームページは“作って終わり”ではなく、“育てていく”ものです。
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
                <p>
                  PC不要。メニューやお知らせもその場で更新できます。インスタのような使い心地！
                </p>
              </div>
              <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-2">
                  🎥 トップ動画で印象UP
                </h3>
                <p>来店前のユーザーに強いインパクトを与える動画表示。</p>
              </div>
              <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-2">
                  ✍️ AIが文章を自動生成
                </h3>
                <p>商品説明やお知らせ文章も、キーワード入力だけでOK。</p>
              </div>
              <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-2">
                  🔄 簡単に差し替え・更新
                </h3>
                <p>
                  動画や画像を何度でも自由に変更でき、常に“今”の情報を発信。
                </p>
              </div>
              <div className="p-6 rounded-xl shadow-lg bg-transparent backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-2">🔍 SEO対策もバッチリ</h3>
                <p>スマホ対応・高速表示・OGP設定など、検索に強い構造です。</p>
              </div>
            </div>
          </section>
          <div className="text-center mt-4">
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition"
            >
              まずは無料相談 →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
