import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";

export async function PATCH ( req: Request ) {
    const body = await req.json();
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized"},
            { status: 401 }
        )
    }

    const rows = await sql`
        update posts
        set 
            activity_date = ${body.date}, 
            category_id = ${body.category}, 
            emotion = ${body.emotion},
            satisfaction = ${body.satisfaction},
            title = ${body.title},
            content = ${body.content}    
        where post_id = ${body.postId}
        and user_id = ${user.user_id}
        returning *;
    `;

    return Response.json({ ok: true, row: rows[0] });
};