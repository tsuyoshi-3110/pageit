// src/app/monitors/page.tsx
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "モニターサイト一覧｜Pageit（ページット）",
  description:
    "Pageit（ページット）で制作・運用中のモニター様サイトの実例です。スマホ更新・動画トップ・AI文章などの活用イメージをご覧ください。",
  openGraph: {
    title: "モニターサイト一覧｜Pageit",
    description: "スマホ更新・動画トップ・AI文章など、Pageitの実例をチェック。",
    type: "website",
    locale: "ja_JP",
  },
  robots: { index: true, follow: true },
};

type Monitor = {
  id: string;
  name: string;
  industry: string;
  location?: string;
  url: string;
  image: string; // /public/monitors/xxx.jpg
  blurb: string;
};

const MONITORS: Monitor[] = [
  {
    id: "yotteya",
    name: "甘味処 クレープよって屋",
    industry: "飲食店",
    location: "大阪府",
    url: "https://www.yotteya.shop/",
    image: "/monitors/yotteyaKamon.jpg",
    blurb:
      "季節の和スイーツを動画トップで紹介。日替わりメニューをスマホから即更新。",
  },
  {
    id: "You-First",
    name: "You-First",
    industry: "ハウスクリーニング",
    location: "群馬県",
    url: "https://www.you-first.shop/",
    image: "/monitors/youFirstLogo.png",
    blurb: "レッスンスケジュールをAIで文章生成。体験申込の獲得数を可視化。",
  },
];

export default function MonitorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <div className="max-w-6xl mx-auto px-6 py-14 text-gray-900">
        {/* Header */}
        <header className="text-center space-y-4 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            モニターサイト一覧
          </h1>
          <p className="text-gray-800">
            Pageit
            で運用中の実例を公開中。デザインや更新体験の参考にご覧ください。
          </p>
        </header>

        {/* Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MONITORS.map((m) => (
            <article
              key={m.id}
              className="group rounded-2xl bg-white/75 backdrop-blur shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* 画像：上部だけ角丸を効かせ、確実にクリップ */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                <Image
                  src={m.image}
                  alt={`${m.name} のスクリーンショット`}
                  fill
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-300 will-change-transform"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
                    {m.industry}
                  </span>
                  {m.location && (
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {m.location}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold">{m.name}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {m.blurb}
                </p>

                <div className="pt-1">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 px-4 py-2 rounded-md shadow hover:opacity-90 transition"
                  >
                    サイトを見る
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
