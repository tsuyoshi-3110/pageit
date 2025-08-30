"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ====== Motion variants ====== */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.28 },
  }),
};

/* ====== Icons ====== */
function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
    </svg>
  );
}
function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
    </svg>
  );
}

/* ====== Feature slideshow ====== */
function FeatureSlideshow({
  items,
  intervalMs = 3500,
}: {
  items: { title: string; body: string }[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1); // 1: next / -1: prev
  const [paused, setPaused] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const size = items.length;

  const go = (next: number, direction: number) => {
    setDir(direction);
    setIndex(((next % size) + size) % size);
  };

  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, intervalMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, intervalMs]);

  const togglePaused = () => setPaused((p) => !p);

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next();
              else if (info.offset.x > 80) prev();
            }}
            className="p-6 rounded-xl shadow-lg bg-white/35 backdrop-blur-sm ring-1 ring-white/40 min-h-[180px]"
          >
            <h3 className="font-bold text-lg mb-2">{items[index].title}</h3>
            <p className="text-gray-800/90">{items[index].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* arrows（クリック範囲を少し拡大） */}
      <button
        aria-label="前へ"
        onClick={prev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/50 text-white w-10 h-10 grid place-items-center backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        ‹
      </button>
      <button
        aria-label="次へ"
        onClick={next}
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/50 text-white w-10 h-10 grid place-items-center backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        ›
      </button>

      {/* dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`スライド ${i + 1}`}
            onClick={() => go(i, i > index ? 1 : -1)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-gray-800" : "w-2.5 bg-gray-500/60"
            }`}
          />
        ))}
      </div>

      {/* ▶/⏸ トグル（ヒットエリア拡大・クリック可能・キーボード対応） */}
      <button
        type="button"
        aria-label={paused ? "自動再生を再開" : "自動再生を一時停止"}
        aria-pressed={paused}
        title={paused ? "再生" : "一時停止"}
        onClick={togglePaused}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePaused();
          }
        }}
        className="absolute -top-4 right-0 z-10 w-10 h-10 rounded-full bg-black/45 hover:bg-black/60 text-white grid place-items-center backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </div>
  );
}

/* ====== Page ====== */
export default function Home() {
  const features = [
    { title: "📱 スマホで簡単編集", body: "PC不要。メニューやお知らせもその場で更新できます。インスタのような使い心地！" },
    { title: "🎥 トップ動画で印象UP", body: "来店前のユーザーに強いインパクトを与える動画表示。" },
    { title: "✍️ AIが文章を自動生成", body: "商品説明やお知らせ文章も、キーワード入力だけでOK。" },
    { title: "🔄 簡単に差し替え・更新", body: "動画や画像を何度でも自由に変更でき、常に“今”の情報を発信。" },
    { title: "📸 プロ撮影＆編集、インフルエンサー監修", body: "現役カメラマンが撮影・編集。SNSに強いインフルエンサーが世界観を監修し、“映える”表現に。" },
    { title: "🤝 オーナー同士のネットワーク × AI協業提案", body: "オーナー同士で繋がれるコミュニティ。AIが相互送客や共同企画などの協業案を自動提案。" },
    { title: "📊 分析機能つき", body: "アクセス数や人気ページがひと目でわかり、改善に役立てられます。AIアドバイスも。" },
    { title: "🔍 SEO対策もバッチリ", body: "スマホ対応・高速表示・OGP設定など、検索に強い構造です。" },
    { title: "🌐 独自ドメイン対応", body: "お店や会社の名前をそのままURLに。ブランド価値と信頼性がアップします。" },
  ];

  return (
    <>
      <Head>
        <title>Pageit（ページット）｜スマホで簡単編集できるホームページサブスク</title>
        <meta
          name="description"
          content="Pageit（ページット）は、動画×スマホ×AIで簡単にホームページを更新できる中小企業・個人店舗向けの編集サービスです。スマホだけでトップ動画・画像・テキストを自在に管理できます。"
        />
        <meta
          name="keywords"
          content="Pageit, ページット, ホームページ編集, スマホ更新, 店舗向けHP, 動画ホームページ, AIホームページ"
        />
        <meta property="og:title" content="Pageit（ページット）｜スマホで簡単編集" />
        <meta
          property="og:description"
          content="スマホで簡単に編集できるホームページ。動画・画像・AIがすべて揃った次世代型サブスク型Webサービス。"
        />
        <meta property="og:image" content="https://www.pageit.shop/images/ogpImage.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.pageit.shop/" />
        <meta name="google-site-verification" content="b2le0w60OVwzkCTsr2nc9z3Mdh5_MlfiFUQfsQXHo1w" />
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

          {/* 特長（スライドショー） */}
          <section id="features" aria-labelledby="features-title">
            <motion.h2
              variants={item}
              className="text-2xl font-semibold text-center mb-6"
            >
              Pageitの特長
            </motion.h2>
            <FeatureSlideshow items={features} intervalMs={3500} />
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
