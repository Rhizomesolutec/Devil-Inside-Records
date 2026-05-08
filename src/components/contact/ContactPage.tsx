"use client"
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative pt-32 pb-24 overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#780606] rounded-full blur-[150px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-5 pointer-events-none translate-y-1/3 -translate-x-1/3" />

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
                title="BOOKING & PRESS" 
                detail="mgmt@devilinsiderecords.com" 
              />
              <ContactInfoItem 
                title="DEMO SUBMISSIONS" 
                detail="demos@devilinsiderecords.com" 
                note="*Soundcloud or private streaming links only. No attachments."
              />
              <ContactInfoItem 
                title="GENERAL INQUIRIES" 
                detail="info@devilinsiderecords.com" 
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-barlow text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-white/20 p-4 font-grotesk text-sm text-white focus:border-[#780606] focus:outline-none transition-colors"
                    placeholder="ENTER NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-barlow text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold">Your Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-black border border-white/20 p-4 font-grotesk text-sm text-white focus:border-[#780606] focus:outline-none transition-colors"
                    placeholder="ENTER EMAIL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-barlow text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold">Subject / Inquiry Type</label>
                <select className="w-full bg-black border border-white/20 p-4 font-grotesk text-sm text-gray-400 focus:border-[#780606] focus:outline-none transition-colors appearance-none cursor-pointer">
                  <option value="">SELECT INQUIRY TYPE</option>
                  <option value="booking">Booking</option>
                  <option value="press">Press / Media</option>
                  <option value="demo">Demo Submission</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-barlow text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-black border border-white/20 p-4 font-grotesk text-sm text-white focus:border-[#780606] focus:outline-none transition-colors resize-none"
                  placeholder="WRITE YOUR MESSAGE..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="font-barlow w-full md:w-auto bg-[#780606] border border-[#780606] text-black text-sm tracking-[0.3em] uppercase px-12 py-4 hover:bg-black hover:text-white transition-all font-bold"
              >
                SEND MESSAGE
              </button>
            </form>
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
