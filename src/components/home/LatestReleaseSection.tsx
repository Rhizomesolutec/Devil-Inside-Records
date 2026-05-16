"use client";

import Link from "next/link";
import { useState } from "react";
import { RELEASES } from "@/constants/releases";
import InfiniteMenu from "../InfiniteMenu";

const menuItems = RELEASES.map((release) => ({
    image: release.cover,
    link: release.link ?? "#",
    title: release.title,
    description: release.artist,
}));

export function LatestReleaseSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);

    const active = RELEASES[activeIndex % RELEASES.length];

    return (
        <section className="relative bg-black py-20 px-6 md:px-16 lg:px-24 overflow-hidden min-h-screen">

            <div className="relative z-10 max-w-screen-2xl mx-auto flex flex-col h-full">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <p className="font-barlow text-red-600 tracking-[0.35em] text-[11px] font-bold uppercase mb-4 flex items-center gap-3">
                        <span className="inline-block w-6 h-px bg-red-600" />
                        LATEST DROPS
                        <span className="inline-block w-6 h-px bg-red-600" />
                    </p>
                    <h2 className="font-bebas text-6xl [-webkit-text-stroke:2px_white] text-transparent sm:text-7xl md:text-[6rem] uppercase leading-none tracking-wide mb-5">
                        <span className="text-white bg-red-600 px-2 mr-2.5">
                            LATEST
                        </span>
                        RELEASES
                    </h2>
                    <p className="font-grotesk text-gray-500 text-sm tracking-widest">
                        Fresh sounds from the underground.&nbsp; No limits.&nbsp; No rules.
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-white/50 animate-pulse">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span className="font-barlow text-[11px] tracking-[0.3em] font-bold uppercase">DRAG SPHERE TO EXPLORE</span>
                    </div>
                </div>

                {/* Sphere + Info Panel */}
                <div className="relative w-full h-[450px] md:h-[600px] mt-4 md:mt-0">
                    <InfiniteMenu
                        items={menuItems}
                        scale={2}
                        onActiveItemChange={setActiveIndex}
                        onMovementChange={setIsMoving}
                    />

                    {/* Active Release Info — panel */}
                    <div
                        className={`
              pointer-events-none
              absolute left-0 md:left-6
              top-4 md:top-1/2 md:-translate-y-1/2
              flex flex-col gap-1 md:gap-2 w-full md:max-w-[200px]
              items-center md:items-start text-center md:text-left
              transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
              ${isMoving ? "opacity-0 md:translate-x-4 scale-95 md:scale-100" : "opacity-100 md:translate-x-0 scale-100"}
            `}
                    >
                        <p className="font-barlow text-red-600 text-[10px] md:text-[9px] font-bold tracking-[0.3em] uppercase bg-black/40 md:bg-transparent px-2 md:px-0 py-1 md:py-0 rounded">
                            {active?.type}
                        </p>
                        <h3 className="font-cinzel text-white font-black text-3xl md:text-2xl uppercase leading-tight drop-shadow-lg">
                            {active?.title}
                        </h3>
                        <p className="font-barlow text-gray-300 md:text-gray-400 text-sm md:text-xs tracking-widest uppercase drop-shadow-md">
                            {active?.artist}
                        </p>
                        <p className="font-barlow text-gray-400 md:text-gray-600 text-[11px] md:text-[10px] tracking-widest uppercase mt-1 md:mt-0 drop-shadow-md">
                            {active?.date}
                        </p>
                        <span className="text-gray-400 md:text-gray-500 text-[11px] md:text-[10px] font-mono tracking-widest bg-black/30 md:bg-transparent px-2 md:px-0 py-0.5 rounded drop-shadow-md mt-1 md:mt-0">
                            {active?.duration}
                        </span>
                    </div>
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