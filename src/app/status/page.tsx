"use client";
import React, { useEffect, useState } from "react";
import StatusHistoryBar from "../components/StatusHistoryBar";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
};

type Status = "up" | "partial" | "down";

type GithubReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GithubRelease = {
  tag_name: string;
  prerelease: boolean;
  assets: GithubReleaseAsset[];
};

const SITE_HISTORY_KEY = "siteStatusHistory";

async function getApkStatus(): Promise<{
  status: Status;
  beta?: ApkAsset;
  stable?: ApkAsset;
  error?: string;
}> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/HexaGhost-09/minecraft-hub/releases"
    );

    if (!res.ok) {
      return { status: "down", error: `GitHub API Error: ${res.status}` };
    }

    const releases: GithubRelease[] = await res.json();

    let beta: ApkAsset | undefined;
    let stable: ApkAsset | undefined;

    for (const release of releases) {
      const apkAsset = release.assets.find(
        (asset) => asset.name.endsWith(".apk")
      );
      if (!apkAsset) continue;

      const apkData: ApkAsset = {
        url: apkAsset.browser_download_url,
        name: apkAsset.name,
        version: release.tag_name,
      };

      if (!beta && release.prerelease) beta = apkData;
      if (!stable && !release.prerelease) stable = apkData;
      if (beta && stable) break;
    }

    if (beta && stable) return { status: "up", beta, stable };
    if (beta || stable) return { status: "partial", beta, stable };
    return { status: "down", error: "No APKs found." };
  } catch (e) {
    let msg = "Unknown error";
    if (typeof e === "object" && e !== null && "message" in e) {
      msg = String((e as { message?: string }).message ?? msg);
    }
    return { status: "down", error: msg };
  }
}

// Check if site is up (returns "up" or "down")
async function checkSiteStatus(): Promise<Status> {
  try {
    await fetch("https://the-minecraft-hub.netlify.app/", {
      mode: "no-cors",
      cache: "no-store",
    });
    return "up";
  } catch {
    return "down";
  }
}

// Get status history from localStorage
function getStatusHistory(): Status[] {
  if (typeof window === "undefined") return Array(7).fill("down");
  const raw = localStorage.getItem(SITE_HISTORY_KEY);
  if (!raw) return Array(7).fill("down");
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr) && arr.every(x => ["up", "down", "partial"].includes(x))) {
      return arr;
    }
    return Array(7).fill("down");
  } catch {
    return Array(7).fill("down");
  }
}

// Save status history to localStorage
function saveStatusHistory(history: Status[]) {
  localStorage.setItem(SITE_HISTORY_KEY, JSON.stringify(history));
}

export default function StatusPage() {
  const [apkStatus, setApkStatus] = useState<{
    status: Status;
    beta?: ApkAsset;
    stable?: ApkAsset;
    error?: string;
  }>({ status: "down" });

  const [siteStatus, setSiteStatus] = useState<Status>("down");
  const [siteHistory, setSiteHistory] = useState<Status[]>(Array(7).fill("down"));
  const [lastChecked, setLastChecked] = useState<string>("");

  // Only run on client
  useEffect(() => {
    getApkStatus().then(setApkStatus);

    (async () => {
      const status = await checkSiteStatus();
      setSiteStatus(status);

      // Get and update history on client only
      const prev = getStatusHistory();
      const updated = [...prev.slice(1), status];
      setSiteHistory(updated);
      saveStatusHistory(updated);
      setLastChecked(new Date().toLocaleString());
    })();
  }, []);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-gray-900 via-blue-800 to-cyan-400 p-4">
      <div className="bg-white/20 border border-white/30 rounded-3xl shadow-xl max-w-md w-full px-8 py-10 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-white">Minecraft Hub Status</h1>

        <section className="w-full flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold text-cyan-50">Website Status</h2>
          <StatusHistoryBar history={siteHistory} />
          <div
            className={`text-xl font-bold px-4 py-2 rounded-xl ${
              siteStatus === "up"
                ? "bg-green-500/80 text-white"
                : siteStatus === "partial"
                ? "bg-yellow-400/80 text-white"
                : "bg-red-600/80 text-white"
            }`}
          >
            {siteStatus === "up"
              ? "Website Online"
              : siteStatus === "partial"
              ? "Partial Outage"
              : "Down"}
          </div>
        </section>

        <section className="w-full flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold text-cyan-50">APK Status</h2>
          <div
            className={`text-xl font-bold px-4 py-2 rounded-xl ${
              apkStatus.status === "up"
                ? "bg-green-500/80 text-white"
                : apkStatus.status === "partial"
                ? "bg-yellow-400/80 text-white"
                : "bg-red-600/80 text-white"
            }`}
          >
            {apkStatus.status === "up"
              ? "All APKs Available"
              : apkStatus.status === "partial"
              ? "Partial Outage"
              : "Down"}
          </div>
          <ul className="w-full text-base text-cyan-50 space-y-2">
            <li>
              <b>GitHub API:</b>{" "}
              {apkStatus.error
                ? `Error - ${apkStatus.error}`
                : "OK"}
            </li>
            <li>
              <b>Stable APK:</b>{" "}
              {apkStatus.stable
                ? `${apkStatus.stable.name} (${apkStatus.stable.version})`
                : "Missing"}
            </li>
            <li>
              <b>Beta APK:</b>{" "}
              {apkStatus.beta
                ? `${apkStatus.beta.name} (${apkStatus.beta.version})`
                : "Missing"}
            </li>
          </ul>
        </section>

        <p className="text-xs text-cyan-200 pt-6">
          Last checked: {lastChecked}
        </p>
      </div>
    </main>
  );
}