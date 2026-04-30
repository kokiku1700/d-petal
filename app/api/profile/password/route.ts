import { getSessionUser } from "@/lib/getSessionUser";
import { sql } from "@/lib/sql";
import bcrypt from "bcryptjs";

export async function PATCH ( req: Request ) {
    const body = await req.json();
    const { nowPw, newPw, checkPw } = body;
    const user = await getSessionUser();

    if ( !user ) {
        return Response.json(
            { ok: false, message: "Unauthorized"},
            { status: 401 }
        );
    };

    if ( !nowPw || !newPw || !checkPw ) {
        return Response.json(
            { ok: false, message: "모든 값을 입력해주세요."},
            { status: 400 }
        );
    } else if ( newPw !== checkPw ) {
        return Response.json(
            { ok: false, message: "새 비밀번호가 일치하지 않습니다."},
            { status: 400 }
        );
    } else if ( nowPw === newPw ) {
        return Response.json(
            { ok: false, message: "현재 비밀번호와 다른 비밀번호를 사용해주세요."},
            { status: 400 }
        );
    };

    const rows = await sql`
        select user_password
        from users
        where user_id=${user.user_id};
    `;

    const dbuser = rows[0];

    if ( !dbuser ) {
        return Response.json(
            { ok: false, message: "사용자를 찾을 수 없습니다."},
            { status: 404 }
        );
    };

    const isMatch = await bcrypt.compare(nowPw, dbuser.user_password);

    if ( !isMatch ) {
        return Response.json(
            { ok: false, message: "현재 비밀번호가 일치하지 않습니다."},
            { status: 400 }
        );
    };

    const hashedPassword = await bcrypt.hash(newPw, 12);

    await sql`
        update users
        set user_password=${hashedPassword}
        where user_id=${user.user_id}
    `;

    return Response.json({
        ok: true,
        message: "비밀번호가 변경되었습니다.",
    });
};