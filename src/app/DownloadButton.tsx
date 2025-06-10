"use client";
import React from "react";

type Props = {
  apk_name: string;
  version: string;
  url: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export function DownloadButton({ apk_name, version, url, className, children, disabled }: Props) {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apk_name, version }),
      });
    } catch (err) {
      // Optionally show an error
    }
    // Trigger the file download
    window.location.href = url;
  };

  return (
    <a
      href={url}
      onClick={disabled ? undefined : handleDownload}
      className={className}
      download
      style={disabled ? { pointerEvents: "none", opacity: 0.6 } : undefined}
    >
      {children}
    </a>
  );
}