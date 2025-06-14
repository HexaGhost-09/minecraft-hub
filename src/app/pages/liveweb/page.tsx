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
      <div className="w-full max-w-2xl flex flex-col md:flex-row md:items-center md:justify-start mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 md:mb-0 md:mr-12 text-left">
          Our Webpages
        </h1>
      </div>
      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-8 mb-10">
        {/* Main Website Widget */}
        <div className="bg-white/10 border border-cyan-400/30 rounded-xl shadow-lg p-4 flex flex-col items-center">
          <h2 className="w-full text-2xl font-bold text-cyan-100 mb-4 text-left">Main</h2>
          <div
            className="w-full rounded-lg overflow-hidden border border-cyan-300/20 bg-slate-900/30"
            style={{
              width: "100%",
              aspectRatio: "16/9",
              maxWidth: "360px",
              minWidth: "220px",
              margin: "0 auto",
              pointerEvents: "none",
              userSelect: "none",
              height: "auto",
            }}
            tabIndex={-1}
            aria-disabled="true"
          >
            <iframe
              src="https://the-minecraft-hub.netlify.app"
              title="Main Website Live Preview"
              width="100%"
              height="100%"
              style={{
                aspectRatio: "16/9",
                width: "100%",
                height: "202px",
                pointerEvents: "none",
                userSelect: "none",
                border: "none",
                filter: "grayscale(0.06) brightness(0.93) contrast(1.12)",
              }}
              className="w-full"
              loading="lazy"
              tabIndex={-1}
              aria-disabled="true"
            />
          </div>
          <Link
            href="https://the-minecraft-hub.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full flex justify-center"
          >
            <span className="inline-block w-full px-6 py-3 rounded-lg bg-cyan-700 hover:bg-cyan-500 text-white font-bold text-lg transition-all shadow-md text-center">
              Preview
            </span>
          </Link>
        </div>
        {/* Beta Website Widget */}
        <div className="bg-white/10 border border-yellow-400/30 rounded-xl shadow-lg p-4 flex flex-col items-center">
          <h2 className="w-full text-2xl font-bold text-yellow-100 mb-4 text-left">Beta</h2>
          <div
            className="w-full rounded-lg overflow-hidden border border-yellow-300/20 bg-slate-900/30"
            style={{
              width: "100%",
              aspectRatio: "16/9",
              maxWidth: "360px",
              minWidth: "220px",
              margin: "0 auto",
              pointerEvents: "none",
              userSelect: "none",
              height: "auto",
            }}
            tabIndex={-1}
            aria-disabled="true"
          >
            <iframe
              src="https://beta--the-minecraft-hub.netlify.app"
              title="Beta Website Live Preview"
              width="100%"
              height="100%"
              style={{
                aspectRatio: "16/9",
                width: "100%",
                height: "202px",
                pointerEvents: "none",
                userSelect: "none",
                border: "none",
                filter: "grayscale(0.06) brightness(0.93) contrast(1.12)",
              }}
              className="w-full"
              loading="lazy"
              tabIndex={-1}
              aria-disabled="true"
            />
          </div>
          <Link
            href="https://beta--the-minecraft-hub.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full flex justify-center"
          >
            <span className="inline-block w-full px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-lg transition-all shadow-md text-center">
              Preview
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}