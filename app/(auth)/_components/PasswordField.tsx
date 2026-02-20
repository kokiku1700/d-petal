"use client"

import Input from "@/components/Input";
import { Dispatch, SetStateAction } from "react";

type Props = {
    password: string;
    passwordCheck: string;
    onChangePw: Dispatch<SetStateAction<string>>;
    onChangePwCheck: Dispatch<SetStateAction<string>>;
    onBlurPw: () => void;
    onBlurPwCheck: () => void;
    errMsgPw: string;
    errMsgPwCheck: string;
    passwordStatus: string;
    passwordCheckStatus: string;
};

export default function PasswordField ({ 
    password, passwordCheck, 
    onChangePw, onChangePwCheck, onBlurPw, onBlurPwCheck, 
    errMsgPw, errMsgPwCheck, passwordStatus, passwordCheckStatus }: Props) { 

    return (
        <div className="w-full flex gap-5">
            <div className="w-full">
                <label className="text-lg text-[#3b2f4a] font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    비밀번호
                </label>
                <Input 
                    name="password"
                    type="password" value={password} 
                    onChange={e => onChangePw(e.target.value)} 
                    onBlur={onBlurPw}
                    variant="signup"
                    maxLength={16}/>
                <p className={`
                    min-h-[1.5rem] ml-1 mt-1
                    ${passwordStatus === "available" ? "text-green-500" : "text-red-500"}`}>
                    {errMsgPw}
                </p>
            </div>
            <div className="w-full">
                <label className="text-lg text-[#3b2f4a] font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    비밀번호 확인
                </label>
                <Input 
                    name="password"
                    type="password" value={passwordCheck} 
                    onChange={e => onChangePwCheck(e.target.value)} 
                    onBlur={onBlurPwCheck}
                    variant="signup"
                    maxLength={16}/>
                <p className={`
                    min-h-[1.5rem] ml-1 mt-1
                    ${passwordCheckStatus === "available" ? "text-green-500" : "text-red-500"}`}>
                    {errMsgPwCheck}
                </p>
            </div>
        </div>
    )
}