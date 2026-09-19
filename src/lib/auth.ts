import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "dir_admin";

export function hashAdminSession(password: string) {
    return createHash("sha256").update(`devil-inside-admin:${password}`).digest("hex");
}

export function getExpectedAdminToken() {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) return null;
    return hashAdminSession(password);
}

export async function isAdminAuthenticated() {
    const expected = getExpectedAdminToken();
    if (!expected) return false;
    const token = (await cookies()).get(COOKIE)?.value;
    return token === expected;
}

export async function requireAdmin() {
    if (!(await isAdminAuthenticated())) {
        const error = new Error("Unauthorized");
        (error as Error & { status: number }).status = 401;
        throw error;
    }
}

export { COOKIE as ADMIN_COOKIE };
