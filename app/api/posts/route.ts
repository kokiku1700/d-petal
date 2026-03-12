import { sql } from "@/lib/sql";
import { getSessionUser } from "@/lib/getSessionUser";

export async function GET () {
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized" }, 
            { status: 200 }
        );
    };

    const rows = await sql`
        select 
            p.post_id,
            p.emotion,
            p.satisfaction,
            p.title,
            p.content,
            p.activity_date,
            c.name as category_name,
            c.color as category_color
        from posts p
        join categories c
            on p.category_id = c.category_id
        where p.user_id = ${user.user_id}
        order by p.activity_date desc
    `;

    return Response.json(rows);
};