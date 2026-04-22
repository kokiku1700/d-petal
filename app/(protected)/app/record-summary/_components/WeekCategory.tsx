"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Data = {
    category_id: string;
    name: string;
    color: string;
    count: number;
};

type Props = {
    data: Data[];
};

export default function WeekCategroySummaryDetail ({ data }: Props) {
    const chartData = data.map(item => ({
        ...item,
        fill: item.color,
    }));
    console.log(data);
    const topCategory = data.length !== 0 ? [...data].sort((a, b) => b.count - a.count)[0].name : "";

    return (
        <div className="w-full">
            <div className="flex items-end gap-2 p-2">
                <h3 className="text-lg font-semibold">
                    카테고리
                </h3>
                <p className="text-sm text-gray-400">
                    기록이 어떤 영역에 집중되었는지 보여드려요.
                </p>
            </div>
            <div 
                className="
                    relative
                    w-full h-[300px] 
                    rounded-xl
                    bg-gradient-to-b from-pink-300/5 to-pink-400/5
                    shadow-sm border border-white/40 backdrop-blur-sm">
                <ResponsiveContainer className="w-[100%] h-[100%]">
                    <PieChart>
                        <Tooltip 
                            formatter={(value, _name, props) => {
                                return [
                                    `${value}개`,
                                    props.payload.name
                                ]
                            }}/>
                        <Pie 
                            data={chartData}
                            dataKey="count"
                            nameKey="category_id"
                            cx="50%" cy="50%"
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={3}
                            labelLine={false}
                            label={({ name, percent }) => percent && percent > 0.05 ? `${name} · ${Math.round(percent * 100)}%` : ""} />
                    </PieChart>
                </ResponsiveContainer>
                <div 
                    className="
                        pointer-events-none absolute inset-0 
                        flex flex-col items-center justify-center">
                    {topCategory && (
                        <>
                            <span className="text-xs text-gray-400">
                                가장 많은 카테고리
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                {topCategory}
                            </span>
                        </>
                    )}         
                </div>
            </div>
        </div>    
    )
}