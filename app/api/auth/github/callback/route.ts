import { NextResponse } from "next/server";
import { sql } from "@/lib/sql";
import { createSession } from "@/lib/session";

type GitHubTokenResponse = {
    access_token: string;
    token_type: string;
    scope: string;
};

type GitHubUserResponse = {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    email: string | null;
};

type GitHubEmailResponse = {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
};

export async function GET ( req: Request ) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if ( !code ) {
        return NextResponse.redirect(new URL("/", req.url));
    };

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
        }),
    });

    const tokenData = (await tokenRes.json()) as GitHubTokenResponse;
    
    const userRes = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: "application/vnd.github+json",
        },
    });

    const githubUser = (await userRes.json()) as GitHubUserResponse;

    const emailRes = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: "application/vnd.github+json",
        },
    });

    const emails = (await emailRes.json()) as GitHubEmailResponse[];
    
    const primaryEmail = emails.find(
        email => email.primary && email.verified
    )?.email;

    if ( !primaryEmail ) {
        return NextResponse.redirect(new URL("/?error=github_email", req.url));
    };

    const userRows = await sql`
        select *
        from users
        where user_email = ${primaryEmail}
            and user_emailprovider = 'github'
        limit 1;
    `;

    let user = userRows[0];
    
    if ( !user ) {
        const insertedRows = await sql`
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
                ${githubUser.name ?? githubUser.login},
                ${githubUser.login},
                ${primaryEmail},
                'github',
                now(),
                'social-login',
                '',
                '남',
                ${githubUser.avatar_url}
            )
            returning *;
        `;

        user = insertedRows[0];

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