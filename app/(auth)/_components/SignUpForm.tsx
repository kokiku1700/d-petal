import Input from "@/components/Input";
import EmailField from "./EmailField";
import { useEffect, useState } from "react";
import PasswordField from "./PasswordField";
import BirthAndGenderField from "./BirthAndGenderField";
import Button from "@/components/Button";
import Image from "next/image";
import out from "@/public/out.png";
import { signUpSchema } from "@/schemas/auth/sign-up.schema";
import z from "zod";

const fieldSchema = {
    name: signUpSchema.shape.name,
    nickname: signUpSchema.shape.nickname,
    email: signUpSchema.shape.email,
    password: signUpSchema.shape.password,
    birth: signUpSchema.shape.birth,
    sex: signUpSchema.shape.sex,
} as const;

type FieldKey = keyof typeof fieldSchema;

type Status = "idle" | "invalid" | "duplicate" | "available";

type Props = {
    onSwitch: () => void;
};

export default function SignUpForm ({onSwitch}: Props) {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [nicknameStatus, setNicknameStatus] = useState<Status>("idle");
    const provider = "local";
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<Status>("idle");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        birth: "",
    });

    useEffect(() => {
        setErrorMessage(prev => ({
                ...prev,
                "nickname": "",
            }));
        setNicknameStatus("idle");
    }, [nickname]);

    useEffect(() => {
        setErrorMessage(prev => ({
            ...prev,
            "email": "",
        }));
        setEmailStatus("idle");
    }, [email]);

    // zod를 활용해 값을 검증한다.
    const validateField = ( schema: z.ZodTypeAny, value: unknown ) => {
        const result = schema.safeParse(value);
        
        return result.success ? null : result.error.issues[0].message ?? "Invalid";
    };

    // focus out시 입력값을 검증해서 에러메세지를 여부를 판단
    const onBlur = ( field: FieldKey, value: unknown ) => { 
        const msg = validateField(fieldSchema[field], value);
        
        setErrorMessage(prev => ({
            ...prev,
            [field]: msg,
        }));
    };

    // 닉네임 중복 검사
    const nicknameCheck = async() => {
        const msg = validateField(fieldSchema.nickname, nickname);

        if ( msg ) {
            setErrorMessage(prev => ({
                ...prev,
                "nickname": msg,
            }));
            setNicknameStatus("invalid");
            return;
        }

        const res = await fetch(`/api/nickname-check?nickname=${encodeURIComponent(nickname)}`);

        if ( !res.ok ) {
            setErrorMessage(prev => ({
                ...prev,
                email: "닉네임 확인 중 오류가 발생했습니다.",
            }));
            setNicknameStatus("invalid");
            return;
        }

        const data = await res.json();

        if ( data.isDuplicate ) {
            setErrorMessage(prev => ({
                ...prev,
                "nickname": "사용 중인 닉네임입니다.",
            }));
            setNicknameStatus("duplicate");
        } else {
            setErrorMessage(prev => ({
                ...prev,
                "nickname": "사용 가능한 닉네임입니다.",
            }));
            setNicknameStatus("available");
        };
    };
    
    // 이메일 중복 검사
    const emailCheck = async() => {
        const msg = validateField(fieldSchema.email, email);

        if ( msg ) {
            setErrorMessage(prev => ({
                ...prev,
                "email": msg,
            }));
            setEmailStatus("invalid");
            return;
        };

        const res = await fetch(`/api/email-check?email=${encodeURIComponent(email)}&provider=local`);

        if ( !res.ok ) {
            setErrorMessage(prev => ({
                ...prev,
                "email": "이메일 확인 중 오류가 발생했습니다.",
            }));
            setEmailStatus("invalid");
            return;
        }

        const data = await res.json();

        if ( data.isDuplicate ) {
            setErrorMessage(prev => ({
                ...prev,
                "email": "이미 존재하는 이메일 입니다.",
            }));
            setEmailStatus("duplicate");
        } else {
            setErrorMessage(prev => ({
                ...prev,
                "email": "사용 가능한 이메일 입니다.",
            }));
            setEmailStatus("available");
        }
    };

    // 회원 가입 폼에 입력한 값 최종 확인 및 서버에 제출
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const result = signUpSchema.safeParse({
            name: name,
            nickname: nickname,
            provider: provider,
            email: email,    
            password: password,
        });
        
        if ( !result.success ) {
            alert("실패");
            console.log(result)
        };

    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="
                relative w-full h-full pb-15
                flex flex-col justify-center items-center
                overflow-y-auto
                bg-gradient-to-b from-white to-[#fff6fb]">
            <span 
                onClick={onSwitch} 
                className="
                    absolute top-10 left-10
                    cursor-pointer">
                <Image src={out} alt="뒤로 가기" width={50} />
            </span>
            <div className="w-[70%] flex flex-col gap-12">
                <h1 className="
                    text-5xl text-[#3b2f4a] text-center
                    cursor-default">
                    Sign Up
                </h1>
                <div className="flex gap-5">
                    <div className="w-[35%]">
                        <label className="text-lg text-[#3b2f4a] font-semibold">
                            <span className="text-red-500 mx-1">*</span>
                            이름
                        </label>
                        <Input 
                            name="name"
                            type="text" value={name} 
                            onChange={e => setName(e.target.value)} 
                            onBlur={() => onBlur("name", name)}
                            variant="signup"
                            maxLength={5}/>
                        <p 
                            className="
                                min-h-[1.5rem] ml-1 mt-1 text-red-500 
                                transition-opacity">
                            {errorMessage.name}
                        </p>
                    </div>
                    <div className="w-[65%]">
                        <label className="text-lg text-[#3b2f4a] font-semibold">
                            <span className="text-red-500 mx-1">*</span>
                            닉네임
                        </label>
                        <div className="flex items-center gap-1">
                            <div className="flex-[8]">
                                <Input 
                                    name="nickname"
                                    type="text" value={nickname} 
                                    onChange={e => setNickname(e.target.value)} 
                                    onBlur={() => onBlur("nickname", nickname)}
                                    variant="signup"
                                    maxLength={16}/>
                            </div>
                            <div className="flex-[2]">
                                <Button 
                                    type="button" object="중복확인" 
                                    variant="duplication"
                                    onClick={nicknameCheck} />
                            </div>
                        </div>
                        <p 
                            className={`
                                min-h-[1.5rem] ml-1 mt-1
                                ${nicknameStatus === "available" ? "text-green-500" : "text-red-500"}`}>
                            {errorMessage.nickname}
                        </p>
                    </div>
                </div> 
                <EmailField value={email} onChange={setEmail} onClick={emailCheck} status={emailStatus} message={errorMessage.email} />
                <PasswordField value={password} onChange={setPassword} />
                <BirthAndGenderField />
            </div>
            <div className="w-[70%] absolute bottom-15">
                <Button type="submit" object="회원가입" variant="submit" />
            </div>
        </form>
    )
}