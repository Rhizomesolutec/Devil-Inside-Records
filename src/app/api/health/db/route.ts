import { NextResponse } from "next/server";
import { connectDB, getDbStatus } from "@/lib/mongodb";

export async function GET() {
    try {
        await connectDB();
        const db = getDbStatus();

        return NextResponse.json({
            ok: true,
            message: "MongoDB connected successfully",
            db,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown database error";

        return NextResponse.json(
            {
                ok: false,
                message: "MongoDB connection failed",
                error: message,
            },
            { status: 500 }
        );
    }
}
