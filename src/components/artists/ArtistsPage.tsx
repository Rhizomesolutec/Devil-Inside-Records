"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARTISTS, Artist } from "@/constants/artists";
import { fadeUp, staggerContainer, staggerItem, slideLeft } from "@/lib/animations";

export default function ArtistsPage() {
    const [hovered, setHovered] = useState<Artist | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">

            {/* ── Hero Header ── */}
            <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 overflow-hidden">
                {/* Decorative background number */}
                <motion.span
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-bebas text-[20rem] md:text-[28rem] text-white/2 leading-none select-none pointer-events-none"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {ARTISTS.length.toString().padStart(2, "0")}
                </motion.span>

                <motion.div
                    className="max-w-screen-2xl mx-auto relative z-10"
                    variants={staggerContainer(0.15, 0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p variants={fadeUp} className="font-barlow text-[9px] md:text-[10px] tracking-[0.5em] text-gray-500 uppercase mb-6 flex items-center gap-3">
                        <span className="w-6 h-px bg-[#780606]" />
                        DEVIL INSIDE RECORDS
                    </motion.p>
                    <motion.h1 variants={fadeUp} className="font-cinzel text-5xl sm:text-7xl md:text-[7rem] lg:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter">
                        THE
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
                            ROSTER.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="font-grotesk text-gray-500 text-sm md:text-base mt-8 max-w-md leading-relaxed">
                        Every name on this list earned their place.
                        No features. No shortcuts. Pure craft.
                    </motion.p>
                </motion.div>
            </section>

            {/* ── Artist List ── */}
            <section
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="relative px-6 md:px-16 lg:px-24 pb-32"
            >
                {/* Floating image that follows cursor (desktop only) */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            key={hovered.id}
                            className="fixed pointer-events-none z-50 hidden lg:block"
                            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                            animate={{ opacity: 1, scale: 1, rotate: 2 }}
                            exit={{ opacity: 0, scale: 0.85, rotate: -4 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{
                                left: mousePos.x + 24,
                                top: mousePos.y - 120,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="relative w-52 h-68 overflow-hidden shadow-2xl">
                                <Image
                                    src={hovered.image}
                                    alt={hovered.name}
                                    fill
                                    className="object-cover grayscale"
                                />
                                <div className="absolute inset-0 bg-[#780606]/20 mix-blend-multiply" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/60 to-transparent">
                                    <p className="font-barlow text-[9px] tracking-[0.4em] uppercase text-[#780606]">
                                        {hovered.genre}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Divider line + count */}
                <motion.div
                    className="max-w-screen-2xl mx-auto border-t border-white/10 mb-0 flex items-center justify-between py-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase">ARTIST NAME</span>
                    <span className="font-barlow text-[8px] tracking-[0.5em] text-gray-700 uppercase hidden md:block">GENRE</span>
                </motion.div>

                {/* Artist rows — staggered */}
                <motion.div
                    className="max-w-screen-2xl mx-auto"
                    variants={staggerContainer(0.07, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {ARTISTS.map((artist, i) => (
                        <ArtistRow
                            key={artist.id}
                            artist={artist}
                            index={i}
                            onHover={setHovered}
                        />
                    ))}
                </motion.div>
            </section>

            {/* ── Bottom CTA ── */}
            <motion.section
                className="border-t border-white/5 px-6 md:px-16 lg:px-24 py-20"
                variants={staggerContainer(0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <motion.div variants={slideLeft}>
                        <p className="font-cinzel text-2xl md:text-4xl font-black text-white tracking-tight">
                            GOT WHAT IT TAKES?
                        </p>
                        <p className="font-grotesk text-gray-500 text-sm mt-2">
                            We're always hunting for the next real thing.
                        </p>
                    </motion.div>
                    <motion.a
                        href="/#contact"
                        variants={fadeUp}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="font-barlow border border-[#780606] bg-[#780606]/10 text-white text-sm tracking-[0.4em] uppercase px-10 py-4 hover:bg-[#780606] hover:text-black transition-all shrink-0"
                    >
                        SUBMIT YOUR DEMO
                    </motion.a>
                </div>
            </motion.section>
        </div>
    );
}

function ArtistRow({ artist, index, onHover }: { artist: Artist; index: number; onHover: (a: Artist | null) => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={staggerItem}
            onMouseEnter={() => { setIsHovered(true); onHover(artist); }}
            onMouseLeave={() => { setIsHovered(false); onHover(null); }}
            className="group relative flex items-center justify-between border-b border-white/5 py-6 md:py-8 cursor-default overflow-hidden"
        >
            {/* Full-row hover background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: isHovered
                        ? "linear-gradient(90deg, #78060608 0%, transparent 80%)"
                        : "linear-gradient(90deg, transparent 0%, transparent 80%)",
                }}
                transition={{ duration: 0.4 }}
            />

            {/* Left accent bar */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                animate={{
                    background: isHovered ? "#780606" : "transparent",
                    boxShadow: isHovered ? "0 0 12px #780606" : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Index number */}
            <motion.span
                className="font-cinzel text-xs md:text-sm font-black shrink-0 w-8 md:w-12"
                animate={{ color: isHovered ? "#780606" : "#374151" }}
                transition={{ duration: 0.3 }}
            >
                {String(index + 1).padStart(2, "0")}
            </motion.span>

            {/* Name */}
            <div className="flex-1 min-w-0 px-4 md:px-8">
                <motion.h2
                    className="font-cinzel font-black uppercase leading-none truncate"
                    style={{ fontSize: "clamp(1.5rem, 5vw, 4.5rem)" }}
                    animate={{
                        color: isHovered ? "#ffffff" : "#6b7280",
                        letterSpacing: isHovered ? "-0.02em" : "0em",
                    }}
                    transition={{ duration: 0.35 }}
                >
                    {artist.name}
                </motion.h2>
                {/* Description expands on hover */}
                <motion.p
                    className="font-grotesk text-gray-500 text-xs md:text-sm leading-relaxed mt-2 max-w-lg overflow-hidden"
                    animate={{
                        maxHeight: isHovered ? 60 : 0,
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {artist.description}
                </motion.p>
            </div>

            {/* Genre + Arrow */}
            <div className="flex items-center gap-6 shrink-0">
                <motion.span
                    className="hidden md:block font-barlow text-[9px] tracking-[0.4em] uppercase"
                    animate={{ color: isHovered ? "#780606" : "#374151" }}
                    transition={{ duration: 0.3 }}
                >
                    {artist.genre}
                </motion.span>

                {/* Mobile thumbnail */}
                <motion.div
                    className="relative w-10 h-10 overflow-hidden shrink-0 lg:hidden"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image src={artist.image} alt={artist.name} fill className="object-cover grayscale" />
                </motion.div>

                {/* Arrow */}
                <motion.span
                    className="font-barlow text-base"
                    animate={{
                        color: isHovered ? "#780606" : "transparent",
                        x: isHovered ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    ↗
                </motion.span>
            </div>
        </motion.div>
    );
}
