import { Post } from "@/types/post"
import { useRef, useEffect } from "react";
import Image from "next/image";
import close from "@/public/close.png";
import Button from "@/components/Button";
import { emotionsObj } from "@/constant/emotions";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
    data: Post;
    status: boolean;
    setModalStatus: (e:boolean) => void;
    contentModalToggle: () => void;
};

export default function ContentModal ({ data, status, setModalStatus, contentModalToggle }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const router = useRouter();

    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            // 첫 렌더링 시 modalRef는 null을 받을 가능성이 있다. 
            // 때문에 렌더링이 끝나고 null이 아니면 다음 조건을 실행하게 해주는 보호막 역할을 해준다.
            // 물론 뒤에 조건에서 옵셔널 체이닝을 사용해서 앞에 조건이 무조건 필요한 건 아니다.
            if ( modalRef.current && !modalRef.current?.contains(e.target as Node) ) {
                setModalStatus(false);
            };
        };

        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, []);

    const handleRemovePost = async() => {
        const answer = confirm("삭제하시겠습니까?");
        
        if ( answer ) {
            const res = await fetch(`/api/posts/${data.post_id}`, {
                method: "DELETE"
            });

            if ( res.ok ) {
                await queryClient.invalidateQueries({ queryKey: ["posts"] });
                router.refresh();
            };
        };
    };

    return (
        <main 
            className={`
                ${status ? "fixed" : "hidden"}
                inset-0 w-full 
                flex justify-center items-center
                z-50 bg-black/60`}>
            <section 
                ref={modalRef}
                className="
                    w-[90%] p-5
                    rounded-lg shadow-2xl bg-white
                    overflow-hidden
                    lg:w-[50%]">
                <div
                    style={{
                        background:`linear-gradient(135deg, ${data.category_color}10, ${data.category_color}20)`
                    }} 
                    className="
                        relative w-full
                        flex flex-col justify-around items-center gap-20">
                    <Image 
                        src={close} alt="닫기"
                        width={25}
                        onClick={() => {setModalStatus(false)}}
                        className="
                            absolute top-5 right-5
                            cursor-pointer" /> 
                    <div
                        className=" 
                            w-[90%] p-2 
                            flex flex-col gap-2
                            border-b border-gray-300">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-medium">
                                {data.title}
                            </h1>
                            <span className="text-sm text-gray-400">
                                ({data.activity_date.slice(0,10)})
                            </span>
                        </div>    
                        <div 
                            className="
                            w-fit px-3 py-1
                            flex justify-center items-center gap-1 
                            border border-gray-200 rounded-4xl">
                            <span>{emotionsObj[data.emotion].emoji}</span>
                            <span>{emotionsObj[data.emotion].label}</span>
                        </div>
                    </div>     
                    <p className="w-[90%] p-2 text-sm">
                        {data.content}
                    </p>
                    <div
                        className="
                            w-[90%] flex flex-col gap-2
                            md:flex-row">
                        <Link 
                            href={`/app/write/${data.post_id}/edit`}
                            className="
                                w-full flex justify-center items-center
                                rounded-lg bg-gray-200
                                text-sm
                                hover:bg-gray-300
                                lg:text-lg">
                            수정하기
                        </Link>
                        <Button object="확인" type="button" variant="submit" onClick={() => setModalStatus(false)}/>
                        <Button object="삭제하기" type="button" variant="cancel" onClick={handleRemovePost}/>
                    </div>
                    <div className="flex gap-1 w-[90%] text-sm text-gray-400">
                        <span>작성일:</span>
                        <span>{data.created_at.slice(0,10)}</span>
                    </div>
                </div>
            </section>
        </main>
    )
}