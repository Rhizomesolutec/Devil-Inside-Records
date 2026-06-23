"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "@/lib/animations";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactSection() {

    return (
        <section id="contact" className="relative bg-black border-t border-white/5 overflow-hidden py-28 px-6 md:px-16 lg:px-24">
            {/* Background glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] pointer-events-none opacity-20"
                style={{ background: "radial-gradient(ellipse at center, #780606 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* ── LEFT: Copy ── */}
                <motion.div
                    className="flex flex-col justify-between"
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div>
                        <p className="font-barlow text-[#780606] text-[10px] tracking-[0.45em] uppercase mb-6 flex items-center gap-3">
                            <span className="w-6 h-px bg-[#780606]" />
                            GET IN TOUCH
                        </p>
                        <h2 className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                            WORK<br />
                            <span className="[-webkit-text-stroke:2px_white] text-transparent">WITH US.</span>
                        </h2>
                        <p className="font-grotesk text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                            Got a track? A vision? A collab in mind? Devil Inside is always hunting for the next real thing.
                            Drop us a message — we read every one.
                        </p>
                    </div>

                    {/* Contact details */}
                    <div className="mt-14 space-y-6 border-t border-white/10 pt-10">
                        <ContactDetail
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            }
                            label="GENERAL INFO"
                            value="info@devilinsiderecords.in"
                            href="mailto:info@devilinsiderecords.in"
                        />
                        <ContactDetail
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            }
                            label="SONG DEMOS"
                            value="demos@devilinsiderecords.in"
                            href="mailto:demos@devilinsiderecords.in"
                        />
                        <ContactDetail
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            label="CONTENT RELATED"
                            value="siva@devilinsiderecords.in"
                            href="mailto:siva@devilinsiderecords.in"
                        />
                        <ContactDetail
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            }
                            label="BASE"
                            value="Underground. Worldwide."
                        />
                    </div>
                </motion.div>

                {/* ── RIGHT: Form ── */}
                <motion.div
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <ContactForm />
                </motion.div>
            </div>
        </section>
    );
}

function ContactDetail({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="text-[#780606] mt-0.5 shrink-0">
                {icon}
            </div>

            <div>
                <p className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-600 mb-1">
                    {label}
                </p>

                {href ? (
                    <a
                        href={href}
                        className="font-grotesk text-white hover:text-[#780606] transition-colors text-sm"
                    >
                        {value}
                    </a>
                ) : (
                    <p className="font-grotesk text-white text-sm">
                        {value}
                    </p>
                )}
            </div>
        </div>
    );
}


