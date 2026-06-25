"use client";

import Link from "next/link";
import RecordSummary from "./RecordSummary";
import RecordChart from "./RecordChart";
import { useState } from "react";
import collapseArrow from "@/public/collapseArrow.png"
import expandArrow from "@/public/expandArrow.png";
import Image from "next/image";

export default function Record () {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* 모바일 이동 버튼 및 토글 버튼 */}
            <div
                className="
                    flex gap-2
                    lg:hidden">
                <Link 
                    href="/app/record-summary"
                    className="
                        flex justify-center items-center
                        w-full bg-[#e1d1f9]
                        text-sm 
                        cursor-pointer p-2
                        transition duration-300
                        hover:bg-[#cfb5f7]">
                    기록 요약 보러 가기
                </Link>
                <button 
                    onClick={handleToggle}
                    className="
                        flex justify-center items-center gap-2
                        w-full bg-[#ebc1f0]
                        text-sm 
                        cursor-pointer p-2
                        transition duration-300
                        hover:bg-[#e8b3ee]">
                    기록 차트 보기
                    <Image 
                        src={open ? collapseArrow : expandArrow}
                        alt="토글 화살표"
                        width={30}
                        className="w-[15px]"/>
                </button>
            </div>

            {/* 기록 요약 */}
            <Link href="/app/record-summary" 
                className="
                    hidden basis-3/10
                    border border-gray-200
                    rounded-lg bg-white/80 
                    transition duration-300
                    hover:ring
                    hover:ring-purple-200
                    lg:block">
                <RecordSummary />
            </Link>
            {/* 기록 차트(잔디) */}
            <div
                className={`
                    ${open ? "block" : "hidden"}
                    basis-5/10
                    overflow-y-scroll
                    border border-gray-200
                    rounded-lg bg-white/80
                    lg:block
                    lg:col-span-2`}>
                <RecordChart />
            </div>
        </>
    )
}