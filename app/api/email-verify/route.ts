import { sql } from "@/lib/sql";
import { createHash } from "crypto";

export async function POST ( req: Request ) {
    const {email, code} = await req.json();
    const codeHash = createHash("sha256").update(code).digest("hex").toString();

    const [verification] = await sql<{
        code_hash: string;
        expires_at: Date;
    }[]>`
        select 
            code_hash,
            expires_at
        from email_verifications
        where email = ${email}
    `;

    if ( !verification ) {
        return Response.json(
            { ok: false, message: "인증 정보를 찾을 수 없습니다."},
            { status: 404 },
        );
    };

    if ( verification.expires_at < new Date() ) {
        console.log("1")
        return Response.json(
            { ok: false, message: "인증번호가 만료되었습니다."},
            { status: 400 },
        );
    };

    if ( verification.code_hash !== codeHash ) {
        console.log(verification.code_hash)
        console.log(codeHash)
        console.log("2")
        return Response.json(
            { ok: false, message: "인증번호가 일치하지 않습니다."},
            { status: 400 },
        );
    };

    return Response.json({
        ok: true,
        message: "인증이 완료되었습니다.",
    });
};