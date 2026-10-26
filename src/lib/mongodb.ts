import { promises as dns, setDefaultResultOrder } from "node:dns";
import mongoose from "mongoose";

setDefaultResultOrder("ipv4first");

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL in environment variables.");
}

const mongoUri: string = MONGODB_URL;

const connectOptions = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 15000,
    family: 4 as const,
};

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

function isDnsError(error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return /ESERVFAIL|ENOTFOUND|ENODATA|queryTxt|querySrv|EREFUSED|ETIMEOUT/i.test(message);
}

async function standardUriFromSrv(srvUri: string) {
    const parsed = new URL(srvUri.replace(/^mongodb\+srv:\/\//i, "https://"));
    const records = await dns.resolveSrv(`_mongodb._tcp.${parsed.hostname}`);
    if (!records.length) {
        throw new Error("No MongoDB hosts found from SRV records.");
    }

    const hosts = records
        .map((record) => `${record.name}:${record.port || 27017}`)
        .join(",");
    const auth = `${encodeURIComponent(parsed.username)}:${encodeURIComponent(parsed.password)}`;
    const dbName = parsed.pathname || "/";
    const params = new URLSearchParams(parsed.search);
    params.set("tls", "true");
    if (!params.has("authSource")) params.set("authSource", "admin");
    params.set("retryWrites", "true");

    return `mongodb://${auth}@${hosts}${dbName}?${params.toString()}`;
}

async function openConnection() {
    try {
        return await mongoose.connect(mongoUri, connectOptions);
    } catch (error) {
        if (mongoUri.startsWith("mongodb+srv://") && isDnsError(error)) {
            const fallbackUri = await standardUriFromSrv(mongoUri);
            return await mongoose.connect(fallbackUri, connectOptions);
        }
        throw error;
    }
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (cached.promise) {
        try {
            cached.conn = await cached.promise;
            return cached.conn;
        } catch {
            cached.promise = null;
            cached.conn = null;
        }
    }

    cached.promise = openConnection().catch((error) => {
        cached.promise = null;
        cached.conn = null;
        throw error;
    });

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
