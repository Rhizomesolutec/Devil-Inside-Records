"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (path.startsWith("/admin")) {
        return null;
    }

    const getLinkClass = (href: string) => {
        return path === href
            ? "px-5 py-2 bg-red-700 text-black text-sm rounded-full transition-transform"
            : "px-5 py-2 bg-white/5 border border-white/10 text-white/90 text-sm font-medium rounded-full hover:bg-white/15 transition-colors backdrop-blur-md";
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-8 py-4 flex items-center justify-between"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
                {/* LEFT: Hamburger (mobile) + Logo (desktop) */}
                <div className="flex items-center gap-3">
                    {/* Mobile: hamburger only */}
                    <button
                        className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop: Logo on the left */}
                    <Link href="/" className="hidden lg:flex items-center shrink-0">
                        <Image
                            src="/white-logo.webp"
                            alt="Devil Inside Logo"
                            width={48}
                            height={48}
                            className="object-contain w-12 h-12"
                            priority
                        />
                    </Link>
                </div>

                {/* CENTER: Logo (mobile, absolutely centered) + Desktop nav (absolutely centered) */}
                {/* Mobile logo */}
                <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                        <Image
                            src="/white-logo.webp"
                            alt="Devil Inside Logo"
                            width={56}
                            height={56}
                            className="object-contain w-12 h-12"
                            priority
                        />
                    </Link>
                </div>
                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <Link href="/" className={getLinkClass("/")}>
                        Home
                    </Link>
                    <Link href="/latest-release" className={getLinkClass("/latest-release")}>
                        Catalogue
                    </Link>
                    <Link href="/artists" className={getLinkClass("/artists")}>
                        Artists
                    </Link>
                    <Link href="/merch" className={getLinkClass("/merch")}>
                        Merch
                    </Link>
                    <Link href="/about" className={getLinkClass("/about")}>
                        About
                    </Link>
                </nav>

                {/* RIGHT: Contact Us button */}
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
                            src="/menu-header-img.webp"
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
                            Catalogue
                        </Link>
                        <Link
                            href="/artists"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors flex items-center justify-between ${path === '/artists' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Artists
                        </Link>
                        <Link
                            href="/merch"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors flex items-center justify-between ${path === '/merch' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Merch
                        </Link>
                        <Link
                            href="/about"
                            className={`text-[1.75rem] tracking-wide font-medium transition-colors ${path === '/about' ? 'text-red-700' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
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
