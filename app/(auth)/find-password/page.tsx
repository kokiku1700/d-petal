"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMeQuery } from "@/hooks/useMeQuery";
import { signUpSchema } from "@/schemas/auth/sign-up.schema";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function FindPassword () {
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState(false);
    const emailSchema = signUpSchema.shape.email;
    const [errorMessage, setErrorMessage] = useState("");

    const [code, setCode] = useState(Array(6).fill(""));
    const codeRefs = useRef<Array<HTMLInputElement | null>>([]);

    const router = useRouter();

    // 인증 번호 보내는 함수
    const handleEmailCheck = async() => {
        const result = emailSchema.safeParse(email);

        if ( !result.success ) {
            setEmailStatus(false);
            setErrorMessage("이메일을 다시 확인해주세요.");
            return;
        };

        const res = await fetch('/api/email-send', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        });
      
        const data = await res.json();

        console.log(data);

        if ( !res.ok ) {
            setEmailStatus(false);
            setErrorMessage(data.message ?? "이메일 발송에 실패했습니다.");
            return;
        };

        setEmailStatus(true);
    };

    const handleChange = ( v: string, i: number ) => {
        if ( !/^\d?$/.test(v)) return;

        const next = [...code];
        next[i] = v;
        setCode(next);

        if ( v && i < 5 ) {
            codeRefs.current[i + 1]?.focus();
        };
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        i: number,
    ) => {
        if ( e.key === "Backspace" && !code[i] && i > 0 ) {
            codeRefs.current[i - 1]?.focus();
        };
    };

    const handleCodeSubmit = async() => {
        const res = await fetch('/api/email-verify', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                code: code.join("").trim(),
            }),
        });
        const data = await res.json();

        if ( data.ok ) {
            // 이메일이 로컬 계정인지 확인
            const localCheck = await fetch('/api/me/local-check', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email
                })
            })
            if ( !localCheck.ok ) {
                router.replace("new-password-edit")
                router.refresh();
            } else {
                alert("계정 종류를 다시 확인해주세요.");
                router.replace("/")
                router.refresh();
            };
        };
    };

    return (
        <main
            className="
                flex flex-col justify-center items-center gap-4
                w-[95vw] h-[95vh]
                overflow-hidden
                border-1 border-pink-200 rounded-4xl
                bg-gradient-to-b from-white to-[#fff6fb]
                lg:w-[50vw] sm:h-[60vh]">
            {emailStatus 
                ?
                // 인증 번호 입력 화면
                <>
                    <h1 
                        className="
                            z-10 mb-5 
                            text-lg text-[#3b2f4a] font-medium
                            lg:text-2xl">
                        인증 번호 여섯 자리를 입력해주세요.
                    </h1>                
                    <div 
                        className="
                            w-[95%] flex flex-col gap-4
                            lg:w-[70%]">
                        <div className="flex items-center gap-2">
                            {code.map((v, i) => (
                                <Input 
                                    key={i}
                                    ref={e => {codeRefs.current[i] = e}}
                                    name="code" type="number" value={v}
                                    maxLength={1}
                                    onChange={e => handleChange(e.target.value, i)} 
                                    onKeyDown={e => handleKeyDown(e, i)}
                                    variant="code"/>
                            ))}
                        </div>
                        
                        <div 
                            className="
                                w-full mx-auto
                                flex gap-2
                                lg:w-[70%]">
                            <Button 
                                object="재전송" type="button" variant="submit"
                                onClick={handleEmailCheck} />
                            <Button 
                                object="확인" type="button" variant="submit"
                                onClick={handleCodeSubmit} />
                        </div>
                    </div>
                </> 
                :
                // 이메일 입력 화면
                <>
                    <h1 
                        className="
                            z-10 mb-5 
                            text-lg text-[#3b2f4a] font-medium
                            lg:text-2xl">
                        이메일을 입력해주세요.
                    </h1>
                    <div className="w-[70%] flex items-center gap-2">
                        <div className="basis-4/5">
                            <Input 
                                name="email" type="email" value={email}
                                onChange={e => setEmail(e.target.value)} 
                                variant="signin"/>
                        </div>
                        <div className="basis-1/5">
                            <Button 
                                object="확인" type="button" variant="submit"
                                onClick={handleEmailCheck} />
                        </div>
                    </div>
                    <p className="text-base text-red-500 ">
                        {errorMessage}
                    </p>
                </>
            }
        </main>
    );
}
