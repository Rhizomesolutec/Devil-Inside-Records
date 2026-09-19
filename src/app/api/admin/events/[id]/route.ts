import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB, stripMongoMeta } from "@/lib/mongodb";
import { EventModel } from "@/models/Event";

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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthenticated())) return unauthorized();
    await connectDB();
    const { id } = await params;
    const body = stripMongoMeta(await request.json());
    delete body.id;
    const payload = {
        title: body.title,
        tag: body.tag,
        date: body.date || "",
        dates: parseDates(body.dates),
        venue: body.venue || "",
        image: body.image || "",
        ticketUrl: body.ticketUrl || "",
        ticketLabel: body.ticketLabel || "GET TICKETS",
        placeholder: Boolean(body.placeholder),
        placement: body.placement === "featured" ? "featured" : "mhr-sub",
    };
    const updated = await EventModel.findOneAndUpdate({ id }, payload, { new: true });
    if (!updated) {
        return NextResponse.json({ ok: false, error: "Event not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthenticated())) return unauthorized();
    await connectDB();
    const { id } = await params;
    const deleted = await EventModel.findOneAndDelete({ id });
    if (!deleted) {
        return NextResponse.json({ ok: false, error: "Event not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
}
