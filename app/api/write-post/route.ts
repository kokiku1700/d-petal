import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";

export async function POST ( req: Request ) {
    const body = await req.json();
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized"},
            { status: 401 }
        )
    }

    const rows = await sql`
        insert into posts (user_id, activity_date, category_id, emotion, satisfaction, title, content)
        values (
            ${user.user_id},
            ${body.date}, 
            ${body.category}, 
            ${body.emotion},
            ${body.satisfaction},
            ${body.title},
            ${body.content}    
        )
        returning *;
    `;

    return Response.json({ ok: true, row: rows[0] });
};