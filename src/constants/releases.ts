export interface Release {
    id: string;
    title: string;
    artist: string;
    type: string;
    tracks: number;
    date: string;
    duration: string;
    cover: string;
    accent: string;
    tag: string;
    description: string;
    link?: string;
    audio?: string;
}

export const RELEASES: Release[] = [
    {
        id: "street-talk",
        title: "STREET TALK",
        artist: "M.H.R",
        type: "ALBUM",
        tracks: 14,
        date: "APR 24, 2025",
        duration: "02:48",
        cover: "/release-blood-meridian.png",
        accent: "#780606",
        tag: "NEW DROP",
        description: "A relentless journey through the underbelly of the city. 14 tracks of uncut rage, hunger, and triumph. M.H.R's most ambitious project yet.",
        link: "https://open.spotify.com/track/7lQ8MOhq6IN2w8EYcFNSUk?si=eaddf8ba98564b3b",
    },
    {
        id: "glitch",
        title: "GLITCH",
        artist: "SA",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 10, 2025",
        duration: "03:12",
        cover: "/release-static-noise.png",
        accent: "#00FF5E",
        tag: "OUT NOW",
        description: "Raw. Distorted. SA cuts through the frequency with a single that hits like a power surge. Produced entirely on stolen studio time.",
        link: "https://open.spotify.com/track/7lQ8MOhq6IN2w8EYcFNSUk?si=5af37915d31440d3",
    },
    {
        id: "nightmare",
        title: "NIGHTMARE",
        artist: "JOKER390P",
        type: "EP",
        tracks: 6,
        date: "MAR 18, 2025",
        duration: "03:36",
        cover: "/release-ghost-protocol.png",
        accent: "#E0E0E0",
        tag: "UNDERGROUND",
        description: "Six tracks of shadow. JOKER390P moves through the underground with surgical precision — lyricism that leaves marks long after the beat drops.",
        link: "https://open.spotify.com/track/7lQ8MOhq6IN2w8EYcFNSUk?si=5af37915d31440d3",
    },
    {
        id: "soul-journey",
        title: "SOUL JOURNEY",
        artist: "Haniya Nafisa",
        type: "ALBUM",
        tracks: 16,
        date: "FEB 02, 2025",
        duration: "03:45",
        cover: "/release-iron-crown.png",
        accent: "#C9A84C",
        tag: "FEATURED",
        description: "Ethereal vocals and soul-stirring melodies. Haniya Nafisa takes you on a journey through the heart of the underground.",
        link: "https://open.spotify.com/track/7lQ8MOhq6IN2w8EYcFNSUk?si=5af37915d31440d3",
    },
];
