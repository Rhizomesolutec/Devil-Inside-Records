import { Metadata } from "next";
import LatestReleasePage from "@/components/latest-release/LatestReleasePage";

export const metadata: Metadata = {
  title: "Latest Releases — Devil Inside Records",
  description: "Explore the latest drops from Devil Inside Records. Uncut rage, hunger, and triumph in every track.",
};

const LatestRelease = () => {
    return (
        <LatestReleasePage />
    );
};

export default LatestRelease;