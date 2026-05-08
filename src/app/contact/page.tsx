import { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Devil Inside Records",
  description: "Reach out to Devil Inside Records for booking, press, and demo submissions.",
};

export default function Contact() {
  return <ContactPage />;
}
