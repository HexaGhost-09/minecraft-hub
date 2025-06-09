import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-blue-200 to-indigo-200 p-4">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-10">
        <Image
          src="/logo.png" // Change this path to your real logo if needed
          alt="Minecraft Hub Logo"
          width={120}
          height={120}
          className="mb-4 rounded-full shadow-lg"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-green-900 drop-shadow mb-2">
          Minecraft Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-700 text-center">
          Download the latest Minecraft versions easily!
        </p>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <a
          href="https://launcher.mojang.com/v1/objects/YOUR-STABLE-DOWNLOAD-LINK"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow transition duration-200 text-xl flex items-center gap-2"
          download
        >
          <span>⬇️</span> Download Stable
        </a>
        <a
          href="https://launcher.mojang.com/v1/objects/YOUR-BETA-DOWNLOAD-LINK"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-lg shadow transition duration-200 text-xl flex items-center gap-2"
          download
        >
          <span>🧪</span> Download Beta
        </a>
      </div>

      {/* Extra: Release Notes Example */}
      <section className="w-full max-w-2xl bg-white bg-opacity-60 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Latest Release Notes</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Stable: Improved performance and bug fixes</li>
          <li>Beta: Added new mobs and experimental biomes</li>
          <li>Both: Security enhancements</li>
        </ul>
      </section>

      {/* Footer with social links (example) */}
      <footer className="flex flex-col items-center mt-auto text-gray-600 text-sm">
        <div className="flex gap-4 mb-2">
          <a href="https://minecraft.net" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Official Site
          </a>
          <a href="https://github.com/HexaGhost-09/minecraft-hub" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        </div>
        <span>Made with ❤️ by HexaGhost-09</span>
      </footer>
    </main>
  );
}