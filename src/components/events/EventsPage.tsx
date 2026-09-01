"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EVENTS, type EventItem } from "@/constants/events";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <section className="relative pt-40 pb-16 px-6 md:px-16 lg:px-24 overflow-hidden">
                <motion.span
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-bebas text-[16rem] md:text-[24rem] text-white/2 leading-none select-none pointer-events-none"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    02
                </motion.span>

                <motion.div
                    className="max-w-screen-2xl mx-auto relative z-10"
                    variants={staggerContainer(0.15, 0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        variants={fadeUp}
                        className="font-barlow text-[9px] md:text-[10px] tracking-[0.5em] text-gray-500 uppercase mb-6 flex items-center gap-3"
                    >
                        <span className="w-6 h-px bg-[#780606]" />
                        DEVIL INSIDE RECORDS
                    </motion.p>
                    <motion.h1
                        variants={fadeUp}
                        className="font-cinzel text-5xl sm:text-7xl md:text-[7rem] lg:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter"
                    >
                        EVENTS
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="font-grotesk text-gray-500 text-sm md:text-base mt-8 max-w-md leading-relaxed"
                    >
                        Live nights. Tour dates. The underground, on stage.
                    </motion.p>
                </motion.div>
            </section>

            <section className="relative px-6 md:px-16 lg:px-24 pb-32">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] blur-[160px] pointer-events-none opacity-10"
                    style={{ background: "radial-gradient(ellipse at center, #780606 0%, transparent 70%)" }}
                />

                <motion.div
                    className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                    variants={staggerContainer(0.12, 0.15)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {EVENTS.map((event) => (
                        <motion.div key={event.id} variants={scaleIn}>
                            <EventCard event={event} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}

function EventCard({ event }: { event: EventItem }) {
    const hasTickets = Boolean(event.ticketUrl);
    const dateLines = event.dates ?? (event.date ? [event.date] : []);

    return (
        <article className="group relative flex flex-col h-full border border-white/5 hover:border-white/15 transition-all duration-300 bg-black">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                {event.image ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                                backgroundSize: "10px 10px",
                            }}
                        />
                        <span className="font-barlow text-[9px] tracking-[0.45em] uppercase text-[#780606] mb-4 relative z-10">
                            {event.tag}
                        </span>
                        <h2 className="font-cinzel text-white text-2xl sm:text-3xl font-black uppercase tracking-tight leading-[0.95] relative z-10">
                            {event.title}
                        </h2>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col flex-1 px-5 sm:px-6 py-6">
                <p className="font-barlow text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-[#780606] mb-2">
                    {event.tag}
                </p>
                <h2 className="font-cinzel text-white text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight mb-3">
                    {event.title}
                </h2>
                {(dateLines.length > 0 || event.venue) && (
                    <div className="space-y-1 mb-6">
                        {dateLines.map((line) => (
                            <p
                                key={line}
                                className="font-barlow text-[10px] tracking-[0.25em] uppercase text-gray-400"
                            >
                                {line}
                            </p>
                        ))}
                        {event.venue && (
                            <p className="font-grotesk text-gray-500 text-sm">{event.venue}</p>
                        )}
                    </div>
                )}

                <div className="mt-auto">
                    {hasTickets ? (
                        <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto font-barlow bg-red-700 border border-red-700 text-white hover:bg-transparent hover:border-red-500 hover:text-red-400 text-[11px] sm:text-xs tracking-[0.3em] uppercase px-8 py-3.5 min-h-12 transition-all duration-300"
                        >
                            {event.ticketLabel}
                        </a>
                    ) : (
                        <span className="inline-flex items-center justify-center w-full sm:w-auto font-barlow border border-white/15 text-white/40 text-[11px] sm:text-xs tracking-[0.3em] uppercase px-8 py-3.5 min-h-12 cursor-not-allowed">
                            {event.ticketLabel}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
