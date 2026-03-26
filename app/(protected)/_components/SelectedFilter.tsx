"use client"

import { useCategoriesChartQuery } from "@/hooks/useCategoriesChartQuery";
import { useFilterStore } from "@/hooks/useFilterStore"

export default function SelectedFilter () {
    const { data } = useCategoriesChartQuery();
    const { selectedCategory } = useFilterStore();
    const { selectedDate } = useFilterStore();
    const filterColor = data?.find(c => c.name === selectedCategory);
    const color = filterColor?.color ?? "#fee1e8";

    return (
        <ul className="w-full flex gap-2 text-gray-500">
            <li 
                className="
                    w-full bg-white py-1
                    shadow-md text-center rounded-lg">
                <label>카테고리</label>
                <span className="mx-1">:</span>
                <span style={{ color: `${color}`, textShadow: "1px 1px 2px gray"}}>
                    {selectedCategory === null ? "전체" : selectedCategory}
                </span>
            </li>
            <li 
                className="
                    w-full bg-white py-1
                    shadow-md text-center rounded-lg">                
                <label>날짜</label>
                <span className="mx-1">:</span>
                <span className="text-pink-200">
                    {selectedDate === null ? "-" : selectedDate}
                </span>
            </li>
        </ul>
    )
}