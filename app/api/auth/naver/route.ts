import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET () {
    const state = crypto.randomBytes(16).toString("hex");

    const url = new URL("https://nid.naver.com/oauth2.0/authorize");

    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", process.env.NAVER_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.NAVER_REDIRECT_URI!);
    url.searchParams.set("state", state);

    const res = NextResponse.redirect(url);

    res.cookies.set("naver_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 5,
    });

    return res;
}
