"use client"

import { PieChart, Pie, Sector, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import type { PieSectorShapeProps } from "recharts";
import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery";
import { useFilterStore } from "@/hooks/useFilterStore";

type ChartItem = {
    name: string;
    value: number;
    color: string;
}

function PieSliceShape ( props: PieSectorShapeProps ) {
    const payload = props.payload as ChartItem | undefined;
    const fill = payload?.color ?? "#8884d8";

    return <Sector {...props} fill={fill} />
}

export default function CategoriesChart () {
    const { data } = useCategoriesChartQuery();
    const chartData = (data ?? []).filter((d:ChartItem) => d.value > 0);
    const setCategory = useFilterStore(state => state.setCategory);

    return (
        <figure 
            className="
                bg-white p-2
                shadow-purple-200
                rounded-lg shadow-md">
            <h1 className="text-center py-2">카테고리 비율</h1>
            <div 
                className="w-[80%] h-[260px] mx-auto">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            shape={PieSliceShape}
                            label={({ cx, cy, midAngle, outerRadius, name }) => {
                                const RADIAN = Math.PI / 180;

                                const radius = outerRadius * 1.05;

                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                
                                return (
                                    <text x={x} y={y} fill="#555"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                    fontSize={12}>
                                        {name}
                                    </text>
                                )

                            }}
                            labelLine={false}
                            style={{ outline: "none" }}
                            outerRadius="80%"
                            onClick={(_, i) => {
                                const category = chartData[i];
                                setCategory(category.name);
                            }}
                            className="cursor-pointer">
                            <LabelList 
                                dataKey="value"
                                position="inside"
                                fill="#777"
                                formatter={(v) => v}
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>  
        </figure>
    )
}