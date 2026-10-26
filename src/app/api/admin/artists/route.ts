import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ensureSeeded } from "@/lib/seed";
import { ArtistModel } from "@/models/Artist";
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
        const items = await ArtistModel.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json({ ok: true, items: items.map((doc) => ({ ...doc, _id: String(doc._id) })) });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load artists";
        return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAdminAuthenticated())) return unauthorized();
    await connectDB();
    const body = await request.json();
    if (!body.name || !body.image) {
        return NextResponse.json({ ok: false, error: "Name and image are required." }, { status: 400 });
    }

    try {
        const created = await ArtistModel.create({
            id: slugify(body.id || body.name),
            name: body.name,
            genre: body.genre || "",
            description: body.description || "",
            fullDescription: body.fullDescription || body.description || "",
            image: body.image,
            modalImage: body.modalImage || body.image,
            socials: {
                instagram: body.instagram || "",
                spotify: body.spotify || "",
                youtube: body.youtube || "",
            },
        });
        return NextResponse.json({ ok: true, item: created });
    } catch (error) {
        const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
        const message = duplicate
            ? "An artist with this name already exists."
            : error instanceof Error
              ? error.message
              : "Failed to save artist";
        return NextResponse.json({ ok: false, error: message }, { status: duplicate ? 409 : 500 });
    }
}
