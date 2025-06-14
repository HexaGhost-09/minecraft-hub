import React from "react";
import Link from "next/link";

export default function WebViewButton() {
  return (
    <Link
      href="/pages/liveweb"
      className="w-full mt-2 px-4 py-3 rounded-xl bg-cyan-800/80 hover:bg-cyan-700/90 text-cyan-100 border border-cyan-300/30 shadow-md text-lg font-semibold text-center transition-all"
    >
      🌐 View Our Webpages
    </Link>
  );
}