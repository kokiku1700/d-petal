import { sql } from "@/lib/sql";
import bcrypt from "bcryptjs";

export async function POST ( req: Request ) {
    const { email, password } = await req.json();

    const rows = await sql`
        select * from users
        where user_email = ${email} and user_emailprovider = 'local'
        limit 1;
    `;

    const user = rows[0]; 

    if ( !user ) return Response.json({ ok: false, message: "이메일 혹인 비밀번호가 올바르지 않습니다." });

    const isValid = await bcrypt.compare(password, user.user_password);
    if ( !isValid ) return Response.json({ ok: false, message: "이메일 혹인 비밀번호가 올바르지 않습니다." });

    const { user_password, ...safeUser } = user;
    return Response.json({ ok: true, user: safeUser });
};