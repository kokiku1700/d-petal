import { sql } from "@/lib/sql";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, sha256Hex, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/session";

export async function POST ( req: Request ) {
    const { email, password } = await req.json();

    const rows = await sql`
        select * from users
        where user_email = ${email} and user_emailprovider = 'local'
        limit 1;
    `;

    const user = rows[0]; 

    if ( !user ) return NextResponse.json({ ok: false, message: "이메일 혹인 비밀번호가 올바르지 않습니다." });

    // 입력한 비밀번호와 db에 저장되어 있는 해싱된 비밀번호 비교.
    const isValid = await bcrypt.compare(password, user.user_password);
    if ( !isValid ) return NextResponse.json({ ok: false, message: "이메일 혹인 비밀번호가 올바르지 않습니다." });

    // 토큰 생성
    const sessionToken = createSessionToken();
    // 생성한 토큰 해싱
    const tokenHash = sha256Hex(sessionToken);
    // 만료 기한 = 7일
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await sql`
        insert into sessions(user_id, session_token_hash, expires_at)
        values (${user.user_id}, ${tokenHash}, ${expires});
    `;

    const { user_password, ...safeUser } = user;
    const res = NextResponse.json({ ok: true, user: safeUser });

    res.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
        ...sessionCookieOptions(),
        expires,
    });

    return res;
};