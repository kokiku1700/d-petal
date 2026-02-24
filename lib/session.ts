import crypto from "crypto";

export function createSessionToken () {
    return crypto.randomBytes(32).toString("hex");
};

export function sha256Hex ( input: string ) {
    return crypto.createHash("sha256").update(input).digest("hex");
};

export const SESSION_COOKIE_NAME = "dp_session";

export function sessionCookieOptions () {
    const isProd = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax" as const,
        path: "/",
    };
}