import Image from "next/image";
import { RELEASES } from "@/constants/releases";

export default function LatestReleasePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section className="relative h-[45vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/release-blood-meridian.png"
                        alt="Latest Releases"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black" />
                </div>
                <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-14 max-w-screen-2xl mx-auto w-full">
                    <p className="font-barlow text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">
                        Devil Inside Records
                    </p>
                    <h1 className="font-cinzel text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-white">
                        Latest
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:2px_white]">Releases</span>
                    </h1>
                </div>
            </section>

            {/* Releases */}
            <section className="px-6 md:px-16 lg:px-24 py-20 max-w-screen-2xl mx-auto">
                {/* Filter tabs */}
                <div className="flex flex-wrap gap-3 mb-14">
                    {["All", "Album", "EP", "Single"].map((f) => (
                        <button
                            key={f}
                            className={`font-barlow px-5 py-2 rounded-full text-xs tracking-widest uppercase font-bold transition-all ${f === "All"
                                ? "bg-white text-black"
                                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {RELEASES.map((release, i) => (
                        <ReleaseCard key={release.id} release={release} featured={i === 0} />
                    ))}
                </div>
            </section>
        </div>
    );
}

import { Release } from "@/constants/releases";

function ReleaseCard({
    release,
    featured,
}: {
    release: Release;
    featured?: boolean;
}) {
    return (
        <div
            className={`group relative rounded-2xl overflow-hidden border border-white/5 transition-all hover:border-white/20 cursor-pointer ${featured ? "md:col-span-2" : ""
                }`}
        >
            <div className={`relative flex ${featured ? "flex-col md:flex-row" : "flex-col"}`}>
                {/* Cover */}
                <div
                    className={`relative shrink-0 overflow-hidden ${featured ? "w-full md:w-[340px] h-[260px] md:h-auto" : "w-full h-[220px]"
                        }`}
                >
                    <Image
                        src={release.cover}
                        alt={release.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:bg-linear-to-r md:from-transparent md:to-transparent" />

                    {/* Tag */}
                    <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black tracking-[0.25em] uppercase text-black z-10"
                        style={{ backgroundColor: release.accent }}
                    >
                        {release.tag}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-7 bg-[#0a0a0a] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span
                                className="font-barlow text-[9px] font-black tracking-[0.3em] uppercase px-2.5 py-1 rounded border"
                                style={{ color: release.accent, borderColor: release.accent + "40" }}
                            >
                                {release.type}
                            </span>
                            <span className="font-barlow text-gray-600 text-[11px] tracking-widest">
                                {release.tracks} {release.tracks === 1 ? "TRACK" : "TRACKS"}
                            </span>
                            <span className="text-gray-700">·</span>
                            <span className="font-barlow text-gray-600 text-[11px] tracking-widest">{release.date}</span>
                        </div>

                        <h2 className="font-cinzel text-3xl md:text-4xl font-black uppercase leading-none tracking-tighter text-white mb-1">
                            {release.title}
                        </h2>
                        <p className="font-barlow text-sm text-gray-500 tracking-widest uppercase mb-5">
                            {release.artist}
                        </p>
                        <p className="font-grotesk text-sm text-gray-400 leading-relaxed max-w-md">{release.description}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <button
                            className="font-barlow flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold text-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: release.accent }}
                        >
                            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            LISTEN NOW
                        </button>
                        <button className="font-barlow text-gray-500 hover:text-white transition-colors text-sm tracking-widest uppercase">
                            + Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
