import { connectDB } from "@/lib/mongodb";
import { mediaSrc } from "@/lib/media";
import { Catalogue } from "@/models/Catalogue";
import { ArtistModel } from "@/models/Artist";
import { EventModel } from "@/models/Event";
import { RELEASES } from "@/constants/releases";
import { ARTISTS } from "@/constants/artists";
import { EVENTS } from "@/constants/events";

const FEATURED_EVENT_IDS = ["mhr-friends-india-tour", "fake-tattoos"];

function catalogueDoc(release: (typeof RELEASES)[number], index: number) {
    return {
        id: release.id,
        title: release.title,
        artist: release.artist,
        type: release.type,
        tracks: release.tracks,
        date: release.date,
        duration: release.duration,
        cover: mediaSrc(release.cover),
        accent: release.accent,
        tag: release.tag,
        description: release.description,
        link: release.link || "",
        audio: release.audio || "",
        youtubeLink: release.youtubeLink || "",
        appleMusicLink: release.appleMusicLink || "",
        upcoming: Boolean(release.upcoming),
        createdAt: new Date(Date.now() - (RELEASES.length - index) * 60000),
    };
}

function artistDoc(artist: (typeof ARTISTS)[number]) {
    return {
        id: artist.id,
        name: artist.name,
        genre: artist.genre,
        description: artist.description,
        fullDescription: artist.fullDescription,
        image: mediaSrc(artist.image),
        modalImage: mediaSrc(artist.modalImage),
        socials: {
            instagram: artist.socials.instagram || "",
            spotify: artist.socials.spotify || "",
            youtube: artist.socials.youtube || "",
        },
    };
}

function eventDoc(event: (typeof EVENTS)[number]) {
    return {
        id: event.id,
        title: event.title,
        tag: event.tag,
        date: event.date || "",
        dates: event.dates || [],
        venue: event.venue || "",
        image: event.image || "",
        ticketUrl: event.ticketUrl || "",
        ticketLabel: event.ticketLabel || "GET TICKETS",
        placeholder: Boolean(event.placeholder),
        placement: FEATURED_EVENT_IDS.includes(event.id) ? "featured" : "mhr-sub",
    };
}

export async function syncWebsiteData() {
    await connectDB();

    const catalogueOps = RELEASES.map((release, index) => {
        const { createdAt, ...fields } = catalogueDoc(release, index);
        return {
            updateOne: {
                filter: { id: release.id },
                update: { $set: fields, $setOnInsert: { createdAt } },
                upsert: true,
            },
        };
    });

    const artistOps = ARTISTS.map((artist) => ({
        updateOne: {
            filter: { id: artist.id },
            update: { $set: artistDoc(artist) },
            upsert: true,
        },
    }));

    const eventOps = EVENTS.map((event) => ({
        updateOne: {
            filter: { id: event.id },
            update: { $set: eventDoc(event) },
            upsert: true,
        },
    }));

    await Promise.all([
        Catalogue.bulkWrite(catalogueOps),
        ArtistModel.bulkWrite(artistOps),
        EventModel.bulkWrite(eventOps),
    ]);

    const [catalogues, artists, events] = await Promise.all([
        Catalogue.countDocuments(),
        ArtistModel.countDocuments(),
        EventModel.countDocuments(),
    ]);

    return {
        pushed: {
            catalogues: RELEASES.length,
            artists: ARTISTS.length,
            events: EVENTS.length,
        },
        totals: { catalogues, artists, events },
    };
}

export async function ensureSeeded() {
    await connectDB();

    const [catalogueCount, artistCount, eventCount] = await Promise.all([
        Catalogue.countDocuments(),
        ArtistModel.countDocuments(),
        EventModel.countDocuments(),
    ]);

    if (catalogueCount === 0) {
        await Catalogue.insertMany(RELEASES.map((release, index) => catalogueDoc(release, index)));
    }

    if (artistCount === 0) {
        await ArtistModel.insertMany(ARTISTS.map((artist) => artistDoc(artist)));
    }

    if (eventCount === 0) {
        await EventModel.insertMany(EVENTS.map((event) => eventDoc(event)));
    }
}
