import Footer from "@/app/components/Footer";
import ApkHistoryButton from "@/app/components/ApkHistoryButton";
import HomeHeader from "@/app/components/HomeHeader";
import MainButtons from "@/app/components/MainButtons";
import QuickNotes from "@/app/components/QuickNotes";

export type AssetData = {
  url: string;
  name: string;
  version: string;
};

export type PlatformData = {
  stable?: AssetData;
  beta?: AssetData;
};

async function getDownloads(): Promise<{ android: PlatformData; ios: PlatformData }> {
  // Fetch last 100 releases to ensure we find older iOS versions if they are desynced
  const res = await fetch(
    "https://api.github.com/repos/HexaGhost-09/minecraft-hub/releases?per_page=100",
    { next: { revalidate: 60 } }
  );
  
  if (!res.ok) {
    // Fallback if API fails
    return { android: {}, ios: {} };
  }

  const releases = await res.json();

  const android: PlatformData = {};
  const ios: PlatformData = {};

  for (const release of releases) {
    // 1. Try to find Android Assets in this release
    if (!android.beta || !android.stable) {
      const apkAsset = release.assets.find(
        (asset: { name: string; browser_download_url: string }) =>
          asset.name.endsWith(".apk")
      );

      if (apkAsset) {
        const data: AssetData = {
          url: apkAsset.browser_download_url,
          name: apkAsset.name,
          version: release.tag_name,
        };
        // Fill Beta slot if empty and this is a prerelease
        if (release.prerelease && !android.beta) android.beta = data;
        // Fill Stable slot if empty and this is NOT a prerelease
        if (!release.prerelease && !android.stable) android.stable = data;
      }
    }

    // 2. Try to find iOS Assets in this release (Independently!)
    if (!ios.beta || !ios.stable) {
      const ipaAsset = release.assets.find(
        (asset: { name: string; browser_download_url: string }) =>
          asset.name.endsWith(".ipa")
      );

      if (ipaAsset) {
        const data: AssetData = {
          url: ipaAsset.browser_download_url,
          name: ipaAsset.name,
          version: release.tag_name,
        };
        // Fill Beta slot if empty
        if (release.prerelease && !ios.beta) ios.beta = data;
        // Fill Stable slot if empty
        if (!release.prerelease && !ios.stable) ios.stable = data;
      }
    }

    // Stop early only if ALL 4 slots are filled
    if (android.beta && android.stable && ios.beta && ios.stable) break;
  }

  return { android, ios };
}

export default async function Home() {
  const { android, ios } = await getDownloads();

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl max-w-md w-full px-6 py-8 flex flex-col items-center gap-6 relative z-10 animate-fade-in">
        <HomeHeader />
        
        <div className="w-full flex flex-col gap-3">
          {/* Pass both platforms to the buttons component */}
          <MainButtons android={android} ios={ios} />
          <ApkHistoryButton />
        </div>

        <QuickNotes android={android} ios={ios} />
        <Footer />
      </div>
    </main>
  );
}