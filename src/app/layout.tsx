import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title:
    "Pageit（ページット）｜スマホで簡単に更新できるホームページ編集サブスク",
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
    url: "https://www.pageit.shop",
    siteName: "Pageit（ページット）",
    type: "website",
    images: [
      {
        url: "https://www.pageit.shop/images/ogpImage.png",
        width: 1200,
        height: 630,
        alt: "Pageit（ページット） OGP画像",
      },
    ],
  },
  alternates: {
    canonical: "https://www.pageit.shop",
  },
  metadataBase: new URL("https://www.pageit.shop"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta
          name="google-site-verification"
          content="b2le0w60OVwzkCTsr2nc9z3Mdh5_MlfiFUQfsQXHo1w"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
