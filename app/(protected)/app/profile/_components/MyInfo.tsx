"use client";

import { SessionUser } from "@/lib/getSessionUser"

type Props = {
    user: SessionUser | null;
    openDeleteModal: () => void;
};

export default function MyInfo ( { user, openDeleteModal }: Props ) {
    const myInfo = [
        { title: "이름", value: user?.user_name },
        { title: "닉네임", value: user?.user_nickname },
        { title: "이메일", value: user?.user_email },
        { title: "성별", value: user?.user_sex },
        { title: "생일", value: user?.user_birth },
    ]

    return (
        <section 
            className="
                flex flex-col
                w-full p-2
                rounded-xl
                border border-gray-400
                bg-white
                lg:w-[30%]">
            <div 
                className="
                    flex justify-between items-center
                    border-b border-gray-300">
                <h1 
                    className="
                        pl-5 py-1 
                        text-lg font-bold 
                        lg:py-2 lg:text-xl">
                    내 정보
                </h1>
                <button 
                    onClick={openDeleteModal}
                    className="
                        mr-1 py-1 px-1 
                        text-xs text-red-500
                        cursor-pointer
                        hover:text-red-700
                        lg:py-2 lg:text-sm">
                    회원탈퇴
                </button>
            </div>
            <div 
                className="
                    w-[90%] mx-auto pt-2
                    flex flex-col">
                {myInfo.map((info, idx) => (
                    <div 
                        key={idx}
                        className="
                            grid grid-cols-[100px_1fr]
                            items-center gap-x-6 
                            overflow-hidden
                            lg:py-1">
                        <h6 
                            className="
                                text-sm text-gray-500 
                                lg:text-base">
                            {info.title}
                        </h6>
                        <span 
                            className="
                                text-sm font-medium text-gray-900 
                                lg:text-base">
                            {info.value}
                        </span>   
                    </div>
                ))}  
            </div>
        </section>
    )
}