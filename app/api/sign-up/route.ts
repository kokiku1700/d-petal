import { sql } from "@/lib/sql";
import { signUpSchema } from "@/schemas/auth/sign-up.schema";
import bcrypt from "bcryptjs";

export async function POST ( req: Request ) {
    try {
        const body = await req.json();

        const parsed = signUpSchema.safeParse(body);

        if ( !parsed.success ) {
            return Response.json({
                ok: false,
                message: "입력값이 올바르지 않습니다.", 
                issues: parsed.error.flatten(),
            },
            { status: 400 });
        };

        const { name, nickname, provider, email, password, birth, sex } = parsed.data;
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const rows = await sql`
            insert into users
            (user_name, user_nickname, user_email, user_emailProvider, user_password, user_birth, user_sex)
            values
            (${name}, ${nickname}, ${email}, ${provider}, ${hashedPassword}, ${birth}, ${sex})
            returning user_id;
        `;
        const userId = rows[0].user_id;

        await sql`
            insert into categories (user_id, name, color, is_default)
            values
            (${userId}, '공부', '#FFD6E0', true),
            (${userId}, '운동', '#CDE7FF', true),
            (${userId}, '독서', '#FFF1BB', true),
            (${userId}, '취미', '#D8F5D0', true),
            (${userId}, '기타', '#E8D9FF', true)
        `;

        return Response.json({ ok: true })
    } catch ( err: any ) {
        if ( err?.code === "23505" ) {
            return Response.json(
                { ok: false, message: "이미 가입된 정보가 있습니다."},
                { status: 409 },
            );
        };

        return Response.json(
            { ok: false, message: "오류가 발생했습니다"},
            { status: 500 },
        );
    }
};