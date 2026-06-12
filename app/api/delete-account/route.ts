import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";
import { cookies } from "next/headers";


export async function DELETE () {
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "회원정보가 없습니다."},
            { status: 401 }
        );
    };

    await sql`
        delete from users
        where user_id = ${user.user_id};
    `;

    const cookieStore = await cookies();

    cookieStore.delete("dp_session");

    return Response.json(
        {ok: true, message: "회원탈퇴가 성공적으로 완료되었습니다."}
    );
};