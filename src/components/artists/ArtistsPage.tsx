"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARTISTS, Artist } from "@/constants/artists";
import { fadeUp, staggerContainer, staggerItem, slideLeft } from "@/lib/animations";

export default function ArtistsPage() {
    const [hovered, setHovered] = useState<Artist | null>(null);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Prevent scrolling when modal is open
    if (typeof window !== "undefined") {
        if (selectedArtist) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }

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
                    {[...ARTISTS].sort((a, b) => a.name.localeCompare(b.name)).map((artist, i) => (
                        <ArtistRow
                            key={artist.id}
                            artist={artist}
                            index={i}
                            onHover={setHovered}
                            onClick={() => setSelectedArtist(artist)}
                        />
                    ))}
                </motion.div>
            </section>

            {/* Bottom CTA */}
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

            {/* Artist Modal */}
            <AnimatePresence>
                {selectedArtist && (
                    <ArtistModal key="artist-modal" artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

function ArtistRow({ artist, index, onHover, onClick }: { artist: Artist; index: number; onHover: (a: Artist | null) => void; onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={staggerItem}
            onMouseEnter={() => { setIsHovered(true); onHover(artist); }}
            onMouseLeave={() => { setIsHovered(false); onHover(null); }}
            onClick={onClick}
            className="group relative flex items-center justify-between border-b border-white/5 py-6 md:py-8 cursor-pointer overflow-hidden"
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

            {/* Genre + Socials + Arrow */}
            <div className="flex items-center gap-6 shrink-0">
                <div className="hidden md:flex flex-col items-end justify-center relative min-w-[200px] h-10">
                    <motion.span
                        className="font-barlow text-[9px] tracking-[0.4em] uppercase text-right absolute whitespace-nowrap"
                        animate={{ 
                            color: isHovered ? "#780606" : "#374151",
                            y: isHovered ? -10 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {artist.genre}
                    </motion.span>
                    <motion.div
                        className="flex items-center gap-2 absolute"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ 
                            opacity: isHovered ? 1 : 0, 
                            y: isHovered ? 8 : 15,
                            pointerEvents: isHovered ? "auto" : "none"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {artist.socials?.instagram && artist.socials.instagram !== "#" && (
                            <a
                                href={artist.socials.instagram}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-500 hover:text-white transition-colors p-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                        )}
                        {artist.socials?.spotify && artist.socials.spotify !== "#" && (
                            <a
                                href={artist.socials.spotify}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-500 hover:text-white transition-colors p-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.45 17.34c-.21.345-.667.457-1.011.247-2.775-1.694-6.262-2.077-10.375-1.139-.395.09-.785-.157-.875-.552-.09-.395.157-.785.552-.875 4.502-1.029 8.358-.598 11.462 1.303.344.21.456.666.247 1.016zm1.448-3.238c-.266.43-832.573-.243-2.613-.35-4.148-1.574-8.875-1.722-12.285-.948-.48.11-8.528-.19-.638-.67-.11-.48.19-.853.67-.963 3.906-.889 9.117-.714 13.716 1.03.43.266.573.832.307 1.263zm.092-3.376c-3.418-2.03-9.055-2.217-12.315-1.228-.564.17-1.156-.148-1.326-.712-.17-.564.148-1.156.712-1.326 3.774-1.144 10.013-.923 13.978 1.436.51.305.675.961.37 1.472-.306.51-.962.675-1.42.358z"/>
                                </svg>
                            </a>
                        )}
                        {artist.socials?.youtube && artist.socials.youtube !== "#" && (
                            <a
                                href={artist.socials.youtube}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-500 hover:text-white transition-colors p-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        )}
                    </motion.div>
                </div>

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

function ArtistModal({ artist, onClose }: { artist: Artist; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-12"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                onClick={onClose} 
            />
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-[#111] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-2xl md:rounded-none"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-[#780606] text-white rounded-full transition-colors backdrop-blur-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-[45vh] min-h-[300px] md:h-auto md:min-h-full shrink-0">
                    <Image
                        src={artist.modalImage || artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#111] via-[#111]/40 to-transparent md:bg-linear-to-r md:from-transparent md:via-[#111]/20 md:to-[#111]" />
                </div>

                {/* Content Section */}
                <div className="relative p-8 md:p-12 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="mb-8">
                        <span className="font-barlow text-[10px] tracking-[0.4em] uppercase text-[#780606] mb-2 block">
                            {artist.genre}
                        </span>
                        <h2 className="font-cinzel text-4xl md:text-6xl font-black text-white uppercase leading-none tracking-tight">
                            {artist.name}
                        </h2>
                    </div>

                    <div className="space-y-6 mb-10">
                        <p className="font-grotesk text-gray-300 text-sm md:text-base leading-relaxed">
                            {artist.fullDescription}
                        </p>
                    </div>

                    {/* Socials */}
                    <div>
                        <span className="font-barlow text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-4 block">Connect</span>
                        <div className="flex items-center gap-4">
                            {artist.socials?.instagram && (
                                <a href={artist.socials.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#780606] hover:bg-[#780606]/10 hover:text-[#780606] transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                            )}
                            {artist.socials?.spotify && (
                                <a href={artist.socials.spotify} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#1DB954] hover:bg-[#1DB954]/10 hover:text-[#1DB954] transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.45 17.34c-.21.345-.667.457-1.011.247-2.775-1.694-6.262-2.077-10.375-1.139-.395.09-.785-.157-.875-.552-.09-.395.157-.785.552-.875 4.502-1.029 8.358-.598 11.462 1.303.344.21.456.666.247 1.016zm1.448-3.238c-.266.43-832.573-.243-2.613-.35-4.148-1.574-8.875-1.722-12.285-.948-.48.11-8.528-.19-.638-.67-.11-.48.19-.853.67-.963 3.906-.889 9.117-.714 13.716 1.03.43.266.573.832.307 1.263zm.092-3.376c-3.418-2.03-9.055-2.217-12.315-1.228-.564.17-1.156-.148-1.326-.712-.17-.564.148-1.156.712-1.326 3.774-1.144 10.013-.923 13.978 1.436.51.305.675.961.37 1.472-.306.51-.962.675-1.42.358z"/></svg>
                                </a>
                            )}
                            {artist.socials?.youtube && (
                                <a href={artist.socials.youtube} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#FF0000] hover:bg-[#FF0000]/10 hover:text-[#FF0000] transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
