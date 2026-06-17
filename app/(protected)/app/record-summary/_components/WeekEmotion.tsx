"use client";

import { emotionChartColor, EmotionKey, emotionsObj } from "@/constant/emotions"
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Data = {
    emotion: EmotionKey;
    count: number;
};

type Props = {
    data: Data[];
}


export default function WeekEmotionSummaryDetail ({ data }: Props ) {
    const chartData = data.map(item => ({
        ...item,
        fill: emotionChartColor[item.emotion],
    }));

    const topEmotion = data.length !== 0 ? [...data].sort((a, b) => b.count - a.count)[0].emotion : null;

    return (
        <div className="w-full">
            <div 
                className="
                    flex flex-col items-start pl-2
                    lg:flex-row lg:items-end lg:gap-2">
                <h3 
                    className="
                        text-base font-semibold
                        lg:text-lg">
                    감정
                </h3>
                <p className="text-xs text-gray-400 lg:text-sm">
                    최근 당신의 감정은 어떤 모습이었나요?
                </p>
            </div>
            <div 
                className="
                    relative
                    w-full h-[300px] 
                    rounded-xl
                    bg-gradient-to-b from-pink-400/5 to-purple-500/5
                    shadow-sm border border-white/40 backdrop-blur-sm">
                <ResponsiveContainer className="w-[100%] h-[100%]">
                    <PieChart>
                        <Tooltip 
                            formatter={(value, _name, props) => {
                                const emotion = props.payload.emotion as EmotionKey;

                                return [
                                    `${value}개`,
                                    `${emotionsObj[emotion].emoji} ${emotionsObj[emotion].label}`
                                ]
                            }}/>
                        <Pie 
                            data={chartData}
                            dataKey="count"
                            nameKey="emotion"
                            cx="50%" cy="50%"
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={3}
                            labelLine={false}
                            label={({ name, percent }) => percent && percent > 0.05 ? `${emotionsObj[name as EmotionKey].label} · ${Math.round(percent * 100)}%` : ""} />
                    </PieChart>
                </ResponsiveContainer>
                <div 
                    className="
                        pointer-events-none absolute inset-0 
                        flex flex-col items-center justify-center">
                    {topEmotion && (
                        <>
                            <span className="text-xs text-gray-400">
                                가장 많은 감정
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                {emotionsObj[topEmotion as EmotionKey].emoji} {emotionsObj[topEmotion as EmotionKey].label}
                            </span>
                        </>
                    )}         
                </div>
            </div>
        </div>
        
    )
}