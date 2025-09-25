"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 左端：ロゴ + ブランド名（常時表示） */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 text-white">
          <Image
            src="/images/iconImage.png"
            alt="Pageit ロゴ"
            width={36}
            height={36}
            priority
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />
          {/* ← ここから修正：hidden sm:inline を削除し常時表示に */}
          <span className="whitespace-nowrap leading-none text-lg sm:text-xl font-bold">
            Pageit
          </span>
        </Link>

        {/* ハンバーガー（全デバイス） */}
        <button
          className="text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ドロワー（全デバイス共通） */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-3/4 sm:w-1/3 h-full z-40 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 shadow-lg animate-slide-in-right rounded-l-xl flex flex-col items-center justify-center space-y-6">
          {/* ✖ 閉じるボタン */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-2xl"
            aria-label="Close menu"
          >
            ×
          </button>

          {/* ナビリンク */}
          <Link
            href="/guide"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            ご案内
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            お問い合わせ
          </Link>

          <Link
            href="/referral"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            ご紹介プログラム
          </Link>

          <Link
            href="/partners"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            パートナー募集
          </Link>

          <Link
            href="/legal"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            特定商取引法に基づく表記
          </Link>

          <Link
            href="/privacy"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            プライバシーポリシー
          </Link>

          <Link
            href="/terms"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            利用規約
          </Link>
        </div>
      )}
    </nav>
  );
}
