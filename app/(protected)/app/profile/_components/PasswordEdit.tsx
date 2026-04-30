"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { SessionUser } from "@/lib/getSessionUser";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { signUpSchema } from "@/schemas/auth/sign-up.schema";

type Props = {
    user: SessionUser;
    closeEditModal: () => void;
};

export default function PasswordEdit ({ user, closeEditModal }: Props) {
    const [nowPassword, setNowPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const queryClient = useQueryClient();

    const validateField = ( schema: z.ZodTypeAny, value: unknown ) => {
        const result = schema.safeParse(value);

        return result.success;
    }

    const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        
        const zodNowPw = validateField(signUpSchema.shape.password, nowPassword);
        const zodNewPw = validateField(signUpSchema.shape.password, newPassword);
        const zodNewPwCheck = validateField(signUpSchema.shape.password, newPasswordCheck);
        
        if ( !zodNowPw || !zodNewPw || !zodNewPwCheck ) {
            return setMessage("비밀번호 양식을 확인해주세요.")
        }

        const res = await fetch("/api/profile/password", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nowPw: nowPassword,
                newPw: newPassword,
                checkPw: newPasswordCheck,
            }),
        });
        const data = await res.json();
        
        if ( data.ok ) {
            const logout = await fetch("/api/logout", {
                method: "POST",
            });
            if ( logout ) {
                closeEditModal();
                alert("다시 로그인해주세요.")
                queryClient.clear();
                router.replace("/");
            };
        } else {
            setMessage(data.message);
        };
    };

    return (
        <form 
            onSubmit={onSubmit}
            className="
                w-[80%] mx-auto
                flex flex-col gap-2">
            <div>
                <label className="text-lg font-medium">
                    현재 비밀번호
                </label>
                <Input 
                    name="password" type="password" 
                    value={nowPassword} 
                    onChange={e =>setNowPassword(e.target.value)}
                    variant="signup"/>
            </div>
            <div>
                <label className="text-lg font-medium">
                    새 비밀번호
                </label>
                <Input 
                    name="password" type="password" 
                    value={newPassword} 
                    onChange={e =>setNewPassword(e.target.value)}
                    variant="signup"/>
            </div>
            <div>
                <label className="text-lg font-medium">
                    새 비밀번호 확인
                </label>
                <Input 
                    name="password" type="password" 
                    value={newPasswordCheck} 
                    onChange={e =>setNewPasswordCheck(e.target.value)}
                    variant="signup"/>
            </div>
            <p className="text-red-400">{message}</p>
            <div className="w-[70%] mx-auto flex gap-3">
                <Button 
                    type="button" object="취소" variant="submit" onClick={closeEditModal}/>
                <Button 
                    type="submit" object="저장" variant="submit"/>
            </div>
        </form>
    );
};