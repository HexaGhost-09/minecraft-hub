import Link from "next/link";
import { Github, AlertTriangle } from "lucide-react"; // Add lucide-react if not installed: npm i lucide-react

export default function Footer() {
  return (
    <footer className="pt-6 w-full border-t border-white/10 flex flex-col items-center gap-2 text-xs text-cyan-300">
      <div className="flex gap-4">
        <Link href="https://github.com/HexaGhost-09/minecraft-hub" target="_blank" aria-label="GitHub Repo">
          <Github className="w-4 h-4 hover:text-white transition-colors" />
        </Link>
        <Link href="https://u8.gg/do4ee" target="_blank" aria-label="Status Page">
          <AlertTriangle className="w-4 h-4 hover:text-white transition-colors" />
        </Link>
      </div>
      <span className="text-cyan-400 font-medium">
        Built with ❤️ by HexaGhost-09
      </span>
    </footer>
  );
}