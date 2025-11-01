"use client";

import React, { useState } from "react";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
};

interface QuickNotesProps {
  beta?: ApkAsset;
  stable?: ApkAsset;
}

const QuickNotes: React.FC<QuickNotesProps> = ({ beta, stable }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 text-left"
      >
        <h2 className="font-bold text-cyan-100 text-lg flex items-center gap-2">
          {expanded ? "−" : "+"} Quick Release Info
        </h2>
      </button>
      {expanded && (
        <div className="space-y-2 pl-4 animate-slide-down">
          <div className="flex items-center gap-2 text-cyan-50 text-sm">
            <span className="text-green-400">✔️</span>
            Stable: {stable ? stable.name : "No release yet"}
          </div>
          <div className="flex items-center gap-2 text-yellow-300 text-sm">
            <span className="text-yellow-400">🧪</span>
            Beta: {beta ? beta.name : "No release yet"}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickNotes;