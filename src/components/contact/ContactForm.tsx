"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

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

interface ContactFormProps {
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
}

export function ContactForm({ className = "space-y-5", inputClassName = "", buttonClassName = "" }: ContactFormProps) {
    const [sent, setSent] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: ContactSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                    {
                        name: values.name,
                        email: values.email,
                        subject: values.subject,
                        message: values.message
                    },
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                )
                setSent(true);
                setTimeout(() => {
                    setSent(false);
                }, 4000);
                resetForm();
            } catch (error) {
                console.log(error)
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={className}>
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
                    className={inputClassName}
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
                    className={inputClassName}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="subject" className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-500 font-bold">SUBJECT</label>
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
                    className={`bg-transparent border ${formik.touched.subject && formik.errors.subject ? 'border-red-500' : 'border-white/10'} text-white font-grotesk text-sm px-4 py-3 focus:outline-none focus:border-[#780606] transition-colors appearance-none cursor-pointer ${inputClassName}`}
                >
                    <option value="" disabled className="bg-black">SELECT INQUIRY TYPE</option>
                    <option value="demo" className="bg-black">Submit a Demo</option>
                    <option value="collab" className="bg-black">Collaboration</option>
                    <option value="booking" className="bg-black">Artist Booking</option>
                    <option value="press" className="bg-black">Press & Media</option>
                    <option value="other" className="bg-black">Other</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="message" className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-500 font-bold">MESSAGE</label>
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
                    className={`bg-transparent border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-white/10'} text-white font-grotesk text-sm px-4 py-3 focus:outline-none focus:border-[#780606] transition-colors resize-none placeholder:text-gray-700 ${inputClassName}`} 
                />
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={formik.isSubmitting}
                className={buttonClassName || "font-barlow w-full border border-[#780606] bg-[#780606]/10 text-white text-sm tracking-[0.4em] uppercase px-8 py-5 hover:bg-[#780606] hover:text-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"}
            >
                {formik.isSubmitting ? (
                    <span>Sending...</span>
                ): sent ? (
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
        </form>
    );
}

function FormInput({ id, label, type, name, value, onChange, onBlur, placeholder, error, touched, className }: {
    id: string; label: string; type: string; name: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string; error?: string; touched?: boolean; className?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="font-barlow text-[9px] tracking-[0.4em] uppercase text-gray-500 font-bold">{label}</label>
                {touched && error && (
                    <span className="font-barlow text-[9px] tracking-[0.2em] text-red-500 uppercase">{error}</span>
                )}
            </div>
            <input id={id} type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
                className={`bg-transparent border ${touched && error ? 'border-red-500' : 'border-white/10'} text-white font-grotesk text-sm px-4 py-3 focus:outline-none focus:border-[#780606] transition-colors placeholder:text-gray-700 ${className}`} />
        </div>
    );
}
