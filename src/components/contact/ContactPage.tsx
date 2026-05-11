"use client"
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative pt-32 pb-24 overflow-hidden">
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <p className="font-barlow text-[#780606] text-xs tracking-[0.4em] font-bold uppercase mb-4">
            REACH OUT
          </p>
          <h1 className="font-cinzel text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
            CONTACT <span className="text-[#780606]">US</span>
          </h1>
          <p className="font-grotesk text-gray-400 text-[14px] leading-relaxed max-w-xl">
            Booking inquiries, demo submissions, or general questions. Reach out to the team behind the underground. We are always looking for the next sound.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <ContactInfoItem 
                title="GENERAL INQUIRIES" 
                detail="info@devilinsiderecords.in" 
              />
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="font-bebas text-2xl tracking-wider mb-6">FOLLOW THE MOVEMENT</h3>
              <div className="flex gap-4">
                <SocialSquare label="IG" />
                <SocialSquare label="X" />
                <SocialSquare label="YT" />
                <SocialSquare label="SC" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactInfoItem({ title, detail, note }: { title: string, detail: string, note?: string }) {
  return (
    <div>
      <h3 className="font-bebas text-xl tracking-wider text-white mb-1">{title}</h3>
      <a href={`mailto:${detail}`} className="font-grotesk text-gray-400 hover:text-[#780606] transition-colors text-[14px]">
        {detail}
      </a>
      {note && (
        <p className="font-barlow text-[10px] text-gray-500 tracking-wider mt-2">{note}</p>
      )}
    </div>
  );
}

function SocialSquare({ label }: { label: string }) {
  return (
    <a 
      href="#" 
      className="w-12 h-12 flex items-center justify-center border border-white/20 font-barlow text-sm font-bold tracking-widest text-white hover:bg-white hover:text-black hover:border-white transition-all"
    >
      {label}
    </a>
  );
}
