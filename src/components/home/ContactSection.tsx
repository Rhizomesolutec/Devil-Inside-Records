"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { slideLeft, slideRight } from "@/lib/animations";

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Required"),
    subject: Yup.string()
        .required("Required"),
});

export function ContactSection() {
    const [sent, setSent] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: ContactSchema,
        onSubmit: (values: { name: string; email: string; subject: string; message: string; }, { resetForm }: { resetForm: () => void }) => {
            // Placeholder submit logic
            setSent(true);
            setTimeout(() => setSent(false), 4000);
            resetForm();
        },
    });

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
                            label="EMAIL"
                            value="contact@devilinsiderecords.com"
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
                <motion.form
                    onSubmit={formik.handleSubmit}
                    className="space-y-5"
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormInput 
                            id="name" 
                            label="YOUR NAME" 
                            type="text" 
                            name="name" 
                            value={formik.values.name} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            placeholder="E.g. KXNG VEX" 
                            error={formik.errors.name}
                            touched={formik.touched.name}
                        />
                        <FormInput 
                            id="email" 
                            label="EMAIL" 
                            type="email" 
                            name="email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            placeholder="your@email.com" 
                            error={formik.errors.email}
                            touched={formik.touched.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="subject" className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-500">SUBJECT</label>
                            {formik.touched.subject && formik.errors.subject && (
                                <span className="font-barlow text-[9px] tracking-[0.2em] text-red-500 uppercase">{formik.errors.subject}</span>
                            )}
                        </div>
                        <select 
                            id="subject" 
                            name="subject" 
                            value={formik.values.subject} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            className={`bg-transparent border ${formik.touched.subject && formik.errors.subject ? 'border-red-500' : 'border-white/10'} text-white font-grotesk text-sm px-4 py-3 focus:outline-none focus:border-[#780606] transition-colors appearance-none`}
                        >
                            <option value="" disabled className="bg-black">Select a topic…</option>
                            <option value="demo" className="bg-black">Submit a Demo</option>
                            <option value="collab" className="bg-black">Collaboration</option>
                            <option value="booking" className="bg-black">Artist Booking</option>
                            <option value="press" className="bg-black">Press & Media</option>
                            <option value="other" className="bg-black">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="message" className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-500">MESSAGE</label>
                            {formik.touched.message && formik.errors.message && (
                                <span className="font-barlow text-[9px] tracking-[0.2em] text-red-500 uppercase">{formik.errors.message}</span>
                            )}
                        </div>
                        <textarea 
                            id="message" 
                            name="message" 
                            value={formik.values.message} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            rows={5}
                            placeholder="What's on your mind..."
                            className={`bg-transparent border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-white/10'} text-white font-grotesk text-sm px-4 py-3 focus:outline-none focus:border-[#780606] transition-colors resize-none placeholder:text-gray-700`} 
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={formik.isSubmitting}
                        className="font-barlow w-full border border-[#780606] bg-[#780606]/10 text-white text-sm tracking-[0.4em] uppercase px-8 py-5 hover:bg-[#780606] hover:text-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sent ? (
                            <>
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-green-400">SENT!</span>
                            </>
                        ) : (
                            <>
                                SEND MESSAGE
                                <span className="text-[#780606] group-hover:text-black transition-colors text-base">↗</span>
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}

function ContactDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="text-[#780606] mt-0.5 shrink-0">{icon}</div>
            <div>
                <p className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-600 mb-1">{label}</p>
                <p className="font-grotesk text-white text-sm">{value}</p>
            </div>
        </div>
    );
}

function FormInput({ id, label, type, name, value, onChange, onBlur, placeholder, error, touched }: {
    id: string; label: string; type: string; name: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string; error?: string; touched?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-500">{label}</label>
                {touched && error && (
                    <span className="font-barlow text-[9px] tracking-[0.2em] text-red-500 uppercase">{error}</span>
                )}
            </div>
            <input id={id} type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
                className={`bg-transparent border ${touched && error ? 'border-red-500' : 'border-white/10'} text-white font-grotesk text-sm px-4 py-3 focus:outline-none focus:border-[#780606] transition-colors placeholder:text-gray-700`} />
        </div>
    );
}
