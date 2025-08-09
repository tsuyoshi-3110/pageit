"use client";

import Image from "next/image";
import Head from "next/head";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1], // easeOut相当
    },
  },
};

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
        className="relative min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 overflow-hidden"
        role="main"
      >
        {/* 背景アクセント */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/30 blur-3xl"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/20 blur-3xl"
        />

        <motion.div
          className="max-w-4xl mx-auto px-6 py-16 space-y-16 text-gray-800"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* ロゴ */}
          <motion.div
            className="flex justify-center"
            variants={item}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/iconImage.png"
              alt="Pageit（ページット）のロゴ"
              width={240}
              height={240}
              priority
            />
          </motion.div>

          {/* キャッチコピー */}
          <motion.section
            className="text-center space-y-4"
            variants={item}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                スマホで編集、動画で魅せる。
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              Pageit（ページット）は、SNS世代のために設計された、動画×スマホ×AI対応のホームページサービスです。
            </p>
            <p className="text-base text-gray-700/90">
              これからの時代、ホームページは“作って終わり”ではなく、“育てていく”ものです。
            </p>
          </motion.section>

          {/* 特長 */}
          <section id="features" aria-labelledby="features-title">
            <motion.h2
              variants={item}
              className="text-2xl font-semibold text-center mb-8"
            >
              Pageitの特長
            </motion.h2>

            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  title: "📱 スマホで簡単編集",
                  body: "PC不要。メニューやお知らせもその場で更新できます。インスタのような使い心地！",
                },
                {
                  title: "🎥 トップ動画で印象UP",
                  body: "来店前のユーザーに強いインパクトを与える動画表示。",
                },
                {
                  title: "✍️ AIが文章を自動生成",
                  body: "商品説明やお知らせ文章も、キーワード入力だけでOK。",
                },
                {
                  title: "🔄 簡単に差し替え・更新",
                  body: "動画や画像を何度でも自由に変更でき、常に“今”の情報を発信。",
                },
                {
                  title: "🔍 SEO対策もバッチリ",
                  body: "スマホ対応・高速表示・OGP設定など、検索に強い構造です。",
                },
                {
                  title: "📊 分析機能つき", // ← 追加カード
                  body: "アクセス数や人気ページがひと目でわかり、改善に役立てられます。AIアドバイス。",
                },
                {
                  title: "🌐 独自ドメイン対応",
                  body: "お店や会社の名前をそのままURLに。ブランド価値と信頼性がアップします。",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group p-6 rounded-xl shadow-lg bg-white/35 backdrop-blur-sm ring-1 ring-white/40"
                >
                  <h3 className="font-bold text-lg mb-2">
                    <span className="group-hover:underline decoration-2 underline-offset-4">
                      {card.title}
                    </span>
                  </h3>
                  <p className="text-gray-800/90">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CTA */}
          <motion.div
            className="text-center mt-4"
            variants={item}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.a
              href="/contact"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition will-change-transform"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              まずは無料相談 →
            </motion.a>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
