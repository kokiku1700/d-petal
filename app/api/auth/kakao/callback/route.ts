import { NextResponse } from "next/server";
import { sql } from "@/lib/sql";
import { createSession } from "@/lib/session";

type KakaoTokenResponse = {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    expires_in: number;
    scope?: string;
};

type KakaoUserResponse = {
    id: number;
    kakao_account?: {
        email?: string;
        profile?: {
            nickname?: string;
            profile_image_url?: string;
            thumbnail_image_url?: string;
        };
    };
};

export async function GET ( req: Request ) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if ( !code ) {
        return NextResponse.redirect(new URL("/?error=kakao_code_missing", req.url));
    };

    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID!,
            redirect_uri: process.env.KAKAO_REDIRECT_URI!,
            code,
            ...(process.env.KAKAO_CLIENT_SECRET
                ? { client_secret: process.env.KAKAO_CLIENT_SECRET }
                : {}),
        }),
    });

    if ( !tokenRes.ok ) {
        return NextResponse.redirect(new URL("/?error=kakao_token_failed", req.url));
    };

    const tokenData= (await tokenRes.json()) as KakaoTokenResponse;

    const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset-utf-8",
        },
    });

    if ( !userRes.ok ) {
        return NextResponse.redirect(new URL("/?error=kakao_user_failed", req.url));
    };

    const kakaoUser = (await userRes.json()) as KakaoUserResponse;

    const email = kakaoUser.kakao_account?.email;
    const nickname = kakaoUser.kakao_account?.profile?.nickname ?? "카카오 유저";
    const profileImage = kakaoUser.kakao_account?.profile?.profile_image_url ?? "";

    if ( !email ) {
        return NextResponse.redirect(new URL("/?error=kakao_email_missing", req.url));
    };

    const provider = "kakao";

    const existingUser = await sql`
        select * 
        from users
        where user_email = ${email}
        and user_emailprovider = ${provider}
        limit 1
    `;

    let user = existingUser[0];
    
    if ( !user ) {
        const insertedUser = await sql`
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
                ${nickname.slice(0, 5)},
                ${`${nickname}_${kakaoUser.id}`.slice(0, 16)},
                ${email},
                ${provider},
                now(),
                ${null},
                ${"0000/00/00"},
                ${"남"},
                ${profileImage}
            )
            returning *;
        `;

        user = insertedUser[0];

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
    };

    await createSession(user.user_id);

    return NextResponse.redirect(new URL("/app", req.url));
};