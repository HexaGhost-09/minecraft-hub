import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DownloadButton } from "./DownloadButton";

// Helper to fetch Neon counts
async function getNeonCounts(): Promise<Record<string, number>> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(`${baseUrl}/api/download`, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status}\n${text}`);
  }
  let data: { apk_name: string; version: string; count: number }[];
  try {
    data = await res.json();
  } catch {
    throw new Error("API did not return valid JSON (is your /api/download route working?)");
  }
  return Object.fromEntries(
    data.map((row) => [`${row.apk_name}:${row.version}`, row.count])
  );
}

type ApkAsset = {
  url: string;
  name: string;
  version: string;
  githubDownloadCount: number;
  siteDownloadCount: number;
  totalDownloadCount: number;
};

type GithubRelease = {
  tag_name: string;
  prerelease: boolean;
  assets: {
    name: string;
    browser_download_url: string;
    download_count?: number;
  }[];
};

async function getApks(): Promise<{ beta?: ApkAsset; stable?: ApkAsset }> {
  // Fetch from GitHub
  const releasesRes = await fetch(
    "https://api.github.com/repos/HexaGhost-09/minecraft-hub/releases",
    { next: { revalidate: 60 } }
  );
  if (!releasesRes.ok) {
    throw new Error("GitHub Releases API error");
  }
  const releases: GithubRelease[] = await releasesRes.json();

  // Fetch from Neon
  let neonCounts: Record<string, number> = {};
  try {
    neonCounts = await getNeonCounts();
  } catch {
    neonCounts = {};
  }

  let beta: ApkAsset | undefined;
  let stable: ApkAsset | undefined;

  for (const release of releases) {
    const apkAsset = release.assets.find(
      (asset) =>
        asset.name.endsWith(".apk")
    );
    if (!apkAsset) continue;

    const key = `${apkAsset.name}:${release.tag_name}`;
    const siteDownloadCount = neonCounts[key] ?? 0;
    const githubDownloadCount = apkAsset.download_count ?? 0;

    const apkData: ApkAsset = {
      url: apkAsset.browser_download_url,
      name: apkAsset.name,
      version: release.tag_name,
      githubDownloadCount,
      siteDownloadCount,
      totalDownloadCount: githubDownloadCount + siteDownloadCount,
    };

    if (!beta && release.prerelease) beta = apkData;
    if (!stable && !release.prerelease) stable = apkData;
    if (beta && stable) break;
  }

  return { beta, stable };
}

export default async function Home() {
  let beta: ApkAsset | undefined = undefined;
  let stable: ApkAsset | undefined = undefined;
  let error: string | null = null;

  try {
    const result = await getApks();
    beta = result.beta;
    stable = result.stable;
  } catch (e) {
    error = (e instanceof Error) ? e.message : "Unknown error";
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-[#1e293b] via-[#2563eb] to-[#22d3ee] flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full px-8 py-12 flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="mb-2">
          <Image
            src="https://i.rj1.dev/NUSvRMK"
            alt="Minecraft Hub Logo"
            width={96}
            height={96}
            className="rounded-xl drop-shadow-2xl"
            priority
          />
        </div>
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
          Minecraft Hub
        </h1>
        <p className="text-lg md:text-xl text-cyan-100 text-center mb-4">
          Download the latest Minecraft APKs below!
        </p>
        {/* Error */}
        {error && (
          <div className="text-red-200 bg-red-900/60 border border-red-400/30 rounded-lg p-4 mb-4 w-full text-center">
            <strong>Error:</strong> {error}
          </div>
        )}
        {/* Download Buttons */}
        {!error && (
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <DownloadButton
              apk_name={stable?.name ?? ""}
              version={stable?.version ?? ""}
              url={stable?.url ?? "#"}
              className={`flex-1 inline-flex flex-col items-center justify-center gap-1 bg-green-500/80 hover:bg-green-400/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-200 ${
                !stable ? "opacity-60 pointer-events-none" : ""
              }`}
              disabled={!stable}
            >
              <span className="text-2xl">✔️</span>
              Stable {stable ? `(${stable.version})` : ""}
              {stable && (
                <span className="text-xs font-normal text-cyan-100 mt-1">
                  📥 {stable.totalDownloadCount.toLocaleString()} downloads
                  <span className="block text-[11px] text-cyan-300">
                    (GitHub: {stable.githubDownloadCount.toLocaleString()}, Site: {stable.siteDownloadCount.toLocaleString()})
                  </span>
                </span>
              )}
            </DownloadButton>
            <DownloadButton
              apk_name={beta?.name ?? ""}
              version={beta?.version ?? ""}
              url={beta?.url ?? "#"}
              className={`flex-1 inline-flex flex-col items-center justify-center gap-1 bg-yellow-400/80 hover:bg-yellow-300/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-200 ${
                !beta ? "opacity-60 pointer-events-none" : ""
              }`}
              disabled={!beta}
            >
              <span className="text-2xl">🧪</span>
              Beta {beta ? `(${beta.version})` : ""}
              {beta && (
                <span className="text-xs font-normal text-cyan-100 mt-1">
                  📥 {beta.totalDownloadCount.toLocaleString()} downloads
                  <span className="block text-[11px] text-cyan-300">
                    (GitHub: {beta.githubDownloadCount.toLocaleString()}, Site: {beta.siteDownloadCount.toLocaleString()})
                  </span>
                </span>
              )}
            </DownloadButton>
          </div>
        )}
        {/* APK History Button */}
        <Link
          href="/timeline"
          className="mt-2 text-xs px-4 py-2 bg-cyan-800/80 hover:bg-cyan-700/90 text-cyan-100 rounded-full transition-all border border-cyan-300/30 shadow-sm"
        >
          📜 APK History
        </Link>
        {/* Release Notes */}
        <div className="w-full bg-white/10 rounded-xl p-4 mt-4 border border-white/10">
          <h2 className="font-bold text-cyan-100 mb-2 text-lg">Latest updates</h2>
          <ul className="list-disc list-inside text-cyan-50 text-base space-y-1">
            <li>
              Beta: {beta ? beta.name : "No beta release found"}
            </li>
            <li>
              Stable: {stable ? stable.name : "No stable release found"}
            </li>
          </ul>
        </div>
        {/* Footer */}
        <footer className="pt-8 flex flex-col items-center gap-2 text-cyan-200 text-sm w-full border-t border-white/10 mt-4">
          <div className="flex gap-3">
            <a
              href="https://minecraft.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Official Site
            </a>
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
      </div>
    </main>
  );
}