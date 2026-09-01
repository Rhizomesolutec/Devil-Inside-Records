import { Metadata } from "next";
import EventsPage from "@/components/events/EventsPage";

export const metadata: Metadata = {
    title: "Events — Devil Inside Records",
    description: "Upcoming live events, tours, and nights from Devil Inside Records.",
};

export default function Events() {
    return <EventsPage />;
}
