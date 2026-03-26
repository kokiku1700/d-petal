"use client";

import { useTodaySummary } from "@/hooks/useTodaySummary";
import { EmotionKey, emotionsObj } from "@/constant/emotions";

export default function RecordSummary () {
    const { data: summary } = useTodaySummary(); 

    if ( !summary ) return null;

    const topEmotion = summary?.top_emotion;
    const emoji = topEmotion ? emotionsObj[topEmotion as EmotionKey].emoji : "";

    return (
        <section 
            className="
                w-full p-4
                flex flex-col gap-2 
                border border-purple-100
                bg-gradient-to-br from-[#f8f2fb] via-[#f6f1fa] to-[#efe6f8]
                shadow-[0_20px_60px_rgba(168,85,247,0.12)]
                rounded-lg">
            <h1 className="text-xl">기록 요약</h1>
            <div 
                className="
                    w-[95%] p-2 mx-auto
                    flex items-center 
                    rounded-lg
                    border border-purple-100
                    bg-white/80 px-5 py-3
                    shadow-[0_8px_24px_rgba(139,92,246,0.08)]
                    backdrop-blur_sm">
                <span>오늘 기록 개수</span>
                <span>:</span>
                <span>{summary.count}</span>
            </div>
            <div 
                className="
                    w-[95%] p-2 mx-auto
                    flex items-center 
                    rounded-lg
                    border border-purple-100
                    bg-white/80 px-5 py-3
                    shadow-[0_8px_24px_rgba(139,92,246,0.08)]
                    backdrop-blur_sm">
                <span>오늘의 만족도</span>
                <span>:</span>
                <span>{summary.avg_satisfaction}</span>
            </div>
            <div 
                className="
                    w-[95%] p-2 mx-auto
                    flex items-center 
                    rounded-lg
                    border border-purple-100
                    bg-white/80 px-5 py-3
                    shadow-[0_8px_24px_rgba(139,92,246,0.08)]
                    backdrop-blur_sm">
                <span>오늘의 기분</span>
                <span>:</span>
                <span>{emoji}</span>
            </div>
        </section>
    );
}