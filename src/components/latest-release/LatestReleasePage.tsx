"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { RELEASES, Release } from "@/constants/releases";

/* ── Animated Waveform Icon ── */
function Waveform({ active, color }: { active: boolean; color: string }) {
    const bars = [3, 7, 5, 9, 6, 4, 8, 5, 3, 7];
    return (
        <div className="flex items-end gap-[2px] h-5 w-8">
            {bars.map((h, i) => (
                <div
                    key={i}
                    className="w-[2px] rounded-full transition-all"
                    style={{
                        height: active ? `${(h / 10) * 100}%` : "20%",
                        backgroundColor: active ? color : "#374151",
                        animationDelay: `${i * 80}ms`,
                        animation: active ? `pulse 0.8s ease-in-out ${i * 80}ms infinite alternate` : "none",
                        transform: active ? `scaleY(${0.4 + Math.random() * 0.6})` : "scaleY(0.2)",
                    }}
                />
            ))}
        </div>
    );
}

/* ── Play / Pause Button ── */
function PlayButton({ playing, color, onToggle }: { playing: boolean; color: string; onToggle: (e: React.MouseEvent) => void }) {
    return (
        <button
            onClick={onToggle}
            className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 group"
            style={{ border: `1.5px solid ${color}40` }}
        >
            <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ background: color }}
            />
            {playing ? (
                /* Pause icon */
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color }}>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
            ) : (
                /* Play icon */
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color }}>
                    <path d="M8 5v14l11-7z" />
                </svg>
            )}
        </button>
    );
}

