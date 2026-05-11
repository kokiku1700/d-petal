import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";

export async function GET () {
    try {
        const user = await getSessionUser();

        if ( !user ) {
            return Response.json(
                {
                    ok: false,
                    message: "로그인이 필요합니다.",
                },
                {
                    status: 401,
                },
            );
        };

        const rows = await sql`
            select 
                activity_date::date as date,
                count(*)::int as count
            from posts
            where user_id = ${user.user_id}
            group by activity_date::date
            order by date asc;
        `;

        return Response.json({
            ok: true,
            heatmap: rows,
        });
    } catch ( error ) {
        console.log(error);

        return Response.json(
            {
                ok: false,
                message: "히트맵이 데이터를 불러오지 못했습니다.",
            },
            {
                status: 500,
            },
        );
    }
}