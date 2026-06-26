"use client";

import Input from "@/components/Input"
import Button from "@/components/Button"
import Image from "next/image"
import google from "@/public/icons/google.png";
import kakao from "@/public/icons/kakao.png";
import naver from "@/public/icons/naver.png";
import github from "@/public/icons/github.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { signInSchema } from "@/schemas/auth/sign-in.schema";

type Props = {
    onSwitch: () => void;
};

export default function SignInForm ({ onSwitch }: Props) {
	const socialIcons = [
		{src: google, alt:"google 로그인", provider:"google"},
		{src: kakao, alt:"kakao 로그인", provider:"kakao"},
		{src: naver, alt:"naver 로그인", provider:"naver"},
		{src: github, alt:"github 로그인", provider:"github"},
	];
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const queryClient = useQueryClient();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = signInSchema.safeParse({email, password});

        if ( !result.success ) {
            setStatus(false);
            setErrorMessage("이메일 혹은 비밀번호를 확인해주세요.");
            return;
        } 

        const res = await fetch("/api/sign-in", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password
            }),
        });

        const data = await res.json();

        if ( data.ok ) {
            setStatus(true);
            await queryClient.invalidateQueries({ queryKey: ["me"]});
            router.replace("/app");
            router.refresh();
        } else {
            setStatus(false);
            setErrorMessage(data.message);
        };
    };

    // 소셜 로그인 함수
    const handleSocialLogin = ( provider: string ) => {
        if ( provider === "google" ) {
            window.location.href = "/api/auth/google";
        } else if ( provider === "kakao" ) {
            window.location.href = "/api/auth/kakao";
        } else if ( provider === "naver" ) {
            window.location.href = "/api/auth/naver";
        } else if ( provider === "github" ) {
            window.location.href = "/api/auth/github";
        }; 
    };

    return (
        <div className="
            relative
            w-full min-h-full
            flex flex-col justify-center items-center gap-10
            text-gray-800
            bg-[url('/signInLeftImg.jpg')]
            bg-cover bg-center bg-no-repeat
            lg:bg-gradient-to-b lg:from-white lg:to-[#fff6fb]">
            <div className="absolute inset-0 bg-white/50 lg:hidden" />
            <h1 className="z-10 mb-5 text-4xl text-[#3b2f4a]">
                Sign In
            </h1>
            <form 
                onSubmit={onSubmit}
                className="
                    w-[80%] z-10 
                    flex flex-col justify-center items-center gap-6
                    md:w-[60%]">
                <Input 
                    name="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" placeholder="이메일" variant="signin"/>
                <Input 
                    name="password" type="password" value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="비밀번호" variant="signin"/>
                
                {status === null ? null 
                    : status === true
                    ? <Spinner />
                    : <p 
                        className="text-sm text-red-500">
                        {errorMessage}
                      </p>
                }
                <Button 
                    type="submit" object="로그인" variant="submit"
                    disabled={status ? true : false}/>
            </form>
            <div 
                className="
                    w-[50%]
                    z-10 grid grid-cols-1 gap-3
                    px-4
                    sm:grid-cols-2 sm:w-[60%]
                    lg:grid-cols-1 lg:w-[70%]
                    xl:w-[75%]
                    2xl:grid-cols-2">
                {socialIcons.map((icon, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSocialLogin(icon.provider)}>
                        <Image  
                            src={icon.src}
                            alt={icon.alt}
                            width={200}
                            height={40}
                            className="w-full h-10 cursor-pointer"/>
                    </button>
                ))}
            </div>
            <div 
                className="
                    z-10 w-[80%] border-t
                    md:w-[60%]">
                <p className="my-2 text-sm">
                    아직 계정이 없나요? 
                    <span 
                        onClick={onSwitch}
                        className="
                            mx-1 text-[#e183c7] text-sm
                            cursor-pointer
                            hover:underline
                            hover:text-[#f70cb4]
                            lg:text-[#e5c9dd] lg:hover:text-[#e183c7]">
                        회원가입
                    </span>
                </p>
                <p className="text-sm">
                    로그인이 되지 않나요?
                    <Link 
                        href="/find-password" 
                        className="
                            mx-1 text-gray-600 text-sm
                            hover:text-gray-300">
                        비밀번호 찾기
                    </Link>
                </p>
            </div>
        </div>
    )
}