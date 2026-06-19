import { sql } from "@/lib/sql";

export async function POST ( req: Request ) {
    const { email } = await req.json();

    await sql`
        select user_emailprovider
        from users
        where user_email = ${email} and user_emailprovider = 'local';
    `;

    return Response.json({
        ok: true
    });
} 