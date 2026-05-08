"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_STATS, ABOUT_FEATURES } from "@/constants/about";
import { fadeUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";

export default function AboutPage() {
    const featureIcons = {
        vision: <GlobeIcon />,
        rules: <XIcon />,
        artists: <MicIcon />,
        different: <BoltIcon />,
    };

    return (
        <main className="min-h-screen bg-black text-white relative pt-24 pb-20 overflow-hidden">
            {/* Background Image */}
            <motion.div
                className="absolute top-0 right-0 w-full h-full md:w-3/5 lg:w-1/2 pointer-events-none z-0"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <Image
                    src="/about-bg-img.png"
                    alt="Devil Inside Angel"
                    fill
                    className="object-cover object-center md:object-right opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            </motion.div>

            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header Section */}
                <motion.div
                    className="max-w-3xl"
                    variants={staggerContainer(0.12, 0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p variants={fadeUp} className="text-[#780606] text-xs tracking-[0.4em] font-bold uppercase mb-8">
                        ABOUT US
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className="font-cinzel text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tighter mb-12 relative"
                    >
                        DEVIL INSIDE<br />
                        IS A <span className="relative inline-block">
                            MOVEMENT.
                            <div className="absolute -top-12 -right-8 w-16 h-16 text-[#780606] rotate-12 opacity-80 hidden md:block">
                                <CrownIcon />
                            </div>
                            <svg className="absolute -bottom-1 -left-2 w-[105%] h-8 text-[#780606] opacity-70" viewBox="0 0 300 30" preserveAspectRatio="none">
                                <path d="M10,20 Q150,5 290,20 T580,20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
                                <path d="M5,15 C50,5 250,5 295,15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.div variants={staggerContainer(0.08)} className="space-y-6 text-gray-400 font-grotesk text-[14px] leading-relaxed max-w-xl">
                        <motion.p variants={fadeUp} className="text-[#780606] font-bold tracking-widest text-[10px]">
                            + WE EXIST FOR THE UNDERGROUND.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Devil Inside is more than a name. It's a home for the misfits, the dreamers, and the real ones.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            We host the next generation of rap artists who don't follow the industry - they destroy it and build their own lane.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Raw sound. Real stories. No limits.
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-[#780606] italic">
                            This is just the beginning.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-24 pt-12 border-t border-white/10"
                    variants={staggerContainer(0.12, 0.2)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {ABOUT_FEATURES.map((f) => (
                        <motion.div key={f.id} variants={staggerItem}>
                            <Feature
                                icon={featureIcons[f.id as keyof typeof featureIcons]}
                                title={f.title}
                                desc={f.desc}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-32 pt-12 border-t border-white/10"
                    variants={staggerContainer(0.1, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {ABOUT_STATS.map((s, i) => (
                        <motion.div key={i} variants={scaleIn}>
                            <Stat {...s} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="space-y-4">
            <div className="text-[#780606] w-8 h-8">{icon}</div>
            <h3 className="font-barlow text-white font-bold tracking-widest text-base uppercase">{title}</h3>
            <p className="font-grotesk text-gray-500 text-[11px] leading-relaxed">{desc}</p>
        </div>
    );
}

function Stat({ number, label, sublabel }: { number: string, label: string, sublabel: string }) {
    return (
        <div className="space-y-1">
            <h2 className="font-cinzel text-4xl md:text-5xl font-black text-[#780606]">{number}</h2>
            <p className="font-bebas text-white tracking-widest text-base">{label}</p>
            <p className="font-barlow text-gray-600 text-[10px] tracking-[0.2em] uppercase font-bold">{sublabel}</p>
        </div>
    );
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}
function XIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
function MicIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
        </svg>
    );
}
function BoltIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}
function CrownIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20" /><path d="M5 20V8l4 4 3-6 3 6 4-4v12" />
        </svg>
    );
}
