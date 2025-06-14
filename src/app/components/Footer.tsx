import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-8 flex flex-col items-center gap-2 text-cyan-200 text-sm w-full border-t border-white/10 mt-4">
      <div className="flex gap-3">
        <a
          href="https://github.com/HexaGhost-09/minecraft-hub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <Link href="/status" className="hover:underline">
          Status
        </Link>
      </div>
      <span>
        Made with <span className="text-pink-400">❤</span> by HexaGhost-09
      </span>
    </footer>
  );
}