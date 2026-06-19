"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPasswordEdit () {
    const [pw, setPw] = useState({
        password: "",
        passwordCheck: "",
    });
    const router = useRouter();

    const handleOnSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();

        const res = await fetch('/api/password', {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pw: pw.password,
                pwc: pw.passwordCheck,
            }),
        });

        if ( res.ok ) {
            router.replace('/');
            router.refresh();
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
            <h1 
                className="
                    z-10 mb-5 
                    text-lg text-[#3b2f4a] font-medium
                    lg:text-2xl">
                비밀번호 변경
            </h1> 
            <form
                onSubmit={handleOnSubmit} 
                className="w-[60%] flex flex-col gap-2">
                <div className="grid gap-4">
                    <div 
                        className="grid grid-cols-[140px-1fr] items-center gap-1">
                        <label className="whitespace-nowrap">새 비밀번호</label>
                        <Input 
                            name="password" type="password"
                            value={pw.password}
                            onChange={e => {
                                setPw({
                                    ...pw,
                                    password: e.target.value,
                                })
                            }}
                            variant="signin"/>
                    </div>
                    <div 
                        className="grid grid-cols-[140px-1fr] items-center gap-1">
                        <label className="whitespace-nowrap">새 비밀번호 확인</label>
                        <Input 
                            name="passwordCheck" type="password"
                            value={pw.passwordCheck}
                            onChange={e => {
                                setPw({
                                    ...pw,
                                    passwordCheck: e.target.value,
                                })
                            }}
                            variant="signin"/>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <div className="w-[50%] flex items-center gap-2">
                        <Button object="취소" type="button" variant="cancel" />
                        <Button object="변경" type="submit" variant="duplication"/>
                    </div>
                </div>
            </form>
        </main>
    )
}