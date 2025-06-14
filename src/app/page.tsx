import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
};

async function getApks(): Promise<{ beta?: ApkAsset; stable?: ApkAsset }> {
  const res = await fetch(
    "https://api.github.com/repos/HexaGhost-09/minecraft-hub/releases",
    { next: { revalidate: 60 } }
  );
  const releases = await res.json();

  let beta: ApkAsset | undefined;
  let stable: ApkAsset | undefined;

  for (const release of releases) {
    const apkAsset = release.assets.find(
      (asset: { name: string; browser_download_url: string }) =>
        asset.name.endsWith(".apk")
    );
    if (!apkAsset) continue;

    const apkData: ApkAsset = {
      url: apkAsset.browser_download_url,
      name: apkAsset.name,
      version: release.tag_name,
    };

    if (!beta && release.prerelease) {
      beta = apkData;
    }
    if (!stable && !release.prerelease) {
      stable = apkData;
    }
    if (beta && stable) break;
  }

  return { beta, stable };
}

export default async function Home() {
  const { beta, stable } = await getApks();

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
        {/* Download Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <a
            href={stable?.url ?? "#"}
            className={`flex-1 inline-flex items-center justify-center gap-2 bg-green-500/80 hover:bg-green-400/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-200 ${
              !stable ? "opacity-60 pointer-events-none" : ""
            }`}
            download
          >
            <span className="text-2xl">✔️</span>
            Stable {stable ? `(${stable.version})` : ""}
          </a>
          <a
            href={beta?.url ?? "#"}
            className={`flex-1 inline-flex items-center justify-center gap-2 bg-yellow-400/80 hover:bg-yellow-300/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-200 ${
              !beta ? "opacity-60 pointer-events-none" : ""
            }`}
            download
          >
            <span className="text-2xl">🧪</span>
            Beta {beta ? `(${beta.version})` : ""}
          </a>
        </div>
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
        <Footer />
      </div>
    </main>
  );
}