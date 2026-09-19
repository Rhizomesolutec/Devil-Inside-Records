import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { syncWebsiteData } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await syncWebsiteData();
        return NextResponse.json({ ok: true, ...result });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to sync site data";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
