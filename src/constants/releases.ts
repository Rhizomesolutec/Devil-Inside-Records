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
    description: "A vibrant Malayalam hip-hop collaboration blending street energy, catchy hooks, and contemporary production. M.H.R, Emziii, and Efy Music deliver a track built for late-night drives, reels, and packed crowds.",
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
    description: "Melodies collide with Malabari swagger as M.H.R, Shafi Kollam, and JOKER390P craft a cross-genre anthem packed with romance, rap, and raw emotion. Built for late-night drives, loud speakers, and repeat plays.",
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
    description: "Straight from the streets with zero filters. Efy Music and Simmo trade bars, attitude, and raw energy over a hard-hitting beat that refuses to sit still. Loud, unapologetic, and built for maximum replay.",
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
    description: "Dark thoughts wrapped in razor-sharp verses. Nazeeb Billu, Emziii, and Amani Kl10 deliver a venom-laced anthem where pain, ambition, and street poetry collide over a haunting production. No antidote included.",
    link: "https://open.spotify.com/track/2zpb2Sh2IdzRu7y6FmJdAf"
},
];
