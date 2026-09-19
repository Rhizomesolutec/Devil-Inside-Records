import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
    const text = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    for (const raw of text.split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq < 1) continue;
        const key = line.slice(0, eq).trim();
        let value = line.slice(eq + 1).trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
    }
}

loadEnv();

const base = process.env.SITE_URL || "http://localhost:3000";

const loginRes = await fetch(`${base}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
});

if (!loginRes.ok) {
    console.error("Login failed:", loginRes.status, await loginRes.text());
    process.exit(1);
}

const cookies = loginRes.headers.getSetCookie?.().map((cookie) => cookie.split(";")[0])
    ?? [String(loginRes.headers.get("set-cookie") || "").split(";")[0]];

const syncRes = await fetch(`${base}/api/admin/sync-site-data`, {
    method: "POST",
    headers: { cookie: cookies.filter(Boolean).join("; ") },
});

const body = await syncRes.text();
if (!syncRes.ok) {
    console.error("Sync failed:", syncRes.status, body);
    process.exit(1);
}

console.log(body);
