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

const AROLINKS_API = "https://arolinks.com/api";
const API_KEY = "ba696766d6d78cd52749d198690505d4658835b0";

async function handleDownload(apk?: ApkAsset) {
  if (!apk) return;

  const apiUrl = `${AROLINKS_API}?api=${API_KEY}&url=${encodeURIComponent(apk.url)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("AroLinks Response:", data);

    if (data.status === "success" && data.shortenedUrl) {
      window.location.href = data.shortenedUrl;
    } else {
      console.warn("AroLinks failed. Using original URL.");
      window.location.href = apk.url;
    }
  } catch (error) {
    console.error("Shortening failed:", error);
    window.location.href = apk.url;
  }
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
        className={`group relative overflow-hidden bg-gradient-to-r from-green-500/90 to-emerald-500/90 hover:from-green-400/90 hover:to-emerald-400/90 text-white text-lg font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none border border-green-300/30 ${
          !stable ? "opacity-60" : ""
        }`}
        disabled={!stable || stableLoading}
        aria-label={stable ? `Download Stable Minecraft APK v${stable.version}` : "No stable release"}
      >
        <span className="flex items-center gap-2 relative z-10">
          <span className="text-xl">{stableLoading ? "⟳" : "✔️"}</span>
          Stable {stable ? `v${stable.version}` : "Unavailable"}
        </span>
        {stableLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 to-emerald-500/90 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </button>
      <button
        onClick={() => {
          setBetaLoading(true);
          handleDownload(beta).finally(() => setBetaLoading(false));
        }}
        className={`group relative overflow-hidden bg-gradient-to-r from-yellow-400/90 to-amber-400/90 hover:from-yellow-300/90 hover:to-amber-300/90 text-slate-900 text-lg font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none border border-yellow-300/30 ${
          !beta ? "opacity-60" : ""
        }`}
        disabled={!beta || betaLoading}
        aria-label={beta ? `Download Beta Minecraft APK v${beta.version}` : "No beta release"}
      >
        <span className="flex items-center gap-2 relative z-10">
          <span className="text-xl">{betaLoading ? "⟳" : "🧪"}</span>
          Beta {beta ? `v${beta.version}` : "Unavailable"}
        </span>
        {betaLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 to-amber-400/90 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
          </div>
        )}
      </button>
    </>
  );
}