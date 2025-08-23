// src/components/ReferralClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

type ApiResult = { ok: boolean; message?: string };

type ReferrerStore = { referrerName: string; email: string };
type BankStore = {
  bankName: string;
  branchName: string;
  accountType: "普通" | "当座";
  accountNumber: string;
  accountHolderKana: string;
};

const LS_KEY_REFERRER = "pageit_referral_referrer";
const LS_KEY_BANK = "pageit_referral_bank";

const INDUSTRY_OPTIONS = [
  "飲食店",
  "カフェ・ベーカリー",
  "美容・サロン（美容室/ネイル/エステ）",
  "整体・治療院・クリニック",
  "フィットネス・ヨガ",
  "教室・スクール",
  "小売・物販（EC含む）",
  "不動産・建設・工務店",
  "自動車関連（販売・整備）",
  "宿泊（ホテル/旅館/民泊）",
  "士業（税理士/社労士/他）",
  "その他",
] as const;

const toHalfWidthDigits = (s: string) =>
  s.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0));
const HYPHENS = /[‐\-‒–—ー－]/g;

function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: number | string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-bold">
        {step}
      </span>
      <div>
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ReferralClient() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);

  // 紹介者（保存対象）
  const [referrer, setReferrer] = useState<ReferrerStore>({
    referrerName: "",
    email: "",
  });

  // 紹介者：振込先
  const [bank, setBank] = useState<BankStore>({
    bankName: "",
    branchName: "",
    accountType: "普通",
    accountNumber: "",
    accountHolderKana: "",
  });

  // 紹介先：業種
  const [industry, setIndustry] = useState<string>("");
  const [industryOther, setIndustryOther] = useState<string>("");
  const isOther = industry === "その他";

  // 紹介先：住所オートフィル
  const [zip, setZip] = useState<string>(""); // controlled を維持
  const [address, setAddress] = useState<string>(""); // controlled を維持
  const [zipStatus, setZipStatus] = useState<
    "idle" | "searching" | "found" | "notfound" | "error"
  >("idle");

  // 紹介先：電話
  const [phone, setPhone] = useState<string>("");

  // 任意リンク（最大3件）
  const [links, setLinks] = useState<string[]>([""]);

  // 初期ロード：localStorage復元
  useEffect(() => {
    try {
      const r = localStorage.getItem(LS_KEY_REFERRER);
      if (r)
        setReferrer((s) => ({ ...s, ...(JSON.parse(r) as ReferrerStore) }));
      const b = localStorage.getItem(LS_KEY_BANK);
      if (b) setBank((s) => ({ ...s, ...(JSON.parse(b) as BankStore) }));
    } catch {
      /* ignore */
    }
  }, []);

  // 郵便番号入力ハンドラ（全角→半角、ハイフン自動付与 123-4567）
  function handleZipChange(v: string) {
    const digitsOnly = toHalfWidthDigits(v)
      .replace(HYPHENS, "")
      .replace(/\D/g, "")
      .slice(0, 7);
    const pretty =
      digitsOnly.length > 3
        ? `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`
        : digitsOnly;
    setZip(pretty ?? ""); // 常に string
  }

  // 7桁になったらZipCloudへ問い合わせ（400msデバウンス）
  useEffect(() => {
    const digits = toHalfWidthDigits(zip ?? "")
      .replace(HYPHENS, "")
      .replace(/\D/g, "");
    if (digits.length !== 7) {
      setZipStatus("idle");
      return;
    }
    setZipStatus("searching");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`
        );
        const json: {
          status: number;
          message: string | null;
          results: null | Array<{
            zipcode: string;
            address1: string;
            address2: string;
            address3: string;
          }>;
        } = await res.json();
        if (json.status === 200 && json.results && json.results.length > 0) {
          const r = json.results[0];
          setAddress(
            [r.address1, r.address2, r.address3].filter(Boolean).join("")
          );
          setZipStatus("found");
        } else {
          setZipStatus("notfound");
        }
      } catch {
        setZipStatus("error");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [zip]);

  // 電話番号入力ハンドラ（AsYouTypeで逐次整形）
  function handlePhoneChange(v: string) {
    const formatter = new AsYouType("JP");
    setPhone(formatter.input(v) ?? "");
  }

  // 任意リンクの行操作
  const canAddLink = links.length < 3;
  const addLinkRow = () => {
    if (canAddLink) setLinks((arr) => [...arr, ""]);
  };
  const removeLinkRow = (idx: number) => {
    setLinks((arr) => arr.filter((_, i) => i !== idx));
  };
  const updateLink = (idx: number, v: string) => {
    setLinks((arr) => arr.map((s, i) => (i === idx ? v : s)));
  };

  // 送信
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDone(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // 明示セット（業種、フォーマット済み値）
    fd.set("type", "referral");
    fd.set("payout", "bank");
    fd.set("industry", industry ?? "");
    if (isOther) fd.set("industryOther", industryOther ?? "");

    // 郵便番号はハイフン付きで送る（API側で受け入れ済）
    fd.set("zip", zip ?? "");

    // 電話番号：E.164も試す（失敗時は整形済の表示値）
    const parsed = parsePhoneNumberFromString(phone ?? "", "JP");
    fd.set("phone", parsed?.number ?? phone ?? "");

    // リンクは空行を除去して詰め直す（最大3件）
    fd.delete("links");
    let count = 0;
    for (const u of links.map((s) => (s ?? "").trim())) {
      if (!u) continue;
      fd.append("links", u);
      count++;
      if (count >= 3) break;
    }

    try {
      const res = await fetch("/api/referral", { method: "POST", body: fd });
      const json = (await res.json()) as ApiResult;
      if (json.ok) {
        setDone("送信しました。担当よりご連絡します。");
        if (remember) {
          localStorage.setItem(LS_KEY_REFERRER, JSON.stringify(referrer));
          localStorage.setItem(LS_KEY_BANK, JSON.stringify(bank));
        }
        // reset（controlledは手動で初期化）
        form.reset();
        setIndustry("");
        setIndustryOther("");
        setZip("");
        setAddress("");
        setPhone("");
        setLinks([""]);
      } else {
        setDone(
          json.message || "送信に失敗しました。時間をおいて再度お試しください。"
        );
      }
    } catch {
      setDone("送信に失敗しました。ネットワークをご確認ください。");
    } finally {
      setLoading(false);
    }
  }

  const phonePlaceholder = useMemo(
    () => "例：090 1234 5678 / 03-1234-5678",
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <div className="max-w-3xl mx-auto px-6 py-14 text-gray-900">
        {/* ヘッダー */}
        <header className="text-center space-y-3 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold">紹介制度</h1>
          <p className="text-gray-800 text-lg">
            ご紹介先が有料プランをご成約（初回決済完了）で、
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-extrabold text-xl shadow-lg animate-bounce">
            報酬 <span className="text-xl">1万円</span>!!
          </div>
          <p className="text-gray-800 text-lg">紹介者にお支払いします</p>
        </header>

        {/* ルール */}
        <div className="rounded-2xl bg-white/70 backdrop-blur p-6 shadow mb-10">
          <h2 className="text-xl font-bold mb-2">
            👥 紹介制度（ご成約で1万円）
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              対象：<strong>新規のお客様</strong>
              （既存・過去問い合わせ済みは対象外）
            </li>
            <li>
              お支払い：成約確認・弊社入金確認・クーリングオフ期間経過後、原則{" "}
              <strong>7日以内</strong> にお振り込み
            </li>
            <li>複数件OK：成約件数分お支払い</li>
          </ul>
          <p className="text-sm mt-3">
            ※ 紹介先はお問い合わせ時に「紹介者名」を記載してください。
          </p>
        </div>

        {/* フォーム本体 */}
        <section className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow">
          <form className="space-y-8" onSubmit={onSubmit}>
            {/* --- セクション1：紹介者情報（あなた） --- */}
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white/90">
              <SectionHeader
                step={1}
                title="紹介者情報（あなた）"
                subtitle="報酬の振込先もこちらに入力してください。"
              />

              {/* 基本 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    紹介者名 *
                  </label>
                  <input
                    name="referrerName"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="例：山田 太郎"
                    value={referrer.referrerName ?? ""}
                    onChange={(e) =>
                      setReferrer((s) => ({
                        ...s,
                        referrerName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    紹介者メールアドレス *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="you@example.com"
                    value={referrer.email ?? ""}
                    onChange={(e) =>
                      setReferrer((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* 振込先 */}
              <div className="mt-5">
                <p className="text-base font-semibold text-gray-800">
                  振込先口座
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm mb-1">銀行名 *</label>
                    <input
                      name="bankName"
                      required
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="例：三菱UFJ銀行"
                      value={bank.bankName ?? ""}
                      onChange={(e) =>
                        setBank((s) => ({ ...s, bankName: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">支店名 *</label>
                    <input
                      name="branchName"
                      required
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="例：渋谷支店"
                      value={bank.branchName ?? ""}
                      onChange={(e) =>
                        setBank((s) => ({ ...s, branchName: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-2">
                  <div>
                    <label className="block text-sm mb-1">口座種別 *</label>
                    <select
                      name="accountType"
                      required
                      className="w-full rounded-md border px-3 py-2"
                      value={bank.accountType ?? "普通"}
                      onChange={(e) =>
                        setBank((s) => ({
                          ...s,
                          accountType: e.target
                            .value as BankStore["accountType"],
                        }))
                      }
                    >
                      <option value="普通">普通</option>
                      <option value="当座">当座</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">口座番号 *</label>
                    <input
                      name="accountNumber"
                      inputMode="numeric"
                      pattern="^[0-9]{6,12}$"
                      required
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="例：1234567"
                      value={bank.accountNumber ?? ""}
                      onChange={(e) =>
                        setBank((s) => ({
                          ...s,
                          accountNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      口座名義（カナ）*
                    </label>
                    <input
                      name="accountHolderKana"
                      required
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="例：ヤマダ タロウ"
                      value={bank.accountHolderKana ?? ""}
                      onChange={(e) =>
                        setBank((s) => ({
                          ...s,
                          accountHolderKana: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- セクション2：紹介先情報（お店） --- */}
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white/90">
              <SectionHeader
                step={2}
                title="紹介先情報（お店）"
                subtitle="お店の基本情報・連絡先・住所を入力してください。"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">お店の名前 *</label>
                  <input
                    name="shopName"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="例：甘味処 よって屋"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    氏名（オーナー） *
                  </label>
                  <input
                    name="ownerName"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="例：斎藤 一郎"
                  />
                </div>
              </div>

              {/* 業種 */}
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm mb-1">業種 *</label>
                  <select
                    name="industry"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    value={industry ?? ""}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="">選択してください</option>
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {isOther && (
                  <div>
                    <label className="block text-sm mb-1">
                      業種（自由記入）*
                    </label>
                    <input
                      name="industryOther"
                      required
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="例：ペットサロン など具体的に"
                      value={industryOther ?? ""}
                      onChange={(e) => setIndustryOther(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* 連絡先 */}
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm mb-1">
                    紹介先メールアドレス *
                  </label>
                  <input
                    name="leadEmail"
                    type="email"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="owner@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">電話番号 *</label>
                  <input
                    name="phone_display" // 表示用（送信時に 'phone' に差し替え）
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder={phonePlaceholder}
                    value={phone ?? ""}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                </div>
              </div>

              {/* 住所 */}
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm mb-1">郵便番号 *</label>
                  <input
                    name="zip_display" // 表示用（送信時に 'zip' に差し替え）
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="例：123-4567"
                    value={zip ?? ""}
                    onChange={(e) => handleZipChange(e.target.value)}
                  />
                  {zipStatus === "searching" && (
                    <p className="text-xs text-gray-600 mt-1">住所を検索中…</p>
                  )}
                  {zipStatus === "notfound" && (
                    <p className="text-xs text-red-600 mt-1">
                      該当住所が見つかりませんでした。
                    </p>
                  )}
                  {zipStatus === "error" && (
                    <p className="text-xs text-red-600 mt-1">
                      住所の自動取得に失敗しました。手入力してください。
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">住所 *</label>
                  <input
                    name="address"
                    required
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="例：東京都〇〇区1-2-3"
                    value={address ?? ""}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {zipStatus === "found" && (
                    <p className="text-xs text-green-700 mt-1">
                      郵便番号から自動入力しました。番地・建物名はご確認の上、追記してください。
                    </p>
                  )}
                </div>
              </div>

              {/* 任意リンク（最大3件） */}
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">
                  Webサイト / SNSリンク（任意・最大3件）」
                </label>

                <div className="space-y-2">
                  {links.map((u, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        name="links" // 同名で複数送信
                        type="url"
                        inputMode="url"
                        pattern="https?://.+"
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="例：https://example.com / https://instagram.com/..."
                        value={u ?? ""}
                        onChange={(e) => updateLink(idx, e.target.value)}
                      />
                      {links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLinkRow(idx)}
                          className="px-2 py-2 rounded-md border text-sm hover:bg-gray-50"
                          aria-label="この行を削除"
                          title="この行を削除"
                        >
                          −
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={addLinkRow}
                    disabled={!canAddLink}
                    className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 disabled:opacity-50"
                    title="行を追加"
                  >
                    ＋ 行を追加（残り {3 - links.length}）
                  </button>
                  <p className="text-xs text-gray-600 mt-1">
                    http/https のURLのみ有効です。未入力の行は送信されません。
                  </p>
                </div>
              </div>

              {/* ロゴ画像（任意） */}
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">
                  ロゴ画像（任意）
                </label>
                <input
                  name="logo"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-900 file:text-white hover:file:opacity-90"
                />
                <p className="text-xs text-gray-600 mt-1">
                  対応形式：PNG/JPG/SVG等・最大5MB程度推奨
                </p>
              </div>

              {/* メモ（任意） */}
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">
                  メモ（任意）
                </label>
                <textarea
                  name="memo"
                  rows={3}
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="補足があればご記入ください"
                />
              </div>
            </div>

            {/* 保存＆送信 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((v) => !v)}
                />
                この内容（紹介者・振込先）を次回も使う
              </label>

              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-gray-900 text-white px-5 py-2.5 font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "送信中…" : "紹介を申し込む"}
              </button>
            </div>

            {done && <p className="text-sm mt-1">{done}</p>}
          </form>
        </section>

        {/* FAQ */}
        <section className="mt-10 rounded-2xl bg-white/60 backdrop-blur p-6 shadow">
          <h3 className="text-lg font-bold mb-3">よくある質問 / 注意事項</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              対象は<strong>新規のお客様</strong>のみです。
            </li>
            <li>内容によりお受けできない場合があります。</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
