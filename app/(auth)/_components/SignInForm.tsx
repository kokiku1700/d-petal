"use client";

import Input from "@/components/Input"
import Button from "@/components/Button"
import Image from "next/image"
import google from "@/public/icons/google.svg";
import kakao from "@/public/icons/kakaotalk.svg";
import naver from "@/public/icons/naver.svg";
import github from "@/public/icons/github.svg";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/sign-in", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password
            }),
        });

        if ( res.ok ) {
            router.replace("/app");
        }
    };

    return (
        <div className="
            w-full h-full
            flex flex-col justify-center items-center gap-10
            text-gray-800
            bg-gradient-to-b from-white to-[#fff6fb]">
            <h1 className="mb-5 text-5xl text-[#3b2f4a]">
                Sign In
            </h1>
            <form 
                onSubmit={onSubmit}
                className="
                    w-[60%] 
                    flex flex-col justify-center items-center gap-6">
                    <Input 
                        name="email" value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="이메일" variant="signin"/>
                    <Input 
                        name="password" type="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="비밀번호" variant="signin"/>
                <Button type="submit" object="로그인" variant="submit" />
            </form>
            <div className="flex gap-5">
                {socialIcons.map((icon, i) => (
                    <Image 
                        key={i}
                        src={icon.src}
                        alt={icon.alt}
                        width={40}
                        height={40}
                        className="w-12 h-12 rounded-4xl border-2 border-black" />
                ))}
            </div>
            <div className="w-[60%] border-t">
                <p className="my-2">
                    아직 계정이 없나요? 
                    <span 
                        onClick={onSwitch}
                        className="
                            mx-1 text-[#e5c9dd]
                            cursor-pointer
                            hover:underline">
                        회원가입
                    </span>
                </p>
                <p>
                    로그인이 되지 않나요?
                    <Link 
                        href="/find_password" 
                        className="
                            mx-1 text-gray-600
                            hover:text-gray-300">
                        비밀번호 찾기
                    </Link>
                </p>
            </div>
        </div>
    )
}