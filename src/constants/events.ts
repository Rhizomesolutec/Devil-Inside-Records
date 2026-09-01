export interface EventItem {
    id: string;
    title: string;
    tag: string;
    /** Optional — leave undefined or "TBA" until confirmed. */
    date?: string;
    /** Optional — leave undefined until the venue is confirmed. */
    venue?: string;
    /** Optional poster. Omit for placeholder cards. */
    image?: string;
    /** External booking URL. Omit until tickets are live. */
    ticketUrl?: string;
    ticketLabel: string;
    /** Marks demo/placeholder events that still need final details. */
    placeholder?: boolean;
}

/**
 * Homepage Events listing.
 * Update MHR & FRIENDS INDIA TOUR here when the real details are ready:
 * image, date, venue, and ticketUrl.
 */
export const EVENTS: EventItem[] = [
    {
        id: "mhr-friends-india-tour",
        title: "MHR & FRIENDS INDIA TOUR",
        tag: "MHR & FRIENDS || KOCHI",
        date: "19 Sep Saturday | 08:00 PM",
        venue: "Kochi | India",
        image: "/MHR & FRIENDS.webp",
        ticketUrl: "https://www.skillboxes.com/events/business/mhr-friends",
        ticketLabel: "GET TICKETS",
    },
    {
        id: "fake-tattoos",
        title: "FAKE TATTOOS",
        tag: "LIVE EVENT",
        date: "20 September 2026 | 03:00 PM Onwards",
        venue: "Crowne Plaza — Kochi",
        image: "/FAKE TATTOOS.webp",
        ticketUrl: "https://www.skillboxes.com/events/the-backstage-kochi-edition-sbywbysu",
        ticketLabel: "GET TICKETS",
    },
];
