"use client";

import Image from "next/image";

type GuideSection = {
  image: string;
  alt: string;
  title: string;
  description: string | string[];
};

const sections: GuideSection[] = [
  {
    image: "/images/topImage.jpeg",
    alt: "トップ画像",
    title: "トップ画面のカスタマイズ",
    description: [
      "ワンタップで背景カラーを変更できます。スマホから簡単に操作可能です。",
      "トップには動画または画像（最大3枚）を設定可能。画像はスライドショー表示も対応。",
      "背景画像やヘッダー画像も簡単に編集できます。",
    ],
  },
  {
    image: "/images/productImage.jpeg",
    alt: "商品管理画面",
    title: "商品情報の管理",
    description: [
      "商品カードはスマホから簡単に追加・削除・編集が可能です。",
      "ショート動画と画像どちらかを表示するとこができます。",
      "ドラッグ＆ドロップで商品の表示順を自由に並び替えできます。",
      "紹介文にはAIによる自動生成機能も搭載しており、魅力的な説明文がすぐに完成します。",
    ],
  },
  {
    image: "/images/inputImage.jpeg",
    alt: "商品編集画面",
    title: "商品情報の編集",
    description: [
      "商品名・価格・税込/税抜をワンタップで編集できます。",
      "画像の変更も簡単に行えます（スマホから直接アップロード可能）。",
      "AIによる紹介文の自動生成ボタンを使えば、プロのような説明文がすぐに完成します。",
    ],
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Pageit ご案内
        </h1>

        {sections.map((section, index) => (
          <section
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center"
          >
            {/* 左側に画像 */}
            <div className="flex-shrink-0">
              <Image
                src={section.image}
                alt={section.alt}
                width={280}
                height={280}
                className="rounded-lg object-cover shadow-md"
              />
            </div>

            {/* 右側にテキスト */}
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
      </div>
    </main>
  );
}
