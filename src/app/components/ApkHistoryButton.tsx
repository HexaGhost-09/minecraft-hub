import Link from "next/link";

export default function ApkHistoryButton() {
  return (
    <Link
      href="/timeline"
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-cyan-100 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm shadow-md transform hover:scale-105 text-sm font-medium"
    >
      📜 View APK History
    </Link>
  );
}