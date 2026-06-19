import { randomInt, createHash } from "crypto";
import { Resend } from "resend";
import { sql } from "@/lib/sql";

const resend = new Resend(process.env.RESEND_API_KEY);

function hashCode ( code: string ) {
    return createHash("sha256").update(code).digest("hex");
};

export async function POST ( req: Request ) {
    try {
        const { email } = await req.json();
        const code = randomInt(100000, 1000000).toString();
        const codeHash = hashCode(code);
        console.log(code)
        await sql`
            delete from email_verifications
            where email = ${email};
        `;

        await sql`
            insert into email_verifications (
                email,
                code_hash,
                expires_at
            )
            values (
                ${email},
                ${codeHash},
                now() + interval '5 minutes'
            );
        `;

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'D.PETAL 이메일 인증',
            html: `
                <h2>D.PETAL 이메일 인증</h2>
                <p>아래 인증번호를 입력해주세요.</p>
                <h1>${code}</h1>
                <p>인증번호는 5분간 유효합니다</p>
            `
        });

        return Response.json({
            ok: true, 
        });
    } catch ( error ) {
        console.log(error);

        return Response.json(
            {
                ok: false,
                message: "이메일 발송 실패",
                error,
            },
            { status: 500 }
        );
    }
    
};