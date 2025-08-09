import type { Metadata } from "next";
import PartnersClient from "@/components/PartnersClient";

export const metadata: Metadata = {
  title: "パートナー募集｜紹介制度 & 撮影編集代行｜Pageit（ページット）",
  description:
    "Pageit（ページット）の紹介制度（成約1件につき1万円）と、撮影・編集代行パートナーの募集ページです。応募・お問い合わせはこちらから。",
  openGraph: {
    title: "パートナー募集｜紹介制度 & 撮影編集代行｜Pageit",
    description:
      "紹介1件=1万円。撮影/編集パートナーも募集しています。スマホで編集できるホームページ「ページット」を一緒に広げてください。",
    type: "website",
    locale: "ja_JP",
  },
  robots: { index: true, follow: true },
};

export default function PartnersPage() {
  return <PartnersClient />;
}
