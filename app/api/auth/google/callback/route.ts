import { NextResponse } from "next/server";
import { sql } from "@/lib/sql";
import { createSession } from "@/lib/session";

type GoogleTokenResponse = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token?: string;
};

type GoogleUserInfo = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    picture: string;
};

export async function GET ( req: Request ) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if ( !code ) {
        return Response.json(
            { ok: false, message: "Google 인증 코드가 없습니다."},
            { status: 400 },
        );
    };

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if ( !clientId || !clientSecret || !redirectUri ) {
        return Response.json(
            { ok: false, message: "Google OAuth 환경변수가 없습니다."},
            { status: 500 },
        );
    };

    // 구글에 토큰 요청
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
        }),  
    });

    if ( !tokenRes.ok ) {
        return Response.json(
            { ok: false, message: "Google access token 요청에 실패했습니다." },
            { status: 400 },
        );
    };

    const tokenData = (await tokenRes.json()) as GoogleTokenResponse;

    // 성공적으로 토큰을 받으면 해당 토큰을 가지고 해당 사용자 정보 요청
    const userInfoRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        }
    );

    if ( !userInfoRes.ok ) {
        return Response.json(
            { ok: false, message: "Google 사용자 정보 조회에 실패했습니다." },
            { status: 400 },
        );
    };

    const googleUser = (await userInfoRes.json())as GoogleUserInfo;

    const provider = "google";

    const users = await sql`
        select * 
        from users
        where user_email = ${googleUser.email}
        and user_emailprovider = ${provider}
        limit 1;
    `;

    let user = users[0];

    if ( !user ) {
        const insertedUsers = await sql`
            insert into users (
                user_name,
                user_nickname,
                user_email,
                user_emailprovider,
                user_email_verified_at,
                user_password,
                user_birth,
                user_sex,
                user_profile_image
            )
            values (
                ${googleUser.name.slice(0, 5)},
                ${googleUser.name},
                ${googleUser.email},
                ${provider},
                ${googleUser.verified_email ? sql`now()` : null},
                ${null},
                ${""},
                ${"남"},
                ${googleUser.picture ?? ""}
            )
            returning *;
        `;

        user = insertedUsers[0];

        await sql`
            insert into categories (
                user_id,
                name,
                color,
                is_default,
                sort_order
            )
            values
                (${user.user_id}, '공부', '#FFD6E0', true, 1),
                (${user.user_id}, '운동', '#CDE7FF', true, 2),
                (${user.user_id}, '독서', '#FFF1BB', true, 3),
                (${user.user_id}, '취미', '#D8F5D0', true, 4),
                (${user.user_id}, '기타', '#E8D9FF', true, 5);
        `;
    }

    await createSession(user.user_id);

    return NextResponse.redirect(new URL("/app", req.url));
}