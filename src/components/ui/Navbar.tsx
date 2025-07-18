"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Pageit
        </Link>
        <div className="space-x-4">
          <Link href="/guide" className="text-blue-700 hover:underline">
            ご案内
          </Link>
          <Link href="/contact" className="text-blue-700 hover:underline">
            お問い合わせ
          </Link>
        </div>
      </div>
    </nav>
  );
}
