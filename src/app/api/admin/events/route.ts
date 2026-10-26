import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ensureSeeded } from "@/lib/seed";
import { EventModel } from "@/models/Event";
import { slugify } from "@/lib/media";

export const dynamic = "force-dynamic";

async function unauthorized() {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function parseDates(value: unknown) {
    if (Array.isArray(value)) return value.map(String).filter(Boolean);
    if (typeof value === "string") {
        return value.split("\n").map((line) => line.trim()).filter(Boolean);
    }
    return [];
}

export async function GET() {
    try {
        if (!(await isAdminAuthenticated())) return unauthorized();
        await connectDB();
        await ensureSeeded();
        const items = await EventModel.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json({ ok: true, items: items.map((doc) => ({ ...doc, _id: String(doc._id) })) });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load events";
        return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAdminAuthenticated())) return unauthorized();
    await connectDB();
    const body = await request.json();
    if (!body.title) {
        return NextResponse.json({ ok: false, error: "Title is required." }, { status: 400 });
    }

    try {
        const created = await EventModel.create({
            id: slugify(body.id || body.title),
            title: body.title,
            tag: body.tag || "LIVE EVENT",
            date: body.date || "",
            dates: parseDates(body.dates),
            venue: body.venue || "",
            image: body.image || "",
            ticketUrl: body.ticketUrl || "",
            ticketLabel: body.ticketLabel || "GET TICKETS",
            placeholder: Boolean(body.placeholder),
            over: Boolean(body.over),
            placement: body.placement === "featured" ? "featured" : "mhr-sub",
        });
        return NextResponse.json({ ok: true, item: created });
    } catch (error) {
        const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
        const message = duplicate
            ? "An event with this title already exists."
            : error instanceof Error
              ? error.message
              : "Failed to save event";
        return NextResponse.json({ ok: false, error: message }, { status: duplicate ? 409 : 500 });
    }
}
