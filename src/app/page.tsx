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
    <main className="min-h-screen w-full bg-gradient-to-tr from-[#1e293b] via-[#2563eb] to-[#22d3ee] flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full px-8 py-12 flex flex-col items-center gap-6">
        <HomeHeader />
        <MainButtons stable={stable} beta={beta} />
        <ApkHistoryButton />
        <QuickNotes beta={beta} stable={stable} />
        <Footer />
      </div>
    </main>
  );
}