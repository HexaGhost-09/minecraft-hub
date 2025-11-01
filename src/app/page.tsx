import Footer from "@/app/components/Footer";
import ApkHistoryButton from "@/app/components/ApkHistoryButton";
import HomeHeader from "@/app/components/HomeHeader";
import MainButtons from "@/app/components/MainButtons";
import QuickNotes from "@/app/components/QuickNotes";

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
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl max-w-md w-full px-6 py-8 flex flex-col items-center gap-6 relative z-10 animate-fade-in">
        <HomeHeader />
        <div className="w-full grid grid-cols-1 gap-3"> {/* Pill-grid for buttons */}
          <MainButtons stable={stable} beta={beta} />
          <ApkHistoryButton />
        </div>
        <QuickNotes beta={beta} stable={stable} />
        <Footer />
      </div>
    </main>
  );
}