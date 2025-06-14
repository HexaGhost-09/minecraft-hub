import React from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
  date: string;
  prerelease: boolean;
};

async function getAllApks(): Promise<ApkAsset[]> {
  const res = await fetch(
    "https://api.github.com/repos/HexaGhost-09/minecraft-hub/releases",
    { next: { revalidate: 60 } }
  );
  const releases = await res.json();

  const apks: ApkAsset[] = [];
  for (const release of releases) {
    for (const asset of release.assets) {
      if (asset.name.endsWith(".apk")) {
        apks.push({
          url: asset.browser_download_url,
          name: asset.name,
          version: release.tag_name || release.name,
          date: release.published_at,
          prerelease: !!release.prerelease,
        });
      }
    }
  }
  // Sort by date descending (latest first)
  apks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return apks;
}

export default async function TimelinePage() {
  const apks = await getAllApks();
  // Find latest stable (non-prerelease) and latest beta (prerelease)
  const latestStable = apks.find((a) => !a.prerelease);
  const latestBeta = apks.find((a) => a.prerelease);

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 bg-gradient-to-br from-slate-900 via-blue-800 to-cyan-400">
      {/* Back to Home Button */}
      <div className="w-full max-w-2xl mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-800/80 hover:bg-cyan-700/90 text-cyan-100 border border-cyan-300/30 shadow-sm text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-white mb-6">Minecraft APK History</h1>
      <ul className="w-full max-w-2xl space-y-4">
        {apks.map((apk) => {
          const isLatestStable = latestStable && apk.url === latestStable.url;
          const isLatestBeta = latestBeta && apk.url === latestBeta.url;
          return (
            <li
              key={apk.url}
              className={`bg-white/10 border transition-all ${
                isLatestStable
                  ? "border-green-400/90 ring-4 ring-green-300/20 shadow-lg scale-[1.02]"
                  : isLatestBeta
                  ? "border-yellow-400/90 ring-4 ring-yellow-300/20 shadow-lg scale-[1.02]"
                  : "border-white/10 shadow"
              } rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-white">{apk.name}</span>
                  {isLatestStable && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-400 text-slate-900 text-xs font-bold animate-pulse">
                      Latest Stable
                    </span>
                  )}
                  {isLatestBeta && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-400 text-slate-900 text-xs font-bold animate-pulse">
                      Latest Beta
                    </span>
                  )}
                  {!isLatestStable && !isLatestBeta && apk.prerelease && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-200 text-slate-900 text-xs font-semibold">
                      Beta
                    </span>
                  )}
                </div>
                <div className="text-cyan-200 text-sm">
                  Version: {apk.version} | Released: {new Date(apk.date).toLocaleDateString()}
                </div>
              </div>
              <a
                href={apk.url}
                className={`mt-2 md:mt-0 inline-block ${
                  isLatestStable
                    ? "bg-green-400 hover:bg-green-300 text-slate-900"
                    : isLatestBeta
                    ? "bg-yellow-400 hover:bg-yellow-300 text-slate-900"
                    : apk.prerelease
                    ? "bg-yellow-200 hover:bg-yellow-100 text-slate-900"
                    : "bg-green-500/80 hover:bg-green-400/90 text-white"
                } px-6 py-2 rounded-lg font-bold transition-all`}
                download
              >
                ⬇️ Download
              </a>
            </li>
          );
        })}
      </ul>
      <Footer />
    </main>
  );
}