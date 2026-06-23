import { LatestReleaseSection } from "@/components/home/LatestReleaseSection";
import { ArtistSection } from "@/components/home/ArtistSection";
import { MerchSection } from "@/components/home/MerchSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { Metadata } from "next";
import { DemoLatestReleaseSection } from "@/components/home/DemoLatestRelease";

export const metadata: Metadata = {
  title: "Devil Inside Records — Home",
  description: "The official home of Devil Inside Records. We don't follow the culture, we create it. Join the movement.",
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HomeHeroSection />

      {/* Latest Releases Section */}
      <LatestReleaseSection />

      {/* <DemoLatestReleaseSection/> */}

      {/* Artists Section */}
      <ArtistSection />

      {/* Merch Section */}
      <MerchSection />

      {/* Contact Section */}
      <ContactSection />

    </>
  );
}
