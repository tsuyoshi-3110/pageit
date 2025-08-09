// src/app/referral/page.tsx
import type { Metadata } from "next";
import ReferralClient from "@/components/ReferralClient";

export const metadata: Metadata = {
  title: "紹介制度｜ご成約で1万円｜Pageit（ページット）",
  description:
    "Pageit（ページット）の紹介制度ページ。ご紹介先が有料プランをご成約で、紹介者に1万円をお支払いします。",
  openGraph: {
    title: "紹介制度｜Pageit",
    description:
      "ご紹介先がご成約で1万円。店舗・サロン・教室などをご紹介ください。",
    type: "website",
    locale: "ja_JP",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ReferralClient />;
}
