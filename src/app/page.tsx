import Image from "next/image";
import { LatestReleaseSection } from "@/components/LatestReleaseSection";
import { ArtistSection } from "@/components/ArtistSection";
import { MerchSection } from "@/components/MerchSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Hero Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-img.png"
            alt="Devil Inside Hero"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark overlay & slight blur */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-start justify-center flex-1 text-left px-8 md:px-16 lg:px-24 w-full max-w-screen-2xl mx-auto py-40">
          <h1 className="font-cinzel text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[5.5rem] tracking-tight leading-none mb-0 text-red-700 drop-shadow-2xl font-black">
            DEVIL INSIDE
          </h1>
          <h1 className="font-cinzel text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[5.5rem] tracking-tight leading-none mb-6 text-red-700 drop-shadow-2xl font-black">
            RECORDS
          </h1>

          <h2 className="font-cinzel text-xl sm:text-2xl md:text-4xl tracking-wide mb-8 text-gray-200 uppercase max-w-4xl drop-shadow-md leading-tight">
            We don&#39;t follow the culture.
            <br className="hidden md:block" />
            {" "}We create it.
          </h2>

          <p className="font-grotesk text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed drop-shadow mt-4">
            A home for the raw, the loud, and the unapologetic.
            <br />
            Where underground voices turn into undeniable movements.
          </p>

          {/* Buttons Layout */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/latest-release"
              className="font-barlow bg-red-700 border border-red-700 text-black text-sm tracking-[0.3em] uppercase px-10 sm:px-14 py-4 hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-between gap-3 group"
            >
              LISTEN NOW
            </Link>
            <Link
              href="/about"
              className="font-barlow border border-white text-white text-sm tracking-[0.3em] uppercase px-10 sm:px-14 py-4 hover:bg-white hover:text-black transition-all flex items-center justify-between gap-3 group"
            >
              ABOUT US
            </Link>
          </div>

          {/* Latest Drop Player UI */}
          <div className="mt-14 w-full md:w-[600px] border-t border-b border-white/10 py-5 bg-black/20 backdrop-blur-sm relative left-0">
            <div className="font-barlow text-red-700 tracking-[0.2em] text-[10px] font-bold uppercase mb-4">
              LATEST DROP
            </div>

            <div className="flex items-center justify-between">
              {/* Cover & Info */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 relative bg-zinc-900 overflow-hidden shadow-2xl shrink-0">
                  <Image
                    src="/release-blood-meridian.png"
                    fill
                    alt="Bloodline Album"
                    className="object-cover"
                  />
                  {/* Internal dark shadow overlay to make it look gritty like the screenshot */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="font-cinzel text-white text-sm tracking-widest font-bold">BLOODLINE</span>
                  <span className="font-barlow text-gray-500 text-xs tracking-widest font-bold">KXNG VEX</span>
                  <span className="font-barlow text-red-700 text-[10px] tracking-widest mt-1 font-bold">APR 24, 2026</span>
                </div>
              </div>

              {/* Player UI */}
              <div className="flex items-center gap-6">
                <button className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all group shrink-0">
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                {/* Visual Waveform Map */}
                <div className="hidden md:flex items-center gap-[3px] h-6">
                  {[2, 5, 8, 4, 7, 3, 9, 6, 4, 3, 2, 5, 8, 10, 6, 8, 4, 2, 5, 3, 2].map((height, idx) => (
                    <div
                      key={idx}
                      className="w-[2px] bg-red-700/80 rounded-full"
                      style={{ height: `${(height / 10) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex justify-center pb-10 text-white/40 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Latest Releases Section */}
      <LatestReleaseSection />

      {/* Artists Section */}
      <ArtistSection />

      {/* Merch Section */}
      <MerchSection />

      {/* Contact Section */}
      <ContactSection />

    </>
  );
}
