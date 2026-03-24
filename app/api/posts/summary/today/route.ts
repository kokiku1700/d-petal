import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";


export async function GET ( req: Request ) {
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "unauthorized" },
            { status: 401 },
        );
    };

    const rows = await sql`
        with today_posts as (
            select * 
            from posts
            where user_id = ${user.user_id}
                and date(created_at at time zone 'Asia/Seoul')
                    = date(now() at time zone 'Asia/Seoul')
        ),
        top_emotion as (
            select emotion
            from today_posts
            group by emotion
            order by count(*) desc
            limit 1
        )
        select
            count(*)::int as count,
            coalesce(round(avg(satisfaction), 1), 0) as avg_satisfaction,
            (select emotion from top_emotion) as top_emotion
        from today_posts;
    `;

    return Response.json(rows[0]);
}