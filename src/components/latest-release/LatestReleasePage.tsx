"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Release, RELEASES } from "@/constants/releases";

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
                        transform: active ? `scaleY(${0.4 + ((i * 7 + 3) % 10) * 0.06})` : "scaleY(0.2)",
                    }}
                />
            ))}
        </div>
    );
}

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
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color }}>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
            ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color }}>
                    <path d="M8 5v14l11-7z" />
                </svg>
            )}
        </button>
    );
}

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

function ReleaseRow({
    release,
    index,
    isActive,
    onActivate,
    showTypeUI,
}: {
    release: Release;
    index: number;
    isActive: boolean;
    onActivate: () => void;
    showTypeUI: boolean;
}) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isUpcoming = !!release.upcoming || release.date === "COMING SOON" || release.date === "TBA";

    // Adjust playing state during rendering if row becomes inactive
    const [prevIsActive, setPrevIsActive] = useState(isActive);
    if (isActive !== prevIsActive) {
        setPrevIsActive(isActive);
        if (!isActive) {
            setPlaying(false);
        }
    }

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
            if (release.link) {
                window.open(release.link, "_blank");
            }
            return;
        }

        if (!isActive) {
            onActivate();
            setPlaying(true);
        } else {
            setPlaying((prev) => !prev);
        }
    };

    return (
        <div
            onClick={onActivate}
            className="group relative cursor-pointer border-b border-white/5 transition-all duration-500 overflow-hidden"
            style={{
                background: isActive
                    ? isUpcoming
                        ? `linear-gradient(90deg, ${release.accent}12 0%, transparent 60%)`
                        : `linear-gradient(90deg, ${release.accent}08 0%, transparent 60%)`
                    : "transparent",
                boxShadow: isUpcoming && isActive ? `inset 0 0 60px ${release.accent}06` : "none",
            }}
        >
            {!isUpcoming && release.audio && (
                <audio ref={audioRef} src={release.audio} onEnded={() => setPlaying(false)} />
            )}

            <div
                className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500"
                style={{
                    background: isActive ? release.accent : "transparent",
                    boxShadow: isActive ? `0 0 12px ${release.accent}` : "none",
                }}
            />

            <div className="flex items-center gap-3 md:gap-6 px-4 md:px-10 py-4 md:py-5">
                <div className="w-8 shrink-0 flex items-center justify-center">
                    {isActive && !isUpcoming ? (
                        <Waveform active={playing} color={release.accent} />
                    ) : (
                        <span className="font-cinzel text-gray-700 text-sm font-black group-hover:opacity-0 transition-opacity">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    )}
                </div>

                <div
                    className="relative w-12 h-12 shrink-0 overflow-hidden"
                    style={
                        isUpcoming
                            ? {
                                  boxShadow: `0 0 ${isActive ? "20px" : "8px"} ${release.accent}${isActive ? "60" : "30"}`,
                                  transition: "box-shadow 0.5s ease",
                              }
                            : {}
                    }
                >
                    <Image
                        src={release.cover}
                        alt={release.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        sizes="48px"
                    />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                        style={{ background: release.accent }}
                    />
                </div>

                <div className="flex-1 min-w-0">
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
                    <p className="font-barlow text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1 truncate">
                        {release.artist}
                    </p>
                </div>

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

                {isUpcoming ? (
                    <LockButton color={release.accent} />
                ) : (
                    <PlayButton playing={playing && isActive} color={release.accent} onToggle={toggle} />
                )}
            </div>

            <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{ maxHeight: isActive ? "1000px" : "0px" }}
            >
                <div className="flex flex-col md:flex-row gap-0 border-t border-white/5">
                    <div
                        className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden"
                        style={isUpcoming ? { animation: "vaakkathFloat 4s ease-in-out infinite" } : {}}
                    >
                        <Image
                            src={release.cover}
                            alt={release.title}
                            fill
                            className="object-cover transition-transform duration-700"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                        <div
                            className="absolute inset-0 mix-blend-multiply opacity-30"
                            style={{ background: `linear-gradient(135deg, ${release.accent}, transparent)` }}
                        />
                        {isUpcoming && (
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at 50% 80%, ${release.accent}30 0%, transparent 70%)`,
                                }}
                            />
                        )}
                    </div>

                    <div
                        className="flex-1 px-6 md:px-8 py-6 md:py-8 flex flex-col justify-between bg-white/2"
                        style={isUpcoming ? { background: `linear-gradient(135deg, ${release.accent}05 0%, transparent 60%)` } : {}}
                    >
                        <div>
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
                            <h3
                                className="font-cinzel text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter text-white mb-2"
                                style={isUpcoming ? { textShadow: `0 0 40px ${release.accent}40` } : {}}
                            >
                                {release.title}
                            </h3>
                            <p className="font-barlow text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: release.accent }}>
                                {release.artist} · {typeof release.tracks === "number" ? `${release.tracks} TRACKS` : release.tracks} · {release.date}
                            </p>
                            <p className="font-grotesk text-gray-400 text-sm leading-relaxed max-w-lg">
                                {release.description}
                            </p>

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
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
                            <button
                                disabled={isUpcoming}
                                onClick={() => release.link && window.open(release.link, "_blank")}
                                className="font-barlow flex items-center justify-center gap-3 px-8 py-4 sm:py-3 text-sm tracking-[0.3em] uppercase font-bold transition-all hover:brightness-90 active:scale-95 text-black w-full sm:w-auto"
                                style={{
                                    background: isUpcoming ? `${release.accent}20` : release.accent,
                                    color: isUpcoming ? release.accent : "black",
                                    border: isUpcoming ? `1px solid ${release.accent}40` : "none",
                                    opacity: isUpcoming ? 0.8 : 1,
                                }}
                            >
                                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                {isUpcoming ? "COMING SOON" : "LISTEN NOW"}
                            </button>

                            {!isUpcoming && (release.link || release.youtubeLink || release.appleMusicLink) && (
                                <div className="flex items-center gap-4 px-2 py-2 sm:py-0 justify-center sm:justify-start">
                                    {release.link && (
                                        <a
                                            href={release.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:scale-110 transition-transform"
                                            style={{ color: release.accent }}
                                            title="Spotify"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.45 17.34c-.21.345-.667.457-1.011.247-2.775-1.694-6.262-2.077-10.375-1.139-.395.09-.785-.157-.875-.552-.09-.395.157-.785.552-.875 4.502-1.029 8.358-.598 11.462 1.303.344.21.456.666.247 1.016zm1.448-3.238c-.266.43-.573.661-1 .395L15 13.5a16.2 16.2 0 0 0-5.475-1.797 16.2 16.2 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.85.85 0 0 1 .65-1.018 17.9 17.9 0 0 1 6.362-.241 17.9 17.9 0 0 1 6.049 1.985c.415.224.57.743.344 1.158zm.092-3.376c-3.418-2.03-9.055-2.217-12.315-1.228-.564.17-1.156-.148-1.326-.712-.17-.564.148-1.156.712-1.326 3.774-1.144 10.013-.923 13.978 1.436.51.305.675.961.37 1.472-.306.51-.962.675-1.42.358z" />
                                            </svg>
                                        </a>
                                    )}
                                    {release.youtubeLink && (
                                        <a
                                            href={release.youtubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:scale-110 transition-transform"
                                            style={{ color: release.accent }}
                                            title="YouTube"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </a>
                                    )}
                                    {release.appleMusicLink && (
                                        <a
                                            href={release.appleMusicLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:scale-110 transition-transform"
                                            style={{ color: release.accent }}
                                            title="Apple Music"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.12.01 2.16-.52 2.82-1.33z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const parseDate = (d: string) => {
    const normalized = d.toUpperCase();
    if (normalized === "COMING SOON" || normalized === "TBA") return Number.MAX_SAFE_INTEGER;
    const cleaned = normalized.replace(/,/g, "");
    const parts = cleaned.split(" ");

    if (parts.length === 3) {
        return new Date(`${parts[0]} ${parts[1]} ${parts[2]}`).getTime();
    }

    if (parts.length === 2) {
        return new Date(`${parts[0]} 1 ${parts[1]}`).getTime();
    }

    return Date.now();
};

const SAB6_TRACKS = [
    { number: 1, title: "SAB6", artists: "Lil PAYYAN, AZWIN" },
    { number: 2, title: "WALLAH!", artists: "Lil PAYYAN, AZWIN" },
    { number: 3, title: "GUCCI THUNI", artists: "Lil PAYYAN, AZWIN" },
    { number: 4, title: "YAMAAL", artists: "Lil PAYYAN, AZWIN" },
    { number: 5, title: "CHORA!", artists: "Lil PAYYAN, AZWIN" },
    { number: 6, title: "OTTA VAAPPA!", artists: "Lil PAYYAN, AZWIN" },
    { number: 7, title: "PAADATH PANI!", artists: "Lil PAYYAN, AZWIN" },
    { number: 8, title: "HAHAHA!", artists: "Lil PAYYAN, AZWIN" },
    { number: 9, title: "MOOTHON", artists: "Lil PAYYAN, AZWIN" },
    { number: 10, title: "HARAM FLEX!", artists: "Lil PAYYAN, AZWIN" },
    { number: 11, title: "QAWM", artists: "Lil PAYYAN, AZWIN" },
    { number: 12, title: "KARAL", artists: "Lil PAYYAN, AZWIN" },
    { number: 13, title: "AAYO?", artists: "Lil PAYYAN, ToxicTeenu" },
    { number: 14, title: "PAARE PAARE", artists: "Lil PAYYAN, AZWIN" },
    { number: 15, title: "NAYINTE MAKLAL", artists: "Lil PAYYAN, ToxicTeenu" },
    { number: 16, title: "NANNAYITTIRIKK", artists: "Lil PAYYAN, AZWIN" }
];

export default function LatestReleasePage() {
    const [active, setActive] = useState<string>(RELEASES[0]?.id ?? "");
    const [prevActive, setPrevActive] = useState<string | null>(null);
    const [currentActive, setCurrentActive] = useState<string>(active);

    if (active !== currentActive) {
        setPrevActive(currentActive);
        setCurrentActive(active);
    }

    const [filter, setFilter] = useState<string>("ALL");
    const [showTracklist, setShowTracklist] = useState<boolean>(false);

    const uniqueTypes = Array.from(new Set(RELEASES.map((r) => r.type).filter(Boolean)));
    const showTypeUI = uniqueTypes.length > 1;
    const FILTERS = ["ALL", ...uniqueTypes];

    const sortedReleases = [...RELEASES].filter((r) => !r.upcoming).sort((a, b) => parseDate(b.date) - parseDate(a.date));
    const filtered = filter === "ALL" ? sortedReleases : sortedReleases.filter((r) => r.type === filter);

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

            <section className="relative h-[45vh] md:h-[55vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    {RELEASES.map((r) => {
                        const isVisible = r.id === active || r.id === prevActive;
                        if (!isVisible) return null;
                        return (
                            <div
                                key={r.id}
                                className="absolute inset-0 transition-opacity duration-1000"
                                style={{ opacity: r.id === active ? 1 : 0 }}
                            >
                                <Image 
                                    src={r.cover} 
                                    alt={r.title} 
                                    fill 
                                    className="object-cover object-top scale-110 blur-sm" 
                                    loading="lazy"
                                    sizes="100vw"
                                />
                            </div>
                        );
                    })}
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

            {/* Upcoming Releases Section */}
            {RELEASES.some((r) => r.upcoming) && (
                <div className="border-b border-white/5 py-12 px-6 md:px-16 lg:px-24 bg-zinc-950/40">
                    <div className="max-w-screen-2xl mx-auto">
                        <p className="font-barlow text-[10px] tracking-[0.4em] text-red-600 uppercase mb-6 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                            COMING SOON
                        </p>
                        <div className="flex flex-col gap-6">
                            {RELEASES.filter((r) => r.upcoming).map((release) => (
                                <div key={release.id} className="flex flex-col md:flex-row items-stretch gap-8 p-6 md:p-8 bg-zinc-900/20 border border-white/5 hover:border-red-600/20 transition-all duration-500">
                                    {/* Left Side: Cover Image */}
                                    <div className="relative w-full md:w-64 h-64 md:h-64 shrink-0 overflow-hidden border border-white/10 shadow-2xl">
                                        <Image
                                            src={release.cover}
                                            alt={release.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 256px"
                                        />
                                    </div>
                                    {/* Right Side: Details */}
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div>
                                            <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                                                <span className="font-barlow text-[10px] font-bold tracking-[0.35em] text-red-500 uppercase px-3 py-1 bg-red-500/10 border border-red-600/20">
                                                    {release.type}
                                                </span>
                                                <div className="flex items-center gap-2 px-3 py-1 border border-red-600/30 bg-red-600/10 rounded-full coming-soon-badge">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                                    <span className="font-barlow text-[9px] tracking-[0.2em] text-red-500 uppercase font-bold">
                                                        COMING SOON
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="font-cinzel text-white text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                                                {release.title}
                                            </h3>
                                            <p className="font-grotesk text-gray-400 text-sm leading-relaxed max-w-xl mb-3">
                                                {release.description}
                                            </p>
                                            <div className="font-barlow text-[11px] tracking-[0.25em] text-red-500/80 uppercase font-bold mb-6 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                                {release.artist}
                                            </div>
                                        </div>                                        {/* Collapsible Tracks List */}
                                        <div className="mt-4">
                                            <button
                                                onClick={() => setShowTracklist(!showTracklist)}
                                                className="font-barlow flex items-center justify-center gap-2.5 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:bg-red-600 hover:text-black border border-red-600/40 text-red-500 bg-transparent rounded-sm"
                                            >
                                                <svg 
                                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${showTracklist ? "rotate-180" : ""}`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                </svg>
                                                {showTracklist ? "HIDE TRACKLIST" : "COMING TRACKS"}
                                            </button>

                                            {showTracklist && (
                                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-600/40 scrollbar-track-transparent">
                                                    {SAB6_TRACKS.map((track) => (
                                                        <div key={track.number} className="flex items-center justify-between p-2.5 bg-zinc-900/60 border border-white/5 hover:border-red-600/10 transition-colors duration-300">
                                                            <div className="flex items-center gap-2 truncate mr-2">
                                                                <span className="font-mono text-[9px] text-gray-500">
                                                                    {String(track.number).padStart(2, "0")}
                                                                </span>
                                                                <span className="font-cinzel text-xs text-white uppercase truncate font-bold">
                                                                    {track.title}
                                                                </span>
                                                            </div>
                                                            <span className="font-barlow text-[7px] md:text-[8px] font-bold tracking-wider px-2.5 py-0.5 border uppercase shrink-0 text-red-400 bg-red-950/20 border-red-600/30">
                                                                {track.artists}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}



            {showTypeUI && (
                <div className="border-b border-white/5 px-6 md:px-16 lg:px-24 sticky top-0 z-40 bg-black/80 backdrop-blur-md">
                    <div className="max-w-screen-2xl mx-auto flex items-center py-2 md:py-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                            <span className="font-barlow text-[8px] md:text-[9px] tracking-[0.4em] text-gray-600 uppercase mr-2 md:mr-4 shrink-0">
                                FILTER
                            </span>
                            {FILTERS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`font-barlow text-[9px] md:text-[10px] tracking-[0.3em] uppercase px-3 md:px-4 py-2 transition-all shrink-0 ${
                                        filter === f ? "text-white border-b-2 border-[#780606]" : "text-gray-600 hover:text-white"
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

            <section className="max-w-screen-2xl mx-auto py-4 md:py-6">
                <div className="hidden md:flex items-center gap-6 px-10 pb-3 border-b border-white/5">
                    <div className="w-8" />
                    <div className="w-12" />
                    <div className="flex-1">
                        <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase">TITLE</span>
                    </div>
                    <div className="flex items-center gap-8 shrink-0">
                        {showTypeUI && (
                            <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase w-16">TYPE</span>
                        )}
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
