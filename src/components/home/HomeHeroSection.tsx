"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, fadeIn } from "@/lib/animations";

export function HomeHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Hero Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/hero-img.png"
          alt="Devil Inside Hero"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay & slight blur */}
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-start justify-center flex-1 text-left px-8 md:px-16 lg:px-24 w-full max-w-screen-2xl mx-auto py-40"
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={fadeUp} className="font-cinzel text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[5.5rem] tracking-tight leading-none mb-0 text-red-700 drop-shadow-2xl font-black">
          DEVIL INSIDE
        </motion.h1>
        <motion.h1 variants={fadeUp} className="font-cinzel text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[5.5rem] tracking-tight leading-none mb-6 text-red-700 drop-shadow-2xl font-black">
          RECORDS
        </motion.h1>

        <motion.h2 variants={fadeUp} className="font-cinzel text-xl sm:text-2xl md:text-4xl tracking-wide mb-8 text-gray-200 uppercase max-w-4xl drop-shadow-md leading-tight">
          We don&#39;t follow the culture.
          <br className="hidden md:block" />
          {" "}We create it.
        </motion.h2>

        <motion.p variants={fadeUp} className="font-grotesk text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed drop-shadow mt-4">
          A home for the raw, the loud, and the unapologetic.
          <br />
          Where underground voices turn into undeniable movements.
        </motion.p>

        {/* Buttons Layout */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
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
        </motion.div>

        {/* Latest Drop Player UI */}
        <motion.div variants={fadeUp} className="mt-14 w-full md:w-[600px] border-t border-b border-white/10 py-5 bg-black/20 backdrop-blur-sm relative left-0">
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
                  sizes="(max-width: 768px) 50vw, 25vw"
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
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div 
        className="relative z-10 flex justify-center pb-10 text-white/40 animate-bounce"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
