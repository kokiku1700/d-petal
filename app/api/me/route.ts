import { sql } from "@/lib/sql";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sha256Hex, SESSION_COOKIE_NAME } from "@/lib/session";

export async function GET () {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if ( !sessionToken ) {
        return NextResponse.json({ ok: false, user: null }, { status: 200 })
    };

    const tokenHash = sha256Hex(sessionToken);

    const rows = await sql`
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
        where s.session_token_hash = ${tokenHash}
            and s.expires_at > now()
        limit 1;
    `;

    const user = rows[0] ?? null;

    return NextResponse.json({ ok: Boolean(user), user}, { status: 200 });
}