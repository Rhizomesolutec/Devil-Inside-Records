import NoorNoorCover from "@/image/Noor Noor.jpeg";

export interface Release {
    id: string;
    title: string;
    artist: string;
    type: string;
    tracks: number | string;
    date: string;
    duration: string;
    cover: string;
    accent: string;
    tag: string;
    description: string;
    link?: string;
    audio?: string;
    upcoming?: boolean;
}

export const RELEASES: Release[] = [
    {
        id: "vaakkath",
        title: "VAAKKATH",
        artist: "Haniya Nafisa",
        type: "SINGLE",
        tracks: "TBA",
        date: "COMING SOON",
        duration: "TBA",
        cover: "/release/vaakkath_cover.jpg",
        accent: "#F5C518",
        tag: "COMING SOON",
        description: "VAAKKATH is an upcoming musical project by Haniya Nafisa featuring a dark cinematic atmosphere, emotional storytelling, and immersive sound design. The release explores mystery, emotion, and artistic expression through a unique sonic experience.",
        upcoming: true,
    },
    {
        id: "hola",
        title: "HOLA",
        artist: "M.H.R, Emziii, Efy Music",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 28, 2026",
        duration: "03:55",
        cover: "/release/hola_latest_release.jpeg",
        accent: "#FFB300",
        tag: "OUT NOW",
        description: "A vibrant Malayalam hip-hop collaboration blending street energy, catchy hooks, and contemporary production.",
        link: "https://open.spotify.com/track/4IjK4QLfJThr9s1nhLcmwM"
    },
    {
        id: "zill",
        title: "ZILL",
        artist: "M.H.R, Shafi Kollam, JOKER390P",
        type: "SINGLE",
        tracks: 1,
        date: "FEB 11, 2026",
        duration: "04:07",
        cover: "/release/zill_latest_release.jpeg",
        accent: "#FF4D4D",
        tag: "OUT NOW",
        description: "Melodies collide with Malabari swagger as M.H.R, Shafi Kollam, and JOKER390P craft a cross-genre anthem.",
        link: "https://open.spotify.com/track/12wlJpuAbgMv0OaYmY3r5x"
    },
    {
        id: "evdunna-varunne",
        title: "EVDUNNA VARUNNE?",
        artist: "Efy Music, Simmo",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 2026",
        duration: "03:25",
        cover: "/release/evdunna_latest_release.jpeg",
        accent: "#FF6A00",
        tag: "OUT NOW",
        description: "Straight from the streets with zero filters.",
        link: "https://open.spotify.com/track/7qsiKqtZQNpQ5sPwINtZva"
    },
    {
        id: "venomous-pill",
        title: "VENOMOUS PILL",
        artist: "Nazeeb Billu, Emziii, Amani Kl10",
        type: "SINGLE",
        tracks: 1,
        date: "JUL 2026",
        duration: "02:43",
        cover: "/release/pills_latest_release.png",
        accent: "#8A2BE2",
        tag: "OUT NOW",
        description: "Dark thoughts wrapped in razor-sharp verses.",
        link: "https://open.spotify.com/track/2zpb2Sh2IdzRu7y6FmJdAf"
    },
    {
        id: "baby-call-me-gangster",
        title: "BABY CALL ME GANGSTER",
        artist: "MC Mushti, AMANI KL10",
        type: "SINGLE",
        tracks: 1,
        date: "JAN 09, 2026",
        duration: "03:00",
        cover: "/release/baby_call_me_gangster.jpg",
        accent: "#780606",
        tag: "OUT NOW",
        description: "A dynamic collaboration blending raw storytelling with powerful beats.",
        link: "https://open.spotify.com/track/4R3wna0tMjccTpSY68aQ5g?si=0468730bb90e43f5"
    },
    {
        id: "noor-noor",
        title: "NOOR NOOR",
        artist: "Nazeeb Billu, JK Factor",
        type: "SINGLE",
        tracks: 1,
        date: "JUNE 19, 2026",
        duration: "03:35",
        cover: NoorNoorCover.src,
        accent: "#D4AF37",
        tag: "OUT NOW",
        description: "A cinematic single from Nazeeb Billu and JK Factor with moody, high-energy production.",
        link: "https://open.spotify.com/album/1qSiU5OsR8VQonZLBixHSn"
    }
];