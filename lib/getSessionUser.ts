import { cookies } from "next/headers";
import { sql } from "./sql";
import { sha256Hex, SESSION_COOKIE_NAME } from "./session";

export type SessionUser = {
    user_id: number;
    user_name: string;
    user_nickname: string;
    user_email: string;
    user_emailprovider: string;
    user_birth: string;
    user_sex: string;
    user_email_verified_at: string | null;
};

export async function getSessionUser (): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if ( !sessionToken ) return null;

    const sessionTokenHash = sha256Hex(sessionToken);

    try {
        const rows = await sql<SessionUser[]>`
            select
                u.user_id,
                u.user_name,
                u.user_nickname,
                u.user_email,
                u.user_emailprovider,
                u.user_birth,
                u.user_sex,
                u.user_email_verified_at
            from sessions s
            join users u on u.user_id = s.user_id
            where s.session_token_hash = ${sessionTokenHash}
                and s.expires_at > now()
            limit 1;
        `;

        return rows[0] ?? null;
    } catch ( error ) {
        console.log(error);
        throw error;
    };
    
};