"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState(""); // ← name を追加
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("送信中...");

    const res = await fetch("/api/send-contact", {
      method: "POST",
      body: JSON.stringify({ name, email, message }), // ← name も送信
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setStatus("送信しました！");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("送信に失敗しました");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          required
          placeholder="返信先メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          required
          placeholder="お問い合わせ内容"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded h-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          送信
        </button>
        <p className="text-sm">{status}</p>
      </form>
    </main>
  );
}
