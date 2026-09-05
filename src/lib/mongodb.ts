import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL in environment variables.");
}

const mongoUri: string = MONGODB_URL;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = globalThis as typeof globalThis & {
    mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongooseCache ?? {
    conn: null,
    promise: null,
};

globalForMongoose.mongooseCache = cached;

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoUri, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export function stripMongoMeta(body: unknown): Record<string, unknown> {
    const clone = { ...((body && typeof body === "object" ? body : {}) as Record<string, unknown>) };
    delete clone._id;
    delete clone.__v;
    delete clone.createdAt;
    delete clone.updatedAt;
    return clone;
}

export function getDbStatus() {
    const states = ["disconnected", "connected", "connecting", "disconnecting"] as const;
    const readyState = mongoose.connection.readyState;

    return {
        readyState,
        status: states[readyState as 0 | 1 | 2 | 3] ?? "unknown",
        name: mongoose.connection.name || null,
        host: mongoose.connection.host || null,
    };
}
