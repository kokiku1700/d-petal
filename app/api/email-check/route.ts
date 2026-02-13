import { sql } from "@/lib/sql";

export async function GET ( req: Request ) {
    const allowed = new Set(["local", "gmail", "naver", "kakao", "github"])
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const provider = searchParams.get("provider");

    if ( !email || !provider ) {
        return Response.json(
            { message: "email and proveder are required"},
            { status: 400 },
        );
    };

    if ( !allowed.has(provider) ) {
        return Response.json(
            { message: "invaild provider"},
            { status: 400 },
        )
    }

    const result = await sql`
        select 1 
        from users 
        where user_email=${email} and user_emailProvider=${provider}
        limit 1;
    `;

    return Response.json({ isDuplicate: result.length > 0 });
}