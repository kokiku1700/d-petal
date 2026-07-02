"use client";

import { useProfileEditTabStore } from "@/hooks/useProfileEditTabStore";
import { SessionUser } from "@/lib/getSessionUser";
import profile from "@/public/profile.png";
import profileImgEdit from "@/public/profileImgEdit.png";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    user: SessionUser | null;
    openEditModal: () => void;
};

export default function MyProfileSummary ( { user, openEditModal }: Props ) {
    const queryClient = useQueryClient();
    const setSelectedTab = useProfileEditTabStore(state => state.setSelectedTab);
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
                router.refresh();
            };
        };  
    };

    return (
        <section 
            className="
                relative
                flex flex-col justify-around items-center
                w-full p-2 rounded-xl bg-white
                border border-gray-400
                md:flex-row">
            <div 
                className="
                    relative
                    w-[50%] mx-auto 
                    md:w-[15%]">
                <div 
                    className="
                        relative w-[70%] mx-auto
                        rounded-full aspect-square
                        border border-black 
                        bg-white
                        overflow-hidden
                        lg:w-full">
                    <Image 
                        src={user?.user_profile_image 
                                ? user.user_profile_image 
                                : profile} 
                        alt="프로필 이미지" 
                        fill
                        className="w-full object-cover"/>
                </div>
                <Image 
                    src={profileImgEdit} 
                    alt="프로필 이미지 수정" 
                    onClick={() => {openEditModal(); setSelectedTab("image");}}
                    className="
                        w-[20%] p-2
                        shadow-md rounded-full bg-white
                        absolute bottom-[5%] right-[13%]
                        cursor-pointer
                        lg:w-[25%]
                        xl:w-[20%]"/>
            </div>
            <div 
                className="
                    basis-3/5 w-full
                    flex flex-col gap-5">
                <div 
                    className="
                        flex flex-col items-center gap-2
                        lg:flex-row lg:items-end">
                    <span className="text-3xl">
                        {user?.user_nickname}
                    </span>
                    <span>
                        {user?.user_name}
                    </span>   
                </div>
                <p 
                    className="
                        mt-1 text-center
                        text-md text-gray-600
                        line-clamp-2 italic
                        lg:text-left">
                    {user?.user_bio ? user.user_bio : "나를 설명해보세요"}
                </p>
            </div>
            <div 
                className="
                    col-span-2
                    flex gap-2 justify-end 
                    py-2
                    md:absolute md:top-5 md:right-10">
                <span 
                    onClick={openEditModal}
                    className="
                        p-1 rounded-xl bg-white
                        text-xs
                        border border-gray-400
                        cursor-pointer
                        transition duration-400
                        hover:ring
                        hover:ring-gray-400
                        md:p-2 md:text-sm">
                    프로필 수정
                </span>
                <span 
                    onClick={handleLogOut}
                    className="
                        p-1 rounded-xl bg-white
                        text-xs
                        border border-gray-400
                        text-red-500
                        cursor-pointer
                        transition duration-400
                        hover:ring
                        hover:ring-gray-400
                        md:p-2 md:text-sm">
                    로그아웃
                </span>
            </div>    
        </section>
    );
};