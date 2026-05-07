import Image from "next/image";

export function MerchSection() {
    return (
        <section className="relative min-h-[80vh] flex items-center bg-black overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/merch-image.png"
                    alt="Devil Inside Merch"
                    fill
                    className="object-cover object-center lg:object-right opacity-90"
                    priority
                />
                {/* Overlays for cinematic blending */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                {/* Radial glow around text area */}
                <div className="absolute inset-0 bg-radial-[circle_at_25%_50%] from-black/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 w-full py-20">
                <div className="max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Red Crown Icon */}
                    <div className="w-14 h-14 text-[#780606] mb-2 drop-shadow-[0_0_15px_rgba(120,6,6,0.5)]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 19h20M5 19V8l4 4 3-6 3 6 4-4v11" />
                        </svg>
                        {/* Drip effects like in the logo */}
                        <div className="flex justify-center gap-2 mt-[-8px]">
                            <div className="w-px h-3 bg-[#780606] opacity-60" />
                            <div className="w-px h-5 bg-[#780606] opacity-40" />
                            <div className="w-px h-2 bg-[#780606] opacity-50" />
                        </div>
                    </div>

                    <h2 className="font-cinzel text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-4 drop-shadow-2xl">
                        MERCH
                    </h2>

                    <p className="font-barlow text-[#780606] text-lg md:text-xl font-bold tracking-[0.6em] uppercase mb-10 pl-2">
                        COMING SOON
                    </p>

                    {/* Divider with X */}
                    <div className="flex items-center gap-6 w-full max-w-[320px] mb-10 opacity-50">
                        <div className="h-px bg-white/40 flex-1" />
                        <span className="text-[#780606] text-xs font-bold">✕</span>
                        <div className="h-px bg-white/40 flex-1" />
                    </div>

                    <div className="space-y-3">
                        <p className="font-barlow text-gray-300 text-sm md:text-base tracking-[0.4em] uppercase font-medium">
                            REAL MERCH. REAL ENERGY.
                        </p>
                        <p className="font-barlow text-gray-500 text-[10px] md:text-xs tracking-[0.3em] uppercase">
                            STAY TUNED.
                        </p>
                    </div>

                    {/* Subtle glow behind the whole text block */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#780606]/5 blur-[120px] rounded-full pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
