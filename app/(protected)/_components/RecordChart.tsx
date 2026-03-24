"use client";

import { usePostsQuery } from "@/hooks/usePostsQuery"
import { useMemo, useState } from "react";
import type { Tooltip } from "@/types/tooltip";
import ToolTip from "./ToolTip";

type Day = {
    date: string;
    count: number;
    empty?: boolean;
};



const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

function getColor ( count: number ) {
    if ( count === 0 ) return "#d0d7de";
    if ( count < 2 ) return "#f0abfc";
    if ( count < 4 ) return "#e879f9";
    if ( count < 6 ) return "#c026d3";
    return "#86198f";
};

export default function RecordChart () {
    const { data: posts } = usePostsQuery();
    const [hovered, setHovered] = useState<Tooltip | null>(null);

    const days = useMemo<Day[]>(() => {
        if ( !posts ) return [];

        const map = new Map<string, number>();
        const result: Day[] = [];

        const year = new Date().getFullYear();
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);

        posts.forEach(post => {
            const date = post.activity_date.slice(0, 10);
            map.set(date, (map.get(date) || 0) + 1);
        });

        for ( let d = new Date(start); d <= end; d.setDate(d.getDate() + 1) ) {
            const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

            result.push({date, count: map.get(date) || 0});
        };

        return result;
    }, [posts]);

    const paddedDays = useMemo<Day[]>(() => {
        if ( !days.length ) return [];

        const [firstYear, firstMonth, firstDate] = days[0].date.split("-").map(Number);
        const firstDay = new Date(firstYear, firstMonth - 1, firstDate).getDay();
        const startOffset = (firstDay + 6) % 7;

        const frontPadding: Day[] = Array.from({ length: startOffset }, (_, i) => ({
            date: `front-empty-${i}`,
            count: 0,
            empty: true,
        }));

        const totalLength = frontPadding.length + days.length;
        const endOffset = (7 - (totalLength % 7)) % 7;

        const backPadding: Day[] = Array.from({ length: endOffset }, (_, i) => ({
            date: `back-empty-${i}`,
            count: 0,
            empty: true,
        }));

        return [
            ...frontPadding,
            ...days,
            ...backPadding,
        ];
    }, [days]);

    const weeks = useMemo<Day[][]>(() => {
        if ( !paddedDays.length ) return [];

        const result: Day[][] = [];

        for ( let i = 0; i < paddedDays.length; i += 7 ) {
            result.push(paddedDays.slice(i, i + 7));
        };

        return result;
    }, [paddedDays]);

    return (
        <section className="w-full p-2">
            <h1>기록 차트</h1>
            <div className="flex flex-col p-1">
                <div className="flex pb-2">
                    <div className="w-6 pr-2" />
                    <div className="flex gap-1">
                        {weeks.map((week, i) => {
                            const firstDate = week[0];
                            const currentMonth = new Date(firstDate.date).getMonth();
                            const prevMonth = i > 0 ? new Date(weeks[i - 1][0].date).getMonth() : null;
                            const showMonth = i === 0 || currentMonth !== prevMonth;

                            return (
                                <div key={i} className="w-3 text-xs leading-none whitespace-nowrap">
                                    {showMonth ? `${currentMonth + 1}월` : ""}
                                </div>
                            )
                        })}
                    </div>
                </div>
                

                <div className="flex">
                    <div 
                        className="
                            flex flex-col gap-1 
                            pr-2
                            text-xs text-gray-500">
                        {weekDays.map((day, i) => (
                            <span key={i} className="h-3 flex items-center">
                                {i % 2 === 0 ? day : ""}
                            </span>
                        ))}
                    </div>   
                    <div className="flex gap-1">
                        {weeks.map((week, weekIndex) => (
                            <div
                                key={weekIndex}
                                className="flex flex-col gap-1">
                                {week.map(day => (
                                    <div 
                                        key={day.date}
                                        onMouseEnter={e => setHovered({
                                            date: day.date,
                                            count: day.count,
                                            x: e.clientX,
                                            y: e.clientY,
                                        })}
                                        onMouseLeave={() => setHovered(null)}
                                        className="w-3 h-3 rounded-sm cursor-pointer"
                                        style={{ backgroundColor: day.empty ? "#ebedf0 " : getColor(day.count)}}/>
                                        
                                ))}
                            </div>
                            
                        ))}
                    </div>
                    {hovered && <ToolTip data={hovered} />}
                </div>
            </div>
        </section>
    )
}