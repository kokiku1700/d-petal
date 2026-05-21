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

    const categories = await sql`
        select * from categories
        where user_id = ${user.user_id}
        order by sort_order asc;
    `;

    return Response.json(categories);
};

export async function POST ( req: Request ) {
    const user = await getSessionUser();
    const body = await req.json();
    const { color, category } = body;

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized" },
            { status: 401 },
        );
    };

    const [lastCategory] = await sql<{
        max: number | null;
    }[]>`
        select max(sort_order)
        from categories
        where user_id = ${user.user_id};
    `;

    const nextSortOrder = (lastCategory.max ?? 0 ) + 1;

    const res = await sql`
        insert into categories (
            user_id,
            name,
            color,
            is_default,
            sort_order
        ) 
        values (
            ${user.user_id},
            ${category},
            ${color},
            false,
            ${nextSortOrder}
        );
    `;

    return Response.json({ ok: false });
};