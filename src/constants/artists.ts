export const ARTIST_NAMES = [
    "M.H.R", "SA", "JOKER390P", "Lil PAYYAN", "AZWIN", 
    "Nazeeb Billu", "Wraith V", "Efy Music", "Fazil AS", "AMANI KL10",
    "Sage End", "DH STORIES", "MC Mushti", "Emziii", "Lil Roony",
    "Abu x-wrong", "Haniya Nafisa"
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
    fullDescription: string;
    image: string;
    modalImage: string;
    socials: {
        instagram?: string;
        spotify?: string;
        youtube?: string;
    };
}

export const ARTISTS: Artist[] = [
    {
        id: "mhr",
        name: "M.H.R",
        genre: "HIP HOP / RAP",
        description: "Hard-hitting bars and uncompromising flow. M.H.R is the voice of the streets.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "sa",
        name: "SA",
        genre: "EXPERIMENTAL / RAP",
        description: "Pushing boundaries and redefining the sonic landscape of the underground.",
        image: "/artist1.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist1.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "joker390p",
        name: "JOKER390P",
        genre: "TRAP / DRILL",
        description: "Dark melodies and heavy bass. JOKER390P brings the heat every single time.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "lil-payyan",
        name: "Lil PAYYAN",
        genre: "NEW WAVE RAP",
        description: "Young, hungry, and ready to take over. Lil PAYYAN is the next big thing.",
        image: "/artist1.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist1.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "azwin",
        name: "AZWIN",
        genre: "ALTERNATIVE HIP HOP",
        description: "Lyricism that cuts deep. AZWIN tells the stories that others are afraid to touch.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "nazeeb-billu",
        name: "Nazeeb Billu",
        genre: "STREET RAP",
        description: "Authentic, raw, and unapologetic. Nazeeb Billu is as real as it gets.",
        image: "/artist1.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist1.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "wraith-v",
        name: "Wraith V",
        genre: "DARK RAP",
        description: "A phantom in the booth. Wraith V haunts every beat with surgical precision.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "efy-music",
        name: "Efy Music",
        genre: "PRODUCER / ARTIST",
        description: "Architect of the sound. Efy Music builds the foundations of the future.",
        image: "/artist1.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist1.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "fazil-as",
        name: "Fazil AS",
        genre: "Experimental / Hip Hop",
        description: "a genre-bending artist blending hip hop, experimental, and Cultural sounds.",
        image: "/artists/fazil as.png",
        fullDescription: "a genre-bending artist blending hip hop, experimental, and Cultural sounds.",
        modalImage: "/artists/fazil1.jpeg",
        socials: {
            instagram: "https://www.instagram.com/fazil_as_music?igsh=ZG1xMnVxMzEyaWc4",
            spotify: "https://open.spotify.com/artist/6CwkEW6hoZyH96fUkUg6I6?si=Apq-NATpTq6cbG6OQVDhzQ",
            youtube: "https://youtube.com/@fazilasmusic?si=CPEAZ85Z4M9dkgbT"
        }
    },
    {
        id: "amani-kl10",
        name: "AMANI KL10",
        genre: "MUSIC PRODUCER / DJ / ARTIST",
        description: "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation.",
        image: "/artists/AMANI KL10-1.jpeg",
        fullDescription: "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation. Inspired by artists like Martin Garrix, Amani began exploring music through EDM and DJing apps during school, gradually shaping his own independent creative path. Rooted deeply in Kerala’s evolving music scene, he has collaborated with artists including SA, JOKER390P, emzii, Sage End, and MC Mushti, steadily building a sound and identity that feel personal, grounded, and distinctly his own.",
        modalImage: "/artists/AMANI KL10-2.jpeg",
        socials: {
            instagram: "https://www.instagram.com/amanikl10?igsh=aG12YXl1djM3Y3A4",
            spotify: "https://open.spotify.com/artist/0f9QWfK1JSGrmCo2MEXuMr?si=zlcmSyLjRgy0HUa40M6GcQ",
            youtube: "http://www.youtube.com/@AMANIKL10"
        }
    },
    {
        id: "sage-end",
        name: "Sage End",
        genre: "CONSCIOUS RAP",
        description: "Wisdom through rhythm. Sage End is the philosopher of the underground.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "dh-stories",
        name: "DH STORIES",
        genre: "HIP HOP / EDM",
        description: "Kerala-based hip hop & EDM artist. DH STORIES creates energetic, story-driven music inspired by culture, politics, and real-life experiences.",
        image: "/artists/DH.jpeg",
        fullDescription: "Kerala-based hip hop & EDM artist. DH STORIES creates energetic, story-driven music inspired by culture, politics, and real-life experiences.",
        modalImage: "/artists/DH1.jpeg",
        socials: {
            instagram: "https://www.instagram.com/thedhstories?igsh=cWl0MGdmaWl0MTNo",
            spotify: "https://open.spotify.com/artist/5SG8gtaSlus7rlP6BYqSCa?si=JS20ZoniR0mF_KiE9TdI5g",
        }
    },
    {
        id: "mc-mushti",
        name: "MC Mushti",
        genre: "HARDCORE HIP HOP",
        description: "Pure energy and raw power. MC Mushti doesn't just rap, he commands.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "emziii",
        name: "Emziii",
        genre: "NEW SCHOOL",
        description: "Fresh perspective and unique style. Emziii is breaking the mold.",
        image: "/artist1.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist1.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "lil-roony",
        name: "Lil Roony",
        genre: "VIBE RAP",
        description: "Catchy hooks and effortless cool. Lil Roony is always on another level.",
        image: "/artist-image.png",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist-image.png",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "abu-x-wrong",
        name: "Abu x-wrong",
        genre: "MELODIC RAP",
        description: "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements.",
        image: "/artists/Abu.JPEG",
        fullDescription: "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements. Since 2018, he has been an influential voice in the scene, gaining widespread recognition in 2019 when his track became one of the first Malayalam rap songs to reach millions of views, contributing significantly to the growth of Malayalam rap culture.",
        modalImage: "/artists/Abu1.JPEG",
        socials: {
            instagram: "https://www.instagram.com/abu_x_wrong?igsh=MW83MnpiYmE5bzU0dw==",
            spotify: "https://open.spotify.com/artist/5pzpptEtegqrjysHniMto5?si=vIZd8Vo4RCytYDKKXQIj6A",
            youtube: "https://youtube.com/@abuxwrong?si=VEf2eFNuNr1oa0kA"
        }
    },
    {
        id: "haniya-nafisa",
        name: "Haniya Nafisa",
        genre: "INDEPENDENT / MULTI-GENRE",
        description: "Haniya Nafisa is a Kerala-based independent artist known for exploring various music genres with a fresh and modern style.",
        image: "/artists/Haniya.jpg",
        fullDescription: "Haniya Nafisa is a Kerala-based independent artist known for exploring various music genres with a fresh and modern style.",
        modalImage: "/artists/Haniya1.JPEG",
        socials: {
            instagram: "https://www.instagram.com/haniyanafisaa?igsh=azhtbmE1aHNoeDgx",
            spotify: "https://open.spotify.com/artist/2qE6XvN9lbEFGFfQOREsr0?si=K9B54F3wRWSqvcLoblw6ag",
            youtube: "https://youtube.com/@haniyanafisa?si=EacWcuYCu22tpu4p"
        }
    },
];
