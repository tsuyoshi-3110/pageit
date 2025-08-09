// src/app/api/referral/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import type { Attachment } from "nodemailer/lib/mailer";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_REDIRECT_URI = "https://developers.google.com/oauthplayground",
  SENDER_EMAIL,
} = process.env;

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function getTransporter() {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN ?? "" });
  const { token } = await oAuth2Client.getAccessToken();
  if (!token) throw new Error("Failed to get access token");

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL,
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      refreshToken: GOOGLE_REFRESH_TOKEN!,
      accessToken: token,
    },
  });
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") ?? "";
    if (!ct.includes("multipart/form-data")) {
      return NextResponse.json(
        { ok: false, message: "multipart/form-data で送信してください。" },
        { status: 400 }
      );
    }

    const fd = await req.formData();

    // 必須（紹介者・紹介先・振込先）
    const referrerName = String(fd.get("referrerName") ?? "");
    const email = String(fd.get("email") ?? "");
    const shopName = String(fd.get("shopName") ?? "");
    const ownerName = String(fd.get("ownerName") ?? "");
    const leadEmail = String(fd.get("leadEmail") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const zip = String(fd.get("zip") ?? "");
    const address = String(fd.get("address") ?? "");
    const bankName = String(fd.get("bankName") ?? "");
    const branchName = String(fd.get("branchName") ?? "");
    const accountType = String(fd.get("accountType") ?? "");
    const accountNumber = String(fd.get("accountNumber") ?? "");
    const accountHolderKana = String(fd.get("accountHolderKana") ?? "");

    // ★ 追加：業種（その他のとき自由記入を要求）
    const industry = String(fd.get("industry") ?? "");
    const industryOther = String(fd.get("industryOther") ?? "");
    const industryDisplay =
      industry === "その他" && industryOther
        ? `${industry}（${industryOther}）`
        : industry || industryOther; // 念のためフォールバック

    // 任意
    const memo = String(fd.get("memo") ?? "");
    const logo = fd.get("logo") as File | null;

    // バリデーション
    const missing: string[] = [];
    const requiredPairs: Array<[string, string]> = [
      ["referrerName", referrerName],
      ["email", email],
      ["shopName", shopName],
      ["ownerName", ownerName],
      ["industry", industry], // 業種自体は必須
      ["leadEmail", leadEmail],
      ["phone", phone],
      ["zip", zip],
      ["address", address],
      ["bankName", bankName],
      ["branchName", branchName],
      ["accountType", accountType],
      ["accountNumber", accountNumber],
      ["accountHolderKana", accountHolderKana],
    ];
    for (const [k, v] of requiredPairs) if (!v) missing.push(k);
    if (industry === "その他" && !industryOther) missing.push("industryOther");

    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, message: `必須項目が不足しています: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // メール本文（テーブル行）
    const pairsForMail: Array<[string, string]> = [
      ["紹介者名", referrerName],
      ["紹介者メール", email],
      ["お店の名前", shopName],
      ["氏名（オーナー）", ownerName],
      ["業種", industryDisplay],
      ["紹介先メール", leadEmail],
      ["電話番号", phone],
      ["郵便番号", zip],
      ["住所", address],
      ["銀行名", bankName],
      ["支店名", branchName],
      ["口座種別", accountType],
      ["口座番号", accountNumber],
      ["口座名義（カナ）", accountHolderKana],
    ];

    const rowsHtml = pairsForMail
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 10px;border:1px solid #ddd;"><b>${escapeHtml(
            k
          )}</b></td><td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(
            v
          )}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
        <h2>【紹介申込み】</h2>
        <table style="border-collapse:collapse;border:1px solid #ddd;">${rowsHtml}</table>
        ${
          memo
            ? `<p style="margin-top:12px;"><b>メモ:</b></p><pre style="white-space:pre-wrap;background:#f7f7f7;padding:10px;border-radius:6px;border:1px solid #eee;">${escapeHtml(
                memo
              )}</pre>`
            : ""
        }
        <p style="margin-top:12px;">このメールに返信すると <b>${escapeHtml(
          email
        )}</b> へ返答できます（Reply-To）。</p>
      </div>
    `;

    // 添付（ロゴ）
    const attachments: Attachment[] = [];
    if (logo && logo.size > 0) {
      const buf = Buffer.from(await logo.arrayBuffer());
      attachments.push({
        filename: logo.name || "logo",
        content: buf,
        contentType: logo.type || "application/octet-stream",
      });
    }

    const transporter = await getTransporter();
    await transporter.sendMail({
      from: `Pageit Referral <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      replyTo: email,
      subject: `【紹介申込み】${referrerName || "（無記名）"} さんより`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[referral] send error:", err);
    return NextResponse.json(
      { ok: false, message: "メール送信に失敗しました。" },
      { status: 500 }
    );
  }
}
