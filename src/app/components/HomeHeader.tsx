import Image from 'next/image';

export default function HomeHeader() {
  return (
    <header className="relative isolate flex flex-col items-center gap-5 animate-slide-up">
      {/* Aurora background */}
      <div className="absolute -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-20 blur-3xl" />

      {/* Logo */}
      <div className="group relative">
        <Image
          src="https://ik.imagekit.io/dy44khd73/logo.jpg?updatedAt=1749897563233"
          alt="Minecraft Hub"
          width={160}
          height={160}
          className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg
                     transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Title block */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Minecraft Hub
        </h1>
        <p className="mt-1 text-sm md:text-base text-white/70">
          Latest APKs at your fingertips
        </p>
      </div>
    </header>
  );
}
