import { NextRequest, NextResponse } from "next/server";

async function expectedToken() {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) return null;
    const data = new TextEncoder().encode(`devil-inside-admin:${password}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    const token = request.cookies.get("dir_admin")?.value;
    const expected = await expectedToken();
    if (!expected || token !== expected) {
        const login = new URL("/admin/login", request.url);
        return NextResponse.redirect(login);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};
