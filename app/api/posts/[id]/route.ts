import { sql } from "@/lib/sql";
import { getSessionUser } from "@/lib/getSessionUser";

type Props = {
    params: Promise<{ id: string }>;
}

// 유저의 글 한 개를 불러오는 api(수정 페이지에서 사용)
export async function GET ( req: Request, { params }: Props ) {
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized"},
            { status: 401 },
        );
    };

    const { id } = await params;
    const postId = Number(id);

    if ( !postId ) {
        return Response.json(
            { ok: false, message: "Invalid post id"},
            { status: 400 },
        );
    };

    const rows = await sql`
        select * from posts
        where post_id = ${postId}
            and user_id = ${user.user_id};
    `;

    if ( rows.length === 0 ) {
        return Response.json(
            { ok: false, message: "Post not found or forbidden"},
            { status: 400 },
        );
    };

    return Response.json({ ok: true, rows: rows[0]});
};

// 유저의 해당 글을 삭제하는 api (삭제할 때 사용)
export async function DELETE (req: Request, { params }: Props ) {
    const user = await getSessionUser();
    
    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized"},
            { status: 401 },
        );
    };

    const { id } = await params;
    const postId = Number(id);

    if ( !postId ) {
        return Response.json(
            { ok: false, message: "Invalid post id"},
            { status: 400 },
        );
    };

    const rows = await sql`
        delete from posts
        where post_id = ${postId}
            and user_id = ${user.user_id}
        returning *;
    `;

    if ( rows.length === 0 ) {
        return Response.json(
            { ok: false, message: "Post not found or forbidden"},
            { status: 400 },
        );
    };

    return Response.json({ ok: true, rows: rows[0]});
};