import { NextResponse } from "next/server";

export async function GET () {
    const clientId = process.env.KAKAO_CLIENT_ID!;
    const redirectUri = process.env.KAKAO_REDIRECT_URI!;

    const kakaoAuthUri = new URL("https://kauth.kakao.com/oauth/authorize");

    kakaoAuthUri.searchParams.set("response_type", "code");
    kakaoAuthUri.searchParams.set("client_id", clientId);
    kakaoAuthUri.searchParams.set("redirect_uri", redirectUri);
    kakaoAuthUri.searchParams.set("scope", "profile_nickname profile_image account_email");

    return NextResponse.redirect(kakaoAuthUri);
}