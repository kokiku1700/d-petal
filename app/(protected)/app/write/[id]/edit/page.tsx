"use client"

import { useEffect, useState } from "react";
import WriteAction from "../../components/WriteAction";
import WriteContent from "../../components/WriteContent";
import WritePreview from "../../components/WritePreview";
import WriteRecordInfo from "../../components/WriteRecordInfo";
import type { Write } from "@/types/write";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { usePostQuery } from "@/hooks/usePostQuery";

export default function Edit () {
    const params = useParams() as { id: string };
    const id = params.id;
    const { data } = usePostQuery(id);
    
    const [write, setWrite] = useState<Write>({
        date: "",
        category: 0,
        emotion: "joy",
        satisfaction: 0,
        title: "",
        content: "",
    });
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        if ( !data ) return;
        
        setWrite({
            date: data.activity_date.slice(0, 10),
            category: Number(data.category_id),
            emotion: data.emotion,
            satisfaction: data.satisfaction,
            title: data.title,
            content: data.content,
        });
    }, [data]);

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/edit-post", {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                postId: id,
                date: write.date,
                category: write.category,
                emotion: write.emotion,
                satisfaction: write.satisfaction,
                title: write.title,
                content: write.content,
            })
        });

        if ( res.ok ) {
            alert("수정이 완료되었습니다.");
            await queryClient.invalidateQueries({queryKey: ["me"]});
            await queryClient.invalidateQueries({queryKey: ["posts"]});
            router.replace("/app");
            router.refresh();
        }
    };

    return (
        <main 
            className="
                w-[90%] mx-auto
                ">
            <h1
                className="
                    w-[15%] 
                    mx-auto pt-5 pb-2 
                    border-b border-gray-200
                    text-center
                    text-3xl font-medium">
                기록 수정
            </h1>
            <p className="pt-2 pb-5 text-center">한 조각을 다듬어 보세요.</p>
            <form onSubmit={onSubmit} className="w-full flex gap-5">
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