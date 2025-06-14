import Image from "next/image";

export default function HomeHeader() {
  return (
    <>
      {/* Logo */}
      <div className="mb-2">
        <Image
          src="https://i.rj1.dev/NUSvRMK"
          alt="Minecraft Hub Logo"
          width={96}
          height={96}
          className="rounded-xl drop-shadow-2xl"
          priority
        />
      </div>
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
        Minecraft Hub
      </h1>
      <p className="text-lg md:text-xl text-cyan-100 text-center mb-4">
        Download the latest Minecraft APKs below!
      </p>
    </>
  );
}