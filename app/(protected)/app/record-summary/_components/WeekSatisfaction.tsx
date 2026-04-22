"use client"

import { getWeekSatisfactionInsight } from "@/constant/insight/weekSatisfaction";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Data = {
    satisfaction: number;
    count: number;
};

type Props = {
    data: Data[];
}

export default function WeekSatisfactionSummaryDetail ({ data }: Props) {
    // 서버에서 가져온 값에 없는 점수가 있을 경우 
    // 임의로 만들어주는 함수다. 
    const satisfactionSummary = [1, 2, 3, 4, 5].map(score => {
        const found = data.find(item => item.satisfaction === score);

        return ({
            satisfaction: score,
            count: found ? found.count : 0,
        });
    });

    const weekSatisfaction = getWeekSatisfactionInsight(data);

    return (
        <div className="w-full">
            <div className="flex items-end gap-2 pl-2">
                <h3 className="text-lg font-semibold">
                    만족도
                </h3>
                <p className="text-sm text-gray-400">
                    기록 속 만족도를 한눈에 확인해보세요.
                </p>
            </div>
            <p className="text-lg font-semibold text-center text-gray-800 italic p-2">
                {weekSatisfaction}
            </p>
            <div 
                className="
                    w-full h-[300px] 
                    rounded-xl
                    bg-gradient-to-b from-[rgba(244,114,182,0.08)] to-white
                    shadow-sm border border-white/40 backdrop-blur-sm">
                <ResponsiveContainer className="w-[100%] h-[100%]">
                    <BarChart 
                        data={satisfactionSummary}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20}} >
                        <XAxis 
                            dataKey="satisfaction"
                            tickMargin={10} tickLine={false}/>
                        <YAxis allowDecimals={false}
                            tickMargin={10} tickLine={false}/>
                        <Tooltip 
                            formatter={value => [`${value}개`, "기록"]}
                            cursor={{ fill: "rgba(244,114,182,0.08)"}}/>
                        <Bar 
                            dataKey="count" 
                            fill="rgba(244, 114, 182, .6)"
                            barSize={30}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}