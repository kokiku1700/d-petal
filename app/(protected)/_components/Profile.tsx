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
                py-3">
            {/* 프로필 이미지 */}
            <div 
                className="
                    flex justify-around items-center
                    border-b border-gray-200 p-3">
                <div className="basis-2/5">
                    <Image 
                        src={profileImg} alt="프로필 이미지" 
                        className="ring-2 ring-gray-300 rounded-full"/>
                </div>
                <div className="basis-3/5 flex flex-col gap-3">
                    <span className="text-lg font-bold text-center">
                        {me.user.user_nickname}
                    </span>
                    <p className="text-center">{`총 ${postSum}개의 기록`}</p>
                </div>
    
            </div>
            {/* 프로필 왼 쪽 - 닉네임 및 기록 추세 */}
            <div className="text-center p-3">
                <p>문구가 들어갈 예정입니다.</p>
            </div>   
        </aside>
    )
}