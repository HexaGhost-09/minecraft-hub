"use client";

import React, { useState } from "react";

type Asset = { name: string; version: string };
type Platform = { stable?: Asset; beta?: Asset };

interface QuickNotesProps {
  android: Platform;
  ios: Platform;
}

const QuickNotes: React.FC<QuickNotesProps> = ({ android, ios }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 text-left"
      >
        <h2 className="font-bold text-cyan-100 text-lg flex items-center gap-2">
          {expanded ? "−" : "+"} Version Details
        </h2>
      </button>
      {expanded && (
        <div className="space-y-4 pl-4 animate-slide-down pt-2">
          {/* Android Section */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Android</h3>
            <div className="flex items-center gap-3 text-cyan-50 text-sm">
              <span className="text-green-400 bg-green-400/10 p-1 rounded">Stable</span>
              <span className="font-mono text-white/80">{android.stable ? android.stable.version : "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-50 text-sm">
              <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded">Beta</span>
              <span className="font-mono text-white/80">{android.beta ? android.beta.version : "N/A"}</span>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          {/* iOS Section */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">iOS</h3>
            <div className="flex items-center gap-3 text-cyan-50 text-sm">
              <span className="text-green-400 bg-green-400/10 p-1 rounded">Stable</span>
              <span className="font-mono text-white/80">{ios.stable ? ios.stable.version : "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-50 text-sm">
              <span className="text-yellow-400 bg-yellow-400/10 p-1 rounded">Beta</span>
              <span className="font-mono text-white/80">{ios.beta ? ios.beta.version : "N/A"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickNotes;