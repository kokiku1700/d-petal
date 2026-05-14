import crypto from "crypto";
import { sql } from "./sql";
import { cookies } from "next/headers";

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
};

export async function createSession ( userId: number ) {
    const token = createSessionToken();
    const hash = sha256Hex(token);

    await sql`
        insert into sessions (
            user_id,
            session_token_hash,
            expires_at
        )
        values (
            ${userId},
            ${hash},
            now() + interval '7 days'
        );
    `;

    const cookiesStore = await cookies();

    cookiesStore.set(
        SESSION_COOKIE_NAME,
        token,
        {
            ...sessionCookieOptions(),
            maxAge: 60 * 60 * 24 * 7,
        }
    );
}

export default async function deleteSession ( token: string ) {
    const hash = sha256Hex(token);

    await sql`
        delete from sessions
        where session_token_hash = ${hash};
    `;
};