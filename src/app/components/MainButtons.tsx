"use client";

import React, { useState } from "react";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
};

type MainButtonsProps = {
  stable?: ApkAsset;
  beta?: ApkAsset;
};

async function handleDownload(apk?: ApkAsset) {
  if (!apk) return;

  window.location.href = apk.url;
}

export default function MainButtons({ stable, beta }: MainButtonsProps) {
  const [stableLoading, setStableLoading] = useState(false);
  const [betaLoading, setBetaLoading] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setStableLoading(true);
          handleDownload(stable).finally(() => setStableLoading(false));
        }}
        className={`group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-3 ${
          !stable ? "opacity-60" : ""
        } before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/20 before:to-emerald-400/20 before:opacity-0 before:group-hover:opacity-100 before:transition-opacity`}
        disabled={!stable || stableLoading}
        aria-label={stable ? `Download Stable Minecraft APK ${stable.version}` : "No stable release"}
      >
        <span className="relative z-10 flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${stableLoading ? "bg-gray-500/50" : "bg-green-500/80"}`}>
            <span className="text-sm">{stableLoading ? "⟳" : "✓"}</span>
          </div>
          <span className="flex flex-col items-start">
            <span className="text-sm font-medium opacity-90">Stable</span>
            <span className="text-base font-bold">{stable ? stable.version : "Unavailable"}</span>
          </span>
        </span>
        {stableLoading && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </button>
      <button
        onClick={() => {
          setBetaLoading(true);
          handleDownload(beta).finally(() => setBetaLoading(false));
        }}
        className={`group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-3 ${
          !beta ? "opacity-60" : ""
        } before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/20 before:to-amber-400/20 before:opacity-0 before:group-hover:opacity-100 before:transition-opacity`}
        disabled={!beta || betaLoading}
        aria-label={beta ? `Download Beta Minecraft APK ${beta.version}` : "No beta release"}
      >
        <span className="relative z-10 flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${betaLoading ? "bg-gray-500/50" : "bg-yellow-500/80"}`}>
            <span className="text-sm">{betaLoading ? "⟳" : "🧪"}</span>
          </div>
          <span className="flex flex-col items-start">
            <span className="text-sm font-medium opacity-90">Beta</span>
            <span className="text-base font-bold">{beta ? beta.version : "Unavailable"}</span>
          </span>
        </span>
        {betaLoading && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </button>
    </>
  );
}