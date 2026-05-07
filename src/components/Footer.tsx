import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
    { label: "HOME", href: "/" },
    { label: "RELEASES", href: "/latest-release" },
    { label: "ARTISTS", href: "/artists" },
    { label: "ABOUT", href: "/about" },
    { label: "MERCH", href: "/merch" },
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
        label: "TWITTER / X",
        href: "https://x.com",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
    {
        label: "SOUNDCLOUD",
        href: "https://soundcloud.com",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.175 12.225c-.015.067-.014.133-.014.201 0 .067.001.133.014.201l.537 3.596-.537 3.506c-.013.065-.014.133-.014.201 0 .067.001.133.014.201.1.517.552.9 1.102.9.65 0 1.176-.527 1.176-1.176v-7.43c0-.65-.527-1.177-1.176-1.177-.55 0-1.002.384-1.102.977zm2.732-2.67c-.015.067-.014.133-.014.201 0 .067.001.133.014.201l.699 5.842-.699 4.543c-.013.065-.014.133-.014.201 0 .067.001.133.014.201.113.49.55.86 1.073.86.614 0 1.113-.499 1.113-1.113V7.03c0-.614-.499-1.113-1.113-1.113-.523 0-.96.37-1.073.638zm2.8-1.754c-.013.065-.014.133-.014.201 0 .067.001.133.014.201L7.4 16.05l-.693 5.152c-.013.065-.014.133-.014.201 0 .067.001.133.014.201.11.474.537.83 1.047.83.586 0 1.063-.477 1.063-1.063V5.63c0-.587-.477-1.063-1.063-1.063-.51 0-.937.356-1.047.634zm12.73.956C18.945 4.498 17.17 3 15.044 3c-.898 0-1.731.278-2.42.748-.319-3.4-3.189-6.04-6.68-6.04C2.666-2.292 0 .375 0 3.656v.2c0 .066.001.133.014.199L.48 12 0 19.752c-.013.065-.014.133-.014.201 0 .067.001.133.014.201C.138 21.63 1.6 23 3.37 23c1.77 0 3.233-1.368 3.385-3.108.113.012.226.018.341.018 3.52 0 6.39-2.72 6.68-6.15.69.48 1.524.758 2.42.758 2.337 0 4.232-1.895 4.232-4.232 0-1.74-1.055-3.252-2.591-3.929z" />
            </svg>
        ),
    },
];

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 md:px-16 lg:px-24">
            <div className="max-w-screen-2xl mx-auto">
                {/* ── Top Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <Image src="/white-logo.png" alt="Devil Inside Records" width={120} height={40} className="object-contain" />
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
                    </div>

                    {/* Nav Links */}
                    <div>
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
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="font-barlow text-[9px] tracking-[0.45em] uppercase text-gray-600 mb-6">CONTACT</p>
                        <div className="space-y-4">
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-1">GENERAL</p>
                                <p className="font-grotesk text-gray-400 text-sm">contact@devilinsiderecords.com</p>
                            </div>
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-1">DEMO SUBMISSIONS</p>
                                <p className="font-grotesk text-gray-400 text-sm">demos@devilinsiderecords.com</p>
                            </div>
                            <div>
                                <p className="font-barlow text-[9px] tracking-[0.35em] uppercase text-gray-700 mb-1">PRESS & MEDIA</p>
                                <p className="font-grotesk text-gray-400 text-sm">press@devilinsiderecords.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
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
                </div>
            </div>
        </footer>
    );
}
