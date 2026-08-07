import { LatestReleaseSection } from "@/components/home/LatestReleaseSection";
import { ArtistSection } from "@/components/home/ArtistSection";
import { MerchSection } from "@/components/home/MerchSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devil Inside Records — Home",
  description: "Devil Inside Records is an independent music label showcasing underground artists, original releases, exclusive collaborations, and the next generation of independent music.",
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
