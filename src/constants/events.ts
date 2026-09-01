export interface EventItem {
    id: string;
    title: string;
    tag: string;
    /** Optional — leave undefined or "TBA" until confirmed. */
    date?: string;
    /** Multiple date lines, rendered with the existing date style. */
    dates?: string[];
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

const MHR_TICKET_URL = "https://www.skillboxes.com/events/business/mhr-friends";

const TOUR_DATES_ALL = [
    "SEP 19, KOCHI",
    "SEP 20, BANGALORE",
    "SEP 24, MUMBAI",
    "SEP 27, PUNE",
];

const TOUR_DATES_MUMBAI_PUNE = [
    "SEP 24, MUMBAI",
    "SEP 27, PUNE",
];

/**
 * Events listing.
 * MHR & Friends tour dates and artist cards share the Skillboxes booking link.
 */
export const EVENTS: EventItem[] = [
    {
        id: "mhr-friends-india-tour",
        title: "MHR & FRIENDS INDIA TOUR",
        tag: "MHR & FRIENDS || KOCHI",
        dates: TOUR_DATES_ALL,
        venue: "Kochi | India",
        image: "/event/MHR & FRIENDS.webp",
        ticketUrl: MHR_TICKET_URL,
        ticketLabel: "GET TICKETS",
    },
    {
        id: "fake-tattoos",
        title: "FAKE TATTOOS",
        tag: "LIVE EVENT",
        date: "20 September 2026 | 03:00 PM Onwards",
        venue: "Crowne Plaza — Kochi",
        image: "/event/FAKE TATTOOS.webp",
        ticketUrl: "https://www.skillboxes.com/events/the-backstage-kochi-edition-sbywbysu",
        ticketLabel: "GET TICKETS",
    },
    {
        id: "shreyas-and-vedang",
        title: "SHREYAS AND VEDANG",
        tag: "LIVE EVENT",
        dates: ["SEP 27, PUNE"],
        image: "/event/Shreyas and Vedang.webp",
        ticketUrl: MHR_TICKET_URL,
        ticketLabel: "GET TICKETS",
    },
    {
        id: "joker390p",
        title: "JOKER390P",
        tag: "LIVE EVENT",
        dates: TOUR_DATES_ALL,
        image: "/event/Joker390p.webp",
        ticketUrl: MHR_TICKET_URL,
        ticketLabel: "GET TICKETS",
    },
    {
        id: "efy",
        title: "EFY",
        tag: "LIVE EVENT",
        dates: TOUR_DATES_ALL,
        image: "/event/EFY.webp",
        ticketUrl: MHR_TICKET_URL,
        ticketLabel: "GET TICKETS",
    },
    {
        id: "amani-and-wraith",
        title: "AMANI AND WRAITH",
        tag: "LIVE EVENT",
        dates: TOUR_DATES_MUMBAI_PUNE,
        image: "/event/Amani and Wraith.webp",
        ticketUrl: MHR_TICKET_URL,
        ticketLabel: "GET TICKETS",
    },
    {
        id: "aksomaniac",
        title: "AKSOMANIAC",
        tag: "LIVE EVENT",
        dates: TOUR_DATES_MUMBAI_PUNE,
        image: "/event/Aksomaniac.webp",
        ticketUrl: MHR_TICKET_URL,
        ticketLabel: "GET TICKETS",
    },
];
