"use client";

import { useTodaySummary } from "@/hooks/useTodaySummary";
import { EmotionKey, emotionsObj } from "@/constant/emotions";

export default function RecordSummary () {
    const { data: summary } = useTodaySummary(); 

    if ( !summary ) return null;

    const topEmotion = summary?.top_emotion;
    const emoji = topEmotion ? emotionsObj[topEmotion as EmotionKey].emoji : "";

    return (
        <section className="w-full p-2">
            <h1>기록 요약</h1>
            <div className="flex items-center">
                <span>오늘 기록 개수</span>
                <span>:</span>
                <span>{summary.count}</span>
            </div>
            <div className="flex items-center">
                <span>오늘의 만족도</span>
                <span>:</span>
                <span>{summary.avg_satisfaction}</span>
            </div>
            <div className="flex items-center">
                <span>오늘의 기분</span>
                <span>:</span>
                <span>{emoji}</span>
            </div>
        </section>
    );
}