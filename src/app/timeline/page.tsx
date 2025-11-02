"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Download, Search, Package, Calendar, HardDrive, Award, TestTube, Filter, SortAsc, X, ChevronDown } from "lucide-react";

type ApkAsset = {
  url: string;
  name: string;
  version: string;
  date: string;
  prerelease: boolean;
  size: number;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

async function fetchApks(): Promise<ApkAsset[]> {
  const res = await fetch(
    "https://api.github.com/repos/HexaGhost-09/minecraft-hub/releases"
  );
  const releases = await res.json();

  const apks: ApkAsset[] = [];

  for (const release of releases) {
    for (const asset of release.assets) {
      if (asset.name.endsWith(".apk")) {
        apks.push({
          url: asset.browser_download_url,
          name: asset.name,
          version: release.tag_name || release.name,
          date: release.published_at,
          prerelease: !!release.prerelease,
          size: asset.size,
        });
      }
    }
  }

  apks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return apks;
}

export default function TimelinePage() {
  const [apks, setApks] = useState<ApkAsset[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "stable" | "beta">("all");
  const [sortBy, setSortBy] = useState<"date" | "size" | "name">("date");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApk, setSelectedApk] = useState<ApkAsset | null>(null);
  const [downloadingApk, setDownloadingApk] = useState<string | null>(null);

  useEffect(() => {
    fetchApks().then((data) => {
      setApks(data);
      setLoading(false);
    });
  }, []);

  const latestStable = useMemo(() => apks.find((a) => !a.prerelease), [apks]);
  const latestBeta = useMemo(() => apks.find((a) => a.prerelease), [apks]);

  const filteredApks = useMemo(() => {
    let filtered = apks;

    // Filter by type
    if (filterType === "stable") {
      filtered = filtered.filter((apk) => !apk.prerelease);
    } else if (filterType === "beta") {
      filtered = filtered.filter((apk) => apk.prerelease);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (apk) =>
          apk.name.toLowerCase().includes(q) ||
          apk.version.toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === "date") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "size") {
      sorted.sort((a, b) => b.size - a.size);
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [apks, search, filterType, sortBy]);

  const handleDownload = (apk: ApkAsset) => {
    setDownloadingApk(apk.url);
    setTimeout(() => setDownloadingApk(null), 2000);
  };

  const stats = useMemo(() => ({
    total: apks.length,
    stable: apks.filter(a => !a.prerelease).length,
    beta: apks.filter(a => a.prerelease).length,
  }), [apks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Header Section */}
      <header className="bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Minecraft APK</h1>
              <p className="text-xs text-gray-400">Version Archive</p>
            </div>
          </div>
          <a
            href="/"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all hover:scale-105"
          >
            Home
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        {!loading && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="text-gray-400 text-sm mb-1">Total Releases</div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="text-gray-400 text-sm mb-1">Stable</div>
              <div className="text-2xl font-bold text-emerald-400">{stats.stable}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer">
              <div className="text-gray-400 text-sm mb-1">Beta</div>
              <div className="text-2xl font-bold text-amber-400">{stats.beta}</div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by version or filename..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all text-white placeholder:text-gray-500"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                showFilters
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:border-emerald-500/50"
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 animate-in slide-in-from-top-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Filter by Type</label>
                  <div className="flex gap-2">
                    {["all", "stable", "beta"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filterType === type
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Sort by</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none appearance-none cursor-pointer"
                    >
                      <option value="date">Date (Newest First)</option>
                      <option value="size">Size (Largest First)</option>
                      <option value="name">Name (A-Z)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Cards */}
        {!loading && (latestStable || latestBeta) && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {latestStable && (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6" />
                  <span className="text-lg font-bold">Latest Stable Release</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{latestStable.version}</h3>
                <p className="text-emerald-100 text-sm mb-4">{latestStable.name}</p>
                <div className="flex items-center gap-4 text-sm mb-4 text-emerald-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(latestStable.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-4 h-4" />
                    {formatFileSize(latestStable.size)}
                  </span>
                </div>
                <a
                  href={latestStable.url}
                  onClick={() => handleDownload(latestStable)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  {downloadingApk === latestStable.url ? "Downloading..." : "Download Now"}
                </a>
              </div>
            )}

            {latestBeta && (
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  <TestTube className="w-6 h-6" />
                  <span className="text-lg font-bold">Latest Beta Release</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{latestBeta.version}</h3>
                <p className="text-amber-100 text-sm mb-4">{latestBeta.name}</p>
                <div className="flex items-center gap-4 text-sm mb-4 text-amber-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(latestBeta.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-4 h-4" />
                    {formatFileSize(latestBeta.size)}
                  </span>
                </div>
                <a
                  href={latestBeta.url}
                  onClick={() => handleDownload(latestBeta)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  {downloadingApk === latestBeta.url ? "Downloading..." : "Download Beta"}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Loading releases...</p>
          </div>
        )}

        {/* APK List */}
        {!loading && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                All Releases ({filteredApks.length})
              </h2>
              {(filterType !== "all" || search) && (
                <button
                  onClick={() => {
                    setFilterType("all");
                    setSearch("");
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
            {filteredApks.length === 0 ? (
              <div className="text-center py-20 bg-gray-800 rounded-2xl">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No APKs found matching your search.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredApks.map((apk) => {
                  const isLatestStable = latestStable && apk.url === latestStable.url;
                  const isLatestBeta = latestBeta && apk.url === latestBeta.url;

                  return (
                    <div
                      key={apk.url}
                      onClick={() => setSelectedApk(selectedApk?.url === apk.url ? null : apk)}
                      className={`bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border-2 cursor-pointer transform hover:scale-[1.02] ${
                        isLatestStable
                          ? "border-emerald-500 bg-emerald-950/30"
                          : isLatestBeta
                          ? "border-amber-500 bg-amber-950/30"
                          : selectedApk?.url === apk.url
                          ? "border-emerald-500"
                          : "border-transparent hover:border-gray-700"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-white">{apk.name}</h3>
                            {apk.prerelease && (
                              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30">
                                BETA
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {apk.version}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(apk.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-4 h-4" />
                              {formatFileSize(apk.size)}
                            </span>
                          </div>
                        </div>
                        <a
                          href={apk.url}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(apk);
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap hover:scale-105 ${
                            isLatestStable
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                              : isLatestBeta
                              ? "bg-amber-500 hover:bg-amber-600 text-white"
                              : apk.prerelease
                              ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"
                              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          {downloadingApk === apk.url ? "Downloading..." : "Download"}
                        </a>
                      </div>

                      {selectedApk?.url === apk.url && (
                        <div className="mt-4 pt-4 border-t border-gray-700 animate-in slide-in-from-top-1">
                          <div className="text-sm text-gray-400 space-y-2">
                            <p><span className="text-gray-300 font-medium">Full Name:</span> {apk.name}</p>
                            <p><span className="text-gray-300 font-medium">Version:</span> {apk.version}</p>
                            <p><span className="text-gray-300 font-medium">Release Date:</span> {new Date(apk.date).toLocaleString()}</p>
                            <p><span className="text-gray-300 font-medium">File Size:</span> {formatFileSize(apk.size)}</p>
                            <p><span className="text-gray-300 font-medium">Type:</span> {apk.prerelease ? "Beta Release" : "Stable Release"}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>Minecraft APK Archive • All versions available for download</p>
        </div>
      </footer>
    </div>
  );
}