/* ── Individual Release Row ── */
function ReleaseRow({ release, index, isActive, onActivate }: {
    release: Release;
    index: number;
    isActive: boolean;
    onActivate: () => void;
}) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Stop playing if this row becomes inactive
    useEffect(() => {
        if (!isActive) {
            setPlaying(false);
        }
    }, [isActive]);

    // Handle audio play/pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (playing && isActive) {
            audioRef.current.play().catch((err) => {
                console.error("Audio playback failed:", err);
                setPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [playing, isActive]);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!release.audio) {
            window.open(release.link, "_blank");
            return;
        }
        if (!isActive) {
            onActivate();
            // Start playing immediately when activated
            setPlaying(true);
        } else {
            setPlaying((p) => !p);
        }
    };

    return (
        <div
            onClick={onActivate}
            className="group relative cursor-pointer border-b border-white/5 transition-all duration-500 overflow-hidden"
            style={{
                background: isActive
                    ? `linear-gradient(90deg, ${release.accent}08 0%, transparent 60%)`
                    : "transparent",
            }}
        >
            {release.audio && <audio ref={audioRef} src={release.audio} onEnded={() => setPlaying(false)} />}

            {/* Active left bar */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500"
                style={{
                    background: isActive ? release.accent : "transparent",
                    boxShadow: isActive ? `0 0 12px ${release.accent}` : "none",
                }}
            />

            {/* ── Collapsed Row ── */}
            <div className="flex items-center gap-3 md:gap-6 px-4 md:px-10 py-4 md:py-5">
                {/* Track number / waveform */}
                <div className="w-8 shrink-0 flex items-center justify-center">
                    {isActive ? (
                        <Waveform active={playing} color={release.accent} />
                    ) : (
                        <span className="font-cinzel text-gray-700 text-sm font-black group-hover:opacity-0 transition-opacity">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    )}
                </div>

                {/* Cover Thumb */}
                <div className="relative w-12 h-12 shrink-0 overflow-hidden">
                    <Image
                        src={release.cover}
                        alt={release.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                        style={{ background: release.accent }}
                    />
                </div>

                {/* Title / Artist */}
                <div className="flex-1 min-w-0">
                    <h2
                        className="font-cinzel text-base md:text-lg font-black uppercase leading-none tracking-tighter truncate transition-colors duration-300"
                        style={{ color: isActive ? release.accent : "white" }}
                    >
                        {release.title}
                    </h2>
                    <p className="font-barlow text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1">
                        {release.artist}
                    </p>
                </div>

                {/* Type / Date — hidden on mobile */}
                <div className="hidden md:flex items-center gap-8 shrink-0">
                    <span
                        className="font-barlow text-[9px] tracking-[0.3em] uppercase px-3 py-1 border"
                        style={{ color: release.accent, borderColor: `${release.accent}40` }}
                    >
                        {release.type}
                    </span>
                    <span className="font-barlow text-gray-600 text-[10px] tracking-widest w-28 text-right">
                        {release.date}
                    </span>
                    <span className="font-barlow text-gray-600 text-[10px] tracking-widest w-10 text-right">
                        {release.duration}
                    </span>
                </div>

                {/* Play button */}
                <PlayButton playing={playing && isActive} color={release.accent} onToggle={toggle} />
            </div>

            {/* ── Expanded Panel (when active) ── */}
            <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{ maxHeight: isActive ? "1000px" : "0px" }}
            >
                <div className="flex flex-col md:flex-row gap-0 border-t border-white/5">
                    {/* Large cover */}
                    <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0">
                        <Image
                            src={release.cover}
                            alt={release.title}
                            fill
                            className="object-cover"
                        />
                        {/* Accent glow overlay */}
                        <div
                            className="absolute inset-0 mix-blend-multiply opacity-30"
                            style={{ background: `linear-gradient(135deg, ${release.accent}, transparent)` }}
                        />
                    </div>

                    {/* Info panel */}
                    <div className="flex-1 px-6 md:px-8 py-6 md:py-8 flex flex-col justify-between bg-white/2">
                        <div>
                            {/* Big tag */}
                            <div
                                className="inline-block font-barlow text-[9px] tracking-[0.5em] uppercase px-4 py-1.5 mb-5"
                                style={{ background: `${release.accent}20`, color: release.accent, border: `1px solid ${release.accent}40` }}
                            >
                                {release.tag}
                            </div>
                            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter text-white mb-2">
                                {release.title}
                            </h3>
                            <p className="font-barlow text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: release.accent }}>
                                {release.artist} · {release.tracks} TRACKS · {release.date}
                            </p>
                            <p className="font-grotesk text-gray-400 text-sm leading-relaxed max-w-lg">
                                {release.description}
                            </p>
                        </div>

                        {/* CTA row */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
                            <button
                                onClick={() => window.open(release.link, "_blank")}
                                className="font-barlow flex items-center justify-center gap-3 px-8 py-4 sm:py-3 text-sm tracking-[0.3em] uppercase font-bold transition-all hover:brightness-90 active:scale-95 text-black w-full sm:w-auto"
                                style={{ background: release.accent }}
                            >
                                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                LISTEN NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Page ── */
export default function LatestReleasePage() {
    const [active, setActive] = useState<string>(RELEASES[0].id);
    const [filter, setFilter] = useState<string>("ALL");

    const FILTERS = ["ALL", "ALBUM", "EP", "SINGLE"];
    const filtered = filter === "ALL" ? RELEASES : RELEASES.filter((r) => r.type === filter);

    return (
        <div className="min-h-screen bg-black text-white">

            {/* ── Cinematic Header ── */}
            <section className="relative h-[45vh] md:h-[55vh] flex items-end overflow-hidden">
                {/* Background: blurred mix of all covers */}
                <div className="absolute inset-0">
                    {RELEASES.map((r, i) => (
                        <div
                            key={r.id}
                            className="absolute inset-0 transition-opacity duration-1000"
                            style={{ opacity: r.id === active ? 1 : 0 }}
                        >
                            <Image src={r.cover} alt={r.title} fill className="object-cover object-top scale-110 blur-sm" />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black" />
                </div>

                <div className="relative z-10 px-6 md:px-16 lg:px-24 pb-10 md:pb-14 max-w-screen-2xl mx-auto w-full">
                    <p className="font-barlow text-[9px] md:text-[10px] tracking-[0.5em] text-gray-500 uppercase mb-4 md:mb-5 flex items-center gap-3">
                        <span className="w-6 h-px bg-[#780606]" />
                        DEVIL INSIDE RECORDS
                    </p>
                    <h1 className="font-cinzel text-4xl sm:text-5xl md:text-[7rem] lg:text-[7rem] font-black uppercase leading-[0.9] tracking-tighter">
                        LATEST
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">RELEASES</span>
                    </h1>
                </div>
            </section>

            {/* ── Filter Bar ── */}
            <div className="border-b border-white/5 px-6 md:px-16 lg:px-24 sticky top-0 z-40 bg-black/80 backdrop-blur-md">
                <div className="max-w-screen-2xl mx-auto flex items-center py-2 md:py-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                        <span className="font-barlow text-[8px] md:text-[9px] tracking-[0.4em] text-gray-600 uppercase mr-2 md:mr-4 shrink-0">FILTER</span>
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`font-barlow text-[9px] md:text-[10px] tracking-[0.3em] uppercase px-3 md:px-4 py-2 transition-all shrink-0 ${
                                    filter === f
                                        ? "text-white border-b-2 border-[#780606]"
                                        : "text-gray-600 hover:text-white"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <span className="ml-auto font-barlow text-[8px] md:text-[9px] tracking-widest text-gray-700 uppercase hidden sm:block">
                        {filtered.length} RELEASES
                    </span>
                </div>
            </div>

            {/* ── Track List ── */}
            <section className="max-w-screen-2xl mx-auto py-4 md:py-6">
                {/* Column headers */}
                <div className="hidden md:flex items-center gap-6 px-10 pb-3 border-b border-white/5">
                    <div className="w-8" />
                    <div className="w-12" />
                    <div className="flex-1">
                        <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase">TITLE</span>
                    </div>
                    <div className="flex items-center gap-8 shrink-0">
                        <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase w-16">TYPE</span>
                        <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase w-28 text-right">DATE</span>
                        <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase w-10 text-right">TIME</span>
                    </div>
                    <div className="w-12" />
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-700">
                        <p className="font-bebas text-5xl tracking-widest mb-2">NO RELEASES</p>
                        <p className="font-barlow text-xs tracking-widest uppercase">Try a different filter</p>
                    </div>
                ) : (
                    filtered.map((release, i) => (
                        <ReleaseRow
                            key={release.id}
                            release={release}
                            index={i}
                            isActive={active === release.id}
                            onActivate={() => setActive(release.id)}
                        />
                    ))
                )}
            </section>
        </div>
    );
}
