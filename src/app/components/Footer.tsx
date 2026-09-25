import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-6 w-full border-t border-white/10 flex flex-col items-center gap-2 text-xs text-cyan-300">
      <div className="flex gap-4">
        <Link
          href="https://github.com/HexaGhost-09/minecraft-hub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repo"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-4 h-4 fill-current hover:text-white transition-colors"
          >
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
          </svg>
        </Link>
        <Link
          href="https://u8.gg/do4ee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Status Page"
        >
          <AlertTriangle className="w-4 h-4 hover:text-white transition-colors" />
        </Link>
      </div>
      <span className="text-cyan-400 font-medium">
        Built with ❤️ by HexaGhost-09
      </span>
    </footer>
  );
}
