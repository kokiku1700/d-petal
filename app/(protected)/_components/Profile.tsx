"use client"

import { useMeQuery } from "@/hooks/useMeQuery"
import Image from "next/image";
import profileImg from "@/public/profile.png";
import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery";

export default function Profile () {
    const { data: me } = useMeQuery();
    const { data: categories } = useCategoriesChartQuery(); 

    if ( !me || !categories ) return null;
    
    const postSum = categories.reduce((a, b) => a + b.value, 0);

    return (
        <aside 
            className="
                w-full flex flex-col gap-2
                py-2">
            <div 
                className="
                    flex justify-around items-center
                    border-b border-gray-200 px-3 py-2">
                <div 
                    className="
                        relative
                        basis-1/5 w-full 
                        aspect-square
                        rounded-full overflow-hidden 
                        ring-2 ring-gray-300 
                        lg:basis-2/5">
                    <Image 
                        src={me.user.user_profile_image 
                            ? me.user.user_profile_image 
                            : profileImg} alt="프로필 이미지" 
                        fill
                        className="w-full object-cover"/>
                </div>
                <div className="basis-3/5 flex flex-col gap-3">
                    <span className="text-base font-bold text-center">
                        {me.user.user_nickname}
                    </span>
                    <p className="text-center text-sm">
                        {`총 ${postSum}개의 기록`}
                    </p>
                </div>
            </div>
            <div 
                className="text-center p-2 truncate">
                <p className="italic">{me.user.user_bio ? me.user.user_bio : "나를 표현해보세요."}</p>
            </div>   
        </aside>
    )
}