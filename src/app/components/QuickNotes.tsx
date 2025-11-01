import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-6 w-full border-t border-white/10 flex flex-col items-center gap-2 text-xs text-cyan-300">
      <div className="flex gap-4">
        <Link 
          href="https://github.com/HexaGhost-09/minecraft-hub" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          className="hover:text-white transition-colors p-1"
        >
          🗂️
        </Link>
        <Link 
          href="https://u8.gg/do4ee" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Project Status Page"
          className="hover:text-white transition-colors p-1"
        >
          ⚠️
        </Link>
      </div>
      <span className="text-cyan-400 font-medium text-center">
        Built with ❤️ by HexaGhost-09
      </span>
    </footer>
  );
}