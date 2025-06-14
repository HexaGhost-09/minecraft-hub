import Link from "next/link";

export default function ApkHistoryButton() {
  return (
    <Link
      href="/timeline"
      className="mt-2 text-xs px-4 py-2 bg-cyan-800/80 hover:bg-cyan-700/90 text-cyan-100 rounded-full transition-all border border-cyan-300/30 shadow-sm"
    >
      📜 APK History
    </Link>
  );
}