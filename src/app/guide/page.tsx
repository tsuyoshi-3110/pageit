// app/guide/page.tsx
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
    "ドラッグ＆ドロップで商品の表示順を自由に並び替えできます。",
    "紹介文にはAIによる自動生成機能も搭載しており、魅力的な説明文がすぐに完成します。",
  ]
},
 {
  image: "/images/inputImage.jpeg",
  alt: "商品編集画面",
  title: "商品情報の編集",
  description: [
    "商品名・価格・税込/税抜をワンタップで編集できます。",
    "画像の変更も簡単に行えます（スマホから直接アップロード可能）。",
    "AIによる紹介文の自動生成ボタンを使えば、プロのような説明文がすぐに完成します。",
  ]
},


];

export default function GuidePage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold mb-6">ご案内</h1>

      {sections.map((section, index) => (
        <section key={index} className="space-y-4 text-gray-800">
          <Image
            src={section.image}
            alt={section.alt}
            width={200}
            height={200}
            className="rounded-lg  object-cover"
          />
          <h2 className="text-xl font-semibold">{section.title}</h2>

          {Array.isArray(section.description) ? (
            <ul className="list-disc pl-6 space-y-1">
              {section.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{section.description}</p>
          )}
        </section>
      ))}
    </main>
  );
}
