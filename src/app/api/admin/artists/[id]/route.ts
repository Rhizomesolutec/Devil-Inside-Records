import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB, stripMongoMeta } from "@/lib/mongodb";
import { ArtistModel } from "@/models/Artist";

async function unauthorized() {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        if (!(await isAdminAuthenticated())) return unauthorized();
        await connectDB();
        const { id } = await params;
        const body = stripMongoMeta(await request.json());
        delete body.id;
        const socials = (body.socials && typeof body.socials === "object" ? body.socials : {}) as Record<string, unknown>;
        const payload = {
            name: body.name,
            genre: body.genre,
            description: body.description,
            fullDescription: body.fullDescription || body.description,
            image: body.image,
            modalImage: body.modalImage || body.image,
            socials: {
                instagram: body.instagram ?? socials.instagram ?? "",
                spotify: body.spotify ?? socials.spotify ?? "",
                youtube: body.youtube ?? socials.youtube ?? "",
            },
        };
        const updated = await ArtistModel.findOneAndUpdate({ id: decodeURIComponent(id) }, payload, { new: true });
        if (!updated) {
            return NextResponse.json({ ok: false, error: "Artist not found." }, { status: 404 });
        }
        return NextResponse.json({ ok: true, item: updated });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update artist";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        if (!(await isAdminAuthenticated())) return unauthorized();
        await connectDB();
        const { id } = await params;
        const deleted = await ArtistModel.findOneAndDelete({ id: decodeURIComponent(id) });
        if (!deleted) {
            return NextResponse.json({ ok: false, error: "Artist not found." }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete artist";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
