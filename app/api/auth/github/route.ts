import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET () {
    const state = crypto.randomBytes(16).toString("hex");

    const url = new URL("https://github.com/login/oauth/authorize");

    url.searchParams.set("client_id", process.env.GiTHUB_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.GITHUB_REDIRECT_URI!);
    url.searchParams.set("scope", "read:user user:email");
    url.searchParams.set("state", state);

    const res = NextResponse.redirect(url);

    res.cookies.set("github_auth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 5,
    });

    return res;
}