import { google } from "googleapis";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const OAuth2 = google.auth.OAuth2;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "メールとメッセージが必要です" }, { status: 400 });
    }

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token!,
      },
    });

    await transporter.sendMail({
      from: `"Pageit お問い合わせ" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL,
      subject: `お問い合わせ from ${email}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("メール送信失敗:", err);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
