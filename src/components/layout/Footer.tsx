"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const NAV_LINKS = [
    { label: "HOME", href: "/" },
    { label: "RELEASES", href: "/latest-release" },
    { label: "ARTISTS", href: "/artists" },
    { label: "ABOUT", href: "/about" },
    { label: "MERCH", href: "/merch" },
    { label: "CONTACT", href: "/contact" },
];

const SOCIAL_LINKS = [
    {
        label: "INSTAGRAM",
        href: "https://instagram.com",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    {
        label: "YOUTUBE",
        href: "https://youtube.com",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
];

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 md:px-16 lg:px-24">
            <div className="max-w-screen-2xl mx-auto">
                {/* ── Top Grid ── */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5"
                    variants={staggerContainer(0.1, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Brand Column */}
                    <motion.div variants={staggerItem} className="lg:col-span-2">
                        <div className="mb-6">
                            <Image src="/white-logo.png" alt="Devil Inside Records" width={100} height={40} className="object-contain" />
                        </div>
                        <p className="font-grotesk text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                            An independent underground label. Built for the ones who refused to wait for permission.
                            Raw sound. Real stories. No limits.
                        </p>
                        {/* Socials */}
                        <div className="flex items-center gap-5">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="text-gray-600 hover:text-[#780606] transition-colors"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Nav Links */}
                    <motion.div variants={staggerItem}>
                        <p className="font-barlow text-[9px] tracking-[0.45em] uppercase text-gray-600 mb-6">NAVIGATE</p>
                        <ul className="space-y-4">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="font-barlow text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div variants={staggerItem}>

                        <p className="font-barlow text-[9px] tracking-[0.45em] uppercase text-gray-600 mb-6">CONTACT</p>
                        <div className="space-y-3">
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-0.5">PHONE</p>
                                <p className="font-grotesk text-gray-400 text-sm">+91 81290 70856</p>
                            </div>
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-0.5">GENERAL</p>
                                <a href="mailto:info@devilinsiderecords.in" className="font-serif tracking-wide text-gray-400 text-sm hover:text-[#780606] transition-colors block lowercase">info@devilinsiderecords.in</a>
                            </div>
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-0.5">SONG DEMOS</p>
                                <a href="mailto:demos@devilinsiderecords.in" className="font-serif tracking-wide text-gray-400 text-sm hover:text-[#780606] transition-colors block lowercase">demos@devilinsiderecords.in</a>
                            </div>
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-0.5">CONTENT RELATED</p>
                                <a href="mailto:siva@devilinsiderecords.in" className="font-serif tracking-wide text-gray-400 text-sm hover:text-[#780606] transition-colors block lowercase">siva@devilinsiderecords.in</a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ── Bottom Bar ── */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <p className="font-barlow text-gray-700 text-[10px] tracking-[0.3em] uppercase">
                        © {new Date().getFullYear()} DEVIL INSIDE RECORDS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="font-barlow text-gray-700 text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">
                            PRIVACY
                        </Link>
                        <span className="text-[#780606]/50 text-[10px]">×</span>
                        <Link href="/terms" className="font-barlow text-gray-700 text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">
                            TERMS
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
