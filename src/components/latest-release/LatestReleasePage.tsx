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

<<<<<<< HEAD
/* ── Lock Button for Upcoming releases ── */
function LockButton({ color }: { color: string }) {
    return (
        <div
            className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-not-allowed opacity-60"
            style={{ border: `1.5px solid ${color}40` }}
            title="Release date will be announced soon."
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color }}>
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
        </div>
    );
}

=======
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
/* ── Individual Release Row ── */
function ReleaseRow({ release, index, isActive, onActivate, showTypeUI }: {
    release: Release;
    index: number;
    isActive: boolean;
    onActivate: () => void;
    showTypeUI: boolean;
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
<<<<<<< HEAD
=======
            // Start playing immediately when activated
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
            setPlaying(true);
        } else {
            setPlaying((p) => !p);
        }
    };

<<<<<<< HEAD
    const isUpcoming = !!release.upcoming;

=======
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
    return (
        <div
            onClick={onActivate}
            className="group relative cursor-pointer border-b border-white/5 transition-all duration-500 overflow-hidden"
            style={{
                background: isActive
<<<<<<< HEAD
                    ? isUpcoming
                        ? `linear-gradient(90deg, ${release.accent}12 0%, transparent 60%)`
                        : `linear-gradient(90deg, ${release.accent}08 0%, transparent 60%)`
                    : "transparent",
                boxShadow: isUpcoming && isActive
                    ? `inset 0 0 60px ${release.accent}06`
                    : "none",
            }}
        >
            {!isUpcoming && release.audio && <audio ref={audioRef} src={release.audio} onEnded={() => setPlaying(false)} />}
=======
                    ? `linear-gradient(90deg, ${release.accent}08 0%, transparent 60%)`
                    : "transparent",
            }}
        >
            {release.audio && <audio ref={audioRef} src={release.audio} onEnded={() => setPlaying(false)} />}
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8

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
<<<<<<< HEAD
                    {isActive && !isUpcoming ? (
=======
                    {isActive ? (
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
                        <Waveform active={playing} color={release.accent} />
                    ) : (
                        <span className="font-cinzel text-gray-700 text-sm font-black group-hover:opacity-0 transition-opacity">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    )}
                </div>

                {/* Cover Thumb */}
<<<<<<< HEAD
                <div
                    className="relative w-12 h-12 shrink-0 overflow-hidden"
                    style={isUpcoming ? {
                        boxShadow: `0 0 ${isActive ? "20px" : "8px"} ${release.accent}${isActive ? "60" : "30"}`,
                        transition: "box-shadow 0.5s ease"
                    } : {}}
                >
=======
                <div className="relative w-12 h-12 shrink-0 overflow-hidden">
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
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
<<<<<<< HEAD
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2
                            className="font-cinzel text-base md:text-lg font-black uppercase leading-none tracking-tighter truncate transition-colors duration-300"
                            style={{ color: isActive ? release.accent : isUpcoming ? "rgba(245,197,24,0.85)" : "white" }}
                        >
                            {release.title}
                        </h2>
                        {isUpcoming && (
                            <span
                                className="inline-flex items-center font-barlow text-[7px] tracking-[0.3em] uppercase px-2 py-0.5 shrink-0 coming-soon-badge"
                                style={{
                                    color: release.accent,
                                    border: `1px solid ${release.accent}60`,
                                    background: `${release.accent}12`,
                                }}
                            >
                                COMING SOON
                            </span>
                        )}
                    </div>
=======
                    <h2
                        className="font-cinzel text-base md:text-lg font-black uppercase leading-none tracking-tighter truncate transition-colors duration-300"
                        style={{ color: isActive ? release.accent : "white" }}
                    >
                        {release.title}
                    </h2>
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
                    <p className="font-barlow text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1">
                        {release.artist}
                    </p>
                </div>

                {/* Type / Date — hidden on mobile */}
                <div className="hidden md:flex items-center gap-8 shrink-0">
                    {showTypeUI && (
                        <span
                            className="font-barlow text-[9px] tracking-[0.3em] uppercase px-3 py-1 border"
                            style={{ color: release.accent, borderColor: `${release.accent}40` }}
                        >
                            {release.type}
                        </span>
                    )}
                    <span className="font-barlow text-gray-600 text-[10px] tracking-widest w-28 text-right">
                        {release.date}
                    </span>
                    <span className="font-barlow text-gray-600 text-[10px] tracking-widest w-10 text-right">
                        {release.duration}
                    </span>
                </div>

<<<<<<< HEAD
                {/* Play button / Lock button */}
                {isUpcoming ? (
                    <LockButton color={release.accent} />
                ) : (
                    <PlayButton playing={playing && isActive} color={release.accent} onToggle={toggle} />
                )}
=======
                {/* Play button */}
                <PlayButton playing={playing && isActive} color={release.accent} onToggle={toggle} />
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
            </div>

            {/* ── Expanded Panel (when active) ── */}
            <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{ maxHeight: isActive ? "1000px" : "0px" }}
            >
                <div className="flex flex-col md:flex-row gap-0 border-t border-white/5">
                    {/* Large cover */}
<<<<<<< HEAD
                    <div
                        className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden"
                        style={isUpcoming ? { animation: "vaakkathFloat 4s ease-in-out infinite" } : {}}
                    >
=======
                    <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0">
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
                        <Image
                            src={release.cover}
                            alt={release.title}
                            fill
<<<<<<< HEAD
                            className={`object-cover transition-transform duration-700 ${isUpcoming ? "hover:scale-105" : ""}`}
=======
                            className="object-cover"
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
                        />
                        {/* Accent glow overlay */}
                        <div
                            className="absolute inset-0 mix-blend-multiply opacity-30"
                            style={{ background: `linear-gradient(135deg, ${release.accent}, transparent)` }}
                        />
<<<<<<< HEAD
                        {isUpcoming && (
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at 50% 80%, ${release.accent}30 0%, transparent 70%)`,
                                }}
                            />
                        )}
                    </div>

                    {/* Info panel */}
                    <div className="flex-1 px-6 md:px-8 py-6 md:py-8 flex flex-col justify-between bg-white/2"
                        style={isUpcoming ? {
                            background: `linear-gradient(135deg, ${release.accent}05 0%, transparent 60%)`
                        } : {}}>
                        <div>
                            {/* Big tag */}
                            <div
                                className={`inline-block font-barlow text-[9px] tracking-[0.5em] uppercase px-4 py-1.5 mb-5 ${isUpcoming ? "coming-soon-badge" : ""}`}
                                style={{
                                    background: `${release.accent}20`,
                                    color: release.accent,
                                    border: `1px solid ${release.accent}40`,
                                    boxShadow: isUpcoming ? `0 0 20px ${release.accent}30` : "none",
                                }}
                            >
                                {release.tag}
                            </div>
                            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter text-white mb-2"
                                style={isUpcoming ? { textShadow: `0 0 40px ${release.accent}40` } : {}}>
                                {release.title}
                            </h3>
                            <p className="font-barlow text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: release.accent }}>
                                {release.artist} · {typeof release.tracks === "number" ? `${release.tracks} TRACKS` : release.tracks} · {release.date}
=======
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
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
                            </p>
                            <p className="font-grotesk text-gray-400 text-sm leading-relaxed max-w-lg">
                                {release.description}
                            </p>
<<<<<<< HEAD

                            {isUpcoming && (
                                <div className="mt-4 flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full animate-pulse"
                                        style={{ background: release.accent, boxShadow: `0 0 8px ${release.accent}` }}
                                    />
                                    <p className="font-barlow text-[9px] tracking-[0.4em] uppercase" style={{ color: `${release.accent}80` }}>
                                        Dark Cinematic · Alternative · Experimental
                                    </p>
                                </div>
                            )}
=======
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
                        </div>

                        {/* CTA row */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
<<<<<<< HEAD
                            {isUpcoming ? (
                                <div className="relative group/btn w-full sm:w-auto">
                                    <button
                                        disabled
                                        className="font-barlow flex items-center justify-center gap-3 px-8 py-4 sm:py-3 text-sm tracking-[0.3em] uppercase font-bold w-full sm:w-auto cursor-not-allowed opacity-60"
                                        style={{
                                            background: `${release.accent}20`,
                                            color: release.accent,
                                            border: `1px solid ${release.accent}40`,
                                        }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                        </svg>
                                        COMING SOON
                                    </button>
                                    <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                                        <span className="font-barlow text-[8px] tracking-widest uppercase" style={{ color: `${release.accent}80` }}>
                                            Release date will be announced soon.
                                        </span>
                                    </div>
                                </div>
                            ) : (
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
                            )}
=======
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
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
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

    const uniqueTypes = Array.from(new Set(RELEASES.map((r) => r.type).filter(Boolean)));
    const showTypeUI = uniqueTypes.length > 1;
    const FILTERS = ["ALL", ...uniqueTypes];
<<<<<<< HEAD

    const parseDate = (d: string) => {
        if (d === "COMING SOON" || d === "TBA") return Number.MAX_SAFE_INTEGER;
=======
    
    const parseDate = (d: string) => {
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
        const cleaned = d.replace(/,/g, "");
        const parts = cleaned.split(" ");
        const dateStr = parts.length === 3 ? `${parts[0]} ${parts[1]} ${parts[2]}` : `${parts[0]} 1 ${parts[1]}`;
        return new Date(dateStr).getTime();
    };
    const sortedReleases = [...RELEASES].sort((a, b) => parseDate(b.date) - parseDate(a.date));
    const filtered = filter === "ALL" ? sortedReleases : sortedReleases.filter((r) => r.type === filter);

<<<<<<< HEAD
    const vaakkath = RELEASES.find(r => r.id === "vaakkath");

    return (
        <div className="min-h-screen bg-black text-white">

            <style>{`
                @keyframes vaakkathFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes vaakkathGlow {
                    0%, 100% { box-shadow: 0 0 20px #F5C51840, 0 0 40px #F5C51820; }
                    50% { box-shadow: 0 0 40px #F5C51860, 0 0 80px #F5C51830; }
                }
                @keyframes comingSoonPulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 8px #F5C51840; }
                    50% { opacity: 0.7; box-shadow: 0 0 20px #F5C51870; }
                }
                .coming-soon-badge {
                    animation: comingSoonPulse 2s ease-in-out infinite;
                }
                .vaakkath-cover-glow {
                    animation: vaakkathGlow 3s ease-in-out infinite;
                }
                .vaakkath-float {
                    animation: vaakkathFloat 4s ease-in-out infinite;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in-up {
                    animation: fadeInUp 0.7s ease-out forwards;
                }
                .fade-in-up-delay-1 { animation-delay: 0.1s; opacity: 0; }
                .fade-in-up-delay-2 { animation-delay: 0.2s; opacity: 0; }
                .fade-in-up-delay-3 { animation-delay: 0.35s; opacity: 0; }
                .fade-in-up-delay-4 { animation-delay: 0.5s; opacity: 0; }
            `}</style>

=======
    return (
        <div className="min-h-screen bg-black text-white">

>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
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

<<<<<<< HEAD
            {/* ── VAAKKATH Featured Section ── */}
            {vaakkath && (
                <section className="relative overflow-hidden border-t border-b" style={{
                    borderColor: `${vaakkath.accent}20`,
                    background: `linear-gradient(135deg, ${vaakkath.accent}06 0%, #000 50%, ${vaakkath.accent}04 100%)`,
                }}>
                    {/* Background glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-[100px]"
                            style={{ background: vaakkath.accent }} />
                        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-[80px]"
                            style={{ background: vaakkath.accent }} />
                    </div>

                    <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24">
                        {/* Section eyebrow */}
                        <p className="font-barlow text-[10px] tracking-[0.5em] uppercase mb-10 flex items-center gap-3 fade-in-up fade-in-up-delay-1"
                            style={{ color: `${vaakkath.accent}80` }}>
                            <span className="w-6 h-px" style={{ background: vaakkath.accent }} />
                            UPCOMING RELEASE
                            <span className="w-6 h-px" style={{ background: vaakkath.accent }} />
                        </p>

                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start">
                            {/* LEFT: Album artwork */}
                            <div className="flex-shrink-0 w-full max-w-[300px] md:max-w-[380px] lg:max-w-[420px] fade-in-up fade-in-up-delay-1">
                                <div
                                    className="relative aspect-square overflow-hidden vaakkath-float vaakkath-cover-glow"
                                    style={{ borderRadius: "2px" }}
                                >
                                    <Image
                                        src={vaakkath.cover}
                                        alt={vaakkath.title}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        sizes="(max-width: 768px) 90vw, 420px"
                                        priority
                                    />
                                    {/* Gold gradient overlay */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: `linear-gradient(180deg, transparent 50%, ${vaakkath.accent}20 100%)` }} />
                                </div>
                            </div>

                            {/* RIGHT: Info */}
                            <div className="flex-1 flex flex-col gap-6 max-w-xl">
                                {/* COMING SOON badge */}
                                <div className="fade-in-up fade-in-up-delay-2">
                                    <span
                                        className="inline-flex items-center gap-2 font-barlow text-[10px] tracking-[0.5em] uppercase px-5 py-2 coming-soon-badge"
                                        style={{
                                            color: vaakkath.accent,
                                            border: `1px solid ${vaakkath.accent}50`,
                                            background: `${vaakkath.accent}15`,
                                        }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: vaakkath.accent }} />
                                        COMING SOON
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="fade-in-up fade-in-up-delay-2">
                                    <h2
                                        className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter"
                                        style={{
                                            color: vaakkath.accent,
                                            textShadow: `0 0 60px ${vaakkath.accent}50`,
                                        }}
                                    >
                                        {vaakkath.title}
                                    </h2>
                                </div>

                                {/* Artist */}
                                <div className="fade-in-up fade-in-up-delay-3">
                                    <p className="font-barlow text-white text-sm tracking-[0.4em] uppercase">
                                        {vaakkath.artist}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="w-16 h-px fade-in-up fade-in-up-delay-3" style={{ background: `${vaakkath.accent}60` }} />

                                {/* Metadata grid */}
                                <div className="grid grid-cols-2 gap-4 fade-in-up fade-in-up-delay-3">
                                    {[
                                        { label: "RELEASE DATE", value: "Coming Soon" },
                                        { label: "GENRE", value: "Dark Cinematic / Alternative" },
                                        { label: "TRACKS", value: vaakkath.duration },
                                        { label: "LABEL", value: "Devil Inside Records" },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <p className="font-barlow text-[8px] tracking-[0.5em] uppercase mb-1" style={{ color: `${vaakkath.accent}60` }}>
                                                {item.label}
                                            </p>
                                            <p className="font-cinzel text-white text-sm font-bold tracking-wide uppercase">
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="font-grotesk text-gray-400 text-sm leading-relaxed fade-in-up fade-in-up-delay-3">
                                    {vaakkath.description}
                                </p>

                                {/* CTA */}
                                <div className="fade-in-up fade-in-up-delay-4">
                                    <div className="relative group/cta inline-block">
                                        <button
                                            disabled
                                            className="font-barlow flex items-center gap-3 px-10 py-4 text-sm tracking-[0.3em] uppercase font-bold cursor-not-allowed transition-all duration-300"
                                            style={{
                                                color: vaakkath.accent,
                                                border: `1px solid ${vaakkath.accent}40`,
                                                background: `${vaakkath.accent}10`,
                                                opacity: 0.8,
                                            }}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                            </svg>
                                            COMING SOON
                                        </button>
                                        <p
                                            className="mt-2 font-barlow text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                                            style={{ color: `${vaakkath.accent}70` }}
                                        >
                                            Release date will be announced soon.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

=======
>>>>>>> c0fae7d4f9bfd3157e102f4e495b5ba8172f7fb8
            {/* ── Filter Bar ── */}
            {showTypeUI && (
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
            )}

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
                        {showTypeUI && <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase w-16">TYPE</span>}
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
                            showTypeUI={showTypeUI}
                        />
                    ))
                )}
            </section>
        </div>
    );
}
