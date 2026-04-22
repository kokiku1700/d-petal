"use client";

import { SessionUser } from "@/lib/getSessionUser";
import profile from "@/public/profile.png";
import profileImgEdit from "@/public/profileImgEdit.png";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    user: SessionUser | null;
};

export default function MyProfileSummary ( { user }: Props ) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const handleLogOut = async () => {
        const answer = confirm("로그아웃 하시겠어요?");

        if ( answer ) {
            const res = await fetch("/api/logout", {
                method: "POST",
            });

            if ( res ) {
                // invalidateQueries는 "me"만 null로 초기화한다.
                // 때문에 다른 캐시값들은 살아있기 때문에 
                // clear를 통해 모든 캐시를 초기화해준다.
                // queryClient.invalidateQueries({ queryKey: ["me"]});
                queryClient.clear();

                router.replace("/");
            };
        };  
    };

    return (
        <section 
            className="
                relative
                flex justify-around items-center
                w-full p-2
                rounded-xl
                border border-gray-400">
            <div 
                className="
                    relative
                    w-[15%] rounded-full">
                <Image 
                    src={profile} 
                    alt="프로필 이미지" 
                    className="w-full"/>
                <Image 
                    src={profileImgEdit} 
                    alt="프로필 이미지 수정" 
                    className="
                        w-[20%] p-2
                        shadow-md rounded-full bg-white
                        absolute bottom-3 right-3
                        cursor-pointer"/>
            </div>
            <div 
                className="
                    basis-3/5 w-full
                    flex flex-col gap-5">
                <div className="flex items-end gap-2">
                    <span className="text-3xl">
                        {user?.user_nickname}
                    </span>
                    <span>
                        {user?.user_name}
                    </span>   
                </div>
                <p>나를 설명할 문구</p>
            </div>
            <div 
                className="
                    absolute top-5 right-10
                    flex gap-2">
                <span 
                    className="
                        p-2 rounded-xl bg-white
                        border border-gray-400
                        cursor-pointer">
                    프로필 수정
                </span>
                <span 
                    onClick={handleLogOut}
                    className="
                        p-2 rounded-xl bg-white
                        border border-gray-400
                        text-red-500
                        cursor-pointer">
                    로그아웃
                </span>
            </div>    
        </section>
    );
};