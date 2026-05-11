import { sql } from "@/lib/sql";
import { getSessionUser } from "@/lib/getSessionUser";

// 유저의 모든 글을 가져오는 api
export async function GET ( req: Request ) {
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "로그인이 필요합니다." }, 
            { status: 401 }
        );
    };

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 9);
    const category = searchParams.get("category");
    const date = searchParams.get("date");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    const posts = await sql`
        select 
            p.post_id,
            p.emotion,
            p.satisfaction,
            p.title,
            p.content,
            p.activity_date,
            p.created_at,
            c.name as category_name,
            c.color as category_color
        from posts p
        join categories c
            on p.category_id = c.category_id
        where p.user_id = ${user.user_id}
        ${category ? sql`and c.name = ${category}` : sql``}
        ${date ? sql`and p.activity_date::date = ${date}::date` : sql``}
        ${search ? sql`
            and (
                lower(p.title) like ${`%${search.toLowerCase()}%`}
                or lower(p.content) like ${`%${search.toLowerCase()}%`}
            )    
        `: sql``}
        order by p.activity_date desc, p.created_at desc
        limit ${limit}
        offset ${offset}
    `;

    const countRows = await sql`
        select count(*)::int as total_count
        from posts p
        join categories c
            on p.category_id = c.category_id
        where p.user_id = ${user.user_id}
        ${category ? sql`and c.name = ${category}` : sql``}
        ${date ? sql`and p.activity_date::date = ${date}::date` : sql``}
        ${search ? sql`
            and (
                lower(p.title) like ${`%${search.toLowerCase()}%`}
                or lower(p.content) like ${`%${search.toLowerCase()}%`}
            ) 
        ` : sql``};
    `;

    const totalCount = countRows[0].total_count;
    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({
        ok: true,
        posts,
        pagination: {
            page,
            limit,
            totalCount,
            totalPages,
        },
    });
};