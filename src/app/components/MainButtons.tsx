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

export default function MainButtons({ stable, beta }: MainButtonsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
      <a
        href={stable?.url ?? "#"}
        className={`flex-1 inline-flex items-center justify-center gap-2 bg-green-500/80 hover:bg-green-400/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-150 ${
          !stable ? "opacity-60 pointer-events-none" : ""
        }`}
        download
      >
        <span className="text-2xl">✔️</span>
        Stable {stable ? `(${stable.version})` : ""}
      </a>
      <a
        href={beta?.url ?? "#"}
        className={`flex-1 inline-flex items-center justify-center gap-2 bg-yellow-400/80 hover:bg-yellow-300/90 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all duration-150 ${
          !beta ? "opacity-60 pointer-events-none" : ""
        }`}
        download
      >
        <span className="text-2xl">🧪</span>
        Beta {beta ? `(${beta.version})` : ""}
      </a>
    </div>
  );
}