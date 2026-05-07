"use client";

import Image from "next/image";
import Link from "next/link";
import { ARTIST_NAMES, VIBES } from "@/constants/artists";

function Marquee({ items, speed = "20s", direction = "left", size = "text-xs" }: { 
    items: string[], 
    speed?: string, 
    direction?: "left" | "right",
    size?: string 
}) {
    const doubled = [...items, ...items, ...items, ...items];
    return (
        <div className="w-full overflow-hidden py-4 border-y border-white/5 bg-black/40 backdrop-blur-xs">
            <div 
                className={`flex gap-12 whitespace-nowrap ${direction === "left" ? "animate-[marquee_linear_infinite]" : "animate-[marquee-reverse_linear_infinite]"}`}
                style={{ animationDuration: speed }}
            >
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className={`font-barlow tracking-[0.4em] uppercase shrink-0 ${size} ${
                            ARTIST_NAMES.includes(item) ? "text-white font-black" : "text-gray-500"
                        }`}
                    >
                        {item}
                        <span className="ml-12 text-[#780606] opacity-50">×</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export function ArtistSection() {
    return (
        <section className="relative bg-black overflow-hidden py-32">
            {/* ── Background ── */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/home-artist-bg-img.png"
                    alt=""
                    fill
                    className="object-cover opacity-20"
                    aria-hidden
                />
                <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent to-black" />
            </div>

            <div className="relative z-10">
                {/* ── Section Header ── */}
                <div className="text-center mb-20 px-6">
                    <div className="inline-block relative">
                        <span className="font-cinzel italic text-[#780606] text-2xl md:text-3xl font-bold tracking-tight block mb-2">
                            THE COLLECTIVE
                        </span>
                        <h2 className="font-bebas text-[5rem] md:text-[8rem] lg:text-[8rem] text-white leading-none tracking-tighter">
                            OUR <span className="[-webkit-text-stroke:2px_white] text-transparent">ARTISTS</span>
                        </h2>
                        {/* Decorative crown */}
                        <svg className="absolute -top-6 -right-12 w-12 h-12 text-[#780606] rotate-12 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M2 19h20M5 19V8l4 4 3-6 3 6 4-4v11" />
                        </svg>
                    </div>
                    <p className="font-grotesk text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-6 tracking-wide leading-relaxed">
                        We don't just sign talent. We build movements. An endless roster of underground heavyweights, all pushing the same dark frequency.
                    </p>
                </div>

                {/* ── The Wall of Names ── */}
                <div className="flex flex-col gap-2 -rotate-3 scale-110 mb-20">
                    <Marquee items={VIBES} speed="35s" direction="right" size="text-[10px]" />
                    <Marquee items={ARTIST_NAMES} speed="25s" direction="left" size="text-4xl md:text-6xl font-cinzel" />
                    <Marquee items={VIBES} speed="40s" direction="right" size="text-[10px]" />
                    <Marquee items={ARTIST_NAMES.slice().reverse()} speed="30s" direction="left" size="text-2xl md:text-4xl font-cinzel opacity-40" />
                </div>

                {/* ── CTA ── */}
                <div className="flex flex-col items-center gap-8 mt-16 px-6">
                    <div className="flex items-center gap-10">
                        <div className="text-center">
                            <div className="font-cinzel text-3xl md:text-4xl font-black text-[#780606]">50+</div>
                            <div className="font-barlow text-gray-500 text-[9px] tracking-[0.3em] uppercase mt-1">ARTISTS</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <div className="font-cinzel text-3xl md:text-4xl font-black text-[#780606]">10M+</div>
                            <div className="font-barlow text-gray-500 text-[9px] tracking-[0.3em] uppercase mt-1">STREAMS</div>
                        </div>
                    </div>

                    <Link
                        href="/artists"
                        className="font-barlow border border-white/20 text-white text-sm tracking-[0.4em] uppercase px-16 py-5 hover:bg-white hover:text-black transition-all flex items-center gap-4 group"
                    >
                        EXPLORE THE ROSTER
                        <span className="text-[#780606] group-hover:text-black transition-colors">↗</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
