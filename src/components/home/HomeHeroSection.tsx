"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, fadeIn } from "@/lib/animations";
import { RELEASES } from "@/constants/releases";

export function HomeHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
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
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between flex-1 w-full max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-28 sm:pt-32 pb-14 sm:pb-20 gap-8 lg:gap-16"
        variants={staggerContainer(0.1, 0.3)}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT: Text & CTAs */}
        <div className="flex flex-col items-start justify-end flex-1 min-w-0 w-full">
          {/* Label badge */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-6 sm:w-8 h-[2px] bg-red-600 inline-block shrink-0" />
            <span className="font-barlow text-red-500 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold">
              Independent Record Label
            </span>
          </motion.div>

          {/* Headline — wraps naturally on mobile */}
          <motion.h1
            variants={fadeUp}
            className="font-cinzel tracking-tight leading-[0.95] mb-4 sm:mb-5 text-red-700 drop-shadow-2xl font-black lg:whitespace-nowrap"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 5rem)" }}
          >
            <span style={{ fontSize: "1.28em", lineHeight: 1 }}>D</span>EVIL{" "}
            <span style={{ fontSize: "1.28em", lineHeight: 1 }}>I</span>NSIDE{" "}
            <span style={{ fontSize: "1.28em", lineHeight: 1 }}>R</span>ECORDS
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            variants={fadeUp}
            className="font-cinzel text-[11px] sm:text-sm md:text-base tracking-[0.15em] mb-6 sm:mb-8 text-gray-300 uppercase max-w-xs sm:max-w-xl drop-shadow leading-snug"
          >
            We don&#39;t follow the culture.{" "}We create it.
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <Link
              href="/latest-release"
              className="font-barlow bg-red-700 border border-red-700 text-white hover:bg-transparent hover:border-red-500 hover:text-red-400 text-[11px] sm:text-xs tracking-[0.3em] uppercase px-5 sm:px-8 py-3 sm:py-3.5 transition-all duration-300 flex items-center gap-2 sm:gap-3 group"
            >
              CATALOGUE
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/artists"
              className="font-barlow bg-transparent border border-white/30 text-white/80 hover:border-white hover:text-white text-[11px] sm:text-xs tracking-[0.3em] uppercase px-5 sm:px-8 py-3 sm:py-3.5 transition-all duration-300"
            >
              ARTISTS
            </Link>
          </motion.div>

          {/* Latest Drop + Spotify */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-2 w-full max-w-full sm:max-w-[520px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse inline-block shrink-0" />
              <span className="font-barlow text-white/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                Latest Drop
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-4 w-full max-w-full">
              {(() => {
                const vaakkath = RELEASES.find((r) => r.id === "vaakkath");
                return vaakkath ? (
                  <article className="group overflow-hidden rounded-lg border border-white/10 bg-black/60 w-full" style={{ height: 152 }}>
                    <div className="flex h-full">
                      <div className="relative w-1/3 h-full overflow-hidden">
                        <Image
                          src={vaakkath.cover}
                          alt={vaakkath.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 160px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute top-2 left-2 inline-flex items-center rounded-full border border-yellow-400/30 bg-black/60 px-2 py-0.5 text-[10px] font-barlow font-bold uppercase tracking-[0.25em] text-yellow-300">
                          {vaakkath.tag}
                        </div>
                      </div>

                      <div className="flex-1 px-3 py-2 flex flex-col justify-center">
                        <p className="font-barlow text-gray-400 text-[10px] uppercase tracking-[0.25em]">{vaakkath.artist}</p>
                        <h4 className="font-cinzel text-white text-base uppercase leading-tight mt-1">{vaakkath.title}</h4>
                        
                        <button disabled className="mt-3 inline-flex w-40 items-center justify-center rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gray-400 opacity-70 cursor-not-allowed">
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </article>
                ) : null;
              })()}

              {/* Spotify Embed (old HOLA embed preserved) */}
              <iframe
                style={{ borderRadius: "10px" }}
                src="https://open.spotify.com/embed/track/4IjK4QLfJThr9s1nhLcmwM?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT: decorative stats / brand block (desktop only) */}
        <motion.div
          variants={fadeUp}
          className="hidden lg:flex flex-col items-end gap-6 min-w-[220px] self-end mb-2"
        >
          <div className="flex items-stretch gap-4">
            <div className="w-[1px] bg-white/20 self-stretch" />
            <div className="flex flex-col gap-1 text-right">
              <span className="font-barlow text-white/30 text-[10px] tracking-[0.3em] uppercase">Est.</span>
              <span className="font-cinzel text-white text-3xl font-bold">2020</span>
              <span className="font-barlow text-white/40 text-[10px] tracking-[0.25em] uppercase mt-1">India</span>
            </div>
          </div>

          <div className="flex items-stretch gap-4">
            <div className="w-[1px] bg-white/20 self-stretch" />
            <div className="flex flex-col gap-1 text-right">
              <span className="font-barlow text-white/30 text-[10px] tracking-[0.3em] uppercase">Releases</span>
              <span className="font-cinzel text-red-600 text-3xl font-bold">50+</span>
              <span className="font-barlow text-white/40 text-[10px] tracking-[0.25em] uppercase mt-1">&amp; counting</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="relative z-10 flex justify-center pb-6 sm:pb-8 text-white/30"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
