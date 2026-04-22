"use client";

import { getTrend, getWeekTrendInsight } from "@/constant/insight/weekTrend";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Data = {
    day: string;
    count: number;
};

type Props = {
    data: Data[];
};

export default function WeekPostTrendChart ({ data }: Props) {
    const chartData = data.map(item => ({
        ...item,
        label: new Date(item.day).toLocaleDateString("ko-KR", {
            month: "numeric",
            day: "numeric",
        }).slice(0, -1),
    }));

    const counts = chartData.map(e => e.count);
    const trend = getTrend(counts);
    const weekTrendInsight = getWeekTrendInsight(counts, trend);


    return (
        <div className="w-full">
            <div className="flex items-end gap-2 pl-2">
                <h3 className="text-lg font-semibold">
                    기록
                </h3>
                <p className="text-sm text-gray-400">
                    지난 7일 동안 쌓인 기록의 흐름을 보여드려요.
                </p>
            </div>
            <p 
                className="
                    text-lg font-semibold text-center text-gray-800 italic 
                    p-2">
                {weekTrendInsight}
            </p>
            <div 
                className="
                    w-full h-[300px] 
                    rounded-xl
                    bg-gradient-to-b from-violet-50 to-white
                    shadow-sm border border-white/40 backdrop-blur-sm">
                <ResponsiveContainer className="w-[100%] h-[100%]">
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20}}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis 
                            dataKey="label"
                            tickMargin={10} tickLine={false}
                            padding={{ left: 10, right: 20 }} />
                        <YAxis 
                            allowDecimals={false} 
                            tickMargin={10} tickLine={false} 
                            padding={{ bottom: 5 }} />
                        <Tooltip
                            formatter={(value) => [`${value}개`, "기록"]}
                            cursor={{ stroke: "#db98f4", strokeWidth: 1, strokeOpacity: 0.35}} />
                        <Line 
                            type="linear" dataKey="count" 
                            stroke="#db98f4" strokeWidth={2} 
                            dot={{ r: 4 }} />
                        
                    </LineChart>
                </ResponsiveContainer>  
            </div>
        </div>      
    );
};