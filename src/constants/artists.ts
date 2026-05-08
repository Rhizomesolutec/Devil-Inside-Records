export const ARTIST_NAMES = [
    "KXNG VEX", "RYLO KANE", "LUCIFER JAY", "DARKO", "ZAYVEN", 
    "PHANTOM X", "KINETIC", "SHADE", "KROWN KOLLECTIVE", "VODKA",
    "GHOST", "BLITZ", "REAPER", "ONYX", "STORM", "VENOM"
];

export const VIBES = [
    "RAW SOUND", "REAL STORIES", "NO LIMITS", "UNDERGROUND", 
    "UNAPOLOGETIC", "DEVIL INSIDE", "BUILT DIFFERENT", "NO RULES"
];

export interface Artist {
    id: string;
    name: string;
    genre: string;
    description: string;
    image: string;
}

export const ARTISTS: Artist[] = [
    {
        id: "kxng-vex",
        name: "KXNG VEX",
        genre: "TRAP / DRILL",
        description: "The crown was never given. Vex built it bar by bar from the underground up.",
        image: "/artist-image.png",
    },
    {
        id: "phantom-x",
        name: "PHANTOM X",
        genre: "DARK RAP",
        description: "A shadow in plain sight. 14 tracks of uncut rage, hunger, and unapologetic truth.",
        image: "/artist1.png",
    },
    {
        id: "kinetic",
        name: "KINETIC",
        genre: "ELECTRONIC / RAP",
        description: "Raw. Distorted. A force of nature that cuts through the frequency.",
        image: "/artist-image.png",
    },
    {
        id: "shade",
        name: "SHADE",
        genre: "UNDERGROUND HIP-HOP",
        description: "Six tracks of shadow. Surgical lyricism that leaves marks long after the beat drops.",
        image: "/artist1.png",
    },
    {
        id: "krown-kollective",
        name: "KROWN KOLLECTIVE",
        genre: "COLLECTIVE",
        description: "The throne was never given. 16 anthems for those who refuse to kneel.",
        image: "/artist-image.png",
    },
    {
        id: "rylo-kane",
        name: "RYLO KANE",
        genre: "STREET RAP",
        description: "Ice cold delivery. Rylo turns silence into pressure and pressure into hits.",
        image: "/artist1.png",
    },
    {
        id: "lucifer-jay",
        name: "LUCIFER JAY",
        genre: "TRAP / PHONK",
        description: "Hell-sent energy. Jay moves through every beat like he owns the frequency.",
        image: "/artist-image.png",
    },
    {
        id: "darko",
        name: "DARKO",
        genre: "BOOM BAP / NOIR",
        description: "Deep cuts, darker melodies. Darko's music feels like a city at 3AM.",
        image: "/artist-image.png",
    },
];
