import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";

export async function PATCH ( req: Request ) {
    const body = await req.json();
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized"},
            { status: 401 }
        );
    };

    const rows = await sql`
        update users
        set
            user_nickname=${body.nickname},
            user_bio=${body.bio}
        where user_id=${user.user_id}
    `;

    return Response.json({ ok: true });
};   