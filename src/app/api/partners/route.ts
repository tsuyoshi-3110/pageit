// src/app/api/partners/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_REDIRECT_URI = "https://developers.google.com/oauthplayground",
  SENDER_EMAIL,
} = process.env;

async function getAccessToken() {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN! });
  const { token } = await oAuth2Client.getAccessToken();
  if (!token) throw new Error("Failed to get access token");
  return token;
}

function escapeHtml(s: string) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(req: Request) {
  try {
    // まず formData を試す（紹介フォーム）
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();
      const type = String(fd.get("type") || "");
      if (type !== "referral") {
        return NextResponse.json({ ok: false, message: "invalid type" }, { status: 400 });
      }

      const referrerName = String(fd.get("referrerName") || "");
      const email = String(fd.get("email") || "");
      const shopName = String(fd.get("shopName") || "");
      const ownerName = String(fd.get("ownerName") || "");
      const leadEmail = String(fd.get("leadEmail") || "");
      const phone = String(fd.get("phone") || "");
      const zip = String(fd.get("zip") || "");
      const address = String(fd.get("address") || "");
      const memo = String(fd.get("memo") || "");
      const logo = fd.get("logo") as File | null;

      const accessToken = await getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: SENDER_EMAIL,
          clientId: GOOGLE_CLIENT_ID!,
          clientSecret: GOOGLE_CLIENT_SECRET!,
          refreshToken: GOOGLE_REFRESH_TOKEN!,
          accessToken,
        },
      });

      const attachments = [];
      if (logo && logo.size > 0) {
        const buf = Buffer.from(await logo.arrayBuffer());
        attachments.push({
          filename: logo.name || "logo",
          content: buf,
          contentType: logo.type || "application/octet-stream",
        });
      }

      await transporter.sendMail({
        from: `Pageit Partners <${SENDER_EMAIL}>`,
        to: SENDER_EMAIL,
        replyTo: email,
        subject: `【紹介申込み】${referrerName || "（無記名）"} さんより`,
        html: `
          <h2>紹介制度 申込み</h2>
          <ul>
            <li><b>紹介者名：</b>${escapeHtml(referrerName)}</li>
            <li><b>紹介者メール：</b>${escapeHtml(email)}</li>
            <li><b>お店の名前：</b>${escapeHtml(shopName)}</li>
            <li><b>氏名：</b>${escapeHtml(ownerName)}</li>
            <li><b>紹介先メール：</b>${escapeHtml(leadEmail)}</li>
            <li><b>電話番号：</b>${escapeHtml(phone)}</li>
            <li><b>郵便番号：</b>${escapeHtml(zip)}</li>
            <li><b>住所：</b>${escapeHtml(address)}</li>
          </ul>
          <p><b>メモ：</b></p>
          <pre>${escapeHtml(memo)}</pre>
          <p>このメールに返信すると <b>${escapeHtml(email)}</b> へ返答できます（Reply-To）。</p>
        `,
        attachments,
      });

      return NextResponse.json({ ok: true });
    }

    // JSON の場合（撮影/編集パートナー）
    const body = await req.json();
    if (body.type !== "creator") {
      return NextResponse.json({ ok: false, message: "invalid type" }, { status: 400 });
    }

    const accessToken = await getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        refreshToken: GOOGLE_REFRESH_TOKEN!,
        accessToken,
      },
    });

    const { name = "", email = "", area = "", portfolio = "", skills = "" } = body;
    await transporter.sendMail({
      from: `Pageit Partners <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      replyTo: email,
      subject: `【パートナー応募】${name || "（無記名）"} さんより`,
      html: `
        <h2>撮影・編集パートナー 応募</h2>
        <ul>
          <li><b>お名前：</b>${escapeHtml(name)}</li>
          <li><b>メール：</b>${escapeHtml(email)}</li>
          <li><b>活動エリア：</b>${escapeHtml(area)}</li>
          <li><b>ポートフォリオ：</b>${escapeHtml(portfolio)}</li>
          <li><b>スキル/機材：</b><pre>${escapeHtml(skills)}</pre></li>
        </ul>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[partners] send error:", err);
    return NextResponse.json({ ok: false, message: "メール送信に失敗しました。" }, { status: 500 });
  }
}
