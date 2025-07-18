import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Pageit（ページット）｜スマホで簡単に更新できるホームページ編集サブスク",
  description:
    "Pageit（ページット）は、スマホで動画や画像を編集できる中小企業・店舗向けホームページ編集サブスクサービスです。AIによる紹介文生成・ドラッグ＆ドロップ・動画トップページなど、今の集客に最適な機能を搭載。",
  keywords: [
    "Pageit",
    "ページット",
    "ホームページ編集",
    "サブスクHP",
    "スマホ対応ホームページ",
    "動画ホームページ",
    "AI自動生成",
    "中小企業 ホームページ",
    "店舗向けホームページ",
  ],
  authors: [{ name: "Pageit開発チーム" }],
  openGraph: {
    title: "Pageit（ページット）｜スマホで編集・動画で魅せるホームページ",
    description:
      "スマホで簡単に更新できる、動画対応・AI文章生成つきのホームページ編集サービス「Pageit（ページット）」。",
    url: "https://あなたのドメイン（例: pageit.jp）",
    siteName: "Pageit（ページット）",
    type: "website",
    images: [
      {
        url: "https://あなたのドメイン/images/ogpImage.jpg",
        width: 1200,
        height: 630,
        alt: "Pageit（ページット） OGP画像",
      },
    ],
  },
  alternates: {
    canonical: "https://あなたのドメイン",
  },
  metadataBase: new URL("https://あなたのドメイン"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
