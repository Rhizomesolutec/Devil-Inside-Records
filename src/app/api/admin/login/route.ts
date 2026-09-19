import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, hashAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
        return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD is not set." }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    if (!body?.password || body.password !== password) {
        return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, hashAdminSession(password), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    return response;
}
