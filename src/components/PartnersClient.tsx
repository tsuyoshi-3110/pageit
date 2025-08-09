// src/app/partners/PartnersClient.tsx
"use client";

import { useState } from "react";

type ApiResult = { ok: boolean; message?: string };

export default function PartnersClient() {
  const [loadingPro, setLoadingPro] = useState(false);
  const [donePro, setDonePro] = useState<null | string>(null);

  async function submitPro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingPro(true);
    setDonePro(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "creator", ...data }),
      });
      const json = (await res.json()) as ApiResult;
      if (json.ok) {
        setDonePro("送信しました。選考のうえ折り返しご連絡します。");
        form.reset();
      } else {
        setDonePro(
          json.message || "送信に失敗しました。時間をおいて再度お試しください。"
        );
      }
    } catch {
      setDonePro("送信に失敗しました。ネットワークをご確認ください。");
    } finally {
      setLoadingPro(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <div className="max-w-5xl mx-auto px-6 py-14 text-gray-900">
        {/* Header */}
        <header className="text-center space-y-3 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            撮影・編集代行パートナー募集
          </h1>
          <p className="text-gray-800">
            店舗・サロン向けの写真/動画撮影と簡単編集をお任せできる方を募集しています。
          </p>
        </header>

        {/* 募集要項カード */}
        <section className="rounded-2xl bg-white/70 backdrop-blur p-6 shadow mb-10">
          <h2 className="text-xl font-bold mb-2">募集要項</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>内容：店舗・サロンの写真/動画の撮影と簡単編集</li>
            <li>
              報酬目安：撮影のみ<strong>¥35,000</strong>、撮影＋編集
              <strong>¥50,000</strong>（交通費別）
            </li>
            <li>
              要件：一眼レフ or 高性能スマホの撮影経験、基本的な動画編集スキル
            </li>
            <li>エリア：全国（リモート/近隣中心、案件により調整）</li>
          </ul>
        </section>

        {/* 応募フォーム */}
        <section className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow">
          <h2 className="text-xl font-bold mb-4">パートナー 応募フォーム</h2>
          <form className="space-y-4" onSubmit={submitPro}>
            <div>
              <label className="block text-sm font-semibold mb-1">
                お名前 *
              </label>
              <input
                name="name"
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="例：山田 花子"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                メールアドレス *
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                活動エリア *
              </label>
              <input
                name="area"
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="例：神戸市周辺／全国リモート可 など"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                ポートフォリオURL
              </label>
              <input
                name="portfolio"
                type="url"
                className="w-full rounded-md border px-3 py-2"
                placeholder="https://…"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                スキル・機材
              </label>
              <textarea
                name="skills"
                rows={3}
                className="w-full rounded-md border px-3 py-2"
                placeholder="撮影経験、使用機材、編集ソフト等"
              />
            </div>

            <button
              type="submit"
              disabled={loadingPro}
              className="w-full rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2.5 font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loadingPro ? "送信中…" : "パートナーに応募する"}
            </button>
            {donePro && <p className="text-sm mt-2">{donePro}</p>}
          </form>
        </section>

        {/* FAQ */}
        <section className="mt-10 rounded-2xl bg-white/60 backdrop-blur p-6 shadow">
          <h3 className="text-lg font-bold mb-3">よくある質問 / 注意事項</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>応募内容やスケジュールにより、依頼できない場合があります。</li>
            <li>納品形式・著作権の扱い等は案件ごとに取り決めます。</li>
          </ul>
        </section>

        {/* Contact link */}
        <div className="text-center mt-10">
          <a
            href="/contact"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition"
          >
            その他のお問い合わせ →
          </a>
        </div>
      </div>
    </main>
  );
}
