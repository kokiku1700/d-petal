"use client"

import Input from "@/components/Input";
import { useState } from "react";

type Props = {
    value: string;
    onChange: (password: string) => void;
};

export default function PasswordField ({ value, onChange }: Props) {
    const [passwordCheck, setPasswordCheck] = useState("");


    return (
        <div className="w-full flex gap-5">
            <div className="w-full">
                <label className="text-lg font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    비밀번호
                </label>
                <Input 
                    type="password" value={value} 
                    onChange={e => onChange(e.target.value)} 
                    variant="signup"/>
            </div>
            <div className="w-full">
                <label className="text-lg font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    비밀번호 확인
                </label>
                <Input 
                    type="password" value={passwordCheck} 
                    onChange={e => setPasswordCheck(e.target.value)} 
                    variant="signup"/>
            </div>
        </div>
    )
}