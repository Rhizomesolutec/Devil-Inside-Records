import { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About — Devil Inside Records",
  description: "Learn more about the vision, stats, and features of Devil Inside Records. A new era of rap and underground culture.",
};

export default function About() {
    return <AboutPage/>
}