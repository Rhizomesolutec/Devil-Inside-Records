import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB, stripMongoMeta } from "@/lib/mongodb";
import { Catalogue } from "@/models/Catalogue";

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
        const updated = await Catalogue.findOneAndUpdate({ id: decodeURIComponent(id) }, body, { new: true });
        if (!updated) {
            return NextResponse.json({ ok: false, error: "Catalogue not found." }, { status: 404 });
        }
        return NextResponse.json({ ok: true, item: updated });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update catalogue";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        if (!(await isAdminAuthenticated())) return unauthorized();
        await connectDB();
        const { id } = await params;
        const deleted = await Catalogue.findOneAndDelete({ id: decodeURIComponent(id) });
        if (!deleted) {
            return NextResponse.json({ ok: false, error: "Catalogue not found." }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete catalogue";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
