"use client";
import React from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function LiveWebPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 bg-gradient-to-br from-slate-900 via-blue-800 to-cyan-400">
      {/* Back to Home Button */}
      <div className="w-full max-w-2xl mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-800/80 hover:bg-cyan-700/90 text-cyan-100 border border-cyan-300/30 shadow-sm text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-white mb-6">
        Our Webpages
      </h1>
      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-6 mb-10">
        {/* Main Website Widget */}
        <div className="bg-white/10 border border-cyan-400/30 rounded-xl shadow-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-cyan-100 mb-2">Main</h2>
          <Link
            href="https://the-minecraft-hub.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 w-full flex justify-center"
          >
            <span className="inline-block px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-500 text-white font-semibold transition-all shadow-md">
              Preview
            </span>
          </Link>
          <div
            className="w-full rounded-lg overflow-hidden border border-cyan-300/20 bg-slate-900/30 relative group"
            style={{
              height: 400,
              pointerEvents: "none", // disables all interaction inside
              touchAction: "none",
              userSelect: "none",
            }}
            tabIndex={-1}
            aria-disabled="true"
          >
            <div
              className="absolute inset-0 z-10"
              style={{
                pointerEvents: "auto",
                background:
                  "rgba(30,41,59,0.7) linear-gradient(135deg,rgba(59,130,246,0.07) 0%,rgba(45,212,191,0.05) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.2rem",
                letterSpacing: 1,
                textShadow: "0 2px 12px rgba(0,0,0,0.22)",
                opacity: 1,
                cursor: "not-allowed",
              }}
            >
              Live Preview (not interactive)
            </div>
            <iframe
              src="https://the-minecraft-hub.netlify.app"
              title="Main Website Live Preview"
              width="100%"
              height="100%"
              className="w-full h-full filter blur-[2px] scale-95 contrast-125 pointer-events-none select-none"
              style={{
                pointerEvents: "none",
                touchAction: "none",
                userSelect: "none",
                filter: "blur(2px) grayscale(0.12) brightness(0.95)",
              }}
              loading="lazy"
              tabIndex={-1}
              aria-disabled="true"
            />
          </div>
        </div>
        {/* Beta Website Widget */}
        <div className="bg-white/10 border border-yellow-400/30 rounded-xl shadow-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-yellow-100 mb-2">Beta</h2>
          <Link
            href="https://beta--the-minecraft-hub.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 w-full flex justify-center"
          >
            <span className="inline-block px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold transition-all shadow-md">
              Preview
            </span>
          </Link>
          <div
            className="w-full rounded-lg overflow-hidden border border-yellow-300/20 bg-slate-900/30 relative group"
            style={{
              height: 400,
              pointerEvents: "none",
              touchAction: "none",
              userSelect: "none",
            }}
            tabIndex={-1}
            aria-disabled="true"
          >
            <div
              className="absolute inset-0 z-10"
              style={{
                pointerEvents: "auto",
                background:
                  "rgba(153,130,0,0.09) linear-gradient(135deg,rgba(253,224,71,0.13) 0%,rgba(250,204,21,0.08) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.2rem",
                letterSpacing: 1,
                textShadow: "0 2px 12px rgba(0,0,0,0.22)",
                opacity: 1,
                cursor: "not-allowed",
              }}
            >
              Live Preview (not interactive)
            </div>
            <iframe
              src="https://beta--the-minecraft-hub.netlify.app"
              title="Beta Website Live Preview"
              width="100%"
              height="100%"
              className="w-full h-full filter blur-[2px] scale-95 contrast-125 pointer-events-none select-none"
              style={{
                pointerEvents: "none",
                touchAction: "none",
                userSelect: "none",
                filter: "blur(2px) grayscale(0.12) brightness(0.95)",
              }}
              loading="lazy"
              tabIndex={-1}
              aria-disabled="true"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}