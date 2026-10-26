import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ensureSeeded } from "@/lib/seed";
import { Catalogue } from "@/models/Catalogue";
import { slugify } from "@/lib/media";

export const dynamic = "force-dynamic";

async function unauthorized() {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
    try {
        if (!(await isAdminAuthenticated())) return unauthorized();
        await connectDB();
        await ensureSeeded();
        const items = await Catalogue.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json({ ok: true, items: items.map((doc) => ({ ...doc, _id: String(doc._id) })) });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load catalogues";
        return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAdminAuthenticated())) return unauthorized();
    await connectDB();
    const body = await request.json();
    if (!body.title || !body.artist || !body.cover) {
        return NextResponse.json({ ok: false, error: "Title, artist, and cover are required." }, { status: 400 });
    }

    const id = slugify(body.id || body.title);
    try {
        const created = await Catalogue.create({
            id,
            title: body.title,
            artist: body.artist,
            type: body.type || "SINGLE",
            tracks: body.tracks || 1,
            date: body.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase(),
            duration: body.duration || "",
            cover: body.cover,
            accent: body.accent || "#C81808",
            tag: body.tag || "OUT NOW",
            description: body.description || "",
            link: body.link || "",
            audio: body.audio || "",
            youtubeLink: body.youtubeLink || "",
            appleMusicLink: body.appleMusicLink || "",
            upcoming: Boolean(body.upcoming),
        });
        return NextResponse.json({ ok: true, item: created });
    } catch (error) {
        const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
        const message = duplicate
            ? "A catalogue with this title already exists."
            : error instanceof Error
              ? error.message
              : "Failed to save catalogue";
        return NextResponse.json({ ok: false, error: message }, { status: duplicate ? 409 : 500 });
    }
}
