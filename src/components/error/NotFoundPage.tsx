import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background element */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <Image
          src="/about-bg-img.png"
          alt="Devil Inside Angel Background"
          fill
          className="object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <h1 className="font-cinzel text-[8rem] md:text-[12rem] font-black leading-none text-[#780606] drop-shadow-2xl">
          404
        </h1>
        
        <h2 className="font-bebas text-3xl md:text-5xl uppercase tracking-wide mb-6">
          Lost in the underground
        </h2>
        
        <p className="font-grotesk text-gray-400 text-[14px] md:text-base leading-relaxed mb-10 max-w-md mx-auto">
          The track you're looking for doesn't exist, has been removed, or is currently restricted. Return to the surface or keep digging.
        </p>

        <Link
          href="/"
          className="font-barlow bg-[#780606] border border-[#780606] text-black text-sm tracking-[0.3em] uppercase px-12 py-4 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 group"
        >
          RETURN TO BASE
        </Link>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#780606]/50 to-transparent" />
      <div className="absolute top-24 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </main>
  );
}
