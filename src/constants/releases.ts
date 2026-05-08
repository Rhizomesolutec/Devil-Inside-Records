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
    audio?: string;
}

export const RELEASES: Release[] = [
    {
        id: "blood-meridian",
        title: "BLOOD MERIDIAN",
        artist: "PHANTOM X",
        type: "ALBUM",
        tracks: 14,
        date: "APR 24, 2025",
        duration: "02:48",
        cover: "/release-blood-meridian.png",
        accent: "#780606",
        tag: "NEW DROP",
        description: "A relentless journey through the underbelly of the city. 14 tracks of uncut rage, hunger, and triumph. Phantom X's most ambitious project yet.",
        audio: "/music/Mulchedi.mp3",
    },
    {
        id: "static-noise",
        title: "STATIC NOISE",
        artist: "KINETIC",
        type: "SINGLE",
        tracks: 1,
        date: "MAY 10, 2025",
        duration: "03:12",
        cover: "/release-static-noise.png",
        accent: "#00FF5E",
        tag: "OUT NOW",
        description: "Raw. Distorted. Kinetic cuts through the frequency with a single that hits like a power surge. Produced entirely on stolen studio time.",
        audio: "/music/XXXTENTACION_-_Revenge_(Rilds.com).mp3",
    },
    {
        id: "ghost-protocol",
        title: "GHOST PROTOCOL",
        artist: "SHADE",
        type: "EP",
        tracks: 6,
        date: "MAR 18, 2025",
        duration: "03:36",
        cover: "/release-ghost-protocol.png",
        accent: "#E0E0E0",
        tag: "UNDERGROUND",
        description: "Six tracks of shadow. SHADE moves through the underground with surgical precision — lyricism that leaves marks long after the beat drops.",
        audio: "/music/Mulchedi.mp3",
    },
    {
        id: "iron-crown",
        title: "IRON CROWN",
        artist: "KROWN KOLLECTIVE",
        type: "ALBUM",
        tracks: 16,
        date: "FEB 02, 2025",
        duration: "03:45",
        cover: "/release-iron-crown.png",
        accent: "#C9A84C",
        tag: "FEATURED",
        description: "The throne was never given. The Krown Kollective built it — bar by bar, track by track. 16 anthems for those who refuse to kneel.",
        audio: "/music/XXXTENTACION_-_Revenge_(Rilds.com).mp3",
    },
];
