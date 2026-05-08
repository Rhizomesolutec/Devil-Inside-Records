"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getLinkClass = (href: string) => {
        return path === href
            ? "px-5 py-2 bg-red-700 text-black text-sm rounded-full transition-transform"
            : "px-5 py-2 bg-white/5 border border-white/10 text-white/90 text-sm font-medium rounded-full hover:bg-white/15 transition-colors backdrop-blur-md";
    };

    return (
        <>
            <motion.header 
                className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-8 py-5 flex items-center justify-between"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
                {/* Left side nav (Desktop) & Menu button (Mobile) */}
                <div className="flex items-center gap-6">
                    <button
                        className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <nav className="hidden lg:flex items-center gap-3">
                        <Link href="/" className={getLinkClass("/")}>
                            Home
                        </Link>
                        <Link href="/latest-release" className={getLinkClass("/latest-release")}>
                            Latest Release
                        </Link>
                        <Link href="/about" className={getLinkClass("/about")}>
                            About
                        </Link>
                        <Link href="/artists" className={getLinkClass("/artists")}>
                            Artist List
                        </Link>
                        <Link href="/merch" className={getLinkClass("/merch")}>
                            Merch
                        </Link>
                    </nav>
                </div>

                {/* Center Logo */}
                <div className="absolute left-1/2 top-10 md:top-12 -translate-x-1/2 -translate-y-1/2 mt-1">
                    <Link href="/">
                        <Image
                            src="/white-logo.png"
                            alt="Devil Inside Logo"
                            width={70}
                            height={70}
                            className="object-contain w-14 h-14 md:w-[70px] md:h-[70px]"
                            priority
                        />
                    </Link>
                </div>

                {/* Right side Contact Us button */}
                <div className="flex items-center">
                    <Link href="/contact" className={getLinkClass("/contact")}>
                        Contact us
                    </Link>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 z-60 bg-black text-white flex flex-col"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                    {/* Overlay Header */}
                    <div className="flex items-center justify-between py-6 border-b border-white/10">
                        <Image
                            src="/menu-header-img.png"
                            alt="Devil Inside Menu Logo"
                            width={180}
                            height={50}
                            className="object-contain"
                        />
                        <button
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close Menu"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Overlay Links */}
                    <div className="flex flex-col px-8 py-10 gap-8 mt-2 overflow-y-auto">
                        <Link
                            href="/"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors ${path === '/' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/latest-release"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors flex items-center justify-between ${path === '/latest-release' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Latest Release
                        </Link>
                        <Link
                            href="/about"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors ${path === '/about' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/artists"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors flex items-center justify-between ${path === '/artists' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Artist List
                        </Link>
                        <Link
                            href="/merch"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors flex items-center justify-between ${path === '/merch' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Merch
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors flex items-center justify-between ${path === '/contact' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
