import React from "react";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
};

type QuickNotesProps = {
  beta?: ApkAsset;
  stable?: ApkAsset;
};

export default function QuickNotes({ beta, stable }: QuickNotesProps) {
  return (
    <div className="w-full bg-white/10 rounded-xl p-4 mt-4 border border-white/10">
      <h2 className="font-bold text-cyan-100 mb-2 text-lg">Release Notes</h2>
      <ul className="list-disc list-inside text-cyan-50 text-base space-y-1">
        <li>
          Beta: {beta ? beta.name : "No beta release found"}
        </li>
        <li>
          Stable: {stable ? stable.name : "No stable release found"}
        </li>
      </ul>
    </div>
  );
}