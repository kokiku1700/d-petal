"use client"

import { useState } from "react";
import WriteAction from "./components/WriteAction";
import WriteContent from "./components/WriteContent";
import WritePreview from "./components/WritePreview";
import WriteRecordInfo from "./components/WriteRecordInfo";
import type { Write } from "@/types/write";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";


export default function Write () {
    const [write, setWrite] = useState<Write>({
        date: new Date().toISOString().slice(0, 10),
        category: 0,
        emotion: "joy",
        // 만족도
        satisfaction: 0,
        title: "",
        content: "",
    });
    const router = useRouter();
    const queryClient = useQueryClient();

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/write-post", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                date: write.date,
                category: Number(write.category),
                emotion: write.emotion,
                satisfaction: write.satisfaction,
                title: write.title,
                content: write.content,
            })
        });

        if ( res.ok ) {
            alert("작성이 완료되었습니다.");
            await queryClient.invalidateQueries({queryKey: ["me"]});
            await queryClient.invalidateQueries({queryKey: ["posts"]});
            await queryClient.invalidateQueries({queryKey: ["categories"]});
            router.replace("/app");
            router.refresh();
        }
    };

    return (
        <main 
            className="
                w-[95%] mx-auto
                xl:w-[90%]">
            <h1 
                className="
                    w-[60%] 
                    mx-auto pt-5 pb-2 
                    border-b border-gray-200
                    text-center text-3xl font-medium
                    lg:w-[15%]">
                기록 남기기
            </h1>
            <p 
                className="
                    pt-2 pb-5 
                    text-center text-sm
                    xl:text-lg">
                하루의 한 조각을 가볍게 남겨보세요.
            </p>
            <form 
                onSubmit={onSubmit} 
                className="
                    w-full flex flex-col gap-5
                    xl:flex-row">
                <div 
                    className="
                        basis-2/3
                        flex flex-col gap-3">
                    <WriteRecordInfo write={write} onChange={setWrite} />
                    <WriteContent write={write} onChange={setWrite} />
                    <WriteAction />
                </div>
                <div className="basis-1/3">
                    <WritePreview write={write} />
                </div>
            </form>
        </main>
    )
}