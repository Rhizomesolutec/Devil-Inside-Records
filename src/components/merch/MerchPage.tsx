"use client";
import Image from "next/image";

const CATEGORIES = ["ALL", "HOODIES", "TEES", "HEADWEAR", "ACCESSORIES"];

export default function MerchPage() {
    return (
        <main className="min-h-screen bg-black text-white">

            {/* ── Hero Banner ── */}
            <div className="relative min-h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/merch-image.png"
                        alt="Devil Inside Merch"
                        fill
                        className="object-cover object-center scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-screen-2xl mx-auto w-full px-6 md:px-16 lg:px-24 pb-20 pt-40">
                    <p className="font-barlow text-[#780606] text-[10px] tracking-[0.5em] uppercase mb-6 flex items-center gap-3">
                        <span className="w-6 h-px bg-[#780606]" />
                        DEVIL INSIDE RECORDS
                    </p>
                    <h1 className="font-cinzel text-7xl md:text-9xl font-black text-white leading-[0.88] tracking-tighter mb-4">
                        MERCH
                    </h1>
                    <p className="font-barlow text-[#780606] text-lg md:text-xl tracking-[0.6em] uppercase font-bold">
                        COMING SOON
                    </p>
                </div>
            </div>

            {/* ── Coming Soon Body ── */}
            <div className="relative py-28 px-6 md:px-16 lg:px-24 overflow-hidden">
                {/* Background glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] blur-[160px] pointer-events-none opacity-10"
                    style={{ background: "radial-gradient(ellipse at center, #780606 0%, transparent 70%)" }}
                />

                <div className="relative z-10 max-w-screen-2xl mx-auto">

                    {/* Filter tabs (visual only for now) */}
                    <div className="flex flex-wrap gap-3 mb-16">
                        {CATEGORIES.map((cat, i) => (
                            <button
                                key={cat}
                                className={`font-barlow text-[10px] tracking-[0.4em] uppercase px-6 py-2.5 border transition-all ${
                                    i === 0
                                        ? "border-[#780606] text-white bg-[#780606]/10"
                                        : "border-white/10 text-gray-600 hover:border-white/30 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Placeholder product grid — "Coming Soon" tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <MerchPlaceholderCard key={i} index={i} />
                        ))}
                    </div>

                    {/* Notify Me CTA */}
                    {/* <div className="max-w-xl mx-auto text-center flex flex-col items-center border-t border-white/5 pt-20">
                        <div className="w-12 h-12 text-[#780606] mb-6">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 19h20M5 19V8l4 4 3-6 3 6 4-4v11" />
                            </svg>
                        </div>
                        <h2 className="font-cinzel text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                            BE THE FIRST.
                        </h2>
                        <p className="font-grotesk text-gray-500 text-sm leading-relaxed mb-10">
                            The drop is coming. Drop your email and we'll hit you when the merch goes live. 
                            No spam. Just fire.
                        </p>
                        <div className="flex w-full max-w-md gap-0">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-transparent border border-white/10 border-r-0 text-white font-grotesk text-sm px-5 py-4 focus:outline-none focus:border-[#780606] transition-colors placeholder:text-gray-700"
                            />
                            <button className="font-barlow bg-[#780606] text-white text-xs tracking-[0.35em] uppercase px-6 py-4 hover:bg-red-800 transition-colors shrink-0">
                                NOTIFY ME
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </main>
    );
}

function MerchPlaceholderCard({ index }: { index: number }) {
    const labels = [
        "DEVIL INSIDE HOODIE", "CROWN TEE", "UNDERGROUND CAP",
        "LOGO HOODIE", "REAPER JACKET", "SIGNATURE TEE",
        "CHAIN ACCESSORY", "BLACK EDITION CAP"
    ];
    const types = ["HOODIE", "TEE", "CAP", "HOODIE", "JACKET", "TEE", "ACCESSORY", "CAP"];

    return (
        <div className="group relative flex flex-col border border-white/5 hover:border-white/15 transition-all duration-300">
            {/* Placeholder image area */}
            <div className="relative aspect-square bg-zinc-950 overflow-hidden flex items-center justify-center">
                {/* Pattern background */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                        backgroundSize: "10px 10px"
                    }}
                />
                {/* Coming soon overlay */}
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-10 h-10 text-[#780606]/40">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 19h20M5 19V8l4 4 3-6 3 6 4-4v11" />
                        </svg>
                    </div>
                    <span className="font-barlow text-[8px] tracking-[0.4em] uppercase text-white/10">COMING SOON</span>
                </div>

                {/* Hover reveal */}
                <div className="absolute inset-0 bg-[#780606]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <div className="px-4 py-4 bg-black">
                <p className="font-barlow text-[8px] tracking-[0.35em] uppercase text-[#780606] mb-1.5">{types[index]}</p>
                <h3 className="font-cinzel text-white text-sm font-bold uppercase tracking-tight leading-tight">
                    {labels[index]}
                </h3>
                <p className="font-grotesk text-gray-700 text-xs mt-2 tracking-wide">— —</p>
            </div>
        </div>
    );
}
