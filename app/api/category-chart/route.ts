import { sql } from "@/lib/sql";
import { getSessionUser } from "@/lib/getSessionUser";

export async function GET () {
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized" },
            { status: 401 }
        );
    };

    const rows = await sql`
        select
            c.category_id as id,
            c.name as name,
            c.color as color,
            coalesce(count(p.post_id))::int as value
        from categories c
        left join posts p
            on p.category_id = c.category_id
            and p.user_id = ${user.user_id}
        where c.user_id = ${user.user_id}
        group by c.category_id, c.name, c.color
        order by value desc, c.name asc;
    `;

    return Response.json(rows);
}