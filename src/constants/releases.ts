import type { StaticImageData } from "next/image";
import NoorNoorCover from "@/image/noor-noor.webp";

export interface Release {
    id: string;
    title: string;
    artist: string;
    type: string;
    tracks: number | string;
    date: string;
    duration: string;
    cover: string | StaticImageData;
    accent: string;
    tag: string;
    description: string;
    link?: string;
    audio?: string;
    upcoming?: boolean;
    loading?: "lazy" | "eager";
    youtubeLink?: string;
    appleMusicLink?: string;
}

export const RELEASES: Release[] = [
    {
        id: "vaakkath",
        title: "VAAKKATH",
        artist: "Haniya Nafisa",
        type: "ALBUM",
        tracks: 9,
        date: "JUNE 26, 2026",
        duration: "28:44",
        cover: "/release/vaakkath_cover.webp",
        accent: "#F5C518",
        tag: "OUT NOW",
        description: "VAAKKATH is the debut studio album by Haniya Nafisa featuring a dark cinematic atmosphere, emotional storytelling, and immersive sound design. The release explores mystery, emotion, and artistic expression through a unique sonic experience.",
        upcoming: false,
        link: "https://open.spotify.com/album/0z6HvSQ7XHrpcpZugjIugW?si=ZxtCmGx1TaWCD1SzfeYVwA",
        loading: "lazy"
    },
    {
        id: "hola",
        title: "HOLA",
        artist: "M.H.R, Emziii, Efy Music",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 28, 2026",
        duration: "03:55",
        cover: "/release/hola_latest_release.webp",
        accent: "#FFB300",
        tag: "OUT NOW",
        description: "A vibrant Malayalam hip-hop collaboration blending street energy, catchy hooks, and contemporary production.",
        link: "https://open.spotify.com/track/4IjK4QLfJThr9s1nhLcmwM",
        loading: "lazy"
    },
    {
        id: "zill",
        title: "ZILL",
        artist: "M.H.R, Shafi Kollam, JOKER390P",
        type: "SINGLE",
        tracks: 1,
        date: "FEB 11, 2026",
        duration: "04:07",
        cover: "/release/zill_latest_release.webp",
        accent: "#FF4D4D",
        tag: "OUT NOW",
        description: "Melodies collide with Malabari swagger as M.H.R, Shafi Kollam, and JOKER390P craft a cross-genre anthem.",
        link: "https://open.spotify.com/track/12wlJpuAbgMv0OaYmY3r5x",
        loading: "lazy"
    },
    {
        id: "evdunna-varunne",
        title: "EVDUNNA VARUNNE?",
        artist: "Efy Music, Simmo",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 2026",
        duration: "03:25",
        cover: "/release/evdunna_latest_release.webp",
        accent: "#FF6A00",
        tag: "OUT NOW",
        description: "Straight from the streets with zero filters.",
        link: "https://open.spotify.com/track/7qsiKqtZQNpQ5sPwINtZva",
        loading: "lazy"
    },
    {
        id: "venomous-pill",
        title: "VENOMOUS PILL",
        artist: "Nazeeb Billu, Emziii, Amani Kl10",
        type: "SINGLE",
        tracks: 1,
        date: "JUL 2026",
        duration: "02:43",
        cover: "/release/pills_latest_release.webp",
        accent: "#8A2BE2",
        tag: "OUT NOW",
        description: "Dark thoughts wrapped in razor-sharp verses.",
        link: "https://open.spotify.com/track/2zpb2Sh2IdzRu7y6FmJdAf",
        loading: "lazy"
    },
    {
        id: "baby-call-me-gangster",
        title: "BABY CALL ME GANGSTER",
        artist: "MC Mushti, AMANI KL10",
        type: "SINGLE",
        tracks: 1,
        date: "JAN 09, 2026",
        duration: "03:00",
        cover: "/release/baby_call_me_gangster.webp",
        accent: "#780606",
        tag: "OUT NOW",
        description: "A dynamic collaboration blending raw storytelling with powerful beats.",
        link: "https://open.spotify.com/track/4R3wna0tMjccTpSY68aQ5g?si=0468730bb90e43f5",
        loading: "lazy"
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
    },
    {
        id: "chaathan-party",
        title: "CHAATHAN PARTY",
        artist: "M.H.R, JOKER390P",
        type: "SINGLE",
        tracks: 1,
        date: "JUL 03, 2026",
        duration: "04:08",
        cover: "/release/Chaathan Party.webp",
        accent: "#A30000",
        tag: "OUT NOW",
        description: "A powerful hip-hop collaboration by M.H.R and JOKER390P, delivering intense lyrics, heavy bass, and raw street energy.",
        link: "https://open.spotify.com/album/7iX3yJ52EXjlH7g6CUlios?si=IIALyC4UTHWqPF-e4YmGsQ",
        loading: "lazy"
    },
    {
        id: "one-eleven",
        title: "1:11",
        artist: "JOKER390P, M.H.R",
        type: "SINGLE",
        tracks: 1,
        date: "JUNE 22, 2026",
        duration: "02:21",
        cover: "/release/One Eleven.webp",
        accent: "#344CB7",
        tag: "OUT NOW",
        description: "A hard-hitting hip-hop track by JOKER390P and M.H.R, showcasing smooth flows, sharp bars, and a hypnotic beat.",
        link: "https://open.spotify.com/album/4gxwF36HPEOlQO4D10f4gp?si=tt1ngtsDQ1eftpYcps_AFQ",
        loading: "lazy"
    },
    {
        id: "concrete-killers",
        title: "CONCRETE KILLERS",
        artist: "MC Mushti, JORJ.",
        type: "SINGLE",
        tracks: 1,
        date: "JUNE 26, 2026",
        duration: "03:07",
        cover: "/release/CONCRETE KILLERS.webp",
        accent: "#ED0818",
        tag: "OUT NOW",
        description: "A hard-hitting hip-hop single by MC Mushti and JORJ., delivering intense flow and concrete street energy.",
        link: "https://open.spotify.com/track/0oQv7dJ8TrCn1Ea9I5gNuy?si=7d2d044f658849f4",
        loading: "lazy"
    },
    {
        id: "hubb",
        title: "HUBB",
        artist: "Lil Roony, VXAL",
        type: "SINGLE",
        tracks: 1,
        date: "JUL 06, 2026",
        duration: "02:18",
        cover: "/release/HUBB.webp",
        accent: "#A04878",
        tag: "OUT NOW",
        description: "A hard-hitting collaboration blending raw energy, sharp flows, and intense production.",
        link: "https://open.spotify.com/track/7amVQ8KypdMvh2aslWxKNK?si=d1ef882151a141d4",
        loading: "lazy"
    },
    {
        id: "paapachillu",
        title: "PAAPACHILLU",
        artist: "Pedappiller, PARAVA 98",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 26, 2026",
        duration: "02:30",
        cover: "/release/Paapachillu.webp",
        accent: "#E32D26",
        tag: "OUT NOW",
        description: "A gritty and energetic street anthem showcasing raw flows and signature production.",
        link: "https://open.spotify.com/track/1i1i7jtPB7cXa7Pnx4aMXE?si=4eb1747eeba14994",
        loading: "lazy"
    },
    {
        id: "moopathyar",
        title: "MOOPATHYAR",
        artist: "M.H.R, Nazeeb Billu",
        type: "SINGLE",
        tracks: 1,
        date: "JUL 21, 2026",
        duration: "04:02",
        cover: "/release/Moopathyar.jpeg",
        accent: "#C81808",
        tag: "OUT NOW",
        description: "A powerful hip-hop single by M.H.R and Nazeeb Billu, showcasing smooth flows and signature street-level production.",
        link: "https://open.spotify.com/album/79AONuETglgT8VUBC2Guy0?si=wQWbZlMeSLSXdmdke5cvOQ",
        youtubeLink: "https://youtu.be/eCCoGebYRgA?si=_YEC45AtA0hU-vuT",
        appleMusicLink: "https://music.apple.com/in/album/moopathyar/6793023647?i=6793023653",
        loading: "lazy"
    },
    {
        id: "ruhani",
        title: "Ruhani",
        artist: "Nazeeb Billu, Fathima Jahaan",
        type: "SINGLE",
        tracks: 1,
        date: "AUG 07, 2026",
        duration: "TBA",
        cover: "/release/Ruhani.webp",
        accent: "#F5C518",
        tag: "OUT NOW",
        description: "A single from Nazeeb Billu and Fathima Jahaan built around mood, momentum, and atmospheric energy.",
        link: "https://open.spotify.com/album/6AbmjhcOTUzoXx9iMi9FUF?si=DMyYl18MSNCFlP7hxgMnHQ&utm_source=copy-link",
        upcoming: false,
        loading: "lazy"
    },
    {
        id: "dooram",
        title: "Dooram",
        artist: "Christo George, Evugin, Laika Jamal, Ann Lilly Jose",
        type: "SINGLE",
        tracks: 1,
        date: "AUG 07, 2026",
        duration: "TBA",
        cover: "/release/Dooram.webp",
        accent: "#C81808",
        tag: "OUT NOW",
        description: "A released single by Christo George, Evugin, Laika Jamal, and Ann Lilly Jose.",
        link: "https://open.spotify.com/album/2TyAIonCuulJIK0dIiRHLA?si=HoDLkF1KROeihNDbqYHCig&utm_source=copy-link&sci=spotify%3Acard-config%3A1PJj7dCd16aljyyh10cQkV",
        loading: "lazy"
    },
    {
        id: "aadhikannu",
        title: "ആദിക്കന്ന്",
        artist: "Saga End",
        type: "EP",
        tracks: 6,
        date: "AUG 09, 2026",
        duration: "21:40",
        cover: "/release/Aadhikannu.webp",
        accent: "#B34E94",
        tag: "OUT NOW",
        description: "A 6-track Malayalam EP by Saga End blending sharp lyricism, melodic production, and cinematic mood.",
        link: "https://open.spotify.com/album/6bRtQRIJURqAqzDC7vc5go?si=oSdgcTm2R-ilF51yGlT88Q&utm_source=copy-link",
        upcoming: false,
        loading: "lazy"
    },
    {
        id: "sab6",
        title: "SAB6",
        artist: "Lil PAYYAN",
        type: "ALBUM",
        tracks: 16,
        date: "JULY 28, 2026",
        duration: "48:32",
        cover: "/release/SAB6.webp",
        accent: "#C81808",
        tag: "OUT NOW",
        description: "A groundbreaking studio album by SAB6 featuring raw flows and signature production. A multi-track collaborative masterpiece.",
        link: "https://open.spotify.com/album/0GFPL3y58oGawRdvwhujuZ?si=NjHhC84PS8qQ33pZ_ESkXw",
        upcoming: false,
        loading: "lazy"
    },
    {
        id: "a-part",
        title: "A PART",
        artist: "SA, Sage End",
        type: "SINGLE",
        tracks: 1,
        date: "AUGUST 21, 2026",
        duration: "02:59",
        cover: "/release/A Part.webp",
        accent: "#C81808",
        tag: "OUT NOW",
        description: "A single by SA and Sage End.",
        link: "https://open.spotify.com/track/6uDw4cWCea0ZpHVhFJfb51?si=19a64b6d78a64fe8",
        appleMusicLink: "https://music.apple.com/in/album/sa-a-part/6803553953?i=6803553957",
        upcoming: false,
        loading: "lazy"
    },
    {
        id: "mostly-owh",
        title: "mostly OWH",
        artist: "SA",
        type: "EP",
        tracks: 7,
        date: "AUGUST 28, 2026",
        duration: "16:00",
        cover: "/release/Mostly owh.webp",
        accent: "#C81808",
        tag: "OUT NOW",
        description: "A 7-track EP by SA showcasing signature beats, raw flows, and underground energy.",
        link: "https://open.spotify.com/album/5Ft9cfmWcIeuEakJEpKtPg?si=cyEZOqh3SVe7cLrw0dO1Yg",
        appleMusicLink: "https://music.apple.com/in/album/mostly-owh/6806211960",
        upcoming: false,
        loading: "lazy"
    },
    {
        id: "orma",
        title: "ORMA",
        artist: "Lil PAYYAN, AZWIN",
        type: "SINGLE",
        tracks: 1,
        date: "AUGUST 30, 2026",
        duration: "TBA",
        cover: "/release/ORMA.webp",
        accent: "#C81808",
        tag: "OUT NOW",
        description: "A single by Lil PAYYAN and AZWIN.",
        link: "https://open.spotify.com/album/1TCPhJgB0X3x9kqbZeMM5h?si=082978884df140c0",
        appleMusicLink: "https://music.apple.com/in/album/orma-single/1689888570",
        upcoming: false,
        loading: "lazy"
    }
];



