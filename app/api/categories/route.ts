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