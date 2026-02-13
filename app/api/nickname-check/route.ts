import { sql } from "@/lib/sql";

export async function GET ( req: Request ) {
    const { searchParams } = new URL(req.url);
    const nickname = searchParams.get("nickname");

    if ( !nickname ) {
        return Response.json(
            { message: "nickname is required"},
            { status: 400 },
        );
    };

    const result = await sql`
        select 1 
        from users
        where user_nickname=${nickname}
        limit 1
    `;

    return Response.json({ isDuplicate: result.length > 0 });
};