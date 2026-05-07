"use client";

import Image from "next/image";
import Link from "next/link";
import LightRays from "@/components/LightRays";
import ElectricBorder from "@/components/ElectricBorder";
import { useState } from "react";
import { RELEASES } from "@/constants/releases";

export function LatestReleaseSection() {
    const [offset, setOffset] = useState(0);
    const visible = 4;
    const max = RELEASES.length - visible;

    const prev = () => setOffset((o) => Math.max(o - 1, 0));
    const next = () => setOffset((o) => Math.min(o + 1, Math.max(0, max)));

    return (
        <section className="relative bg-black py-20 px-6 md:px-16 lg:px-24 overflow-hidden">
            {/* Light Rays BG */}
            <div className="absolute inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ff3f3f"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating
                    fadeDistance={1}
                    saturation={1}
                />
            </div>
            {/* Overlay to keep content readable */}
            <div className="absolute inset-0 z-1 bg-black/75 pointer-events-none" />

            <div className="relative z-10 max-w-screen-2xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <p className="font-barlow text-red-600 tracking-[0.35em] text-[11px] font-bold uppercase mb-4 flex items-center gap-3">
                        <span className="inline-block w-6 h-px bg-red-600" />
                        LATEST DROPS
                        <span className="inline-block w-6 h-px bg-red-600" />
                    </p>
                    <h2 className="font-bebas text-6xl [-webkit-text-stroke:2px_white] text-transparent sm:text-7xl md:text-[6rem] uppercase leading-none tracking-wide mb-5">
                        LATEST RELEASES
                    </h2>
                    <p className="font-grotesk text-gray-500 text-sm tracking-widest">
                        Fresh sounds from the underground.&nbsp; No limits.&nbsp; No rules.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex justify-end gap-3 mb-6 px-4">
                    <button
                        onClick={prev}
                        disabled={offset === 0}
                        className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all disabled:opacity-20"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        disabled={offset >= max}
                        className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all disabled:opacity-20"
                    >
                        →
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {RELEASES.slice(offset, offset + visible).map((release) => (
                        <ReleaseCard key={release.id} release={release} />
                    ))}
                </div>

                {/* View All */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/latest-release"
                        className="font-barlow border border-white/20 text-white text-sm tracking-[0.3em] uppercase px-14 py-4 hover:bg-white hover:text-black transition-all flex items-center gap-3 group"
                    >
                        VIEW ALL RELEASES
                        <span className="text-red-600 group-hover:text-black transition-colors">↗</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

import { Release } from "@/constants/releases";

function ReleaseCard({ release }: { release: Release }) {
    const [playing, setPlaying] = useState(false);

    return (
        <ElectricBorder
            color="#780606"
            speed={0.60}
            chaos={0.13}
            borderRadius={6}
            style={{ display: "flex", flexDirection: "column" }}
        >
            <div className="flex flex-col bg-black cursor-pointer group p-0">
                {/* Art */}
                <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                        src={release.cover}
                        alt={release.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Parental Advisory */}
                    <div className="absolute bottom-2 right-2 z-10">
                        <div className="bg-white px-1.5 py-0.5 text-black text-center leading-none">
                            <div className="text-[5px] font-black tracking-wider">PARENTAL</div>
                            <div className="text-[7px] font-black tracking-widest">ADVISORY</div>
                            <div className="text-[4px] tracking-wide">EXPLICIT CONTENT</div>
                        </div>
                    </div>
                    {/* Gradient bottom */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="px-4 pt-4 pb-3 border-b border-white/10">
                    <p className="font-barlow text-red-600 text-[9px] font-bold tracking-[0.3em] uppercase mb-2">
                        {release.type}
                    </p>
                    <h3 className="font-cinzel text-white font-black text-lg uppercase leading-tight tracking-tight mb-1">
                        {release.title}
                    </h3>
                    <p className="font-barlow text-gray-500 text-xs tracking-widest uppercase">{release.artist}</p>
                    <p className="font-barlow text-gray-600 text-[10px] tracking-widest uppercase mt-1">{release.date}</p>
                </div>

                {/* Play Row */}
                <div className="px-4 pt-3 pb-4 flex items-center justify-between">
                    <button
                        onClick={() => setPlaying((p) => !p)}
                        className="flex items-center gap-2.5 group/play"
                    >
                        <div className="w-8 h-8 rounded-full border border-red-600 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-black transition-all">
                            {playing ? (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </div>
                        <span className="font-barlow text-white text-[10px] tracking-[0.25em] uppercase group-hover/play:text-red-600 transition-colors">
                            PLAY NOW
                        </span>
                    </button>
                    <span className="text-gray-600 text-[10px] font-mono tracking-widest">{release.duration}</span>
                </div>
            </div>
        </ElectricBorder>
    );
}
