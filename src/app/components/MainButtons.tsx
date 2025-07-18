"use client";

import React from "react";

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
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
      <button
        onClick={() => handleDownload(stable)}
        className={`flex-1 inline-flex items-center justify-center gap-2 bg-green-500/80 hover:bg-green-400/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-150 ${
          !stable ? "opacity-60 pointer-events-none" : ""
        }`}
        disabled={!stable}
      >
        <span className="text-2xl">✔️</span>
        Stable {stable ? `(${stable.version})` : ""}
      </button>
      <button
        onClick={() => handleDownload(beta)}
        className={`flex-1 inline-flex items-center justify-center gap-2 bg-yellow-400/80 hover:bg-yellow-300/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-150 ${
          !beta ? "opacity-60 pointer-events-none" : ""
        }`}
        disabled={!beta}
      >
        <span className="text-2xl">🧪</span>
        Beta {beta ? `(${beta.version})` : ""}
      </button>
    </div>
  );
}