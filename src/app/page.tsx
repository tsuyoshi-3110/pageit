"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  motion,
  AnimatePresence,
  type Variants,
  type PanInfo,
} from "framer-motion";

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
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [pulse, setPulse] = useState<null | "play" | "pause">(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const pulseTimer = useRef<NodeJS.Timeout | null>(null);
  const size = items.length;

  // --- タップ/スワイプ判定 ---
  const downRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const didSwipeRef = useRef(false);
  const TAP_MAX_DIST = 8;
  const TAP_MAX_TIME = 300;

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

  const showPulse = (kind: "play" | "pause") => {
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    setPulse(kind);
    pulseTimer.current = setTimeout(() => setPulse(null), 650);
  };

  const togglePaused = () => {
    setPaused((p) => {
      const n = !p;
      showPulse(n ? "pause" : "play");
      return n;
    });
  };

  const SWIPE = { offset: 60, velocity: 500 };
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const x = info.offset.x;
    const v = info.velocity.x;
    let swiped = false;
    if (x < -SWIPE.offset || v < -SWIPE.velocity) {
      next();
      swiped = true;
    } else if (x > SWIPE.offset || v > SWIPE.velocity) {
      prev();
      swiped = true;
    }
    if (swiped) {
      didSwipeRef.current = true;
      setTimeout(() => {
        didSwipeRef.current = false;
      }, 250);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    downRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!downRef.current) return;
    const dt = performance.now() - downRef.current.t;
    const dx = e.clientX - downRef.current.x;
    const dy = e.clientY - downRef.current.y;
    const dist = Math.hypot(dx, dy);
    downRef.current = null;
    if (didSwipeRef.current) return;
    if (dist <= TAP_MAX_DIST && dt <= TAP_MAX_TIME) togglePaused();
  };

  useEffect(
    () => () => {
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    },
    []
  );

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Pageitの特長スライド"
    >
      <div className="relative rounded-2xl p-px bg-gradient-to-r from-white/50 via-white/20 to-white/50 shadow-[0_8px_30px_rgb(0_0_0_/_0.08)]">
        <div className="relative h-full rounded-2xl bg-white/25 backdrop-blur-xl">
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
              dragElastic={0.22}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative rounded-2xl ring-1 ring-white/40
                         p-4 sm:p-5 md:p-6
                         min-h-[140px] sm:min-h-[160px] md:min-h-[190px]
                         select-none cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* トグル時アイコン */}
              <AnimatePresence>
                {pulse && (
                  <motion.div
                    key={pulse}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none absolute inset-0 grid place-items-center"
                    aria-hidden
                  >
                    <div className="rounded-full bg-black/55 p-2.5 md:p-3 shadow-lg">
                      {pulse === "pause" ? (
                        <PauseIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      ) : (
                        <PlayIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="font-semibold text-base sm:text-lg md:text-xl leading-tight text-gray-900 mb-1.5">
                {items[index].title}
              </h3>
              <p className="text-gray-800/90 text-sm sm:text-[15px] md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                {items[index].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 text-center text-[11px] text-gray-700/80">
        タップで一時停止/再生、左右スワイプで移動
      </div>

      <div className="mt-3.5 flex items-center justify-center gap-2.5">
        {items.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              aria-label={`スライド ${i + 1}`}
              aria-current={active ? "true" : undefined}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={[
                "h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                active
                  ? "w-7 bg-gray-900 shadow-sm ring-1 ring-white/60"
                  : "w-2.5 bg-gray-600/50 hover:bg-gray-700/60",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ====== Page ====== */
export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // iOS/Safari対策
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) {
      tryPlay();
    } else {
      const onCanPlay = () => {
        v.removeEventListener("canplay", onCanPlay);
        tryPlay();
      };
      v.addEventListener("canplay", onCanPlay);
    }
  }, []);

  // もっと“使いたくなる”トーンにリライト
  const features = [
    {
      title: "🌍 ワンタップで世界に販売",
      body: "言語を選ぶだけ。海外のファンにも、いまの魅力をそのまま届けられます。",
    },
    {
      title: "⚡ 最短60秒で商品公開",
      body: "タイトル・価格・写真の3点セット。スマホからそのまま出品。",
    },
    {
      title: "🎥 トップ動画で一目惚れ",
      body: "来店前から“雰囲気”が伝わる。動画で第一印象をアップデート。",
    },
    {
      title: "🤖 テキストはAIにおまかせ",
      body: "キーワードを入れるだけ。商品説明やお知らせ文をサクッと生成。",
    },
    {
      title: "🈳 多言語UIにワンクリック対応",
      body: "英・仏・独・西・伊・中（簡/繁）・韓・日ほか。表示は自由、購入は主要国から。",
    },
    {
      title: "🧩 SNSと相性バツグン",
      body: "リンク共有もスムーズ。発見→購入までの距離をキュッと短縮。",
    },
    {
      title: "🛠️ 誰でもメンテ簡単",
      body: "在庫・価格・写真の差し替えが即時反映。思い立ったらすぐ更新。",
    },
    {
      title: "🔎 検索に強い設計",
      body: "モバイル最適化・高速表示・OGPまで。見つかるための土台を完備。",
    },
  ];

  // グローバルECの魅力を“ベネフィット中心”に
  const globalECPoints = [
    "世界中の主要国から購入OK。言語は好きに選べて、送り先は自由に指定できます。",
    "決済はシンプル＆安心のStripe。面倒な設定なしでスムーズにお支払いへ。",
    "スマホ運用前提のUI。撮って・書いて・公開までのムダを徹底カット。",
    "集客から販売までを一本化。投稿→ページ→決済まで、迷わない導線設計。",
    "チーム運用もラク。誰が更新してもデザインが崩れないから“速い”が続く。",
  ];

  return (
    <>
      <Head>
        <title>
          Pageit（ページット）｜スマホで簡単編集できるホームページサブスク
        </title>
        <meta
          name="description"
          content="ワンタップで世界に販売。Pageit（ページット）は動画×スマホ×AIで、最短60秒で商品公開＆グローバル対応のストア体験を実現します。"
        />
        <meta
          name="keywords"
          content="Pageit, ページット, ホームページ, EC, グローバルEC, 多言語, スマホ更新, 動画, AI, 中小企業, 個人店舗"
        />
        <meta
          property="og:title"
          content="Pageit（ページット）｜スマホで簡単編集"
        />
        <meta
          property="og:description"
          content="スマホで“撮って・書いて・出す”。ワンタップで世界に販売できる次世代のホームページ＆EC。"
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
        {/* 動画の事前読み込み */}
        <link rel="preload" as="video" href="/movie2.mp4" type="video/mp4" />
      </Head>

      <main
        className="relative min-h-screen bg-gradient-to-br from-sky-300 via-fuchsia-300 to-pink-300 overflow-hidden"
        role="main"
      >
        {/* 背景ブロブ */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/35 blur-3xl"
          initial={{ opacity: 0.15, x: 0, y: 0 }}
          animate={{ opacity: 0.25, x: [0, 15, -10, 0], y: [0, -10, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-white/20 blur-3xl"
          initial={{ opacity: 0.12, x: 0, y: 0 }}
          animate={{ opacity: 0.2, x: [0, -12, 10, 0], y: [0, 14, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="max-w-4xl mx-auto px-6 py-8 md:py-14 space-y-8 text-gray-800"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* キャッチコピー */}
          <motion.section
            className="text-center space-y-4"
            variants={item}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h1 className="text-[1.5rem] md:text-4xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
                スマホで編集、動画で魅せる。ワンタップで世界に販売。
              </span>
            </h1>
          </motion.section>

          {/* 動画カード */}
          <motion.div
            className="flex justify-center"
            variants={item}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.97 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-white/50 via-white/20 to-white/50 shadow-[0_8px_30px_rgb(0_0_0_/_0.08)]">
              <div className="w-[280px] md:w-[380px] rounded-2xl overflow-hidden bg-black/25 backdrop-blur-xl ring-1 ring-white/40">
                <video
                  ref={videoRef}
                  src="/movie2.mp4"
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                  poster="/images/iconImage.png"
                  className="w-full h-full object-cover"
                >
                  お使いのブラウザは video タグに対応していません。
                </video>
              </div>
            </div>
          </motion.div>

          {/* About */}
          <section
            id="about"
            aria-labelledby="about-title"
            className="text-center space-y-1"
          >
            <p className="text-lg text-gray-800/90 max-w-2xl mx-auto">
              Pageit（ページット）は、動画×スマホ×AIで“育てる”ホームページ。
            </p>
            <p className="text-lg text-gray-800/90 max-w-2xl mx-auto">
              作って終わりじゃない。今日のベストを、今日のうちに世界へ。
            </p>
          </section>

          {/* 特長（スライドショー） */}
          <section id="features" aria-labelledby="features-title">
            <motion.h2
              variants={item}
              className="text-2xl md:text-3xl font-semibold text-center mb-6"
            >
              Pageitの特長
            </motion.h2>
            <FeatureSlideshow items={features} intervalMs={3500} />
          </section>

          {/* グローバルECセクション（ベネフィット訴求） */}
          <section
            id="global-ec"
            aria-labelledby="global-ec-title"
            className="mt-6"
          >
            <motion.h2
              variants={item}
              className="text-2xl md:text-3xl font-semibold text-center mb-4"
            >
              🌐 グローバルECに標準対応
            </motion.h2>
            <motion.div
              variants={item}
              className="mx-auto max-w-3xl rounded-2xl p-5 md:p-6 bg-white/60 backdrop-blur ring-1 ring-white/50 shadow-[0_8px_30px_rgb(0_0_0_/_0.06)]"
            >
              <ul className="list-disc pl-6 space-y-2 text-[15px] md:text-base text-gray-900/90">
                {globalECPoints.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
              <div className="mt-3 text-sm text-gray-700/80">
                表示言語は自由、配送先は世界の主要国に対応。
              </div>
            </motion.div>
          </section>

          {/* CTA */}
          <motion.div
            className="text-center mt-2"
            variants={item}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.a
              href="/contact"
              className="inline-block bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-7 py-3 rounded-lg shadow-lg hover:shadow-xl transition will-change-transform"
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
