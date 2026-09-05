import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ensureSeeded } from "@/lib/seed";
import { Catalogue } from "@/models/Catalogue";
import { toSpotifyEmbed } from "@/lib/media";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        await connectDB();
        await ensureSeeded();

        const { searchParams } = new URL(request.url);
        const latest = searchParams.get("latest");
        const includeUpcoming = searchParams.get("upcoming") === "1";

        const query = includeUpcoming ? {} : { upcoming: { $ne: true } };
        const limit = latest ? Number(latest) : 0;

        const findQuery = Catalogue.find(query).sort({ createdAt: -1, _id: -1 });
        if (Number.isFinite(limit) && limit > 0) {
            findQuery.limit(limit);
        }
        const docs = await findQuery.lean();

        const items = docs.map((doc) => ({
            ...doc,
            _id: String(doc._id),
            embedUrl: toSpotifyEmbed(doc.link),
        }));

        return NextResponse.json({ ok: true, items });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load catalogues";
        return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
    }
}
