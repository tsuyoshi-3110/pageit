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
  const [dir, setDir] = useState(1); // 1: next / -1: prev
  const [paused, setPaused] = useState(false);
  const [pulse, setPulse] = useState<null | "play" | "pause">(null); // 一瞬表示アイコン
  const timer = useRef<NodeJS.Timeout | null>(null);
  const pulseTimer = useRef<NodeJS.Timeout | null>(null);
  const size = items.length;

  // --- タップ/スワイプ判定用 ---
  const downRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const didSwipeRef = useRef(false);

  const TAP_MAX_DIST = 8; // px
  const TAP_MAX_TIME = 300; // ms

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

  // スワイプ判定（距離 or 速度）＋「スワイプ成立時はトグル禁止フラグ」を立てる
  const SWIPE = { offset: 60, velocity: 500 }; // px, px/s
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
      // 次の pointerup まで有効にして、その後リセット
      setTimeout(() => {
        didSwipeRef.current = false;
      }, 250);
    }
  };

  // タップ検出（Pointerベース）
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

    // スワイプが直前に成立していたら何もしない（アイコンも出さない）
    if (didSwipeRef.current) return;

    // 純タップと判断できた場合のみトグル
    if (dist <= TAP_MAX_DIST && dt <= TAP_MAX_TIME) {
      togglePaused();
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Pageitの特長スライド"
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
            dragElastic={0.25}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative p-6 rounded-xl shadow-lg bg-white/35 backdrop-blur-sm ring-1 ring-white/40 min-h-[180px]
                       select-none cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {/* トグル時だけ中央に一瞬表示するアイコン（スワイプ時は出ない） */}
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
                  <div className="rounded-full bg-black/55 p-3">
                    {pulse === "pause" ? (
                      <PauseIcon className="w-8 h-8 text-white" />
                    ) : (
                      <PlayIcon className="w-8 h-8 text-white" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="font-bold text-lg mb-2">{items[index].title}</h3>
            <p className="text-gray-800/90">{items[index].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

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

  const features = [
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
      title: "📸 プロ撮影＆編集、インフルエンサー監修",
      body: "現役カメラマンが撮影・編集。SNSに強いインフルエンサーが世界観を監修し、“映える”表現に。",
    },
    {
      title: "🤝 オーナー同士のネットワーク × AI協業提案",
      body: "オーナー同士で繋がれるコミュニティ。AIが相互送客や共同企画などの協業案を自動提案。",
    },
    {
      title: "📊 分析機能つき",
      body: "アクセス数や人気ページがひと目でわかり、改善に役立てられます。AIアドバイスも。",
    },
    {
      title: "🔍 SEO対策もバッチリ",
      body: "スマホ対応・高速表示・OGP設定など、検索に強い構造です。",
    },
    {
      title: "🌐 独自ドメイン対応",
      body: "お店や会社の名前をそのままURLに。ブランド価値と信頼性がアップします。",
    },
  ];

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

        {/* 動画の事前読み込み（src と一致） */}
        <link rel="preload" as="video" href="/movie2.mp4" type="video/mp4" />
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
          className="max-w-4xl mx-auto px-6 py-8 space-y-8 text-gray-800"
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
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              <span className="inline-block my-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                スマホで編集、動画で魅せる。
              </span>
            </h1>
          </motion.section>

          {/* ▼ 動画 */}
          <motion.div
            className="flex justify-center"
            variants={item}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.97 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-[260px] md:w-[360px] rounded-2xl shadow-xl ring-1 ring-white/50 overflow-hidden bg-black/20 backdrop-blur">
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
          </motion.div>

          <section id="features" aria-labelledby="features-title">
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              Pageit（ページット）は、SNS世代のために設計された、動画×スマホ×AI対応のホームページサービスです。
            </p>
            <p className="text-base text-gray-700/90">
              これからの時代、ホームページは“作って終わり”ではなく、“育てていく”ものです。
            </p>
          </section>

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
