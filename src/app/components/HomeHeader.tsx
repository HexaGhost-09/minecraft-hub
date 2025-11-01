import Image from "next/image";

export default function HomeHeader() {
  return (
    <div className="flex flex-col items-center gap-4 animate-slide-up">
      {/* Logo with hover scale */}
      <div className="relative group">
        <Image
          src="https://ik.imagekit.io/dy44khd73/logo.jpg?updatedAt=1749897563233"
          alt="Minecraft Hub Logo"
          width={200}
          height={200}
          className="rounded-2xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
          Minecraft Hub
        </h1>
        <p className="text-base md:text-lg text-cyan-100 mt-1 font-medium">
          Latest APKs at your fingertips
        </p>
      </div>
    </div>
  );
}