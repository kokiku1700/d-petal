import { NextResponse } from "next/server";

export async function GET () {
    // 구글에서 발급 받은 클라이언트 id
    const clientId = process.env.GOOGLE_CLIENT_ID;
    // 구글에서 데이터를 받을 경로
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if ( !clientId || !redirectUri ) {
        return Response.json(
            { ok: false, message: "Google OAuth 환경 변수가 없습니다."},
            { status: 500 },
        );
    };

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        // 코드 타입
        response_type: "code",
        // 구글에서 제공받을 데이터 범위. OIDC방식, email, 프로필 접근 허용
        scope: "openid email profile",
        // 다시 로그인안해도 토큰 재발급 가능
        access_type: "offline",
        // 구글 동의 화면 표시 
        prompt: "consent",
    });

    // 구글 로그인 페이지로 이동
    return NextResponse.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    );
}