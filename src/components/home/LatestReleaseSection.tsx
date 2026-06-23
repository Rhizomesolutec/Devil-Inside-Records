"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { RELEASES } from "@/constants/releases";
import InfiniteMenu from "../InfiniteMenu";

const menuItems = RELEASES.filter(r => !r.upcoming).map((release) => ({
    image: release.cover,
    link: release.link ?? "#",
    title: release.title,
    description: release.artist,
}));

/* ── Intersection Observer hook for fade-in ── */
function useInView(threshold = 0.2) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, inView };
}

export function LatestReleaseSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const { ref: vaakkathRef, inView: vaakkathInView } = useInView(0.15);

    const activeReleases = RELEASES.filter(r => !r.upcoming);
    const active = activeReleases[activeIndex % activeReleases.length];

    const vaakkath = RELEASES.find(r => r.id === "vaakkath");

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
                    <h2
                        className="font-bebas [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] text-transparent uppercase leading-none tracking-wide mb-5"
                        style={{ fontSize: "clamp(1.8rem, 8.5vw, 6rem)" }}
                    >
                        <span className="text-white bg-red-600 px-1.5 sm:px-2 mr-1.5 sm:mr-2.5">
                            VIEW
                        </span>
                        CATALOGUE
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

                {/* ── VAAKKATH Upcoming Card ── */}
                {vaakkath && (
                    <div
                        ref={vaakkathRef}
                        className="mt-16 relative overflow-hidden transition-all duration-1000"
                        style={{
                            opacity: vaakkathInView ? 1 : 0,
                            transform: vaakkathInView ? "translateY(0)" : "translateY(40px)",
                            border: `1px solid ${vaakkath.accent}25`,
                            background: `linear-gradient(135deg, ${vaakkath.accent}08 0%, #000 50%, ${vaakkath.accent}05 100%)`,
                            boxShadow: vaakkathInView ? `0 0 60px ${vaakkath.accent}15, inset 0 0 60px ${vaakkath.accent}05` : "none",
                        }}
                    >
                        {/* Ambient glow */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div
                                className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[80px] opacity-20"
                                style={{ background: vaakkath.accent }}
                            />
                            <div
                                className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-[60px] opacity-10"
                                style={{ background: vaakkath.accent }}
                            />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-0">
                            {/* LEFT: Cover image */}
                            <div className="relative w-full md:w-48 lg:w-56 shrink-0 overflow-hidden" style={{ minHeight: "200px" }}>
                                <Image
                                    src={vaakkath.cover}
                                    alt={vaakkath.title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 224px"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ background: `linear-gradient(90deg, transparent 60%, ${vaakkath.accent}15 100%)` }}
                                />
                            </div>

                            {/* RIGHT: Info */}
                            <div className="flex-1 px-6 md:px-8 lg:px-10 py-8 flex flex-col justify-center gap-4">
                                {/* Badge */}
                                <div>
                                    <span
                                        id="vaakkath-coming-soon-badge"
                                        className="inline-flex items-center gap-2 font-barlow text-[9px] tracking-[0.4em] uppercase px-4 py-1.5"
                                        style={{
                                            color: vaakkath.accent,
                                            border: `1px solid ${vaakkath.accent}50`,
                                            background: `${vaakkath.accent}12`,
                                            animation: "comingSoonPulse 2s ease-in-out infinite",
                                        }}
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                                            style={{ background: vaakkath.accent }}
                                        />
                                        COMING SOON
                                    </span>
                                </div>

                                {/* Title & Artist */}
                                <div>
                                    <h3
                                        className="font-cinzel font-black uppercase leading-none tracking-tighter"
                                        style={{
                                            fontSize: "clamp(1.8rem, 4vw, 3rem)",
                                            color: vaakkath.accent,
                                            textShadow: `0 0 30px ${vaakkath.accent}40`,
                                        }}
                                    >
                                        {vaakkath.title}
                                    </h3>
                                    <p className="font-barlow text-gray-400 text-[10px] tracking-[0.4em] uppercase mt-2">
                                        {vaakkath.artist}
                                    </p>
                                </div>

                                {/* Genre tags */}
                                <div className="flex flex-wrap gap-2">
                                    {["Dark Cinematic", "Alternative", "Experimental"].map(g => (
                                        <span
                                            key={g}
                                            className="font-barlow text-[8px] tracking-[0.3em] uppercase px-3 py-1"
                                            style={{
                                                color: `${vaakkath.accent}90`,
                                                border: `1px solid ${vaakkath.accent}25`,
                                            }}
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="font-grotesk text-gray-500 text-xs leading-relaxed max-w-lg hidden md:block">
                                    {vaakkath.description}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/latest-release"
                                        className="font-barlow text-[10px] tracking-[0.3em] uppercase px-6 py-3 transition-all duration-300 hover:brightness-110"
                                        style={{
                                            color: "black",
                                            background: vaakkath.accent,
                                            fontWeight: 700,
                                        }}
                                    >
                                        VIEW DETAILS
                                    </Link>
                                    <span className="font-barlow text-gray-600 text-[9px] tracking-widest uppercase">
                                        Release date TBA
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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

            <style>{`
                @keyframes comingSoonPulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 8px #F5C51840; }
                    50% { opacity: 0.75; box-shadow: 0 0 20px #F5C51870; }
                }
            `}</style>
        </section>
    );
}