"use client";

import { useTodaySummary } from "@/hooks/useTodaySummary";
import { EmotionKey, emotionsObj } from "@/constant/emotions";

export default function RecordSummary () {
    const { data: summary } = useTodaySummary(); 

    if ( !summary ) return null;

    const topEmotion = summary?.top_emotion;
    const emoji = topEmotion ? emotionsObj[topEmotion as EmotionKey].emoji : "";

    const cards = [
        {
            label: "기록 개수",
            value: `${summary.count}개`,
            sub: "오늘 작성한 기록"
        },
        {
            label: "만족도",
            value: `${summary.avg_satisfaction}`,
            sub: "오늘의 평균 점수"
        },
        {
            label: "기분",
            value: emoji ? emoji : "-",
            sub: "오늘의 기분"
        }
    ];

    return (
        <section className="w-full p-4 rounded-lg">
            {/* 기록 요약 아이콘 및 제목 */}
            <div className="flex items-center">
                <svg   
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="w-15 h-15">
                    <rect 
                        x="12" y="14"
                        width="28" height="36"
                        rx="6" fill="#e9d5ff" />

                    <circle cx="18" cy="14" r="2" fill="#a78bfa" />
                    <circle cx="26" cy="14" r="2" fill="#a78bfa" />
                    <circle cx="34" cy="14" r="2" fill="#a78bfa" />

                    <line x1="18" y1="24" x2="34" y2="24" stroke="#c4b5fd" strokeWidth="2" />
                    <line x1="18" y1="30" x2="34" y2="30" stroke="#c4b5fd" strokeWidth="2" />
                    <line x1="18" y1="36" x2="30" y2="36" stroke="#c4b5fd" strokeWidth="2" />

                    <g transform="rotate(25 40 30)">
                        <rect x="36" y="20" width="6" height="22" rx="2" fill="#34d399" />
                        <polygon points="36, 20 42, 20 39, 14" fill="#fde68a" />
                        <rect x="36" y="38" width="6" height="4" fill="#fca5a5" />
                    </g>
                </svg>
                <h1 className="text-xl">오늘 기록 요약</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 ml-2">
                    <path d="M9 6l6 6-6 6" />
                </svg>
            </div>
            {/* 기록 요약 컨텐츠 */}
            <div className="flex gap-2">
                {cards.map(card => (
                    <div 
                        key={card.label}
                        className="
                            w-full p-2 mx-auto
                            flex flex-col justify-center items-center gap-2 
                            rounded-lg
                            border border-purple-100
                            bg-white/80 px-5 py-3
                            backdrop-blur-sm
                            shadow-[0_4px_14px_rgba(216,180,254,0.12)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200" />
                        <p className="text-sm text-gray-400 whitespace-nowrap">{card.sub}</p>
                        <div className="flex gap-2">
                            <span>{card.label}</span>
                            <span className="mx-1">:</span>
                            <span>{card.value}</span>
                        </div>
                    </div>
                ))}
            </div>        
        </section>
    );
}