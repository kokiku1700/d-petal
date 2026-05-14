import { NextResponse } from "next/server";
import { sql } from "@/lib/sql";
import { createSession } from "@/lib/session";

type NaverTokenResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: string;
};

type NaverProfileResponse = {
    resultcode: string;
    message: string;
    response: {
        id: string;
        email?: string;
        nickname: string;
        name: string;
        profile_image?: string;
        gender: string;
        birthyear: string;
        birthday: string;
    };
};

export async function GET ( req: Request ) {
    const url = new URL(req.url);

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieState = req.headers.get("cookie")?.match(/naver_oauth_state=([^;]+)/)?.[1];

    if ( !code || !state || state !== cookieState ) {
        return NextResponse.json(
            { ok: false, message: "잘못된 네이버 로그인 요청입니다." },
            { status: 400 },
        );
    }

    const tokenUrl = new URL("https://nid.naver.com/oauth2.0/token");

    tokenUrl.searchParams.set("grant_type", "authorization_code");
    tokenUrl.searchParams.set("client_id", process.env.NAVER_CLIENT_ID!);
    tokenUrl.searchParams.set("client_secret", process.env.NAVER_CLIENT_SECRET!);
    tokenUrl.searchParams.set("code", code);
    tokenUrl.searchParams.set("state", state);

    const tokenRes = await fetch(tokenUrl);
    // const tokenData: NaverTokenResponse = await tokenRes.json();
    // 위와 같은 타입 방식은 typescript가 구조를 검사하기 때문에 엄격하다. 
    // 하지만 아래와 같은 방식은 강제로 타입을 정의하기 때문에 비교적 느슨하다. 
    const tokenData = (await tokenRes.json()) as NaverTokenResponse;

    if ( !tokenRes.ok || !tokenData.access_token ) {
        return NextResponse.json(
            { ok: false, message: "네이버 토큰 발급에 실패했습니다." },
            { status: 400 },
        );
    };

    const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    const profileData = (await profileRes.json()) as NaverProfileResponse;
    const profile = profileData.response;

    if ( !profile?.email ) {
        return NextResponse.json(
            { ok: false, message: "네이버 계정에서 이메일을 가져올 수 없습니다."},
            { status: 400 },
        );
    };

    const provider = 'naver';

    const existingUser = await sql`
        select * 
        from users
        where user_email = ${profile.email}
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
                user_sex
            )
            values (
                ${profile.name ?? "네이버"},
                ${profile.nickname ?? `naver_${profile.id.slice(0, 6)}`},
                ${profile.email},
                ${provider},
                now(),
                ${null},
                ${profile.birthyear + "-" + profile.birthday.split('/').join("-")},
                ${profile.gender === "M" ? "남" : "여"}
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

    const res = NextResponse.redirect(new URL("/app", req.url));

    await createSession(user.user_id);

    res.cookies.delete("naver_oauth_state");

    return res;
};