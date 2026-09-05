import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ensureSeeded } from "@/lib/seed";
import { ArtistModel } from "@/models/Artist";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        await ensureSeeded();
        const docs = await ArtistModel.find().sort({ name: 1 }).lean();
        const items = docs.map((doc) => ({ ...doc, _id: String(doc._id) }));
        return NextResponse.json({ ok: true, items });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load artists";
        return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
    }
}
