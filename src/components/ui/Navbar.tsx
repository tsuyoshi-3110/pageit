"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Pageit
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
            href="/monitors"
            onClick={() => setMenuOpen(false)}
            className="w-52 text-center text-lg font-semibold text-white bg-purple-500 px-6 py-2 rounded-full shadow hover:bg-purple-600 transition"
          >
            モニター募集
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
        </div>
      )}
    </nav>
  );
}
