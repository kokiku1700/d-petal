import Input from "@/components/Input";
import EmailField from "./EmailField";
import { useState } from "react";
import PasswordField from "./PasswordField";
import BirthAndGenderField from "./BirthAndGenderField";
import Button from "@/components/Button";

type Props = {
    onSwitch: () => void;
};

export default function SignUpForm ({onSwitch}: Props) {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="
            relative w-full h-full pb-15
            flex flex-col justify-center items-center
            overflow-y-auto">
            <span 
                onClick={onSwitch} 
                className="
                    absolute top-5 left-5
                    cursor-pointer">
                로그인하러 가기
            </span>
            <div className="w-[70%] flex flex-col gap-12">
                <h1 className="
                    text-5xl text-[#3b2f4a] text-center
                    cursor-default">
                    Sign Up
                </h1>
                <div className="flex gap-5">
                    <div className="w-[35%]">
                        <label className="text-lg font-semibold">
                            <span className="text-red-500 mx-1">*</span>
                            이름
                        </label>
                        <Input 
                            type="text" value={name} 
                            onChange={e => setName(e.target.value)} 
                            variant="signup"/>
                    </div>
                    <div className="w-[65%]">
                        <label className="text-lg font-semibold">
                            <span className="text-red-500 mx-1">*</span>
                            닉네임
                        </label>
                        <Input 
                            type="text" value={nickname} 
                            onChange={e => setNickname(e.target.value)} 
                            variant="signup"/>
                    </div>
                </div> 
                <EmailField value={email} onChange={setEmail} />
                <PasswordField value={password} onChange={setPassword} />
                <BirthAndGenderField />
            </div>
            <div className="w-[70%] absolute bottom-15">
                <Button object="회원가입" />
            </div>
        </form>
    )
}