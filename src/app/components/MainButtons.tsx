"use client";

import React, { useState } from "react";
// We can redefine the types here since we can't easily import from page.tsx in Next.js client components sometimes
type Asset = {
  url: string;
  name: string;
  version: string;
};

type Platform = {
  stable?: Asset;
  beta?: Asset;
};

type MainButtonsProps = {
  android: Platform;
  ios: Platform;
};

async function handleDownload(asset?: Asset) {
  if (!asset) return;
  window.location.href = asset.url;
}

export default function MainButtons({ android, ios }: MainButtonsProps) {
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [stableLoading, setStableLoading] = useState(false);
  const [betaLoading, setBetaLoading] = useState(false);

  // Switch data based on toggle
  const currentData = platform === "android" ? android : ios;
  const stable = currentData.stable;
  const beta = currentData.beta;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Platform Toggle */}
      <div className="flex bg-black/20 p-1.5 rounded-xl self-center gap-1">
        <button
          onClick={() => setPlatform("android")}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
            platform === "android"
              ? "bg-white text-blue-900 shadow-md scale-100"
              : "text-white/60 hover:text-white hover:bg-white/5 scale-95"
          }`}
        >
          Android
        </button>
        <button
          onClick={() => setPlatform("ios")}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
            platform === "ios"
              ? "bg-white text-blue-900 shadow-md scale-100"
              : "text-white/60 hover:text-white hover:bg-white/5 scale-95"
          }`}
        >
          iOS
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Stable Button */}
        <button
          onClick={() => {
            setStableLoading(true);
            handleDownload(stable).finally(() => setStableLoading(false));
          }}
          className={`group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-3 ${
            !stable ? "opacity-60 grayscale" : ""
          } before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/20 before:to-emerald-400/20 before:opacity-0 before:group-hover:opacity-100 before:transition-opacity`}
          disabled={!stable || stableLoading}
        >
          <span className="relative z-10 flex items-center gap-4 w-full">
            <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center transition-colors ${stableLoading ? "bg-gray-500/50" : "bg-green-500/80"}`}>
              <span className="text-lg">{stableLoading ? "⟳" : "✓"}</span>
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-medium opacity-80 uppercase tracking-wider">
                Stable ({platform === 'android' ? 'APK' : 'IPA'})
              </span>
              <span className="text-base font-bold truncate w-full">
                {stable ? stable.version : "Unavailable"}
              </span>
            </div>
          </span>
          {stableLoading && (
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>

        {/* Beta Button */}
        <button
          onClick={() => {
            setBetaLoading(true);
            handleDownload(beta).finally(() => setBetaLoading(false));
          }}
          className={`group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-3 ${
            !beta ? "opacity-60 grayscale" : ""
          } before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/20 before:to-amber-400/20 before:opacity-0 before:group-hover:opacity-100 before:transition-opacity`}
          disabled={!beta || betaLoading}
        >
          <span className="relative z-10 flex items-center gap-4 w-full">
            <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center transition-colors ${betaLoading ? "bg-gray-500/50" : "bg-yellow-500/80"}`}>
              <span className="text-lg">{betaLoading ? "⟳" : "🧪"}</span>
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-medium opacity-80 uppercase tracking-wider">
                Beta ({platform === 'android' ? 'APK' : 'IPA'})
              </span>
              <span className="text-base font-bold truncate w-full">
                {beta ? beta.version : "Unavailable"}
              </span>
            </div>
          </span>
          {betaLoading && (
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}