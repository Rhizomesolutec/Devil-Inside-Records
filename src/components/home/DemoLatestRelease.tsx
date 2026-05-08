"use client";

import Image from "next/image";
import Link from "next/link";
import CardSwap, { Card } from "@/components/CardSwap";
import { useState, useRef, useEffect } from "react";
import { RELEASES } from "@/constants/releases";

export function DemoLatestReleaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const active = RELEASES[activeIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pause audio when active item changes
  useEffect(() => {
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [activeIndex]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing, activeIndex]);

  return (
    <section className="relative bg-black overflow-hidden" style={{ minHeight: "780px" }}>
      <audio ref={audioRef} src={active?.audio} onEnded={() => setPlaying(false)} />
      <div className="absolute inset-0 z-[1] bg-black/80 pointer-events-none" />

      {/* ── Vertical label ── */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <span
          className="font-barlow text-white/10 text-[10px] tracking-[0.5em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-10 md:px-16 lg:px-24 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ minHeight: "780px" }}>

        {/* ── LEFT: Header + Active Info ── */}
        <div className="flex flex-col gap-8 max-w-lg">
          {/* Label */}
          <p className="font-barlow text-red-600 tracking-[0.35em] text-[11px] font-bold uppercase flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-red-600" />
            LATEST DROPS
            <span className="inline-block w-6 h-px bg-red-600" />
          </p>

          {/* Heading */}
          <h2 className="font-bebas text-7xl md:text-[6rem] lg:text-[7rem] [-webkit-text-stroke:2px_white] text-transparent uppercase leading-none tracking-wide">
            LATEST<br />RELEASES
          </h2>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-red-600/60 to-transparent" />
            <span className="font-barlow text-red-600 text-[10px] tracking-[0.4em] uppercase">
              NOW PLAYING
            </span>
          </div>

          {/* Active release details */}
          <div className="flex flex-col gap-3 transition-all duration-500">
            {/* Type badge */}
            <span className="inline-flex w-fit font-barlow text-[9px] font-bold tracking-[0.35em] uppercase text-black bg-red-600 px-3 py-1">
              {active?.type ?? "SINGLE"}
            </span>

            {/* Title */}
            <h3 className="font-cinzel text-white font-black text-4xl md:text-5xl uppercase leading-tight">
              {active?.title}
            </h3>

            {/* Artist + Date */}
            <div className="flex items-baseline gap-4">
              <p className="font-barlow text-gray-300 text-sm tracking-[0.25em] uppercase">
                {active?.artist}
              </p>
              <span className="w-1 h-1 rounded-full bg-red-600" />
              <p className="font-barlow text-gray-600 text-xs tracking-widest uppercase">
                {active?.date}
              </p>
            </div>

            {/* Duration */}
            <p className="font-mono text-gray-600 text-xs tracking-widest">
              {active?.duration}
            </p>

            {/* Play + CTA row */}
            <div className="flex items-center gap-5 mt-4">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="group flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-black transition-all duration-300">
                  {playing ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
                <span className="font-barlow text-white text-[10px] tracking-[0.3em] uppercase group-hover:text-red-600 transition-colors">
                  {playing ? "PAUSE" : "PLAY NOW"}
                </span>
              </button>

              {/* Parental Advisory */}
              <div className="bg-white px-2 py-1 text-black text-center leading-none ml-auto">
                <div className="text-[5px] font-black tracking-wider">PARENTAL</div>
                <div className="text-[8px] font-black tracking-widest">ADVISORY</div>
                <div className="text-[4px] tracking-wide">EXPLICIT CONTENT</div>
              </div>
            </div>
          </div>

          {/* View All */}
          <Link
            href="/latest-release"
            className="mt-2 inline-flex w-fit font-barlow border border-white/20 text-white text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-all items-center gap-3 group"
          >
            VIEW ALL RELEASES
            <span className="text-red-600 group-hover:text-black transition-colors">↗</span>
          </Link>
        </div>

        {/* ── RIGHT: CardSwap stack ── */}
        <div className="relative hidden lg:block" style={{ height: "600px" }}>
          <CardSwap
            width={380}
            height={460}
            cardDistance={55}
            verticalDistance={65}
            delay={4000}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
            onCardClick={(idx) => setActiveIndex(idx % RELEASES.length)}
          >
            {RELEASES.map((release, i) => (
              <Card
                key={release.id}
                customClass="overflow-hidden !border-red-600/40 !rounded-none shadow-2xl shadow-red-950/40"
                onClick={() => setActiveIndex(i % RELEASES.length)}
              >
                {/* Cover image */}
                <div className="relative w-full h-[65%] overflow-hidden">
                  <Image
                    src={release.cover}
                    alt={release.title}
                    fill
                    sizes="380px"
                    className="object-cover"
                  />
                  {/* Dark gradient over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Type badge — top left */}
                  <span className="absolute top-3 left-3 z-10 font-barlow text-[8px] font-bold tracking-[0.35em] uppercase bg-red-600 text-black px-2 py-0.5">
                    {release.type}
                  </span>

                  {/* Parental advisory — bottom right of image */}
                  <div className="absolute bottom-3 right-3 z-10 bg-white px-1.5 py-0.5 text-black text-center leading-none">
                    <div className="text-[4px] font-black tracking-wider">PARENTAL</div>
                    <div className="text-[6px] font-black tracking-widest">ADVISORY</div>
                    <div className="text-[3px] tracking-wide">EXPLICIT CONTENT</div>
                  </div>
                </div>

                {/* Info section */}
                <div className="flex flex-col gap-2 px-5 pt-4 pb-5 bg-black flex-1">
                  {/* Red accent line */}
                  <div className="w-8 h-0.5 bg-red-600 mb-1" />

                  <h3 className="font-cinzel text-white font-black text-xl uppercase leading-tight tracking-tight">
                    {release.title}
                  </h3>
                  <p className="font-barlow text-gray-400 text-xs tracking-[0.3em] uppercase">
                    {release.artist}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <p className="font-barlow text-gray-600 text-[9px] tracking-widest uppercase">
                      {release.date}
                    </p>
                    <span className="font-mono text-gray-600 text-[10px] tracking-widest">
                      {release.duration}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

        {/* ── Mobile: horizontal scroll strip of cards (CardSwap hidden on mobile) ── */}
        <div className="flex lg:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {RELEASES.map((release, i) => (
            <button
              key={release.id}
              onClick={() => setActiveIndex(i)}
              className={`snap-start flex-shrink-0 w-48 border transition-all duration-300 ${
                activeIndex === i
                  ? "border-red-600"
                  : "border-white/10"
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={release.cover}
                  alt={release.title}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <div className="bg-black px-3 py-2 text-left">
                <p className="font-cinzel text-white text-xs font-black uppercase truncate">
                  {release.title}
                </p>
                <p className="font-barlow text-gray-500 text-[9px] tracking-widest uppercase truncate">
                  {release.artist}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom border accent ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-10" />
    </section>
  );
}